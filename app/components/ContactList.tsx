"use client";

import { useEffect, useRef, useState } from "react";
import { channels } from "../contact-info";
import ContactIcon from "./ContactIcon";

const iconProps = {
  width: 15,
  height: 15,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type Props = {
  // Tighter type and spacing for the flip card, which has less room than the
  // modal. Everything else is deliberately identical between the two.
  compact?: boolean;
  // Gates the entrance animation; the flip card only plays it once flipped.
  show?: boolean;
  startDelay?: number;
  focusable?: boolean;
};

export default function ContactList({
  compact = false,
  show = true,
  startDelay = 120,
  focusable = true,
}: Props) {
  const [copied, setCopied] = useState<string | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  // Copy wins over following the link, but only where the clipboard is
  // available; otherwise the mailto:/tel: default is left alone.
  const onCopy = async (
    event: React.MouseEvent,
    label: string,
    text: string,
  ) => {
    if (!navigator.clipboard) return;
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(label);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(null), 1600);
  };

  return (
    <>
      {/* cursor-pointer on the list, not just the rows: the gaps between rows
          would otherwise fall back to the container's cursor, so the pointer
          blinked on and off as you moved down the list */}
      <ul
        className={`flex cursor-pointer flex-col ${compact ? "gap-1" : "gap-2"}`}
      >
        {channels.map((channel, i) => (
          <li
            key={channel.label}
            className={show ? "animate-row-in" : "opacity-0"}
            style={{ animationDelay: `${startDelay + i * 70}ms` }}
          >
            <a
              href={channel.href}
              {...(channel.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              onClick={
                channel.copy
                  ? (event) => onCopy(event, channel.label, channel.copy!)
                  : undefined
              }
              tabIndex={focusable ? 0 : -1}
              /* ring rather than border: it draws outside the box, so the row
                 doesn't shift by a pixel when it appears on hover */
              className={`group flex items-center rounded-2xl ring-1 ring-transparent transition-[box-shadow] duration-200 hover:ring-line ${
                compact ? "gap-2.5 px-2.5 py-2" : "gap-3 px-3 py-3"
              }`}
            >
              <span
                className={`flex shrink-0 items-center justify-center rounded-full bg-brand-muted text-brand ring-1 ring-transparent transition-[box-shadow] duration-200 group-hover:ring-brand/30 ${
                  compact ? "h-8 w-8" : "h-9 w-9"
                }`}
              >
                <ContactIcon
                  label={channel.label}
                  className={compact ? "h-3.5 w-3.5" : "h-4 w-4"}
                />
              </span>

              <span className="min-w-0 flex-1">
                <span
                  className={`block font-medium tracking-[0.09em] text-brand-soft uppercase ${
                    compact ? "text-[0.6rem]" : "text-[0.7rem]"
                  }`}
                >
                  {channel.label}
                </span>
                <span
                  className={`block truncate font-medium text-ink ${
                    compact ? "text-xs" : "text-sm"
                  }`}
                >
                  {channel.value}
                </span>
              </span>

              <span
                aria-hidden
                className={`shrink-0 transition-opacity duration-200 ${
                  copied === channel.label
                    ? "text-brand opacity-100"
                    : "text-ink-subtle opacity-0 group-hover:opacity-70"
                }`}
              >
                {channel.copy ? (
                  copied === channel.label ? (
                    // check: the copy landed
                    <svg {...iconProps} strokeWidth="1.6">
                      <path d="M3 8.5 6.5 12 13 4.5" />
                    </svg>
                  ) : (
                    // two stacked sheets: copy to clipboard
                    <svg {...iconProps} strokeWidth="1.4">
                      <rect x="5.5" y="5.5" width="8" height="8" rx="2" />
                      <path d="M10.5 3.5a2 2 0 0 0-2-2h-4a3 3 0 0 0-3 3v4a2 2 0 0 0 2 2" />
                    </svg>
                  )
                ) : (
                  // arrow leaving a box: opens in a new tab
                  <svg {...iconProps} strokeWidth="1.4">
                    <path d="M13 9.5v3a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 2 12.5v-8A1.5 1.5 0 0 1 3.5 3h3" />
                    <path d="M9.5 2H14v4.5M14 2 7.5 8.5" />
                  </svg>
                )}
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* the copy confirmation is icon-only, so announce it separately */}
      <span aria-live="polite" className="sr-only">
        {copied ? `${copied} copied to clipboard` : ""}
      </span>
    </>
  );
}
