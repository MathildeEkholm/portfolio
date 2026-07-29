"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import { projects } from "../data";

export default function ProjectDetail() {
  const params = useParams();
  const projectId = params.id as string;
  const project = projects[projectId];

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-brand">Project not found</h1>
          <Link href="/#projects" className="mt-8 block text-brand hover:opacity-80">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="bg-surface pb-20 pt-28 sm:pt-32">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="mb-16">
            <p className="text-sm font-medium tracking-[0.09em] text-brand-soft uppercase">
              {project.category}
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-brand sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-ink-subtle">{project.year}</p>
          </div>

          <div className="relative mb-16 aspect-video overflow-hidden rounded-2xl bg-surface-muted">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-brand">
                Overview
              </h3>
              <p className="text-lg leading-relaxed text-ink-muted">{project.overview}</p>

              <h3 className="mb-4 mt-12 text-xl font-semibold text-brand">
                Problem
              </h3>
              <p className="text-lg leading-relaxed text-ink-muted">{project.problem}</p>

              <h3 className="mb-4 mt-12 text-xl font-semibold text-brand">
                Solution
              </h3>
              <p className="text-lg leading-relaxed text-ink-muted">{project.solution}</p>
            </div>

            <div>
              <h3 className="mb-6 text-xl font-semibold text-brand">
                Results
              </h3>
              <ul className="space-y-4">
                {project.results.map((result, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand" />
                    <span className="text-lg text-ink-muted">{result}</span>
                  </li>
                ))}
              </ul>

              <h3 className="mb-6 mt-12 text-xl font-semibold text-brand">
                Tools & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full bg-surface-muted px-4 py-2 text-sm text-ink"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-muted py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="mb-16 text-3xl font-semibold text-brand">
            Design Process
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {project.process.map((step, index) => (
              <div key={index}>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand">
                  <span className="text-sm font-bold text-surface">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-brand">
                  {step.title}
                </h3>
                <p className="text-lg text-ink-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="rounded-2xl bg-surface-muted p-8 sm:p-12">
            <p className="mb-6 text-lg leading-relaxed text-ink-muted">
              &ldquo;{project.testimonial}&rdquo;
            </p>
            <p className="text-lg text-ink-subtle">
              Client / Stakeholder
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
