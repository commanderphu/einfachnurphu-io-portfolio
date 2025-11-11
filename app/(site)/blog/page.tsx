import BlogHero from "@/components/blog/BlogHero"
import PostsFilter from "@/components/blog/PostsFilter"
import { posts } from "#site/content"
import Reveal from "@/components/ui/Reveal"

export const dynamic = "force-dynamic"
export const revalidate = 0

// Type aus Velite ableiten
type Post = typeof posts[number]

export default function BlogIndex() {
  const allPosts: Post[] = posts
    .filter((p) => p.published !== false)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))

  return (
    <section className="k-section space-y-8">
      <Reveal>
        <BlogHero />
      </Reveal>
      <Reveal delay={0.06}>
        <PostsFilter posts={allPosts} />
      </Reveal>
    </section>
  )
}