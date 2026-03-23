import pg from 'pg';
const c = new pg.Client({ connectionString: process.env.DATABASE_URL });
await c.connect();
const r = await c.query(`SELECT slug, name FROM "Business" WHERE name ILIKE '%hickory%' OR name ILIKE '%hesketh%' OR name ILIKE '%bold arms%' ORDER BY name`);
console.log(r.rows);
await c.end();
