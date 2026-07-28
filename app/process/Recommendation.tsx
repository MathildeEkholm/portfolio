"use client";

import { useState } from "react";
import DocumentModal from "../components/DocumentModal";

const excerpt =
  "Mathilde is well-organised and keeps a clear overview of her responsibilities. She communicates clearly, is a pleasure to work with and brings genuine enthusiasm to everything she takes on. She has a feel for visual and graphic work, and her contributions have aligned the visual consistency of our digital presence.";

export default function Recommendation() {
  const [open, setOpen] = useState(false);

  return (
    <figure className="rounded-2xl bg-surface-muted p-8 sm:p-10">
      <span
        aria-hidden="true"
        className="block font-serif text-6xl leading-[0.6] text-brand/25"
      >
        &ldquo;
      </span>
      <blockquote className="mt-4 text-lg leading-relaxed text-ink-muted">
        {excerpt}
      </blockquote>
      <figcaption className="mt-6 text-lg leading-relaxed text-ink-subtle">
        Brand &amp; Marketing Manager at EMBACO Global A/S
      </figcaption>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-8 inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-brand-muted/60 px-5 py-2.5 text-sm font-medium text-brand transition-colors hover:bg-brand-muted"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9.5 1.5H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5m-3.5-3.5L13 5M9.5 1.5V5H13M5.5 8.5h5M5.5 11h3" />
        </svg>
        View recommendation
      </button>

      {open && (
        <DocumentModal
          imageSrc="/documents/recommendation-mathilde-embaco.png"
          pdfSrc="/documents/recommendation-mathilde-embaco.pdf"
          alt="Letter of recommendation for Mathilde Ekholm from the Brand & Marketing Manager at EMBACO Global A/S"
          onClose={() => setOpen(false)}
        />
      )}
    </figure>
  );
}
