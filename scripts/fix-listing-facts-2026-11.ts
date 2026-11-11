// One-off factual corrections to listing rows, approved by the coordinating chat for Damian (11 Nov 2026).
// - southport-pier: description and shortDescription, from Sefton Council's pier page (January 2026)
//   and its news item of 20 March 2026.
// - Listings on PR8 1SQ (terminated February 2016, ONS data via postcodes.io): the postcode from the
//   business's own website where it gives a live one; otherwise empty. The same postcode is removed from
//   the address text, which the listing page prints as stored.
//
// Dry run (default): prints each change with its source; writes a backup of the rows; writes nothing to the database.
//   npx tsx --env-file-if-exists=.env --env-file-if-exists=.env.local scripts/fix-listing-facts-2026-11.ts <backup.json>
// Apply: changes a field only if it still holds the expected "before" value, then reads each row back.
//   ... scripts/fix-listing-facts-2026-11.ts <backup.json> --apply
import fs from "node:fs";
import { prisma } from "../lib/prisma";

const APPLY = process.argv.includes("--apply");
const backupPath = process.argv.slice(2).find((a) => !a.startsWith("--"));
if (!backupPath) throw new Error("Give a path for the backup JSON");

type Field = "description" | "shortDescription" | "postcode" | "address";
type Change = { slug: string; source: string; set: Partial<Record<Field, { before: string; after: string }>> };

const DEAD = "PR8 1SQ";
function pc(slug: string, address: string, after: string, source: string): Change {
  const addrAfter = after
    ? address.replace(DEAD, after)
    : address.replace(new RegExp(`\\s*${DEAD}(?=,|$)`), "");
  return { slug, source, set: { postcode: { before: DEAD, after }, address: { before: address, after: addrAfter } } };
}

const CHANGES: Change[] = [
  {
    slug: "southport-pier",
    source:
      "Sefton Council pier page, update January 2026 (https://www.sefton.gov.uk/southportpier): 'more than 3,600ft', 'second longest in the UK', 'remain closed throughout these works'. Sefton Council news, 20 March 2026: 'approval of its business case to the Government's Growth Mission Fund, unlocking £20 million to repair, restore and reopen Southport Pier'; 'closed since December 2022 on health and safety grounds'.",
    set: {
      shortDescription: {
        before: "Restored 19th-century iron walkway with a train ride & vintage penny-operated arcade machines.",
        after: "The UK's second longest pier, closed since December 2022 on health and safety grounds (Sefton Council, March 2026).",
      },
      description: {
        before: "__FROM_DB__",
        after:
          "Southport Pier stretches more than 3,600ft out over the sands and is the second longest pier in the UK. It has been closed since December 2022 on health and safety grounds. In March 2026 Sefton Council said its business case to the Government's Growth Mission Fund had been approved, unlocking £20 million to repair, restore and reopen the pier. The pier stays closed throughout the works (Sefton Council, January and March 2026).",
      },
    },
  },
  pc("parking-southport-marine-drive-car-park", "Southport PR8 1SQ, UK", "", "No website. Postcode PR8 1SQ terminated Feb 2016; set empty as agreed, the map uses the stored coordinates."),
  pc("ocean-plaza-leisure-park", "Marine Dr, Southport PR8 1SQ, UK", "PR8 1RY", "Own site https://www.oceanplazaleisure.com/: 'Ocean Plaza Marine Drive Southport Merseyside PR8 1RY'."),
  pc("vue-cinema-southport", "Ocean Plaza, Southport PR8 1SQ, UK", "PR8 1RY", "Own site https://www.myvue.com/cinema/southport/whats-on: 'Getting Here Ocean Plaza Marine Drive Southport PR8 1RY'."),
  pc("parking-yourparkingspace-12", "Ocean Plaza, Southport PR8 1SQ, UK", "", "No website on the listing; set empty."),
  pc("secret-escape-spa", "Secret Escape Spa inside DW Fitness, Ocean Plaza, Marine Dr, Southport PR8 1SQ, UK", "", "No website on the listing and none found; set empty."),
  pc("the-pet-hut", "Marine Parade, Southport PR8 1SQ, UK", "", "Listing website (poundstretcher.co.uk/the-pet-hut) redirects to Poundstretcher's home page and gives no store address; set empty."),
  pc("coastline-crossfit", "Unit D, Ocean Plaza, Marine Dr, Southport PR8 1SQ, UK", "", "Own site https://coastline-crossfit.com/ prints the terminated PR8 1SQ; no live postcode on it, so set empty."),
  pc("m-ocean-plaza", "M Park, Ocean Plaza, Marine Dr, Southport PR8 1SQ, UK", "", "Owner's page https://www.lcpgroup.co.uk/estates/m-park-ocean-plaza prints the terminated PR8 1SQ; no live postcode on it, so set empty."),
];

async function main() {
  console.log(APPLY ? "APPLY\n" : "DRY RUN: nothing will be written to the database.\n");
  const slugs = CHANGES.map((c) => c.slug);
  const rows = await prisma.business.findMany({
    where: { slug: { in: slugs } },
    select: { id: true, slug: true, name: true, address: true, postcode: true, shortDescription: true, description: true, updatedAt: true },
  });
  fs.writeFileSync(backupPath!, JSON.stringify(rows, null, 1), "utf8");
  console.log(`Backup of ${rows.length} rows written to ${backupPath}\n`);
  const bySlug = new Map(rows.map((r) => [r.slug, r]));
  for (const c of CHANGES) {
    const row = bySlug.get(c.slug);
    if (!row) { console.log(`REFUSE: ${c.slug} not found\n`); continue; }
    const data: Record<string, string> = {};
    let ok = true;
    for (const [f, v] of Object.entries(c.set) as [Field, { before: string; after: string }][]) {
      const current = (row as any)[f] ?? "";
      const before = v.before === "__FROM_DB__" ? current : v.before;
      if (current !== before) { console.log(`REFUSE: ${c.slug}.${f} no longer holds the expected value`); ok = false; continue; }
      if (/—/.test(v.after)) throw new Error(`Em dash in ${c.slug}.${f}`);
      data[f] = v.after;
      console.log(`${c.slug} (${row.name}) ${f}\n  before: ${before}\n  after:  ${v.after}`);
    }
    console.log(`  source: ${c.source}\n`);
    if (!ok || !APPLY) continue;
    await prisma.business.update({ where: { id: row.id }, data });
    const back = await prisma.business.findUnique({ where: { id: row.id }, select: { slug: true, address: true, postcode: true, shortDescription: true, description: true } });
    const match = Object.entries(data).every(([f, v]) => (back as any)[f] === v);
    console.log(`  READ BACK ${match ? "matches" : "DOES NOT MATCH"}\n`);
  }
}

main()
  .catch((e) => { console.error("ERR", e instanceof Error ? e.message : String(e)); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
