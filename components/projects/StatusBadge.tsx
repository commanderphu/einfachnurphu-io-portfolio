import type { ProjectStatus } from "@/components/projects/types"
import { STATUS_LABEL } from "@/components/projects/types"

const STYLES: Record<ProjectStatus, string> = {
  active: "border-[var(--success)]/40 bg-[var(--success)]/15 text-[var(--success)]",
  wip: "border-[var(--warning)]/40 bg-[var(--warning)]/15 text-[var(--warning)]",
  completed: "border-white/20 bg-white/10 text-white/80",
  archived: "border-white/10 bg-white/5 text-muted",
}

export default function StatusBadge({
  status,
  className = "",
}: {
  status?: ProjectStatus
  className?: string
}) {
  if (!status) return null

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${STYLES[status]} ${className}`}
    >
      {STATUS_LABEL[status]}
    </span>
  )
}
