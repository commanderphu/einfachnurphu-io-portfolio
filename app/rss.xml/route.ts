export const runtime = "nodejs"; 

import { allPosts } from '.contentlayer/generated'

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const siteUrl = 'https://einfachnurphu.io'

  // nur veröffentlichte Posts, nach Datum sortiert
  const posts = allPosts
    .filter((p) => p.published !== false)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))

  const items = posts
    .map((p) => {
      const link = `${siteUrl}${p.url}`
      const pubDate = new Date(p.date).toUTCString()
      const title = esc(p.title)
      const description = esc(p.summary ?? '')
      return `
        <item>
          <title>${title}</title>
          <link>${link}</link>
          <guid>${link}</guid>
          <pubDate>${pubDate}</pubDate>
          <description>${description}</description>
        </item>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Blog – einfachnurphu.io</title>
      <link>${siteUrl}</link>
      <description>Neueste Blogposts von Joshua Phu</description>
      <language>de-DE</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      ${items}
    </channel>
  </rss>`

  return new Response(xml.trim(), {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=86400',
    },
  })
}
