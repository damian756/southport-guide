// Google News sitemap — served at /news-sitemap.xml
// Includes articles published within the last 2 days (Google News only indexes recent content).
// Submit this URL to Google Search Console under News Sitemap.

import { prisma } from "@/lib/prisma";

export const revalidate = 300; // Regenerate every 5 minutes

export async function GET() {
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

  const items = await prisma.newsItem.findMany({
    where: {
      status: { in: ["published", "auto_published"] },
      publishedAt: { gte: twoDaysAgo },
    },
    orderBy: { publishedAt: "desc" },
    take: 1000,
    select: {
      id: true,
      slug: true,
      title: true,
      category: true,
      publishedAt: true,
      createdAt: true,
    },
  });

  const siteUrl = "https://www.southportguide.co.uk";

  const entries = items.map((item) => {
    const url = `${siteUrl}/news/${item.slug ?? item.id}`;
    const pubDate = (item.publishedAt ?? item.createdAt).toISOString();

    return `  <url>
    <loc>${escapeXml(url)}</loc>
    <news:news>
      <news:publication>
        <news:name>SouthportGuide.co.uk</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${escapeXml(item.title)}</news:title>
    </news:news>
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${entries.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
