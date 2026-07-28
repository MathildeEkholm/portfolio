"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import DocumentModal from "./DocumentModal";
import Logo from "./Logo";

const navLinks = [
  { label: "Overview", href: "/" },
  { label: "Approach", href: "/process" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/" || pathname.startsWith("/projects")
      : pathname.startsWith(href);

  // Shared glass treatment, faded in once the page starts scrolling.
  const glass = `transition-all duration-300 ${
    scrolled
      ? "bg-glass shadow-lg shadow-black/5 ring-1 ring-line-soft backdrop-blur-[2px] backdrop-saturate-150"
      : "bg-transparent shadow-none ring-0 ring-transparent backdrop-blur-0"
  }`;

  // Every glass element blurs much harder while hovered (nav pill as a whole).
  const glassHover = `${glass} ${scrolled ? "hover:backdrop-blur-xl" : ""}`;

  const itemBase =
    "rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors duration-200";

  const logo = (
    <Link
      href="/"
      className={`group flex h-13 w-13 items-center justify-center rounded-full ${glassHover}`}
    >
      <Logo className="h-[18px] w-auto transition-opacity group-hover:opacity-70 sm:h-5" />
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 -mb-[84px] pt-4 sm:-mb-[92px] sm:pt-5 print:hidden">
      {/* Desktop: logo / centered nav / theme toggle, aligned to the content column.
          Same px as page sections so the pills line up with the text edge. */}
      <div className="mx-auto hidden max-w-5xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 sm:px-8 md:grid">
        {logo}

        <nav className="flex justify-center">
          <ul
            className={`flex h-11 items-center gap-x-1 rounded-2xl px-1.5 sm:gap-x-2 sm:px-2 ${glassHover}`}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`${itemBase} ${
                    isActive(link.href)
                      ? "bg-brand-muted text-brand"
                      : "text-brand hover:bg-brand-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className={`${itemBase} cursor-pointer text-brand hover:bg-brand-muted/50`}
              >
                Resume
              </button>
            </li>
          </ul>
        </nav>

        <div className="flex justify-end">
          <ThemeToggle className={glassHover} />
        </div>
      </div>

      {/* Mobile: logo + menu button; nav and theme toggle live in the dropdown. */}
      <div className="relative mx-auto flex max-w-5xl items-center justify-between px-5 sm:px-8 md:hidden">
        {logo}

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className={`flex h-13 w-13 cursor-pointer items-center justify-center rounded-full text-brand ${glassHover}`}
        >
          {menuOpen ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M2 4.5h14M2 9h14M2 13.5h14" />
            </svg>
          )}
        </button>

        {menuOpen && (
          <div className="absolute left-5 right-5 top-full mt-3 rounded-2xl bg-glass p-2 shadow-lg shadow-black/10 ring-1 ring-line-soft backdrop-blur-xl backdrop-saturate-150 sm:left-8 sm:right-8">
            <nav>
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={`block rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                        isActive(link.href)
                          ? "bg-brand-muted text-brand"
                          : "text-brand hover:bg-brand-muted/50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      setResumeOpen(true);
                    }}
                    className="block w-full cursor-pointer rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-brand transition-colors duration-200 hover:bg-brand-muted/50"
                  >
                    Resume
                  </button>
                </li>
              </ul>
            </nav>
            <div className="mt-1 border-t border-line-soft pt-1">
              <ThemeToggle className="hover:bg-brand-muted/50" />
            </div>
          </div>
        )}
      </div>

      {resumeOpen && (
        <DocumentModal
          imageSrc="/documents/resume.png"
          pdfSrc="/documents/mathilde-ekholm-resume.pdf"
          alt="Resume of Mathilde Ekholm, Product Designer"
          onClose={() => setResumeOpen(false)}
        />
      )}
    </header>
  );
}
