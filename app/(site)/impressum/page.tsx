import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieterkennzeichnung für einfachnurphu.io.",
  robots: { index: true, follow: false },
}

export default function ImpressumPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="mb-4 text-4xl font-bold tracking-tight">Impressum</h1>
      <p className="mb-12 text-dim">
        Diese Seite ist mein privates Portfolio – kein Unternehmensauftritt.
      </p>

      <div className="space-y-10 text-white/80">
        <div>
          <h2 className="mb-3 text-lg font-semibold text-white">
            Angaben gemäß § 5 DDG
          </h2>
          <p className="font-semibold text-white">Joshua Phu Kuhrau</p>
          <p>Dietzstraße 1</p>
          <p>56073 Koblenz</p>
          <p>Deutschland</p>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold text-white">Kontakt</h2>
          <p>
            E-Mail:{" "}
            <a
              className="text-[var(--accent)] underline underline-offset-2"
              href="mailto:hi@einfachnurphu.io"
            >
              hi@einfachnurphu.io
            </a>
          </p>
          <p>
            Kontaktformular:{" "}
            <a
              className="text-[var(--accent)] underline underline-offset-2"
              href="/contact"
            >
              einfachnurphu.io/contact
            </a>
          </p>
          <p className="mt-2 text-sm text-dim">
            Anfragen bitte schriftlich. Ich antworte in der Regel innerhalb von
            zwei Werktagen.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold text-white">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p>Joshua Phu Kuhrau, Anschrift wie oben.</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[.03] p-5">
          <h2 className="mb-2 text-base font-semibold text-white">
            Hinweis zu K.I.T. Solutions
          </h2>
          <p className="text-sm text-white/70">
            Ich betreibe daneben das Gewerbe K.I.T. Solutions. Diese Seite hier
            gehört nicht dazu – sie ist privat und dient der Darstellung meiner
            Projekte. Für geschäftliche Angelegenheiten gilt der Auftritt unter{" "}
            <a
              className="text-[var(--accent)] underline underline-offset-2"
              href="https://kit-it-koblenz.de"
              target="_blank"
              rel="noopener noreferrer"
            >
              kit-it-koblenz.de
            </a>{" "}
            mit dem dortigen Impressum.
          </p>
        </div>

        <div className="space-y-4 text-sm text-white/70">
          <div>
            <h3 className="mb-1 font-semibold text-white/90">
              Haftung für Inhalte
            </h3>
            <p>
              Für eigene Inhalte auf diesen Seiten bin ich nach den allgemeinen
              Gesetzen verantwortlich. Ich bin jedoch nicht verpflichtet,
              übermittelte oder gespeicherte fremde Informationen zu überwachen
              oder nach Umständen zu forschen, die auf eine rechtswidrige
              Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung
              der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben
              hiervon unberührt.
            </p>
          </div>

          <div>
            <h3 className="mb-1 font-semibold text-white/90">
              Haftung für Links
            </h3>
            <p>
              Diese Seite enthält Links zu externen Websites Dritter, auf deren
              Inhalte ich keinen Einfluss habe. Für die Inhalte der verlinkten
              Seiten ist stets der jeweilige Anbieter verantwortlich. Zum
              Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar.
              Werden mir Rechtsverletzungen bekannt, entferne ich solche Links
              umgehend.
            </p>
          </div>

          <div>
            <h3 className="mb-1 font-semibold text-white/90">Urheberrecht</h3>
            <p>
              Die von mir erstellten Inhalte und Werke auf diesen Seiten
              unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als
              solche gekennzeichnet. Vervielfältigung, Bearbeitung, Verbreitung
              und jede Art der Verwertung außerhalb der Grenzen des
              Urheberrechts bedürfen meiner schriftlichen Zustimmung.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
