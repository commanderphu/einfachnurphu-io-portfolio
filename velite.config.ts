import { defineConfig, defineCollection, s } from 'velite'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// === Posts-Collection ===

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      slug: s.slug("blog").optional(),
      summary: s.string(),
      date: s.isodate(),
      cover: s.string().optional(),
      tags: s.array(s.string()).default([]), // Kategorie + Kurzbeitrag
      published: s.boolean().default(true),
      body: s.mdx(),
    })
.transform((data, ctx: any) => {
  // 🧩 Versuche mehrere Fallbacks für Pfad-Ermittlung
  const entryPath =
    ctx.path && typeof ctx.path === "string"
      ? ctx.path
      : Array.isArray(ctx.path)
        ? ctx.path.join("/")
        : ctx.entry?.id ||
          ctx.entry?.filePath ||
          ctx.entry?.slug ||
          ctx?.options?.entryPath ||
          "unknown"

  // 🧠 Debug: nur im DEV
  if (process.env.NODE_ENV !== "production") {
    console.log("[VELITE DEBUG: ENTRY]", {
      entryPath,
      rawTags: data.tags,
      rawSlug: data.slug,
      title: data.title,
    })
  }

  // Datum auflösen
  const dateObj = new Date(data.date)
  const year = dateObj.getFullYear().toString()
  const month = String(dateObj.getMonth() + 1).padStart(2, "0")

  // 🧩 Slug aus Tags oder Titel generieren
  const tagSlug =
    data.tags.length > 0
      ? data.tags
          .slice(0, 2)
          .map((t) =>
            t
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .trim()
              .replace(/\s+/g, "-")
          )
          .join("-")
      : data.title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .trim()
          .split(/\s+/)
          .slice(0, 2)
          .join("-")

  const slug = data.slug?.replace(/^blog\//, "") || tagSlug
  const url = `/blog/${year}/${month}/${slug}`

  // 🔍 Debug-Ausgabe nach Berechnung
  if (process.env.NODE_ENV !== "production") {
    console.log("[VELITE SLUG GEN]", {
      file: entryPath,
      year,
      month,
      tagSlug,
      finalSlug: slug,
      url,
    })
  }

  return {
    ...data,
    year,
    month,
    slug,
    url,
  }
})
})
export { posts }


// === Projects-Collection ===
const projects = defineCollection({
  name: 'Project',
  pattern: 'projects/**/*.mdx',
  schema: s
    .object({
      title: s.string(),
      slug: s.slug('projects').optional(),
      summary: s.string(),
      date: s.isodate(),
      cover: s.string().optional(),
      tags: s.array(s.string()).default([]),
      tech: s.array(s.string()).default([]),
      repo: s.string().optional(),
      demo: s.string().optional(),
      featured: s.boolean().default(false),
      status: s.enum(['active', 'completed', 'archived', 'wip']).default('wip'),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      url: `/projects/${data.slug}`,
    })),
})

// === Velite-Konfiguration ===
export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts, projects },
  mdx: {
    gfm: true,
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'catppuccin-frappe',
          keepBackground: false,
          defaultLang: 'plaintext',
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
})
