"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import LoomEmbed from "../../components/LoomEmbed";
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

            {project.question && (
              <p className="mt-8 max-w-3xl text-2xl leading-snug text-ink-muted sm:text-3xl">
                {project.question}
              </p>
            )}

            {(project.role || project.engagement || project.research) && (
              <div className="mt-10 flex flex-wrap gap-x-16 gap-y-6 border-t border-black/5 pt-8">
                {project.role && (
                  <div>
                    <p className="text-xs font-medium tracking-[0.12em] text-ink-subtle uppercase">
                      Role
                    </p>
                    <p className="mt-2 text-base text-ink-muted">
                      {project.role.join(", ")}
                    </p>
                  </div>
                )}
                {project.engagement && (
                  <div>
                    <p className="text-xs font-medium tracking-[0.12em] text-ink-subtle uppercase">
                      Engagement
                    </p>
                    <p className="mt-2 text-base text-ink-muted">
                      {project.engagement}
                    </p>
                  </div>
                )}
                {project.research && (
                  <div>
                    <p className="text-xs font-medium tracking-[0.12em] text-ink-subtle uppercase">
                      Research basis
                    </p>
                    <p className="mt-2 max-w-xs text-base text-ink-muted">
                      {project.research}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* The real prototype, embedded so visitors can drive it. Project 1
              has its own page, so this route only renders LOOM. */}
          <LoomEmbed
            src="/loom/index.html"
            poster={project.image}
            alt={project.title}
          />

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
            </div>
          </div>
        </div>
      </section>

      {project.decisions && (
        <section className="bg-surface pb-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <h2 className="text-3xl font-semibold text-brand">
              Design decisions
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-ink-subtle">
              Each of these is live in the prototype above.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
              {project.decisions.map((decision) => (
                <div key={decision.title}>
                  {decision.image && (
                    <div className="relative mb-5 aspect-[2/1] overflow-hidden rounded-xl border border-black/5 bg-surface-muted">
                      <Image
                        src={decision.image}
                        alt={`${decision.title}, shown in the LOOM prototype`}
                        fill
                        sizes="(max-width: 768px) 100vw, 480px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-brand">
                    {decision.title}
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-ink-muted">
                    {decision.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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

    </main>
  );
}
