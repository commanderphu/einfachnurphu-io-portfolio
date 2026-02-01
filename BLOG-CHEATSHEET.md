# Blog Workflow Cheatsheet

## Schnellbefehle

| Befehl | Beschreibung |
|--------|--------------|
| `blog create "Titel"` | Neuen Post erstellen |
| `blog edit <slug>` | Post in VSCode öffnen |
| `blog publish <slug>` | Post veröffentlichen |
| `blog draft <slug>` | Post als Entwurf setzen |
| `blog list` | Alle Posts anzeigen |
| `blog update` | OG-Bilder generieren + Velite rebuild |
| `blog clean [--force]` | Unbenutzte OG-Bilder löschen |

---

## Ordnerstruktur

```
content/blog/
└── YYYY/
    └── MM/
        └── slug.mdx          # Blogposts

public/og/
└── slug.webp                 # OG-Bilder (1200x630)
```

---

## Frontmatter Template

```yaml
---
title: "Mein Titel"
summary: "Kurze Beschreibung für Vorschau & RSS"
date: "2026-01-15"
published: false
tags: ["development", "setup"]
icon: "🚀"
cover: ""
---
```

| Feld | Pflicht | Beschreibung |
|------|---------|--------------|
| `title` | Ja | Titel des Posts |
| `summary` | Nein | Kurzbeschreibung (SEO, RSS) |
| `date` | Ja | Veröffentlichungsdatum (YYYY-MM-DD) |
| `published` | Ja | `true` = Live, `false` = Draft |
| `tags` | Nein | Array für Filterung & Related Posts |
| `icon` | Nein | Emoji für OG-Bild |
| `cover` | Nein | Eigenes Cover-Bild (überschreibt OG) |

---

## Workflow: Neuer Post

```bash
# 1. Post erstellen
blog create "Mein neuer Blogpost"
# → content/blog/2026/02/mein-neuer-blogpost.mdx

# 2. Bearbeiten
blog edit mein-neuer-blogpost
# → Öffnet VSCode

# 3. Lokal testen (im Projektordner)
pnpm dev
# → http://localhost:3000/blog
# → Drafts nur in Dev sichtbar!

# 4. OG-Bild generieren (falls noch nicht vorhanden)
blog update

# 5. Veröffentlichen
blog publish mein-neuer-blogpost

# 6. Deployen (im Projektordner)
pnpm build && pnpm deploy
```

---

## URLs

| URL | Beschreibung |
|-----|--------------|
| `/blog` | Blog-Übersicht mit Suche & Filter |
| `/blog/YYYY/MM/slug` | Einzelner Blogpost |
| `/rss.xml` | RSS Feed |
| `/feed.xml` | Atom Feed |
| `/api/og?title=...&icon=📝` | Dynamisches OG-Bild |

---

## Draft-System

| Status | Verhalten |
|--------|-----------|
| `published: false` | Nur in `pnpm dev` sichtbar, Badge "🧱 Entwurf" |
| `published: true` | Live auf Produktion |

```bash
blog publish <slug>    # Draft → Live
blog draft <slug>      # Live → Draft
```

---

## OG-Bilder

**Priorität:**
1. `cover` Feld im Frontmatter (eigenes Bild)
2. `/public/og/slug.webp` (vorgerendert)
3. `/api/og?title=...` (dynamischer Fallback)

```bash
blog update            # Generiert fehlende OG-Bilder
blog clean             # Löscht ungenutzte OG-Bilder (interaktiv)
blog clean --force     # Löscht ohne Nachfrage
```

---

## MDX-Komponenten

```mdx
<!-- Info-Box -->
<Callout type="info">
Das ist ein Hinweis.
</Callout>

<!-- Warnung -->
<Callout type="warning">
Achtung, wichtig!
</Callout>

<!-- Embed (iframes) -->
<Embed src="https://youtube.com/embed/..." />

<!-- Optimiertes Bild -->
<Image src="/images/posts/bild.png" alt="Beschreibung" />
```

---

## Tipps

- **Umlaute:** werden automatisch konvertiert (ä→ae, ö→oe, ü→ue)
- **Tags:** nutzen für Related Posts (3 ähnlichste werden angezeigt)
- **Slugify:** Titel wird automatisch zu URL-freundlichem Slug
- **RSS:** Zeigt die letzten 20 veröffentlichten Posts
- **Syntax Highlighting:** Automatisch für Codeblöcke (Catppuccin Theme)

---

## Projektpfade

```
~/Dokumente/PhuDev/einfachnurphu-portfolio/
├── content/blog/          # Posts
├── public/og/             # OG-Bilder
├── scripts/blog.ts        # CLI-Script
├── lib/post-utils.ts      # Post-Helfer
├── app/(site)/blog/       # Blog-Seiten
└── components/blog/       # Blog-Komponenten
```

---

## Schnellzugriff

```bash
# Projektordner öffnen
cd ~/Dokumente/PhuDev/einfachnurphu-portfolio

# Dev-Server starten
pnpm dev

# Alle Posts auflisten
blog list

# Neuen Post schreiben
blog create "Titel" && blog edit titel
```
