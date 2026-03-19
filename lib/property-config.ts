/**
 * Property pages configuration — area labels, sector mapping, etc.
 */

export const SECTOR_AREA_LABELS: Record<string, string> = {
  "PR8 1": "Town Centre",
  "PR8 2": "Woodvale & Ainsdale-on-Sea",
  "PR8 3": "Ainsdale",
  "PR8 4": "Birkdale",
  "PR8 5": "Scarisbrick & Rural South",
  "PR8 6": "Blowick",
  "PR9 0": "Town Centre & Promenade",
  "PR9 7": "High Park & Norwood",
  "PR9 8": "Banks & Crossens",
  "PR9 9": "Churchtown & Marshside",
};

export function getAreaLabelForSector(sector: string): string {
  const normalized = sector.replace(/\s+/g, " ").trim().toUpperCase();
  return SECTOR_AREA_LABELS[normalized] ?? sector;
}

export function sectorToSlug(sector: string): string {
  return sector.replace(/\s+/g, "-").toLowerCase();
}

export function postcodeToSlug(postcode: string): string {
  return postcode.replace(/\s+/g, "").toLowerCase();
}

export function slugToSector(slug: string): string {
  return slug.replace(/-/g, " ").toUpperCase();
}

export const PROPERTY_TYPE_LABELS: Record<string, string> = {
  D: "Detached",
  S: "Semi-Detached",
  T: "Terraced",
  F: "Flat",
  O: "Other",
};

export const OFSTED_LABELS: Record<number, string> = {
  1: "Outstanding",
  2: "Good",
  3: "Requires Improvement",
  4: "Inadequate",
};

export const FLOOD_ZONE_LABELS: Record<string, string> = {
  "1": "Low risk",
  "2": "Medium risk",
  "3": "High risk",
};
