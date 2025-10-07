import RSS from "rss"
import { allPosts } from ".contentlayer/generated"

export async function generateRss() {
  const feed = new RSS({
    title: "einfachnurphu – Blog",
    site_url: "https://einfachnurphu.io",
    feed_url: "https://einfachnurphu.io/feed.xml",
    description: "Clean IT. Flash speed.",
    language: "de",
  })

  allPosts
    .filter(p => p.published)
    .sort((a,b)=>+new Date(b.date)-+new Date(a.date))
    .forEach(p => {
      feed.item({
        title: p.title,
        url: `https://einfachnurphu.io/blog/${p.slug}`,
        date: p.date,
        description: p.summary ?? "",
      })
    })

  return feed.xml({ indent: true })
}
