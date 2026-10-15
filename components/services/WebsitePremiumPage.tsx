"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ServiceData } from "@/data/services";
import { servicesData, getOtherServices } from "@/data/services";
import { ServiceFaq } from "@/components/services/ServiceFaq";

const floatLabels = [
  { text: "SEO", top: "8%", left: "2%" },
  { text: "CMS", top: "28%", right: "0%" },
  { text: "LCP", top: "58%", left: "-2%" },
  { text: "LEADS", top: "78%", right: "4%" },
];

export function WebsitePremiumPage({ service }: { service: ServiceData }) {
  const { theme } = service;
  const others = getOtherServices(service.slug);
  const [offer, setOffer] = useState(0);
  const [step, setStep] = useState(0);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const a = window.setInterval(() => setStep((s) => (s + 1) % service.process.length), 3000);
    const b = window.setInterval(() => setSlide((s) => (s + 1) % 3), 3500);
    return () => {
      window.clearInterval(a);
      window.clearInterval(b);
    };
  }, [service.process.length]);

  const slides = [
    { title: "Brand site", text: "Trust-first pages that convert visitors into calls." },
    { title: "Storefront", text: "Clean product flows with checkout clarity." },
    { title: "Campaign page", text: "Landing pages wired for ads & WhatsApp." },
  ];

  return (
    <div
      className="svc-grain relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 70% 55% at 85% 5%, ${theme.accentGlow}, transparent 52%),
          radial-gradient(ellipse 45% 40% at 5% 40%, rgba(123,108,255,0.12), transparent 50%),
          radial-gradient(ellipse 50% 35% at 50% 100%, ${theme.accentSoft}, transparent 55%),
          #10151c
        `,
      }}
    >
      {/* HERO */}
      <section className="relative z-[1]">
        <div className="container-page py-12 sm:py-16 lg:py-20">
          {/* Switcher */}
          <div className="mb-12 flex flex-wrap gap-2">
            {servicesData.map((s) => {
              const active = s.slug === service.slug;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="rounded-full border px-4 py-2 text-sm font-medium transition duration-300"
                  style={
                    active
                      ? {
                          borderColor: `${theme.accent}99`,
                          background: theme.accentSoft,
                          color: "#fff",
                          boxShadow: `0 0 28px ${theme.accentGlow}`,
                        }
                      : { borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }
                  }
                >
                  <span className="mr-1 opacity-50">{s.num}</span>
                  {s.short}
                </Link>
              );
            })}
          </div>

          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="animate-rise">
              <p
                className="text-[0.72rem] font-semibold uppercase tracking-[0.24em]"
                style={{ color: theme.accent }}
              >
                {service.eyebrow}
              </p>
              <h1 className="serif mt-5 max-w-xl text-[2.5rem] leading-[1.08] text-white sm:text-5xl md:text-[3.6rem]">
                Websites that look{" "}
                <em
                  className="not-italic bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(100deg, #fff 10%, ${theme.accent} 55%, #9B8CFF)`,
                  }}
                >
                  expensive
                </em>
                , load{" "}
                <em
                  className="not-italic bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(100deg, #fff, ${theme.accent})`,
                  }}
                >
                  fast
                </em>
                , and{" "}
                <em
                  className="not-italic bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(100deg, ${theme.accent}, #A5B4FC)`,
                  }}
                >
                  convert
                </em>
                .
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/50 sm:text-lg">
                {service.subhead}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/#lead"
                  className="btn-svc text-white"
                  style={{
                    background: theme.buttonGradient,
                    boxShadow: `0 12px 48px ${theme.accentGlow}`,
                  }}
                >
                  Get a website proposal →
                </Link>
                <a
                  href="https://wa.me/8619806710053?text=Hi%20Hindalson%2C%20I%20need%20a%20website."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-svc-ghost"
                  style={{ borderColor: `${theme.accent}55` }}
                >
                  WhatsApp
                </a>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag-pill transition hover:text-white"
                    style={{ borderColor: `${theme.accent}40`, color: theme.accent }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Dynamic visual stage */}
            <div className="animate-rise-delay-2 relative mx-auto w-full max-w-[480px]">
              <div
                aria-hidden
                className="animate-pulse-soft absolute -inset-10 rounded-full blur-3xl"
                style={{ background: theme.accentSoft }}
              />

              {floatLabels.map((label) => (
                <span
                  key={label.text}
                  className="absolute z-[2] rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white/80 backdrop-blur-sm"
                  style={{
                    top: label.top,
                    left: label.left,
                    right: label.right,
                    borderColor: `${theme.accent}55`,
                    background: "rgba(8,12,20,0.85)",
                    boxShadow: `0 0 16px ${theme.accentSoft}`,
                  }}
                >
                  {label.text}
                </span>
              ))}

              {/* Browser */}
              <div
                className="animate-float relative z-[1] overflow-hidden rounded-2xl border bg-[#151d25] shadow-[0_40px_100px_rgba(0,0,0,0.55)]"
                style={{ borderColor: `${theme.accent}66` }}
              >
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <span className="ml-3 rounded-md bg-white/5 px-3 py-1 text-[11px] text-white/40">
                    yourbrand.com
                  </span>
                </div>
                <div className="relative min-h-[280px] overflow-hidden p-5 sm:min-h-[300px] sm:p-6">
                  <div
                    className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-20"
                    style={{
                      background: `linear-gradient(180deg, ${theme.accentSoft}, transparent)`,
                    }}
                  />
                  <div
                    key={slide}
                    className="animate-rise relative rounded-xl border border-white/10 p-5"
                    style={{
                      background: `linear-gradient(145deg, ${theme.gradientFrom}, #080c14)`,
                    }}
                  >
                    <p
                      className="text-[0.65rem] font-semibold uppercase tracking-[0.2em]"
                      style={{ color: theme.accent }}
                    >
                      Preview · 0{slide + 1}
                    </p>
                    <p className="serif mt-3 text-2xl text-white sm:text-3xl">
                      {slides[slide].title}
                    </p>
                    <p className="mt-2 text-sm text-white/50">{slides[slide].text}</p>
                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${35 + slide * 25}%`,
                          background: theme.buttonGradient,
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {["Design", "Build", "Launch"].map((t, i) => (
                      <div
                        key={t}
                        className="rounded-lg border border-white/8 bg-white/[0.03] px-2 py-3 text-center"
                        style={{
                          borderColor: i === slide ? `${theme.accent}66` : undefined,
                          background: i === slide ? theme.accentSoft : undefined,
                        }}
                      >
                        <p className="text-[11px] font-semibold text-white/70">{t}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div
                className="animate-float-mid absolute -bottom-6 -right-1 z-[2] w-[118px] overflow-hidden rounded-[1.35rem] border bg-[#0a0f18] p-1.5 shadow-2xl sm:w-[132px]"
                style={{ borderColor: `${theme.accent}77` }}
              >
                <div className="mx-auto mb-1.5 h-2.5 w-12 rounded-full bg-black/50" />
                <div
                  className="space-y-2 rounded-[1.05rem] p-2.5"
                  style={{ background: `linear-gradient(180deg, ${theme.accentSoft}, #0a0f18)` }}
                >
                  <div className="h-14 rounded-lg bg-white/10" />
                  <div className="h-1.5 w-3/4 rounded bg-white/25" />
                  <div className="h-1.5 w-1/2 rounded bg-white/15" />
                  <div
                    className="mt-2 rounded-md py-1.5 text-center text-[9px] font-bold text-[#061018]"
                    style={{ background: theme.accent }}
                  >
                    Get Quote
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-center gap-2 sm:mt-12">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Slide ${i + 1}`}
                    onClick={() => setSlide(i)}
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: i === slide ? 28 : 10,
                      background: i === slide ? theme.accent : "rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid gap-8 border-t border-white/10 pt-9 sm:grid-cols-3">
            {service.stats.map((stat, i) => (
              <div
                key={stat.label}
                className="animate-rise"
                style={{ animationDelay: `${0.15 + i * 0.08}s` }}
              >
                <p className="serif text-3xl text-white sm:text-4xl">{stat.value}</p>
                <p className="mt-1.5 text-sm text-white/40">{stat.label}</p>
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
          <h2 className="serif mt-3 text-3xl text-white sm:text-5xl">What we design & ship</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {service.offerings.map((item, i) => {
              const active = i === offer;
              return (
                <button
                  key={item.title}
                  type="button"
                  onMouseEnter={() => setOffer(i)}
                  onFocus={() => setOffer(i)}
                  className="rounded-2xl border p-6 text-left transition duration-300 sm:p-8"
                  style={{
                    borderColor: active ? `${theme.accent}99` : "rgba(255,255,255,0.08)",
                    background: active
                      ? `linear-gradient(145deg, ${theme.accentSoft}, rgba(255,255,255,0.02))`
                      : "rgba(255,255,255,0.02)",
                    boxShadow: active ? `0 0 50px ${theme.accentGlow}` : "none",
                    transform: active ? "translateY(-2px)" : undefined,
                  }}
                >
                  <p className="text-xs font-semibold" style={{ color: theme.accent }}>
                    0{i + 1}
                  </p>
                  <h3 className="serif mt-3 text-2xl text-white sm:text-[1.75rem]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/45">{item.text}</p>
                </button>
              );
            })}
          </div>
          <div
            className="mt-8 h-px w-full"
            style={{ background: `linear-gradient(90deg, ${theme.accent}, transparent)` }}
          />
        </div>
      </section>

      {/* INCLUDED */}
      <section className="relative z-[1] section-pad">
        <div className="container-page">
          <p
            className="text-[0.7rem] font-semibold uppercase tracking-[0.22em]"
            style={{ color: theme.accent }}
          >
            Included
          </p>
          <h2 className="serif mt-3 text-3xl text-white sm:text-4xl">Everything in the build</h2>
          <div className="mt-8 space-y-3">
            {service.includes.map((item, i) => (
              <div
                key={item.title}
                className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-5 transition duration-300 hover:-translate-y-0.5"
                style={{ ["--c" as string]: theme.accent }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${theme.accent}66`;
                  e.currentTarget.style.background = theme.accentSoft;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                }}
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold transition"
                  style={{
                    border: `1px solid ${theme.accent}55`,
                    color: theme.accent,
                  }}
                >
                  0{i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-0.5 text-sm text-white/45">{item.text}</p>
                </div>
                <span
                  className="hidden h-2 w-2 rounded-full opacity-0 transition group-hover:opacity-100 sm:block"
                  style={{ background: theme.accent, boxShadow: `0 0 12px ${theme.accent}` }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

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
              className="absolute bottom-6 left-[21px] top-6 w-px"
              style={{ background: `${theme.accent}28` }}
            />
            <div
              className="absolute left-[21px] top-6 w-px transition-all duration-700 ease-out"
              style={{
                background: `linear-gradient(180deg, ${theme.accent}, ${theme.accent}44)`,
                height: `calc(${((step + 1) / service.process.length) * 100}% - 1.5rem)`,
              }}
            />
            <ol className="space-y-3">
              {service.process.map((item, i) => {
                const active = i === step;
                return (
                  <li key={item.title}>
                    <button
                      type="button"
                      onMouseEnter={() => setStep(i)}
                      onClick={() => setStep(i)}
                      className="relative flex w-full items-start gap-4 rounded-2xl border px-4 py-5 text-left transition duration-300 sm:px-5"
                      style={{
                        borderColor: active ? `${theme.accent}44` : "rgba(255,255,255,0.06)",
                        background: active ? "rgba(255,255,255,0.03)" : "transparent",
                      }}
                    >
                      <span
                        className="relative z-[1] flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-bold transition duration-300"
                        style={{
                          background: active ? theme.accent : "#080c14",
                          color: active ? "#061018" : theme.accent,
                          border: `1px solid ${theme.accent}66`,
                          boxShadow: active ? `0 0 28px ${theme.accentGlow}` : "none",
                        }}
                      >
                        0{i + 1}
                      </span>
                      <div>
                        <h3 className="serif text-xl text-white sm:text-2xl">{item.title}</h3>
                        <p className="mt-1 text-sm text-white/45">{item.text}</p>
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
      <section className="relative z-[1] border-t border-white/8 section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p
              className="text-[0.7rem] font-semibold uppercase tracking-[0.22em]"
              style={{ color: theme.accent }}
            >
              FAQ
            </p>
            <h2 className="serif mt-3 text-3xl text-white sm:text-5xl">Before you book</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/45">{service.ctaText}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#lead"
                className="btn-svc text-white"
                style={{
                  background: theme.buttonGradient,
                  boxShadow: `0 12px 40px ${theme.accentGlow}`,
                }}
              >
                Get a website proposal →
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
                className="group rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1"
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
