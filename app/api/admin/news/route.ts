import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { makeNewsSlug } from "@/lib/slugify";
import { rewriteAsTerry } from "@/lib/rewrite-as-terry";
import { fetchUnsplashImage } from "@/lib/unsplash";

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { id?: string; action?: "publish" | "reject" };
  const { id, action } = body;

  if (!id || !action || !["publish", "reject"].includes(action)) {
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

  // Publish: rewrite with Claude, fetch image, generate slug
  const rawForRewrite = item.rawContent || item.summary;
  const [rewritten, image] = await Promise.all([
    rewriteAsTerry(item.title, rawForRewrite),
    fetchUnsplashImage(item.category),
  ]);

  const finalTitle = (rewritten?.title ?? item.title).slice(0, 200);
  const finalSummary = rewritten?.body ?? rewritten?.teaser ?? item.summary;
  const slug = item.slug ?? makeNewsSlug(finalTitle, item.id);

  await prisma.newsItem.update({
    where: { id },
    data: {
      title: finalTitle,
      summary: finalSummary,
      slug,
      imageUrl: image?.url ?? item.imageUrl ?? null,
      imageCredit: image?.credit ?? item.imageCredit ?? null,
      status: "published",
      publishedAt: new Date(),
    },
  });

  return NextResponse.json({ ok: true, status: "published", slug });
}
