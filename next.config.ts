import { withContentlayer } from "next-contentlayer"

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  reactStrictMode: true,
  // ❌ Kein globales runtime-Feld mehr
}

export default withContentlayer(nextConfig)
