# SouthportGuide.co.uk

Visitor guide for Southport. See **SouthportGuide-Project-Plan.md** in the repo root for full strategy and build plan.

## Quick start

```bash
npm install
cp .env.local .env.local
# Set DATABASE_URL (Supabase/Neon Postgres) in .env.local
npx prisma db push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js 16 (App Router)
- Prisma 7 + PostgreSQL (@prisma/adapter-pg)
- Tailwind CSS
- Stripe (subscriptions – wire up in .env)
- NextAuth (auth – wire up when needed)

## Key routes

- `/` – Homepage
- `/[category]` – Category pages (e.g. /restaurants, /hotels)
- `/[category]/[slug]` – Business detail pages
- `/the-open-2026` – The Open 2026 hub
- `/mlec` – Marine Lake Events Centre hub
- `/pricing`, `/claim-listing`, `/advertise`, `/contact`, `/about`

## Database (Neon)

1. Create a free project at [neon.tech](https://neon.tech).
2. Copy the **connection string** from the dashboard (use the **pooled** one for serverless/Vercel).
3. Put it in `.env.local` as `DATABASE_URL`, e.g.  
   `DATABASE_URL="postgresql://user:password@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require"`
4. Run:
   ```bash
   npx prisma db push
   npm run db:seed
   ```

Neon’s free tier is enough for this project; use the pooler URL so Vercel/serverless works without connection limits.

## Day 2 (content)

- Scrape businesses (Google Places / script) → CSV.
- Import CSV into `Business` (with category IDs from seed).
- Generate descriptions (e.g. Claude API) and add blog posts.
- Point domain at Vercel and go live.
