# ⚡️ einfachnurphu.io  

Mein persönliches Portfolio – zwischen Code, Kreativität und Chaos.  
Minimalistisch, schnell und nerd-authentisch – inspiriert von **Barry Allen** & **Catppuccin**.  
Hier findest du alles, was mich antreibt: IT, Design, Open Source und ehrliche Projekte.

---

## 🚀 Tech Stack
- **Framework:** Next.js (App Router) + TypeScript  
- **Styling:** TailwindCSS + Catppuccin Frappe Theme  
- **Content:** Velite + MDX  
- **Deployment:** Vercel (Main) / Unraid (Dev)  
- **Tools:** PNPM · ESLint FlatConfig · Blog CLI · OG Image API  
- **Designfarben:**  
  - Hintergrund: `#232223`  
  - Akzent: `#ff9100`  
  - Text: Weiß  

---

## 🧩 Struktur

| Bereich | Beschreibung |
|----------|---------------|
| `/app/page.tsx` | Hero + Projekte-Teaser |
| `/app/(site)/about` | Über mich + Profilbild |
| `/app/(site)/timeline` | Werdegang & Flash-Story |
| `/app/(site)/projects` | Workmate · Nerdcast · TravelTune |
| `/app/(site)/blog` | MDX-basierte Blogposts (Velite Content) |
| `/app/api/og` | Dynamische OG-Bilder (Next.js ImageResponse) |
| `/components/mdx` | Custom-Komponenten für Posts |
| `/scripts/blog.ts` | CLI für Post-Erstellung, OG-Update & Cleanup |
| `/public/images` | Logos, Profilbilder, Projekt-Covers |

---

## 🧠 Philosophie

> **Clean IT. Flash Speed. Human Touch.**

Ich baue Tools und Systeme, die leise funktionieren,  
schnell reagieren und dabei menschlich bleiben.  
Keine Cloud-Abhängigkeit, kein Vendor-Lock-in – nur saubere IT mit Haltung.

---

## 💼 Projekte

| Projekt | Beschreibung |
|----------|---------------|
| **Workmate** | HR-Tool für Personalakten, Reminders und Urlaubsverwaltung (FastAPI + Postgres) |
| **Nerdcast** | Persönlicher Podcast über Tech, Popkultur und Mental Health |
| **TravelTune** | Reise- und Festivalprojekt mit Jessica – Musik, Roadtrips & Nerdmomente |

---

## 🧠 Blog CLI – Phase 1–3

Ein zentrales Tool für deinen gesamten Content-Workflow:  
Erstellt, verwaltet und bereinigt Blogposts inklusive OG-Images & Velite-Builds.

### Befehle
| Command | Beschreibung |
|----------|---------------|
| `pnpm blog create "Titel"` | Neuen Post anlegen (+ OG-Image + Velite Build) |
| `pnpm blog update` | OG-Images neu generieren & Velite rebuild |
| `pnpm blog list` | Alle Posts anzeigen (inkl. Status) |
| `pnpm blog publish <slug>` | Post auf „veröffentlicht“ setzen |
| `pnpm blog clean [--force]` | Ungenutzte OG-Dateien entfernen |

✨ Unterstützt automatisches OG-Fallback, dynamische Blog-Covers und Vercel-kompatible Deployments.

---

## 📸 Visual Identity

- **Logo (K.I.T. Solutions):** Skyline + Text „KIT IT KOBLENZ“  
- **Brandfarben:** Dunkelgrau `#232223`, Akzent `#ff9100`, Weiß  
- **Theme:** Catppuccin Frappe Green  
- **Profilbild:** `/public/images/joshua-phu.jpg` (rund, abgedunkelt, Orange-Glow)

---

## 🧭 Roadmap

- [x] Hero + Branding  
- [x] About + Timeline  
- [x] Projects + Blog (Velite Migration)  
- [x] Resume + Contact + Footer  
- [x] Blog CLI Workflow (create/update/list/publish/clean)  
- [ ] Live Preview für Drafts (`pnpm blog preview`)  
- [ ] CLI-Flags für Cover, Tags & Summary  
- [ ] Integration in (Workmate)-Dashboard  
- [ ] SEO-Meta & Social-Preview-Images  

---

## ⚙️ Setup

```bash
# Dependencies
pnpm install

# Lokaler Start
pnpm dev

# Build (Vercel/Prod)
pnpm build

# Blog-Workflow
pnpm blog create "Mein neuer Artikel"
pnpm blog update
pnpm blog clean --force
````

🗂 **Content:**
MDX-Dateien liegen unter `/content/blog/YYYY/MM/slug.mdx`.
Velite generiert automatisch Index & Metadaten.

OG-Images werden über `/app/api/og` erstellt
und lokal unter `/public/og/*.webp` gespeichert.

---

## 📜 Lizenz

Dieses Projekt ist Teil der persönlichen Marke **Joshua Phu / K.I.T. Solutions**.

* Inhalte dürfen mit Quellenangabe genutzt werden.
* Code-Snippets unter **MIT-Lizenz**.

---

## ⚡ Autor

**Joshua Phu Kuhrau**
K.I.T. Solutions · einfachnurphu.io
IT-Supporter · Developer · Nerd · Flash-Fan
