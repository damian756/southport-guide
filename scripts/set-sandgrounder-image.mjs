import pg from 'pg';
const { Client } = pg;
const client = new Client({ connectionString: '***REDACTED_DATABASE_URL***' });
await client.connect();
const r = await client.query(
  `UPDATE "Business" SET images = $1, "updatedAt" = NOW() WHERE slug = 'the-sandgrounder' RETURNING id, name, images`,
  [['https://www.southportguide.co.uk/images/dashboard/sandgrounder-listing.jpg']]
);
console.log(r.rows);
await client.end();
