"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { adminModuleCards } from "@/components/admin/adminNav";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import {
  fetchAllLeads,
  fetchAllTestimonials,
  type AdminLead,
  type AdminTestimonial,
} from "@/lib/api";

export default function AdminDashboardPage() {
  const { token, admin } = useAdminAuth();
  const [testimonials, setTestimonials] = useState<AdminTestimonial[]>([]);
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [newLeads, setNewLeads] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    Promise.all([fetchAllTestimonials(token), fetchAllLeads(token)])
      .then(([t, l]) => {
        setTestimonials(t);
        setLeads(l.data);
        setNewLeads(l.meta.stats.new ?? 0);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const published = testimonials.filter((i) => i.isPublished).length;

  const stats = [
    {
      label: "New leads",
      value: loading ? "—" : String(newLeads),
      hint: "Awaiting reply",
    },
    {
      label: "Total leads",
      value: loading ? "—" : String(leads.length),
      hint: "All proposal requests",
    },
    {
      label: "Testimonials",
      value: loading ? "—" : String(testimonials.length),
      hint: `${published} published`,
    },
    {
      label: "Modules live",
      value: "3",
      hint: "Dashboard · Leads · Voices",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <AdminPageHeader
        eyebrow="Overview"
        title={`Welcome back${admin?.name ? `, ${admin.name.split(" ")[0]}` : ""}.`}
        description="Manage Hindalson content and inbound proposals from one console."
        actions={
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/leads"
              className="btn-svc text-white"
              style={{
                background: "linear-gradient(90deg, #00c8d4, #3BA7FF)",
                boxShadow: "0 12px 36px rgba(0,200,212,0.22)",
              }}
            >
              Open leads →
            </Link>
            <Link
              href="/admin/testimonials"
              className="btn-svc-ghost"
              style={{ borderColor: "rgba(0,200,212,0.35)" }}
            >
              Testimonials
            </Link>
          </div>
        }
      />

      <div className="admin-rise-d1 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="admin-stat relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan/10 blur-2xl"
            />
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/35">
              {stat.label}
            </p>
            <p className="display mt-2 text-3xl font-bold text-white">{stat.value}</p>
            <p className="mt-2 text-xs text-white/40">{stat.hint}</p>
          </div>
        ))}
      </div>

      <section className="admin-rise-d2">
        <h2 className="serif text-2xl text-white sm:text-3xl">Workspace</h2>
        <p className="mt-2 text-sm text-white/45">
          Jump into a module or preview what&apos;s coming next.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {adminModuleCards.map((mod, i) => {
            const inner = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-white">{mod.label}</p>
                    <p className="mt-1 text-sm text-white/45">{mod.description}</p>
                  </div>
                  {mod.badge ? (
                    <span className="shrink-0 rounded-full border border-white/12 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white/35">
                      {mod.badge}
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full bg-cyan/15 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-cyan">
                      Live
                    </span>
                  )}
                </div>
                {mod.live ? (
                  <span className="mt-6 inline-flex text-sm font-semibold text-cyan">
                    Open module →
                  </span>
                ) : (
                  <span className="mt-6 inline-flex text-sm text-white/30">In roadmap</span>
                )}
              </>
            );

            if (!mod.live) {
              return (
                <div
                  key={mod.label}
                  className="admin-module rounded-2xl border border-white/8 bg-white/[0.015] p-5 opacity-75"
                  style={{ animationDelay: `${0.05 + i * 0.05}s` }}
                >
                  {inner}
                </div>
              );
            }

            return (
              <Link
                key={mod.href}
                href={mod.href}
                className="admin-module group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:-translate-y-0.5 hover:border-cyan/35 hover:bg-cyan/[0.06]"
                style={{ animationDelay: `${0.05 + i * 0.05}s` }}
              >
                {inner}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
