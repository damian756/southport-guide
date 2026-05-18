import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/_next/image"],
        disallow: [
          "/api/",
          "/dashboard/",
          "/admin/",
          "/_next/static/",
          "/manifest.json",
        ],
      },
      // Disallow AI training crawlers (allow AI search indexers like GPTBot which we want)
      { userAgent: "CCBot",               disallow: "/" },
      { userAgent: "anthropic-ai",        disallow: "/" },
      { userAgent: "Claude-Web",          disallow: "/" },
      { userAgent: "cohere-ai",           disallow: "/" },
      { userAgent: "Google-Extended",     disallow: "/" },
      { userAgent: "Omgilibot",           disallow: "/" },
      { userAgent: "FacebookBot",         disallow: "/" },
      { userAgent: "Bytespider",          disallow: "/" },
      { userAgent: "Diffbot",             disallow: "/" },
      { userAgent: "ImagesiftBot",        disallow: "/" },
      { userAgent: "Petalbot",            disallow: "/" },
    ],
    sitemap: "https://www.southportguide.co.uk/sitemap.xml",
  };
}
