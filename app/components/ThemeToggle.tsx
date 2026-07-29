"use client";

import { useCallback, useSyncExternalStore } from "react";

// The theme lives on <html class="dark">, applied by the inline script in
// app/layout.tsx before first paint. Subscribing to that class rather than
// mirroring it into local state keeps every toggle on the page in sync and
// avoids a post-hydration state update.
const listeners = new Set<() => void>();

const subscribe = (onStoreChange: () => void) => {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
};

const getSnapshot = (): "light" | "dark" =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

// The server has no DOM, so it renders the light-mode icon; React swaps in the
// real value right after hydration.
const getServerSnapshot = (): "light" | "dark" => "light";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore storage failures (private mode, blocked cookies)
    }
    listeners.forEach((listener) => listener());
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex h-13 w-13 cursor-pointer items-center justify-center rounded-full text-brand transition-all duration-300 ${className}`}
    >
      {/* Shows the theme you'd switch to: sun while dark, moon while light. */}
      {theme === "dark" ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="10" cy="10" r="3.75" />
          <path d="M10 1.5v2M10 16.5v2M18.5 10h-2M3.5 10h-2M15.95 4.05l-1.4 1.4M5.45 14.55l-1.4 1.4M15.95 15.95l-1.4-1.4M5.45 5.45l-1.4-1.4" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M17 11.4A7 7 0 0 1 8.6 3a7.002 7.002 0 1 0 8.4 8.4Z" />
        </svg>
      )}
    </button>
  );
}
