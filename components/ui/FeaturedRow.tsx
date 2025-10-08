import Link from "next/link"
import ProjectCard from "@/components/cards/ProjectCard"
import { allProjects, type Project } from ".contentlayer/generated"

type FeaturedRowProps = {
  /** Optional: eigene Items übergeben */
  items?: Project[]
  /** Überschrift über der Reihe */
  title?: string
  /** Anzahl limitieren (Standard: 3) */
  limit?: number
}

export default function FeaturedRow({
  items,
  title = "Featured Projekte",
  limit = 3,
}: FeaturedRowProps) {
  const featured: Project[] =
    items ??
    allProjects
      .filter((p) => p.featured)
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
      .slice(0, limit)

  if (featured.length === 0) return null

  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <Link
          href="/projects"
          className="text-[var(--accent)] hover:text-white transition-colors"
        >
          Alle Projekte →
        </Link>
      </div>

      <div className="k-grid">
        {featured.map((p) => (
          <ProjectCard key={p._id} project={p} />
        ))}
      </div>
    </section>
  )
}
``
