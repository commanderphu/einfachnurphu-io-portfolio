"use client"

import { useMemo, useState } from "react"
import ProjectCard from "@/components/cards/ProjectCard"
import type { ProjectStatus, ProjectSummary } from "@/components/projects/types"
import { STATUS_LABEL } from "@/components/projects/types"

export default function ProjectsFilter({
  projects,
}: {
  projects: ProjectSummary[]
}) {
  const [q, setQ] = useState("")
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [activeStatus, setActiveStatus] = useState<ProjectStatus | null>(null)

  // Alle Tags über alle Projekte, alphabetisch
  const allTags = useMemo(() => {
    const s = new Set<string>()
    projects.forEach((p) => p.tags?.forEach((t) => s.add(t)))
    return Array.from(s).sort((a, b) => a.localeCompare(b, "de"))
  }, [projects])

  // Nur Status anbieten, die tatsächlich vorkommen
  const usedStatus = useMemo(() => {
    const s = new Set<ProjectStatus>()
    projects.forEach((p) => p.status && s.add(p.status))
    return Array.from(s)
  }, [projects])

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    return projects.filter((p) => {
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.summary?.toLowerCase().includes(query) ||
        p.tags?.some((t) => t.toLowerCase().includes(query)) ||
        p.tech?.some((t) => t.toLowerCase().includes(query))

      const matchesTags =
        activeTags.length === 0 || activeTags.every((t) => p.tags?.includes(t))

      const matchesStatus = !activeStatus || p.status === activeStatus

      return matchesQuery && matchesTags && matchesStatus
    })
  }, [projects, q, activeTags, activeStatus])

  function toggleTag(tag: string) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const hasFilters = q !== "" || activeTags.length > 0 || activeStatus !== null

  function clearFilters() {
    setQ("")
    setActiveTags([])
    setActiveStatus(null)
  }

  return (
    <div className="space-y-5">
      {/* Suche */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Nach Projekt, Tag oder Technik suchen…"
          aria-label="Projekte durchsuchen"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 outline-none transition-colors focus:border-[var(--accent)]"
        />
        {hasFilters && (
          <button onClick={clearFilters} className="btn btn-outline shrink-0">
            Zurücksetzen
          </button>
        )}
      </div>

      {/* Status */}
      {usedStatus.length > 1 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-muted">
            Status
          </span>
          {usedStatus.map((s) => {
            const on = activeStatus === s
            return (
              <button
                key={s}
                onClick={() => setActiveStatus(on ? null : s)}
                aria-pressed={on}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  on
                    ? "border-[var(--accent)] bg-[var(--accent)]/20 text-white"
                    : "border-white/15 text-white/80 hover:border-white/25"
                }`}
              >
                {STATUS_LABEL[s]}
              </button>
            )
          })}
        </div>
      )}

      {/* Tags */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => {
            const on = activeTags.includes(tag)
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                aria-pressed={on}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
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

      {/* Trefferzeile */}
      <p className="text-sm text-muted">
        {filtered.length}{" "}
        {filtered.length === 1 ? "Projekt" : "Projekte"}
        {hasFilters && ` von ${projects.length}`}
      </p>

      {/* Raster */}
      {filtered.length === 0 ? (
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-dim">Dazu gibt es nichts.</p>
          <button onClick={clearFilters} className="mt-3 btn btn-accent">
            Filter zurücksetzen
          </button>
        </div>
      ) : (
        <div className="k-grid">
          {filtered.map((p) => (
            <ProjectCard key={p.slug ?? p.title} project={p} />
          ))}
        </div>
      )}
    </div>
  )
}
