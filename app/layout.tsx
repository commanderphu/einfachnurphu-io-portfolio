// app/layout.tsx
import "@/styles/globals.css"
import { Inter, JetBrains_Mono } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata = {
  metadataBase: new URL("https://einfachnurphu.io"), // oder deine lokale Dev-URL
  title: "einfachnurphu",
  description: "Portfolio & Blog von Joshua Phu Kuhrau",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${jetbrains.variable} dark`}>
      <body className="min-h-dvh bg-[#0e0e0f] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
