"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import {
  deleteLead,
  fetchAllLeads,
  updateLead,
  type AdminLead,
  type LeadStatus,
} from "@/lib/api";

const STATUS_OPTIONS: { id: LeadStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "contacted", label: "Contacted" },
  { id: "qualified", label: "Qualified" },
  { id: "closed", label: "Closed" },
  { id: "spam", label: "Spam" },
];

const statusTone: Record<LeadStatus, string> = {
  new: "bg-cyan/15 text-cyan",
  contacted: "bg-blue-500/15 text-blue-300",
  qualified: "bg-emerald-500/15 text-emerald-300",
  closed: "bg-white/10 text-white/50",
  spam: "bg-red-500/15 text-red-300",
};

function formatDate(value?: string) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminLeadsPage() {
  const { token } = useAdminAuth();
  const [items, setItems] = useState<AdminLead[]>([]);
  const [stats, setStats] = useState<Partial<Record<LeadStatus, number>>>({});
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const result = await fetchAllLeads(
        token,
        filter === "all" ? undefined : filter
      );
      setItems(result.data);
      setStats(result.meta.stats || {});
      setActiveId((current) =>
        current && !result.data.some((l) => l.id === current) ? null : current
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load leads");
    } finally {
      setLoading(false);
    }
  }, [token, filter]);

  useEffect(() => {
    load();
  }, [load]);

  const active = items.find((item) => item.id === activeId) || null;

  useEffect(() => {
    setNotesDraft(active?.notes || "");
  }, [active?.id, active?.notes]);

  async function onStatusChange(id: string, status: LeadStatus) {
    if (!token) return;
    setSaving(true);
    setError("");
    try {
      await updateLead(token, id, { status });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  }

  async function onSaveNotes() {
    if (!token || !active) return;
    setSaving(true);
    setError("");
    try {
      await updateLead(token, active.id, { notes: notesDraft });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save notes");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    if (!token) return;
    if (!window.confirm("Delete this lead permanently?")) return;
    try {
      await deleteLead(token, id);
      if (activeId === id) setActiveId(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  const newCount = stats.new ?? 0;

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <AdminPageHeader
        eyebrow="Inbox"
        title="Leads"
        description="Proposal requests from the site and ads landing — review project details, note, and update status."
        actions={
          <button
            type="button"
            onClick={load}
            className="rounded-lg border border-white/12 px-3 py-2 text-sm text-white/60 transition hover:border-cyan/40 hover:text-cyan"
          >
            Refresh
          </button>
        }
      />

      <div className="admin-rise-d1 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {STATUS_OPTIONS.filter((s) => s.id !== "all").map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setFilter(s.id)}
            className={`rounded-2xl border px-4 py-4 text-left transition ${
              filter === s.id
                ? "border-cyan/40 bg-cyan/10"
                : "border-white/10 bg-white/[0.02] hover:border-white/20"
            }`}
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/35">
              {s.label}
            </p>
            <p className="display mt-1 text-2xl font-bold text-white">
              {stats[s.id as LeadStatus] ?? 0}
            </p>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setFilter(s.id)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition ${
              filter === s.id
                ? "border-cyan/40 bg-cyan/15 text-cyan"
                : "border-white/10 text-white/40 hover:text-white"
            }`}
          >
            {s.label}
            {s.id === "new" && newCount > 0 ? ` · ${newCount}` : ""}
          </button>
        ))}
      </div>

      {error ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-3">
          {loading ? (
            <p className="text-sm text-white/40">Loading leads…</p>
          ) : items.length === 0 ? (
            <p className="rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-10 text-sm text-white/40">
              No leads in this filter yet.
            </p>
          ) : (
            items.map((lead) => {
              const selected = lead.id === activeId;
              return (
                <button
                  key={lead.id}
                  type="button"
                  onClick={() => setActiveId(lead.id)}
                  className={`w-full rounded-2xl border p-5 text-left transition ${
                    selected
                      ? "border-cyan/40 bg-cyan/[0.08]"
                      : "border-white/10 bg-[#0a0e12] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-white">
                        {lead.name} · {lead.company}
                      </p>
                      <p className="mt-1 truncate text-sm text-white/45">{lead.service}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${statusTone[lead.status]}`}
                    >
                      {lead.status}
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/55">
                    {lead.brief}
                  </p>
                  <p className="mt-3 text-xs text-white/30">
                    {formatDate(lead.createdAt)} · {lead.source}
                    {lead.budget ? ` · ${lead.budget}` : ""}
                  </p>
                </button>
              );
            })
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0a0e12] p-5 sm:p-6 lg:sticky lg:top-24 lg:self-start">
          {!active ? (
            <div className="flex min-h-[320px] items-center justify-center text-sm text-white/35">
              Select a lead to view details
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cyan">
                  Lead detail
                </p>
                <h2 className="serif mt-2 text-3xl text-white">{active.name}</h2>
                <p className="mt-1 text-sm text-white/45">{active.company}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
                  <p className="text-[0.65rem] uppercase tracking-[0.14em] text-white/30">
                    Service
                  </p>
                  <p className="mt-1 text-sm text-white">{active.service}</p>
                </div>
                <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
                  <p className="text-[0.65rem] uppercase tracking-[0.14em] text-white/30">
                    Source
                  </p>
                  <p className="mt-1 text-sm capitalize text-white">{active.source}</p>
                </div>
                <a
                  href={`mailto:${active.email}`}
                  className="rounded-xl border border-white/8 bg-white/[0.02] p-3 transition hover:border-cyan/30"
                >
                  <p className="text-[0.65rem] uppercase tracking-[0.14em] text-white/30">
                    Email
                  </p>
                  <p className="mt-1 truncate text-sm text-cyan">{active.email}</p>
                </a>
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/${active.mobile.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-xl border border-white/8 bg-white/[0.02] p-3 transition hover:border-cyan/30"
                  >
                    <p className="text-[0.65rem] uppercase tracking-[0.14em] text-white/30">
                      WhatsApp
                    </p>
                    <p className="mt-1 text-sm text-cyan truncate">{active.mobile}</p>
                  </a>
                  <a
                    href={`tel:${active.mobile.replace(/[^\d+]/g, "")}`}
                    className="rounded-xl border border-white/8 bg-white/[0.02] p-3 transition hover:border-cyan/30 flex items-center justify-center text-xs font-semibold text-cyan hover:bg-cyan/10"
                    title="Call Phone"
                  >
                    Call
                  </a>
                </div>
              </div>

              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.14em] text-white/30">
                  Brief
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/70 whitespace-pre-wrap">
                  {active.brief}
                </p>
              </div>

              {(active.hasWebsite ||
                active.websiteUrl ||
                active.launchTimeline ||
                active.budget) && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {active.hasWebsite ? (
                    <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
                      <p className="text-[0.65rem] uppercase tracking-[0.14em] text-white/30">
                        Existing website
                      </p>
                      <p className="mt-1 text-sm capitalize text-white">{active.hasWebsite}</p>
                    </div>
                  ) : null}
                  {active.launchTimeline ? (
                    <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
                      <p className="text-[0.65rem] uppercase tracking-[0.14em] text-white/30">
                        Launch timeline
                      </p>
                      <p className="mt-1 text-sm text-white">
                        {active.launchTimeline === "urgent"
                          ? "URGENT"
                          : active.launchTimeline === "2-4-weeks"
                            ? "2–4 weeks"
                            : active.launchTimeline === "1-2-months"
                              ? "1–2 months"
                              : active.launchTimeline === "exploring"
                                ? "Just exploring"
                                : active.launchTimeline}
                      </p>
                    </div>
                  ) : null}
                  {active.budget ? (
                    <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
                      <p className="text-[0.65rem] uppercase tracking-[0.14em] text-white/30">
                        Budget
                      </p>
                      <p className="mt-1 text-sm text-white">{active.budget}</p>
                    </div>
                  ) : null}
                  {active.websiteUrl ? (
                    <a
                      href={
                        active.websiteUrl.startsWith("http")
                          ? active.websiteUrl
                          : `https://${active.websiteUrl}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-white/8 bg-white/[0.02] p-3 transition hover:border-cyan/30 sm:col-span-2"
                    >
                      <p className="text-[0.65rem] uppercase tracking-[0.14em] text-white/30">
                        Website / reference
                      </p>
                      <p className="mt-1 truncate text-sm text-cyan">{active.websiteUrl}</p>
                    </a>
                  ) : null}
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-sm text-white/55">Status</label>
                <select
                  value={active.status}
                  disabled={saving}
                  onChange={(e) =>
                    onStatusChange(active.id, e.target.value as LeadStatus)
                  }
                  className="input-field"
                >
                  {STATUS_OPTIONS.filter((s) => s.id !== "all").map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm text-white/55">Internal notes</label>
                <textarea
                  rows={4}
                  value={notesDraft}
                  onChange={(e) => setNotesDraft(e.target.value)}
                  className="input-field resize-y"
                  placeholder="Call notes, next steps…"
                />
                <button
                  type="button"
                  onClick={onSaveNotes}
                  disabled={saving}
                  className="btn-svc mt-3 text-white disabled:opacity-50"
                  style={{ background: "linear-gradient(90deg, #00c8d4, #3BA7FF)" }}
                >
                  {saving ? "Saving…" : "Save notes"}
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-4">
                <p className="text-xs text-white/30">{formatDate(active.createdAt)}</p>
                <button
                  type="button"
                  onClick={() => onDelete(active.id)}
                  className="rounded-lg border border-red-500/25 px-3 py-1.5 text-sm text-red-300/80 transition hover:border-red-400/50 hover:text-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
