export default function BlogHero() {
  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-white/10 p-6 sm:p-8 ring-soft"
      style={{ background: "radial-gradient(1200px 500px at 90% -40%, rgba(255,145,0,.12), transparent 65%)" }}
    >
      <p className="text-sm text-muted">einfachnurphu.io / blog</p>
      <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold leading-tight">
        Blog & Notizen
      </h1>
      <p className="mt-3 text-dim max-w-2xl">
        Gedanken zu Projekten, Stack, Ops und Design. Kurze Notizen, tiefe Dives.
      </p>
    </section>
  )
}
