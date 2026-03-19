#!/usr/bin/env tsx
/**
 * Push editorial content, FAQs, and metadata for all 10 published sectors.
 * Content written in Terry's voice — specific, practical, honest.
 * Run: npx tsx scripts/property/push-sector-content.ts
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL || "";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

type FaqItem = { question: string; answer: string };

interface SectorContent {
  sector: string;
  editorialContent: string;
  metaTitle: string;
  metaDescription: string;
  faqJson: FaqItem[];
}

const SECTOR_CONTENT: SectorContent[] = [
  {
    sector: "PR8 1",
    metaTitle: "House Prices in PR8 1 — Southport Town Centre Area Guide",
    metaDescription:
      "Average house prices, school data, crime figures and an honest area guide for PR8 1 — Southport's town centre postcode covering Lord Street, Chapel Street and the lower promenade.",
    editorialContent:
      "PR8 1 puts you at the heart of Southport. Lord Street runs through the middle — the Victorian boulevard with the glass canopies and the independent shops. It's genuinely impressive as a daily backdrop. The practical side is what it is: a town centre postcode means noise, limited parking, and mostly flats and Victorian conversions rather than detached houses. The beach is a ten-minute walk. Southport Market is on your doorstep. The Atkinson gallery and theatre are around the corner. If you want central convenience and character, PR8 1 delivers on both counts. If you want quiet streets, a garden, and somewhere to park outside your house, you're looking at the wrong postcode.",
    faqJson: [
      {
        question: "What is PR8 1 in Southport?",
        answer:
          "PR8 1 is Southport's central town centre postcode, covering Lord Street, Chapel Street, Bold Street and the surrounding residential streets. It's the commercial and cultural heart of the town.",
      },
      {
        question: "What type of housing is in PR8 1 Southport?",
        answer:
          "Mostly flats, apartment conversions, and Victorian terraces. Detached family houses with gardens are uncommon in this postcode. It suits buyers who want central living over space.",
      },
      {
        question: "Is PR8 1 good for families?",
        answer:
          "It depends what you want. Schools are accessible, but the housing stock is weighted toward flats and conversions. Families with young children often prefer PR8 3 (Ainsdale), PR8 4 (Birkdale), or PR9 9 (Churchtown) for more garden space.",
      },
      {
        question: "How safe is PR8 1 Southport?",
        answer:
          "As a town centre postcode, crime figures are higher than the residential outer areas — anti-social behaviour and theft are the most common categories. The crime data section above reflects the last 12 months from police.uk.",
      },
      {
        question: "Is there parking in PR8 1?",
        answer:
          "Town centre parking is available at several car parks including Tulketh Street and Cambridge Way, but it's not free. Residents' parking zones cover some residential streets — worth checking for any specific property before buying.",
      },
      {
        question: "How far is PR8 1 from Southport beach?",
        answer:
          "The seafront and Pier is roughly a 10–15 minute walk from the central PR8 1 streets, depending on which end of the postcode you're starting from.",
      },
    ],
  },

  {
    sector: "PR8 2",
    metaTitle: "House Prices in PR8 2 — Woodvale & Ainsdale-on-Sea Area Guide",
    metaDescription:
      "House prices, schools, crime data and an honest area guide for PR8 2 — Southport's coastal strip covering Woodvale and Ainsdale-on-Sea near the National Trust sand dunes.",
    editorialContent:
      "PR8 2 covers the coastal strip between Ainsdale and Birkdale — Woodvale and Ainsdale-on-Sea are the main settlements. Most people in Southport drive past it on Coastal Road without thinking of it as a distinct neighbourhood, but it's a genuinely strong place to live. The National Trust sand dunes and beach access are on the doorstep — dogs, kids, and evening walks at the coast are easy here in a way they aren't further inland. Housing is predominantly detached and semi-detached with larger plots than the town centre postcodes. Ainsdale station is about a mile inland. There's no village centre within PR8 2 itself — you're using Ainsdale village (PR8 3) or Birkdale village (PR8 4) for day-to-day shopping.",
    faqJson: [
      {
        question: "What does PR8 2 cover in Southport?",
        answer:
          "PR8 2 covers Woodvale, Ainsdale-on-Sea and the coastal strip between Ainsdale and Birkdale. The National Trust sand dunes and beach access fall within this postcode sector.",
      },
      {
        question: "What are house prices like in PR8 2?",
        answer:
          "Houses tend to be detached and semi-detached with larger plots than you'd find in the town centre postcodes. Prices reflect the coastal location and proximity to the National Trust beach. Check the current data above for 3-year averages.",
      },
      {
        question: "Is PR8 2 at risk of flooding?",
        answer:
          "The coastal proximity means flood risk varies by street. Inland streets carry low risk; those closest to the dunes and beach can carry medium risk. Check the flood risk badge above for the specific postcode you're considering.",
      },
      {
        question: "What's the nearest train station to PR8 2?",
        answer:
          "Ainsdale station is approximately one mile inland from the coastal streets. Merseyrail services run to Southport (around 10 minutes) and Liverpool Central (around 50 minutes).",
      },
      {
        question: "Are there good schools near PR8 2?",
        answer:
          "Several primary and secondary schools serve the area from both the Ainsdale and Birkdale sides. See the schools section above for current Ofsted ratings and walking distances.",
      },
      {
        question: "Is there a shop or village centre in PR8 2?",
        answer:
          "No distinct village centre within PR8 2 itself. Most residents use Ainsdale village (PR8 3) or Birkdale village (PR8 4) for day-to-day shopping. Both are a short drive.",
      },
    ],
  },

  {
    sector: "PR8 3",
    metaTitle: "House Prices in PR8 3 — Ainsdale Village Southport Area Guide",
    metaDescription:
      "House prices, schools, crime data and an area guide for PR8 3 — Ainsdale village, Southport. Direct train links to Liverpool, village character, National Trust dunes nearby.",
    editorialContent:
      "PR8 3 is Ainsdale village — centred around Station Road and the railway line. It works more like a village than a suburb: there's a parade of shops, a couple of decent pubs, a post office, and a community that knows itself. Ainsdale station gives you direct trains to Southport in about 10 minutes and Liverpool in around 50 — a practical asset that makes this postcode genuinely workable for commuters. The housing is a reasonable mix: Victorian and Edwardian terraces near the station, larger semis and detached as you move toward the dunes. Kings Meadow Primary has a strong local reputation. If you want Southport's amenities with a quieter, more independent neighbourhood feel, PR8 3 is worth a serious look.",
    faqJson: [
      {
        question: "What is Ainsdale like to live in?",
        answer:
          "Ainsdale has its own distinct village identity, separate from central Southport. Station Road is the main hub with shops, pubs, and a post office. The National Trust dunes are a short walk away. It's quiet without being isolated.",
      },
      {
        question: "How far is Ainsdale from Southport town centre?",
        answer:
          "About 3 miles by road, or roughly 10 minutes by train from Ainsdale station to Southport.",
      },
      {
        question: "What train services run from Ainsdale station?",
        answer:
          "Merseyrail Northern Line services run frequently — around 10 minutes to Southport and 50 minutes to Liverpool Central. The station is within easy walking distance of the Station Road village area.",
      },
      {
        question: "What schools are in Ainsdale PR8 3?",
        answer:
          "Kings Meadow Primary School is within the sector and has a good local reputation. Several secondary schools, including Birkdale High School, serve the area. Full details and Ofsted ratings are in the schools section above.",
      },
      {
        question: "What are house prices like in Ainsdale?",
        answer:
          "A mix of Victorian terraces close to the station and larger semis and detached houses further out. Generally affordable relative to Birkdale, but with more character than the inner Southport postcodes.",
      },
      {
        question: "Is Ainsdale close to the beach?",
        answer:
          "Yes. The National Trust Ainsdale sand dunes and beach are within walking distance from the outer streets of PR8 3. It's one of the practical advantages of the postcode.",
      },
    ],
  },

  {
    sector: "PR8 4",
    metaTitle: "House Prices in PR8 4 — Birkdale, Southport Area Guide",
    metaDescription:
      "House prices, schools, crime data and an area guide for PR8 4 — Birkdale village, Southport. Home to Royal Birkdale Golf Club and some of the town's most sought-after residential streets.",
    editorialContent:
      "Birkdale is the most sought-after residential area in Southport and the prices make that clear. Birkdale Village on Liverpool Road is the anchor — independent shops, a deli, a handful of good restaurants, and a local character that doesn't feel manufactured. Royal Birkdale Golf Club sits at the southern end of the postcode, which brings prestige and, during The Open, a noticeable energy to the whole area. The housing is larger here: detached Edwardian and interwar semis on wide roads, occasional Victorian villas on the better streets. It's quiet, maintained, and genuinely pleasant without being precious about it. Families choosing between Southport postcodes often end up in PR8 4, and there's a practical reason: good schools, solid connections to town, and streets that actually work.",
    faqJson: [
      {
        question: "What is Birkdale village like?",
        answer:
          "Birkdale village has a proper independent high street on Liverpool Road — shops, restaurants, a deli, and a café. It functions as a distinct neighbourhood within Southport with its own local identity, separate from the town centre.",
      },
      {
        question: "Is Birkdale the most expensive part of Southport?",
        answer:
          "Consistently among the highest average prices in the area. Large detached properties on roads like Crosby Road and Rufford Road push the sector average above most other Southport postcodes.",
      },
      {
        question: "Is Royal Birkdale Golf Club in PR8 4?",
        answer:
          "Yes. Royal Birkdale is at the southern end of the PR8 4 sector. The club is hosting The Open Championship in July 2026, which will bring significant activity to the area.",
      },
      {
        question: "What schools serve PR8 4 Birkdale?",
        answer:
          "Birkdale Primary School is within the sector. Several well-regarded primaries and secondaries, including Birkdale High School, are accessible. See the schools section above for current Ofsted ratings.",
      },
      {
        question: "How far is Birkdale from Southport town centre?",
        answer:
          "About 2 miles to Lord Street by road. Birkdale has its own local amenities so many residents don't need the town centre regularly. Birkdale station is also on the Merseyrail line.",
      },
      {
        question: "Is Birkdale good for families?",
        answer:
          "Yes — consistently popular with families. The combination of good schools, larger houses with gardens, and a safe, quiet neighbourhood feel makes it one of Southport's most family-friendly postcodes.",
      },
    ],
  },

  {
    sector: "PR8 5",
    metaTitle: "House Prices in PR8 5 — Scarisbrick & South Southport Area Guide",
    metaDescription:
      "House prices, schools, crime data and an area guide for PR8 5 — the southern edge of Southport extending into rural Scarisbrick. More space, lower prices, car dependent.",
    editorialContent:
      "PR8 5 is the odd one out in the PR8 district. It's part Southport suburb, part rural Lancashire — the sector extends south toward Scarisbrick through flat agricultural land. The town-facing residential streets offer decent housing at good value: you get more space per pound than the PR8 4 equivalent. But there's no train station within the sector, and in the Scarisbrick end, a car is not optional. Properties here attract buyers who want land, quiet, and value, and who understand the trade-off. Schools serving the area come from both the Birkdale side and, for families further south, Scarisbrick. It's not for everyone, but if space and value are priorities over walkability, PR8 5 is worth considering.",
    faqJson: [
      {
        question: "What does PR8 5 cover?",
        answer:
          "PR8 5 covers the southern part of Southport and extends into Scarisbrick — a mix of suburban residential streets and rural Lancashire countryside.",
      },
      {
        question: "Is PR8 5 car-dependent?",
        answer:
          "Yes. There's no train station within the sector. For the Scarisbrick end particularly, a car is essential for most day-to-day activities including schools, shopping, and work.",
      },
      {
        question: "Why are house prices lower in PR8 5?",
        answer:
          "Prices reflect the distance from town, the lack of rail links, and the rural character of parts of the sector. You typically get significantly more space for the money compared to PR8 4 or PR9 9.",
      },
      {
        question: "What schools serve PR8 5?",
        answer:
          "Schools from the Birkdale side, including Birkdale Primary, serve the northern parts of PR8 5. The Scarisbrick area has its own primary school. Secondary-age pupils typically travel to Birkdale High or similar.",
      },
      {
        question: "Is PR8 5 in Southport or Scarisbrick?",
        answer:
          "Both. The northern part of PR8 5 is suburban Southport; the southern part extends into Scarisbrick, which is a separate Lancashire village with its own identity.",
      },
    ],
  },

  {
    sector: "PR8 6",
    metaTitle: "House Prices in PR8 6 — Blowick, Southport Area Guide",
    metaDescription:
      "House prices, schools, crime data and an honest area guide for PR8 6 — Blowick, east Southport. Affordable residential area, good road connections, home to Southport FC's Haig Avenue.",
    editorialContent:
      "Blowick sits on the eastern side of Southport — not the part visitors see, but the part where a lot of people actually live. It's honest about what it is: a working-class residential area with affordable housing, decent bus connections, and no particular pretensions. Haig Avenue stadium is here — home to Southport FC. The A565 cuts through the sector, giving solid road connections to the town centre. Housing is mainly terraced streets and semis, with some more recent estate development. Blowick gets overlooked by buyers who've fixated on Birkdale or Churchtown, until they work out they can get a three-bedroom semi here for significantly less money with similar access to the town centre and schools. Worth knowing about if budget matters — which it does for most people.",
    faqJson: [
      {
        question: "What is Blowick like in Southport?",
        answer:
          "Blowick is a residential area on the eastern side of Southport. Predominantly terraced streets and semi-detached housing. It's affordable, well-connected by road, and home to Haig Avenue — Southport FC's ground.",
      },
      {
        question: "Is Blowick a good area to live in?",
        answer:
          "It's a practical, affordable residential area. Not the most characterful part of Southport, but well-connected, with decent schools nearby and good access to the town centre. Good value for the money.",
      },
      {
        question: "What are house prices like in Blowick?",
        answer:
          "Among the lower averages in the PR8 district. Three-bedroom semis are available significantly cheaper here than in Birkdale or Churchtown. That's the main draw — value and space.",
      },
      {
        question: "How far is Blowick from Southport town centre?",
        answer:
          "About 2 miles by road. The A565 provides direct access and local bus routes serve the area well. It's not walking distance but it's an easy commute.",
      },
      {
        question: "What schools are near PR8 6 Blowick?",
        answer:
          "Several primary schools serve the Blowick area. Meols Cop High School is the main secondary for this part of Southport. Full details and Ofsted ratings are in the schools section above.",
      },
    ],
  },

  {
    sector: "PR9 0",
    metaTitle: "House Prices in PR9 0 — Southport Town Centre & Promenade Area Guide",
    metaDescription:
      "House prices, schools, crime data and an area guide for PR9 0 — Southport's seafront and promenade postcode covering Marine Drive, the Pier, and the northern end of Lord Street.",
    editorialContent:
      "PR9 0 covers the seafront and the northern end of Lord Street — it's the Southport most visitors experience first. Marine Drive, the Pier (the second-longest in England at over 1,100 metres), the funfair, the boating lake, and the miniature railway all sit in this postcode. Living here means proximity to all of it, which sounds better than it sometimes feels day-to-day: summer brings noise, visitor traffic, and parking pressure on the residential streets. The housing is genuinely mixed — large Victorian properties, converted hotels, purpose-built seafront apartments, and quieter residential streets set back from the promenade. Southport College is also in this postcode. It's the most visitor-facing PR9 sector and the prices reflect location over tranquillity.",
    faqJson: [
      {
        question: "What does PR9 0 cover in Southport?",
        answer:
          "PR9 0 covers Marine Drive, the Promenade, the Pier end of Lord Street, and surrounding residential streets in central Southport. The seafront attractions — funfair, boating lake, miniature railway — are all in this postcode.",
      },
      {
        question: "What is it like to live near Southport Promenade?",
        answer:
          "The seafront streets have a different feel to the inland residential postcodes. Impressive views and direct beach access, but summer visitor traffic, noise, and parking pressure are real factors worth weighing up.",
      },
      {
        question: "Is Southport Pier in PR9 0?",
        answer:
          "Yes. Southport Pier is the second-longest pier in England at over 1,100 metres, accessed from the Promenade in PR9 0. It's been a local landmark since 1860.",
      },
      {
        question: "What are house prices like in PR9 0?",
        answer:
          "A wide range due to the mixed housing stock — seafront apartments, converted Victorian properties, and quieter residential streets at varying price points. The sector average can be misleading; specific street data is more useful here.",
      },
      {
        question: "What schools serve PR9 0 Southport?",
        answer:
          "Several primary schools are within reach. Southport College (further education) is also in this postcode. Secondary schools include Meols Cop High School and Southport and Birkdale High School.",
      },
      {
        question: "Is PR9 0 noisy in summer?",
        answer:
          "Yes, noticeably so near the seafront. The funfair and visitor activity pick up significantly from May through September. Streets set back from Marine Drive are quieter, but it's a factor to consider if you're sensitive to noise.",
      },
    ],
  },

  {
    sector: "PR9 7",
    metaTitle: "House Prices in PR9 7 — High Park & Norwood, Southport Area Guide",
    metaDescription:
      "House prices, schools, crime data and an area guide for PR9 7 — High Park and Norwood, Southport. Affordable residential streets between the town centre and Churchtown, good school catchments.",
    editorialContent:
      "PR9 7 covers the residential belt between Southport town centre and Churchtown — High Park and Norwood are the main areas. Botanic Road gives the sector its main commercial spine, and the Botanic Gardens on the Churchtown boundary are close enough to be genuinely useful. It's a solidly residential area: mostly interwar semis and bungalows, well-maintained streets, straightforward access to town. Pricing tends to be more accessible than Churchtown or Birkdale, which makes PR9 7 popular with first-time buyers and families who want proximity to the town centre without the premium. Meols Cop station sits at the northern edge of the sector. Several well-regarded primary schools serve the area.",
    faqJson: [
      {
        question: "What is the PR9 7 area of Southport?",
        answer:
          "PR9 7 covers High Park and the Norwood area — residential streets running between the town centre and Churchtown, with Botanic Road as the main local commercial street.",
      },
      {
        question: "Is PR9 7 near Churchtown?",
        answer:
          "Yes. PR9 7 borders PR9 9 (Churchtown) to the north. The Botanic Gardens are close to the sector boundary. It's a short drive or walk into Churchtown from the northern end of PR9 7.",
      },
      {
        question: "What are house prices like in High Park Southport?",
        answer:
          "Generally more affordable than Churchtown or Birkdale. A mix of interwar semis and bungalows. Good value for the location — close to town, close to Churchtown, without the premium attached to either.",
      },
      {
        question: "Is there a train station near PR9 7?",
        answer:
          "Meols Cop station is at the northern edge of the sector, with Merseyrail services to Southport and Liverpool Central.",
      },
      {
        question: "What schools are in PR9 7 Southport?",
        answer:
          "Several primary schools serve the High Park area. Meols Cop High School is the main secondary for this part of Southport. Full details with Ofsted ratings are in the schools section above.",
      },
      {
        question: "Is PR9 7 good for first-time buyers?",
        answer:
          "Yes — it's one of the better value postcodes in northern Southport, with reasonable access to the town centre, good school catchments, and housing stock that suits a range of budgets.",
      },
    ],
  },

  {
    sector: "PR9 8",
    metaTitle: "House Prices in PR9 8 — Banks & Crossens, Southport Area Guide",
    metaDescription:
      "House prices, schools, crime data and an area guide for PR9 8 — Crossens and Banks, the northernmost Southport postcode extending into rural Lancashire near RSPB Marshside Reserve.",
    editorialContent:
      "PR9 8 takes in Crossens — the northern edge of Southport — and then extends into Banks, a separate Lancashire village. The distinction matters. Crossens functions as suburban Southport with local shops and reasonable bus connections. Banks is genuinely rural: flat Lancashire farmland, quiet lanes, and a car-dependent lifestyle. If you're looking at PR9 8, be clear which end you want. Properties in both areas offer good value — more space per pound than the southern Southport postcodes. The RSPB Marshside Reserve is close to the sector boundary: pink-footed geese in winter, wading birds most of the year. If you're into wildlife, this end of Southport has something the others simply don't.",
    faqJson: [
      {
        question: "What does PR9 8 cover?",
        answer:
          "PR9 8 covers Crossens (the northern edge of Southport) and Banks — a separate Lancashire village beyond the town boundary. Also includes Far Banks, Fiddler's Ferry, and Hundred End.",
      },
      {
        question: "Is Banks village in Southport?",
        answer:
          "Banks is in Lancashire, not Merseyside, though it falls within the Southport postal area. It's a separate rural village — not a suburb of Southport — with its own identity.",
      },
      {
        question: "How car-dependent is PR9 8?",
        answer:
          "Crossens has some bus connections to Southport. Banks is car-dependent for essentially all practical purposes — shops, schools, work. Factor this in carefully before buying.",
      },
      {
        question: "Is the RSPB Marshside Reserve accessible from PR9 8?",
        answer:
          "Marshside Reserve is just outside the sector boundary, very close to Crossens. One of the better winter birding sites in the North West, particularly for pink-footed geese. Accessed from Marshside Road.",
      },
      {
        question: "What are house prices like in Crossens and Banks?",
        answer:
          "Generally among the lower averages in the Southport area, reflecting the rural location and car dependency. Good value for buyers who want space and understand the trade-offs.",
      },
      {
        question: "What schools serve PR9 8?",
        answer:
          "Crossens is served by schools on the northern Southport fringe. Banks village has its own primary school. Secondary pupils typically travel to Meols Cop High School or similar.",
      },
    ],
  },

  {
    sector: "PR9 9",
    metaTitle: "House Prices in PR9 9 — Churchtown & Marshside, Southport Area Guide",
    metaDescription:
      "House prices, schools, crime data and an area guide for PR9 9 — Churchtown and Marshside. Southport's historic village, the Botanic Gardens, and RSPB Marshside Reserve on the doorstep.",
    editorialContent:
      "PR9 9 is the historic core of old Southport. Churchtown predates the Victorian resort entirely — St Cuthbert's Church dates to medieval times, the Botanic Gardens run along the southern edge of the sector, and the local pubs, particularly The Hesketh Arms, are genuine community institutions. Marshside Road heads north toward the RSPB reserve, where pink-footed geese winter and wading birds are around most of the year. The housing is a real mix: Victorian terraces in the village core, large detached houses on the better roads, bungalows toward Marshside. It's consistently popular with families who want character and a real community rather than just a postcode. Churchtown Primary has a strong local reputation. Meols Cop station is accessible from the southern end of the sector.",
    faqJson: [
      {
        question: "What is Churchtown in Southport?",
        answer:
          "Churchtown is the historic village at the northern end of Southport, predating the Victorian seaside resort. It's centred on St Cuthbert's Church, the Botanic Gardens, and a cluster of independent pubs and shops. It's where Southport began.",
      },
      {
        question: "Is Churchtown a good place to live in Southport?",
        answer:
          "Consistently popular — and the prices reflect it. The village character, green spaces, and sense of community make it one of the most sought-after residential areas in the town. It attracts families and downsizers in roughly equal measure.",
      },
      {
        question: "What is Marshside like in Southport?",
        answer:
          "Marshside is the area north of Churchtown along Marshside Road. Quieter, more spread out, with bungalows and houses on larger plots. The RSPB Marshside Reserve is effectively on the doorstep — one of the better wildlife spots in the North West.",
      },
      {
        question: "What schools are in Churchtown Southport?",
        answer:
          "Churchtown Primary School has a strong local reputation. Several other primary schools serve the wider PR9 9 area. Meols Cop High School is the main secondary, accessible from the southern part of the sector.",
      },
      {
        question: "Is there a train station near Churchtown?",
        answer:
          "Meols Cop station is the nearest, accessible from the southern part of PR9 9. From there it's around 5 minutes to Southport and 45 minutes to Liverpool Central on Merseyrail.",
      },
      {
        question: "What is the RSPB Marshside Reserve?",
        answer:
          "Marshside Reserve is an RSPB-managed wetland at the northern end of Southport, accessed from Marshside Road. One of the better winter birding sites in the North West — pink-footed geese, teal, and wading birds are regulars.",
      },
      {
        question: "How does Churchtown compare to Birkdale for house prices?",
        answer:
          "Both are among Southport's most expensive postcodes. Churchtown tends to attract buyers who want village character and community; Birkdale attracts those who want the village high street and proximity to the golf club. Prices are broadly comparable at the top end.",
      },
    ],
  },
];

async function main() {
  let updated = 0;
  let notFound = 0;

  for (const content of SECTOR_CONTENT) {
    const existing = await prisma.postcodeSector.findFirst({
      where: { sector: content.sector },
    });

    if (!existing) {
      console.warn(`⚠  Sector ${content.sector} not found in DB — skipping`);
      notFound++;
      continue;
    }

    await prisma.postcodeSector.update({
      where: { id: existing.id },
      data: {
        editorialContent: content.editorialContent,
        metaTitle: content.metaTitle,
        metaDescription: content.metaDescription,
        faqJson: content.faqJson,
      },
    });

    console.log(`✓ ${content.sector} — content pushed`);
    updated++;
  }

  console.log(`\nDone. ${updated} sectors updated, ${notFound} not found.`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
