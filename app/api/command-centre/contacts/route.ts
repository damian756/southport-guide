import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const EXCLUDED_CATEGORY_SLUGS = ["parking", "transport", "beaches-parks"];

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

  const businesses = await prisma.business.findMany({
    where: {
      claimed: false,
      email: { not: null },
      category: {
        slug: { notIn: EXCLUDED_CATEGORY_SLUGS },
      },
    },
    include: {
      category: { select: { slug: true, name: true } },
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      website: true,
      address: true,
      slug: true,
      category: true,
    },
    orderBy: { createdAt: "asc" },
  });

  const contacts = businesses.map((b) => ({
    id: b.id,
    businessName: b.name,
    email: b.email!,
    phone: b.phone ?? null,
    website: b.website ?? null,
    address: b.address ?? null,
    category: b.category.slug,
    categoryName: b.category.name,
    listingUrl: `https://www.southportguide.co.uk/business/${b.slug}`,
    listingId: b.id,
  }));

  return NextResponse.json({
    site: "southportguide",
    total: contacts.length,
    contacts,
  });
}
