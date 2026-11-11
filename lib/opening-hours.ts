// Opening hours as schema.org OpeningHoursSpecification, for the listing JSON-LD.
//
// Stored hours come from Google Places in two forms:
//   weekdayText: "Monday: 9:00 AM – 5:00 PM". Google puts a narrow no-break space
//     (U+202F) before AM/PM and thin spaces (U+2009) round the en dash, leaves the
//     AM/PM off an opening time that shares the closing time's ("5:00 – 9:00 PM"),
//     joins split days with a comma, and writes "Closed" and "Open 24 hours".
//   periods: [{ open: { day, time: "HHMM" }, close: { day, time: "HHMM" } }], day 0 is
//     Sunday. One period with no close, opening Sunday at 0000, means open all week.
//
// The listing page prints weekdayText when there is any, else periods, so the schema is
// built from the same one. A day or a time range that cannot be read is left out; no
// hours are guessed. No imports, so tests/opening-hours.test.mjs can load this file.

export type OpeningHoursSpec = {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string;
  opens: string;
  closes: string;
};

type Period = { open?: { day?: unknown; time?: unknown }; close?: { day?: unknown; time?: unknown } };

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// Monday first, the order the page shows.
const ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const pad = (n: number) => String(n).padStart(2, "0");

function spec(day: string, opens: string, closes: string): OpeningHoursSpec {
  return { "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${day}`, opens, closes };
}

type Clock = { h: number; m: number; ampm: "AM" | "PM" | null; hasMinutes: boolean };

function readClock(s: string): Clock | null {
  const m = s.trim().match(/^(\d{1,2})(?::(\d{2}))?(?:\s*([AaPp])\.?\s*[Mm]\.?)?$/);
  if (!m) return null;
  const ampm = m[3] ? (m[3].toUpperCase() === "A" ? "AM" : "PM") : null;
  return { h: Number(m[1]), m: m[2] ? Number(m[2]) : 0, ampm, hasMinutes: m[2] !== undefined };
}

/** Minutes after midnight, or null if the clock is not a real time. */
function minutes(c: Clock, ampm: "AM" | "PM" | null): number | null {
  if (c.m > 59) return null;
  if (ampm) {
    if (c.h < 1 || c.h > 12) return null;
    return ((c.h % 12) + (ampm === "PM" ? 12 : 0)) * 60 + c.m;
  }
  // No AM/PM on either time: only a 24-hour "HH:MM" is read.
  if (!c.hasMinutes || c.h > 23) return null;
  return c.h * 60 + c.m;
}

const hhmm = (mins: number) => `${pad(Math.floor(mins / 60))}:${pad(mins % 60)}`;

/** "9:00 AM – 5:00 PM" -> ["09:00", "17:00"], or null when it cannot be read. */
export function parseTimeRange(range: string): [string, string] | null {
  const parts = range.split(/\s*[\u2013-]\s*/);
  if (parts.length !== 2) return null;
  const open = readClock(parts[0]);
  const close = readClock(parts[1]);
  if (!open || !close) return null;
  if (open.ampm && !close.ampm) return null;
  // An opening time without AM/PM takes the closing time's. Google only drops it when
  // both are in the same half of the day, so the range cannot pass midnight.
  const inherited = !open.ampm && !!close.ampm;
  const o = minutes(open, open.ampm ?? close.ampm);
  const c = minutes(close, close.ampm);
  if (o === null || c === null) return null;
  if (inherited && o >= c) return null;
  if (o === c) return null;
  return [hhmm(o), hhmm(c)];
}

function fromWeekdayText(lines: unknown[]): OpeningHoursSpec[] {
  const out: OpeningHoursSpec[] = [];
  for (const raw of lines) {
    if (typeof raw !== "string") continue;
    const line = raw.replace(/[\u00a0\u2007\u2009\u200a\u202f]/g, " ").replace(/\s+/g, " ").trim();
    const colon = line.indexOf(":");
    if (colon < 1) continue;
    const day = line.slice(0, colon).trim();
    if (!DAYS.includes(day)) continue;
    const times = line.slice(colon + 1).trim();
    if (/^closed$/i.test(times)) continue;
    if (/^open 24 hours$/i.test(times)) {
      out.push(spec(day, "00:00", "23:59"));
      continue;
    }
    for (const range of times.split(",")) {
      const t = parseTimeRange(range);
      if (t) out.push(spec(day, t[0], t[1]));
    }
  }
  return out;
}

function periodTime(t: unknown): string | null {
  if (typeof t !== "string" || !/^\d{4}$/.test(t)) return null;
  const h = Number(t.slice(0, 2)), m = Number(t.slice(2));
  return h <= 23 && m <= 59 ? `${pad(h)}:${pad(m)}` : null;
}

function fromPeriods(periods: Period[]): OpeningHoursSpec[] {
  // Open all week: a single period from Sunday 0000 with no close.
  if (periods.length === 1 && !periods[0]?.close && periods[0]?.open?.day === 0 && periods[0]?.open?.time === "0000") {
    return ORDER.map((d) => spec(d, "00:00", "23:59"));
  }
  const out: OpeningHoursSpec[] = [];
  for (const p of periods) {
    const day = typeof p?.open?.day === "number" ? DAYS[p.open.day] : undefined;
    const opens = periodTime(p?.open?.time);
    const closes = periodTime(p?.close?.time);
    if (!day || !opens || !closes || opens === closes) continue;
    out.push(spec(day, opens, closes));
  }
  return out;
}

/**
 * OpeningHoursSpecification entries for a listing's stored hours, Monday first.
 * Empty when there are no hours that can be read.
 */
export function openingHoursSpecification(data: unknown): OpeningHoursSpec[] {
  if (!data || typeof data !== "object") return [];
  const hours = data as { weekdayText?: unknown; periods?: unknown };
  let out: OpeningHoursSpec[] = [];
  if (Array.isArray(hours.weekdayText) && hours.weekdayText.length) out = fromWeekdayText(hours.weekdayText);
  else if (Array.isArray(hours.periods) && hours.periods.length) out = fromPeriods(hours.periods as Period[]);
  const rank = (s: OpeningHoursSpec) => ORDER.indexOf(s.dayOfWeek.slice("https://schema.org/".length));
  return out.map((s, i) => ({ s, i })).sort((a, b) => rank(a.s) - rank(b.s) || a.i - b.i).map(({ s }) => s);
}
