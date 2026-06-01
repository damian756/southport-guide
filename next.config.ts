import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80, 85],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      // Legacy Google Places photo URLs still used by non-parking listings
      { protocol: 'https', hostname: 'maps.googleapis.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'streetviewpixels-pa.googleapis.com' },
      // Unsplash images for news cards
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
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

      // Old URL patterns (inferred from GSC 404 data)
      { source: "/blog/southport-beach",           destination: "/guides/southport-beach",           permanent: true },
      { source: "/blog/southport-pier",            destination: "/guides/southport-pier",            permanent: true },
      { source: "/southport-beach-guide",          destination: "/guides/southport-beach",           permanent: true },
      { source: "/southport-pier-guide",           destination: "/guides/southport-pier",            permanent: true },
      { source: "/southport-flower-show-guide",    destination: "/guides/southport-flower-show",     permanent: true },
      { source: "/southport-air-show-guide",       destination: "/guides/southport-air-show",        permanent: true },
      { source: "/guides/southport-air-show-2026", destination: "/guides/southport-air-show",        permanent: true },
      { source: "/the-open-2026-southport",        destination: "/the-open-2026",                   permanent: true },
      { source: "/open-2026",                      destination: "/the-open-2026",                   permanent: true },
      { source: "/the-open",                       destination: "/the-open-2026",                   permanent: true },
      { source: "/southport-food-festival",        destination: "/guides/southport-food-drink-festival-2026", permanent: true },
      { source: "/food-festival",                  destination: "/guides/southport-food-drink-festival-2026", permanent: true },
      { source: "/southport-sausage-cider",        destination: "/guides/southport-sausage-cider-festival",   permanent: true },
      { source: "/sausage-cider-festival",         destination: "/guides/southport-sausage-cider-festival",   permanent: true },
      { source: "/southport-armed-forces-day",     destination: "/guides/southport-armed-forces-festival",    permanent: true },
      { source: "/armed-forces-day-southport",     destination: "/guides/southport-armed-forces-festival",    permanent: true },
      { source: "/accommodation",                  destination: "/guides/accommodation-southport",   permanent: true },
      { source: "/southport-accommodation",        destination: "/guides/accommodation-southport",   permanent: true },
      { source: "/where-to-stay",                  destination: "/guides/accommodation-southport",   permanent: true },
      { source: "/southport-parking",              destination: "/guides/parking-southport",         permanent: true },
      { source: "/free-parking",                   destination: "/guides/free-parking-southport",    permanent: true },
      { source: "/lord-street-southport",          destination: "/guides/lord-street",               permanent: true },
      { source: "/southport-lord-street",          destination: "/guides/lord-street",               permanent: true },
      { source: "/southport-weather",              destination: "/guides/southport-beach",           permanent: true },
      { source: "/visit-southport",                destination: "/",                                 permanent: true },
      { source: "/southport-guide",                destination: "/",                                 permanent: true },
      { source: "/categories",                     destination: "/things-to-do",                    permanent: true },
      // Old /news/* slugs → blog (if individual article slugs were indexed before the section existed)
      { source: "/news/:slug",                     destination: "/blog/:slug",                      permanent: true },
    ];
  },
};

export default nextConfig;
