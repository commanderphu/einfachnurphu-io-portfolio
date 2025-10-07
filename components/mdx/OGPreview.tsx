type Props = {
  title: string
  subtitle?: string
  className?: string
}

export default function OGPreview({ title, subtitle, className }: Props) {
  const u = new URLSearchParams({ title })
  if (subtitle) u.set("subtitle", subtitle) // optional, falls du später /api/og erweiterst
  const src = `/api/og?${u.toString()}`

  return (
    <figure className={className ?? "my-6"}>
      {/* Kein next/image absichtlich: OG ist bereits 1200x630 und kommt aus einer API */}
      <img
        src={src}
        alt={`OG Preview – ${title}`}
        className="w-full rounded-xl border border-white/10"
      />
      <figcaption className="mt-2 text-sm text-white/60">
        Share-Preview für: <strong>{title}</strong>
      </figcaption>
    </figure>
  )
}
