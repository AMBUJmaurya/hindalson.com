"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  createTestimonial,
  deleteTestimonial,
  fetchAllTestimonials,
  setTestimonialPublished,
  updateTestimonial,
  type AdminTestimonial,
} from "@/lib/api";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";

const emptyForm = {
  quote: "",
  name: "",
  business: "",
  focus: "",
  rating: 5,
  isPublished: true,
};

export default function AdminTestimonialsPage() {
  const { token } = useAdminAuth();
  const [items, setItems] = useState<AdminTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const data = await fetchAllTestimonials(token);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  function startEdit(item: AdminTestimonial) {
    setEditingId(item.id);
    setForm({
      quote: item.quote,
      name: item.name,
      business: item.business,
      focus: item.focus,
      rating: item.rating || 5,
      isPublished: item.isPublished,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    setError("");
    try {
      if (editingId) {
        await updateTestimonial(token, editingId, form);
      } else {
        await createTestimonial(token, form);
      }
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function togglePublish(item: AdminTestimonial) {
    if (!token) return;
    try {
      await setTestimonialPublished(token, item.id, !item.isPublished);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  }

  async function onDelete(id: string) {
    if (!token) return;
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await deleteTestimonial(token, id);
      if (editingId === id) resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <AdminPageHeader
        eyebrow="Content"
        title="Testimonials"
        description="Create, edit, publish, or hide client voices shown on the homepage."
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

      {error ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <form
        onSubmit={onSubmit}
        className="admin-rise-d1 grid gap-4 rounded-2xl border border-white/10 bg-[#0a0e12]/90 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:p-6"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-white">
            {editingId ? "Edit testimonial" : "Add testimonial"}
          </h2>
          {editingId ? (
            <button
              type="button"
              onClick={resetForm}
              className="text-sm text-white/45 transition hover:text-white"
            >
              Cancel edit
            </button>
          ) : null}
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-white/55">Quote</label>
          <textarea
            required
            rows={4}
            value={form.quote}
            onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
            className="input-field resize-y"
            placeholder="Client quote…"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm text-white/55">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="input-field"
              placeholder="Client name / role"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-white/55">Business</label>
            <input
              required
              value={form.business}
              onChange={(e) => setForm((f) => ({ ...f, business: e.target.value }))}
              className="input-field"
              placeholder="Company name"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-white/55">Focus</label>
            <input
              required
              value={form.focus}
              onChange={(e) => setForm((f) => ({ ...f, focus: e.target.value }))}
              className="input-field"
              placeholder="Website / SEO / …"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-white/55">Rating</label>
            <select
              value={form.rating}
              onChange={(e) =>
                setForm((f) => ({ ...f, rating: Number(e.target.value) }))
              }
              className="input-field"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} stars
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-white/60">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))}
            className="h-4 w-4 accent-cyan"
          />
          Published on website
        </label>

        <button
          type="submit"
          disabled={saving}
          className="btn-svc w-full text-white sm:w-auto disabled:opacity-50"
          style={{ background: "linear-gradient(90deg, #00c8d4, #3BA7FF)" }}
        >
          {saving ? "Saving…" : editingId ? "Update testimonial" : "Add testimonial"}
        </button>
      </form>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white">
          All testimonials ({items.length})
        </h2>
        {loading ? (
          <p className="text-sm text-white/40">Loading…</p>
        ) : items.length === 0 ? (
          <p className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-8 text-sm text-white/40">
            No testimonials yet. Add the first one above.
          </p>
        ) : (
          items.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-white/10 bg-[#0a0e12] p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-white">{item.business}</p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${
                        item.isPublished
                          ? "bg-cyan/15 text-cyan"
                          : "bg-white/10 text-white/40"
                      }`}
                    >
                      {item.isPublished ? "Published" : "Hidden"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-white/40">
                    {item.name} · {item.focus} · {item.rating || 5}★
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{item.quote}</p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className="rounded-lg border border-white/12 px-3 py-1.5 text-sm text-white/70 transition hover:border-cyan/40 hover:text-cyan"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => togglePublish(item)}
                    className="rounded-lg border border-white/12 px-3 py-1.5 text-sm text-white/70 transition hover:border-cyan/40 hover:text-cyan"
                  >
                    {item.isPublished ? "Hide" : "Publish"}
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    className="rounded-lg border border-red-500/25 px-3 py-1.5 text-sm text-red-300/80 transition hover:border-red-400/50 hover:text-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
