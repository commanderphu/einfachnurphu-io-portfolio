// components/mdx/PostOG.tsx
import Image from "next/image"

type PostOGProps = {
  title: string
  cover?: string | null
  icon?: string
  className?: string
}

/**
 * Wählt das passende OG-Bild:
 * – Fallback: /api/og?title=…&icon=… wenn kein Cover vorhanden
 * – Sonst: vorhandenes Cover (lokal oder extern)
 */
function pickOg(title: string, icon?: string, cover?: string | null) {
  if (!cover || cover.endsWith(".svg") || /placeholder/i.test(cover)) {
    const params = new URLSearchParams({ title })
    if (icon) params.set("icon", icon)
    return `/api/og?${params.toString()}`
  }
  return cover.startsWith("http") ? cover : cover
}

export function PostOG({ title, cover, icon, className }: PostOGProps) {
  const src = pickOg(title, icon, cover ?? undefined)
  const isOgRoute = src.startsWith("/api/og")

  return (
    <figure className={className ?? "my-8"}>
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-[0_0_20px_rgba(255,145,0,0.1)]">
        <Image
          src={src}
          alt={`Preview – ${title}`}
          width={1200}
          height={630}
          unoptimized={isOgRoute}
          className="h-full w-full object-cover"
          priority
        />
      </div>

      <figcaption className="mt-3 text-center text-sm text-[var(--muted)] italic">
        {isOgRoute
          ? "🪄 Automatisch generierte Share-Preview"
          : "📸 Benutzerdefiniertes Titelbild"}
      </figcaption>
    </figure>
  )
}
