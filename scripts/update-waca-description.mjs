import pg from 'pg';
const c = new pg.Client({ connectionString: process.env.DATABASE_URL });
await c.connect();

const desc = `Woodvale Community Centre on Meadow Lane is the headquarters of Woodvale & Ainsdale Community Association (WACA), a registered charity (No. 1146522) serving the Woodvale and Ainsdale communities of Southport.

Founded in 1992 and purpose-built in 1999, the centre runs a full programme of daytime and evening activities for all ages. Classes include Chair Based Exercise (booking essential), Craft Group (every Monday, 10:30am–12:30pm, booking required), Afternoon Lunch Club (1st Tuesday of the month, 12:30–1:30pm, free, booking required), Woodland Project (10am–12pm, free volunteering in local wooded area), Community Café (12–1:30pm, free, everyone welcome), and Course Sessions for adults 18+ (Origami, Painting, Japanese Arts & Crafts, Cookery, First Aid — subject to funding, see Facebook for current schedule). Youth sessions run Monday and Tuesday evenings, 5–7pm. School holiday programmes also available.

The building is DDA-compliant with disabled toilets and baby changing facilities. Small car park on site. Buses 44, 47, 49 and X2 serve the area. Next door to Kings Meadow Primary School.

Office hours: Monday to Thursday, 9am to 4pm. Tel: 01704 573084.`;

await c.query(`
  UPDATE "Business"
  SET description = $1, "updatedAt" = NOW()
  WHERE slug = 'woodvale-community-centre'
`, [desc]);

console.log('Description updated');
await c.end();
