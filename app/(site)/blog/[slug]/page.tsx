import { notFound } from "next/navigation"
import { posts } from "#site/content"
import { Mdx } from "@/components/mdx/Mdx"  // ✅ Named import
import PostOG from "@/components/mdx/PostOG"
import ShareBar from "@/components/ui/ShareBar"
import RelatedPosts from "@/components/blog/RelatedPosts"

export const dynamic = "force-dynamic"
export const revalidate = 0

type Post = typeof posts[number]

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post: Post | undefined = posts.find((p) => p.slug === slug)
  
  if (!post || !post.published) {
    return notFound()
  }

  return (
    <article className="relative mx-auto max-w-3xl px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 50% -10%, rgba(255,145,0,0.15), transparent 60%)",
        }}
      />

      <header className="mb-10">
        <p className="text-sm text-white/50 mb-2">
          {new Date(post.date).toLocaleDateString("de-DE", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {" • "}
        </p>
        <h1 className="text-4xl font-bold text-white mb-3 leading-tight">
          {post.title}
        </h1>
        {post.summary && (
          <p className="text-lg text-white/70">{post.summary}</p>
        )}
        
        {post.tags.length > 0 && (
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

      {post.cover && (
        <div className="mb-12 overflow-hidden rounded-xl border border-white/10 shadow-lg">
          <PostOG title={post.title} cover={post.cover} />
        </div>
      )}

      <div className="mdx-content">
        <Mdx body={post.body} />
      </div>

      <footer className="mt-16 border-t border-white/10 pt-8 text-center text-white/70">
        <ShareBar title={post.title} />
        <p className="mt-8 italic text-sm">
          „Stay nerdy, stay curious." — Joshua Phu Bein
        </p>
      </footer>

      <RelatedPosts currentSlug={slug} tags={post.tags} />
    </article>
  )
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  
  if (!post) return {}

  return {
    title: post.title,
    description: post.summary ?? "",
    openGraph: {
      title: post.title,
      description: post.summary ?? "",
      images: post.cover ? [{ url: post.cover }] : [],
      type: "article" as const,
    },
  }
}