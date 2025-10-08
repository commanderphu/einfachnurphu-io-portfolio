import { notFound } from "next/navigation"
import { allPosts, type Post } from ".contentlayer/generated"
import Mdx from "@/components/mdx/Mdx"
import PostOG from "@/components/mdx/PostOG"
import ShareBar from "@/components/ui/ShareBar"

type PageProps = {
  params: {
    slug: string
  }
}

export default function PostPage({ params }: PageProps) {
  const post: Post | undefined = allPosts.find((p) => p.slug === params.slug)
  if (!post) return notFound()

  return (
    <article className="prose prose-invert mx-auto px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">{post.title}</h1>

      <p className="text-sm text-white/60">
        {new Date(post.date).toLocaleDateString("de-DE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </p>

      {/* Optionales OG-Preview */}
      {post.cover && <PostOG title={post.title} cover={post.cover} />}

      {/* MDX-Body */}
      <Mdx code={post.body.code} />

      {/* Share-Komponente */}
      <ShareBar title={post.title} />
    </article>
  )
}

/** SSG Static Params */
export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }))
}

/** Metadata je Post für SEO / OG */
export function generateMetadata({ params }: PageProps) {
  const post = allPosts.find((p) => p.slug === params.slug)
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
