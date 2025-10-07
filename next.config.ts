import { withContentlayer } from 'next-contentlayer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Cast sorgt dafür, dass TS die Struktur akzeptiert
    /** @type {import('next/dist/shared/lib/image-config').RemotePattern[]} */
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
}

export default withContentlayer(nextConfig)
