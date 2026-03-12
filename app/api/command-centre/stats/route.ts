import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const TIER_MRR: Record<string, number> = {
  standard: 29,
  featured: 49,
  premium: 99,
};

function requireApiKey(req: NextRequest): NextResponse | null {
  const key = req.headers.get("x-api-key");
  const expected = process.env.COMMAND_CENTRE_API_KEY;
  if (!expected || key !== expected) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  return null;
}

export async function GET(req: NextRequest) {
  const authError = requireApiKey(req);
  if (authError) return authError;

  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(weekStart.getDate() - 7);

  const [
    totalBusinesses,
    claimedCount,
    blogPostsCount,
    blogPostsThisWeek,
    lastBlogPost,
    subscriptions,
    boostRevenue,
    featuredCount,
  ] = await Promise.all([
    prisma.business.count(),
    prisma.business.count({ where: { claimed: true } }),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.blogPost.count({
      where: {
        published: true,
        publishedAt: { gte: weekStart },
      },
    }),
    prisma.blogPost.findFirst({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: { publishedAt: true },
    }),
    prisma.subscription.findMany({
      where: { status: "active" },
      select: { tier: true },
    }),
    prisma.listingBoost.aggregate({
      where: { status: "active", endsAt: { gte: now } },
      _sum: { pricePence: true },
    }),
    prisma.business.count({
      where: {
        listingTier: { in: ["standard", "featured", "premium"] },
      },
    }),
  ]);

  const mrr = subscriptions.reduce((s, sub) => s + (TIER_MRR[sub.tier] ?? 29), 0);
  const boostMrr = (boostRevenue._sum.pricePence ?? 0) / 100;

  const { GUIDES } = await import("@/lib/guides-config");
  const totalGuides = GUIDES.filter((g) => g.status === "published").length;

  return NextResponse.json({
    site: "southportguide",
    network: "sefton",
    period: now.toISOString().slice(0, 10),
    content: {
      totalListings: totalBusinesses,
      claimedListings: claimedCount,
      totalBlogPosts: blogPostsCount,
      blogPostsThisWeek,
      lastBlogPostDate: lastBlogPost?.publishedAt?.toISOString().slice(0, 10) ?? null,
      totalGuides,
    },
    revenue: {
      hubMembers: subscriptions.length,
      hubMRR: mrr,
      featuredListings: featuredCount,
      featuredMRR: mrr + boostMrr,
      affiliateThisMonth: 0,
    },
    outreach: {
      emailsSentThisWeek: 0,
      responsesThisWeek: 0,
      pendingFollowUps: 0,
    },
  });
}

