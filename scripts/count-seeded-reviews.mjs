import pg from 'pg';
const c = new pg.Client({ connectionString: process.env.DATABASE_URL });
await c.connect();
const r = await c.query(`
  SELECT b.name, COUNT(*) as count
  FROM "Review" rv
  JOIN "Business" b ON b.id = rv."businessId"
  WHERE rv."ipAddress" = '0.0.0.0' AND rv.status = 'approved'
  GROUP BY b.name ORDER BY count DESC
`);
console.table(r.rows);
const total = await c.query(`SELECT COUNT(*) FROM "Review" WHERE "ipAddress" = '0.0.0.0' AND status = 'approved'`);
console.log('Total seeded reviews:', total.rows[0].count);
await c.end();
