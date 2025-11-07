"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

type Project = {
  title: string
  slug: string
  url: string
  summary?: string
  tags?: string[]
  date?: string | Date
}

export default function ProjectsFilter({ projects }: { projects: Project[] }) {
  const [q, setQ] = useState("")
  const [activeTags, setActiveTags] = useState<string[]>([])

  // alle Tags aus Projekten sammeln
  const allTags = useMemo(() => {
    const s = new Set<string>()
    projects.forEach(p => p.tags?.forEach(t => s.add(t)))
    return Array.from(s).sort((a, b) => a.localeCompare(b))
  }, [projects])

  // Suche + Tag-Filter
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    return projects.filter(p => {
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.summary?.toLowerCase().includes(query) ||
        p.tags?.some(t => t.toLowerCase().includes(query))

      const matchesTags =
        activeTags.length === 0 ||
        activeTags.every(t => p.tags?.includes(t))

      return matchesQuery && matchesTags
    })
  }, [projects, q, activeTags])

  function toggleTag(tag: string) {
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  function clearFilters() {
    setQ("")
    setActiveTags([])
  }

  return (
    <div className="space-y-4">
      {/* Search + Controls */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Suche Projekte…"
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 outline-none focus:border-[var(--accent)]"
        />
        <button onClick={clearFilters} className="btn btn-outline">
          Reset
        </button>
      </div>

      {/* Tag-Chips */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => {
            const on = activeTags.includes(tag)
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full px-3 py-1 text-xs border transition-colors ${
                  on
                    ? "border-[var(--accent)] bg-[var(--accent)]/20 text-white"
                    : "border-white/15 text-white/80 hover:border-white/25"
                }`}
              >
                {tag}
              </button>
            )
          })}
        </div>
      )}

      {/* Result-Zeile */}
      <div className="text-sm text-muted">
        {filtered.length} Ergebnis{filtered.length === 1 ? "" : "se"} ·{" "}
        {activeTags.length > 0 ? `Tags: ${activeTags.join(", ")}` : "alle Tags"}
      </div>

      {/* Grid */}
      <div className="k-grid">
        {filtered.length === 0 ? (
          <EmptyState onReset={clearFilters} />
        ) : (
          filtered.map((p) => (
            <ProjectCardLite key={p.slug} project={p} />
          ))
        )}
      </div>
    </div>
  )
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="col-span-full glass rounded-2xl p-6 text-center">
      <p className="text-dim">Keine Projekte gefunden.</p>
      <button onClick={onReset} className="mt-3 btn btn-accent">Filter zurücksetzen</button>
    </div>
  )
}

// kleine, schnelle Karte (nutzt dein bestehendes Card-Design indirekt)
function ProjectCardLite({ project }: { project: Project }) {
  return (
    <div className="transition-transform hover:-translate-y-1 will-change-transform glass rounded-2xl ring-soft">
      <div className="p-4 space-y-2">
        <Link href={project.url} prefetch={false} className="text-lg font-semibold hover:text-[var(--accent)] transition-colors">
          {project.title}
        </Link>
        {project.summary && <p className="text-sm text-dim line-clamp-2">{project.summary}</p>}
        {project.tags?.length ? (
          <div className="flex flex-wrap gap-2 pt-1.5">
            {project.tags.slice(0, 6).map(t => (
              <span key={t} className="text-[11px] rounded-full border border-white/15 px-2 py-0.5 text-white/70">
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
