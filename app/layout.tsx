// app/layout.tsx
import "@/styles/globals.css"
import { Inter, JetBrains_Mono } from "next/font/google"
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;


const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })


export const metadata = {
  title: "einfachnurphu",
  icons: {
    icon: [
      { url: "/favicon.svg" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicon-180.png",
    other: [
      {
        rel: "manifest",
        url: "/manifest.json"
      }
    ]
  },
  description: "Portfolio & Blog von Joshua Phu Kuhrau",
  metadataBase: new URL("https://einfachnurphu.io"), // oder deine lokale Dev-URL
  og: {
    title: "einfachnurphu",
    description: "Portfolio & Blog von Joshua Phu Kuhrau",
    url: "https://einfachnurphu.io",
    siteName: "einfachnurphu",
    images: [
      {
        url: "/posts/wer-ich-bin-cover.png",
        width: 1200,
        height: 630,
        alt: "einfachnurphu Portfolio & Blog",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${jetbrains.variable} dark`}>
      <body className="min-h-dvh bg-[#0e0e0f] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
