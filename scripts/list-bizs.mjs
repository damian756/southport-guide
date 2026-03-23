import pg from 'pg';
const { Client } = pg;
if (!process.env.DATABASE_URL) { console.error('DATABASE_URL not set'); process.exit(1); }
const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
const { rows } = await client.query(`
  SELECT b.slug, b.name, c.slug as cat
  FROM "Business" b
  JOIN "Category" c ON c.id = b."categoryId"
  ORDER BY c.slug, b.name
`);
rows.forEach(r => console.log(r.cat.padEnd(20) + r.slug + '  |  ' + r.name));
console.log('\nTotal:', rows.length);
await client.end();
