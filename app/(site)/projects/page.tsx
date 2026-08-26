import type { Metadata } from "next"
import { projects as allProjects } from "#site/content"
import ProjectsFilter from "@/components/projects/ProjectsFilter"
import type { ProjectStatus, ProjectSummary } from "@/components/projects/types"
import { STATUS_ORDER } from "@/components/projects/types"

export const metadata: Metadata = {
  title: "Projekte",
  description:
    "Von selbstgehosteter Infrastruktur über ERP-Software bis zu Podcast und Reisen – woran ich arbeite.",
}

// Velite liefert den kompilierten MDX-Body mit. Für die Übersicht wird davon
// nichts gebraucht, deshalb hier auf die Felder reduzieren, die die Karten
// tatsächlich anzeigen – das hält die an den Client gereichte Nutzlast klein.
function toSummary(p: (typeof allProjects)[number]): ProjectSummary {
  return {
    title: p.title,
    slug: p.slug,
    url: p.url,
    summary: p.summary,
    cover: p.cover,
    tags: p.tags,
    tech: p.tech,
    featured: p.featured,
    status: p.status as ProjectStatus | undefined,
    date: p.date,
  }
}

// Hervorgehobenes zuerst, dann nach Status (Laufendes vor Ruhendem),
// innerhalb dessen das Neueste zuerst.
function sortProjects(a: ProjectSummary, b: ProjectSummary) {
  if (a.featured !== b.featured) return a.featured ? -1 : 1

  const sa = a.status ? STATUS_ORDER[a.status] : 99
  const sb = b.status ? STATUS_ORDER[b.status] : 99
  if (sa !== sb) return sa - sb

  return new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
}

export default function ProjectsPage() {
  const projects = allProjects.map(toSummary).sort(sortProjects)

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <h1 className="mb-6 text-4xl font-bold">Projekte</h1>
      <p className="mb-10 max-w-2xl text-dim">
        Von selbstgehosteter Infrastruktur über ERP-Software bis zu Podcast und
        Reisen – woran ich arbeite und was davon läuft. ⚡
      </p>

      <ProjectsFilter projects={projects} />
    </section>
  )
}
