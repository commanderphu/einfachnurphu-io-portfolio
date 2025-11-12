// components/mdx/OGPreview.tsx
"use client"

import Image from "next/image"
import { useState } from "react"

type OGPreviewProps = {
  title?: string
  subtitle?: string
  icon?: string
  className?: string
}

/**
 * Interaktive Vorschau-Komponente für OG-Images.
 * Ideal für CMS, Admin-UI oder lokale Tests (/og-preview).
 */
export function OGPreview({
  title = "Beispieltitel",
  subtitle = "Untertitel / Summary",
  icon = "🎧",
  className,
}: OGPreviewProps) {
  const [t, setTitle] = useState(title)
  const [s, setSubtitle] = useState(subtitle)
  const [i, setIcon] = useState(icon)

  const params = new URLSearchParams({ title: t })
  if (s) params.set("subtitle", s)
  if (i) params.set("icon", i)
  const src = `/api/og?${params.toString()}`

  return (
    <section className={className ?? "flex flex-col gap-6"}>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          value={t}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titel eingeben"
          className="flex-1 rounded-lg bg-[#1a1a1b] px-4 py-2 text-white"
        />
        <input
          value={s}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Untertitel (optional)"
          className="flex-1 rounded-lg bg-[#1a1a1b] px-4 py-2 text-white"
        />
        <input
          value={i}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="Icon"
          className="w-24 rounded-lg bg-[#1a1a1b] px-4 py-2 text-center text-white"
        />
      </div>

      <figure>
        <Image
          src={src}
          alt={`OG Preview – ${t}`}
          width={1200}
          height={630}
          className="w-full rounded-xl border border-[#ff9100]/30 shadow-[0_0_25px_rgba(255,145,0,0.1)]"
          unoptimized
        />
        <figcaption className="mt-2 text-sm text-white/60 text-center">
          Live-Preview für <strong>{t}</strong>
        </figcaption>
      </figure>
    </section>
  )
}
