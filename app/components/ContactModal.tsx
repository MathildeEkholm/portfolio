"use client";

import { useEffect } from "react";
import ContactList from "./ContactList";

export default function ContactModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex animate-overlay-in items-center justify-center bg-black/60 p-5 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-sm animate-modal-in overflow-hidden rounded-3xl bg-surface p-7 shadow-2xl shadow-black/25 ring-1 ring-line-soft sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-ink-subtle transition-colors hover:bg-brand-muted/60 hover:text-brand"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>

        <h2
          id="contact-modal-title"
          className="text-2xl font-semibold text-brand"
        >
          Say hello 👋
        </h2>
        <p className="mt-2 text-sm text-ink-subtle">
          No forms, no cookie banner. Pick a channel.
        </p>

        <div className="mt-6">
          <ContactList />
        </div>
      </div>
    </div>
  );
}
