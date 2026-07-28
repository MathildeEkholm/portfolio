"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./showcase.module.css";

type Screen = {
  src: string;
  alt: string;
  title: string;
  description: string;
  anim: "left" | "center";
  hasPanel?: boolean;
};

const screens: Screen[] = [
  {
    src: "/images/strava/03-overview.png",
    alt: "Overview tab",
    title: "Where You Stand, at a Glance",
    description:
      "Sync your wearables and see your complete fitness picture. Weekly performance metrics, streaks, and personalized insights help you understand what's working and where to push harder.",
    anim: "left",
  },
  {
    src: "/images/strava/04-challenges.png",
    alt: "Challenges tab",
    title: "Rise to the Challenge",
    description:
      "Compete with friends in friendly fitness battles. Track group progress, celebrate wins together, and stay accountable as part of a community that values movement and mutual support.",
    anim: "center",
    hasPanel: true,
  },
  {
    src: "/images/strava/01-training.png",
    alt: "Training tab",
    title: "Expert Guidance at Your Side",
    description:
      "Connect with personalized coaching programs designed for your fitness journey. Video guides, live sessions, and progress tracking keep you motivated every step of the way.",
    anim: "left",
  },
  {
    src: "/images/strava/02-activity.png",
    alt: "Activity tab",
    title: "Every Move Matters",
    description:
      "Detailed activity logs capture every run, ride, and workout. Track duration, calories burned, and distance with beautiful charts that show your progress at a glance.",
    anim: "center",
  },
];

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

export default function ShowcaseAnimation() {
  const rootRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);

  // Panels are portaled to document.body (see render below) so they escape
  // the 3D-transformed .screenContainer/.stage ancestors entirely — Chromium
  // and WebKit fail to composite backdrop-filter blur on a descendant of an
  // element with an active perspective/rotate transform, which is exactly
  // what scroll + cursor-tilt apply here. Portals need `document`, so they
  // only render once mounted on the client.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!rootRef.current) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let panelLoopActive = false;

    const transformFor = (kind: "left" | "center", progress: number) => {
      const eased = easeInOutCubic(progress);
      const x = kind === "left" ? -150 * (1 - eased) : 0;
      const y = (kind === "left" ? 300 : 320) * (1 - eased);
      const rotY = 18 * (1 - eased);
      const rotZ = (kind === "left" ? -8 : 8) * (1 - eased);
      const z = 150 * (1 - eased);
      const scale = 0.75 + 0.25 * eased;
      return {
        transform: `perspective(1200px) translateX(${x}px) translateY(${y}px) translateZ(${z}px) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`,
        opacity: Math.min(1, progress * 2),
      };
    };

    // Panel offset from the stage's top-left corner, matching the original
    // absolute positioning.
    const PANEL_DX = -170;
    const PANEL_DY = 115;

    // Positions a portaled panel at the fixed viewport coordinates matching
    // its original position, and aligns its blurred backdrop copy so the
    // blurred phone lines up pixel-for-pixel with the real one behind it.
    // dx/dy are the panel's own translate offsets, which must be cancelled
    // out of the backdrop so the "glass" stays put while the panel drifts.
    const positionPanel = (
      panel: HTMLElement,
      stage: HTMLElement,
      dx = 0,
      dy = 0,
    ) => {
      const stageRect = stage.getBoundingClientRect();
      panel.style.left = `${stageRect.left + PANEL_DX}px`;
      panel.style.top = `${stageRect.top + PANEL_DY}px`;

      const backdrop = panel.querySelector<HTMLImageElement>("img");
      if (backdrop) {
        backdrop.style.width = `${stageRect.width}px`;
        backdrop.style.height = `${stageRect.height}px`;
        backdrop.style.transform = `translate(${-PANEL_DX - dx}px, ${-PANEL_DY - dy}px)`;
      }
    };

    const update = () => {
      const windowHeight = window.innerHeight;
      const isMobile = window.innerWidth <= 1024;

      screens.forEach((screen, i) => {
        const section = sectionRefs.current[i];
        const stage = stageRefs.current[i];
        if (!section || !stage) return;

        const screenContainer = section.querySelector<HTMLElement>(
          `.${styles.screenContainer}`,
        );
        const textContainer = section.querySelector<HTMLElement>(
          `.${styles.textContainer}`,
        );
        if (!screenContainer || !textContainer) return;

        const rect = section.getBoundingClientRect();
        const start = windowHeight;
        const end = -section.offsetHeight * 0.3;
        const progress = Math.max(
          0,
          Math.min(1, (rect.top - start) / (end - start)),
        );

        const result = transformFor(screen.anim, progress);
        screenContainer.style.transform = result.transform;
        screenContainer.style.opacity = String(result.opacity);

        // Text fades in once the screen has mostly settled, and leaves
        // before the section fully scrolls out.
        const fadeInStart = 0.58;
        let textOpacity = 0;
        if (progress < fadeInStart) {
          textOpacity = 0;
        } else if (progress < fadeInStart + 0.08) {
          textOpacity = easeInOutCubic((progress - fadeInStart) / 0.08);
        } else if (progress < 0.87) {
          textOpacity = 1;
        } else {
          textOpacity = 1 - easeInOutCubic(Math.min(1, (progress - 0.87) / 0.08));
        }
        textContainer.style.opacity = isMobile
          ? "1"
          : String(Math.max(0, Math.min(1, textOpacity)));

        const panel = panelRefs.current[i];
        if (panel) {
          panel.dataset.visible = progress >= 0.74 ? "1" : "0";
          positionPanel(panel, stage);
          if (!panelLoopActive) {
            panel.style.opacity = progress >= 0.74 ? "1" : "0";
          }
        }
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // Cursor-follow tilt + glass panel loop. The scroll animation transforms
    // .screenContainer; the tilt transforms .stage inside it, so both compose.
    const supportsHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    let raf = 0;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    if (supportsHover) {
      panelLoopActive = true;
      const MAX_TILT = 10;
      panelRefs.current.forEach((panel) => {
        if (panel) panel.style.transition = "none";
      });
      const tiltState = new Map<HTMLElement, { rx: number; ry: number }>();
      const panelAlpha = new Map<HTMLElement, number>();

      window.addEventListener("mousemove", onMove, { passive: true });

      const loop = () => {
        stageRefs.current.forEach((stage) => {
          if (!stage) return;
          const rect = stage.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > window.innerHeight) return;

          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (mouseX - cx) / window.innerWidth;
          const dy = (mouseY - cy) / window.innerHeight;

          const target = { rx: -dy * MAX_TILT, ry: dx * MAX_TILT };
          const s = tiltState.get(stage) || { rx: 0, ry: 0 };
          s.rx += (target.rx - s.rx) * 0.08;
          s.ry += (target.ry - s.ry) * 0.08;
          tiltState.set(stage, s);

          stage.style.transform = `perspective(900px) rotateX(${s.rx}deg) rotateY(${s.ry}deg)`;
        });

        // Panels: eased fade + slide-in, counter-parallax against the stage
        // tilt, and a slow ambient float biased away from the phone. Position
        // is re-synced every frame so the panel tracks the scroll transform.
        const now = performance.now();
        panelRefs.current.forEach((panel, i) => {
          if (!panel) return;
          const stage = stageRefs.current[i];
          if (!stage) return;

          const s = tiltState.get(stage) || { rx: 0, ry: 0 };
          const target = panel.dataset.visible === "1" ? 1 : 0;

          let a = panelAlpha.get(panel) ?? 0;
          a += (target - a) * 0.09;
          panelAlpha.set(panel, a);

          const slideX = -22 * (1 - a);
          const parallaxX = s.ry * -3;
          const parallaxY = s.rx * 3;
          const floatX = (Math.sin(now / 1900) * 9 - 5) * a;
          const floatY = (Math.cos(now / 1400) * 11 - 6) * a;
          const dx = slideX + parallaxX + floatX;
          const dy = parallaxY + floatY;

          positionPanel(panel, stage, dx, dy);

          panel.style.opacity = String(a);
          panel.style.transform = `translate(${dx}px, ${dy}px)`;
        });

        raf = requestAnimationFrame(loop);
      };
      loop();
    }

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef}>
      {screens.map((screen, i) => (
        <section
          key={screen.src}
          ref={(el) => {
            sectionRefs.current[i] = el;
          }}
          className={styles.section}
          data-anim={screen.anim}
        >
          <div className={styles.content}>
            <div className={styles.screenContainer}>
              <div
                className={styles.stage}
                ref={(el) => {
                  stageRefs.current[i] = el;
                }}
              >
                <img src={screen.src} alt={screen.alt} />
              </div>
            </div>
            <div className={styles.textContainer}>
              <h3 className={styles.title}>{screen.title}</h3>
              <p className={styles.description}>{screen.description}</p>
            </div>
          </div>
        </section>
      ))}

      {mounted &&
        screens.map(
          (screen, i) =>
            screen.hasPanel &&
            createPortal(
              <div
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className={styles.glassPanel}
              >
                <div className={styles.panelBackdrop}>
                  <img src={screen.src} alt="" aria-hidden="true" />
                </div>
                <div className={styles.panelTint} />
                <div className={styles.glassOptionPrimary}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <circle cx="12" cy="12" r="8.5" />
                    <circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none" />
                  </svg>
                  <span>Start recording training</span>
                </div>
                <div className={styles.glassOption}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3.5 12a8.5 8.5 0 1 0 2.5-6L3.5 8.5" />
                    <path d="M3.5 3.5v5h5" />
                    <path d="M12 8v4.5l3 2" />
                  </svg>
                  <span>Record past training</span>
                </div>
                <div className={styles.glassOption}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5.5 21V4" />
                    <path d="M5.5 4.5h12l-2.5 4 2.5 4h-12" />
                  </svg>
                  <span>Create a challenge</span>
                </div>
              </div>,
              document.body,
              `panel-${i}`,
            ),
        )}
    </div>
  );
}
