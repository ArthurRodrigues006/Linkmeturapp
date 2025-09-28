/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
      },
    ],
  },
  // Enable standalone output for Docker
  output: 'standalone',
  // Set the correct tracing root for workspaces
  outputFileTracingRoot: require('path').join(__dirname, '../'),
  // Output file tracing includes
  outputFileTracingIncludes: {
    '/': ['./public/**/*']
  },
  // Environment variables for production
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig
