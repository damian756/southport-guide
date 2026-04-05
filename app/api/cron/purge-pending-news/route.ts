import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// One-time cleanup: deletes all pending_review items so they can be re-scraped with new Terry prompt.
// Delete this file after use.
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const del = await prisma.newsItem.deleteMany({
    where: { status: "pending_review" },
  });

  return NextResponse.json({ ok: true, deleted: del.count });
}
