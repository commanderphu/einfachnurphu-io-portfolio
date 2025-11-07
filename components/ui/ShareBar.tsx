"use client"

import { useEffect, useState } from "react"
import { Twitter, Linkedin, Facebook, Link as LinkIcon, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ShareBar({ title }: { title: string }) {
  const [url, setUrl] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  const encoded = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)

  const links = [
    { href: `https://twitter.com/intent/tweet?text=${encoded}&url=${encodedUrl}`, icon: <Twitter size={18} /> },
    { href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, icon: <Linkedin size={18} /> },
    { href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, icon: <Facebook size={18} /> },
  ]

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="relative mt-6 flex items-center gap-3 text-white/80">
      {links.map((l, i) => (
        <a
          key={i}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl border border-white/10 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200 bg-white/5 hover:bg-white/10 backdrop-blur-sm"
        >
          {l.icon}
        </a>
      ))}

      <button
        onClick={copyToClipboard}
        className="relative p-2 rounded-xl border border-white/10 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200 bg-white/5 hover:bg-white/10 backdrop-blur-sm"
      >
        {copied ? <Check size={18} /> : <LinkIcon size={18} />}

        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-white/80 bg-[#232223]/90 border border-white/10 rounded-lg px-2 py-0.5 backdrop-blur-sm"
            >
              Kopiert!
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  )
}
