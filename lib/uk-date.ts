// Today's date in the UK as "YYYY-MM-DD", whatever the server's or browser's
// time zone. `new Date().toISOString()` gives the UTC date, which in British
// Summer Time is still yesterday until 1am. Pure function, no imports.
export function ukToday(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(now);
}
