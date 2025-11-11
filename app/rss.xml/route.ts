import { posts } from '#site/content'
import RSS from 'rss'

export async function GET() {
  const feed = new RSS({
    title: 'einfachnurphu - Blog',
    description: 'Developer, Designer & Content Creator',
    feed_url: 'https://einfachnurphu.de/rss.xml',
    site_url: 'https://einfachnurphu.de',
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
        url: `https://einfachnurphu.de${p.url}`,
        date: new Date(p.date),
        categories: p.tags ?? []
      })
    })

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  })
}