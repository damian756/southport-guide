import { prisma } from "@/lib/prisma";

export async function getUpcomingEvents(days: number) {
  const from = new Date();
  const to = new Date(Date.now() + days * 86400000);
  return prisma.event.findMany({
    where: { dateStart: { gte: from, lte: to } },
    orderBy: { dateStart: "asc" },
  });
}

export function getEventImpactEstimate(
  eventName: string,
  categorySlug: string
): string | null {
  const name = eventName.toLowerCase();
  const cat = categorySlug;
  if (name.includes("open") || name.includes("birkdale")) {
    if (cat === "hotels") return "+60% views during tournament week";
    if (cat === "restaurants") return "+40% click volume";
    if (cat === "bars-nightlife") return "+50% click volume";
  }
  if (name.includes("air show") || name.includes("airshow")) {
    if (cat === "restaurants") return "+35% click volume on the main day";
    if (cat === "cafes") return "+25% click volume";
    if (cat === "attractions") return "+40% click volume";
  }
  if (name.includes("flower show")) {
    if (cat === "restaurants") return "+30% click volume";
    if (cat === "cafes") return "+25% click volume";
    if (cat === "hotels") return "+20% views";
  }
  if (name.includes("christmas") || name.includes("market")) {
    if (cat === "restaurants") return "+20% click volume";
    if (cat === "shopping") return "+35% click volume";
  }
  return null;
}

export async function getBoostedCountInCategory(
  categoryId: string,
  businessId: string,
  eventStart: Date,
  eventEnd: Date
): Promise<number> {
  const boosts = await prisma.listingBoost.findMany({
    where: {
      categoryId,
      businessId: { not: businessId },
      status: "active",
      startsAt: { lte: eventEnd },
      endsAt: { gte: eventStart },
    },
    select: { businessId: true },
    distinct: ["businessId"],
  });
  return boosts.length;
}
