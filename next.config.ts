import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560],
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
      {
        source: "/images/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/favicon-32x32.png",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
      {
        source: "/apple-touch-icon.png",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
      {
        source: "/og-default.png",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
      {
        source: "/videos/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },

  // Canonical www redirect + permanent fixes
  async redirects() {
    return [
      // Vercel preview → canonical domain
      {
        source: "/(.*)",
        has: [{ type: "host", value: "southport-guide.vercel.app" }],
        destination: "https://www.southportguide.co.uk/:path*",
        permanent: true,
      },
      // "Another Place" was moved from hotels → attractions category
      {
        source: "/hotels/another-place",
        destination: "/attractions/another-place",
        permanent: true,
      },
      // Guide pages moved to /guides/* (301 permanent)
      { source: "/southport-beach",       destination: "/guides/southport-beach",       permanent: true },
      { source: "/southport-pier",        destination: "/guides/southport-pier",        permanent: true },
      { source: "/southport-flower-show", destination: "/guides/southport-flower-show", permanent: true },
      { source: "/southport-air-show",    destination: "/guides/southport-air-show",    permanent: true },
      { source: "/birkdale-village",      destination: "/guides/birkdale-village",      permanent: true },
    ];
  },
};

export default nextConfig;
