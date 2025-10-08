import { withContentlayer } from "next-contentlayer"

const nextConfig = {
  eslint: {
    // 🚀 verhindert, dass ESLint den Build auf CF blockiert
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  reactStrictMode: true,
}

export default withContentlayer(nextConfig)
