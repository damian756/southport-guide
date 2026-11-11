// Follow-up to fix-listing-facts-2026-11.ts (11 Nov 2026): the pier listing's visible text names no
// organisation (standing rule, playbook section 1a). Sources stay in the report: the council's pier page
// (update January 2026) and its news item of 20 March 2026.
// Dry run by default; --apply writes only if the fields still hold the expected text, then reads back.
//   npx tsx --env-file-if-exists=.env --env-file-if-exists=.env.local scripts/fix-pier-text-2026-11-11b.ts [--apply]
import { prisma } from "../lib/prisma";

const APPLY = process.argv.includes("--apply");
const SLUG = "southport-pier";
const CHANGE = {
  shortDescription: {
    before: "The UK's second longest pier, closed since December 2022 on health and safety grounds (Sefton Council, March 2026).",
    after: "The UK's second longest pier, closed since December 2022 on health and safety grounds.",
  },
  description: {
    before:
      "Southport Pier stretches more than 3,600ft out over the sands and is the second longest pier in the UK. It has been closed since December 2022 on health and safety grounds. In March 2026 Sefton Council said its business case to the Government's Growth Mission Fund had been approved, unlocking £20 million to repair, restore and reopen the pier. The pier stays closed throughout the works (Sefton Council, January and March 2026).",
    after:
      "Southport Pier stretches more than 3,600ft over the sands and is the second longest pier in the UK. It has been closed since December 2022 on health and safety grounds. A £20 million funding case to repair, restore and reopen it was approved in March 2026, and the pier stays closed until those works are finished.",
  },
} as const;

async function main() {
  const row = await prisma.business.findUnique({ where: { slug: SLUG }, select: { id: true, shortDescription: true, description: true } });
  if (!row) throw new Error("pier row not found");
  const data: Record<string, string> = {};
  for (const [f, v] of Object.entries(CHANGE)) {
    const cur = (row as any)[f];
    if (cur !== v.before) { console.log(`REFUSE ${f}: not the expected text`); return; }
    if (/—|Sefton/.test(v.after)) throw new Error(`bad text in ${f}`);
    data[f] = v.after;
    console.log(`${f}\n  before: ${v.before}\n  after:  ${v.after}`);
  }
  if (!APPLY) { console.log("DRY RUN: nothing written."); return; }
  await prisma.business.update({ where: { id: row.id }, data });
  const back = await prisma.business.findUnique({ where: { id: row.id }, select: { shortDescription: true, description: true } });
  console.log(`READ BACK ${back?.shortDescription === data.shortDescription && back?.description === data.description ? "matches" : "DOES NOT MATCH"}`);
}

main()
  .catch((e) => { console.error("ERR", e instanceof Error ? e.message : String(e)); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
