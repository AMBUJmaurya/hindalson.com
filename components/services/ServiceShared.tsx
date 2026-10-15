"use client";

import Link from "next/link";
import type { ServiceData } from "@/data/services";
import { getOtherServices } from "@/data/services";
import { ServiceFaq } from "@/components/services/ServiceFaq";

export function ServiceBreadcrumb({ title, accent }: { title: string; accent: string }) {
  return (
    <nav className="mb-8 text-sm text-muted">
      <Link href="/" className="transition hover:opacity-90" style={{ color: accent }}>
        Home
      </Link>
      <span className="mx-2 text-white/20">/</span>
      <Link href="/services" className="transition hover:opacity-90" style={{ color: accent }}>
        Services
      </Link>
      <span className="mx-2 text-white/20">/</span>
      <span className="text-white/70">{title}</span>
    </nav>
  );
}

export function ServiceOthers({ service }: { service: ServiceData }) {
  const others = getOtherServices(service.slug);
  return (
    <section className="border-t border-white/8 bg-[#10151c] section-pad">
      <div className="container-page">
        <p
          className="text-[0.72rem] font-semibold uppercase tracking-[0.22em]"
          style={{ color: service.theme.accent }}
        >
          More services
        </p>
        <h2 className="display mt-3 text-3xl font-bold text-white sm:text-4xl">
          One partner for the full journey.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {others.map((item) => (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              className="group rounded-2xl border bg-[#151d25] p-6 transition hover:-translate-y-1"
              style={{ borderColor: `${item.theme.accent}40` }}
            >
              <p
                className="text-[0.65rem] font-semibold tracking-[0.18em]"
                style={{ color: item.theme.accent }}
              >
                {item.num} · {item.short}
              </p>
              <h3 className="display mt-3 text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted">{item.subhead}</p>
              <span
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition group-hover:gap-2.5"
                style={{ color: item.theme.accent }}
              >
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceFaqBlock({ service }: { service: ServiceData }) {
  return (
    <section className="section-pad">
      <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p
            className="text-[0.72rem] font-semibold uppercase tracking-[0.22em]"
            style={{ color: service.theme.accent }}
          >
            FAQ
          </p>
          <h2 className="display mt-3 text-3xl font-bold text-white sm:text-4xl">
            Straight answers before you commit.
          </h2>
        </div>
        <ServiceFaq faqs={service.faqs} accent={service.theme.accent} />
      </div>
    </section>
  );
}

export function ServiceCta({ service }: { service: ServiceData }) {
  const { theme } = service;
  return (
    <section className="relative overflow-hidden section-pad">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 55% 50% at 50% 50%, ${theme.accentGlow}, transparent 60%), #10151c`,
        }}
      />
      <div className="container-page relative z-[1]">
        <div
          className="overflow-hidden rounded-[1.5rem] border p-8 sm:p-12"
          style={{
            borderColor: `${theme.accent}55`,
            background: `linear-gradient(145deg, ${theme.gradientFrom}, #151d25)`,
          }}
        >
          <p
            className="text-[0.72rem] font-semibold uppercase tracking-[0.22em]"
            style={{ color: theme.accent }}
          >
            Next step
          </p>
          <h2 className="display mt-4 max-w-2xl text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {service.ctaTitle}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{service.ctaText}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#lead"
              className="inline-flex items-center justify-center gap-2 rounded-[0.55rem] px-[1.35rem] py-[0.9rem] font-bold transition hover:-translate-y-0.5"
              style={{ background: theme.accent, color: "#061315" }}
            >
              Request Free Proposal →
            </Link>
            <a href="mailto:hello@hindalson.com" className="btn-secondary">
              Email hello@hindalson.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
