import type { Metadata } from "next";
import Link from "next/link";
import { servicesData } from "@/data/services";

export const metadata: Metadata = {
  title: "Services | Hindalson Technology",
  description:
    "Website development, app development, SEO-led monthly management, and performance marketing by Hindalson Technology.",
};

export default function ServicesIndexPage() {
  return (
    <section
      className="svc-grain relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 55% 45% at 20% 0%, rgba(59,167,255,0.14), transparent 55%), #10151c",
      }}
    >
      <div className="container-page relative z-[1] py-16 sm:py-20">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#3BA7FF]">
          Services
        </p>
        <h1 className="serif mt-4 max-w-3xl text-4xl text-white sm:text-6xl">
          Four services.{" "}
          <span className="bg-gradient-to-r from-white to-[#3BA7FF] bg-clip-text text-transparent">
            One accountable partner.
          </span>
        </h1>
        <p className="mt-5 max-w-xl text-base text-white/50 sm:text-lg">
          Pick a service — each page has its own premium look and colour system.
        </p>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {servicesData.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group relative overflow-hidden rounded-[1.4rem] border p-7 transition hover:-translate-y-1 sm:p-8"
              style={{
                borderColor: `${service.theme.accent}44`,
                background: `linear-gradient(155deg, ${service.theme.gradientFrom}, #151d25)`,
              }}
            >
              <div
                aria-hidden
                className="absolute -right-10 -top-10 h-36 w-36 rounded-full blur-3xl transition group-hover:opacity-100"
                style={{ background: service.theme.accentSoft }}
              />
              <p
                className="text-[0.7rem] font-semibold tracking-[0.18em]"
                style={{ color: service.theme.accent }}
              >
                {service.num} · {service.short}
              </p>
              <h2 className="serif mt-4 text-3xl text-white">{service.title}</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/45">
                {service.subhead}
              </p>
              <span
                className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold transition group-hover:gap-2.5"
                style={{ color: service.theme.accent }}
              >
                Explore service →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
