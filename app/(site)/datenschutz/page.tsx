import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Welche Daten diese Seite verarbeitet, zu welchem Zweck und auf welcher Rechtsgrundlage.",
  robots: { index: true, follow: false },
}

function Abschnitt({
  titel,
  children,
}: {
  titel: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-white">{titel}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-white/80">
        {children}
      </div>
    </section>
  )
}

export default function DatenschutzPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="mb-4 text-4xl font-bold tracking-tight">
        Datenschutzerklärung
      </h1>
      <p className="mb-12 text-dim">
        Diese Seite kommt ohne Analysewerkzeuge, ohne Werbenetzwerke und ohne
        eigene Cookies aus. Was dennoch an Daten anfällt, steht hier – vollständig
        und in verständlicher Sprache.
      </p>

      <div className="space-y-10">
        <Abschnitt titel="1. Verantwortlicher">
          <p>
            Joshua Phu Kuhrau · Dietzstraße 1 · 56073 Koblenz · Deutschland
            <br />
            E-Mail:{" "}
            <a
              className="text-[var(--accent)] underline underline-offset-2"
              href="mailto:hi@einfachnurphu.io"
            >
              hi@einfachnurphu.io
            </a>
          </p>
          <p>
            Eine Datenschutzbeauftragte oder einen Datenschutzbeauftragten muss
            ich nicht benennen; die gesetzlichen Voraussetzungen dafür liegen
            nicht vor.
          </p>
        </Abschnitt>

        <Abschnitt titel="2. Aufruf der Website (Server-Protokolle)">
          <p>
            Diese Website wird bei der <strong>Vercel Inc.</strong> (USA)
            gehostet. Bei jedem Aufruf verarbeitet Vercel technisch notwendige
            Verbindungsdaten: IP-Adresse, Datum und Uhrzeit, aufgerufene Adresse,
            übertragene Datenmenge, Browsertyp und Betriebssystem sowie die zuvor
            besuchte Seite, sofern der Browser sie übermittelt.
          </p>
          <p>
            <strong>Zweck:</strong> Auslieferung der Seite, Betriebssicherheit,
            Abwehr von Angriffen.
            <br />
            <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO –
            berechtigtes Interesse an einem sicheren und funktionsfähigen
            Angebot.
          </p>
          <p>
            Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung. Die
            Übermittlung in die USA stützt sich auf die Standardvertragsklauseln
            der EU-Kommission sowie auf das EU-US Data Privacy Framework.
          </p>
        </Abschnitt>

        <Abschnitt titel="3. Kontaktformular und E-Mail">
          <p>
            Über das Kontaktformular werden <strong>Name</strong>,{" "}
            <strong>E-Mail-Adresse</strong> und die <strong>Nachricht</strong>{" "}
            erhoben. Diese Angaben werden ausschließlich zur Bearbeitung der
            Anfrage verwendet.
          </p>
          <p>
            <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO, wenn
            die Anfrage auf einen Vertrag zielt oder dessen Anbahnung dient;
            andernfalls Art. 6 Abs. 1 lit. f DSGVO – berechtigtes Interesse an
            der Beantwortung von Anfragen.
          </p>
          <p>
            Die Übermittlung läuft über zwei Wege, die ich offenlegen möchte,
            weil beide externe Anbieter einbeziehen:
          </p>
          <ul className="ml-5 list-disc space-y-2">
            <li>
              <strong>E-Mail-Versand über Resend</strong> (Resend, Inc., USA).
              Der Anbieter verarbeitet die Formularinhalte, um die Nachricht als
              E-Mail an mich zuzustellen.
            </li>
            <li>
              <strong>Benachrichtigung über einen Discord-Webhook</strong>{" "}
              (Discord Inc. / Discord Netherlands B.V.). Damit ich Anfragen
              zeitnah bemerke, wird der Inhalt zusätzlich in einen privaten,
              nicht öffentlichen Kanal gestellt.
            </li>
          </ul>
          <p>
            Mit beiden Anbietern bestehen Verträge zur Auftragsverarbeitung. Für
            Übermittlungen in die USA gelten die Standardvertragsklauseln der
            EU-Kommission.
          </p>
          <p>
            <strong>Speicherdauer:</strong> Anfragen bewahre ich auf, solange
            das für die Bearbeitung und mögliche Rückfragen erforderlich ist,
            längstens jedoch bis zum Ablauf gesetzlicher Aufbewahrungsfristen.
            Danach werden sie gelöscht. Sie können jederzeit die Löschung
            verlangen.
          </p>
        </Abschnitt>

        <Abschnitt titel="4. Eingebettete Inhalte von YouTube und Instagram">
          <p>
            Einzelne Beiträge enthalten eingebettete Videos oder Beiträge von{" "}
            <strong>YouTube</strong> (Google Ireland Limited, Irland) und{" "}
            <strong>Instagram</strong> (Meta Platforms Ireland Limited, Irland).
          </p>
          <p>
            Wird eine Seite mit einer solchen Einbettung aufgerufen, baut Ihr
            Browser eine Verbindung zu den Servern des jeweiligen Anbieters auf.
            Dabei wird Ihre IP-Adresse übertragen; die Anbieter können weitere
            Informationen über Ihr Gerät erheben und gegebenenfalls Cookies
            setzen. Sind Sie dort eingeloggt, kann der Aufruf Ihrem Konto
            zugeordnet werden. Auf Umfang und Zweck dieser Verarbeitung habe ich
            keinen Einfluss.
          </p>
          <p>
            <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO –
            berechtigtes Interesse an einer anschaulichen Darstellung der
            Inhalte.
          </p>
          <p className="text-white/70">
            Näheres in den Datenschutzhinweisen von{" "}
            <a
              className="text-[var(--accent)] underline underline-offset-2"
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google
            </a>{" "}
            und{" "}
            <a
              className="text-[var(--accent)] underline underline-offset-2"
              href="https://privacycenter.instagram.com/policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Meta
            </a>
            .
          </p>
        </Abschnitt>

        <Abschnitt titel="5. Was diese Seite nicht tut">
          <ul className="ml-5 list-disc space-y-1">
            <li>Keine Reichweitenmessung, kein Tracking, keine Profilbildung</li>
            <li>Keine Werbenetzwerke</li>
            <li>Keine eigenen Cookies und kein Zugriff auf lokale Speicher zu Analysezwecken</li>
            <li>
              Keine Einbindung externer Schriftarten – die verwendete Schrift
              wird vom eigenen Server ausgeliefert
            </li>
            <li>Kein Verkauf und keine Weitergabe von Daten zu Werbezwecken</li>
          </ul>
        </Abschnitt>

        <Abschnitt titel="6. Ihre Rechte">
          <p>Sie haben nach der DSGVO jederzeit das Recht auf</p>
          <ul className="ml-5 list-disc space-y-1">
            <li>Auskunft über die zu Ihnen gespeicherten Daten (Art. 15)</li>
            <li>Berichtigung unrichtiger Daten (Art. 16)</li>
            <li>Löschung (Art. 17)</li>
            <li>Einschränkung der Verarbeitung (Art. 18)</li>
            <li>Datenübertragbarkeit (Art. 20)</li>
            <li>
              <strong>Widerspruch</strong> gegen Verarbeitungen, die auf
              berechtigtem Interesse beruhen (Art. 21)
            </li>
          </ul>
          <p>
            Eine formlose Nachricht an{" "}
            <a
              className="text-[var(--accent)] underline underline-offset-2"
              href="mailto:hi@einfachnurphu.io"
            >
              hi@einfachnurphu.io
            </a>{" "}
            genügt.
          </p>
        </Abschnitt>

        <Abschnitt titel="7. Beschwerderecht">
          <p>
            Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren.
            Für mich zuständig ist:
          </p>
          <p className="text-white/70">
            Der Landesbeauftragte für den Datenschutz und die
            Informationsfreiheit Rheinland-Pfalz
            <br />
            Hintere Bleiche 34 · 55116 Mainz
          </p>
        </Abschnitt>

        <Abschnitt titel="8. Änderungen">
          <p>
            Ich passe diese Erklärung an, wenn sich die Verarbeitung ändert –
            etwa weil ein Dienst hinzukommt oder wegfällt. Es gilt jeweils die
            hier veröffentlichte Fassung.
          </p>
        </Abschnitt>
      </div>
    </section>
  )
}
