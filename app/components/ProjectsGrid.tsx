"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { projectList } from "../projects/data";
import DeviceFrame from "./DeviceFrame";

// Matches the cursor-tilt in the Strava showcase: a rAF loop easing towards a
// cursor-derived target rather than a CSS transition, so the card keeps
// tracking the pointer instead of snapping to a fixed end state.
const MAX_TILT = 6;
const EASING = 0.07;
const REST_THRESHOLD = 0.01;

export default function ProjectsGrid() {
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const supportsHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!supportsHover || reduced) return;

    const cards = cardRefs.current.filter(
      (card): card is HTMLAnchorElement => card !== null,
    );
    const tilt = new Map<HTMLElement, { rx: number; ry: number }>();
    const pointer = { x: 0, y: 0 };
    let hovered: HTMLAnchorElement | null = null;
    let raf = 0;

    const onMove = (event: MouseEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const loop = () => {
      let moving = false;

      cards.forEach((card) => {
        const state = tilt.get(card) ?? { rx: 0, ry: 0 };
        let targetRx = 0;
        let targetRy = 0;

        // Only the hovered card aims at the cursor; every other card eases
        // back to flat, so nothing is tilted at rest.
        if (card === hovered) {
          const rect = card.getBoundingClientRect();
          const dx =
            (pointer.x - (rect.left + rect.width / 2)) / (rect.width / 2);
          const dy =
            (pointer.y - (rect.top + rect.height / 2)) / (rect.height / 2);
          targetRx = -Math.max(-1, Math.min(1, dy)) * MAX_TILT;
          targetRy = Math.max(-1, Math.min(1, dx)) * MAX_TILT;
        }

        state.rx += (targetRx - state.rx) * EASING;
        state.ry += (targetRy - state.ry) * EASING;
        tilt.set(card, state);

        const settled =
          card !== hovered &&
          Math.abs(state.rx) < REST_THRESHOLD &&
          Math.abs(state.ry) < REST_THRESHOLD;

        if (settled) {
          state.rx = 0;
          state.ry = 0;
          card.style.transform = "";
        } else {
          moving = true;
          card.style.transform = `perspective(1000px) rotateX(${state.rx}deg) rotateY(${state.ry}deg)`;
        }
      });

      raf = moving ? requestAnimationFrame(loop) : 0;
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const teardown = cards.map((card) => {
      const onEnter = () => {
        hovered = card;
        start();
      };
      const onLeave = () => {
        if (hovered === card) hovered = null;
        start();
      };
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      return () => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      teardown.forEach((remove) => remove());
    };
  }, []);

  return (
    <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-6">
      {projectList.map((project, i) => (
        <Link
          key={project.id}
          href={`/projects/${project.id}`}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          /* min-w-0 keeps a wide device from blowing its grid track past 1fr */
          className="group relative flex min-w-0 flex-col px-4 pt-10 pb-12 text-center will-change-transform sm:px-8 sm:pt-12 sm:pb-14"
        >
          {/* the card itself: absent until hover, then fades in */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl bg-surface opacity-0 shadow-[0_28px_60px_-28px_rgba(0,0,0,0.3)] ring-1 ring-line-soft transition-opacity duration-500 ease-out group-hover:opacity-100 motion-reduce:transition-none"
          />
          <div className="relative flex w-full flex-col items-center">
            {/* fixed-height row keeps the copy aligned across cards; the device floats centred inside it */}
            <div className="flex h-[300px] w-full items-center justify-center sm:h-[380px]">
              <DeviceFrame
                src={project.cover}
                alt={project.title}
                device={project.coverDevice}
              />
            </div>
            <p className="mt-10 text-sm font-medium tracking-[0.09em] text-brand-soft uppercase">
              {project.category}
            </p>
            {/* fluid size + nowrap so the longest title holds one line at any width */}
            {/* single column on mobile leaves more room than 1.6vw implies,
                so the clamp only takes over from md up */}
            <h3 className="mt-2 whitespace-nowrap text-sm font-semibold tracking-[-0.01em] text-brand md:text-[clamp(0.75rem,1.6vw,1.125rem)]">
              {project.title}
            </h3>
            <p className="mt-3 max-w-sm text-base text-ink-subtle">
              {project.description}
            </p>
            {/* fixed height so the row is reserved at rest: fading it in must
                not reflow the card under the cursor */}
            {/* always visible on touch, where there is no hover to reveal it */}
            <span className="mt-4 flex h-6 items-center justify-center gap-1.5 text-sm font-medium text-brand transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
              View
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
              >
                <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
              </svg>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
