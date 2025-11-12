"use client"

export default function DevBanner() {
  // Im Production-Build ausblenden
  if (process.env.NODE_ENV === "production") return null

  return (
    <div
      role="status"
      aria-label="Entwicklermodus aktiv – unveröffentlichte Inhalte sichtbar"
      className="fixed bottom-5 right-5 z-[100] flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)]/70 px-4 py-2 text-sm text-[var(--accent)] shadow-[0_0_15px_rgba(255,145,0,0.25)] backdrop-blur-md animate-fade-in ring-soft select-none"
    >
      {/* 🧠 Pulsierender Punkt */}
      <div className="relative flex h-2 w-2">
        <span className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-70 blur-[2px] animate-ping"></span>
        <span className="h-2 w-2 rounded-full bg-[var(--accent)]"></span>
      </div>

      <span className="font-medium tracking-wide">
        DEV&nbsp;MODE&nbsp;—&nbsp;Drafts&nbsp;sichtbar
      </span>
    </div>
  )
}
