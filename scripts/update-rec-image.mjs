import pg from 'pg';
const c = new pg.Client({ connectionString: process.env.DATABASE_URL });
await c.connect();
await c.query(`
  UPDATE "Business"
  SET images = ARRAY['/images/businesses/waca-recreation-centre.webp'], "updatedAt" = NOW()
  WHERE slug = 'waca-recreation-centre'
`);
console.log('Updated waca-recreation-centre image');
await c.end();
