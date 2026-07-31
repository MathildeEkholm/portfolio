"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Screen = { src: string; label: string };

// Scale falloff: a screen at the centre of the viewport reaches MAX, one at
// either edge sits at MIN, so the strip appears to swell as it passes through.
const MIN_SCALE = 0.78;
const MAX_SCALE = 1.08;

// Enough repeats that the track is always wider than any viewport: two groups
// came to ~1980px, which ran out on a wide window and left a gap. Must stay
// even, since the animation wraps at -50%.
const GROUPS = 6;

export default function ScreenMarquee({ screens }: { screens: Screen[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Defined inside the effect so it can reference itself for the next frame.
    const step = () => {
      const middle = window.innerWidth / 2;
      const items = track.querySelectorAll<HTMLElement>("[data-screen]");
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const centre = rect.left + rect.width / 2;
        const distance = Math.min(1, Math.abs(centre - middle) / middle);
        const eased = (1 - distance) ** 1.6;
        const scale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * eased;
        item.style.transform = `scale(${scale.toFixed(4)})`;
        item.style.zIndex = String(Math.round(eased * 10));
      });
      rafId.current = requestAnimationFrame(step);
    };

    // Only run the loop while the strip is actually on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !rafId.current) {
          rafId.current = requestAnimationFrame(step);
        } else if (!entry.isIntersecting && rafId.current) {
          cancelAnimationFrame(rafId.current);
          rafId.current = 0;
        }
      },
      { rootMargin: "100px" },
    );
    observer.observe(track);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId.current);
      rafId.current = 0;
    };
  }, []);

  return (
    // A mask paints only within its own box, so overflow-y:visible does not
    // rescue content outside it: the vertical padding has to be large enough
    // to contain the scaled screens plus their drop shadows, or the shadows
    // get sliced off flat.
    <div className="relative left-1/2 w-screen -translate-x-1/2 pt-16 pb-24 [overflow-x:clip] [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div
        ref={trackRef}
        className="flex w-max animate-marquee items-center motion-reduce:animate-none"
      >
        {Array.from({ length: GROUPS }, (_, group) => (
          <div
            key={group}
            aria-hidden={group > 0}
            // Each group is padded right by exactly one gap, so both groups are
            // the same width and the -50% wrap is seamless.
            className="flex shrink-0 items-center gap-6 pr-6 sm:gap-8 sm:pr-8"
          >
            {screens.map((screen) => (
              <div
                key={screen.label}
                data-screen
                className="shrink-0 will-change-transform"
              >
                <Image
                  src={screen.src}
                  alt={
                    group === 0
                      ? `${screen.label} screen of the Strava redesign`
                      : ""
                  }
                  width={804}
                  height={1748}
                  sizes="(max-width: 640px) 170px, (max-width: 1024px) 215px, 250px"
                  className="h-auto w-[170px] drop-shadow-[0_14px_30px_rgba(0,0,0,0.16)] sm:w-[215px] lg:w-[250px]"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
