import Link from "next/link";
import { projectList } from "../projects/data";
import DeviceFrame from "./DeviceFrame";

export default function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12">
      {projectList.map((project) => (
        <Link
          key={project.id}
          href={`/projects/${project.id}`}
          className="group flex flex-col"
        >
          {/* devices sit on a shared baseline so the copy below lines up */}
          <div className="flex h-[300px] items-end justify-center sm:h-[380px]">
            <DeviceFrame
              src={project.cover}
              alt={project.title}
              device={project.coverDevice}
            />
          </div>
          <p className="mt-10 text-sm font-medium tracking-[0.09em] text-brand-soft uppercase">
            {project.category}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-brand">
            {project.title}
          </h3>
          <p className="mt-3 max-w-sm text-base text-ink-subtle">
            {project.description}
          </p>
          <span className="mt-4 text-sm font-medium text-brand group-hover:opacity-80">
            View case study →
          </span>
        </Link>
      ))}
    </div>
  );
}
