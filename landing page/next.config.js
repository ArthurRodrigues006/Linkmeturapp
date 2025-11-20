/** @type {import('next').NextConfig} */
const nextConfig = {
  // Moved from experimental.serverComponentsExternalPackages in Next.js 15
  serverExternalPackages: ['@prisma/client', 'prisma'],

  // Set output file tracing root to silence workspace warning
  output: 'standalone',
  outputFileTracingRoot: require('path').join(__dirname, '../'),

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@prisma/client')
    }
    return config
  }
}

module.exports = nextConfig