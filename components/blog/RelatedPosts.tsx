"use client"

import Link from "next/link"
import Image from "next/image"
import { posts } from "#site/content"

interface RelatedPostsProps {
  currentSlug: string
  tags?: string[]
  limit?: number
}

export default function RelatedPosts({ 
  currentSlug, 
  tags = [],
  limit = 3 
}: RelatedPostsProps) {
  // Posts mit gemeinsamen Tags bevorzugen, sonst neueste
  const related = posts
    .filter((p) => p.published && p.slug !== currentSlug)
    .sort((a, b) => {
      // Wenn Tags vorhanden, sortiere nach Relevanz
      if (tags.length > 0) {
        const aMatches = a.tags.filter(tag => tags.includes(tag)).length
        const bMatches = b.tags.filter(tag => tags.includes(tag)).length
        
        if (aMatches !== bMatches) {
          return bMatches - aMatches
        }
      }
      
      // Sonst nach Datum
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    .slice(0, limit)

  if (related.length === 0) return null

  return (
    <section className="mt-20">
      <h2 className="text-2xl font-semibold text-white mb-8 text-center">
        Ähnliche Beiträge
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={post.url}
            className="group rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all overflow-hidden"
          >
            {post.cover && (
              <div className="aspect-[16/9] overflow-hidden">
                <Image
                  src={post.cover}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-white/60 line-clamp-3">
                {post.summary || "Weiterlesen..."}
              </p>
              <p className="mt-3 text-xs text-white/40">
                {new Date(post.date).toLocaleDateString("de-DE", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}