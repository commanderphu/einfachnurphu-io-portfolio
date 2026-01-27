import { posts } from '#site/content'
import RSS from 'rss'

export async function GET() {
  const feed = new RSS({
    title: 'einfachnurphu - Blog',
    description: 'Developer, Designer & Content Creator',
    feed_url: 'https://einfachnurphu.io/feed.xml',
    site_url: 'https://einfachnurphu.io',
    language: 'de',
    pubDate: new Date()
  })

  posts
    .filter((p) => p.published !== false)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 20)
    .forEach((p) => {
      feed.item({
        title: p.title,
        description: p.summary ?? '',
        url: `https://einfachnurphu.io${p.url}`,
        date: new Date(p.date),
        categories: p.tags ?? []
      })
    })

  const xml = feed.xml()
  const stylesheet = '<?xml-stylesheet type="text/xsl" href="https://einfachnurphu.io/rss.xsl"?>'
  const styledXml = xml.startsWith('<?xml')
    ? xml.replace('<?xml version="1.0" encoding="UTF-8"?>', `<?xml version="1.0" encoding="UTF-8"?>\n${stylesheet}\n`)
    : `${stylesheet}\n${xml}`

  return new Response(styledXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  })
}
