"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const SUBLINES = [
  "The Flash of IT — fast, precise, unstoppable.",
  "Speed · Code · Purpose.",
  "Clean IT. Flash speed. ⚡",
]

export default function Hero() {
  const prefersReduced = useMemo(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches,
    []
  )

  // --- Typewriter ---
  const [lineIndex, setLineIndex] = useState(0)
  const [typed, setTyped] = useState("")
  useEffect(() => {
    const full = SUBLINES[lineIndex]
    if (prefersReduced) { setTyped(full); return }
    let i = 0
    const t = setInterval(() => {
      i++
      setTyped(full.slice(0, i))
      if (i >= full.length) {
        clearInterval(t)
        const hold = setTimeout(() => {
          // next line (loop)
          setTyped("")
          setLineIndex((n) => (n + 1) % SUBLINES.length)
        }, 1800)
        return () => clearTimeout(hold)
      }
    }, 28)
    return () => clearInterval(t)
  }, [lineIndex, prefersReduced])

  return (
    <section className="relative overflow-hidden py-24 text-center" aria-labelledby="hero-title">
      {/* Lightning glow background */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute inset-0 blur-3xl [mask-image:radial-gradient(60%_60%_at_50%_30%,#000,transparent)]"
             style={{
               background:
                 "radial-gradient(40% 40% at 20% 10%, rgba(255,145,0,.20), transparent 60%), radial-gradient(35% 35% at 80% 20%, rgba(255,145,0,.12), transparent 60%)"
             }} />
        {/* subtle animated bolt */}
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-64 w-[2px] origin-top opacity-30 animate-bolt"
             style={{ background:
               "linear-gradient(to bottom, rgba(255,255,255,.0), rgba(255,255,255,.8), rgba(255,255,255,.0))" }} />
      </div>

      <div className="relative mx-auto max-w-3xl px-4">
        {/* whoami */}
        <motion.p
          className="mb-4 font-mono text-sm text-white/60"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .4 }}
        >
          <span className="text-[var(--accent,#ff9100)]">$</span> whoami
          <span className="ml-2">joshua@phu — admin • dev • creator</span>
        </motion.p>

        <motion.h1
          id="hero-title"
          className="text-5xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5, delay: .1 }}
        >
          Joshua Phu
        </motion.h1>

        {/* Typewriter line */}
        <div className="mt-2 flex items-center justify-center">
          <motion.p
            className="font-mono text-base text-[var(--accent,#ff9100)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .3 }}
            aria-live="polite"
          >
            {typed}
            {!prefersReduced && <span className="ml-1 inline-block h-5 w-[2px] align-[-2px] bg-[var(--accent,#ff9100)] animate-cursor" />}
          </motion.p>
        </div>

        <motion.p
          className="mt-6 text-white/80"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .35, duration: .5 }}
        >
          IT-Supporter · Developer · Nerd
          <br />
          Ich bewege mich durch Systeme wie Barry durch Central City – schnell, fokussiert und immer einen Schritt voraus.
          Saubere, offene und menschliche IT ist mein Ziel.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .45, duration: .5 }}
        >
      
          <Link href="/projects" className="rounded-2xl bg-[var(--accent,#ff9100)] px-5 py-3 font-medium text-black hover:brightness-110">
            Projekte ansehen
          </Link>
          <Link href="/contact" className="rounded-2xl border border-white/20 px-5 py-3 font-medium text-white/80 hover:bg-white/5">
            Kontakt aufnehmen
          </Link>
          <Link href="/about" className="rounded-2xl px-4 py-3 font-medium text-white/70 hover:text-white">
            Über mich
          </Link>

        </motion.div>
      </div>

      {/* Local component styles */}
      <style jsx>{`
        @keyframes cursor {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .animate-cursor { animation: cursor 1s step-end infinite; }

        @keyframes bolt {
          0% { transform: translateX(-50%) scaleY(0.2) rotate(5deg); opacity: .0; }
          6% { transform: translateX(-50%) scaleY(1) rotate(-3deg); opacity: .6; }
          12% { transform: translateX(-50%) scaleY(0.3) rotate(2deg); opacity: .0; }
          100% { transform: translateX(-50%) scaleY(0.2) rotate(5deg); opacity: .0; }
        }
        .animate-bolt { animation: bolt 6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-cursor, .animate-bolt { animation: none; }
        }
      `}</style>
    </section>
  )
}
