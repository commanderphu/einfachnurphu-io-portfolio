// app/(site)/layout.tsx
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Accent Glow Hintergrund */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(800px 300px at 10% -10%, rgba(255,145,0,0.12), transparent 60%), radial-gradient(700px 260px at 90% 0%, rgba(255,145,0,0.06), transparent 60%)",
          maskImage:
            "radial-gradient(900px 400px at 50% 0%, rgba(0,0,0,1), transparent 62%)",
        }}
      />
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 pt-20 md:pt-24">
        {children}
      </main>
      <Footer />
    </>
  )
}
