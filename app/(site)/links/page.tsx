// app/(site)/links/page.tsx

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Brand Icons
import {
  faInstagram,
  faGithub,
  faXTwitter,
  faThreads,
  faTwitch,
  faSpotify,
  faTiktok,
  faWebAwesome,
  faMastodon,
} from "@fortawesome/free-brands-svg-icons";

// Solid Icons
import {
  faCalendar,
  faMusic,
  faChartSimple,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";

export default function LinksPage() {
  const sections = [
    {
      category: "K.I.T Solutions",
      items: [
        {
          name: "Instagram – K.I.T.",
          url: "https://instagram.com/kit-it-koblenz",
          icon: faInstagram,
        },
        {
          name: "Webpage - K.I.T." ,
          url: "https://kit-it-koblenz.de",
          icon: faWebAwesome,      
        }
      ],
    },
    {
      category: "Stats",
      items: [
        {
          name: "Last.fm",
          url: "https://last.fm/user/einfachnurphu",
          icon: faMusic,
        },
        {
          name: "stats.fm",
          url: "https://stats.fm",
          icon: faChartSimple,
        },
      ],
    },
    {
      category: "Social Media",
      items: [
        {
          name: "Threads",
          url: "https://threads.net/einfachnurphu",
          icon: faThreads,
        },
        {
          name: "Twitter / X",
          url: "https://twitter.com/einfachnurphu",
          icon: faXTwitter,
        },
        {
          name: "Instagram",
          url: "https://instagram.com/einfachnurphu",
          icon: faInstagram,
        },
        {
          name: "Mastodon",
          url: "https://mastodon.social/@einfachnurphu",
          icon: faMastodon,
        },
        {
          name: "Twitch",
          url: "https://twitch.tv/commanderphu",
          icon: faTwitch,
        },
        {
          name: "Spotify",
          url: "https://open.spotify.com/user/einfachnurphu",
          icon: faSpotify,
        },
        {
          name: "Tiktok",
          url: "https://www.tiktok.com/@einfachnurphu",
          icon: faTiktok,
        }
      ],
    },
  ];

  return (
    <main className="min-h-dvh p-8 bg-[#0f0d0d] text-white flex flex-col items-center">
      {/* ===== HEADER ===== */}
      <div className="relative linktree-header">
        {/* Share Button */}
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
          <FontAwesomeIcon icon={faShareNodes} className="w-5 h-5" />
        </button>

        {/* Profilbild */}
        <Image
          src="/images/joshua-phu.png" // <-- unbedingt ersetzen
          width={128}
          height={128}
          alt="Profilbild"
        />

        {/* Username */}
        <div className="linktree-header-username">@einfachnurphu</div>

        {/* Bio */}
        <div className="linktree-header-bio">
          Sozialdemokrat • Christ • Punk • Superheld
        </div>

        {/* Social Icons */}
        <div className="linktree-header-socials">
          <a
            href="https://threads.net/einfachnurphu"
            target="_blank"
            rel="noopener noreferrer"
            className="linktree-header-social-icon"
          >
            <FontAwesomeIcon icon={faThreads} className="w-5 h-5" />
          </a>
          <a
            href="https://instagram.com/einfachnurphu"
            target="_blank"
            rel="noopener noreferrer"
            className="linktree-header-social-icon"
          >
            <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
          </a>
          <a
            href="https://tikTok.com/@einfachnurphu"
            target="_blank"
            rel="noopener noreferrer"
            className="linktree-header-social-icon"
          >
            <FontAwesomeIcon icon={faTiktok} className="w-5 h-5" />
          </a>
          <a
            href="https://twitch.com/commanderphu"
            target="_blank"
            rel="noopener noreferrer"
            className="linktree-header-social-icon"
          >
            <FontAwesomeIcon icon={faTwitch} className="w-5 h-5" />
          </a>
          <a
            href="https://mastodon.social/@einfachnurphu"
            target="_blank"
            rel="me noopener noreferrer"
            className="linktree-header-social-icon"
          >
            <FontAwesomeIcon icon={faMastodon} className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* ===== LINKS ===== */}
      <div className="linktree mt-10">
        {sections.map((section) => (
          <div key={section.category}>
            <div className="linktree-category">{section.category}</div>

            <div className="flex flex-col gap-3 mt-2">
              {section.items.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linktree-item"
                >
                  <div className="linktree-icon">
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="w-6 h-6"
                      style={{ color: "black" }}
                    />
                  </div>

                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
