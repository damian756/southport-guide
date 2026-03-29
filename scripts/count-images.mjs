import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const rows = await prisma.$queryRaw`
  SELECT 
    COUNT(*) FILTER (WHERE images[1] LIKE '%googleusercontent%') AS google_cdn,
    COUNT(*) FILTER (WHERE images[1] LIKE '%maps.googleapis%') AS google_maps,
    COUNT(*) FILTER (WHERE images[1] LIKE '/images/%') AS local,
    COUNT(*) FILTER (WHERE images IS NULL OR images = '{}') AS no_image,
    COUNT(*) AS total
  FROM "Business"
  WHERE "categoryId" IS NOT NULL
`;
console.log("\nImage URL breakdown across all listings:");
const r = rows[0];
console.log(`  Google CDN (expiring):  ${r.google_cdn}`);
console.log(`  Google Maps API:        ${r.google_maps}`);
console.log(`  Already local:          ${r.local}`);
console.log(`  No image:               ${r.no_image}`);
console.log(`  Total businesses:       ${r.total}`);
console.log(`\nNeed downloading: ${Number(r.google_cdn) + Number(r.google_maps)}`);
await prisma.$disconnect();
