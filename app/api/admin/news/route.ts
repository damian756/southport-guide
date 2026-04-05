import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

  if (action === "publish") {
    await prisma.newsItem.update({
      where: { id },
      data: {
        status: "published",
        publishedAt: new Date(),
      },
    });
    return NextResponse.json({ ok: true, status: "published" });
  }

  await prisma.newsItem.update({
    where: { id },
    data: { status: "rejected" },
  });
  return NextResponse.json({ ok: true, status: "rejected" });
}
