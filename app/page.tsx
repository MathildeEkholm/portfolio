import SiteHeader from "./components/SiteHeader";
import ProjectsGrid from "./components/ProjectsGrid";
import ProfileFlipCard from "./components/ProfileFlipCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="bg-surface">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 px-5 pb-16 pt-28 sm:px-8 sm:pt-32 md:grid-cols-2 md:gap-16 md:pb-24">
          <div>
            <p className="text-sm font-normal tracking-[0.09em] text-brand-soft">
              PRODUCT DESIGNER
            </p>
            <h1 className="mt-4 text-5xl font-bold leading-[1] tracking-[-0.02em] text-brand sm:text-6xl md:text-7xl">
              Mathilde
              <br />
              Ekholm
            </h1>
            <p className="mt-6 max-w-md text-lg text-ink-muted">
              Aiming to design intuitive digital products by bridging UX
              research, design &amp; prototyping to create experiences that put
              users first.
            </p>
            <a
              href="#projects"
              /* same glass recipe as the nav pills: translucent tint, soft ring, blur */
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-cta-bg px-7 py-3 text-base font-medium text-cta-fg ring-1 ring-line-soft backdrop-blur-[2px] backdrop-saturate-150 transition-all duration-200 hover:ring-line hover:backdrop-blur-xl"
            >
              Featured projects
              {/* nudges down on hover, hinting that this scrolls rather than navigates */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-y-0.5 motion-reduce:transition-none"
              >
                <path d="M8 3v9M4 8.5 8 12.5l4-4" />
              </svg>
            </a>
          </div>
          <ProfileFlipCard />
        </div>
      </section>

      {/* generous tail so the last card can scroll clear of the fold */}
      <section
        id="projects"
        className="scroll-mt-24 bg-surface-muted pt-20 pb-[30vh] sm:scroll-mt-28"
      >
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <ProjectsGrid />
        </div>
      </section>
    </main>
  );
}
