#!/usr/bin/env tsx
/**
 * 🎨 Automatische OG-Image-Generierung
 * -------------------------------------
 * Lokal:   rendert über http://localhost:3000/api/og
 * Vercel:  wird übersprungen (API während des Builds nicht verfügbar)
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import fetch from "node-fetch";

// === CONFIG =================================================================

// neue Blogstruktur: content/blog/YYYY/MM/*.mdx
const postsDir = path.join(process.cwd(), "content/blog");
const outDir = path.join(process.cwd(), "public/og");

// Lokale Render-API
const apiUrl = "http://localhost:3000/api/og";

// === SAFETY GUARD (Vercel Build) ===========================================

if (process.env.VERCEL) {
  console.log("⚠️  Überspringe OG-Generation auf Vercel (API nicht verfügbar während Build).");
  process.exit(0);
}

// === HELPERS ================================================================

function findMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(dir, entry.name);

    if (entry.isDirectory()) return findMdxFiles(filePath);
    if (entry.isFile() && filePath.endsWith(".mdx")) return [filePath];

    return [];
  });
}

async function generateOGImage({ slug, title, subtitle, icon }: any) {
  const params = new URLSearchParams({ title });

  if (subtitle) params.set("subtitle", subtitle);
  if (icon) params.set("icon", icon);

  const url = `${apiUrl}?${params.toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

    const buffer = Buffer.from(await res.arrayBuffer());
    const outPath = path.join(outDir, `${slug}.webp`);

    fs.writeFileSync(outPath, buffer);
    console.log(`✅ OG Bild erzeugt: ${slug}.webp`);
  } catch (err: any) {
    console.error(`⚠️ Fehler bei ${slug}:`, err.message);
  }
}

// === MAIN ===================================================================

async function main() {
  console.log("🎨 OG-Image-Generierung gestartet…");

  // Prepare output dir
  fs.mkdirSync(outDir, { recursive: true });

  const files = findMdxFiles(postsDir);

  if (files.length === 0) {
    console.log("ℹ️  Keine Blogposts gefunden.");
    return;
  }

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const { data } = matter(content);
    const slug = path.basename(file, ".mdx");

    // Wenn OG existiert → Skip
    const outPath = path.join(outDir, `${slug}.webp`);
    if (fs.existsSync(outPath)) {
      console.log(`⚪ Überspringe (OG existiert): ${slug}`);
      continue;
    }

    await generateOGImage({
      slug,
      title: data.title || slug,
      subtitle: data.summary || "",
      icon: data.icon || "📝",
    });
  }

  console.log("✨ OG-Generierung abgeschlossen.");
}

main().catch((err) => {
  console.error("🚨 Fehler:", err);
  process.exit(1);
});
