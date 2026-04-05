import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// One-time endpoint: deletes all pending_review items so they can be re-scraped with the new prompt.
// Remove this file after use.
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const confirm = request.headers.get("x-confirm");
  if (confirm !== "yes") {
    return NextResponse.json({ error: "Send header x-confirm: yes to proceed" }, { status: 400 });
  }

  const del = await prisma.newsItem.deleteMany({
    where: { status: "pending_review" },
  });

  return NextResponse.json({ ok: true, deleted: del.count });
}
