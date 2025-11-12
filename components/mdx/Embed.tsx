"use client"

import { useEffect } from "react"

type Props = {
  url: string
  caption?: string
}

export default function Embed({ url, caption }: Props) {
  const isYouTube = /youtube\.com|youtu\.be/.test(url)
  const isSpotify = /spotify\.com/.test(url)
  const isInstagram = /instagram\.com/.test(url)
  const isInstagramProfile = isInstagram && /instagram\.com\/[^/]+\/?$/.test(url)

  useEffect(() => {
    if (isInstagram && !isInstagramProfile) {
      const existing = document.querySelector("script[src*='instagram.com/embed.js']")
      if (!existing) {
        const script = document.createElement("script")
        script.src = "https://www.instagram.com/embed.js"
        script.async = true
        document.body.appendChild(script)
      } else if ((window as any).instgrm) {
        ;(window as any).instgrm.Embeds.process()
      }
    }
  }, [url, isInstagram, isInstagramProfile])

  // === YouTube ===
  if (isYouTube) {
    const videoId = url.replace(/.*(youtu\.be\/|v=)([^#&?]*).*/, "$2").split("?")[0]
    const embedUrl = `https://www.youtube.com/embed/${videoId}`
    return (
      <div className="embed-card-wrapper">
        <div className="embed-card">
          <iframe
            src={embedUrl}
            className="aspect-video w-full"
            allowFullScreen
            loading="lazy"
          />
        </div>
        {caption && <p className="embed-caption">{caption}</p>}
      </div>
    )
  }

  // === Spotify ===
  if (isSpotify) {
    const embedUrl = url.replace("/track/", "/embed/track/")
    return (
      <div className="embed-card-wrapper">
        <div className="embed-card">
          <iframe
            src={embedUrl}
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
        {caption && <p className="embed-caption">{caption}</p>}
      </div>
    )
  }

  // === Instagram Profile (z. B. /darknessenemyofficial/) ===
  if (isInstagramProfile) {
    return (
      <div className="embed-card-wrapper">
        <div className="embed-card text-center py-6 px-4">
          <p className="text-white/80 text-sm mb-2">📸 Instagram-Profil:</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors"
          >
            @{url.split("instagram.com/")[1].replace("/", "")}
          </a>
        </div>
        {caption && <p className="embed-caption">{caption}</p>}
      </div>
    )
  }

  // === Instagram Post ===
  if (isInstagram) {
    return (
      <div className="embed-card-wrapper">
        <div className="embed-card">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={url}
            data-instgrm-version="14"
          ></blockquote>
        </div>
        {caption && <p className="embed-caption">{caption}</p>}
      </div>
    )
  }

  // === Default fallback ===
  return (
    <div className="embed-card-wrapper">
      <div className="embed-card embed-placeholder">
        <p>
          🔗{" "}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[var(--accent)] hover:opacity-80"
          >
            {url}
          </a>
        </p>
        <p>Diese Plattform wird noch nicht unterstützt.</p>
      </div>
      {caption && <p className="embed-caption">{caption}</p>}
    </div>
  )
}
