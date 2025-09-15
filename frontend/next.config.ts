import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081',
    NEXT_PUBLIC_LANDING_URL: process.env.NEXT_PUBLIC_LANDING_URL || 'http://localhost:8081',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081'}/:path*`,
      },
      {
        source: '/landing/:path*',
        destination: `${process.env.NEXT_PUBLIC_LANDING_URL || 'http://localhost:8081'}/:path*`,
      },
    ];
  },
};

export default nextConfig;
