import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Standard-Next.js- und TS-Regeln übernehmen
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Eigene Regeln & Ignorierungen
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      ".contentlayer/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-empty-object-type": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-html-link-for-pages": "warn",
    },
  },
];

export default eslintConfig;
