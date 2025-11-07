// lib/rss.ts
type RssItem = {
  title: string
  link: string
  description?: string
  pubDate?: string | Date
  guid?: string
}

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function buildRss({
  title,
  description,
  siteUrl,
  items,
  language = 'de-DE',
}: {
  title: string
  description?: string
  siteUrl: string
  items: RssItem[]
  language?: string
}) {
  const now = new Date().toUTCString()

  const itemsXml = items
    .map((it) => {
      const pub = it.pubDate
        ? new Date(it.pubDate).toUTCString()
        : undefined
      const guid = it.guid ?? it.link
      return `
        <item>
          <title>${esc(it.title)}</title>
          <link>${esc(it.link)}</link>
          ${it.description ? `<description>${esc(it.description)}</description>` : ''}
          ${pub ? `<pubDate>${pub}</pubDate>` : ''}
          <guid>${esc(guid)}</guid>
        </item>`
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>${esc(title)}</title>
      <link>${esc(siteUrl)}</link>
      ${description ? `<description>${esc(description)}</description>` : ''}
      <language>${esc(language)}</language>
      <lastBuildDate>${now}</lastBuildDate>
      ${itemsXml}
    </channel>
  </rss>`
}
