// Listing JSON-LD opening hours (lib/opening-hours.ts): every stored Google format is
// read with its closing time, minutes and PM, and nothing that cannot be read is guessed.
// Run: node --test tests/*.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { openingHoursSpecification, parseTimeRange } from "../lib/opening-hours.ts";

// Google's own spacing: a narrow no-break space before AM/PM, thin spaces round the dash.
const g = (s) => s.replace(/ (AM|PM)/g, "\u202f$1").replace(/ \u2013 /g, "\u2009\u2013\u2009");
const short = (specs) => specs.map((s) => `${s.dayOfWeek.replace("https://schema.org/", "")} ${s.opens}-${s.closes}`);

test("Google weekdayText with its narrow and thin spaces keeps minutes, PM and the closing time", () => {
  const specs = openingHoursSpecification({
    weekdayText: [
      g("Monday: 8:30 AM – 5:00 PM"),
      g("Tuesday: 12:00 – 2:30 PM, 5:30 – 9:30 PM"),
      g("Wednesday: 4:00 – 10:00 PM"),
      g("Thursday: 9:00 – 11:30 AM"),
      g("Friday: 3:00 PM – 2:30 AM"),
      "Saturday: Closed",
      "Sunday: Open 24 hours",
    ],
  });
  assert.deepEqual(short(specs), [
    "Monday 08:30-17:00",
    "Tuesday 12:00-14:30",
    "Tuesday 17:30-21:30",
    "Wednesday 16:00-22:00",
    "Thursday 09:00-11:30",
    "Friday 15:00-02:30",
    "Sunday 00:00-23:59",
  ]);
  for (const s of specs) {
    assert.equal(s["@type"], "OpeningHoursSpecification");
    assert.match(s.opens, /^\d{2}:\d{2}$/);
    assert.match(s.closes, /^\d{2}:\d{2}$/);
  }
});

test("plain spaces and hyphens read the same way; midnight and noon are right", () => {
  assert.deepEqual(parseTimeRange("9:00 AM - 5:00 PM"), ["09:00", "17:00"]);
  assert.deepEqual(parseTimeRange("12:00 PM – 12:00 AM"), ["12:00", "00:00"]);
  assert.deepEqual(parseTimeRange("12:00 – 5:00 AM"), ["00:00", "05:00"]);
  assert.deepEqual(parseTimeRange("09:00 – 17:30"), ["09:00", "17:30"]);
});

test("times that cannot be read are left out, not guessed", () => {
  for (const s of ["11:00 – 1:00 PM", "9:00 AM – 5:00", "13:00 PM – 2:00 PM", "Noon – 5 PM", "9:00", "9 – 5"]) {
    assert.equal(parseTimeRange(s), null, s);
  }
  assert.deepEqual(openingHoursSpecification({ weekdayText: ["Monday: By appointment", "Funday: 9:00 AM – 5:00 PM"] }), []);
  assert.deepEqual(openingHoursSpecification(null), []);
  assert.deepEqual(openingHoursSpecification({}), []);
});

test("periods (HHMM) are used when there is no weekdayText, as on the page", () => {
  const specs = openingHoursSpecification({
    periods: [
      { open: { day: 1, time: "0900" }, close: { day: 1, time: "1730" } },
      { open: { day: 5, time: "1500" }, close: { day: 6, time: "0030" } },
      { open: { day: 2, time: "0900" } },
    ],
  });
  assert.deepEqual(short(specs), ["Monday 09:00-17:30", "Friday 15:00-00:30"]);
  assert.deepEqual(short(openingHoursSpecification({ periods: [{ open: { day: 0, time: "0000" } }] })).length, 7);
});

test("weekdayText wins over periods, because it is what the page prints", () => {
  const specs = openingHoursSpecification({
    weekdayText: [g("Monday: 10:00 AM – 4:00 PM")],
    periods: [{ open: { day: 1, time: "0900" }, close: { day: 1, time: "1700" } }],
  });
  assert.deepEqual(short(specs), ["Monday 10:00-16:00"]);
});
