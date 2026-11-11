// Adds free listings that businesses asked for through the site's forms.
// Facts come only from each business's own website (checked 11 Nov 2026); lat/lng from
// the postcode (postcodes.io, ONS postcode centroid).
//
// Dry run (default): prints each row in full and whether it would be added. Writes nothing.
//   npx tsx --env-file-if-exists=.env --env-file-if-exists=.env.local scripts/add-requested-listings.ts
// Apply (only on Damian's yes): inserts rows that do not exist yet, then reads them back.
//   npx tsx --env-file-if-exists=.env --env-file-if-exists=.env.local scripts/add-requested-listings.ts --apply
//
// Refuses to add a row whose slug exists, or whose name matches an existing listing, so it is
// safe to run twice.
import { prisma } from "../lib/prisma";

const APPLY = process.argv.includes("--apply");

type Row = {
  slug: string;
  name: string;
  categorySlug: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
  phone: string | null;
  website: string | null;
  shortDescription: string;
  description: string;
  openingHours: unknown;
  tags: string[];
  listingTier: "free";
  source: string; // where the facts came from; not stored
};

// Google Places shape, as the other listings use (day 0 = Sunday).
function hours(spec: Array<[number, string, string]>, text: string[]) {
  return {
    periods: spec.map(([day, open, close]) => ({ open: { day, time: open }, close: { day, time: close } })),
    weekdayText: text,
  };
}

const ROWS: Row[] = [
  {
    // Form of 9 Nov 2026 (Megan Whittle) asking for a listing under Attractions.
    slug: "southport-agricultural-show",
    name: "Southport Agricultural Show",
    categorySlug: "attractions",
    address: "Victoria Park, Southport",
    postcode: "PR8 1RX",
    lat: 53.645478,
    lng: -3.020878,
    phone: null,
    website: "https://southportagriculturalshow.co.uk",
    shortDescription:
      "New two-day agricultural show at Victoria Park, Southport, on 17 and 18 April 2027, with animals and agriculture, local producers and traders, food, shopping and family entertainment.",
    description:
      "Southport Agricultural Show is a new show at Victoria Park, Southport. The first show is on 17 and 18 April 2027. The organisers say it will bring together agriculture, animals, local producers, independent businesses, entertainment and family activities. The first event announced is Llamapalooza, a llama showing competition in three classes judged across the weekend. Tickets are sold through Ticket Quarter. Opening times, parking and access details are to be published on the show's website before the show, and businesses can apply there for a trade stand.",
    openingHours: null,
    tags: [],
    listingTier: "free",
    source:
      "https://southportagriculturalshow.co.uk/ (home, About Us, Tickets, What's On); Ticket Quarter event page and Victoria Park Events (venue and postcode PR8 1RX); postcodes.io PR8 1RX (lat/lng)",
  },
  {
    // Form of 20 Oct 2026 (Matthew Simpson) asking for a free directory listing.
    slug: "precision-auto-group-southport",
    name: "Precision Auto Group",
    categorySlug: "transport",
    address: "78A Upper Aughton Road, Southport",
    postcode: "PR8 5NJ",
    lat: 53.633528,
    lng: -3.005466,
    phone: "01704 330243",
    website: "https://www.precisionautos.co.uk",
    shortDescription:
      "Family-run used car dealer on Upper Aughton Road, Southport, with a second site on Jacksmere Lane, Scarisbrick. Finance, part exchange, servicing, warranty and delivery.",
    description:
      "Precision Auto Group sells used cars from two sites: 78A Upper Aughton Road, Southport (PR8 5NJ), and Jacksmere Lane, Scarisbrick, near Ormskirk (L40 9RT). Its website lists finance, part exchange and valuations, vehicle sourcing, servicing, warranty and delivery. Current stock and prices are on its website.",
    openingHours: hours(
      [
        [1, "0900", "1800"],
        [2, "0900", "1800"],
        [3, "0900", "1800"],
        [4, "0900", "1800"],
        [5, "0900", "1800"],
        [6, "0900", "1700"],
        [0, "1100", "1600"],
      ],
      [
        "Monday: 9:00 AM – 6:00 PM",
        "Tuesday: 9:00 AM – 6:00 PM",
        "Wednesday: 9:00 AM – 6:00 PM",
        "Thursday: 9:00 AM – 6:00 PM",
        "Friday: 9:00 AM – 6:00 PM",
        "Saturday: 9:00 AM – 5:00 PM",
        "Sunday: 11:00 AM – 4:00 PM",
      ],
    ),
    tags: [],
    listingTier: "free",
    source:
      "https://www.precisionautos.co.uk/ and /contact.php (addresses, phone, opening hours, services); postcodes.io PR8 5NJ (lat/lng)",
  },
];

async function main() {
  console.log(APPLY ? "APPLY: rows that do not exist will be inserted.\n" : "DRY RUN: nothing will be written.\n");
  const cats = await prisma.category.findMany({ select: { id: true, slug: true } });
  const catId = Object.fromEntries(cats.map((c) => [c.slug, c.id]));

  for (const row of ROWS) {
    const { categorySlug, source, ...data } = row;
    if (/—/.test(JSON.stringify(data))) throw new Error(`Em dash in ${row.slug}`);
    const categoryId = catId[categorySlug];
    if (!categoryId) {
      console.log(`REFUSE (no category "${categorySlug}"): ${row.name}`);
      continue;
    }
    const bySlug = await prisma.business.findUnique({ where: { slug: row.slug }, select: { slug: true } });
    const byName = await prisma.business.findFirst({
      where: { name: { contains: row.name, mode: "insensitive" } },
      select: { slug: true, name: true },
    });
    if (bySlug || byName) {
      console.log(`SKIP (exists as ${bySlug?.slug ?? byName?.slug}): ${row.name}`);
      continue;
    }

    console.log(`ROW (${categorySlug}), source: ${source}`);
    console.log(JSON.stringify({ ...data, categoryId }, null, 2));

    if (!APPLY) {
      console.log(`WOULD ADD: ${row.name} (${row.slug})\n`);
      continue;
    }
    const { openingHours, ...rest } = data;
    await prisma.business.create({
      data: { ...rest, categoryId, ...(openingHours ? { openingHours: openingHours as object } : {}) },
    });
    const back = await prisma.business.findUnique({
      where: { slug: row.slug },
      select: { slug: true, name: true, address: true, postcode: true, listingTier: true, hubTier: true, featured: true },
    });
    console.log(`ADDED, read back: ${JSON.stringify(back)}\n`);
  }
}

main()
  .catch((e) => {
    console.error("ERR", e instanceof Error ? e.message : String(e));
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
