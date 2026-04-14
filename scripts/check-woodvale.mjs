import pg from 'pg';
const c = new pg.Client({ connectionString: process.env.DATABASE_URL });
await c.connect();
const r = await c.query(`
  SELECT b.slug, b.name, b.claimed, b.website, cat.slug as cat_slug, cat.name as cat_name
  FROM "Business" b
  JOIN "Category" cat ON b."categoryId" = cat.id
  WHERE b.slug IN ('waca-recreation-centre', 'woodvale-community-centre')
`);
console.log(r.rows);
// Also get activities category id
const acts = await c.query(`SELECT id, slug FROM "Category" WHERE slug = 'activities'`);
console.log('activities category:', acts.rows);
await c.end();
