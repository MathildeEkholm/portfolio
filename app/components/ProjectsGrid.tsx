import Link from "next/link";
import { projectList } from "../projects/data";

export default function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3">
      {projectList.map((project) => (
        <Link
          key={project.id}
          href={`/projects/${project.id}`}
          className="group flex flex-col"
        >
          <div className="relative mb-6 aspect-video overflow-hidden rounded-2xl bg-surface-muted">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <p className="text-sm font-medium tracking-[0.09em] text-brand-soft uppercase">
            {project.category}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-brand group-hover:text-brand">
            {project.title}
          </h3>
          <p className="mt-3 text-base text-ink-subtle">{project.description}</p>
          <span className="mt-4 text-sm font-medium text-brand group-hover:opacity-80">
            View case study →
          </span>
        </Link>
      ))}
    </div>
  );
}
