// components/Header.tsx
"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, X, Github, Linkedin, Instagram } from "lucide-react"

const nav = [
  { href: "/projects", label: "Projekte" },
  { href: "/timeline", label: "Werdegang" },
  { href: "/about", label: "Über mich" },
  { href: "/blog", label: "Blog" },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  // ESC schließt Menü
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // Body Scroll Lock bei offenem Menü
  useEffect(() => {
    const root = document.documentElement
    if (open) root.classList.add("overflow-hidden")
    else root.classList.remove("overflow-hidden")
    return () => root.classList.remove("overflow-hidden")
  }, [open])

  // Schließt Menü bei Routenwechsel (e.g. Link-Klick)
  const handleNavClick = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 glass">
      <nav className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
        <Link href="/" className="font-semibold tracking-wide" style={{ fontFamily: "var(--font-mono)" }}>
          einfachnurphu.io
        </Link>

        {/* Desktop Nav */}
        <div className="ml-auto hidden md:flex items-center gap-4 text-sm text-dim">
          {nav.map((n) => (
            <NavLink key={n.href} href={n.href}>{n.label}</NavLink>
          ))}
          <div className="flex items-center gap-3 pl-4 border-l border-white/10 text-white/70">
            <a href="https://github.com/CommanderPhu" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)]">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/joshua-phu" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)]">
              <Linkedin size={18} />
            </a>
            <a href="https://instagram.com/einfachnurphu" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)]">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label="Menü öffnen"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto md:hidden inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2 text-white/80 hover:text-[var(--accent)] hover:border-[var(--accent)] transition"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile Panel */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        className={`md:hidden fixed inset-0 z-40 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        onClick={() => setOpen(false)}
      >
        {/* Dim/Backdrop */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} />

        {/* Sheet */}
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85%] border-l border-white/10 bg-[#0f0f10]/95 backdrop-blur-xl transition-transform duration-200 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <span className="font-semibold" style={{ fontFamily: "var(--font-mono)" }}>einfachnurphu.io</span>
            <button
              aria-label="Menü schließen"
              onClick={() => setOpen(false)}
              className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/80 hover:text-[var(--accent)] hover:border-[var(--accent)] transition"
            >
              <X size={16} />
            </button>
          </div>

          <div className="p-4">
            <ul className="space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    prefetch={false}
                    onClick={handleNavClick}
                    className="block rounded-lg px-3 py-2 text-white/85 hover:text-[var(--accent)] hover:bg-white/[.04] transition"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 h-px bg-white/10" />

            <div className="mt-4 flex items-center gap-3 text-white/70">
              <a href="https://github.com/CommanderPhu" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)]">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/joshuaphu" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)]">
                <Linkedin size={18} />
              </a>
              <a href="https://instagram.com/einfachnurphu" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)]">
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative transition-opacity hover:opacity-100 opacity-90">
      <span className="after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[var(--accent)] hover:after:w-full after:transition-all">
        {children}
      </span>
    </Link>
  )
}
