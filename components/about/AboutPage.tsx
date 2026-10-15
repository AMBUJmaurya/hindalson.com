"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const values = [
  {
    title: "Mission",
    text: "Help growing businesses look serious online — with websites, apps, SEO, and marketing that actually convert.",
  },
  {
    title: "Vision",
    text: "Become the most trusted production-grade digital partner for SMEs across India.",
  },
  {
    title: "Values",
    text: "Clarity over chaos. Ownership over excuses. Results over vanity. Relationships over one-off projects.",
  },
];

const principles = [
  {
    num: "01",
    title: "In-house ownership",
    text: "Design, development, SEO, and marketing under one accountable team — not a freelancer chain.",
  },
  {
    num: "02",
    title: "Honest delivery",
    text: "Clear timelines, transparent scope, and communication you can trust.",
  },
  {
    num: "03",
    title: "SEO that compounds",
    text: "We don’t treat launch as the finish line. Monthly care keeps growth moving.",
  },
  {
    num: "04",
    title: "Lead-first builds",
    text: "Every page is designed to move visitors toward a call, form, or WhatsApp.",
  },
];

const stats = [
  { value: "10+", label: "Businesses served" },
  { value: "12+", label: "Projects delivered" },
  { value: "4", label: "Core services" },
  { value: "India", label: "Serving nationwide" },
];

const storyBeats = [
  {
    title: "Why Hindalson exists",
    text: "Too many businesses were stuck between cheap freelancers and agencies that overpromised. Hindalson was built to offer production-grade work with clear ownership.",
  },
  {
    title: "How we work",
    text: "One team for websites, apps, SEO-led management, and performance marketing — so nothing gets lost between handoffs.",
  },
  {
    title: "Who we serve",
    text: "Small and mid-size businesses that want to look serious online and generate real enquiries — across India.",
  },
];

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function AboutPage() {
  const hero = useInView<HTMLElement>(0.1);
  const story = useInView<HTMLElement>();
  const founder = useInView<HTMLElement>();
  const valuesRef = useInView<HTMLElement>();
  const principlesRef = useInView<HTMLElement>();
  const [activeBeat, setActiveBeat] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveBeat((i) => (i + 1) % storyBeats.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="svc-grain relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 60% 45% at 15% 0%, rgba(0,200,212,0.14), transparent 55%),
          radial-gradient(ellipse 45% 40% at 90% 20%, rgba(59,167,255,0.1), transparent 50%),
          radial-gradient(ellipse 50% 35% at 50% 100%, rgba(0,200,212,0.06), transparent 55%),
          #10151c
        `,
      }}
    >
      {/* HERO */}
      <section
        ref={hero.ref}
        className={`relative z-[1] ${hero.inView ? "svc-in-view" : ""}`}
      >
        <div className="container-page py-16 sm:py-20 lg:py-24">
          <nav className="svc-rise mb-8 text-sm text-white/40">
            <Link href="/" className="transition hover:text-cyan">
              Home
            </Link>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-white/70">About</span>
          </nav>

          <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="svc-rise text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-cyan">
                About Hindalson
              </p>
              <h1 className="svc-rise-delay-1 serif mt-5 max-w-3xl text-4xl text-white sm:text-6xl md:text-[4.2rem]">
                Built like a product company.{" "}
                <span className="bg-gradient-to-r from-white via-cyan to-[#7B6CFF] bg-clip-text text-transparent">
                  Priced for growing businesses.
                </span>
              </h1>
              <div className="svc-rise-delay-2 mt-6 h-px w-28 bg-gradient-to-r from-cyan to-transparent" />
              <p className="svc-rise-delay-2 mt-6 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg">
                Hindalson Technology is an India-based digital partner for websites,
                apps, SEO-led monthly management, and performance marketing — delivered
                with clear ownership.
              </p>
              <div className="svc-rise-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#lead"
                  className="btn-svc text-white"
                  style={{
                    background: "linear-gradient(90deg, #00c8d4, #3BA7FF)",
                    boxShadow: "0 12px 40px rgba(0,200,212,0.25)",
                  }}
                >
                  Work With Us →
                </Link>
                <Link href="/services" className="btn-svc-ghost">
                  View Services
                </Link>
              </div>
            </div>

            <div className="svc-rise-delay-2 relative">
              <div
                aria-hidden
                className="animate-pulse-soft absolute -inset-8 rounded-full blur-3xl"
                style={{ background: "rgba(0,200,212,0.12)" }}
              />
              <div className="animate-float relative overflow-hidden rounded-[1.6rem] border border-cyan/30 bg-[#151d25] p-7 sm:p-8">
                <div className="animate-scan absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-cyan/15 to-transparent" />
                <p className="brand-mark relative text-2xl tracking-[0.14em] sm:text-3xl">
                  Hindalson
                </p>
                <p className="brand-sub relative mt-2 text-[0.65rem] tracking-[0.45em]">
                  Technology
                </p>
                <p className="relative mt-6 text-sm leading-relaxed text-white/50">
                  Serious delivery. Clear ownership. No freelancer chaos.
                </p>
                <div className="relative mt-8 grid grid-cols-2 gap-3">
                  {["Web", "Apps", "SEO", "Ads"].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-4 text-center"
                    >
                      <p className="text-sm font-semibold text-white">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="svc-card"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <p className="serif text-3xl text-white sm:text-4xl">{stat.value}</p>
                <p className="mt-1.5 text-sm text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section
        ref={story.ref}
        className={`relative z-[1] border-y border-white/8 section-pad ${
          story.inView ? "svc-in-view" : ""
        }`}
      >
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cyan">
              Our story
            </p>
            <h2 className="serif mt-3 text-3xl text-white sm:text-5xl">
              Why we started Hindalson
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/45 sm:text-base">
              Growing businesses deserve production-grade digital work — without the
              confusion of scattered freelancers or inflated agency theatrics.
            </p>
          </div>

          <div className="space-y-3">
            {storyBeats.map((beat, i) => {
              const active = i === activeBeat;
              return (
                <button
                  key={beat.title}
                  type="button"
                  onMouseEnter={() => setActiveBeat(i)}
                  onClick={() => setActiveBeat(i)}
                  className="svc-card w-full rounded-2xl border p-5 text-left transition duration-300 sm:p-6"
                  style={{
                    animationDelay: `${0.1 + i * 0.08}s`,
                    borderColor: active ? "rgba(0,200,212,0.55)" : "rgba(255,255,255,0.08)",
                    background: active
                      ? "rgba(0,200,212,0.08)"
                      : "rgba(255,255,255,0.02)",
                    boxShadow: active ? "0 0 40px rgba(0,200,212,0.12)" : "none",
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold text-cyan">0{i + 1}</p>
                      <h3 className="serif mt-2 text-xl text-white sm:text-2xl">{beat.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/45">{beat.text}</p>
                    </div>
                    <span
                      className="mt-2 h-2 w-2 shrink-0 rounded-full transition"
                      style={{
                        background: active ? "#00c8d4" : "rgba(255,255,255,0.15)",
                        boxShadow: active ? "0 0 12px #00c8d4" : "none",
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section
        ref={founder.ref}
        className={`relative z-[1] section-pad ${founder.inView ? "svc-in-view" : ""}`}
      >
        <div className="container-page">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cyan">
            Founder
          </p>
          <h2 className="serif mt-3 text-3xl text-white sm:text-5xl">The person behind the work</h2>

          <div className="mt-10 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#151d25]">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              <div
                className="relative flex min-h-[280px] items-end p-8 sm:min-h-[360px] sm:p-10"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(0,200,212,0.18), #151d25 55%, #10151c)",
                }}
              >
                <div
                  aria-hidden
                  className="animate-orbit absolute right-6 top-6 h-40 w-40 rounded-full border border-cyan/20"
                />
                <div
                  aria-hidden
                  className="absolute right-14 top-14 h-24 w-24 rounded-full border border-dashed border-white/10"
                />
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan/30 bg-cyan/10 text-2xl font-bold text-cyan">
                    MA
                  </div>
                  <p className="serif mt-5 text-3xl text-white sm:text-4xl">Mohak Anand</p>
                  <p className="mt-2 text-sm font-medium text-cyan">Founder · Hindalson Technology</p>
                </div>
              </div>

              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                <p className="text-base leading-relaxed text-white/55 sm:text-lg">
                  Mohak built Hindalson to give businesses a serious digital partner —
                  someone who owns the outcome from first conversation to launch and beyond.
                </p>
                <p className="mt-4 text-base leading-relaxed text-white/45">
                  The focus is simple: clean execution, SEO-led growth, and communication
                  that doesn’t disappear after payment.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {["Strategy", "Delivery", "SEO", "Client success"].map((tag) => (
                    <span
                      key={tag}
                      className="tag-pill"
                      style={{ borderColor: "rgba(0,200,212,0.35)", color: "#00c8d4" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="mailto:hello@hindalson.com"
                    className="btn-svc-ghost"
                    style={{ borderColor: "rgba(0,200,212,0.4)" }}
                  >
                    Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION VISION VALUES */}
      <section
        ref={valuesRef.ref}
        className={`relative z-[1] border-y border-white/8 section-pad ${
          valuesRef.inView ? "svc-in-view" : ""
        }`}
      >
        <div className="container-page">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cyan">
            Compass
          </p>
          <h2 className="serif mt-3 text-3xl text-white sm:text-5xl">
            Mission, vision & values
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {values.map((item, i) => (
              <article
                key={item.title}
                className="svc-card group relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.02] p-7 transition duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,200,212,0.5)";
                  e.currentTarget.style.boxShadow = "0 0 40px rgba(0,200,212,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  aria-hidden
                  className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cyan/0 blur-2xl transition group-hover:bg-cyan/15"
                />
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
                  0{i + 1}
                </p>
                <h3 className="serif mt-4 text-2xl text-white sm:text-3xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/45">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section
        ref={principlesRef.ref}
        className={`relative z-[1] section-pad ${principlesRef.inView ? "svc-in-view" : ""}`}
      >
        <div className="container-page">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cyan">
            How we operate
          </p>
          <h2 className="serif mt-3 max-w-2xl text-3xl text-white sm:text-5xl">
            Principles that keep delivery clean
          </h2>
          <div className="mt-10 space-y-3">
            {principles.map((item, i) => (
              <div
                key={item.title}
                className="svc-card flex flex-col gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-6 transition duration-300 sm:flex-row sm:items-center sm:justify-between"
                style={{ animationDelay: `${0.08 + i * 0.08}s` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,200,212,0.45)";
                  e.currentTarget.style.background = "rgba(0,200,212,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                }}
              >
                <div className="flex items-start gap-5">
                  <span className="display text-2xl font-bold text-cyan/50">{item.num}</span>
                  <div>
                    <h3 className="serif text-xl text-white sm:text-2xl">{item.title}</h3>
                    <p className="mt-1.5 max-w-2xl text-sm text-white/45">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-[1] border-t border-white/8 section-pad">
        <div className="container-page">
          <div
            className="overflow-hidden rounded-[1.6rem] border border-cyan/30 p-8 sm:p-12"
            style={{
              background:
                "linear-gradient(145deg, rgba(0,200,212,0.12), #151d25 45%, #10151c)",
              boxShadow: "0 0 60px rgba(0,200,212,0.1)",
            }}
          >
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cyan">
              Next step
            </p>
            <h2 className="serif mt-4 max-w-2xl text-3xl text-white sm:text-5xl">
              Ready to work with a serious digital partner?
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/50">
              Tell us what you need. We’ll reply with clear next steps — usually within one
              business day.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#lead"
                className="btn-svc text-white"
                style={{
                  background: "linear-gradient(90deg, #00c8d4, #3BA7FF)",
                  boxShadow: "0 12px 40px rgba(0,200,212,0.25)",
                }}
              >
                Get a Free Proposal →
              </Link>
              <a
                href="https://wa.me/8619806710053?text=Hi%20Hindalson%2C%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-svc-ghost"
                style={{ borderColor: "rgba(0,200,212,0.45)" }}
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
