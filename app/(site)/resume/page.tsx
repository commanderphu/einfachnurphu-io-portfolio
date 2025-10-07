export default function ResumePage() {
  const updated = "2025-10-07" // bei Bedarf automatisieren

  const experience = [
    {
      period: "Aug 2025 – heute",
      role: "Junior-Techniker",
      company: "Computacenter (über Experis GmbH)",
      location: "Düsseldorf, DE",
      bullets: [
        "Field-IT & Admin-Support, Nutzerbetreuung, Ticketbearbeitung",
        "Koordination mit Fachbereichen, saubere Übergaben/Übergabenotizen"
      ],
    },
    {
      period: "Mai 2025 – heute",
      role: "Inhaber",
      company: "K.I.T. Solutions",
      location: "Koblenz, DE",
      bullets: [
        "IT-Support für Privatkunden & KMU, Vor-Ort & Remote",
        "Open-Source- & Linux-first Ansatz, Automatisierung & Wissensaufbau"
      ],
    },
    {
      period: "Feb 2025 – Jul 2025",
      role: "Kommissionierer",
      company: "Lidl",
      location: "Koblenz, DE",
      bullets: [
        "Warenbereitstellung & Versandvorbereitung für Filialen"
      ],
    },
    {
      period: "Jul 2024 – Dez 2024",
      role: "Interim-Teamleiter (Pack/Sort)",
      company: "Amazon",
      location: "Region Koblenz, DE",
      bullets: [
        "Schichtplanung, Mitarbeitereinsatz & Prozessabstimmung zwischen Abteilungen"
      ],
    },
    {
      period: "Nov 2023 – Jul 2024",
      role: "Fulfillment Center Associate",
      company: "Amazon",
      location: "Region Koblenz, DE",
      bullets: [
        "Kommissionierung, Abnahme & Verladung nach Abfahrtsplanung"
      ],
    },
    {
      period: "Jan 2023 – Nov 2023",
      role: "IT-Spezialist",
      company: "Selbstständig",
      location: "Koblenz, DE",
      bullets: [
        "DevOps-Umgebung für GameDevs (GitLab CI/CD)",
        "Apps/Tools mit React & Node.js"
      ],
    },
    {
      period: "Aug 2023 – Okt 2023",
      role: "Barkeeper",
      company: "Spökes",
      location: "Koblenz, DE",
      bullets: [],
    },
    {
      period: "Mai 2022 – Aug 2022",
      role: "Praktikant Logistik",
      company: "GC-GRUPPE",
      location: "Urmitz, DE",
      bullets: [
        "Warenannahme/-eingang, Disposition, Thekenausgabe"
      ],
    },
    {
      period: "Sep 2021 – Nov 2021",
      role: "Praktikant Logistik",
      company: "Normann Gruppe",
      location: "Bendorf, DE",
      bullets: [
        "Kommissionierung, Ein-/Ausgang, Inventur, Lagerverwaltung"
      ],
    },
    {
      period: "Aug 2020 – Okt 2020",
      role: "Praktikant IT",
      company: "MGS Meine-Gesundheit-Services",
      location: "Koblenz, DE",
      bullets: [
        "E-Mail-Automatisierung (Jira), Supportpostfach/Hotline"
      ],
    },
    {
      period: "Jul 2019 – Aug 2019",
      role: "Fachinformatiker Systemintegration",
      company: "Stormguards GmbH",
      location: "Vallendar, DE",
      bullets: [
        "Fehleranalyse, Tickets, Kundenkommunikation, Doku, HW/SW-Installationen"
      ],
    },
    {
      period: "Feb 2019 – Jun 2019",
      role: "IT-Techniker",
      company: "WMIT Solutions",
      location: "Ransbach-Baumbach, DE",
      bullets: [
        "1st/2nd-Level-Support, Backups/Updates, Monitoring, HW-Planung & Inbetriebnahme"
      ],
    },
    {
      period: "Jun 2018 – Nov 2018",
      role: "Fachinformatiker Systemintegration",
      company: "Computer Rausch",
      location: "Güllesheim, DE",
      bullets: [
        "Support, Wartung, Monitoring, HW-Konfiguration, Systemdokumentation"
      ],
    },
    {
      period: "Aug 2015 – Mai 2018",
      role: "Ausbildung Fachinformatiker Systemintegration",
      company: "Siemens PLM Software",
      location: "Höhr-Grenzhausen, DE",
      bullets: [
        "SPS-/MES-Anbindung (OPC), Testumgebungen, Schnittstellenentwicklung, IT-Support"
      ],
    },
  ]

  const education = [
    { period: "2021 – 2023", title: "BFW Koblenz", details: "Berufsausbildung, Logistik-/Materialwirtschaft" },
    { period: "2015 – 2018", title: "David-Röntgen-Schule", details: "Berufsausbildung, Informatik" },
    { period: "2013 – 2015", title: "Ernst-Barlach-Realschule plus", details: "Fachhochschulreife (Metallbau)" },
    { period: "—", title: "IHK-Akademie Koblenz e.V.", details: "Zertifikat Computer-Softwaretechnik" },
  ]

  const skills = [
    "IT-Support & Administration",
    "Windows/Netzwerk-Basics",
    "React · Node.js · FastAPI (Grundlagen/Projekte)",
    "Git & CI/CD (GitLab)",
    "Linux/Open Source Mindset",
    "Dokumentation & Kundenkommunikation",
  ]

  const languages = [
    { name: "Deutsch", level: "Muttersprache" },
    { name: "Englisch", level: "Grundkenntnisse" },
  ]

  return (
    <section className="mx-auto max-w-4xl px-4 py-20">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Lebenslauf</h1>
        <p className="text-white/70">Joshua Phu Bein · Koblenz, Deutschland</p>

        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="/Profile.pdf"
            className="rounded-2xl bg-[var(--accent,#ff9100)] px-5 py-3 font-medium text-black hover:brightness-110"
          >
            PDF herunterladen
          </a>
          <a
            href="mailto:joshua@phuonline.de"
            className="rounded-2xl border border-white/20 px-5 py-3 font-medium text-white/80 hover:bg-white/5"
          >
            joshua@phuonline.de
          </a>
          <a
            href="https://www.linkedin.com/in/joshuaphu"
            target="_blank"
            className="rounded-2xl px-4 py-3 font-medium text-white/70 hover:text-white"
          >
            LinkedIn /in/joshuaphu
          </a>
        </div>

        <p className="mt-6 max-w-2xl text-white/80">
          „Technik verständlich machen – das ist mein Ziel.“ IT-Supporter & Admin mit Hands-on-Mentalität,
          offen kommuniziert (ADHS), Fokus auf saubere, menschenzentrierte IT.
        </p>

        <p className="mt-2 text-xs text-white/50">Zuletzt aktualisiert: {updated}</p>
      </header>

      {/* Erfahrung */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Berufserfahrung</h2>
        <ul className="space-y-6">
          {experience.map((e) => (
            <li key={e.period} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold">{e.role} · {e.company}</h3>
                <span className="text-sm text-white/60">{e.period}</span>
              </div>
              <p className="text-white/70 text-sm">{e.location}</p>
              {e.bullets?.length > 0 && (
                <ul className="mt-3 list-disc pl-5 text-sm text-white/80 space-y-1">
                  {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Ausbildung */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Ausbildung</h2>
        <ul className="space-y-3">
          {education.map((ed) => (
            <li key={ed.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-medium">{ed.title}</p>
                <span className="text-sm text-white/60">{ed.period}</span>
              </div>
              <p className="text-sm text-white/80">{ed.details}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Skills & Sprachen */}
      <section className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Skills</h2>
          <ul className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <li key={s} className="rounded-full bg-white/5 px-3 py-1 text-sm text-white/80 ring-1 ring-white/10">{s}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3">Sprachen</h2>
          <ul className="space-y-1 text-white/80">
            {languages.map((l) => (
              <li key={l.name}><span className="font-medium">{l.name}</span> — {l.level}</li>
            ))}
          </ul>
        </div>
      </section>
    </section>
  )
}
