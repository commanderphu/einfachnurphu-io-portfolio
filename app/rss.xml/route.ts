// app/feed.xml/route.ts
export const runtime = 'edge'

import { allPosts } from '.contentlayer/generated'
import { buildRss } from '@/lib/rss'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://einfachnurphu.io' // setz das passend
const TITLE = 'Phu – Blog'
const DESCRIPTION = 'Artikel von Phu'

export async function GET() {
  // Sortiere nach Datum, neu zuerst
  const items = [...allPosts]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .map((p) => ({
      title: p.title,
      link: `${SITE_URL}/blog/${p.slug}`,
      description: p.description ?? p.summary ?? '',
      pubDate: p.date,
      guid: p.slug,
    }))

  const xml = buildRss({
    title: TITLE,
    description: DESCRIPTION,
    siteUrl: SITE_URL,
    items,
    language: 'de-DE',
  })

  return new Response(xml, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=86400',
    },
  })
}
