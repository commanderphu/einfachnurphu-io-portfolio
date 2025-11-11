import AboutMission from "@/components/AboutMission"
import ProjectsTeaser from "@/components/projects/ProjectTeaser"
import Image from "next/image"

export default function AboutPage() {
  return (
    <section className="py-20 px-4 mx-auto max-w-3xl space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Über mich</h1>
      <Image
        src="/images/joshua-phu.png"
        alt="Joshua Phu Kuhrau"
        width={160}
        height={160}
        className="rounded-full border border-white/10 shadow-lg object-cover"
      />

      <p className="text-white/80 leading-relaxed">
        Ich bin <strong>Joshua Phu Kuhrau</strong> – Fachinformatiker für Systemintegration,
        Entwickler, Musiker und Gründer von <strong>K.I.T. Solutions</strong>.
        Ich mag Systeme, die ruhig, robust und menschlich sind – genau wie gute Menschen.
        Wenn <strong>Barry Allen</strong> durch Central City rennt, bin ich der Typ,
        der die Server dahinter am Laufen hält. ⚡
      </p>

      <p className="text-white/80 leading-relaxed">
        Ich bin <strong>neurodivers</strong> – mein Kopf denkt in Mustern, Farben und Abläufen.
        Das ist kein Bug, sondern mein Superpower. Ich sehe Systeme wie Geschichten:
        sie müssen Sinn ergeben, ehrlich sein und Menschen dienen.
      </p>

      <p className="text-white/80 leading-relaxed">
        IT ist für mich kein Job – sie ist mein Weg, Ordnung in Chaos zu bringen.
        Ich baue Tools und Plattformen, die Menschen stärken:
        von <strong>Workmate OS</strong> (mein HR-Toolkit),
        über <strong>TravelTune</strong> (Reise & Storytelling),
        bis hin zu <strong>Nerdcast</strong> (mein Podcast über Kultur, Musik und Tech).
      </p>

      <p className="text-white/80 leading-relaxed">
        Als Visionär und CEO von K.I.T. Solutions glaube ich, dass 
         <strong> Technologie sauber, ethisch und offen</strong> sein muss.
        Mein Motto: <strong>„IT darf nicht schmutzig sein.“</strong>
        Für mich heißt das: Transparenz statt Tracking, Qualität statt Quantität,
        und Menschlichkeit statt Marketing.
      </p>

      <p className="text-white/80 leading-relaxed">
        Ich träume von einem offenen, nachhaltigen IT-Ökosystem – frei von Abhängigkeiten,
        mit echter Zusammenarbeit zwischen Entwicklern, Kreativen und Kunden.
        Ich will zeigen, dass IT schön, sicher und fair sein kann.
      </p>

      <p className="text-white/80 leading-relaxed">
        Und privat? Ich liebe Musik, besonders <strong>Electric Callboy</strong>,
        alte ThinkPads, Linux-Setups und meine Verlobte <strong>Jessica</strong>,
        die mich täglich daran erinnert, warum Empathie die wichtigste Komponente
        in jedem System ist. ❤️
      </p>

      <AboutMission />
      <ProjectsTeaser />
    </section>
  )
}
