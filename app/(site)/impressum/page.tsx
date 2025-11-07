export default function ImpressumPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 space-y-6">
      <h1 className="text-4xl font-bold tracking-tight">Impressum</h1>

      <div className="space-y-1 text-white/80">
        <p>Angaben gemäß § 5 TMG</p>
        <p><strong>Joshua Phu Bein – K.I.T. Solutions</strong></p>
        <p>Dietzstr. 1</p>
        <p>56073 Koblenz</p>
        <p>Deutschland</p>
      </div>

      <div className="space-y-1 text-white/80">
        <p><span className="text-white/60">Kontakt:</span></p>
        <p>E-Mail: <a className="underline text-[var(--accent,#ff9100)]" href="mailto:joshua@phuonline.de">joshua@phuonline.de</a></p>
        {/* Optional: Telefonnummer */}
        {/* <p>Telefon: +49 … (optional)</p> */}
      </div>

      <div className="space-y-1 text-white/80">
        <p><span className="text-white/60">Unternehmensform:</span> Einzelunternehmen (Nebengewerbe)</p>
        {/* USt-ID nur, falls vorhanden */}
        {/* <p>USt-IdNr.: DE…</p> */}
      </div>

      <div className="space-y-2 text-white/70 text-sm">
        <p><strong>Haftung für Inhalte</strong> – Inhalte wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität übernehmen wir keine Gewähr.</p>
        <p><strong>Haftung für Links</strong> – Externe Links wurden beim Setzen geprüft. Für deren Inhalte sind ausschließlich die jeweiligen Betreiber verantwortlich.</p>
        <p><strong>Urheberrecht</strong> – Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung nur mit schriftlicher Zustimmung.</p>
      </div>

      <div className="text-white/50 text-xs">
        <p>Letzte Aktualisierung: {new Date().toISOString().slice(0,10)}</p>
      </div>
    </section>
  )
}
