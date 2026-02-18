import { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/config";
import { BLOG_POSTS } from "@/lib/southport-data";

const BASE = "https://www.southportguide.co.uk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Static / editorial pages ────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                           lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE}/events`,               lastModified: new Date(), changeFrequency: "daily",   priority: 0.9  },
    { url: `${BASE}/blog`,                 lastModified: new Date(), changeFrequency: "daily",   priority: 0.9  },
    { url: `${BASE}/the-open-2026`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE}/mlec`,                 lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9  },
    { url: `${BASE}/claim-listing`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.8  },
    { url: `${BASE}/advertise`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/pricing`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/the-open-2026/accommodation`, lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/the-open-2026/restaurants`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/the-open-2026/getting-there`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/mlec/accommodation`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7  },
    { url: `${BASE}/mlec/restaurants`,     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7  },
    { url: `${BASE}/mlec/getting-there`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.6  },
    { url: `${BASE}/about`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.5  },
    { url: `${BASE}/contact`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.5  },
    { url: `${BASE}/privacy`,              lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2  },
    { url: `${BASE}/terms`,                lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2  },
  ];

  // ── Category listing pages ───────────────────────────────────
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${BASE}/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.85,
  }));

  // ── Blog posts ───────────────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date.split(" ").reverse().join("-")),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // ── Individual business pages ────────────────────────────────
  let businessPages: MetadataRoute.Sitemap = [];
  try {
    const { prisma } = await import("@/lib/prisma");
    const businesses = await prisma.business.findMany({
      select: {
        slug: true,
        updatedAt: true,
        category: { select: { slug: true } },
      },
      orderBy: { updatedAt: "desc" },
    });
    businessPages = businesses.map((b) => ({
      url: `${BASE}/${b.category.slug}/${b.slug}`,
      lastModified: b.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.65,
    }));
  } catch {
    // DB unavailable at build time
  }

  return [...staticPages, ...categoryPages, ...blogPages, ...businessPages];
}
