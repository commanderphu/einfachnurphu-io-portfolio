// components/AboutMission.tsx
export default function AboutMission() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
        <h2 className="text-2xl font-semibold">Mission & Vision</h2>
        <p className="mt-3 text-white/80">
          <strong>Mission:</strong> Saubere, offene und menschliche IT – ohne Bullshit.
          Ich baue Tools, die schnell, robust und stressfrei sind.
        </p>
        <p className="mt-2 text-white/80">
          <strong>Vision:</strong> K.I.T. Solutions als die ethische IT-Alternative in Koblenz:
          Open-Source-first, BYOD-freundlich, sicher und verständlich für Nicht-Nerds.
        </p>

        <ul className="mt-6 grid gap-2 sm:grid-cols-2 text-sm text-white/70">
          <li>⚡ Speed & Präzision (Barry-Mindset)</li>
          <li>🐧 Open Source & Linux überall sinnvoll</li>
          <li>🔒 Security by default, Privacy by design</li>
          <li>🧠 Automate the boring, explain the rest</li>
        </ul>
      </div>
    </section>
  )
}
