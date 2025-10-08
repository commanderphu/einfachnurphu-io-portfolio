import { withContentlayer } from "next-contentlayer"
import { runtime } from "./app/api/og/route"

const nextConfig = {
  eslint: {
    // 🚀 verhindert, dass ESLint den Build auf CF blockiert
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  reactStrictMode: true,
  experimental:{runtime:"edge"}
}

export default withContentlayer(nextConfig)
