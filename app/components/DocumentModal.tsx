"use client";

import { useEffect } from "react";

type DocumentModalProps = {
  imageSrc: string;
  pdfSrc: string;
  alt: string;
  onClose: () => void;
};

export default function DocumentModal({
  imageSrc,
  pdfSrc,
  alt,
  onClose,
}: DocumentModalProps) {
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
      className="fixed inset-0 z-50 animate-overlay-in bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="absolute right-4 top-4 z-10 flex items-center gap-3 sm:right-6 sm:top-6">
        <a
          href={pdfSrc}
          download
          onClick={(event) => event.stopPropagation()}
          aria-label="Download PDF"
          title="Download PDF"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M8 2v8.5m0 0L4.5 7M8 10.5 11.5 7M2.5 13.5h11" />
          </svg>
        </a>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>
      </div>

      <div className="flex h-full items-start justify-center overflow-y-auto p-4 pt-5 sm:p-8 sm:pt-6">
        <img
          src={imageSrc}
          alt={alt}
          onClick={(event) => event.stopPropagation()}
          className="w-full max-w-2xl animate-modal-in rounded-2xl bg-white shadow-2xl"
        />
      </div>
    </div>
  );
}
