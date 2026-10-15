"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";

export default function AdminLoginPage() {
  const { login, token, loading } = useAdminAuth();
  const router = useRouter();
  const [email, setEmail] = useState("admin@hindalson.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && token) {
      router.replace("/admin/dashboard");
    }
  }, [loading, token, router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      router.replace("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="admin-dash relative flex min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />

      <div className="relative hidden w-[42%] flex-col justify-between border-r border-white/8 p-10 lg:flex">
        <div>
          <span className="brand-mark text-lg tracking-[0.14em]">Hindalson</span>
          <p className="brand-sub mt-2 text-[0.6rem] tracking-[0.42em]">Technology</p>
        </div>
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cyan">
            Admin console
          </p>
          <h1 className="serif mt-4 text-4xl text-white">One place for your site.</h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/45">
            Testimonials today. Leads, portfolio, and more modules as we ship them — same
            premium Hindalson stack.
          </p>
        </div>
        <Link href="/" className="text-sm text-white/40 transition hover:text-cyan">
          ← Back to website
        </Link>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 py-12">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0a0e12]/95 p-7 sm:p-8"
          style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.45)" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent lg:inset-x-auto lg:left-auto lg:right-auto lg:w-[calc(100%-4rem)]"
          />
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cyan lg:hidden">
            Hindalson Admin
          </p>
          <h2 className="serif mt-2 text-3xl text-white lg:mt-0">Sign in</h2>
          <p className="mt-2 text-sm text-white/45">Secure access to your dashboard.</p>

          <div className="mt-8 space-y-4">
            <div>
              <label htmlFor="admin-email" className="mb-1.5 block text-sm text-white/60">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                autoComplete="username"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="mb-1.5 block text-sm text-white/60">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                autoComplete="current-password"
              />
            </div>
          </div>

          {error ? (
            <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="btn-svc mt-6 w-full text-white disabled:opacity-50"
            style={{
              background: "linear-gradient(90deg, #00c8d4, #3BA7FF)",
              boxShadow: "0 12px 40px rgba(0,200,212,0.22)",
            }}
          >
            {submitting ? "Signing in…" : "Enter dashboard →"}
          </button>

          <Link
            href="/"
            className="mt-6 block text-center text-sm text-white/40 transition hover:text-cyan lg:hidden"
          >
            Back to website
          </Link>
        </form>
      </div>
    </div>
  );
}
