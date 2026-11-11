// Applies an approved edit plan to listing rows (website, shortDescription, description).
// The plan is JSON: [{ slug, name, why, fields: { <field>: { before, after } } }], built from the exact stored text.
// Dry run by default: writes a backup of every row in the plan and prints what would change.
// With --apply: changes a field only if it still holds the plan's "before" value, then reads each row back.
//   npx tsx --env-file-if-exists=.env --env-file-if-exists=.env.local scripts/apply-listing-text-plan.ts <plan.json> <backup.json> [--apply]
// Used on 11 Nov 2026 for the standing rule on the six organisations (playbook section 1a): council and
// VisitSouthport websites cleared, and sentences naming, praising, criticising or pointing to them removed.
import fs from "node:fs";
import { prisma } from "../lib/prisma";

type Plan = { slug: string; name: string; why: string; fields: Record<string, { before: string | null; after: string | null }> }[];
const [planPath, backupPath] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const APPLY = process.argv.includes("--apply");
const ALLOWED = new Set(["website", "shortDescription", "description"]);

async function main() {
  const plan: Plan = JSON.parse(fs.readFileSync(planPath, "utf8"));
  const rows = await prisma.business.findMany({
    where: { slug: { in: plan.map((p) => p.slug) } },
    select: { id: true, slug: true, name: true, website: true, shortDescription: true, description: true, updatedAt: true },
  });
  fs.writeFileSync(backupPath, JSON.stringify(rows, null, 1), "utf8");
  console.log(`${APPLY ? "APPLY" : "DRY RUN"}: ${plan.length} rows in the plan, ${rows.length} found; backup written to ${backupPath}`);
  let changed = 0, refused = 0;
  for (const p of plan) {
    const row: any = rows.find((r: any) => r.slug === p.slug);
    if (!row) { console.log(`REFUSE ${p.slug}: not found`); refused++; continue; }
    const data: Record<string, string | null> = {};
    let ok = true;
    for (const [f, v] of Object.entries(p.fields)) {
      if (!ALLOWED.has(f)) throw new Error(`field ${f} not allowed`);
      if ((row[f] ?? null) !== (v.before ?? null)) { console.log(`REFUSE ${p.slug}.${f}: text has changed since the plan was made`); ok = false; }
      data[f] = v.after;
    }
    if (!ok) { refused++; continue; }
    if (!APPLY) { console.log(`WOULD CHANGE ${p.slug}: ${Object.keys(data).join(", ")}`); continue; }
    await prisma.business.update({ where: { id: row.id }, data });
    const back: any = await prisma.business.findUnique({ where: { id: row.id }, select: { website: true, shortDescription: true, description: true } });
    const match = Object.entries(data).every(([f, v]) => (back[f] ?? null) === (v ?? null));
    console.log(`${match ? "CHANGED" : "MISMATCH"} ${p.slug}: ${Object.keys(data).join(", ")}`);
    if (match) changed++;
  }
  console.log(`done: ${changed} changed, ${refused} refused`);
}

main()
  .catch((e) => { console.error("ERR", e instanceof Error ? e.message : String(e)); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
