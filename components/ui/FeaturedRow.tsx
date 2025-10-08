import Link from "next/link"
import ProjectCard from "@/components/cards/ProjectCard"
import { allProjects, type Project } from ".contentlayer/generated"

type Props = {
  items?: Project[]
  title?: string
}

export default function FeaturedRow({ items, title = "Featured Projekte" }: Props) {
  const featured: Project[] =
    items ??
    allProjects
      .filter((p) => p.featured)
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
      .slice(0, 3)

  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link href="/projects" className="text-[var(--accent)] hover:underline">
          Alle Projekte →
        </Link>
      </div>

      <div className="k-grid">
        {featured.length === 0
          ? [0, 1, 2].map((i) => (
              <div key={i} className="h-56 rounded-xl skeleton" />
            ))
          : featured.map((p) => <ProjectCard key={p._id} project={p} />)}
      </div>
    </section>
  )
}
