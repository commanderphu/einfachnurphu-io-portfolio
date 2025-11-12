// scripts/generate-og.mjs
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import fetch from "node-fetch"

const postsDir = path.join(process.cwd(), "content", "blog")
const outDir = path.join(process.cwd(), "public", "og")
const apiUrl =
  process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/og`
    : "http://localhost:3000/api/og"


if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

// Hilfsfunktion: rekursiv alle .mdx Dateien finden
function findMdxFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  return entries.flatMap((entry) => {
    const res = path.resolve(dir, entry.name)
    if (entry.isDirectory()) return findMdxFiles(res)
    else if (entry.isFile() && res.endsWith(".mdx")) return res
    else return []
  })
}

async function generateImage(title, subtitle, icon, slug) {
  const params = new URLSearchParams({ title })
  if (subtitle) params.set("subtitle", subtitle)
  if (icon) params.set("icon", icon)

  const res = await fetch(`${apiUrl}?${params.toString()}`)
  if (!res.ok) throw new Error(`❌ Fehler bei ${slug}: ${res.statusText}`)

  const buffer = Buffer.from(await res.arrayBuffer())
  const outPath = path.join(outDir, `${slug}.webp`)
  fs.writeFileSync(outPath, buffer)
  console.log(`✅ OG Image erzeugt: ${outPath}`)
}

async function main() {
  console.log("🎨 OG Image Generation gestartet…")

  const files = findMdxFiles(postsDir)

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, "utf8")
    const { data } = matter(content)
    const slug = path.basename(filePath, ".mdx")

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

  console.log("✨ OG Image Generation abgeschlossen.")
}

main().catch((err) => {
  console.error("🚨 Fehler:", err)
  process.exit(1)
})
