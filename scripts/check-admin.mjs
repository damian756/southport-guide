import pg from 'pg';
const { Client } = pg;
const client = new Client({ connectionString: '***REDACTED_DATABASE_URL***' });
await client.connect();
const r = await client.query('SELECT email, role FROM "User" WHERE email IN ($1, $2)', ['damian@churchtownmedia.co.uk', 'demo@southportguide.co.uk']);
console.log(r.rows);
await client.end();
