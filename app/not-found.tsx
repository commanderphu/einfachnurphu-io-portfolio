// app/not-found.tsx
"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center text-center px-6 bg-[#0e0e0f] text-white font-mono">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-7xl font-bold text-[var(--accent)] drop-shadow-[0_0_10px_var(--accent)]"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-2 text-white/70"
      >
        You seem lost in the multiverse of <span className="text-[var(--accent)]">/dev/null</span>.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-6 bg-black/30 border border-white/10 rounded-xl p-4 text-left w-full max-w-md"
      >
        <p className="text-[var(--accent)]">$ <span className="text-white/80">cd</span> /</p>
        <p className="text-[var(--accent)]">$ <span className="text-white/80">ls</span></p>
        <div className="mt-2 flex flex-col gap-1">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">./home</Link>
          <Link href="/projects" className="hover:text-[var(--accent)] transition-colors">./projects</Link>
          <Link href="/about" className="hover:text-[var(--accent)] transition-colors">./about</Link>
        </div>
        <p className="mt-4 text-[var(--accent)] animate-pulse">
          $ <span className="text-white/80">echo</span> "Stay nerdy, stay curious."
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }}>
        <Link
          href="/"
          className="mt-8 inline-block px-5 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-[var(--accent)] hover:text-black transition-colors"
        >
          Back to Home
        </Link>
      </motion.div>
    </main>
  )
}
