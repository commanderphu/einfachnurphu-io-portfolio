import Image from "next/image"
import Link from "next/link"
import { projects } from "#site/content"

type Project = typeof projects[number]

type ProjectCardProps = {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const href = project.url || `/projects/${project.slug}`

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[.04] transition-transform hover:-translate-y-1 will-change-transform ring-soft">
      <div className="relative aspect-[16/9] bg-black/20">
        {project.cover ? (
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 skeleton" />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent" />
      </div>

      <div className="p-4">
        <Link
          href={href}
          prefetch={false}
          className="block text-lg font-semibold transition-colors hover:text-[var(--accent)]"
        >
          {project.title}
        </Link>
        
        {project.summary && (
          <p className="mt-1 line-clamp-2 text-sm text-white/70">
            {project.summary}
          </p>
        )}

        {project.tags && project.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tags.slice(0, 5).map((tag: string) => (
              <span
                key={tag}
                className="text-[11px] rounded-full border border-white/15 px-2 py-0.5 text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-[color-mix(in oklab,var(--accent) 45%, white)] transition-[ring]" />
    </div>
  )
}