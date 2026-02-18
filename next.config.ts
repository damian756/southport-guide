import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Hero is 2560px source; ensure we serve a 2560px variant (no upscale blur)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
  },
  // Security + performance headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "X-Frame-Options",            value: "SAMEORIGIN" },
          { key: "X-XSS-Protection",           value: "1; mode=block" },
          { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",          value: "camera=(), microphone=(), geolocation=(self)" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      // Long-lived cache for static assets
      {
        source: "/_next/static/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/fonts/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },

  // Canonical www redirect
  async redirects() {
    return [
      {
        source: "/(.*)",
        has: [{ type: "host", value: "southport-guide.vercel.app" }],
        destination: "https://www.southportguide.co.uk/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
