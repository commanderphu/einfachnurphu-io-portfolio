#!/usr/bin/env tsx
/**
 * 🧠 Blog CLI
 * Zentrale Verwaltung deiner Blogposts
 *
 * Befehle:
 *   pnpm blog create "Titel"   → neuen Post anlegen (+ OG + Velite)
 *   pnpm blog update           → fehlende OG-Images erzeugen
 *   pnpm blog clean [--force]  → ungenutzte OGs löschen
 */

import fs from "node:fs"
import path from "node:path"
import { spawnSync } from "node:child_process"
import readline from "node:readline"
import matter from "gray-matter"

// === helpers ================================================================
function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9äöüß\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

function run(name: string, cmd: string, args: string[] = []) {
  console.log(`\n🧠 ${name}…`)
  const result = spawnSync(cmd, args, { stdio: "inherit", shell: true })
  if (result.status !== 0) console.warn(`⚠️  ${name} endete mit Code ${result.status}`)
  else console.log(`✅  ${name} abgeschlossen.`)
}

function findMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  return entries.flatMap((e) => {
    const res = path.resolve(dir, e.name)
    if (e.isDirectory()) return findMdxFiles(res)
    if (e.isFile() && res.endsWith(".mdx")) return res
    return []
  })
}

// === commands ==============================================================

// 📝 Create
async function createPost(title: string) {
  if (!title) {
    console.error("❌ Titel fehlt. Beispiel: pnpm blog create \"Electric Callboy Wien\"")
    process.exit(1)
  }

  const slug = slugify(title)
  const now = new Date()
  const year = now.getFullYear().toString()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const baseDir = path.join("content", "blog", year, month)
  const filePath = path.join(baseDir, `${slug}.mdx`)

  fs.mkdirSync(baseDir, { recursive: true })

  if (fs.existsSync(filePath)) {
    console.error(`❌ Datei existiert bereits: ${filePath}`)
    process.exit(1)
  }

  const date = new Date().toISOString().split("T")[0]
  const frontmatter = `---\n` +
    `title: "${title}"\n` +
    `summary: ""\n` +
    `date: "${date}"\n` +
    `published: false\n` +
    `tags: []\n` +
    `cover: ""\n` +
    `---\n\nSchreibe hier deinen Inhalt ...\n`

  fs.writeFileSync(filePath, frontmatter)

  console.log(`\n✅ Neuer Blogpost erstellt:\n   ${filePath}\n   → /blog/${year}/${month}/${slug}`)

  run("OG-Image-Update", "pnpm", ["update:og"])
  run("Velite Build", "pnpm", ["velite"])
}

// 🔄 Update OGs
async function updateOGs() {
  run("Update OG Images", "pnpm", ["update:og"])
  run("Velite Build", "pnpm", ["velite"])
}

// 🧹 Clean OGs
function promptYesNo(question: string): Promise<boolean> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    rl.question(`${question} (y/N): `, (answer) => {
      rl.close()
      resolve(answer.trim().toLowerCase() === "y")
    })
  })
}

async function cleanOGs(force = false) {
  const postsDir = path.join(process.cwd(), "content", "blog")
  const ogDir = path.join(process.cwd(), "public", "og")

  if (!fs.existsSync(ogDir)) {
    console.log("ℹ️  Kein /public/og gefunden – nichts zu löschen.")
    return
  }

  const postSlugs = new Set(findMdxFiles(postsDir).map((f) => path.basename(f, ".mdx")))
  const ogFiles = fs.readdirSync(ogDir).filter((f) => f.endsWith(".webp"))
  const unused = ogFiles.filter((f) => !postSlugs.has(f.replace(/\.webp$/, "")))

  if (unused.length === 0) {
    console.log("✅  Alle OG-Dateien werden genutzt – nichts zu löschen.")
    return
  }

  console.log(`🚮  ${unused.length} ungenutzte OG-Dateien gefunden:`)
  for (const f of unused) console.log("   •", f)

  const confirmed = force || (await promptYesNo("Möchtest du diese Dateien löschen?"))
  if (!confirmed) {
    console.log("🟡  Abgebrochen – keine Dateien gelöscht.")
    return
  }

  for (const f of unused) fs.unlinkSync(path.join(ogDir, f))
  console.log(`✅  ${unused.length} OG-Dateien gelöscht.`)
}
// === 📚 List all posts ======================================================
function listPosts() {
  const postsDir = path.join(process.cwd(), "content", "blog")
  const files = findMdxFiles(postsDir)
  if (files.length === 0) {
    console.log("ℹ️  Keine Blogposts gefunden.")
    return
  }

  console.log("\n📚 Aktuelle Blogposts:\n")
  console.log("Slug".padEnd(28), "Datum".padEnd(12), "Status".padEnd(10), "Titel")
  console.log("-".repeat(80))

  for (const file of files) {
    const src = fs.readFileSync(file, "utf8")
    const { data } = matter(src)
    const slug = path.basename(file, ".mdx")
    const date = data.date || "-"
    const title = data.title || slug
    const published = data.published ? "✅ Live" : "🧱 Draft"
    console.log(slug.padEnd(28), String(date).padEnd(12), published.padEnd(10), title)
  }
  console.log("")
}

// === 🚀 Publish a draft =====================================================
async function publishPost(slug: string) {
  if (!slug) {
    console.error("❌ Bitte gib einen Slug an: pnpm blog publish <slug>")
    process.exit(1)
  }

  const postsDir = path.join(process.cwd(), "content", "blog")
  const files = findMdxFiles(postsDir)
  const file = files.find((f) => path.basename(f, ".mdx") === slug)
  if (!file) {
    console.error(`❌ Kein Post mit Slug "${slug}" gefunden.`)
    process.exit(1)
  }

  const src = fs.readFileSync(file, "utf8")
  const { data, content } = matter(src)
  if (data.published === true) {
    console.log(`⚪  Post "${slug}" ist bereits veröffentlicht.`)
    return
  }

  const updated = matter.stringify(content, { ...data, published: true })
  fs.writeFileSync(file, updated)
  console.log(`✅  Post "${slug}" veröffentlicht.`)

  run("Velite Build", "pnpm", ["velite"])
}

// === 🧱 Revert post to draft =================================================
async function unpublishPost(slug: string) {
  if (!slug) {
    console.error("❌ Bitte gib einen Slug an: pnpm blog draft <slug>")
    process.exit(1)
  }

  const postsDir = path.join(process.cwd(), "content", "blog")
  const files = findMdxFiles(postsDir)
  const file = files.find((f) => path.basename(f, ".mdx") === slug)
  if (!file) {
    console.error(`❌ Kein Post mit Slug "${slug}" gefunden.`)
    process.exit(1)
  }

  const src = fs.readFileSync(file, "utf8")
  const { data, content } = matter(src)
  if (data.published === false) {
    console.log(`⚪  Post "${slug}" ist bereits ein Draft.`)
    return
  }

  const updated = matter.stringify(content, { ...data, published: false })
  fs.writeFileSync(file, updated)
  console.log(`🧱  Post "${slug}" wieder als Draft markiert.`)

  run("Velite Build", "pnpm", ["velite"])
}

// === ✏️ Open post in VSCode =================================================
async function editPost(slug: string) {
  if (!slug) {
    console.error("❌ Bitte gib einen Slug an: pnpm blog edit <slug>")
    process.exit(1)
  }

  const postsDir = path.join(process.cwd(), "content", "blog")
  const files = findMdxFiles(postsDir)
  const file = files.find((f) => path.basename(f, ".mdx") === slug)
  if (!file) {
    console.error(`❌ Kein Post mit Slug "${slug}" gefunden.`)
    process.exit(1)
  }

  console.log(`✏️  Öffne Post: ${file}`)
  spawnSync("code", [file], { stdio: "inherit", shell: true })
}


// === router ================================================================
const [, , command, ...args] = process.argv

switch (command) {
  case "create":
    await createPost(args.join(" "))
    break
  case "update":
    await updateOGs()
    break
  case "list":
    listPosts()
    break
  case "publish":
    await publishPost(args[0])
    break
  case "clean":
    await cleanOGs(process.argv.includes("--force"))
    break
  case "draft":
    await unpublishPost(args[0])
    break
  case "edit":
    await editPost(args[0])
    break
  default:
    console.log(`
🧠 Blog CLI – Befehle:

  pnpm blog create "Titel"   → neuen Post anlegen (+ OG + Velite)
  pnpm blog update           → OGs aktualisieren & Velite rebuild
  pnpm blog clean [--force]  → ungenutzte OG-Dateien löschen
`)
    break
}
