"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// The prototype's own layout is fluid now, but embedded in the page it still
// gets a wide virtual viewport and is scaled down to the column. At the
// column's real width it would drop into its stacked sub-1200px layout, and
// the fixed-width rail and detail panel would leave the canvas almost nothing.
// Opened in its own tab it fills the window properly.
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

      {/* caption and link share a row; the copy is short enough to hold one
          line at the column's width, and wraps below the link only on narrow
          screens */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <p className="text-sm text-ink-subtle">
          {interactive ? (
            <>
              Live prototype — hover a signal to isolate it, or click{" "}
              <span className="text-brand">show me</span> to trace a claim.
            </>
          ) : (
            <>Prototype is best viewed on a larger screen.</>
          )}
        </p>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium text-brand ring-1 ring-line transition-all duration-200 hover:bg-brand-muted/40 hover:ring-brand/50"
        >
          Open in a new tab
          {/* arrow leaving a box, matching the external-link icon elsewhere */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px motion-reduce:transition-none"
          >
            <path d="M13 9.5v3a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 2 12.5v-8A1.5 1.5 0 0 1 3.5 3h3" />
            <path d="M9.5 2H14v4.5M14 2 7.5 8.5" />
          </svg>
        </a>
      </div>
    </div>
  );
}
