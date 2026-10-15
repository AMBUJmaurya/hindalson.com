"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { submitLead } from "@/lib/api";
import { isValidInternationalPhone } from "@/lib/contact";

const services = [
  "Website Development",
  "App Development",
  "Monthly Management (SEO)",
  "Performance Marketing",
  "Not sure yet",
];

const formSteps = [
  { num: "01", label: "Service" },
  { num: "02", label: "Brief" },
  { num: "03", label: "Details" },
];

const channels = [
  {
    label: "WhatsApp",
    detail: "+86 198 0671 0053",
    hint: "Fastest reply",
    href: "https://wa.me/8619806710053?text=Hi%20Hindalson%2C%20I%27d%20like%20to%20discuss%20a%20project.",
    accent: "#25D366",
    icon: "wa",
  },
  {
    label: "Direct Call",
    detail: "+86 198 0671 0053",
    hint: "China line",
    href: "tel:+8619806710053",
    accent: "#00c8d4",
    icon: "phone",
  },
  {
    label: "Email",
    detail: "hello@hindalson.com",
    hint: "Detailed briefs",
    href: "mailto:hello@hindalson.com",
    accent: "#3BA7FF",
    icon: "mail",
  },
];

const nextSteps = [
  {
    num: "01",
    title: "We review",
    text: "Your brief is read within one business day — not left in a pile.",
  },
  {
    num: "02",
    title: "Clear reply",
    text: "You get scope direction, timeline sense, and honest next steps.",
  },
  {
    num: "03",
    title: "No pressure",
    text: "A serious conversation. No hard sell — just a clean path forward.",
  },
];

function ChannelIcon({ type }: { type: string }) {
  if (type === "wa") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.82c4.46 0 8.09 3.63 8.09 8.09 0 4.46-3.63 8.09-8.09 8.09-1.42 0-2.8-.37-4.01-1.07l-.29-.17-3.12.82.83-3.04-.19-.31a8.04 8.04 0 0 1-1.22-4.32c0-4.46 3.63-8.09 8.09-8.09zm4.52 10.28c-.25-.12-1.47-.72-1.7-.8-.23-.09-.39-.12-.56.12-.17.25-.64.8-.79.96-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74 2.49 1.07 2.49.71 2.94.67.45-.04 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.17-.47-.29z" />
      </svg>
    );
  }
  if (type === "mail") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 6.5h16v11H4v-11z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M4.5 7l7.5 6.2L19.5 7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7.5 4.5h3l1.5 4-2 1.5a11 11 0 0 0 4.5 4.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A14.5 14.5 0 0 1 5.5 6.7 2 2 0 0 1 7.5 4.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function useInView<T extends HTMLElement>(threshold = 0.12) {
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

export function ContactPage() {
  const hero = useInView<HTMLElement>(0.08);
  const channelsSec = useInView<HTMLElement>(0.1);
  const formSec = useInView<HTMLElement>(0.08);
  const next = useInView<HTMLElement>();

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState("");
  const [brief, setBrief] = useState("");
  const [details, setDetails] = useState({
    company: "",
    mobile: "",
    email: "",
    name: "",
  });

  function resetForm() {
    setSubmitted(false);
    setSubmitting(false);
    setError("");
    setStep(0);
    setSelectedService("");
    setBrief("");
    setDetails({ company: "", mobile: "", email: "", name: "" });
  }

  function goNext() {
    if (step === 0 && !selectedService) return;
    if (step === 1 && brief.trim().length < 8) return;
    setError("");
    setStep((current) => Math.min(current + 1, 2));
  }

  function goBack() {
    setError("");
    setStep((current) => Math.max(current - 1, 0));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedService || brief.trim().length < 8) return;
    if (!details.company || !details.mobile || !details.email || !details.name) return;

    if (!isValidInternationalPhone(details.mobile)) {
      setError("Please enter a valid phone number (e.g. +86 198 0671 0053 or your country calling code).");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await submitLead({
        service: selectedService,
        brief: brief.trim(),
        name: details.name.trim(),
        company: details.company.trim(),
        mobile: details.mobile.trim(),
        email: details.email.trim(),
        source: "contact",
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="svc-grain relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 60% 48% at 12% -5%, rgba(0,200,212,0.18), transparent 55%),
          radial-gradient(ellipse 45% 40% at 95% 15%, rgba(59,167,255,0.1), transparent 50%),
          radial-gradient(ellipse 55% 35% at 60% 90%, rgba(0,200,212,0.06), transparent 55%),
          #10151c
        `,
      }}
    >
      {/* HERO — one composition */}
      <section
        ref={hero.ref}
        className={`relative z-[1] ${hero.inView ? "contactpage-in" : ""}`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 70% 60% at 40% 30%, black, transparent)",
          }}
        />

        <div className="container-page relative py-16 sm:py-20 lg:py-28">
          <nav className="contactpage-rise mb-10 text-sm text-white/40">
            <Link href="/" className="transition hover:text-cyan">
              Home
            </Link>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-white/70">Contact</span>
          </nav>

          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="contactpage-rise text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-cyan">
                Hindalson Technology
              </p>
              <h1 className="contactpage-rise-d1 serif mt-6 max-w-3xl text-[2.75rem] leading-[1.05] text-white sm:text-6xl md:text-[4.6rem]">
                Let’s talk about{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-white via-cyan to-[#7dd8ff] bg-clip-text text-transparent">
                    your next build.
                  </span>
                  <span
                    aria-hidden
                    className="contactpage-underline absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-cyan to-transparent"
                  />
                </span>
              </h1>
              <p className="contactpage-rise-d2 mt-7 max-w-lg text-base leading-relaxed text-white/50 sm:text-lg">
                Website, app, SEO, or ads — share a brief and we’ll reply within one
                business day with clear next steps.
              </p>
              <div className="contactpage-rise-d3 mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#enquire"
                  className="btn-svc text-white"
                  style={{
                    background: "linear-gradient(90deg, #00c8d4, #3BA7FF)",
                    boxShadow: "0 14px 44px rgba(0,200,212,0.28)",
                  }}
                >
                  Request a proposal →
                </a>
                <a
                  href="https://wa.me/8619806710053?text=Hi%20Hindalson%2C%20I%27d%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-svc-ghost"
                  style={{ borderColor: "rgba(0,200,212,0.35)" }}
                >
                  WhatsApp us
                </a>
              </div>
            </div>

            {/* Atmospheric signal panel */}
            <div className="contactpage-rise-d3 relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
              <div
                aria-hidden
                className="contactpage-orb pointer-events-none absolute -inset-10 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,200,212,0.22), transparent 65%)",
                }}
              />
              <div className="contactpage-float relative overflow-hidden rounded-[1.75rem] border border-cyan/25 bg-[#151d25]/90 p-7 backdrop-blur-md sm:p-8">
                <div
                  aria-hidden
                  className="contactpage-scan pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cyan/20 to-transparent"
                />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="brand-mark text-xl tracking-[0.14em] sm:text-2xl">
                      Hindalson
                    </p>
                    <p className="brand-sub mt-1.5 text-[0.58rem] tracking-[0.42em]">
                      Technology
                    </p>
                  </div>
                  <span className="contactpage-live inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cyan">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                    Open
                  </span>
                </div>

                <div className="relative mt-8 space-y-5 border-t border-white/10 pt-7">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] text-white/30">
                      Based in
                    </p>
                    <p className="serif mt-1.5 text-2xl text-white">India</p>
                  </div>
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] text-white/30">
                      Typical reply
                    </p>
                    <p className="serif mt-1.5 text-2xl text-white">Within 1 business day</p>
                  </div>
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] text-white/30">
                      Serving
                    </p>
                    <p className="serif mt-1.5 text-2xl text-white">Clients nationwide</p>
                  </div>
                </div>

                <p className="relative mt-8 text-sm leading-relaxed text-white/40">
                  Serious delivery. Clear ownership. No freelancer chaos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHANNELS — editorial rows */}
      <section
        ref={channelsSec.ref}
        className={`relative z-[1] border-t border-white/8 py-14 sm:py-16 ${
          channelsSec.inView ? "contactpage-in" : ""
        }`}
      >
        <div className="container-page">
          <div className="contactpage-rise flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Reach us directly</p>
              <h2 className="serif mt-3 text-3xl text-white sm:text-4xl">
                Pick your channel
              </h2>
            </div>
            <p className="max-w-sm text-sm text-white/40 sm:text-right">
              Prefer a quick chat? WhatsApp is usually fastest.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {channels.map((channel, i) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="contactpage-channel group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.015] px-5 py-5 transition duration-500 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-6"
                style={{ animationDelay: `${0.08 + i * 0.08}s` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${channel.accent}55`;
                  e.currentTarget.style.background = `${channel.accent}0d`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.015)";
                }}
              >
                <span
                  aria-hidden
                  className="contactpage-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition duration-700 group-hover:left-[120%] group-hover:opacity-100"
                />
                <div className="relative flex items-center gap-4">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition"
                    style={{
                      borderColor: `${channel.accent}40`,
                      color: channel.accent,
                      background: `${channel.accent}14`,
                    }}
                  >
                    <ChannelIcon type={channel.icon} />
                  </span>
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/35">
                      {channel.hint}
                    </p>
                    <p className="display mt-1 text-xl font-bold text-white sm:text-2xl">
                      {channel.label}
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-between gap-4 sm:justify-end">
                  <p className="truncate text-sm text-white/45 sm:text-base">{channel.detail}</p>
                  <span
                    className="shrink-0 text-sm font-semibold transition group-hover:translate-x-1"
                    style={{ color: channel.accent }}
                  >
                    Connect →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FORM — split composition */}
      <section
        id="enquire"
        ref={formSec.ref}
        className={`relative z-[1] border-t border-white/8 section-pad scroll-mt-24 ${
          formSec.inView ? "contactpage-in" : ""
        }`}
      >
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div className="contactpage-rise lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow">Free proposal</p>
              <h2 className="serif mt-3 text-3xl text-white sm:text-5xl">
                Three steps.
                <br />
                <span className="text-white/45">No budget grilling.</span>
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-white/45">
                Service → brief → details. We’ll come back with a clear reply — usually
                within one business day.
              </p>

              <ol className="mt-10 space-y-0">
                {formSteps.map((item, i) => {
                  const active = i === step;
                  const done = i < step || submitted;
                  return (
                    <li key={item.num} className="relative flex gap-4 pb-8 last:pb-0">
                      {i < formSteps.length - 1 ? (
                        <span
                          aria-hidden
                          className="absolute bottom-0 left-[15px] top-8 w-px"
                          style={{
                            background: done
                              ? "linear-gradient(to bottom, #00c8d4, rgba(0,200,212,0.2))"
                              : "rgba(255,255,255,0.1)",
                          }}
                        />
                      ) : null}
                      <span
                        className={`relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[0.7rem] font-bold transition ${
                          active || done
                            ? "border-cyan bg-cyan text-[#061315]"
                            : "border-white/15 bg-[#0a0c0e] text-white/35"
                        }`}
                      >
                        {done && !active ? "✓" : i + 1}
                      </span>
                      <div>
                        <p
                          className={`text-[0.65rem] font-semibold uppercase tracking-[0.18em] ${
                            active ? "text-cyan" : "text-white/30"
                          }`}
                        >
                          {item.num}
                        </p>
                        <p
                          className={`mt-1 text-lg font-semibold ${
                            active ? "text-white" : "text-white/45"
                          }`}
                        >
                          {item.label}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div
              className="contactpage-rise-d1 relative overflow-hidden rounded-[1.75rem] border border-white/12 p-6 sm:p-8 lg:p-9"
              style={{
                background:
                  "linear-gradient(160deg, rgba(0,200,212,0.1) 0%, transparent 35%), linear-gradient(180deg, #151d25 0%, #10151c 100%)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent"
              />
              <div
                aria-hidden
                className="contactpage-pulse pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan/12 blur-3xl"
              />

              {/* Progress bar */}
              {!submitted ? (
                <div className="relative mb-8 h-1 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan to-[#3BA7FF] transition-all duration-500 ease-out"
                    style={{ width: `${((step + 1) / 3) * 100}%` }}
                  />
                </div>
              ) : null}

              {submitted ? (
                <div className="contactpage-panel relative flex min-h-[380px] flex-col items-start justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan/40 bg-cyan/15 text-2xl text-cyan">
                    ✓
                  </span>
                  <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cyan">
                    Proposal requested
                  </p>
                  <h3 className="serif mt-3 text-4xl text-white sm:text-5xl">Thank you.</h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-white/50">
                    We’ve noted your request. Our team will get back with next steps
                    shortly — usually within one business day.
                  </p>
                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <button type="button" className="btn-svc-ghost" onClick={resetForm}>
                      Send another message
                    </button>
                    <a
                      href="https://wa.me/8619806710053?text=Hi%20Hindalson%2C%20I%20just%20submitted%20the%20contact%20form."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-svc text-white"
                      style={{
                        background: "linear-gradient(90deg, #25D366, #00c8d4)",
                      }}
                    >
                      Message on WhatsApp →
                    </a>
                  </div>
                </div>
              ) : (
                <form className="relative grid gap-7" onSubmit={onSubmit}>
                  <div className="relative min-h-[300px]">
                    {step === 0 && (
                      <div key="s0" className="contactpage-panel">
                        <p className="mb-5 text-sm font-medium text-white/70">
                          Which service do you need?
                        </p>
                        <div className="grid gap-2.5 sm:grid-cols-2">
                          {services.map((service) => {
                            const selected = selectedService === service;
                            return (
                              <button
                                key={service}
                                type="button"
                                onClick={() => setSelectedService(service)}
                                className={`rounded-xl border px-4 py-4 text-left text-sm transition duration-300 ${
                                  selected
                                    ? "border-cyan/50 bg-cyan/12 text-white shadow-[0_0_24px_rgba(0,200,212,0.15)]"
                                    : "border-white/10 bg-white/[0.02] text-white/55 hover:border-white/25 hover:text-white"
                                }`}
                              >
                                {service}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div key="s1" className="contactpage-panel">
                        <label
                          htmlFor="contact-brief"
                          className="mb-1.5 block text-sm font-medium text-white/70"
                        >
                          What’s the issue or goal?
                        </label>
                        <p className="mb-4 text-xs text-white/40">
                          Share a short brief — what you need fixed, built, or improved.
                        </p>
                        <textarea
                          id="contact-brief"
                          name="brief"
                          required
                          rows={8}
                          value={brief}
                          onChange={(e) => setBrief(e.target.value)}
                          className="input-field min-h-[180px] resize-y"
                          placeholder="Example: Need a new business website, or SEO isn’t bringing enquiries…"
                        />
                      </div>
                    )}

                    {step === 2 && (
                      <div key="s2" className="contactpage-panel grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <p className="text-sm font-medium text-white/70">Your details</p>
                        </div>
                        {(
                          [
                            ["company", "Company Name", "Company / brand", "text"],
                            ["name", "Name", "Your name", "text"],
                            ["mobile", "Mobile Number", "+86 / +1 / International", "tel"],
                            ["email", "Email", "you@company.com", "email"],
                          ] as const
                        ).map(([key, label, placeholder, type]) => (
                          <div key={key}>
                            <label
                              htmlFor={`contact-${key}`}
                              className="mb-1.5 block text-sm font-medium text-white/60"
                            >
                              {label}
                            </label>
                            <input
                              id={`contact-${key}`}
                              name={key}
                              type={type}
                              required
                              value={details[key]}
                              onChange={(e) =>
                                setDetails((prev) => ({ ...prev, [key]: e.target.value }))
                              }
                              className="input-field"
                              placeholder={placeholder}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    {step > 0 ? (
                      <button
                        type="button"
                        className="btn-svc-ghost"
                        onClick={goBack}
                        disabled={submitting}
                      >
                        Back
                      </button>
                    ) : (
                      <p className="text-xs text-white/35">
                        No spam. No budget questions. Just a clear reply.
                      </p>
                    )}

                    {step < 2 ? (
                      <button
                        type="button"
                        className="btn-svc text-white disabled:cursor-not-allowed disabled:opacity-40"
                        style={{
                          background: "linear-gradient(90deg, #00c8d4, #3BA7FF)",
                        }}
                        onClick={goNext}
                        disabled={
                          (step === 0 && !selectedService) ||
                          (step === 1 && brief.trim().length < 8)
                        }
                      >
                        Continue →
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-svc text-white disabled:opacity-50"
                        style={{
                          background: "linear-gradient(90deg, #00c8d4, #3BA7FF)",
                          boxShadow: "0 12px 40px rgba(0,200,212,0.28)",
                        }}
                      >
                        {submitting ? "Sending…" : "Request Free Proposal →"}
                      </button>
                    )}
                  </div>

                  {error ? (
                    <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      {error}
                    </p>
                  ) : null}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section
        ref={next.ref}
        className={`relative z-[1] border-t border-white/8 section-pad ${
          next.inView ? "contactpage-in" : ""
        }`}
      >
        <div className="container-page">
          <div className="contactpage-rise max-w-2xl">
            <p className="eyebrow">After you reach out</p>
            <h2 className="serif mt-3 text-3xl text-white sm:text-5xl">
              What happens next
            </h2>
          </div>

          <div className="relative mt-14">
            <div
              aria-hidden
              className="contactpage-path absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-cyan/50 via-cyan/20 to-transparent md:block"
            />
            <div className="grid gap-10 md:grid-cols-3 md:gap-8">
              {nextSteps.map((item, i) => (
                <div
                  key={item.num}
                  className="contactpage-rise relative"
                  style={{ animationDelay: `${0.12 + i * 0.12}s` }}
                >
                  <span className="relative z-[1] flex h-10 w-10 items-center justify-center rounded-full border border-cyan/40 bg-[#080d12] text-sm font-bold text-cyan">
                    {item.num}
                  </span>
                  <h3 className="serif mt-5 text-2xl text-white sm:text-3xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/45">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="contactpage-rise-d2 mt-16 overflow-hidden rounded-[1.6rem] border border-cyan/25 p-8 sm:p-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,200,212,0.12), #151d25 48%, #10151c)",
              boxShadow: "0 0 60px rgba(0,200,212,0.08)",
            }}
          >
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cyan">
              Prefer to talk now?
            </p>
            <h3 className="serif mt-3 text-2xl text-white sm:text-4xl">
              We’re one message away.
            </h3>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="https://wa.me/8619806710053?text=Hi%20Hindalson%2C%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-svc text-white"
                style={{ background: "linear-gradient(90deg, #25D366, #128C7E)" }}
              >
                WhatsApp Us
              </a>
              <a
                href="tel:+8619806710053"
                className="btn-svc-ghost text-white"
                style={{ borderColor: "rgba(0,200,212,0.35)" }}
              >
                Call: +86 198 0671 0053
              </a>
              <a
                href="mailto:hello@hindalson.com"
                className="text-sm font-semibold text-cyan transition hover:text-white"
              >
                hello@hindalson.com →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
