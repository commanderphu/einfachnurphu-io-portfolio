# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install          # Dependencies installieren
pnpm dev              # Dev-Server (Next.js)
pnpm build            # Production-Build
pnpm start            # Production-Server starten (nach build)
pnpm deploy           # Build + OpenNext-Build für Cloudflare Pages

pnpm lint             # ESLint
pnpm type-check       # tsc --noEmit

pnpm velite           # Velite-Content einmalig bauen (.velite/)
pnpm refresh:content  # Alias für `pnpm blog update`

pnpm blog create "Titel"   # Neuen Blogpost anlegen (content/blog/YYYY/MM/slug.mdx)
pnpm blog edit <slug>      # Post in VSCode öffnen
pnpm blog publish <slug>   # published: false → true
pnpm blog draft <slug>     # published: true → false
pnpm blog list             # Alle Posts mit Status auflisten
pnpm blog update           # Fehlende OG-Bilder generieren + Velite rebuild
pnpm blog clean [--force]  # Ungenutzte OG-Bilder löschen

pnpm generate:og      # OG-Bilder-Script direkt ausführen (scripts/generate-og.ts)
```

Es gibt **keine Test-Suite** (kein Jest/Vitest, kein `test`-Script) — Korrektheit wird über `pnpm lint` und `pnpm type-check` geprüft.

`next.config.mjs` setzt `eslint.ignoreDuringBuilds: true` und `typescript.ignoreBuildErrors: true` — `pnpm build` schlägt bei Typ- oder Lint-Fehlern **nicht** fehl. Vor Abschluss einer Änderung explizit `pnpm lint` und `pnpm type-check` laufen lassen.

## Architektur

**Next.js 15 App Router + TypeScript**, Styling über TailwindCSS v4 (Catppuccin-Frappe-Theme, Hintergrund `#232223`, Akzent `#ff9100`). Deployment-Ziel ist **Cloudflare Pages via OpenNext** (`open-next.config.ts`, `wrangler.toml`), nicht Vercel — der `deploy`-Script baut zusätzlich mit `@opennextjs/cloudflare`. Lokale Entwicklung läuft optional über Docker/`docker-compose.yml` (für Unraid-Setup).

### Content-Pipeline (Velite)

Der gesamte Blog- und Projekt-Content ist MDX, verwaltet über [Velite](https://velite.js.org/) (`velite.config.ts`):

- **`posts`**-Collection: `content/blog/**/*.mdx` → Pfad-Konvention `YYYY/MM/slug.mdx`. Die URL (`/blog/YYYY/MM/slug`) wird in einem `transform()`-Schritt berechnet; fehlt `slug` im Frontmatter, wird er aus den ersten zwei `tags` oder sonst aus dem Titel generiert (Slugify-Fallback-Logik direkt in `velite.config.ts`).
- **`projects`**-Collection: `content/projects/*.mdx` → URL `/projects/slug`.
- Build-Output liegt in `.velite/` (git-ignored, wird bei jedem Server-Build automatisch über `next.config.mjs` → `build()` aus `velite` getriggert) und ist über den TS-Pfad-Alias `#site/content` importierbar.
- `@/*` ist auf das Repo-Root gemappt (`tsconfig.json`).

### Blog CLI (`scripts/blog.ts`)

Zentrales Werkzeug für den Content-Workflow (create/edit/publish/draft/list/update/clean), kapselt Frontmatter-Erzeugung, Slugify und ruft Velite-Build sowie OG-Generierung an. Details und Frontmatter-Felder stehen in `BLOG-CHEATSHEET.md`.

### OG-Bilder

Drei-Stufen-Priorität, umgesetzt in `scripts/generate-og.ts` und `app/api/og`:
1. `cover`-Feld im MDX-Frontmatter (eigenes Bild)
2. vorgerendertes `/public/og/slug.webp`
3. dynamischer Fallback über `/app/api/og` (Next.js `ImageResponse`)

### Sonstige Integrationen

- Kontaktformular: `app/api/contact/route.tsx` — versendet über Resend (`RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_TO`) und einen Discord-Webhook (`DISCORD_CONTACT_WEBHOOK`), siehe `.env`.
- RSS/Atom-Feeds: `app/rss.xml`, `app/feed.xml`, Logik in `lib/rss.ts`.
- Site-Metadaten zentral in `lib/site.ts` (`SITE`-Objekt).

### Struktur

| Bereich | Beschreibung |
|----------|---------------|
| `app/(site)/*` | Öffentliche Seiten: about, blog, links, projects, resume, contact, impressum, timeline |
| `app/api/og` | Dynamische OG-Bilder |
| `app/api/contact` | Kontaktformular-Handler |
| `components/mdx` | Custom-Komponenten für MDX-Posts (`<Callout>`, `<Embed>`, `<Image>`, …) |
| `lib/` | `post-utils.ts`, `rss.ts`, `seo.ts`, `site.ts`, `utils.ts` |
| `scripts/` | `blog.ts` (CLI), `generate-og.ts` |
| `content/blog/YYYY/MM/slug.mdx` | Blogposts |
| `content/projects/*.mdx` | Projektseiten |
