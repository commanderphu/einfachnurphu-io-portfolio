// app/(site)/blog/page.tsx
import BlogHero from "@/components/blog/BlogHero"
import PostsFilter from "@/components/blog/PostsFilter"
import { posts } from "#site/content"
import Reveal from "@/components/ui/Reveal"
import DevBanner from "@/components/ui/DevBanner"

export const dynamic = "force-dynamic"
export const revalidate = 0

type Post = typeof posts[number]

export default function BlogIndex() {
  // robustes Datums-Sorting (falls date fehlt/leer ist)
  const toMillis = (d?: string) => (d ? new Date(d).getTime() || 0 : 0)
  const isProd = process.env.NODE_ENV === "production"

  const allPosts: Post[] = posts
    // ✅ Drafts nur im PROD ausblenden
    .filter((p) => (isProd ? p.published !== false : true))
    .sort((a, b) => toMillis(b.date) - toMillis(a.date))

  return (
    <section className="k-section space-y-8">
      <Reveal>
        <BlogHero />
      </Reveal>

      <Reveal delay={0.06}>
        <PostsFilter posts={allPosts} />
      </Reveal>

      {/* 🧠 DEV MODE Banner – sichtbar nur lokal/DEV (Komponente kann intern selbst entscheiden) */}
      <DevBanner />
    </section>
  )
}
