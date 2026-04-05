import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { makeUniqueNewsSlug } from "@/lib/slugify";
import { rewriteAsTerry, rewriteAsTerryFeatured } from "@/lib/rewrite-as-terry";
import { fetchUnsplashImage } from "@/lib/unsplash";
import { fetchArticleText } from "@/lib/fetch-article-text";

type Action = "publish" | "reject" | "feature";

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { id?: string; action?: Action };
  const { id, action } = body;

  if (!id || !action || !["publish", "reject", "feature"].includes(action)) {
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

  // Standard publish: 280 word rewrite, Unsplash image
  if (action === "publish") {
    const rawForRewrite = item.rawContent || item.summary;
    const [rewritten, image] = await Promise.all([
      rewriteAsTerry(item.title, rawForRewrite),
      fetchUnsplashImage(item.category),
    ]);

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
        slug,
        imageUrl: image?.url ?? item.imageUrl ?? null,
        imageCredit: image?.credit ?? item.imageCredit ?? null,
        status: "published",
        featured: false,
        publishedAt: new Date(),
      },
    });

    return NextResponse.json({ ok: true, status: "published", slug });
  }

  // Feature: fetch full article text from sourceUrl + 500+ word expanded rewrite + hero slot
  const fullText = item.sourceUrl ? await fetchArticleText(item.sourceUrl) : null;
  const richContent = fullText
    ? `${item.rawContent ?? item.summary}\n\n--- Full article ---\n${fullText}`
    : (item.rawContent ?? item.summary);

  const [rewritten, image] = await Promise.all([
    rewriteAsTerryFeatured(item.title, richContent),
    fetchUnsplashImage(item.category),
  ]);

  const finalTitle = (rewritten?.title ?? item.title).slice(0, 200);

  const slug =
    item.slug ??
    (await makeUniqueNewsSlug(finalTitle, async (candidate) => {
      const existing = await prisma.newsItem.findUnique({ where: { slug: candidate } });
      return existing !== null;
    }));

  // Store subheading in keyFacts[0] prefixed with "h2:" so the article page can render it
  const keyFacts = rewritten?.keyFacts ?? [];
  const subheading = rewritten?.subheading;
  const keyFactsWithSubheading = subheading
    ? [`h2:${subheading}`, ...keyFacts]
    : keyFacts;

  await prisma.newsItem.update({
    where: { id },
    data: {
      title: finalTitle,
      summary: rewritten?.body ?? rewritten?.teaser ?? item.summary,
      keyFacts: keyFactsWithSubheading,
      slug,
      imageUrl: image?.url ?? item.imageUrl ?? null,
      imageCredit: image?.credit ?? item.imageCredit ?? null,
      status: "published",
      featured: true,
      publishedAt: new Date(),
    },
  });

  return NextResponse.json({ ok: true, status: "published", featured: true, slug });
}
