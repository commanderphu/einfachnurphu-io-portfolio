#!/usr/bin/env tsx
/**
 * 🧹 Clean OG Images
 * Löscht OG-Dateien in /public/og, für die kein Blogpost mehr existiert.
 *
 * Verwendung:
 *   pnpm clean:og
 *   pnpm clean:og --force   # ohne Nachfrage
 */

import fs from "node:fs"
import path from "node:path"
import readline from "node:readline"

const postsDir = path.join(process.cwd(), "content", "blog")
const ogDir = path.join(process.cwd(), "public", "og")

function findMdxFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  return entries.flatMap((entry) => {
    const res = path.resolve(dir, entry.name)
    if (entry.isDirectory()) return findMdxFiles(res)
    else if (entry.isFile() && res.endsWith(".mdx")) return res
    else return []
  })
}

function getPostSlugs(): Set<string> {
  const files = findMdxFiles(postsDir)
  const slugs = files.map((file) => path.basename(file, ".mdx"))
  return new Set(slugs)
}

function getOgFiles(): string[] {
  if (!fs.existsSync(ogDir)) return []
  return fs.readdirSync(ogDir).filter((f) => f.endsWith(".webp"))
}

function promptYesNo(question: string): Promise<boolean> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    rl.question(`${question} (y/N): `, (answer) => {
      rl.close()
      resolve(answer.trim().toLowerCase() === "y")
    })
  })
}

async function main() {
  console.log("🧹 OG-Cleanup gestartet…")

  if (!fs.existsSync(ogDir)) {
    console.log("ℹ️ Kein OG-Verzeichnis gefunden – nichts zu löschen.")
    return
  }

  const postSlugs = getPostSlugs()
  const ogFiles = getOgFiles()

  const unused = ogFiles.filter((file) => {
    const slug = file.replace(/\.webp$/, "")
    return !postSlugs.has(slug)
  })

  if (unused.length === 0) {
    console.log("✅ Alle OG-Dateien werden genutzt – nichts zu löschen.")
    return
  }

  console.log(`🚮 ${unused.length} unbenutzte OG-Dateien gefunden:`)
  for (const file of unused) console.log("   •", file)

  const force = process.argv.includes("--force")
  const confirmed = force || (await promptYesNo("Möchtest du diese Dateien löschen?"))

  if (!confirmed) {
    console.log("🟡 Abgebrochen – keine Dateien gelöscht.")
    return
  }

  for (const file of unused) {
    fs.unlinkSync(path.join(ogDir, file))
  }

  console.log(`✅ ${unused.length} OG-Dateien gelöscht.`)
}

main().catch((err) => {
  console.error("🚨 Fehler:", err)
  process.exit(1)
})
