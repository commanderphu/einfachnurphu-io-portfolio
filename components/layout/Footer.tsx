import FollowMe from "@/components/ui/FollowMe"
import Link from "next/link"

const ACCENT = "var(--accent, #ff9100)"
const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer
      className="border-t border-white/10 text-sm text-white/60 py-12 mt-24"
      aria-labelledby="site-footer"
    >
      <div className="mx-auto max-w-5xl px-6 space-y-10 text-center">
        <h2 id="site-footer" className="sr-only">
          Seitenfuß
        </h2>

        {/* Social Links */}
        <FollowMe />

        {/* Navigation */}
        <nav aria-label="Footer Navigation">
          <div className="flex flex-wrap justify-center gap-6 text-xs font-mono uppercase tracking-wide text-white/50">
            {[
              { href: "/about", label: "About" },
              { href: "/impressum", label: "Impressum" },
              { href: "/datenschutz", label: "Datenschutz" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[color:var(--accent,#ff9100)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Divider */}
        <div className="w-24 h-px bg-white/10 mx-auto" />

        {/* Copyright + Signature */}
        <div className="space-y-2 mt-6">
          <p className="text-xs text-white/40 font-mono">
            © {year} Joshua Phu Bein · einfachnurphu.io
          </p>

          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p className="text-xs text-white/50 font-mono flex justify-center items-center gap-1">
            Made with
            <span className="text-[color:var(--accent,#ff9100)] motion-safe:animate-pulse [filter:drop-shadow(0_0_6px_rgba(255,145,0,.7))]">
              ❤️
            </span>
            and
            <span className="text-[color:var(--accent,#ff9100)] [filter:drop-shadow(0_0_6px_rgba(255,145,0,.7))]">
              ☕
            </span>
            somewhere between code & chaos.
          </p>
        </div>

        {/* Terminal Easter Egg */}
        <div
          className="mt-6 text-[11px] text-white/40 font-mono tracking-tight"
          aria-live="polite"
        >
          <span style={{ color: ACCENT }}>$</span>{" "}
          <span className="opacity-80">echo</span>{" "}
          <span
            style={{ color: ACCENT }}
            // eslint-disable-next-line react/no-unescaped-entities
          >
            &quot;Stay nerdy, stay curious.&quot;
          </span>
          <span className="animate-pulse text-white/50 motion-reduce:animate-none">
            ▊
          </span>
        </div>
      </div>
    </footer>
  )
}
