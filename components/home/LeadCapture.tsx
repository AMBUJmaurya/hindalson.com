"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { submitLead } from "@/lib/api";
import { isValidInternationalPhone } from "@/lib/contact";

const services = [
  "Website Development",
  "App Development",
  "Monthly Management (SEO)",
  "Performance Marketing",
  "Not sure / Complete Project",
];

const channels = [
  {
    label: "WhatsApp Direct",
    detail: "+86 198 0671 0053",
    href: "https://wa.me/8619806710053?text=Hi%20Hindalson%2C%20I%27d%20like%20to%20discuss%20a%20project.",
    badge: "Instant Connect",
  },
  {
    label: "Direct Phone Call",
    detail: "+86 198 0671 0053",
    href: "tel:+8619806710053",
    badge: "China Line",
  },
  {
    label: "Direct Email",
    detail: "hello@hindalson.com",
    href: "mailto:hello@hindalson.com",
    badge: "Detailed Briefs",
  },
];

const steps = [
  { num: "01", label: "Choose Service" },
  { num: "02", label: "Project Brief" },
  { num: "03", label: "Your Contact" },
];

export function LeadCapture() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
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

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

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
        source: "home",
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit. Please try again or message on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="lead"
      ref={sectionRef}
      className={`relative overflow-hidden scroll-mt-24 section-pad bg-[#10151c] border-t border-white/8 ${
        inView ? "work-in-view" : ""
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 15% 20%, rgba(0,200,212,0.14), transparent 55%), radial-gradient(ellipse 45% 40% at 90% 80%, rgba(59,167,255,0.08), transparent 50%), #10151c",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent)",
        }}
      />

      <div className="container-page relative z-[1]">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-2xl lg:text-left">
          <p className="eyebrow">Start Your Project</p>
          <h2 className="display mt-3 text-[1.75rem] font-bold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl">
            Get a free proposal for your next{" "}
            <span className="bg-gradient-to-r from-white via-cyan to-[#7dd8ff] bg-clip-text text-transparent">
              build or growth push.
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted lg:mx-0">
            Select your service, share a brief outline of your goals, and leave your contact details.
            Our team will review your brief and aim to reply within one business day with a clear scope and estimate.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          {/* Direct channels and reassurance */}
          <div className="space-y-4">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#151d25] px-6 py-5 transition duration-300 hover:-translate-y-0.5 hover:border-cyan/40 hover:bg-[#19232d]"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-bold text-white group-hover:text-cyan transition-colors">
                      {channel.label}
                    </p>
                    <span className="rounded bg-cyan/10 px-2 py-0.5 text-[10px] font-semibold text-cyan">
                      {channel.badge}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted">{channel.detail}</p>
                </div>
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-cyan transition group-hover:border-cyan/40 group-hover:bg-cyan/10"
                  aria-hidden
                >
                  →
                </span>
              </a>
            ))}

            <div className="rounded-2xl border border-cyan/25 bg-cyan/[0.05] p-6 backdrop-blur-sm">
              <p className="text-sm font-bold text-white uppercase tracking-wider text-cyan">
                What happens after you submit
              </p>
              <ul className="mt-4 space-y-3.5 text-sm text-ink-soft">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-cyan/20 text-[10px] text-cyan font-bold">
                    ✓
                  </span>
                  <span>We aim to review your requirements within one business day</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-cyan/20 text-[10px] text-cyan font-bold">
                    ✓
                  </span>
                  <span>You receive a clear scope, practical timeline & estimated budget</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-cyan/20 text-[10px] text-cyan font-bold">
                    ✓
                  </span>
                  <span>Zero aggressive sales pitching — just transparent next steps</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Interactive Multi-step Form Card */}
          <div className="relative overflow-hidden rounded-[1.6rem] border border-white/12 bg-[#151d25] p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.5)]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan/10 blur-3xl"
            />

            {submitted ? (
              <div className="relative flex min-h-[400px] flex-col items-start justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan/40 bg-cyan/15 text-2xl text-cyan">
                  ✓
                </span>
                <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cyan">
                  Proposal Request Received
                </p>
                <h3 className="display mt-2 text-3xl font-bold text-white sm:text-4xl">
                  Thank you.
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                  We’ve received your project details. An engineer from Hindalson will review your brief and get back with next steps within one business day.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button type="button" className="btn-secondary text-sm" onClick={resetForm}>
                    Send Another Request
                  </button>
                  <a
                    href="https://wa.me/8619806710053?text=Hi%20Hindalson%2C%20I%20just%20submitted%20the%20proposal%20form."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm"
                  >
                    Follow up on WhatsApp →
                  </a>
                </div>
              </div>
            ) : (
              <form className="relative grid gap-6" onSubmit={onSubmit}>
                {/* Step indicators */}
                <div className="flex items-center gap-2">
                  {steps.map((item, i) => (
                    <button
                      key={item.num}
                      type="button"
                      onClick={() => {
                        if (i === 0) setStep(0);
                        if (i === 1 && selectedService) setStep(1);
                        if (i === 2 && selectedService && brief.trim().length >= 8) setStep(2);
                      }}
                      className={`flex flex-1 flex-col rounded-xl border px-3 py-2.5 text-left transition ${
                        i === step
                          ? "border-cyan/50 bg-cyan/12 shadow-[0_0_20px_rgba(0,200,212,0.1)]"
                          : i < step
                            ? "border-white/15 bg-white/[0.03]"
                            : "border-white/8 bg-transparent opacity-60"
                      }`}
                    >
                      <span
                        className={`text-[0.65rem] font-bold tracking-[0.16em] ${
                          i === step ? "text-cyan" : "text-white/30"
                        }`}
                      >
                        {item.num}
                      </span>
                      <span
                        className={`mt-0.5 text-xs font-semibold ${
                          i === step ? "text-white" : "text-white/50"
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Step 1: Select Service */}
                {step === 0 && (
                  <div key="step-service" className="voice-panel">
                    <label className="mb-3 block text-sm font-medium text-ink-soft">
                      Which service does your project require?
                    </label>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {services.map((service) => {
                        const selected = selectedService === service;
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => setSelectedService(service)}
                            className={`rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition ${
                              selected
                                ? "border-cyan/60 bg-cyan/15 text-white shadow-[0_0_24px_rgba(0,200,212,0.15)]"
                                : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20 hover:text-white"
                            }`}
                          >
                            {service}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 2: Brief */}
                {step === 1 && (
                  <div key="step-brief" className="voice-panel">
                    <label htmlFor="brief" className="mb-1.5 block text-sm font-medium text-ink-soft">
                      What is the goal or problem to solve?
                    </label>
                    <p className="mb-3 text-xs text-muted">
                      Tell us what you want built, updated, or improved (timeline, features, current website if any).
                    </p>
                    <textarea
                      id="brief"
                      name="brief"
                      required
                      rows={6}
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      className="input-field resize-y text-sm"
                      placeholder="Example: We need a modern, fast website for our business to generate client enquiries and showcase our portfolio…"
                    />
                  </div>
                )}

                {/* Step 3: Details */}
                {step === 2 && (
                  <div key="step-details" className="voice-panel grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <p className="text-sm font-semibold text-white">Your Contact Details</p>
                      <p className="text-xs text-muted">We will send your proposal and follow up here.</p>
                    </div>

                    <div>
                      <label htmlFor="company" className="mb-1.5 block text-xs font-medium text-ink-soft">
                        Company / Brand Name *
                      </label>
                      <input
                        id="company"
                        name="company"
                        required
                        value={details.company}
                        onChange={(e) =>
                          setDetails((prev) => ({ ...prev, company: e.target.value }))
                        }
                        className="input-field text-sm"
                        placeholder="e.g. Acme Enterprises"
                      />
                    </div>

                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-ink-soft">
                        Your Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        value={details.name}
                        onChange={(e) =>
                          setDetails((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="input-field text-sm"
                        placeholder="e.g. Rahul Sharma"
                      />
                    </div>

                    <div>
                      <label htmlFor="mobile" className="mb-1.5 block text-xs font-medium text-ink-soft">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        required
                        value={details.mobile}
                        onChange={(e) =>
                          setDetails((prev) => ({ ...prev, mobile: e.target.value }))
                        }
                        className="input-field text-sm"
                        placeholder="+86 / +1 / International"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-ink-soft">
                        Work Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={details.email}
                        onChange={(e) =>
                          setDetails((prev) => ({ ...prev, email: e.target.value }))
                        }
                        className="input-field text-sm"
                        placeholder="name@company.com"
                      />
                    </div>
                  </div>
                )}

                {/* Bottom navigation */}
                <div className="flex flex-col gap-3 border-t border-white/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  {step > 0 ? (
                    <button
                      type="button"
                      className="btn-secondary text-sm"
                      onClick={goBack}
                      disabled={submitting}
                    >
                      ← Back
                    </button>
                  ) : (
                    <p className="text-xs text-muted">3 simple steps. No budget grilling.</p>
                  )}

                  {step < 2 ? (
                    <button
                      type="button"
                      className="btn-primary w-full sm:w-auto text-sm"
                      onClick={goNext}
                      disabled={
                        (step === 0 && !selectedService) ||
                        (step === 1 && brief.trim().length < 8)
                      }
                    >
                      Continue to Next Step
                      <span aria-hidden>→</span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn-primary w-full sm:w-auto disabled:opacity-50 text-sm shadow-[0_0_24px_rgba(0,200,212,0.3)]"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting Request…" : "Request Free Proposal →"}
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
  );
}

