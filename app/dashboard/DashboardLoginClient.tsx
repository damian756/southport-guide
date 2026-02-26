"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, LayoutDashboard, AlertCircle, ArrowLeft } from "lucide-react";

export default function DashboardLoginClient() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [authError, setAuthError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(null);
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      if (!result || !result.ok || result.error) {
        setAuthError(
          result?.error === "Configuration"
            ? "Server configuration error — please contact support."
            : "Incorrect email or password."
        );
        return;
      }
      // Route by role: admins go to /admin, business users go to /dashboard/home
      const session = await getSession();
      const role = (session?.user as { role?: string } | undefined)?.role;
      router.push(role === "admin" ? "/admin" : "/dashboard/home");
    } catch {
      setAuthError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left — form panel */}
      <div className="flex-1 flex flex-col bg-[#FAF8F5] min-h-screen">
        {/* Header strip */}
        <div className="bg-[#1B2E4B]">
          <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
          <div className="px-6 py-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/15 flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-[#C9A84C]" />
            </div>
            <span className="font-display font-bold text-white">
              Southport<span className="text-[#C9A84C]">Guide</span>
              <span className="text-white/40 font-normal text-sm ml-2">Business Portal</span>
            </span>
            <Link
              href="/"
              className="ml-auto flex items-center gap-1.5 text-white/50 hover:text-white/80 text-xs font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to site
            </Link>
          </div>
        </div>

        {/* Login card */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold text-[#1B2E4B] mb-2">Sign in</h1>
              <p className="text-gray-500 text-sm">Manage your listing, view stats, and upgrade your plan.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">
              {authError && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{authError}</p>
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-[#1B2E4B] uppercase tracking-wider mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@business.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] transition bg-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[#1B2E4B] uppercase tracking-wider">
                    Password
                  </label>
                  <button type="button" className="text-xs text-[#C9A84C] hover:underline font-medium">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] transition bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1B2E4B] hover:bg-[#2A4A73] disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-full font-bold text-sm transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Signing in…
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don&apos;t have an account?{" "}
              <Link href="/claim-listing" className="text-[#C9A84C] font-semibold hover:underline">
                Claim your free listing →
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right — hero image panel, hidden on mobile */}
      <div className="hidden lg:block lg:w-[52%] xl:w-[55%] relative overflow-hidden flex-shrink-0">
        <img
          src="/images/dashboard/login-hero.jpg"
          alt="Lord Street, Southport"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B2E4B]/80 via-[#1B2E4B]/20 to-transparent" />
        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-10">
          <p className="font-display text-3xl font-bold text-white leading-snug mb-2">
            Your business,<br />on Southport&apos;s guide.
          </p>
          <p className="text-white/70 text-sm">
            Manage your listing, track clicks, and get in front of thousands of visitors every week.
          </p>
        </div>
      </div>
    </div>
  );
}
