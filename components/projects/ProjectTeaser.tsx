// components/ProjectsTeaser.tsx
type Card = { title: string; slug: string; summary: string; tags: string[] }

const CARDS: Card[] = [
  {
    title: "Workmate",
    slug: "/projects/workmate",
    summary: "HR/Backoffice-Toolkit: Personalakten, Reminders, Abwesenheiten. FastAPI + Postgres.",
    tags: ["FastAPI", "Postgres", "Vue/React"],
  },
  {
    title: "Nerdcast",
    slug: "/projects/nerdcast",
    summary: "Micro-Podcast-Stack: Aufnahme → Transkript → RSS → Episode-Page.",
    tags: ["ffmpeg", "Whisper", "Next.js"],
  },
  {
    title: "TravelTune",
    slug: "/projects/traveltune",
    summary: "Photo-Journey-Generator mit EXIF-Map, Timeline und MDX-Stories.",
    tags: ["Next.js", "EXIF", "Static-Gen"],
  },
]

export default function ProjectsTeaser() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-6 flex items-end justify-between gap-3">
        <h2 className="text-2xl font-semibold">Projekte</h2>
        <a
          href="/projects"
          className="text-sm font-medium text-[var(--accent,#ff9100)] underline underline-offset-4"
        >
          Alle ansehen →
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <a
            key={c.slug}
            href={c.slug}
            className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[var(--accent,#ff9100)] hover:bg-white/10"
          >
            <h3 className="text-lg font-semibold">{c.title}</h3>
            <p className="mt-2 text-sm text-white/80">{c.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {c.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/70 ring-1 ring-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4 text-sm text-[var(--accent,#ff9100)] opacity-0 transition group-hover:opacity-100">
              Mehr erfahren →
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
