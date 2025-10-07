// app/(site)/blog/[slug]/page.tsx
import { notFound } from "next/navigation"
import Mdx from "@/components/mdx/Mdx"
import { buildMetadata } from "@/lib/seo"
import { allPosts } from ".contentlayer/generated"
import PostOG from "@/components/mdx/PostOG"
import ShareBar from "@/components/layout/ShareBar"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = allPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return buildMetadata({
    title: post.title,
    description: post.summary,
    cover: post.cover,
    slug: `/blog/${post.slug}`,
  })
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = allPosts.find((p) => p.slug === slug)
  if (!doc) return notFound()
  return (
    <article className="prose prose-invert mx-auto px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">{doc.title}</h1>
      <p className="text-sm text-white/60">{new Date(doc.date).toLocaleDateString()}</p>
      <PostOG title={doc._id} cover={doc.cover} />
      <Mdx code={(doc as any).body.code} />
      <ShareBar title= {doc.title}/>
    </article>
  )
}

export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }))
}
