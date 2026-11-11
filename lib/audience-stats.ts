// ── Audience figures for the advertise page ──────────────────────────────────
// Every number here carries its source and the date it was read. Nothing is
// computed from the database at run time.
//
// While `provisional` is true, the "The audience is growing" section on
// /advertise renders nothing. Damian approved publishing on 11 Nov 2026.
//
// Every Semrush figure below is a reading off the tool's six-month chart on
// 11 November 2026, rounded. There is no Semrush export behind them.

export type Point = {
  /** Approximate date the reading stands for, "YYYY-MM-DD". Used to place the point. */
  date: string;
  label: string;
  value: number;
  note?: string;
};

export const AUDIENCE_STATS = {
  provisional: false,

  /** Semrush's estimate of monthly visits from search. Not measured by us. */
  searchVisits: {
    source: "Semrush estimate of monthly visits from search, November 2026",
    read: "2026-11-11",
    how: "Read off Semrush's six-month chart on 11 November 2026 and rounded; no export.",
    caption: "Semrush estimate of monthly visits from search, read 11 November 2026. Figures are rounded.",
    points: [
      { date: "2026-05-25", label: "Late May", value: 200 },
      { date: "2026-07-05", label: "Early July", value: 1000 },
      { date: "2026-08-15", label: "August", value: 1900 },
      { date: "2026-09-15", label: "September", value: 2500 },
      { date: "2026-10-15", label: "October", value: 3400 },
      { date: "2026-11-05", label: "Early November", value: 5000 },
    ] as Point[],
  },

  /** Search terms the site ranks for in the top 100 results (Semrush). */
  rankedKeywords: {
    source: "Semrush estimate of keywords ranked in the top 100, read 11 November 2026, rounded",
    read: "2026-11-11",
    lateMay: 1200,
    now: 3600,
  },

  /** The site's own count of clicks from listings through to businesses. */
  clicksThrough: {
    source: "SouthportGuide BusinessClick table, demo account excluded, read 11 Nov 2026",
    read: "2026-11-11",
    period: "July to October 2026",
    total: 8456,
    directions: 4677,
    googleReviews: 3666,
    websites: 113,
    monthly: [
      { date: "2026-07-01", label: "July", value: 2563 },
      { date: "2026-08-01", label: "August", value: 2448 },
      { date: "2026-09-01", label: "September", value: 1930 },
      { date: "2026-10-01", label: "October", value: 1515 },
    ] as Point[],
    /** Monthly totals including listing "view" events, which are not clicks through. */
    monthlyIncludingViews: [
      { date: "2026-07-01", label: "July", value: 3018 },
      { date: "2026-08-01", label: "August", value: 2762 },
      { date: "2026-09-01", label: "September", value: 2129 },
      { date: "2026-10-01", label: "October", value: 1702 },
    ] as Point[],
    /** Listing views in the same period, left out of the clicks-through total. */
    views: 1155,
    topCategories: [
      { name: "Shopping", clicks: 1886 },
      { name: "Wellness", clicks: 1701 },
      { name: "Restaurants", clicks: 1292 },
    ],
  },
} as const;
