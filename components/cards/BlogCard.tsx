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
  url?: string          // ✅ Optional: Velite computed field
  readingTime?: string  // ✅ Optional: Velite computed field
}

type Props =
  | { post: PostLike }           // Variante A: <BlogCard post={post} />
  | (PostLike & { post?: never })// Variante B: <BlogCard slug=... title=... />

export default function BlogCard(props: Props) {
  // Normalisieren: immer ein Objekt p haben
  const p: PostLike = "post" in props && props.post ? props.post : (props as PostLike)
  const { slug, title, summary, tags = [], cover, date, url, readingTime } = p

  const dateStr =
    date ? new Date(date).toLocaleDateString("de-DE", { day: "2-digit", month: "short", year: "numeric" }) : ""

  const coverSrc = cover || "/images/placeholder-blog.svg"
  
  // URL: Entweder von Velite oder manuell generieren
  const href = url || `/blog/${slug}`

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[.04] ring-soft transition-transform hover:-translate-y-1">
      {/* Cover */}
      <div className="relative aspect-[16/9] bg-black/20">
        <Image
          src={coverSrc}
          alt={title}
          width={800}
          height={400}
          className="h-40 w-full object-cover rounded-t-xl"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="px-4 pb-5 pt-4">
        <div className="mb-1 flex items-center justify-between text-xs text-white/50">
          {dateStr && <time>{dateStr}</time>}
          {readingTime && <span>{readingTime}</span>}
        </div>

        <h3 className="text-lg font-semibold text-white">
          <Link href={href} className="hover:text-[var(--accent)] transition-colors">
            {title}
          </Link>
        </h3>

        <p className="mt-1 line-clamp-2 text-sm text-white/70">{summary}</p>

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