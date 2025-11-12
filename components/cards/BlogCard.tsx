// components/cards/BlogCard.tsx
import Link from "next/link"
import Image from "next/image"

type PostLike = {
  slug: string
  title: string
  summary: string
  date: string | Date
  tags?: string[]
  cover?: string
  url?: string
  readingTime?: string
  published?: boolean
}

type Props = { post: PostLike } | (PostLike & { post?: never })

// 🧩 Sichere Helper-Funktion – prüft OG nur auf Server-Seite
function getCoverSrc(slug: string, title: string, cover?: string | null): string {
  // 1️⃣ Wenn explizites Cover gesetzt ist → nimm das
  if (cover && !/placeholder/i.test(cover)) return cover

  // 2️⃣ Serverseitig prüfen, ob OG-Datei existiert
  if (typeof window === "undefined") {
    try {
      const fs = require("fs")
      const path = require("path")
      const ogPath = path.join(process.cwd(), "public", "og", `${slug}.webp`)
      if (fs.existsSync(ogPath)) return `/og/${slug}.webp`
    } catch {
      // Ignoriere Fehler (Edge oder Client)
    }
  }

  // 3️⃣ Dynamischer Fallback über API
  return `/api/og?title=${encodeURIComponent(title)}`
}

export default function BlogCard(props: Props) {
  const p: PostLike = "post" in props && props.post ? props.post : (props as PostLike)
  const { slug, title, summary, tags = [], cover, date, url, readingTime, published = true } = p

  const dateStr = date
    ? new Date(date).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : ""

  const href = url || `/blog/${slug}`
  const isDraft = published === false

  // ✅ Automatischer OG-/Cover-Fallback
  const coverSrc = getCoverSrc(slug, title, cover)

  return (
    <article
      className={`group overflow-hidden rounded-2xl border border-white/10 bg-white/[.04] ring-soft transition-transform hover:-translate-y-1 ${
        isDraft ? "opacity-70 border-yellow-400/40" : ""
      }`}
    >
      {/* 🖼️ Cover */}
      <div className="relative aspect-[16/9] bg-black/20">
        <Image
          src={coverSrc}
          alt={`Coverbild für ${title}`}
          width={800}
          height={400}
          className="h-40 w-full object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
          unoptimized={coverSrc.startsWith("/api/og")}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        {isDraft && (
          <div className="absolute top-2 left-2 rounded-md bg-yellow-400/20 border border-yellow-400/40 px-2 py-0.5 text-[10px] font-medium text-yellow-300">
            🧱 Entwurf — nur lokal sichtbar
          </div>
        )}
      </div>

      {/* 📄 Content */}
      <div className="px-4 pb-5 pt-4">
        <div className="mb-1 flex items-center justify-between text-xs text-white/50">
          {dateStr && <time>{dateStr}</time>}
          {readingTime && <span>{readingTime}</span>}
        </div>

        <h3 className="text-lg font-semibold text-white">
          {isDraft ? (
            <span className="cursor-not-allowed text-white/60">{title}</span>
          ) : (
            <Link href={href} className="hover:text-[var(--accent)] transition-colors" prefetch={false}>
              {title}
            </Link>
          )}
        </h3>

        {summary && <p className="mt-1 line-clamp-2 text-sm text-white/70">{summary}</p>}

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[11px] rounded-full bg-white/5 px-2 py-0.5 text-white/60 border border-white/10"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
