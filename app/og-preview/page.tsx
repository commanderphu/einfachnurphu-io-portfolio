// app/og-preview/page.tsx
import { OGPreview } from "@/components/mdx/OGPreview"

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0e0e0f] text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-[#ff9100]">OG Image Preview</h1>
      <OGPreview />
    </main>
  )
}
