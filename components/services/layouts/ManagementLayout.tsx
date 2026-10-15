"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ServiceData } from "@/data/services";
import {
  ServiceBreadcrumb,
  ServiceCta,
  ServiceFaqBlock,
  ServiceOthers,
} from "@/components/services/ServiceShared";

/** Monthly SEO — growth dashboard / scorecard layout */
export function ManagementServiceLayout({ service }: { service: ServiceData }) {
  const { theme } = service;
  const [score, setScore] = useState(42);

  useEffect(() => {
    const id = window.setInterval(() => {
      setScore((s) => (s >= 88 ? 42 : s + 2));
    }, 120);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div>
      <section
        className="relative overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 80% 10%, ${theme.accentGlow}, transparent 50%),
            linear-gradient(180deg, #151d25 0%, #151d25 45%, #10151c 100%)
          `,
        }}
      >
        <div className="container-page relative z-[1] py-14 sm:py-16">
          <ServiceBreadcrumb title={service.title} accent={theme.accent} />

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <div className="flex flex-col justify-center">
              <p
                className="text-[0.7rem] font-semibold uppercase tracking-[0.26em]"
                style={{ color: theme.accent }}
              >
                {service.num} · SEO retainer
              </p>
              <h1 className="display mt-5 text-4xl font-bold leading-[1.05] text-white sm:text-6xl">
                Rankings that{" "}
                <span className="block" style={{ color: theme.accent }}>
                  compound monthly
                </span>
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
                {service.subhead}
              </p>
              <Link
                href="/#lead"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg px-5 py-3.5 font-bold"
                style={{ background: theme.accent, color: "#06140f" }}
              >
                Start Monthly Plan →
              </Link>
            </div>

            {/* Scorecard */}
            <div
              className="animate-rise relative overflow-hidden rounded-[1.6rem] border p-7 sm:p-8"
              style={{
                borderColor: `${theme.accent}55`,
                background: `linear-gradient(160deg, ${theme.gradientFrom}, #151d25)`,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">SEO health</p>
                  <p className="display mt-2 text-6xl font-bold tabular-nums" style={{ color: theme.accent }}>
                    {score}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-right">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-white/40">Focus</p>
                  <p className="mt-1 text-sm font-semibold text-white">Technical + Content</p>
                </div>
              </div>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full transition-all duration-200"
                  style={{ width: `${score}%`, background: theme.accent }}
                />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {service.includes.slice(0, 4).map((item) => (
                  <div key={item.title} className="rounded-xl border border-white/8 bg-black/25 p-3">
                    <p className="text-xs font-semibold text-white">{item.title}</p>
                    <p className="mt-1 line-clamp-2 text-[11px] text-muted">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist offerings */}
      <section className="section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="display text-3xl font-bold text-white sm:text-4xl">
              What monthly care covers
            </h2>
            <p className="mt-4 text-muted">{service.intro[0]}</p>
            <p className="mt-4 text-muted">{service.intro[1]}</p>
          </div>
          <ul className="space-y-3">
            {service.offerings.map((item) => (
              <li
                key={item.title}
                className="flex gap-4 rounded-2xl border border-white/8 bg-[#151d25] p-5"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                  style={{ background: theme.accentSoft, color: theme.accent }}
                >
                  ✓
                </span>
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Monthly cycle */}
      <section
        className="border-y border-white/8 section-pad"
        style={{ background: "#151d25" }}
      >
        <div className="container-page">
          <h2 className="display text-center text-3xl font-bold text-white sm:text-4xl">
            The monthly cycle
          </h2>
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-5">
            {service.process.map((step, i) => (
              <div key={step.title} className="text-center">
                <div
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold"
                  style={{
                    background: i % 2 === 0 ? theme.accent : theme.accentSoft,
                    color: i % 2 === 0 ? "#06140f" : theme.accent,
                  }}
                >
                  {i + 1}
                </div>
                <h3 className="mt-4 text-sm font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <h2 className="display text-2xl font-bold text-white">Tools we use</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {service.tools.map((t) => (
              <span
                key={t}
                className="rounded-lg border px-4 py-2 text-sm text-white/75"
                style={{ borderColor: `${theme.accent}44`, background: theme.accentSoft }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaqBlock service={service} />
      <ServiceOthers service={service} />
      <ServiceCta service={service} />
    </div>
  );
}
