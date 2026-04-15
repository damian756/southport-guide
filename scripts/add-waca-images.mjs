import pg from 'pg';
const c = new pg.Client({ connectionString: process.env.DATABASE_URL });
await c.connect();

await c.query(`
  UPDATE "Business"
  SET images = ARRAY['/images/businesses/woodvale-community-centre.webp'], "updatedAt" = NOW()
  WHERE slug = 'woodvale-community-centre'
`);
console.log('  Image set for woodvale-community-centre');

await c.query(`
  UPDATE "Business"
  SET images = ARRAY['/images/businesses/waca-recreation-centre.webp'], "updatedAt" = NOW()
  WHERE slug = 'waca-recreation-centre'
`);
console.log('  Image set for waca-recreation-centre');

const r = await c.query(`SELECT slug, images FROM "Business" WHERE slug IN ('woodvale-community-centre','waca-recreation-centre')`);
console.log(r.rows);

await c.end();
