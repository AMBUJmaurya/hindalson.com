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

/** Marketing — bold campaign / funnel energy layout */
export function MarketingServiceLayout({ service }: { service: ServiceData }) {
  const { theme } = service;
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setPulse((p) => (p + 1) % 3), 1800);
    return () => window.clearInterval(id);
  }, []);

  const funnel = ["Awareness", "Traffic", "Leads"];

  return (
    <div>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 10% 80%, ${theme.accentGlow}, transparent 45%),
              radial-gradient(ellipse 40% 35% at 90% 10%, ${theme.accentSoft}, transparent 45%),
              linear-gradient(160deg, #19232d 0%, #151d25 50%, #10151c 100%)
            `,
          }}
        />
        <div className="container-page relative z-[1] py-16 sm:py-20">
          <ServiceBreadcrumb title={service.title} accent={theme.accent} />

          <div className="max-w-4xl">
            <p
              className="text-[0.7rem] font-semibold uppercase tracking-[0.28em]"
              style={{ color: theme.accent }}
            >
              {service.num} · Performance ads
            </p>
            <h1 className="display mt-5 text-5xl font-bold leading-[0.98] tracking-tight text-white sm:text-7xl md:text-[5.5rem]">
              Ads that chase{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${theme.accent}, #fff3d6)`,
                }}
              >
                real demand
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{service.subhead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#lead"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-4 text-base font-bold"
                style={{ background: theme.accent, color: "#1a1208" }}
              >
                Get a Free Ad Audit →
              </Link>
              <a href="mailto:hello@hindalson.com" className="btn-secondary">
                Email Us
              </a>
            </div>
          </div>

          {/* Funnel visual */}
          <div className="mt-16 grid gap-3 sm:grid-cols-3">
            {funnel.map((stage, i) => (
              <div
                key={stage}
                className="relative overflow-hidden rounded-2xl border p-6 transition duration-500"
                style={{
                  borderColor: pulse === i ? `${theme.accent}88` : "rgba(255,255,255,0.08)",
                  background:
                    pulse === i
                      ? `linear-gradient(160deg, ${theme.gradientFrom}, #151d25)`
                      : "#151d25",
                  transform: pulse === i ? "translateY(-4px)" : "none",
                }}
              >
                <p className="text-xs uppercase tracking-[0.18em] text-white/35">Stage 0{i + 1}</p>
                <p className="display mt-3 text-2xl font-bold text-white">{stage}</p>
                <div
                  className="mt-5 h-1 rounded-full"
                  style={{
                    width: `${100 - i * 22}%`,
                    background: theme.accent,
                    opacity: pulse === i ? 1 : 0.35,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings as campaign cards */}
      <section className="section-pad">
        <div className="container-page">
          <h2 className="display text-3xl font-bold text-white sm:text-5xl">
            Campaign systems
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {service.offerings.map((item, i) => (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-[1.4rem] border border-white/10 p-8"
                style={{
                  background: `linear-gradient(${135 + i * 20}deg, ${theme.gradientFrom}, #151d25)`,
                }}
              >
                <div
                  aria-hidden
                  className="absolute -right-6 top-6 display text-7xl font-bold opacity-[0.07] text-white"
                >
                  0{i + 1}
                </div>
                <p className="text-xs font-semibold tracking-[0.16em]" style={{ color: theme.accent }}>
                  Channel
                </p>
                <h3 className="display relative mt-3 text-2xl font-bold text-white sm:text-3xl">
                  {item.title}
                </h3>
                <p className="relative mt-3 max-w-md text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Includes + process split */}
      <section
        className="border-y border-white/8 section-pad"
        style={{ background: "#151d25" }}
      >
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="display text-3xl font-bold text-white">Inside every retainer</h2>
            <div className="mt-8 space-y-4">
              {service.includes.map((item) => (
                <div key={item.title} className="border-l-2 pl-4" style={{ borderColor: theme.accent }}>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="display text-3xl font-bold text-white">How campaigns move</h2>
            <ol className="mt-8 space-y-5">
              {service.process.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    className="display flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                    style={{ background: theme.accentSoft, color: theme.accent }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-white">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <div className="flex flex-wrap gap-3">
            {service.tools.map((t) => (
              <span
                key={t}
                className="rounded-lg border px-4 py-2.5 text-sm font-medium text-white/75"
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
