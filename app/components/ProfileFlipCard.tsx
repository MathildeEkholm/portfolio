"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import ContactList from "./ContactList";

// Hover intent: a cursor merely crossing the card shouldn't set it spinning,
// so each direction waits before committing. Leaving waits longer than
// entering, which keeps a wobbly pointer near the edge from thrashing.
const ENTER_DELAY = 180;
const LEAVE_DELAY = 260;

// Easing for the specular highlight that tracks the cursor.
const EASING = 0.09;
const GLOW_WIDTH = 0.55; // as a fraction of the card's width

export default function ProfileFlipCard() {
  const [flipped, setFlipped] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const intentTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const stageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const pointer = useRef({ x: 0.5, inside: false });
  const motion = useRef({ gx: 0.5 });
  const rafId = useRef(0);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => () => clearTimeout(intentTimer.current), []);

  const flipAfter = useCallback((next: boolean, delay: number) => {
    clearTimeout(intentTimer.current);
    intentTimer.current = setTimeout(() => setFlipped(next), delay);
  }, []);

  // Taps and explicit button presses shouldn't wait on hover intent.
  const flipNow = useCallback((next: boolean) => {
    clearTimeout(intentTimer.current);
    setFlipped(next);
  }, []);

  // The highlight that follows the cursor. Eased in a rAF loop rather than a
  // CSS transition so it keeps tracking the pointer continuously, and eases
  // back to centre instead of snapping when the pointer leaves.
  const runLoop = useCallback(() => {
    if (rafId.current) return;

    const step = () => {
      const stage = stageRef.current;
      const glow = glowRef.current;
      if (!stage || !glow) {
        rafId.current = 0;
        return;
      }

      const { x, inside } = pointer.current;
      const m = motion.current;
      m.gx += ((inside ? x : 0.5) - m.gx) * EASING;

      // The back face is mirrored by its own rotateY(180deg), so its local x
      // axis runs opposite to the screen's. Flip the coordinate or the
      // highlight chases the cursor the wrong way. The skew has to live in
      // this string too, since assigning transform overwrites any utility.
      const width = stage.clientWidth;
      const band = width * GLOW_WIDTH;
      glow.style.transform = `translateX(${((1 - m.gx) * width - band / 2).toFixed(2)}px) skewX(-12deg)`;

      const settled = !inside && Math.abs(m.gx - 0.5) < 0.001;
      rafId.current = settled ? 0 : requestAnimationFrame(step);
    };

    rafId.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => () => cancelAnimationFrame(rafId.current), []);

  const onPointerMove = useCallback(
    (event: React.MouseEvent) => {
      const stage = stageRef.current;
      if (!stage || !canHover) return;
      const rect = stage.getBoundingClientRect();
      pointer.current = {
        x: Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)),
        inside: true,
      };
      runLoop();
    },
    [canHover, runLoop],
  );

  return (
    <div className="mx-auto w-full max-w-[320px] md:mr-0 md:ml-auto">
      <div
        ref={stageRef}
        /* The float is paused rather than removed while flipped: dropping the
           animation would snap the card back to translateY(0) in one frame,
           mid-flip. Paused holds it exactly where it is. */
        className={`relative aspect-[3/4] w-full animate-idle-float [perspective:1400px] motion-reduce:animate-none ${
          flipped ? "[animation-play-state:paused]" : ""
        }`}
        onMouseEnter={canHover ? () => flipAfter(true, ENTER_DELAY) : undefined}
        onMouseMove={onPointerMove}
        onMouseLeave={
          canHover
            ? () => {
                pointer.current.inside = false;
                runLoop();
                flipAfter(false, LEAVE_DELAY);
              }
            : undefined
        }
        // Focus inside the back face keeps it open for keyboard users.
        onFocus={() => flipNow(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            flipNow(false);
          }
        }}
      >
        <div
          className={`relative h-full w-full transition-transform duration-[850ms] [transform-style:preserve-3d] [transition-timing-function:cubic-bezier(0.45,0.05,0.2,1)] motion-reduce:duration-0 ${
            // Stops short of a square 180deg so the card rests at an angle
            // rather than flat-on, leaning towards the top-left.
            // translateZ lifts it off the page as it turns.
            flipped
              ? "[transform:rotateY(167deg)_rotateX(-6deg)_translateZ(24px)]"
              : ""
          }`}
        >
          {/* front: the photo */}
          <button
            type="button"
            // Tap target on touch, where there is no hover to trigger the flip.
            onClick={() => flipNow(true)}
            aria-label="Show contact details"
            aria-expanded={flipped}
            className={`absolute inset-0 cursor-pointer overflow-hidden rounded-2xl shadow-[0_22px_50px_-22px_rgba(0,0,0,0.45)] ring-1 ring-line-soft [backface-visibility:hidden] ${
              flipped ? "pointer-events-none" : ""
            }`}
          >
            <Image
              src="/images/mathilde-hero.png"
              alt="Mathilde Ekholm"
              fill
              sizes="320px"
              className="object-cover"
              priority
            />
          </button>

          {/* back: glass contact card over a slowly drifting brand gradient */}
          <div
            className={`absolute inset-0 overflow-hidden rounded-2xl bg-glass shadow-xl shadow-black/10 ring-1 ring-line-soft backdrop-blur-2xl backdrop-saturate-150 [backface-visibility:hidden] [transform:rotateY(180deg)] ${
              flipped ? "" : "pointer-events-none"
            } cursor-pointer`}
            aria-hidden={!flipped}
            // A click anywhere on the card flips it back, on pointer and
            // touch alike. Clicks landing on a link or button are left alone.
            // Making the whole face clickable also means it can carry a single
            // cursor: mixing cursor-default here with pointer on the rows and
            // the Flip back button made the cursor blink on every boundary.
            onClick={(event) => {
              if (!(event.target as HTMLElement).closest("a, button")) {
                flipNow(false);
              }
            }}
          >
            {/* ambient colour: two blurred blobs drifting behind the glass */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              {/* the brand is a light teal in dark mode, so the same alpha
                  reads far hotter there than on white */}
              <div className="absolute -left-1/4 top-[-15%] h-2/3 w-2/3 animate-blob-drift rounded-full bg-brand/30 blur-3xl motion-reduce:animate-none dark:bg-brand/8" />
              <div className="absolute -right-1/4 bottom-[-10%] h-2/3 w-2/3 animate-blob-drift rounded-full bg-brand-soft/25 blur-3xl [animation-delay:-6s] motion-reduce:animate-none dark:bg-brand-soft/7" />
            </div>

            {/* specular highlight, positioned by the rAF loop to sit under
                the cursor. Width is set to match GLOW_WIDTH. */}
            <span
              ref={glowRef}
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-transparent via-white/16 to-transparent dark:via-white/5"
            />

            {/* edge lighting: a bright line along the top and a soft dark one
                along the bottom, which is what gives a pane of glass its
                thickness. Inset, so it reads as the sheet's own edge. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.65),inset_0_-1px_0_rgba(0,0,0,0.06),inset_1px_0_0_rgba(255,255,255,0.28),inset_-1px_0_0_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-1px_0_rgba(0,0,0,0.3),inset_1px_0_0_rgba(255,255,255,0.07),inset_-1px_0_0_rgba(0,0,0,0.2)]"
            />

            {/* a faint sheet-wide tint from top-left, so the pane isn't flat */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/25 via-transparent to-white/5 dark:from-white/6 dark:to-white/2"
            />

            {/* availability sits in the corner, out of the centred stack */}
            <span
              className={`absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full bg-signal-bg px-3 py-1.5 text-[0.65rem] font-medium text-signal-fg shadow-[0_0_18px_-2px_var(--signal-glow)] ring-1 ring-signal/25 ${
                flipped ? "animate-row-in" : "opacity-0"
              }`}
            >
              <span className="h-1.5 w-1.5 animate-status-pulse rounded-full bg-signal motion-reduce:animate-none" />
              Open to new projects
            </span>

            <div className="relative flex h-full flex-col p-6">
              <div className="flex flex-1 flex-col justify-center">
                <h2
                  className={`text-3xl font-semibold leading-tight tracking-[-0.02em] text-brand ${
                    flipped ? "animate-row-in" : "opacity-0"
                  }`}
                  style={{ animationDelay: "60ms" }}
                >
                  Let&apos;s talk
                </h2>

                <div className="mt-4">
                  <ContactList
                    compact
                    show={flipped}
                    startDelay={140}
                    focusable={flipped}
                  />
                </div>
              </div>

              {/* sits on the card's bottom edge, clear of the contact rows */}
              <button
                type="button"
                onClick={() => flipNow(false)}
                tabIndex={flipped ? 0 : -1}
                className={`mt-6 cursor-pointer self-start text-xs font-medium text-ink-subtle transition-colors hover:text-brand ${
                  flipped ? "animate-row-in" : "opacity-0"
                }`}
                style={{ animationDelay: "400ms" }}
              >
                Flip back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* the nudge: present but quiet, and it gets out of the way once flipped */}
      {/* The fade lives on the <p> and the nudge on the <span>: an animation
          always beats a transition on the same property, so opacity needs its
          own element. Pausing rather than dropping the nudge keeps the text
          from snapping back to translateY(0) as it fades. */}
      <p
        aria-hidden
        className={`mt-3 text-center text-xs text-ink-subtle transition-opacity duration-500 ${
          flipped ? "opacity-0" : "opacity-100"
        }`}
      >
        <span
          className={`inline-block animate-nudge motion-reduce:animate-none ${
            flipped ? "[animation-play-state:paused]" : ""
          }`}
        >
          {canHover
            ? "hover me — there's another side to this"
            : "flip it — there's another side to this"}
        </span>
      </p>
    </div>
  );
}
