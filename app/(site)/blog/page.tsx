import BlogHero from "@/components/blog/BlogHero"
import PostsFilter from "@/components/blog/PostsFilter"
import { allPosts } from ".contentlayer/generated"
import Reveal from "@/components/ui/Reveal"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default function BlogIndex() {
  const posts = [...allPosts]
    .filter(p => p.published !== false)
    .sort((a,b)=>+new Date(b.date)-+new Date(a.date))

  return (
    <section className="k-section">
    <Reveal>  <BlogHero /></Reveal>
      <Reveal delay={.06}> <PostsFilter posts={posts as any} /></Reveal>
    </section>
  )
}
