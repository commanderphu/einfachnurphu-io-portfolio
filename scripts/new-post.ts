#!/usr/bin/env tsx
/**
 * 📝 Create new blog post
 * Usage:
 *   pnpm new-post "Mein neuer Artikel"
 */

// scripts/new-post.ts
import fs from 'node:fs'
import path from 'node:path'

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9äöüß\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function getPaths(slug: string) {
  const now = new Date()
  const year = now.getFullYear().toString()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const baseDir = path.join('content', 'blog', year, month)
  const filePath = path.join(baseDir, `${slug}.mdx`)
  return { year, month, baseDir, filePath }
}

async function main() {
  const title = process.argv.slice(2).join(' ').trim()
  if (!title) {
    console.error('❌ Bitte gib einen Titel an.\n   pnpm new-post "Electric Callboy Wien"')
    process.exit(1)
  }

  const slug = slugify(title)
  const { year, month, baseDir, filePath } = getPaths(slug)

  fs.mkdirSync(baseDir, { recursive: true })

  if (fs.existsSync(filePath)) {
    console.error(`❌ Datei existiert bereits: ${filePath}`)
    process.exit(1)
  }

  const date = new Date().toISOString().split('T')[0]
  const frontmatter = `---
title: "${title}"
summary: ""
date: "${date}"
published: false
tags: []
cover: ""
---

Schreibe hier deinen Inhalt ...
`

  fs.writeFileSync(filePath, frontmatter)
  console.log(`✅ Neuer Blogpost erstellt: ${filePath}`)
  console.log(`   URL: /blog/${year}/${month}/${slug}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
