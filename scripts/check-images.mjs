import pg from 'pg';
const c = new pg.Client({ connectionString: process.env.DATABASE_URL });
await c.connect();
const r = await c.query(`SELECT slug, images FROM "Business" WHERE images IS NOT NULL AND array_length(images, 1) > 0 LIMIT 3`);
console.log(r.rows);
await c.end();
