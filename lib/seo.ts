// lib/seo.ts
export const site = {
  name: "einfachnurphu.io",
  url: "https://einfachnurphu.io",
  title: "Joshua Phu Bein – Portfolio",
  description: "Projekte, Werdegang & Blog von Joshua Phu Bein.",
  ogImage: "/api/og?title=einfachnurphu.io",
}

/**
 * Baut dynamische SEO/OG Metadaten für Einzelseiten
 */
export function buildMetadata({
  title,
  description,
  cover,
  slug,
}: {
  title: string
  description?: string
  cover?: string
  slug?: string
}) {
  const base = site.url
  const url = slug ? `${base}${slug}` : base

  // Wenn das Cover fehlt, ein SVG ist oder nach "placeholder" aussieht → API-OG
  const isBadForOg =
    !cover ||
    cover.endsWith(".svg") ||
    /placeholder/i.test(cover)

  const og = isBadForOg
    ? `${base}/api/og?title=${encodeURIComponent(title)}`
    : (cover.startsWith("http") ? cover : `${base}${cover}`)

  return {
    title: `${title} | ${site.name}`,
    description: description || site.description,
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [{ url: og, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [og],
    },
    alternates: { canonical: url },
  }
}

