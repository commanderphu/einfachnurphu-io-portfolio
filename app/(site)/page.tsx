import Hero from "@/components/ui/Hero"
import FeaturedRow from "@/components/ui/FeaturedRow"
import { allPosts } from ".contentlayer/generated"
import Link from "next/link"
import Reveal from "@/components/ui/Reveal"
import BlogCard from "@/components/cards/BlogCard"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default function HomePage() {
  const latestPosts = [...allPosts]
    .filter((p) => p.published !== false)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 3)

  return (
    <section className="k-section">
      <Reveal>
        <Hero />
      </Reveal>

      <Reveal delay={0.5}>
        <FeaturedRow />
      </Reveal>

      <div className="mt-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Neu im Blog</h2>
          <Link href="/blog" className="text-[var(--accent)]">Alle Beiträge →</Link>
        </div>

        <Reveal delay={0.1}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                summary={post.summary}
                date={post.date}
                tags={post.tags}
                cover={post.cover}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
