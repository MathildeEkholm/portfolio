import Image from "next/image";
import SiteHeader from "./components/SiteHeader";
import ProjectsGrid from "./components/ProjectsGrid";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="bg-surface-muted">
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
              research, design &amp; prototyping to create experiences that
              put users first.
            </p>
            <a
              href="#projects"
              className="mt-8 inline-block rounded-full bg-brand px-8 py-4 text-base font-medium text-surface hover:opacity-90"
            >
              Projects
            </a>
          </div>
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl md:ml-auto md:mr-0">
            <Image
              src="/images/mathilde-hero.png"
              alt="Mathilde Ekholm"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-24 bg-surface py-20 sm:scroll-mt-28">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <ProjectsGrid />
        </div>
      </section>

    </main>
  );
}
