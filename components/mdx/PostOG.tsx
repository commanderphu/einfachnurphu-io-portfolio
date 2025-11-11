import Image from "next/image"

type Props = { title: string; cover?: string | null; className?: string }

function pickOg(title: string, cover?: string | null) {
  if (!cover) return `/api/og?title=${encodeURIComponent(title)}`
  if (cover.endsWith(".svg") || /placeholder/i.test(cover)) {
    return `/api/og?title=${encodeURIComponent(title)}`
  }
  return cover.startsWith("http") ? cover : cover
}

export default function PostOG({ title, cover, className }: Props) {
  const src = pickOg(title, cover ?? undefined)
  const isOgRoute = src.startsWith('/api/og')
  
  return (
    <figure className={className ?? "my-6"}>
      <Image 
        src={src} 
        alt={`Preview – ${title}`}
        width={1200}
        height={630}
        className="w-full rounded-xl border border-white/10"
        unoptimized={isOgRoute}  // ← Wichtig für /api/og routes
      />
      <figcaption className="mt-2 text-sm text-white/60">Share-Preview</figcaption>
    </figure>
  )
}