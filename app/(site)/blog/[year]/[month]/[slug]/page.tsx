// app/(site)/blog/[year]/[month]/[slug]/page.tsx
import Link from "next/link"
import { notFound } from "next/navigation"
import { posts } from "#site/content"
import { Mdx } from "@/components/mdx/Mdx"
import { PostOG } from "@/components/mdx/PostOG"
import ShareBar from "@/components/ui/ShareBar"
import RelatedPosts from "@/components/blog/RelatedPosts"

export const dynamic = "force-dynamic"
export const revalidate = 0

type Post = typeof posts[number]

export default async function PostPage({
  params,
}: {
  params: Promise<{ year: string; month: string; slug: string }>
}) {
  const { year, month, slug } = await params
  // ⬆️  hier awaiten!

  const post: Post | undefined = posts.find(
    (p) => p.slug === slug && p.year === year && p.month === month
  )

  if (!post || (!post.published && process.env.NODE_ENV === "production")) {
    return notFound()
  }
  return (
    <article className="relative mx-auto max-w-3xl px-6 py-16">
      {/* 🧡 Hintergrund */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 50% -10%, rgba(255,145,0,0.15), transparent 60%)",
        }}
      />

      {/* 🧭 Breadcrumbs */}
      <nav
        aria-label="breadcrumb"
        className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[var(--text-secondary)]"
      >
        <Link href="/blog" className="transition-colors hover:text-[var(--accent)]">
          Blog
        </Link>
        <span className="text-[var(--muted)]">/</span>

        <Link
          href={`/blog/${year}`}
          className="transition-colors hover:text-[var(--accent)]"
        >
          {year}
        </Link>
        <span className="text-[var(--muted)]">/</span>

        <Link
          href={`/blog/${year}/${month}`}
          className="transition-colors hover:text-[var(--accent)]"
        >
          {new Date(`${year}-${month}-01`).toLocaleString("de-DE", {
            month: "long",
          })}
        </Link>
        <span className="text-[var(--muted)]">/</span>

        <span className="font-medium text-[var(--accent)] breadcrumb-glow">
          {post.title}
        </span>
      </nav>

      {/* 🏷️ Header */}
      <header className="mb-10">
        <p className="text-sm text-white/50 mb-2">
          {new Date(post.date).toLocaleDateString("de-DE", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <h1 className="text-4xl font-bold text-white mb-3 leading-tight">
          {post.title}
        </h1>

        {post.summary && (
          <p className="text-lg text-white/70">{post.summary}</p>
        )}

        {post.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* 🖼️ Cover / OG */}
      <div className="mb-12 overflow-hidden rounded-xl border border-white/10 shadow-lg">
        <PostOG title={post.title} cover={post.cover} />
      </div>

      {/* 📄 Inhalt */}
      <div className="mdx-content">
        <Mdx body={post.body} />
      </div>

      {/* 🧠 Footer */}
      <footer className="mt-16 border-t border-white/10 pt-8 text-center text-white/70">
        <ShareBar title={post.title} />
        <p className="mt-8 italic text-sm">
          „Stay nerdy, stay curious.“ — Joshua Phu Bein
        </p>
      </footer>

      {/* 🔗 Related Posts */}
      <RelatedPosts currentSlug={slug} tags={post.tags} />
    </article>
  )
}

// ✅ Statische Pfade
export function generateStaticParams() {
  return posts.map((p) => ({
    year: p.year,
    month: p.month,
    slug: p.slug,
  }))
}

// 🧠 Metadata / OG
export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; month: string; slug: string }>
}) {
  const { year, month, slug } = await params
  // ⬆️ ebenfalls awaiten!

  const post = posts.find(
    (p) => p.slug === slug && p.year === year && p.month === month
  )

  if (!post) return {}

  return {
    title: post.title,
    description: post.summary ?? "",
    openGraph: {
      title: post.title,
      description: post.summary ?? "",
      type: "article",
      images: [
        {
          url: post.cover || `/api/og?title=${encodeURIComponent(post.title)}`,
        },
      ],
    },
  }
}