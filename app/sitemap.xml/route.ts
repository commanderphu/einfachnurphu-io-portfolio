import { posts, projects } from '#site/content'

const SITE = {
  url: 'https://einfachnurphu.de'
}

export async function GET() {
  const urlTag = (url: string, date: Date) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${date.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`

  const projectUrls = projects.map((p) =>
    urlTag(`${SITE.url}${p.url}`, new Date(p.date))
  ).join('')

  const postUrls = posts
    .filter((p) => p.published !== false)
    .map((p) => urlTag(`${SITE.url}${p.url}`, new Date(p.date)))
    .join('')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlTag(SITE.url, new Date())}
  ${urlTag(`${SITE.url}/blog`, new Date())}
  ${urlTag(`${SITE.url}/projects`, new Date())}
  ${postUrls}
  ${projectUrls}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  })
}