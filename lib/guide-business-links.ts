/**
 * Shared utility for guide pages to resolve business names to their
 * listing slugs + category slugs from the database.
 *
 * Returns a map of { displayName -> { slug, category } }.
 * Names not found in the DB are simply absent from the map, and the
 * guide page falls back to rendering the name as plain text.
 *
 * Pass an optional `aliases` map of { displayName -> exactDbName } for cases
 * where the display name in the guide differs from the stored business name.
 */

import { prisma } from "@/lib/prisma";

export interface BusinessLinkData {
  slug: string;
  category: string;
}

/**
 * Known aliases: guide display name → exact name stored in the DB.
 * Centralised here so guide pages don't need to manage this themselves.
 */
const GLOBAL_ALIASES: Record<string, string> = {
  "The Swan": "The Swan Restaurant and Take Away",
  "The Bold Arms": "Bold Arms",
  "The Atkinson Café": "The Atkinson",
  "Volare Restaurant": "Volare",
  // Botanic Gardens — accent vs no accent in DB
  "Botanic Gardens Café": "Botanic Gardens Cafe",
  // V-Café is the restaurant within The Vincent Hotel on Lord Street
  "V-Café": "Vincent Café & Restaurant",
  "The Vincent Hotel Restaurant": "Vincent Café & Restaurant",
};

export async function getBusinessLinks(
  names: string[],
  extraAliases: Record<string, string> = {}
): Promise<Record<string, BusinessLinkData>> {
  if (names.length === 0) return {};

  const aliases = { ...GLOBAL_ALIASES, ...extraAliases };

  // Build the set of DB names to look up (some may be aliased)
  const dbNames = names.map((n) => aliases[n] ?? n);

  try {
    const businesses = await prisma.business.findMany({
      where: { name: { in: dbNames } },
      select: { name: true, slug: true, category: { select: { slug: true } } },
    });

    // Index by DB name
    const byDbName = Object.fromEntries(
      businesses.map((b) => [b.name, { slug: b.slug, category: b.category.slug }])
    );

    // Return keyed by the original display name used in the guide
    const result: Record<string, BusinessLinkData> = {};
    for (const displayName of names) {
      const dbName = aliases[displayName] ?? displayName;
      if (byDbName[dbName]) {
        result[displayName] = byDbName[dbName];
      }
    }
    return result;
  } catch {
    return {};
  }
}

/** Build the href for a business given its link data. */
export function bizHref(data: BusinessLinkData): string {
  return `/${data.category}/${data.slug}`;
}
