"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// The prototype is authored at a fixed 1600x1000 (16:10). We give the iframe
// that exact viewport so it renders its full desktop layout, then scale the
// whole frame down to whatever width the page gives us.
const DESIGN_W = 1600;
const DESIGN_H = 1000;

type Props = {
  src: string;
  poster: string;
  alt: string;
};

export default function LoomEmbed({ src, poster, alt }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [interactive, setInteractive] = useState(false);

  // Below md the scaled-down desktop layout would be far too small to use, so
  // fall back to the still image and offer the prototype in its own tab.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setInteractive(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / DESIGN_W);
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, [interactive]);

  return (
    <div className="mb-16">
      <div
        ref={wrapRef}
        className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-black/5 bg-surface-muted"
      >
        {interactive ? (
          scale > 0 && (
            <iframe
              src={src}
              title={alt}
              loading="lazy"
              className="absolute left-0 top-0 origin-top-left border-0"
              style={{
                width: DESIGN_W,
                height: DESIGN_H,
                transform: `scale(${scale})`,
              }}
            />
          )
        ) : (
          <Image
            src={poster}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>

      <p className="mt-3 text-sm text-ink-subtle">
        {interactive ? (
          <>
            Live prototype. Hover a signal to isolate it, click{" "}
            <span className="text-brand">show me</span> to see the observations
            behind an AI claim, or start a sensemaking session.{" "}
          </>
        ) : (
          <>Prototype is best viewed on a larger screen. </>
        )}
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="text-brand underline underline-offset-2 hover:opacity-80"
        >
          Open in a new tab ↗
        </a>
      </p>
    </div>
  );
}
