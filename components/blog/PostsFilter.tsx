"use client"

import { useEffect, useMemo, useState } from "react"
import BlogCard from "../cards/BlogCard"
import { posts } from "#site/content"

// Type aus Velite ableiten
type Post = typeof posts[number]

export default function PostsFilter({ posts }: { posts: Post[] }) {
  const [rawQ, setRawQ] = useState("")
  const [q, setQ] = useState("")
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setQ(rawQ.trim().toLowerCase()), 180)
    return () => clearTimeout(t)
  }, [rawQ])

  const { allTags, tagCount } = useMemo(() => {
    const map = new Map<string, number>()
    for (const p of posts) for (const t of p.tags ?? []) map.set(t, (map.get(t) ?? 0) + 1)
    const tags = [...map.keys()].sort((a, b) => a.localeCompare(b))
    return { allTags: tags, tagCount: (tag: string) => map.get(tag) ?? 0 }
  }, [posts])

  const filtered = useMemo(() => {
    if (!q && !active) return posts
    return posts.filter((p) => {
      const inTag = !active || (p.tags ?? []).includes(active)
      if (!q) return inTag
      const hay = [
        p.title,
        p.summary ?? "",
        ...(p.tags ?? []),
      ]
        .join(" ")
        .toLowerCase()
      return inTag && hay.includes(q)
    })
  }, [posts, q, active])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <input
            value={rawQ}
            onChange={(e) => setRawQ(e.target.value)}
            placeholder="Suchen (Titel, Tags, Summary)…"
            aria-label="Beiträge durchsuchen"
            className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 outline-none ring-0 placeholder:text-muted"
          />
          {rawQ && (
            <button
              type="button"
              onClick={() => setRawQ("")}
              aria-label="Suche leeren"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/70 hover:text-[var(--accent)]"
            >
              ×
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={active === null}
            onClick={() => setActive(null)}
            label={`Alle (${posts.length})`}
          />
          {allTags.map((tag) => (
            <FilterChip
              key={tag}
              active={active === tag}
              onClick={() => setActive(active === tag ? null : tag)}
              label={`${tag} (${tagCount(tag)})`}
            />
          ))}
        </div>
      </div>

      <div className="k-grid">
        {filtered.length === 0 ? (
          <EmptyState query={rawQ} />
        ) : (
          filtered.map((p) => (
            <BlogCard
              key={p.slug}
              slug={p.slug}
              title={p.title}
              summary={p.summary ?? ""}
              date={p.date}
              tags={p.tags}
              cover={p.cover}
              url={p.url}              
            />
          ))
        )}
      </div>
    </div>
  )
}

function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-sm transition-colors ${
        active
          ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10"
          : "border-white/15 text-white/80 hover:border-white/25 hover:text-white"
      }`}
    >
      {label}
    </button>
  )
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="col-span-full rounded-2xl border border-white/10 bg-white/[.03] p-8 text-center text-white/70">
      <div className="text-white mb-1 font-semibold">Keine Treffer</div>
      <div>
        {query ? (
          <>
            Für „<span className="text-[var(--accent)]">{query}</span>" wurde nichts gefunden.
          </>
        ) : (
          <>Keine Beiträge vorhanden.</>
        )}
      </div>
    </div>
  )
}