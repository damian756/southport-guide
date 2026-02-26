"use client";

import { useState, useCallback } from "react";
import { CheckCircle2, Circle, Camera } from "lucide-react";
import type { Business } from "@prisma/client";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

function time24To12(value: string): string {
  const [hStr, mStr] = value.split(":");
  const h = parseInt(hStr ?? "0", 10);
  const m = parseInt(mStr ?? "0", 10);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}

function time12To24(text: string): string | null {
  const match = text.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let h = parseInt(match[1] ?? "0", 10);
  const m = parseInt(match[2] ?? "0", 10);
  const ampm = (match[3] ?? "").toUpperCase();
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function buildTimeOptions(): { value: string; label: string }[] {
  const opts: { value: string; label: string }[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const value = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      opts.push({ value, label: time24To12(value) });
    }
  }
  return opts;
}

const TIME_OPTIONS = buildTimeOptions();

type DayHours = { open: boolean; allDay: boolean; from: string; to: string };

function parseWeekdayText(weekdayText: string[]): DayHours[] {
  const dayMap: Record<string, number> = {};
  DAYS.forEach((d, i) => { dayMap[d] = i; });

  const result: DayHours[] = DAYS.map(() => ({ open: false, allDay: false, from: "09:00", to: "17:00" }));

  for (const line of weekdayText) {
    const colonIdx = line.indexOf(": ");
    const day = line.slice(0, colonIdx);
    const spec = line.slice(colonIdx + 2).trim();
    const idx = dayMap[day];
    if (idx === undefined) continue;

    if (spec === "Closed") {
      result[idx] = { open: false, allDay: false, from: "09:00", to: "17:00" };
    } else if (spec === "Open 24 hours") {
      result[idx] = { open: true, allDay: true, from: "00:00", to: "23:30" };
    } else {
      const dash = spec.indexOf(" – ");
      if (dash === -1) continue;
      const from12 = spec.slice(0, dash).trim();
      const to12 = spec.slice(dash + 3).trim();
      const from24 = time12To24(from12);
      const to24 = time12To24(to12);
      result[idx] = {
        open: true,
        allDay: false,
        from: from24 ?? "09:00",
        to: to24 ?? "17:00",
      };
    }
  }
  return result;
}

function buildWeekdayText(hours: DayHours[]): string[] {
  return hours.map((h, i) => {
    const day = DAYS[i];
    if (!h.open) return `${day}: Closed`;
    if (h.allDay) return `${day}: Open 24 hours`;
    const from12 = time24To12(h.from);
    const to12 = time24To12(h.to);
    return `${day}: ${from12} – ${to12}`;
  });
}

type BusinessForEditor = Pick<
  Business,
  "id" | "name" | "slug" | "shortDescription" | "description" | "phone" | "email" | "website" | "priceRange" | "openingHours" | "images" | "rating" | "reviewCount" | "hubTier"
> & { category: { slug: string } };

type Props = {
  business: BusinessForEditor;
};

export default function ListingEditorClient({ business }: Props) {
  const oh = business.openingHours as { weekdayText?: string[] } | null;
  const initialHours = oh?.weekdayText?.length
    ? parseWeekdayText(oh.weekdayText)
    : DAYS.map(() => ({ open: false, allDay: false, from: "09:00", to: "17:00" }));

  const [shortDescription, setShortDescription] = useState(business.shortDescription ?? "");
  const [description, setDescription] = useState(business.description ?? "");
  const [phone, setPhone] = useState(business.phone ?? "");
  const [email, setEmail] = useState(business.email ?? "");
  const [website, setWebsite] = useState(business.website ?? "");
  const [priceRange, setPriceRange] = useState<"£" | "££" | "£££" | "££££" | null>(business.priceRange as "£" | "££" | "£££" | "££££" | null);
  const [hours, setHours] = useState<DayHours[]>(initialHours);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateDay = useCallback((idx: number, patch: Partial<DayHours>) => {
    setHours((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], ...patch };
      return next;
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const res = await fetch("/api/hub/listing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shortDescription: shortDescription.trim() || "",
          description: description.trim() || "",
          phone: phone.trim() || "",
          email: email.trim() || "",
          website: website.trim() || "",
          priceRange,
          openingHours: { weekdayText: buildWeekdayText(hours) },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const hasDescription = (business.shortDescription ?? business.description ?? "").trim().length > 0;
  const hasPhone = (business.phone ?? "").trim().length > 0;
  const hasWebsite = (business.website ?? "").trim().length > 0;
  const hasHours = business.openingHours != null;
  const hasPhotos = business.images != null && business.images.length > 0;
  const ratingOk = business.rating != null && business.rating >= 4;
  const isPro = business.hubTier === "pro";

  const listingUrl = `https://www.southportguide.co.uk/${business.category.slug}/${business.slug}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">Changes saved successfully.</span>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <span className="font-medium">{error}</span>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <hr className="border-gray-100" />

          <section id="section-details">
            <h2 className="font-display text-xl font-bold text-[#1B2E4B] mb-4">Public Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business name</label>
                <input
                  type="text"
                  value={business.name}
                  readOnly
                  className="w-full border border-gray-200 rounded-xl text-sm bg-gray-50 opacity-60 cursor-not-allowed px-4 py-2.5"
                />
                <p className="text-xs text-gray-400 mt-1">To change your business name, contact us.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short description</label>
                <input
                  type="text"
                  maxLength={160}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="One line summary for search results"
                  className="w-full border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] transition bg-[#FAF8F5] px-4 py-2.5"
                />
                <p className="text-xs text-gray-400 mt-1 text-right">{160 - shortDescription.length} characters remaining</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full description</label>
                <textarea
                  rows={6}
                  maxLength={1000}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell visitors what makes your business special..."
                  className="w-full border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] transition bg-[#FAF8F5] px-4 py-2.5"
                />
                <p className="text-xs text-gray-400 mt-1 text-right">{1000 - description.length} characters remaining</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price range</label>
                <div className="flex gap-2">
                  {(["£", "££", "£££", "££££"] as const).map((pr) => (
                    <button
                      key={pr}
                      type="button"
                      onClick={() => setPriceRange(priceRange === pr ? null : pr)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                        priceRange === pr
                          ? "bg-[#1B2E4B] text-white border-[#1B2E4B]"
                          : "border-gray-200 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {pr}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          <section id="section-contact">
            <h2 className="font-display text-xl font-bold text-[#1B2E4B] mb-4">Contact</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01704 000000"
                  className="w-full border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] transition bg-[#FAF8F5] px-4 py-2.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://"
                  className="w-full border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] transition bg-[#FAF8F5] px-4 py-2.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email (customer-facing)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="info@yourbusiness.com"
                  className="w-full border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] transition bg-[#FAF8F5] px-4 py-2.5"
                />
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          <section id="section-hours">
            <h2 className="font-display text-xl font-bold text-[#1B2E4B] mb-4">Opening Hours</h2>
            <div className="space-y-3">
              {DAYS.map((day, i) => (
                <div key={day} className="flex flex-wrap items-center gap-3">
                  <span className="w-24 text-sm font-medium text-[#1B2E4B]">{day}</span>
                  <select
                    value={hours[i].open ? (hours[i].allDay ? "24h" : "open") : "closed"}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === "closed") updateDay(i, { open: false, allDay: false });
                      else if (v === "24h") updateDay(i, { open: true, allDay: true });
                      else updateDay(i, { open: true, allDay: false });
                    }}
                    className="border border-gray-200 rounded-lg text-sm px-3 py-1.5 bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40"
                  >
                    <option value="closed">Closed</option>
                    <option value="open">Open</option>
                    <option value="24h">Open 24 hours</option>
                  </select>
                  {hours[i].open && !hours[i].allDay && (
                    <>
                      <select
                        value={hours[i].from}
                        onChange={(e) => updateDay(i, { from: e.target.value })}
                        className="border border-gray-200 rounded-lg text-sm px-3 py-1.5 bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40"
                      >
                        {TIME_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                      <span className="text-gray-400">–</span>
                      <select
                        value={hours[i].to}
                        onChange={(e) => updateDay(i, { to: e.target.value })}
                        className="border border-gray-200 rounded-lg text-sm px-3 py-1.5 bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40"
                      >
                        {TIME_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>

          <hr className="border-gray-100" />

          <section id="section-photos">
            <h2 className="font-display text-xl font-bold text-[#1B2E4B] mb-4">Photos</h2>
            {business.images && business.images.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {business.images.map((url, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square rounded-xl bg-gray-100 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-300" />
                  </div>
                ))}
              </div>
            )}
            <p className="text-sm text-gray-400 mt-3">
              To add or change photos, email photos@southportguide.co.uk with your business name. Photo upload coming soon.
            </p>
          </section>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-[#C9A84C] hover:bg-[#B8972A] text-white py-3.5 rounded-full font-bold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>

        <aside className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Your listing right now</p>
            <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-[#1B2E4B]/20 to-[#C9A84C]/20 mb-4">
              {business.images?.[0] ? (
                <img src={business.images[0]} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="w-12 h-12 text-gray-300" />
                </div>
              )}
            </div>
            <h3 className="font-display font-bold text-[#1B2E4B]">{business.name}</h3>
            {business.rating != null && business.reviewCount != null && (
              <p className="text-sm text-gray-600 mt-0.5">
                ★ {business.rating.toFixed(1)} ({business.reviewCount.toLocaleString()} reviews)
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">{business.category.slug} · {business.priceRange ?? "—"}</p>
            <a
              href={listingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-[#C9A84C] font-semibold mt-4 hover:text-[#B8972A]"
            >
              View live listing ↗
            </a>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Completeness</p>
            <ul className="space-y-2">
              {[
                { done: hasDescription, label: "Description", href: "/dashboard/listing#section-details" },
                { done: hasPhone, label: "Phone number", href: "/dashboard/listing#section-contact" },
                { done: hasWebsite, label: "Website URL", href: "/dashboard/listing#section-contact" },
                { done: hasHours, label: "Opening hours", href: "/dashboard/listing#section-hours" },
                { done: hasPhotos, label: "Has photos", href: "/dashboard/listing#section-photos" },
                { done: ratingOk, label: "Google rating ≥ 4.0", href: "/dashboard/reviews" },
                { done: isPro, label: "Pro plan", href: "/dashboard/upgrade" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1B2E4B]">
                    {item.done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                    )}
                    <span>{item.label}</span>
                    {!item.done && <span className="text-xs text-gray-400 ml-auto">Fix it →</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </form>
  );
}
