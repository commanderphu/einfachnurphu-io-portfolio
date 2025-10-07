import { withContentlayer } from 'next-contentlayer'
const isCF = process.env.CF_PAGES === '1' || process.env.CF_WORKER === '1'



const nextConfig = {
  images: {
    unoptimized: true, // wichtig für Cloudflare Workers
  },
  experimental: {
    runtime: "edge", // aktiviert Edge-Umgebung für App Router
  },
  reactStrictMode: true,
}

export default withContentlayer(nextConfig)