#!/usr/bin/env node
/**
 * 🎨 Automatische OG-Image-Generierung
 * -------------------------------------
 * Lokal:   rendert über http://localhost:3000/api/og
 * Vercel:  wird übersprungen (API nicht verfügbar während Build)
 *
 * ✨ Usage:
 *   pnpm generate:og
 */

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import fetch from "node-fetch"

// === CONFIG =================================================================
const postsDir = path.join(process.cwd(), "content/posts")
const outDir = path.join(process.cwd(), "public/og")

// Dynamisch je nach Umgebung
const apiUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/api/og`
  : "http://localhost:3000/api/og"

// === SAFETY GUARD ===========================================================
// 🧱 Vercel Build darf OGs nicht generieren – API ist zu diesem Zeitpunkt offline.
if (process.env.VERCEL) {
  console.log("⚠️  Überspringe OG-Generation auf Vercel (API nicht verfügbar während Build).")
  process.exit(0)
}

// === HELPER =================================================================
async function generateImage(title, subtitle, icon, slug) {
  const params = new URLSearchParams({ title })
  if (subtitle) params.set("subtitle", subtitle)
  if (icon) params.set("icon", icon)

  try {
    const res = await fetch(`${apiUrl}?${params.toString()}`)
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)

    const buffer = Buffer.from(await res.arrayBuffer())
    const outPath = path.join(outDir, `${slug}.webp`)
    fs.writeFileSync(outPath, buffer)
    console.log(`✅  OG Image erzeugt: ${slug}.webp`)
  } catch (err) {
    console.error(`⚠️  Fehler bei ${slug}: ${err.message}`)
  }
}

// === MAIN ===================================================================
async function main() {
  console.log("🎨 OG Image Generation gestartet…")

  if (!fs.existsSync(postsDir)) {
    console.error("❌ Kein content/posts-Verzeichnis gefunden.")
    process.exit(1)
  }

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"))
  if (files.length === 0) {
    console.log("ℹ️  Keine Blogposts gefunden.")
    return
  }

  for (const file of files) {
    const filePath = path.join(postsDir, file)
    const content = fs.readFileSync(filePath, "utf8")
    const { data } = matter(content)
    const slug = file.replace(/\.mdx$/, "")

    // Wenn OG bereits existiert → überspringen
    const outPath = path.join(outDir, `${slug}.webp`)
    if (fs.existsSync(outPath)) {
      console.log(`⚪  Überspringe (bereits vorhanden): ${slug}`)
      continue
    }

    const title = data.title || slug
    const subtitle = data.summary || ""
    const icon = data.icon || "📝"

    await generateImage(title, subtitle, icon, slug)
  }

  console.log("✨  OG Image Generation abgeschlossen.")
}

// === RUN ====================================================================
main().catch((err) => {
  console.error("🚨 Unerwarteter Fehler:", err)
  process.exit(1)
})
