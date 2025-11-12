#!/usr/bin/env tsx
/**
 * 🔄 Update OG Images
 * Erzeugt fehlende OG-Images für Blogposts.
 *
 * Verwendung:
 *   pnpm update:og
 *
 * 💡 Verhalten:
 *   - Lokal → rendert über http://localhost:3000/api/og
 *   - Vercel → wird automatisch übersprungen (API nicht verfügbar beim Build)
 */

import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import fetch from "node-fetch"

// === CONFIG ==================================================================
const postsDir = path.join(process.cwd(), "content", "blog")
const outDir = path.join(process.cwd(), "public", "og")

// Dynamisch API-URL wählen
const apiUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/api/og`
  : "http://localhost:3000/api/og"

// === SAFETY GUARD ============================================================
if (process.env.VERCEL) {
  console.log("⚠️  Überspringe OG-Generation auf Vercel (API während Build nicht verfügbar).")
  process.exit(0)
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

// === HELPERS =================================================================
function findMdxFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  return entries.flatMap((entry) => {
    const res = path.resolve(dir, entry.name)
    if (entry.isDirectory()) return findMdxFiles(res)
    else if (entry.isFile() && res.endsWith(".mdx")) return res
    else return []
  })
}

async function generateImage(title: string, subtitle: string, icon: string, slug: string) {
  const params = new URLSearchParams({ title })
  if (subtitle) params.set("subtitle", subtitle)
  if (icon) params.set("icon", icon)

  try {
    const res = await fetch(`${apiUrl}?${params.toString()}`)
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)

    const buffer = Buffer.from(await res.arrayBuffer())
    const outPath = path.join(outDir, `${slug}.webp`)
    fs.writeFileSync(outPath, buffer)
    console.log(`✅  OG Image erstellt: ${slug}`)
  } catch (err) {
    console.error(`⚠️  Fehler bei ${slug}: ${(err as Error).message}`)
  }
}

// === MAIN ====================================================================
async function main() {
  console.log("🔍 Suche nach fehlenden OG-Images…")

  if (!fs.existsSync(postsDir)) {
    console.error("❌ Kein content/blog-Verzeichnis gefunden.")
    process.exit(1)
  }

  const files = findMdxFiles(postsDir)
  let created = 0

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, "utf8")
    const { data } = matter(content)
    const slug = path.basename(filePath, ".mdx")
    const ogPath = path.join(outDir, `${slug}.webp`)

    if (fs.existsSync(ogPath)) continue // OG existiert → skip

    const title = data.title || slug
    const subtitle = data.summary || ""
    const icon = data.icon || "📝"

    await generateImage(title, subtitle, icon, slug)
    created++
  }

  if (created === 0) {
    console.log("✅ Alle OG-Images sind aktuell!")
  } else {
    console.log(`✨ ${created} neue OG-Images generiert.`)
  }
}

main().catch((err) => {
  console.error("🚨 Fehler:", err)
  process.exit(1)
})
