import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Deletes every NewsItem regardless of status. Admin only. Irreversible.
export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await prisma.newsItem.deleteMany({});
  return NextResponse.json({ ok: true, deleted: result.count });
}
