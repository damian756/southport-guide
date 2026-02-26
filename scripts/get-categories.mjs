import pg from 'pg';
const { Client } = pg;
const client = new Client({ connectionString: '***REDACTED_DATABASE_URL***' });
await client.connect();
const r = await client.query('SELECT id, slug, name FROM "Category" ORDER BY name');
console.log(JSON.stringify(r.rows, null, 2));
await client.end();
