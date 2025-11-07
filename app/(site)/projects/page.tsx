"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"

type ProjectLite = {
  title: string
  slug: string
  summary: string
  tags: string[]
  cover?: string
  featured?: boolean
}

// Beispiel-Daten (wenn du später Contentlayer nutzt, einfach ersetzen)
const projects: ProjectLite[] = [
  {
    title: "Workmate – HR/Backoffice Toolkit",
    slug: "workmate",
    summary:
      "Ein Fullstack-Tool für Personalakten, Reminders und Abwesenheiten. Entwickelt mit FastAPI und PostgreSQL.",
    tags: ["FastAPI", "Postgres", "Vue", "React", "Docker"],
    cover: "/images/workmate-cover.png",
    featured: true,
  },
  {
    title: "Nerdcast – Der Podcast für Nerds, IT & Alltag",
    slug: "nerdcast",
    summary:
      "Mein persönlicher Podcast über Technik, Popkultur und das echte Leben als Nerd & ITler.",
    tags: ["Podcast", "Tech", "Popkultur", "Linux"],
    cover: "/images/nerdcast-cover.jpg",
    featured: false,
  },
  {
    title: "TravelTune – Reisen, Musik & Nerd-Momente",
    slug: "traveltune",
    summary:
      "Ein Reise- & Lifestyle-Projekt mit Jessica: Nerdkultur trifft Roadtrip-Vibes.",
    tags: ["Travel", "Content", "Music"],
    cover: "/images/traveltune-logo.png",
    featured: false,
  },
]

export default function ProjectsPage() {
  const [q, setQ] = useState("")

  const filtered = useMemo<ProjectLite[]>(() => {
    const query = q.toLowerCase().trim()
    if (!query) return projects
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query))
    )
  }, [q])

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <h1 className="mb-6 text-4xl font-bold">Projekte</h1>
      <p className="mb-8 max-w-2xl text-white/70">
        Von Backoffice-Tools bis Podcasts & Reisen – meine Projekte zeigen, dass
        IT mehr sein kann als nur Technik. ⚡
      </p>

      {/* Searchbar */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="🔍 Nach Projekt oder Tag suchen..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--accent,#ff9100)]"
          aria-label="Projekte durchsuchen"
        />
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-[var(--accent,#ff9100)]"
          >
            {p.cover && (
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src={p.cover}
                  alt={p.title}
                  width={1200}
                  height={675}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={false}
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-lg font-semibold group-hover:text-[var(--accent,#ff9100)]">
                {p.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-white/80">{p.summary}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/70 ring-1 ring-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-white/50">Keine Projekte gefunden.</p>
      )}
    </section>
  )
}
