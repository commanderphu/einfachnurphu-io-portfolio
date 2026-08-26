// Gemeinsamer Typ für Projekt-Vorschauen.
// Bewusst schmaler als der Velite-Typ: So lassen sich Projekte vom Server an
// Client-Komponenten reichen, ohne den kompilierten MDX-Body mitzuschleppen.
// Vollständige Velite-Objekte erfüllen diesen Typ ebenfalls.
export type ProjectStatus = "active" | "completed" | "archived" | "wip"

export type ProjectSummary = {
  title: string
  slug?: string
  url?: string
  summary?: string
  cover?: string
  tags?: string[]
  tech?: string[]
  featured?: boolean
  status?: ProjectStatus
  date?: string | Date
}

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  active: "Läuft",
  wip: "In Arbeit",
  completed: "Abgeschlossen",
  archived: "Ruht",
}

// Reihenfolge für die Sortierung: Laufendes zuerst, Ruhendes zuletzt.
export const STATUS_ORDER: Record<ProjectStatus, number> = {
  active: 0,
  wip: 1,
  completed: 2,
  archived: 3,
}
