import { SITE } from "@/lib/site"
import { allPosts } from ".contentlayer/generated"
export const runtime = 'edge'


export async function GET() {
  const items = allPosts
    .filter(p => p.published !== false)
    .sort((a,b)=> +new Date(b.date) - +new Date(a.date))
    .map(p => {
      const url = `${SITE.url}${p.url}`
      return `
  <item>
    <title><![CDATA[${p.title}]]></title>
    <link>${url}</link>
    <guid>${url}</guid>
    <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    <description><![CDATA[${p.summary || ""}]]></description>
  </item>`
    })
    .join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title><![CDATA[${SITE.title}]]></title>
  <link>${SITE.url}</link>
  <description><![CDATA[${SITE.description}]]></description>
  ${items}
</channel>
</rss>`
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } })
}
