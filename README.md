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

## Deploy (Vercel)

1. Push to GitHub, then in Vercel: **Add New → Project** → import `southport-guide`.
2. **Environment variables** (Production, and Preview if you use it):
   - `DATABASE_URL` – your Neon pooled connection string (required).
   - When you add auth: `NEXTAUTH_URL` = your live URL (e.g. `https://southport-guide.vercel.app`), `NEXTAUTH_SECRET` = a random secret.
   - When you add payments: Stripe keys and price IDs.
3. Deploy. Each push to `main` will trigger a production deployment.

## Day 2 (content)

### Scrape & Import Businesses

1. **Get a Google Places API key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Create a project, enable **Places API**, create an API key
   - Add `GOOGLE_PLACES_API_KEY=your_key_here` to `.env.local`

2. **Install Python dependencies:**
   ```bash
   pip install -r scripts/requirements.txt
   ```

3. **Run the scraper:**
   ```bash
   python scripts/scrape-businesses.py
   ```
   This will create `businesses.csv` with ~500 Southport businesses.

4. **Import to database:**
   ```bash
   npm run import-businesses
   ```
   Reads `businesses.csv` and inserts into `Business` table (with correct `categoryId`).

5. **Generate descriptions (optional):**
   - Use Claude API to batch-generate descriptions for businesses
   - Add `ANTHROPIC_API_KEY` to `.env.local` and create a script in `scripts/generate-descriptions.ts`

6. **Go live:**
   - Point domain at Vercel
   - Submit sitemap to Google Search Console
