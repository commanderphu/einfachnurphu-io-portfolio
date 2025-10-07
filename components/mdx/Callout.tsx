type Props = {
  type?: "note" | "tip" | "warn"
  title?: string
  children: React.ReactNode
}

const colors: Record<NonNullable<Props["type"]>, { ring: string; bg: string; dot: string; }> = {
  note: { ring: "border-white/15", bg: "bg-white/5", dot: "bg-white/60" },
  tip:  { ring: "border-[color:oklch(75%_0.13_75)]/30", bg: "bg-[color:oklch(22%_0.06_75)]", dot: "bg-[color:oklch(75%_0.13_75)]" },
  warn: { ring: "border-[var(--accent)]/40", bg: "bg-[color-mix(in oklab,var(--accent) 16%, #0e0e0f)]", dot: "bg-[var(--accent)]" },
}

export default function Callout({ type = "note", title, children }: Props) {
  const c = colors[type]
  return (
    <div className={`my-5 rounded-xl ${c.bg} ${c.ring} border p-4`}>
      <div className="mb-1 flex items-center gap-2">
        <span className={`inline-block h-2.5 w-2.5 rounded-full ${c.dot}`}/>
        <span className="text-sm uppercase tracking-wide text-white/75">
          {title ?? (type === "tip" ? "Hinweis" : type === "warn" ? "Achtung" : "Notiz")}
        </span>
      </div>
      <div className="text-[0.975rem] leading-relaxed text-white/90">{children}</div>
    </div>
  )
}
