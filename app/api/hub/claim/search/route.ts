import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { rankByMatch, searchTokens } from "@/lib/claim-search";

const Schema = z.object({
  name: z.string().min(2).max(200).trim(),
});

const SELECT = {
  id: true,
  name: true,
  address: true,
  postcode: true,
  claimed: true,
  category: { select: { name: true } },
} as const;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    body = null;
  }
  const parsed = Schema.safeParse(body);
  const tokens = parsed.success ? searchTokens(parsed.data.name) : [];
  if (!parsed.success || tokens.length === 0) {
    return NextResponse.json(
      { error: "Please enter at least 2 characters." },
      { status: 400 }
    );
  }

  // Forgiving match (lib/claim-search.ts): every word, in any order, with
  // "and"/"&", "The", punctuation and apostrophes ignored. If no name has
  // every word, the names with the most of them.
  const word = (t: string) => ({ name: { contains: t, mode: "insensitive" as const } });
  let rows = await prisma.business.findMany({
    where: { AND: tokens.map(word) },
    select: SELECT,
    take: 50,
  });
  if (rows.length === 0 && tokens.length > 1) {
    rows = await prisma.business.findMany({
      where: { OR: tokens.map(word) },
      select: SELECT,
      take: 200,
    });
  }

  return NextResponse.json(
    rankByMatch(rows, tokens).slice(0, 8).map((b) => ({
      id: b.id,
      name: b.name,
      address: b.address,
      postcode: b.postcode,
      category: b.category.name,
      claimed: b.claimed,
    }))
  );
}
