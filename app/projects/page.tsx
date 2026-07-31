import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import { projectList } from "./data";

export const metadata = {
  title: "Projects — Mathilde Ekholm",
  description: "All case studies and selected work by Mathilde Ekholm.",
};

export default function Projects() {
  return (
    <main className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="flex-1 bg-surface pt-36 pb-24 sm:pt-44">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h1 className="text-3xl font-semibold leading-tight text-brand sm:text-4xl">
            Projects
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Product design and AI concepts, shaped partly by hands-on work with
            real users and partly by academic research.
          </p>

          {/* divide-y puts rules only between rows, never above the first or
              below the last */}
          <ul className="mt-14 divide-y divide-line-soft">
            {projectList.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/projects/${project.id}`}
                  className="group -mx-4 flex items-center gap-6 rounded-2xl px-4 py-6 transition-colors duration-200 hover:bg-surface-muted sm:gap-8 sm:py-8"
                >
                  <div className="relative h-28 w-40 shrink-0 overflow-hidden rounded-xl bg-surface-muted ring-1 ring-line-soft transition-shadow duration-200 group-hover:ring-brand/25 sm:h-36 sm:w-52">
                    <Image
                      src={project.cover}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 160px, 208px"
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[0.7rem] font-medium tracking-[0.09em] text-brand-soft uppercase">
                      {project.category}
                    </p>
                    <h2 className="mt-1.5 text-lg font-semibold text-brand sm:text-2xl">
                      {project.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-subtle sm:text-base">
                      {project.description}
                    </p>
                  </div>

                  <span
                    aria-hidden
                    className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full text-brand ring-1 ring-line transition-all duration-200 group-hover:ring-brand/50 sm:flex"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                    >
                      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* deliberately not a list row: it isn't a project and shouldn't
              read as one */}
          <div className="mt-14 rounded-2xl border border-dashed border-line px-6 py-9 text-center">
            <span
              aria-hidden
              className="inline-flex items-center gap-1.5 text-brand-soft"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current opacity-40" />
              <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
            </span>
            <p className="mt-4 text-base font-medium text-ink">
              More case studies are being written up
            </p>
            <p className="mx-auto mt-1.5 max-w-md text-sm leading-relaxed text-ink-subtle">
              Further product and AI work is on the way, including research that
              is still under wraps. Get in touch if you&apos;d like to hear
              about it first.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
