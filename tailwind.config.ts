import type { Config } from "tailwindcss"
import animate from "tailwindcss-animate"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#232223",
        accent: "#ff9100",
        text: "#ffffff",
        frappe: {
          base: "#303446",
          green: "#a6d189",
          teal: "#81c8be",
          yellow: "#e5c890",
        },
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.25)",
      },
      borderRadius: {
        "2xl": "1rem", // Tailwind-konforme Schreibweise (statt `xl2`)
      },
    },
  },
  plugins: [animate],
}

export default config
