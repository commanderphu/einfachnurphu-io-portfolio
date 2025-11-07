export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Kontakt</h1>

      <p className="text-white/80">
        Projektanfrage, Tech-Talk oder Support? Schreib mir kurz, ich melde mich flott zurück.
      </p>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <ul className="space-y-2 text-white/80">
          <li>
            <span className="text-white/60">E-Mail:</span>{" "}
            <a className="underline text-[var(--accent,#ff9100)]" href="mailto:joshua@phuonline.de">
              joshua@phuonline.de
            </a>
          </li>
          <li>
            <span className="text-white/60">LinkedIn:</span>{" "}
            <a className="underline text-[var(--accent,#ff9100)]" href="https://www.linkedin.com/in/joshuaphu" target="_blank">
              /in/joshuaphu
            </a>
          </li>
          <li>
            <span className="text-white/60">Standort:</span> Koblenz, Rheinland-Pfalz (DE)
          </li>
        </ul>
      </div>

      {/* Optionales Kontaktformular (nur UI; Hook/Action später anbinden) */}
      <form className="grid gap-4 sm:grid-cols-2" action="/api/contact" method="post">
        <div className="sm:col-span-1">
          <label className="mb-1 block text-sm text-white/60">Name</label>
          <input name="name" required className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-[var(--accent,#ff9100)]" />
        </div>
        <div className="sm:col-span-1">
          <label className="mb-1 block text-sm text-white/60">E-Mail</label>
          <input type="email" name="email" required className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-[var(--accent,#ff9100)]" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm text-white/60">Nachricht</label>
          <textarea name="message" rows={5} required className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-[var(--accent,#ff9100)]" />
        </div>
        <div className="sm:col-span-2">
          <button className="rounded-2xl bg-[var(--accent,#ff9100)] px-5 py-3 font-medium text-black hover:brightness-110">
            Abschicken
          </button>
          <p className="mt-2 text-xs text-white/50">Hinweis: Mit dem Absenden stimmst du zu, dass ich deine Angaben zur Beantwortung speichere (kein Spam, kein Weiterverkauf).</p>
        </div>
      </form>
    </section>
  )
}
