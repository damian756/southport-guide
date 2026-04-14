import pg from 'pg';
const c = new pg.Client({ connectionString: process.env.DATABASE_URL });
await c.connect();
const r = await c.query(`SELECT slug, name, "listingTier", claimed, featured, "hubTier" FROM "Business" WHERE slug IN ('waca-recreation-centre','woodvale-community-centre')`);
console.log(r.rows);
await c.end();
