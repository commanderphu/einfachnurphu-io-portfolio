// components/cards/BlogCard.tsx
import Link from "next/link"

type PostLike = {
  slug: string
  title: string
  summary: string
  date: string | Date
  tags?: string[]
  cover?: string
}

type Props =
  | { post: PostLike }           // Variante A: <BlogCard post={post} />
  | (PostLike & { post?: never })// Variante B: <BlogCard slug=... title=... />

export default function BlogCard(props: Props) {
  // Normalisieren: immer ein Objekt p haben
  const p: PostLike = "post" in props && props.post ? props.post : (props as PostLike)
  const { slug, title, summary, tags = [], cover, date } = p

  const dateStr =
    date ? new Date(date).toLocaleDateString("de-DE", { day: "2-digit", month: "short", year: "numeric" }) : ""

  const coverSrc = cover || "/images/placeholder-blog.svg"

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[.04] ring-soft transition-transform hover:-translate-y-1">
      {/* Cover */}
      <div className="relative aspect-[16/9] bg-black/20">
        {/* img statt next/image, damit es auch bei extern/platzhalter easy ist */}
        <img
          src={coverSrc}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="px-4 pb-5 pt-4">
        {dateStr && <time className="mb-1 block text-xs text-white/50">{dateStr}</time>}

        <h3 className="text-lg font-semibold text-white">
          <Link href={`/blog/${slug}`} className="hover:text-[var(--accent)] transition-colors">
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
