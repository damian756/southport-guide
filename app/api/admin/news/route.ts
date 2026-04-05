import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { makeUniqueNewsSlug } from "@/lib/slugify";
import { rewriteAsTerry, rewriteAsTerryFeatured, VALID_CATEGORY_SET } from "@/lib/rewrite-as-terry";
import { fetchUnsplashImage } from "@/lib/unsplash";
import { fetchArticleText } from "@/lib/fetch-article-text";
import { postToSocial } from "@/lib/post-to-social";

type Action = "publish" | "reject" | "feature" | "delete";

// Returns Claude's category if valid, else falls back to the existing DB value.
function resolveCategory(claudeCategory: string | undefined, fallback: string): string {
  if (claudeCategory && VALID_CATEGORY_SET.has(claudeCategory)) return claudeCategory;
  return fallback;
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { id?: string; action?: Action };
  const { id, action } = body;

  if (!id || !action || !["publish", "reject", "feature", "delete"].includes(action)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const item = await prisma.newsItem.findUnique({ where: { id } });
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (action === "reject") {
    await prisma.newsItem.update({
      where: { id },
      data: { status: "rejected" },
    });
    return NextResponse.json({ ok: true, status: "rejected" });
  }

  if (action === "delete") {
    await prisma.newsItem.delete({ where: { id } });
    return NextResponse.json({ ok: true, status: "deleted" });
  }

  // Standard publish: rewrite first (Claude picks category), then fetch image with correct category
  if (action === "publish") {
    const rawForRewrite = item.rawContent || item.summary;

    const rewritten = await rewriteAsTerry(item.title, rawForRewrite);
    const finalCategory = resolveCategory(rewritten?.category, item.category);

    // Fetch Unsplash image with the correct (Claude-determined) category
    const image = await fetchUnsplashImage(finalCategory);

    const finalTitle = (rewritten?.title ?? item.title).slice(0, 200);

    const slug =
      item.slug ??
      (await makeUniqueNewsSlug(finalTitle, async (candidate) => {
        const existing = await prisma.newsItem.findUnique({ where: { slug: candidate } });
        return existing !== null;
      }));

    await prisma.newsItem.update({
      where: { id },
      data: {
        title: finalTitle,
        summary: rewritten?.body ?? rewritten?.teaser ?? item.summary,
        keyFacts: rewritten?.keyFacts ?? [],
        category: finalCategory,
        slug,
        imageUrl: image?.url ?? item.imageUrl ?? null,
        imageCredit: image?.credit ?? item.imageCredit ?? null,
        status: "published",
        featured: false,
        publishedAt: new Date(),
      },
    });

    // Post to Facebook + X via Publer (awaited — void kills the call on Vercel serverless)
    const socialTeaser = rewritten?.teaser ?? finalTitle;
    await postToSocial({ title: finalTitle, teaser: socialTeaser, slug });

    return NextResponse.json({ ok: true, status: "published", category: finalCategory, slug });
  }

  // Feature: fetch full article text + 500+ word expanded rewrite + hero slot
  const fullText = item.sourceUrl ? await fetchArticleText(item.sourceUrl) : null;
  const richContent = fullText
    ? `${item.rawContent ?? item.summary}\n\n--- Full article ---\n${fullText}`
    : (item.rawContent ?? item.summary);

  const rewritten = await rewriteAsTerryFeatured(item.title, richContent);
  const finalCategory = resolveCategory(rewritten?.category, item.category);

  const image = await fetchUnsplashImage(finalCategory);

  const finalTitle = (rewritten?.title ?? item.title).slice(0, 200);

  const slug =
    item.slug ??
    (await makeUniqueNewsSlug(finalTitle, async (candidate) => {
      const existing = await prisma.newsItem.findUnique({ where: { slug: candidate } });
      return existing !== null;
    }));

  // Store subheading in keyFacts[0] with "h2:" prefix so the article page can render it
  const keyFacts = rewritten?.keyFacts ?? [];
  const subheading = rewritten?.subheading;
  const keyFactsWithSubheading = subheading ? [`h2:${subheading}`, ...keyFacts] : keyFacts;

  await prisma.newsItem.update({
    where: { id },
    data: {
      title: finalTitle,
      summary: rewritten?.body ?? rewritten?.teaser ?? item.summary,
      keyFacts: keyFactsWithSubheading,
      category: finalCategory,
      slug,
      imageUrl: image?.url ?? item.imageUrl ?? null,
      imageCredit: image?.credit ?? item.imageCredit ?? null,
      status: "published",
      featured: true,
      publishedAt: new Date(),
    },
  });

  // Post to Facebook + X via Publer (awaited — void kills the call on Vercel serverless)
  const featuredTeaser = rewritten?.teaser ?? finalTitle;
  await postToSocial({ title: finalTitle, teaser: featuredTeaser, slug });

  return NextResponse.json({ ok: true, status: "published", featured: true, category: finalCategory, slug });
}
