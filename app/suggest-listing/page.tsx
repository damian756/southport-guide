"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const CATEGORIES = [
  "Restaurants",
  "Hotels",
  "Bars & Pubs",
  "Cafes",
  "Attractions",
  "Beaches & Parks",
  "Golf",
  "Shopping",
  "Wellness",
  "Activities",
  "Transport",
  "Other",
];

export default function SuggestListingPage() {
  const [fields, setFields] = useState({
    businessName: "",
    category: "",
    address: "",
    website: "",
    phone: "",
    contactName: "",
    contactEmail: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const set = (k: keyof typeof fields) => (v: string) =>
    setFields((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/suggest-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setError("Could not reach the server. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-3">
            Suggestion received
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Thanks. We will review the listing and add it to the guide. If we need more information we will be in touch.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#1B2E4B] font-semibold hover:text-[#C9A84C] transition-colors"
          >
            Back to SouthportGuide
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
        <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">
          SouthportGuide Directory
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B] mb-4">
          Suggest a business listing
        </h1>
        <p className="text-gray-600 leading-relaxed mb-2">
          If your business or a business you know is not listed on SouthportGuide, use this form to suggest it. We review every submission and add listings free of charge.
        </p>
        <p className="text-gray-500 text-sm leading-relaxed mb-10">
          Already listed?{" "}
          <Link href="/claim-listing" className="text-[#1B2E4B] font-semibold underline hover:text-[#C9A84C]">
            Claim your listing
          </Link>{" "}
          to update your details, add photos, and respond to reviews.
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-7 space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="businessName" className="block text-sm font-semibold text-[#1B2E4B]">
              Business name <span className="text-red-500">*</span>
            </label>
            <input
              id="businessName"
              type="text"
              required
              value={fields.businessName}
              onChange={(e) => set("businessName")(e.target.value)}
              placeholder="e.g. The Bold Hotel"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B2E4B]/20 focus:border-[#1B2E4B]"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="category" className="block text-sm font-semibold text-[#1B2E4B]">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              required
              value={fields.category}
              onChange={(e) => set("category")(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B2E4B]/20 focus:border-[#1B2E4B] bg-white"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="address" className="block text-sm font-semibold text-[#1B2E4B]">
              Address
            </label>
            <input
              id="address"
              type="text"
              value={fields.address}
              onChange={(e) => set("address")(e.target.value)}
              placeholder="e.g. 9 Lord Street, Southport, PR8 1JN"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B2E4B]/20 focus:border-[#1B2E4B]"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="website" className="block text-sm font-semibold text-[#1B2E4B]">
                Website
              </label>
              <input
                id="website"
                type="url"
                value={fields.website}
                onChange={(e) => set("website")(e.target.value)}
                placeholder="https://"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B2E4B]/20 focus:border-[#1B2E4B]"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="phone" className="block text-sm font-semibold text-[#1B2E4B]">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                value={fields.phone}
                onChange={(e) => set("phone")(e.target.value)}
                placeholder="01704 000 000"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B2E4B]/20 focus:border-[#1B2E4B]"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Your details</p>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="contactName" className="block text-sm font-semibold text-[#1B2E4B]">
                  Your name <span className="text-red-500">*</span>
                </label>
                <input
                  id="contactName"
                  type="text"
                  required
                  value={fields.contactName}
                  onChange={(e) => set("contactName")(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B2E4B]/20 focus:border-[#1B2E4B]"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="contactEmail" className="block text-sm font-semibold text-[#1B2E4B]">
                  Your email <span className="text-red-500">*</span>
                </label>
                <input
                  id="contactEmail"
                  type="email"
                  required
                  value={fields.contactEmail}
                  onChange={(e) => set("contactEmail")(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B2E4B]/20 focus:border-[#1B2E4B]"
                />
              </div>
            </div>
          </div>

          {status === "error" && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full sm:w-auto bg-[#1B2E4B] hover:bg-[#2A4A73] text-white px-8 py-3 rounded-full font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending..." : "Submit suggestion"}
            </button>
            <p className="mt-3 text-xs text-gray-400">
              We review all suggestions and add listings within a few days.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
