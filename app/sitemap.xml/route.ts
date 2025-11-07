import { SITE } from "@/lib/site"
import { allPosts, allProjects } from ".contentlayer/generated"

export async function GET() {
  const staticUrls = [
    "", "/projects", "/blog", "/about", "/timeline"
  ].map(path => urlTag(`${SITE.url}${path}`, new Date()))

  const projectUrls = allProjects.map(p =>
    urlTag(`${SITE.url}${p.url}`, new Date(p.date))
  )
  const postUrls = allPosts
    .filter(p => p.published !== false)
    .map(p => urlTag(`${SITE.url}${p.url}`, new Date(p.date)))

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...projectUrls, ...postUrls].join("\n")}
</urlset>`
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } })
}

function urlTag(loc: string, lastmod?: Date) {
  return `<url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod.toISOString()}</lastmod>` : ""}</url>`
}
