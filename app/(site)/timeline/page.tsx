"use client"

import { motion } from "framer-motion"

const TIMELINE = [
  {
    date: "1995",
    title: "Geboren in Neuwied",
    desc: "Ein Blitz schlägt ein ⚡",
  },
  {
    date: "2015–2018",
    title: "Ausbildung zum Fachinformatiker – Siemens PLM Software",
    desc: "Systemintegration, SPS-Anbindung, IT-Support, Schnittstellenentwicklung.",
  },
  {
    date: "2018–2019",
    title: "IT-Techniker – Computer Rausch / WMIT Solutions",
    desc: "First & Second Level Support, Hardware, Backup, Monitoring.",
  },
  {
    date: "2019–2020",
    title: "IT-Praktikum – MGS Meine Gesundheit Services",
    desc: "Automatisierung mit Jira, Supporthotline, Prozessoptimierung.",
  },
  {
    date: "2021–2023",
    title: "BFW Koblenz – Umschulung & neue Perspektive",
    desc: "Schwerpunkt Logistikprozesse & Digitalisierung.",
  },
  {
    date: "2023–2024",
    title: "Amazon – Interim Teamleitung & Prozesskoordination",
    desc: "Führung & Organisation, Kommunikation zwischen Abteilungen.",
  },
  {
    date: "2025",
    title: "Gründung von K.I.T. Solutions",
    desc: "IT mit Haltung – Open Source, fair, lokal. Nebenberuflicher Start in Koblenz.",
  },
  {
    date: "2025–heute",
    title: "Computacenter / Experis GmbH – Junior-Techniker",
    desc: "Field-IT & Support, Kundenkontakt, Administration.",
  },
  {
    date: "Zukunft",
    title: "Der Weg geht weiter …",
    desc: "Aufbau eines nachhaltigen IT-Ökosystems mit Herz, Hirn & Flash-Speed.",
  },
]


export default function TimelinePage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="text-4xl font-bold mb-8">Werdegang</h1>
      <div className="relative border-l border-white/10">
        {TIMELINE.map((item, i) => (
          <motion.div
            key={item.date}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="pl-6 pb-10 relative"
          >
            <span className="absolute left-[-0.35rem] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--accent,#ff9100)]" />
            <p className="text-sm text-white/60">{item.date}</p>
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
