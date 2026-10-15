"use client";

import Link from "next/link";
import { useState } from "react";
import type { ServiceData } from "@/data/services";
import {
  ServiceBreadcrumb,
  ServiceCta,
  ServiceFaqBlock,
  ServiceOthers,
} from "@/components/services/ServiceShared";

/** App — device-first / product console layout */
export function AppServiceLayout({ service }: { service: ServiceData }) {
  const { theme } = service;
  const [tab, setTab] = useState(0);

  return (
    <div>
      <section
        className="relative overflow-hidden"
        style={{
          background: `radial-gradient(circle at 20% 20%, ${theme.accentGlow}, transparent 40%), linear-gradient(135deg, #151d25 0%, #10151c 50%, #10151c 100%)`,
        }}
      >
        <div className="container-page relative z-[1] py-14 sm:py-16">
          <ServiceBreadcrumb title={service.title} accent={theme.accent} />
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]"
                style={{ borderColor: `${theme.accent}55`, color: theme.accent, background: theme.accentSoft }}
              >
                {service.num} · Product build
              </div>
              <h1 className="display mt-6 text-4xl font-bold leading-[1.05] text-white sm:text-6xl">
                Apps that feel{" "}
                <span className="block" style={{ color: theme.accent }}>
                  native & useful
                </span>
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
                {service.subhead}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#lead"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-bold"
                  style={{ background: theme.accent, color: "#061018" }}
                >
                  Start App Brief →
                </Link>
                <a
                  href="https://wa.me/8619806710053"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Phone mock */}
            <div className="relative mx-auto w-full max-w-[280px]">
              <div
                aria-hidden
                className="absolute -inset-8 rounded-full blur-3xl"
                style={{ background: theme.accentSoft }}
              />
              <div
                className="animate-float relative overflow-hidden rounded-[2rem] border-[3px] bg-[#151d25] shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
                style={{ borderColor: `${theme.accent}66` }}
              >
                <div className="mx-auto mt-3 h-5 w-24 rounded-full bg-black/50" />
                <div className="space-y-3 p-5 pb-8">
                  <div
                    className="rounded-2xl p-4"
                    style={{ background: `linear-gradient(145deg, ${theme.gradientFrom}, #151d25)` }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: theme.accent }}>
                      {service.short} console
                    </p>
                    <p className="mt-2 text-xl font-bold text-white">{service.process[tab]?.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-white/55">
                      {service.process[tab]?.text}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {service.includes.slice(0, 4).map((item) => (
                      <div key={item.title} className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
                        <p className="text-[11px] font-semibold text-white">{item.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento includes */}
      <section className="section-pad">
        <div className="container-page">
          <h2 className="display text-3xl font-bold text-white sm:text-4xl">
            Built-in product quality
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-4 md:grid-rows-2">
            {service.includes.map((item, i) => (
              <article
                key={item.title}
                className={`rounded-3xl border border-white/10 p-6 ${
                  i === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
                style={{
                  background:
                    i === 0
                      ? `linear-gradient(160deg, ${theme.gradientFrom}, #151d25)`
                      : "#19232d",
                }}
              >
                <p className="text-xs font-semibold tracking-[0.16em]" style={{ color: theme.accent }}>
                  0{i + 1}
                </p>
                <h3 className={`display mt-3 font-bold text-white ${i === 0 ? "text-3xl" : "text-xl"}`}>
                  {item.title}
                </h3>
                <p className={`mt-3 text-muted ${i === 0 ? "text-base" : "text-sm"}`}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings tabs */}
      <section
        className="border-y border-white/8 section-pad"
        style={{ background: "#151d25" }}
      >
        <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-2">
            {service.offerings.map((item, i) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setTab(i)}
                className="block w-full rounded-xl border px-4 py-4 text-left transition"
                style={{
                  borderColor: tab === i ? `${theme.accent}66` : "rgba(255,255,255,0.08)",
                  background: tab === i ? theme.accentSoft : "transparent",
                }}
              >
                <span className={`font-semibold ${tab === i ? "text-white" : "text-white/50"}`}>
                  {item.title}
                </span>
              </button>
            ))}
          </div>
          <div
            key={service.offerings[tab].title}
            className="animate-rise rounded-3xl border p-8"
            style={{
              borderColor: `${theme.accent}44`,
              background: `linear-gradient(145deg, ${theme.gradientFrom}, #151d25)`,
            }}
          >
            <p className="text-xs uppercase tracking-[0.2em]" style={{ color: theme.accent }}>
              Platform focus
            </p>
            <h3 className="display mt-4 text-3xl font-bold text-white">
              {service.offerings[tab].title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {service.offerings[tab].text}
            </p>
          </div>
        </div>
      </section>

      {/* Process steps vertical */}
      <section className="section-pad">
        <div className="container-page max-w-3xl">
          <h2 className="display text-3xl font-bold text-white">From idea → store</h2>
          <ol className="relative mt-10 space-y-0 border-l border-white/10 pl-8">
            {service.process.map((step, i) => (
              <li key={step.title} className="relative pb-10 last:pb-0">
                <span
                  className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                  style={{ background: theme.accent, color: "#061018" }}
                >
                  {i + 1}
                </span>
                <h3 className="display text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-white/8 bg-[#151d25] section-pad">
        <div className="container-page flex flex-wrap gap-3">
          {service.tools.map((t) => (
            <span
              key={t}
              className="rounded-xl border px-4 py-2 text-sm text-white/70"
              style={{ borderColor: `${theme.accent}33`, background: theme.accentSoft }}
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <ServiceFaqBlock service={service} />
      <ServiceOthers service={service} />
      <ServiceCta service={service} />
    </div>
  );
}
