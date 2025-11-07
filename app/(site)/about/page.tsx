import AboutMission from "@/components/AboutMission"
import ProjectsTeaser from "@/components/projects/ProjectTeaser"
import Image from "next/image"
export default function AboutPage() {
  return (
    <section className="py-20 px-4 mx-auto max-w-3xl space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Über mich</h1>
      <Image
          src="/images/joshua-phu.png"
          alt="Joshua Phu Bein"
          width={160}
          height={160}
          className="rounded-full border border-white/10 shadow-lg object-cover"
        />
      <p className="text-white/80 leading-relaxed">
        Ich bin <strong>Joshua Phu</strong> – IT-Supporter, Entwickler und Nerd aus Koblenz.
        Ich mag Systeme, die schnell, sauber und ehrlich sind – genau wie gute Menschen.
        Wenn <strong>Barry Allen</strong> durch Central City rennt, bin ich der Typ,
        der die Server dahinter am Laufen hält. ⚡
      </p>

      <p className="text-white/80 leading-relaxed">
        Ich baue Tools und Umgebungen, die ruhig, robust und menschlich sind:
        von <strong>Workmate</strong>, meinem HR-Toolkit,
        bis hin zu <strong>TravelTune</strong> und <strong>Nerdcast</strong>.
        Mein Herz schlägt für <strong>Open Source</strong>, <strong>Linux</strong>,
        <strong>Automatisierung</strong> und <strong>Design mit Haltung</strong>.
      </p>

      <p className="text-white/80 leading-relaxed">
        IT ist für mich kein Job – sie ist meine Superhelden-Origin-Story.
        <br />
        <strong>Schnelligkeit, Präzision und Empathie</strong> sind meine drei Superkräfte.
      </p>
      <AboutMission />
      <ProjectsTeaser />
    </section>
  )
}
