"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

// Measuring has to land before paint or the steps flash in visible and then
// hide; useLayoutEffect warns during SSR, so fall back there.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type Step = { number: string; title: string; description: string };

// Lane geometry. AMP is how far the spine sways off centre; small enough that
// the line still reads as a spine rather than a squiggle, and it shrinks on
// narrow screens where the lane itself is tighter.
const LANE = 44;
const CX = LANE / 2;
const AMP_WIDE = 13;
const AMP_NARROW = 7;
// A fixed scan line: the spine fills to wherever this height in the viewport
// intersects the list. Every node therefore lights at the same screen
// position, instead of later ones needing progressively more scroll.
const SCAN = 0.78;
// Copy starts arriving slightly before the line reaches its node.
const LEAD = 40;

// Subscribed rather than read into state in an effect, which would trigger a
// cascading render.
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const getReduced = () => window.matchMedia(REDUCED_QUERY).matches;
const getServerReduced = () => false;

export default function ProcessTimeline({ steps }: { steps: Step[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [geometry, setGeometry] = useState({
    height: 0,
    d: "",
    nodes: [] as number[],
  });
  const [drawn, setDrawn] = useState(0);
  const reduced = useSyncExternalStore(
    subscribeReduced,
    getReduced,
    getServerReduced,
  );

  // Measure where each step sits, then thread a serpentine path through those
  // exact points so the nodes always land on the line, whatever the copy
  // reflows to at a given width.
  useIsomorphicLayoutEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const amp = window.innerWidth < 640 ? AMP_NARROW : AMP_WIDE;
      const height = wrap.offsetHeight;
      const nodes = stepRefs.current.map((el) => (el ? el.offsetTop + 22 : 0));

      // The spine runs from the first bullet to the last, rather than the
      // full height of the block, so it has no loose ends.
      let d = "";
      if (nodes.length) {
        d = `M ${CX} ${nodes[0]}`;
        let prev = nodes[0];
        nodes.slice(1).forEach((y, i) => {
          const dir = i % 2 === 0 ? 1 : -1;
          d += ` Q ${CX + amp * dir} ${(prev + y) / 2} ${CX} ${y}`;
          prev = y;
        });
      }

      setGeometry({ height, d, nodes });
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (wrapRef.current) observer.observe(wrapRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [steps.length]);

  // One scroll listener drives both the line and the step reveals, so the
  // text can never get out of step with the line reaching it.
  useEffect(() => {
    if (reduced) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const scanLine = window.innerHeight * SCAN;
      setDrawn(Math.min(rect.height, Math.max(0, scanLine - rect.top)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  // Reduced motion shows the finished state rather than driving it.
  const drawnTo = reduced ? geometry.height : drawn;
  // Before the first measurement (and if JS never runs) every step renders
  // visible, so the content is never dependent on the animation.
  const measured = geometry.nodes.length > 0;

  return (
    <div ref={wrapRef} className="relative">
      {/* the spine */}
      <svg
        aria-hidden
        width={LANE}
        height={geometry.height}
        viewBox={`0 0 ${LANE} ${geometry.height || 1}`}
        className="pointer-events-none absolute left-0 top-0 overflow-visible"
      >
        <defs>
          <clipPath id="process-reveal">
            {/* grows downward with scroll, revealing the drawn line. A clip is
                used rather than a dash offset, which would slide the dots
                along the path instead of uncovering them. */}
            <rect
              x="-40"
              y="0"
              width={LANE + 80}
              height={Math.max(0, drawnTo)}
            />
          </clipPath>
        </defs>

        {/* untravelled remainder: tinted brand rather than neutral, so the
            track reads as part of the spine instead of a hairline */}
        <path
          d={geometry.d}
          fill="none"
          stroke="currentColor"
          className="text-brand/25"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="3 8"
        />
        {/* the same path at full strength, clipped to the scroll progress */}
        <path
          d={geometry.d}
          fill="none"
          stroke="currentColor"
          className="text-brand"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="3 8"
          clipPath="url(#process-reveal)"
        />

        {geometry.nodes.map((y, i) =>
          drawnTo >= y ? (
            <g
              key={i}
              className="[transform-box:fill-box] [transform-origin:center]"
            >
              <circle
                cx={CX}
                cy={y}
                r="6"
                className="animate-node-ring fill-brand [transform-box:fill-box] [transform-origin:center] motion-reduce:hidden"
              />
              <circle
                cx={CX}
                cy={y}
                r="5.5"
                className="animate-node-pop fill-brand [transform-box:fill-box] [transform-origin:center]"
              />
            </g>
          ) : null,
        )}
      </svg>

      <ol className="space-y-14 sm:space-y-16">
        {steps.map((step, i) => {
          const shown =
            reduced || !measured || drawnTo >= geometry.nodes[i] - LEAD;
          return (
            <li
              key={step.number}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className={`pl-[60px] transition-all duration-700 ease-out sm:pl-20 ${
                shown
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-brand/45 sm:text-3xl">
                  {step.number}
                </span>
                <h3 className="text-lg font-semibold text-brand sm:text-xl">
                  {step.title}
                </h3>
              </div>
              <p className="mt-3 text-base leading-relaxed text-ink-muted sm:text-lg">
                {step.description}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
