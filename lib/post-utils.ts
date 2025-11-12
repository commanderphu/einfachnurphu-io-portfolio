// lib/post-utils.ts
import fs from "fs"
import path from "path"
import matter from "gray-matter"

export type PostMeta = {
  title: string
  summary?: string
  date?: string
  tags?: string[]
  cover?: string | null
  icon?: string
  published?: boolean
  slug: string
  url: string
  ogImage: string
}

// ---------- helpers ----------
function getSlug(filePath: string) {
  return path.basename(filePath, path.extname(filePath))
}

function titleFromSlug(slug: string) {
  // "was-musik-fuer-mich-bedeutet" -> "Was Musik Fuer Mich Bedeutet"
  return slug
    .split(/[-_]+/g)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

function getOgImage(slug: string, title: string, cover?: string | null) {
  // Wenn ein echtes Cover vorhanden ist, nimm es.
  if (cover && !/placeholder/i.test(cover)) return cover

  // Gibt es bereits ein vorgerendertes OG?
  const staticOgPath = path.join(process.cwd(), "public", "og", `${slug}.webp`)
  if (fs.existsSync(staticOgPath)) {
    return `/og/${slug}.webp`
  }

  // Fallback: dynamische API (mit Title für schönes Sharing)
  const params = new URLSearchParams({ title })
  return `/api/og?${params.toString()}`
}

// ---------- core ----------
export function enrichPostMeta(filePath: string, data: Record<string, unknown>): PostMeta {
  const slug = getSlug(filePath)

  // Sicheren Titel bestimmen (Frontmatter > Slug-Fallback)
  const rawTitle = typeof data.title === "string" && data.title.trim().length > 0
    ? data.title
    : titleFromSlug(slug)
  const title = rawTitle

  const summary = typeof data.summary === "string" ? data.summary : undefined
  const date = typeof data.date === "string" ? data.date : undefined
  const tags = Array.isArray(data.tags) ? (data.tags as string[]) : undefined
  const cover = typeof data.cover === "string" ? data.cover : null
  const icon = typeof data.icon === "string" ? data.icon : undefined
  const published =
    typeof data.published === "boolean" ? data.published : true

  const ogImage = getOgImage(slug, title, cover)

  return {
    title,
    summary,
    date,
    tags,
    cover: cover || ogImage,
    icon,
    published,
    slug,
    url: `/blog/${slug}`,
    ogImage,
  }
}

export function getAllPosts(): PostMeta[] {
  const postsDir = path.join(process.cwd(), "content", "posts")
  const files = fs.existsSync(postsDir)
    ? fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"))
    : []

  const items = files.map((file) => {
    const filePath = path.join(postsDir, file)
    const source = fs.readFileSync(filePath, "utf8")
    const { data } = matter(source)
    return enrichPostMeta(filePath, data)
  })

  return items
    .filter((p) => p.published !== false)
    .sort((a, b) => (a.date && b.date ? (a.date < b.date ? 1 : -1) : 0))
}

export function getPostBySlug(slug: string): PostMeta | null {
  const filePath = path.join(process.cwd(), "content", "posts", `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const source = fs.readFileSync(filePath, "utf8")
  const { data } = matter(source)
  return enrichPostMeta(filePath, data)
}
