import { SITE } from "@/lib/site"

export async function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`
  return new Response(body, { headers: { "Content-Type": "text/plain" } })
}
