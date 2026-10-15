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

/** Website — cinematic browser / editorial layout */
export function WebsiteServiceLayout({ service }: { service: ServiceData }) {
  const { theme } = service;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % service.offerings.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, [service.offerings.length]);

  return (
    <div>
      <section className="relative min-h-[88vh] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 70% 20%, ${theme.accentGlow}, transparent 50%),
              linear-gradient(180deg, #151d25 0%, #151d25 40%, #10151c 100%)
            `,
          }}
        />
        <div className="container-page relative z-[1] py-14 sm:py-16">
          <ServiceBreadcrumb title={service.title} accent={theme.accent} />
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="animate-rise">
              <p
                className="text-[0.7rem] font-semibold uppercase tracking-[0.28em]"
                style={{ color: theme.accent }}
              >
                {service.num} · Website craft
              </p>
              <h1 className="display mt-5 text-[2.6rem] font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[4rem]">
                Design that{" "}
                <span style={{ color: theme.accent }}>sells</span>
                <br />
                Code that{" "}
                <span className="text-white/40">lasts</span>
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{service.subhead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/#lead"
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-3.5 font-bold text-[#061315] transition hover:-translate-y-0.5"
                  style={{ background: theme.accent }}
                >
                  Get a Free Proposal →
                </Link>
                <Link href="/portfolio" className="btn-secondary">
                  View Work
                </Link>
              </div>
            </div>

            {/* Browser stage */}
            <div className="animate-rise-delay-2 animate-float relative">
              <div
                className="overflow-hidden rounded-2xl border shadow-[0_40px_100px_rgba(0,0,0,0.55)]"
                style={{ borderColor: `${theme.accent}44` }}
              >
                <div className="flex items-center gap-2 border-b border-white/10 bg-[#151d25] px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="ml-3 rounded-md bg-white/5 px-3 py-1 text-[11px] text-white/40">
                    yourbrand.com
                  </span>
                </div>
                <div
                  className="relative min-h-[320px] p-6 sm:min-h-[380px] sm:p-8"
                  style={{
                    background: `linear-gradient(160deg, ${theme.gradientFrom}, #10151c)`,
                  }}
                >
                  <div className="animate-scan absolute inset-x-0 top-0 h-24 opacity-50" style={{ background: `linear-gradient(180deg, ${theme.accentSoft}, transparent)` }} />
                  <p className="text-xs uppercase tracking-[0.2em]" style={{ color: theme.accent }}>
                    {service.offerings[active].title}
                  </p>
                  <p className="display mt-4 max-w-sm text-3xl font-bold text-white sm:text-4xl">
                    {service.offerings[active].text}
                  </p>
                  <div className="mt-10 grid grid-cols-3 gap-3">
                    {["Fast", "SEO", "Convert"].map((t) => (
                      <div key={t} className="rounded-xl border border-white/10 bg-black/30 px-3 py-4 text-center">
                        <p className="text-sm font-semibold text-white">{t}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-2">
                    {service.offerings.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Show offering ${i + 1}`}
                        onClick={() => setActive(i)}
                        className="h-1.5 flex-1 rounded-full transition"
                        style={{
                          background: i === active ? theme.accent : "rgba(255,255,255,0.12)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial intro */}
      <section className="border-y border-white/8 bg-[#10151c] section-pad">
        <div className="container-page columns-1 gap-10 md:columns-2">
          {service.intro.map((p) => (
            <p key={p.slice(0, 20)} className="mb-6 text-lg leading-relaxed text-muted break-inside-avoid">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Includes as horizontal strips */}
      <section className="section-pad">
        <div className="container-page">
          <h2 className="display text-3xl font-bold text-white sm:text-5xl">
            What’s <span style={{ color: theme.accent }}>included</span>
          </h2>
          <div className="mt-10 space-y-3">
            {service.includes.map((item, i) => (
              <div
                key={item.title}
                className="group flex flex-col gap-3 rounded-2xl border border-white/8 bg-[#151d25] px-6 py-6 transition hover:border-white/15 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-5">
                  <span className="display text-3xl font-bold" style={{ color: `${theme.accent}55` }}>
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="display text-xl font-bold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted">{item.text}</p>
                  </div>
                </div>
                <span
                  className="hidden h-10 w-10 items-center justify-center rounded-full border text-sm sm:flex"
                  style={{ borderColor: `${theme.accent}55`, color: theme.accent }}
                >
                  →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process as connected rail */}
      <section className="border-y border-white/8 bg-[#10151c] section-pad">
        <div className="container-page">
          <h2 className="display text-3xl font-bold text-white sm:text-4xl">Build path</h2>
          <div className="mt-10 overflow-x-auto pb-2">
            <ol className="flex min-w-max gap-0">
              {service.process.map((step, i) => (
                <li key={step.title} className="relative w-[220px] px-4">
                  {i < service.process.length - 1 && (
                    <span
                      className="absolute left-[60%] top-5 h-px w-[80%]"
                      style={{ background: `${theme.accent}44` }}
                    />
                  )}
                  <div
                    className="relative z-[1] flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                    style={{ background: theme.accent, color: "#061315" }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="display mt-4 text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <h2 className="display text-3xl font-bold text-white">Stack</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {service.tools.map((t) => (
              <span
                key={t}
                className="rounded-full border px-4 py-2 text-sm text-white/70"
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
