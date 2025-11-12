import { build } from "velite"

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🧠 Velite automatisch bei Server-Build starten
  webpack: (config, { isServer }) => {
    if (isServer) {
      build({ watch: process.env.NODE_ENV === "development" })
    }

    // ✅ Nur Velite-spezifische / Cache-Parser-Warnungen unterdrücken
    config.ignoreWarnings = [
      /webpack\.cache\.PackFileCacheStrategy/,
      /velite\/dist\/chunk/,
      /velite/,
    ]

    return config
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 🧱 Image API Config – für OG-Images & Blog-Cover
  images: {
    localPatterns: [
      { pathname: "/api/og", search: "*" },
      { pathname: "/images/posts/**" },
      { pathname: "/images/**" },
      { pathname: "/og/**" }, // 👈 für generierte OG-WebPs
    ],
  },

  // ⚙️ Experimentelle Optionen (Next 15.2+)
  experimental: {
    allowedDevOrigins: [
      "https://portfolio.intern.phudevelopement.xyz",
      "http://portfolio.intern.phudevelopement.xyz",
    ],
  },

  // 🔧 TS-Erleichterung für schnelle Iteration
  typescript: {
    ignoreBuildErrors: true,
  },

  // 🧩 Allgemein gute Praxis
  reactStrictMode: true,
}

export default nextConfig
