"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faInstagram,
  faGithub,
  faXTwitter,
  faThreads,
  faTwitch,
  faSpotify,
  faTiktok,
  faMastodon,
} from "@fortawesome/free-brands-svg-icons"
import {
  faMusic,
  faChartSimple,
  faGlobe,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons"
import { Link as LinkIcon, Check } from "lucide-react"
import { useState } from "react"

const sections = [
  {
    category: "Entwicklung",
    items: [
      { name: "GitHub", url: "https://github.com/commanderphu", icon: faGithub },
      { name: "Portfolio", url: "https://einfachnurphu.io", icon: faGlobe },
    ],
  },
  {
    category: "K.I.T Solutions",
    items: [
      { name: "Instagram – K.I.T.", url: "https://instagram.com/kit-it-koblenz", icon: faInstagram },
      { name: "Website – K.I.T.", url: "https://kit-it-koblenz.de", icon: faBriefcase },
    ],
  },
  {
    category: "Musik & Stats",
    items: [
      { name: "Last.fm", url: "https://last.fm/user/einfachnurphu", icon: faMusic },
      { name: "stats.fm", url: "https://stats.fm/einfachnurphu", icon: faChartSimple },
      { name: "Spotify", url: "https://open.spotify.com/user/einfachnurphu", icon: faSpotify },
      { name: "Musikreise Playlist", url: "https://open.spotify.com/playlist/5iUyXpHVsXocHiqv6YLvn0", icon: faSpotify },
    ],
  },
  {
    category: "Social Media",
    items: [
      { name: "Threads", url: "https://threads.net/einfachnurphu", icon: faThreads },
      { name: "Twitter / X", url: "https://twitter.com/einfachnurphu", icon: faXTwitter },
      { name: "Instagram", url: "https://instagram.com/einfachnurphu", icon: faInstagram },
      { name: "Mastodon", url: "https://mastodon.social/@einfachnurphu", icon: faMastodon },
      { name: "Twitch", url: "https://twitch.tv/commanderphu", icon: faTwitch },
      { name: "TikTok", url: "https://www.tiktok.com/@einfachnurphu", icon: faTiktok },
    ],
  },
]

function CopyButton() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button
      onClick={copy}
      title="Link kopieren"
      className="absolute top-0 right-0 p-2 rounded-xl border border-white/10 bg-white/5 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all text-white/60"
    >
      {copied ? <Check size={16} /> : <LinkIcon size={16} />}
    </button>
  )
}

export default function LinksPage() {
  return (
    <section className="relative mx-auto max-w-md py-10 px-2">
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, #ff9100, transparent 70%)" }}
      />

      {/* Header */}
      <motion.div
        className="relative flex flex-col items-center text-center mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <CopyButton />

        <Image
          src="/images/joshua-phu.png"
          width={96}
          height={96}
          alt="Joshua Phu"
          className="rounded-full border-2 border-[var(--accent)] object-cover"
        />

        <h1 className="mt-4 text-xl font-bold">@einfachnurphu</h1>
        <p className="mt-1 text-sm text-white/50">Sozialdemokrat · Christ · Punk · Superheld</p>

        <p className="mt-1 font-mono text-xs text-[var(--accent)]">
          <span className="opacity-60">$ </span>admin · dev · creator
        </p>
      </motion.div>

      {/* Sections */}
      <div className="flex flex-col gap-8">
        {sections.map((section, si) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 + si * 0.08 }}
          >
            <div className="text-center text-xs font-medium text-white/40 uppercase tracking-widest mb-3">
              {section.category}
            </div>
            <div className="flex flex-col gap-2">
              {section.items.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl
                             bg-white/[.04] border border-white/10
                             hover:border-[var(--accent)] hover:bg-white/[.07]
                             transition-all duration-150 group"
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-[var(--accent)] shrink-0">
                    <FontAwesomeIcon icon={item.icon} className="w-4 h-4 text-black" />
                  </span>
                  <span className="font-medium text-white/90 group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                  <span className="ml-auto text-white/20 group-hover:text-[var(--accent)] transition-colors text-xs">↗</span>
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-12 text-center text-xs text-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        einfachnurphu.io
      </motion.p>
    </section>
  )
}
