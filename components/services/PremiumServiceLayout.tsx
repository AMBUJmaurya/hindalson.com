"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ServiceData } from "@/data/services";
import { servicesData, getOtherServices } from "@/data/services";
import { ServiceFaq } from "@/components/services/ServiceFaq";

function ServiceSwitcher({ current }: { current: string }) {
  return (
    <div className="mb-10 flex flex-wrap gap-2">
      {servicesData.map((s) => {
        const active = s.slug === current;
        return (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="rounded-full border px-4 py-2 text-sm font-medium transition"
            style={
              active
                ? {
                    borderColor: `${s.theme.accent}88`,
                    background: s.theme.accentSoft,
                    color: "#fff",
                    boxShadow: `0 0 24px ${s.theme.accentGlow}`,
                  }
                : {
                    borderColor: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.45)",
                  }
            }
          >
            <span className="mr-1.5 opacity-60">{s.num}</span>
            {s.short}
          </Link>
        );
      })}
    </div>
  );
}

function Headline({ service }: { service: ServiceData }) {
  const accent = service.headlineAccent;
  if (!accent || !service.headline.includes(accent)) {
    return (
      <h1 className="serif mt-4 max-w-2xl text-4xl text-white sm:text-5xl md:text-[3.4rem]">
        {service.headline}
      </h1>
    );
  }
  const [before, after] = service.headline.split(accent);
  return (
    <h1 className="serif mt-4 max-w-2xl text-4xl text-white sm:text-5xl md:text-[3.4rem]">
      {before}
      <span
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(90deg, #fff, ${service.theme.accent})`,
        }}
      >
        {accent}
      </span>
      {after}
    </h1>
  );
}

function WebVisual({ accent, soft }: { accent: string; soft: string }) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-8 rounded-full blur-3xl" style={{ background: soft }} />
      <div
        className="animate-float relative overflow-hidden rounded-2xl border bg-[#151d25] shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
        style={{ borderColor: `${accent}55` }}
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="ml-2 rounded-md bg-white/5 px-2 py-1 text-[10px] text-white/40">
            hindalson.com
          </span>
        </div>
        <div className="space-y-3 p-5">
          <div className="h-24 rounded-xl" style={{ background: `linear-gradient(135deg, ${soft}, transparent)` }} />
          <div className="grid grid-cols-3 gap-2">
            {["SEO", "CMS", "LCP"].map((t) => (
              <div key={t} className="rounded-lg border border-white/10 px-2 py-3 text-center text-[11px] font-semibold text-white/70">
                {t}
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-white/10 px-3 py-3 text-xs text-white/50">
            Lead form · WhatsApp · Analytics
          </div>
        </div>
      </div>
      <div
        className="absolute -bottom-4 -right-2 w-28 overflow-hidden rounded-2xl border bg-[#151d25] p-2 shadow-xl"
        style={{ borderColor: `${accent}66` }}
      >
        <div className="h-40 rounded-xl" style={{ background: soft }} />
      </div>
    </div>
  );
}

function AppVisual({ accent, soft }: { accent: string; soft: string }) {
  return (
    <div className="relative mx-auto flex max-w-sm justify-center gap-4">
      <div className="absolute inset-0 rounded-full blur-3xl" style={{ background: soft }} />
      {[0, 1].map((i) => (
        <div
          key={i}
          className={`animate-float relative w-[140px] overflow-hidden rounded-[1.6rem] border bg-[#19232d] p-2 ${
            i === 1 ? "mt-8" : ""
          }`}
          style={{ borderColor: `${accent}66`, animationDelay: `${i * 0.4}s` }}
        >
          <div className="mx-auto mb-2 h-3 w-16 rounded-full bg-black/40" />
          <div className="space-y-2 rounded-[1.2rem] p-3" style={{ background: soft }}>
            <div className="h-16 rounded-lg bg-white/5" />
            <div className="h-2 w-2/3 rounded bg-white/20" />
            <div className="h-2 w-1/2 rounded bg-white/10" />
          </div>
        </div>
      ))}
      {["UI/UX", "API", "iOS"].map((t, i) => (
        <span
          key={t}
          className="absolute rounded-full border px-2.5 py-1 text-[10px] font-semibold text-white/80"
          style={{
            borderColor: `${accent}55`,
            background: "#19232dcc",
            top: `${20 + i * 28}%`,
            left: i === 1 ? "2%" : "75%",
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function SeoVisual({ accent, soft }: { accent: string; soft: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-[1.5rem] border p-7 sm:p-8"
      style={{ borderColor: `${accent}55`, background: `linear-gradient(145deg, #151d25, #10151c)`, boxShadow: `0 0 60px ${soft}` }}
    >
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>
        Included every month
      </p>
      <p className="serif mt-3 text-3xl text-white sm:text-4xl">
        Proper SEO — <span style={{ color: accent }}>not a checkbox.</span>
      </p>
      <p className="mt-3 text-sm text-muted">
        Rankings, content, technical fixes, and reporting — consistent monthly care.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {["Technical SEO", "On-page", "Content", "Security", "Reports"].map((t) => (
          <span key={t} className="tag-pill" style={{ borderColor: `${accent}44`, color: accent }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function MarketingVisual({ accent, soft }: { accent: string; soft: string }) {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-full blur-3xl" style={{ background: soft }} />
      <div
        className="relative mx-auto flex h-56 w-56 items-center justify-center rounded-full border"
        style={{ borderColor: `${accent}55`, boxShadow: `0 0 50px ${soft}` }}
      >
        <div className="absolute inset-6 rounded-full border" style={{ borderColor: `${accent}33` }} />
        <div className="absolute inset-12 rounded-full border" style={{ borderColor: `${accent}22` }} />
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">Focus</p>
          <p className="serif mt-1 text-3xl" style={{ color: accent }}>
            Leads
          </p>
        </div>
      </div>
      <div className="relative mt-6 grid grid-cols-4 gap-2 text-center">
        {[
          { l: "Impr.", v: "—" },
          { l: "Clicks", v: "—" },
          { l: "Leads", v: "—" },
          { l: "Qualified", v: "—" },
        ].map((x) => (
          <div key={x.l} className="rounded-xl border border-white/10 bg-black/30 px-2 py-3">
            <p className="text-[10px] text-white/40">{x.l}</p>
            <p className="mt-1 text-sm font-semibold text-white">{x.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PremiumServiceLayout({ service }: { service: ServiceData }) {
  const { theme } = service;
  const others = getOtherServices(service.slug);
  const [activeProcess, setActiveProcess] = useState(0);
  const [activeOffer, setActiveOffer] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveProcess((i) => (i + 1) % service.process.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [service.process.length]);

  return (
    <div
      className="svc-grain relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 55% 40% at 70% 10%, ${theme.accentGlow}, transparent 50%),
          radial-gradient(ellipse 40% 35% at 10% 60%, ${theme.accentSoft}, transparent 50%),
          #10151c
        `,
      }}
    >
      {/* HERO */}
      <section className="relative z-[1]">
        <div className="container-page py-12 sm:py-16">
          <ServiceSwitcher current={service.slug} />

          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p
                className="text-[0.72rem] font-semibold uppercase tracking-[0.22em]"
                style={{ color: theme.accent }}
              >
                {service.eyebrow}
              </p>
              <Headline service={service} />
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/55 sm:text-lg">
                {service.subhead}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/#lead"
                  className="btn-svc text-white"
                  style={{
                    background: theme.buttonGradient,
                    boxShadow: `0 10px 40px ${theme.accentGlow}`,
                  }}
                >
                  {service.ctaLabel} →
                </Link>
                <a
                  href="https://wa.me/8619806710053?text=Hi%20Hindalson%2C%20I%27d%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-svc-ghost"
                  style={{ borderColor: `${theme.accent}55` }}
                >
                  WhatsApp
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag-pill"
                    style={{ borderColor: `${theme.accent}40`, color: `${theme.accent}` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative py-4">
              {service.slug === "website-development" && (
                <WebVisual accent={theme.accent} soft={theme.accentSoft} />
              )}
              {service.slug === "app-development" && (
                <AppVisual accent={theme.accent} soft={theme.accentSoft} />
              )}
              {service.slug === "monthly-management" && (
                <SeoVisual accent={theme.accent} soft={theme.accentSoft} />
              )}
              {service.slug === "performance-marketing" && (
                <MarketingVisual accent={theme.accent} soft={theme.accentSoft} />
              )}
            </div>
          </div>

          <div className="mt-14 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            {service.stats.map((stat) => (
              <div key={stat.label}>
                <p className="serif text-2xl text-white sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCOPE */}
      <section className="relative z-[1] border-y border-white/8 section-pad">
        <div className="container-page">
          <p
            className="text-[0.7rem] font-semibold uppercase tracking-[0.22em]"
            style={{ color: theme.accent }}
          >
            Scope
          </p>
          <h2 className="serif mt-3 text-3xl text-white sm:text-5xl">
            {service.slug === "app-development"
              ? "Product stack included"
              : service.slug === "monthly-management"
                ? "Included every month"
                : "What we design & ship"}
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {service.offerings.map((item, i) => {
              const active = i === activeOffer;
              return (
                <button
                  key={item.title}
                  type="button"
                  onMouseEnter={() => setActiveOffer(i)}
                  onClick={() => setActiveOffer(i)}
                  className="rounded-2xl border p-6 text-left transition duration-300 sm:p-7"
                  style={{
                    borderColor: active ? `${theme.accent}88` : "rgba(255,255,255,0.08)",
                    background: active ? theme.accentSoft : "rgba(255,255,255,0.02)",
                    boxShadow: active ? `0 0 40px ${theme.accentGlow}` : "none",
                  }}
                >
                  <p className="text-xs font-semibold" style={{ color: theme.accent }}>
                    0{i + 1}
                  </p>
                  <h3 className="serif mt-3 text-2xl text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{item.text}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* INCLUDES for management / apps as alternate */}
      {service.slug !== "website-development" && (
        <section className="relative z-[1] section-pad">
          <div className="container-page">
            <p
              className="text-[0.7rem] font-semibold uppercase tracking-[0.22em]"
              style={{ color: theme.accent }}
            >
              Included
            </p>
            <h2 className="serif mt-3 text-3xl text-white sm:text-4xl">
              {service.slug === "app-development" ? "Product stack included" : "What you get"}
            </h2>
            <div className="mt-8 space-y-3">
              {service.includes.map((item, i) => {
                const active = i === activeOffer % service.includes.length;
                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 rounded-2xl border px-5 py-4 transition"
                    style={{
                      borderColor: active ? `${theme.accent}66` : "rgba(255,255,255,0.08)",
                      background: active ? theme.accentSoft : "rgba(255,255,255,0.02)",
                    }}
                    onMouseEnter={() => setActiveOffer(i)}
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                      style={{
                        background: active ? theme.accent : "transparent",
                        color: active ? "#061018" : theme.accent,
                        border: active ? "none" : `1px solid ${theme.accent}55`,
                        boxShadow: active ? `0 0 20px ${theme.accentGlow}` : "none",
                      }}
                    >
                      0{i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="mt-0.5 text-sm text-white/45">{item.text}</p>
                    </div>
                    {active && (
                      <span className="h-2 w-2 rounded-full" style={{ background: theme.accent }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* PROCESS */}
      <section className="relative z-[1] border-y border-white/8 section-pad">
        <div className="container-page max-w-3xl">
          <p
            className="text-[0.7rem] font-semibold uppercase tracking-[0.22em]"
            style={{ color: theme.accent }}
          >
            Process
          </p>
          <h2 className="serif mt-3 text-3xl text-white sm:text-5xl">How we run it</h2>
          <div className="relative mt-10">
            <div
              className="absolute bottom-4 left-[19px] top-4 w-px"
              style={{ background: `${theme.accent}33` }}
            />
            <div
              className="absolute left-[19px] top-4 w-px transition-all duration-700"
              style={{
                background: theme.accent,
                height: `${((activeProcess + 1) / service.process.length) * 100}%`,
                maxHeight: "calc(100% - 2rem)",
              }}
            />
            <ol className="space-y-3">
              {service.process.map((step, i) => {
                const active = i === activeProcess;
                return (
                  <li key={step.title}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveProcess(i)}
                      onClick={() => setActiveProcess(i)}
                      className="relative flex w-full items-start gap-4 rounded-2xl border px-4 py-5 text-left transition sm:px-5"
                      style={{
                        borderColor: active ? `${theme.accent}44` : "rgba(255,255,255,0.06)",
                        background: active ? "rgba(255,255,255,0.03)" : "transparent",
                      }}
                    >
                      <span
                        className="relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                        style={{
                          background: active ? theme.accent : "#0a0c10",
                          color: active ? "#061018" : theme.accent,
                          border: `1px solid ${theme.accent}66`,
                          boxShadow: active ? `0 0 24px ${theme.accentGlow}` : "none",
                        }}
                      >
                        0{i + 1}
                      </span>
                      <div>
                        <h3 className="serif text-xl text-white sm:text-2xl">{step.title}</h3>
                        <p className="mt-1 text-sm text-white/45">{step.text}</p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-[1] section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p
              className="text-[0.7rem] font-semibold uppercase tracking-[0.22em]"
              style={{ color: theme.accent }}
            >
              FAQ
            </p>
            <h2 className="serif mt-3 text-3xl text-white sm:text-5xl">Before you book</h2>
            <p className="mt-4 text-sm text-white/45">{service.ctaText}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#lead"
                className="btn-svc text-white"
                style={{
                  background: theme.buttonGradient,
                  boxShadow: `0 10px 40px ${theme.accentGlow}`,
                }}
              >
                {service.ctaLabel} →
              </Link>
              <a
                href="https://wa.me/8619806710053"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-svc-ghost"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <ServiceFaq faqs={service.faqs} accent={theme.accent} />
        </div>
      </section>

      {/* CONTINUE */}
      <section className="relative z-[1] border-t border-white/8 section-pad">
        <div className="container-page">
          <p
            className="text-[0.7rem] font-semibold uppercase tracking-[0.22em]"
            style={{ color: theme.accent }}
          >
            Continue exploring
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition hover:-translate-y-1"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <p className="text-xs font-semibold" style={{ color: item.theme.accent }}>
                  {item.num} · {item.short}
                </p>
                <h3 className="serif mt-3 text-2xl text-white">{item.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-white/40">{item.subhead}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
