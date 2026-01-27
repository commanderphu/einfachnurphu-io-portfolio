import { Github, Linkedin, Instagram, Mail, Rss } from "lucide-react"

function MastodonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M7 16V8l5 5 5-5v8" />
    </svg>
  )
}

export default function FollowMe() {
  const items = [
    { href: "https://github.com/CommanderPhu", label: "GitHub", icon: <Github size={18} /> },
    { href: "https://www.linkedin.com/in/joshua-phu", label: "LinkedIn", icon: <Linkedin size={18} /> },
    { href: "https://instagram.com/einfachnurphu", label: "Instagram", icon: <Instagram size={18} /> },
    {
      href: "https://mastodon.social/@einfachnurphu",
      label: "Mastodon",
      icon: <MastodonIcon />,
      rel: "me noopener noreferrer",
    },
    { href: "mailto:hi@einfachnurphu.io", label: "E-Mail", icon: <Mail size={18} /> },
    { href: "/feed.xml", label: "RSS", icon: <Rss size={18} /> },
  ]

  return (
    <div className="text-center mt-12 text-sm font-light text-white/70">
      <p className="mb-4 tracking-wide text-white/80 font-mono uppercase text-xs">
        — Folge mir —
      </p>

      <div className="flex justify-center flex-wrap gap-6">
        {items.map((it) => (
          <a
            key={it.label}
            href={it.href}
            target={it.href.startsWith('http') ? '_blank' : undefined}
            rel={it.rel ?? "noopener noreferrer"}
            className="flex items-center gap-1.5 text-white/60 hover:text-[var(--accent)] transition-colors"
          >
            {it.icon}
            <span className="hidden sm:inline font-mono">{it.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
