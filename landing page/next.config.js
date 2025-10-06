/** @type {import('next').NextConfig} */
const nextConfig = {
  // Otimizações para produção
  poweredByHeader: false,
  compress: true,
  
  // Imagens otimizadas
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '*.onrender.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
  },
  
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Set the correct tracing root for workspaces
  outputFileTracingRoot: require('path').join(__dirname, '../'),
  
  // Output file tracing includes
  outputFileTracingIncludes: {
    '/': ['./public/**/*']
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ]
  },
  
  // Environment variables for production
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Experimental features
  experimental: {
    optimizePackageImports: ['@mui/material', '@emotion/react', '@emotion/styled'],
  },
  
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Otimizações para produção
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    
    return config
  },
}

module.exports = nextConfig
