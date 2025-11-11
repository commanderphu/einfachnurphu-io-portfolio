import { build } from 'velite'

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      build({ watch: process.env.NODE_ENV === 'development' })
    }
    
    // ✅ Nur Velite-spezifische Warnungen ignorieren
    config.ignoreWarnings = [
      /webpack\.cache\.PackFileCacheStrategy/,
      /velite/
    ]
    
    return config
  },
  
  typescript: {
    ignoreBuildErrors: true
  }
}

export default nextConfig