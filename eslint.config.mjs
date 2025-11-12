import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  // ✅ Next.js + TypeScript-Basisregeln
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ⚙️ Projektweite Overrides
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      ".contentlayer/**",
      ".velite/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "public/og/**",
    ],

    rules: {
      // 🧠 Typisierung: kein Build-Blocker mehr, aber lokal Warnung
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-empty-object-type": "off",

      // ⚛️ React-spezifisch: keine unnötigen Warnungen bei Texten
      "react/no-unescaped-entities": "off",

      // 🧱 Imports / Node-Kompatibilität
      "@typescript-eslint/no-require-imports": "off",
      "import/no-anonymous-default-export": "off",

      // 🧩 Next.js-spezifische Regeln lockern
      "@next/next/no-html-link-for-pages": "warn",
      "@next/next/no-img-element": "off",

      // 🪶 Code-Stil
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "prefer-const": "warn",
    },
  },
]

export default eslintConfig
