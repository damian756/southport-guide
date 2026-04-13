import pg from 'pg';
const c = new pg.Client({ connectionString: process.env.DATABASE_URL });
await c.connect();
const r = await c.query(`SELECT slug, name, "categoryId" FROM "Business" WHERE "categoryId" NOT IN ('219d8119-9bd9-4c01-b8a0-52787740fa17','2423b66a-41f6-4cbc-897e-d28f96698200','2b5d9d1a-bc37-4496-92ab-4c2df77e0a02','2472fc78-b30b-45ea-8391-35bc435ca738','672081d8-9650-4796-880d-e7d473053e1e') ORDER BY "categoryId", name LIMIT 300`);
const seen = new Set();
r.rows.forEach(row => {
  if (!seen.has(row.categoryId)) { console.log('\n=== ' + row.categoryId + ' ==='); seen.add(row.categoryId); }
  console.log('  ' + row.slug + '  |  ' + row.name);
});
await c.end();
