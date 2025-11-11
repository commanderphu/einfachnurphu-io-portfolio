import { defineConfig, defineCollection, s } from 'velite'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const posts = defineCollection({
  name: 'Post',
  pattern: 'blog/**/*.mdx',
  schema: s
    .object({
      title: s.string(),
      slug: s.slug('blog'), // Auto-generiert aus Filename
      summary: s.string(),
      date: s.isodate(),
      cover: s.string().optional(),
      tags: s.array(s.string()).default([]),
      published: s.boolean().default(true),
      body: s.mdx()
    })
    .transform((data) => ({
      ...data,
      url: `/blog/${data.slug}`,
    }))
})

const projects = defineCollection({
  name: 'Project',
  pattern: 'projects/**/*.mdx',
  schema: s
    .object({
      title: s.string(),
      slug: s.slug('projects'),
      summary: s.string(),
      date: s.isodate(),
      cover: s.string().optional(),
      tags: s.array(s.string()).default([]),
      tech: s.array(s.string()).default([]),
      repo: s.string().optional(),
      demo: s.string().optional(),
      featured: s.boolean().default(false),
      status: s.enum(['active', 'completed', 'archived', 'wip']).default('wip'),
      body: s.mdx()
    })
    .transform((data) => ({
      ...data,
      url: `/projects/${data.slug}`,
    }))
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true
  },
  collections: { posts, projects },
  mdx: {
    gfm: true, // Aktiviert GitHub Flavored Markdown
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'catppuccin-frappe',
          keepBackground: false,
          defaultLang: 'plaintext'
        }
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor']
          }
        }
      ]
    ]
  }
})