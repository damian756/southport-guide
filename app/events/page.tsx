import Link from "next/link";
import Image from "next/image";
import { CalendarDays, ArrowLeft, ExternalLink } from "lucide-react";
import { getEventsByMonth, getUpcomingEvents, EVENTS } from "@/lib/southport-data";
import { Suspense } from "react";
import MonthFilter from "./MonthFilter";

export const metadata = {
  title: "What's On in Southport 2026 | Events Calendar | Southport Guide",
  description:
    "The complete guide to events in Southport in 2026. From The Open Championship to the Flower Show, Comedy Festival and more — updated regularly.",
  alternates: { canonical: "https://www.southportguide.co.uk/events" },
};

const CATEGORY_COLORS: Record<string, string> = {
  Comedy: "bg-purple-100 text-purple-700",
  Entertainment: "bg-pink-100 text-pink-700",
  Theatre: "bg-indigo-100 text-indigo-700",
  Community: "bg-rose-100 text-rose-700",
  Festival: "bg-amber-100 text-amber-700",
  "Street Arts": "bg-orange-100 text-orange-700",
  Sport: "bg-green-100 text-green-700",
  "Circus & Arts": "bg-orange-100 text-orange-700",
  "Food & Drink": "bg-red-100 text-red-700",
  Music: "bg-blue-100 text-blue-700",
  Golf: "bg-emerald-100 text-emerald-700",
  "Arts & Culture": "bg-teal-100 text-teal-700",
};

function categoryClass(cat: string) {
  return CATEGORY_COLORS[cat] ?? "bg-gray-100 text-gray-600";
}

function getTodayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

function eventDayLabel(event: { isoDate: string; dayLabel: string }) {
  return event.isoDate === getTodayISO() ? "Today" : event.dayLabel;
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const { month: activeMonth } = await searchParams;
  const eventsByMonth = getEventsByMonth();
  const allMonths = Object.keys(eventsByMonth);
  const upcomingCount = getUpcomingEvents().length;

  const filteredMonths = activeMonth
    ? allMonths.filter((m) => m === activeMonth)
    : allMonths;

  const eventsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Southport Events 2026",
    description: "The complete guide to events in Southport in 2026 — from The Open Championship to the Flower Show, Comedy Festival and more.",
    url: "https://www.southportguide.co.uk/events",
    numberOfItems: EVENTS.length,
    itemListElement: EVENTS.map((event, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Event",
        name: event.title,
        startDate: event.isoDate,
        endDate: event.endIsoDate ?? event.isoDate,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: event.venue,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Southport",
            addressRegion: "Merseyside",
            addressCountry: "GB",
          },
        },
        isAccessibleForFree: event.free,
        url: event.link.startsWith("http")
          ? event.link
          : `https://www.southportguide.co.uk${event.link}`,
        organizer: {
          "@type": "Organization",
          name: "SouthportGuide.co.uk",
          url: "https://www.southportguide.co.uk",
        },
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }} />
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero */}
      <section className="relative bg-[#1B2E4B] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/southport-pier.webp"
            alt="Southport"
            fill
            priority
            sizes="100vw"
            quality={70}
            className="object-cover object-center opacity-30"
          />
        </div>
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent relative z-10" />
        <div className="relative z-10 container mx-auto px-4 py-14 md:py-20 max-w-5xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to guide
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <CalendarDays className="w-8 h-8 text-[#C9A84C]" />
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest">Updated weekly</p>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            What&apos;s On in Southport<br />
            <span className="text-[#C9A84C]">2026 Events Calendar</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl">
            {upcomingCount} upcoming events across the year — from free community events to world-class festivals. Updated regularly by locals.
          </p>
        </div>
      </section>

      {/* Month filter tabs — client component */}
      <Suspense fallback={<div className="h-12 bg-white border-b border-gray-100" />}>
        <MonthFilter months={allMonths} />
      </Suspense>

      {/* Events by month */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {activeMonth && !eventsByMonth[activeMonth] ? (
          <div className="text-center py-20">
            <p className="text-gray-400">No events found for this month.</p>
            <Link href="/events" className="text-[#C9A84C] font-semibold mt-4 inline-block hover:underline">
              View all events →
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredMonths.map((month) => {
              const events = eventsByMonth[month];
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const isPast = events.every((e) => new Date(e.isoDate) < today);

              return (
                <div key={month}>
                  <div className="flex items-center gap-4 mb-5">
                    <h2
                      className={`font-display text-xl md:text-2xl font-bold ${
                        isPast ? "text-gray-400" : "text-[#1B2E4B]"
                      }`}
                    >
                      {month}
                    </h2>
                    {isPast && (
                      <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                        Past
                      </span>
                    )}
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {events.map((event, i) => {
                      const isExternal = event.link.startsWith("http");
                      const Tag = isExternal ? "a" : Link;
                      const extraProps = isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {};

                      return (
                        <Tag
                          key={i}
                          href={event.link}
                          {...extraProps}
                          className={`group bg-white rounded-2xl p-5 border transition-all ${
                            isPast
                              ? "border-gray-100 opacity-50 pointer-events-none"
                              : "border-gray-100 hover:border-[#C9A84C]/40 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <span className="text-2xl">{event.emoji}</span>
                            {event.free ? (
                              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                                Free
                              </span>
                            ) : (
                              <span className="text-xs font-semibold text-[#1B2E4B]/50 bg-gray-100 px-2.5 py-1 rounded-full">
                                Tickets
                              </span>
                            )}
                          </div>

                          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-1">
                            {eventDayLabel(event)}
                          </p>
                          <h3 className="font-display font-bold text-[#1B2E4B] text-base leading-snug mb-1 group-hover:text-[#C9A84C] transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-3">{event.venue}</p>

                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryClass(event.category)}`}>
                              {event.category}
                            </span>
                            {isExternal && (
                              <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#C9A84C] transition-colors" />
                            )}
                          </div>
                        </Tag>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Submit event CTA */}
        <div className="mt-16 bg-[#1B2E4B] rounded-3xl p-8 text-center">
          <h3 className="font-display text-2xl font-bold text-white mb-2">Got an event to add?</h3>
          <p className="text-white/60 mb-6">
            We update this calendar weekly. If you run a Southport event that&apos;s not listed, get in touch.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#E8C87A] text-white font-bold px-6 py-3 rounded-full transition-colors"
          >
            Submit your event
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
