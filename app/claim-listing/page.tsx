"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle, AlertCircle, Building2, Mail, MessageSquare } from "lucide-react";

export default function ClaimListingPage() {
  const [form, setForm] = useState({ name: "", email: "", businessName: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: "Claim my listing",
          businessName: form.businessName,
          message: form.message || `${form.name} is requesting to claim the listing for ${form.businessName}.`,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error || "Something went wrong."); setStatus("error"); return; }
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero */}
      <div className="bg-[#1B2E4B] relative overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/8 rounded-full -translate-y-16 translate-x-16 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 max-w-5xl py-12">
          <h1 className="font-display text-4xl font-bold text-white mb-2">Claim Your Listing</h1>
          <p className="text-white/60">Update your details, manage your food hygiene display, and get more visibility.</p>
        </div>
        <div className="relative h-6 overflow-hidden">
          <svg viewBox="0 0 1440 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0 24L720 8L1440 24V24H0Z" fill="#FAF8F5"/>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl py-12">
        <div className="grid md:grid-cols-5 gap-8">

          {/* ── Sidebar ── */}
          <div className="md:col-span-2 space-y-5">
            {/* Benefits */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-display font-bold text-[#1B2E4B] mb-4">What you get</h2>
              <ul className="space-y-3">
                {[
                  "Update your name, address & contact details",
                  "Add or correct opening hours",
                  "Manage your food hygiene rating display",
                  "Respond to your listing",
                  "Upgrade to Featured for more visibility",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing nudge */}
            <div className="bg-[#1B2E4B] rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A84C]/10 rounded-full -translate-y-8 translate-x-8 blur-2xl" />
              <div className="relative">
                <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">Featured listing</p>
                <p className="font-display font-bold text-white mb-2">More visibility from £29/mo</p>
                <p className="text-white/60 text-sm mb-4">Appear at the top of your category and get a prominent featured badge.</p>
                <Link href="/pricing" className="block text-center border border-[#C9A84C]/40 text-[#C9A84C] px-4 py-2 rounded-full font-bold text-sm hover:bg-[#C9A84C]/10 transition">
                  View pricing →
                </Link>
              </div>
            </div>

            <p className="text-sm text-gray-400 text-center">
              Not listed yet?{" "}
              <Link href="/contact" className="text-[#C9A84C] font-semibold hover:underline">
                Contact us to get added →
              </Link>
            </p>
          </div>

          {/* ── Form ── */}
          <div className="md:col-span-3">
            {status === "success" ? (
              <div className="bg-white rounded-2xl border border-green-100 p-10 text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-2">Request sent!</h2>
                <p className="text-gray-500 mb-6">
                  We&apos;ve received your claim request for <strong>{form.businessName}</strong>. We&apos;ll be in touch within 1–2 business days to verify ownership.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => { setForm({ name: "", email: "", businessName: "", message: "" }); setStatus("idle"); }}
                    className="px-6 py-2.5 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                  >
                    Submit another
                  </button>
                  <Link href="/" className="px-6 py-2.5 bg-[#C9A84C] text-white rounded-full text-sm font-bold hover:bg-[#B8972A] transition">
                    Back to the guide →
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-7 space-y-5">
                <h2 className="font-display text-xl font-bold text-[#1B2E4B]">Request to claim a listing</h2>

                {status === "error" && (
                  <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 text-sm">{errorMsg}</p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#1B2E4B] uppercase tracking-wider mb-1.5">
                    <span className="inline-flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-[#C9A84C]" /> Business name <span className="text-[#C9A84C]">*</span></span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.businessName}
                    onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                    placeholder="e.g. The Grand Hotel"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] transition bg-[#FAF8F5]"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1B2E4B] uppercase tracking-wider mb-1.5">
                      Your name <span className="text-[#C9A84C]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Smith"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] transition bg-[#FAF8F5]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1B2E4B] uppercase tracking-wider mb-1.5">
                      <span className="inline-flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#C9A84C]" /> Email address <span className="text-[#C9A84C]">*</span></span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@business.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] transition bg-[#FAF8F5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B2E4B] uppercase tracking-wider mb-1.5">
                    <span className="inline-flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5 text-[#C9A84C]" /> Anything to add? <span className="text-gray-400 font-normal normal-case">(optional)</span></span>
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="e.g. our phone number has changed, we'd like to update our opening hours..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] transition bg-[#FAF8F5] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 bg-[#1B2E4B] hover:bg-[#2A4A73] disabled:opacity-60 text-white py-3.5 rounded-full font-bold text-sm transition-colors"
                >
                  {status === "sending" ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending…</>
                  ) : (
                    <><Send className="w-4 h-4" />Request to Claim Listing</>
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  We&apos;ll email you within 1–2 business days to verify ownership.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
