"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Footer } from "@/components/Footer";
import { portfolioProjects } from "@/data/portfolio";
import { submitLead } from "@/lib/api";
import { isValidInternationalPhone } from "@/lib/contact";

const EMAIL = "hello@hindalson.com";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent("Website quote request")}`;

type BusinessType = "Ecommerce" | "Service company";

const audiences: {
  type: BusinessType;
  kicker: string;
  title: string;
  text: string;
  points: string[];
}[] = [
  {
    type: "Ecommerce",
    kicker: "Stores that sell",
    title: "A shop people can trust before they buy.",
    text: "Product pages, collections, and a checkout path that feels clear on a phone. Built for brands selling online — not a generic brochure.",
    points: ["Product & collection pages", "Cart clarity", "Trust and returns copy", "Mobile buy path"],
  },
  {
    type: "Service company",
    kicker: "Companies that take work",
    title: "A site that explains the service — then takes the enquiry.",
    text: "Clinics, agencies, studios, fitness, travel, consultants. Visitors understand what you do, then book a call or send a form.",
    points: ["Service pages", "Proof and process", "Enquiry forms", "One obvious next step"],
  },
];

const includes = [
  { title: "A homepage with a job", text: "What you sell or offer, who it is for, and one next step — above the fold." },
  { title: "Pages that match the business", text: "Store pages for ecommerce. Service, about, and contact pages for companies that take clients." },
  { title: "Phone-first layout", text: "Most of this traffic lands on a small screen. The first view has to feel finished." },
  { title: "A way to convert", text: "Buy, enquire, or both. Buttons and forms sit where the decision happens." },
  { title: "Fast enough to feel expensive", text: "Sharp type, tight images, no clutter that makes the first visit drag." },
  { title: "You own the site", text: "Handover, access, and a short walkthrough. The website stays yours." },
];

const steps = [
  { n: "01", title: "Which business", text: "Ecommerce or a service company. We start from that, not a template pile." },
  { n: "02", title: "The page path", text: "What a visitor should understand, and the action that should follow." },
  { n: "03", title: "We build it", text: "Desktop and mobile, with forms, product or service pages, and tracking wired in." },
  { n: "04", title: "You go live", text: "We test, launch, and show your team how the site works." },
];

const ecommerceWork = portfolioProjects.filter((p) =>
  ["loudsup", "kings-food"].includes(p.id),
);
const serviceWork = portfolioProjects.filter((p) =>
  ["credo", "house-of-fitness", "primary-classes"].includes(p.id),
);

export function WebsitePpcPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [type, setType] = useState<BusinessType>("Ecommerce");
  const [form, setForm] = useState({
    name: "",
    company: "",
    mobile: "",
    email: "",
    brief: "",
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!isValidInternationalPhone(form.mobile)) {
      setError("Please enter a valid phone number (e.g. +86 198 0671 0053 or your country calling code).");
      return;
    }

    setSubmitting(true);
    try {
      await submitLead({
        service: "Website Development",
        brief: `[${type}] ${form.brief.trim()}`,
        name: form.name.trim(),
        company: form.company.trim(),
        mobile: form.mobile.trim(),
        email: form.email.trim(),
        source: "ads",
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send. Please email us.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="ppc-page svc-grain relative min-h-screen overflow-hidden text-white">
      <header className="sticky top-0 z-40 border-b border-white/8 bg-[#10151c]/80 backdrop-blur-xl">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Link href="/website" className="leading-none" aria-label="Hindalson Technology">
            <span className="brand-mark text-sm tracking-[0.12em] sm:text-base">Hindalson</span>
            <span className="brand-sub mt-1 block text-[0.5rem] tracking-[0.36em]">Technology</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="tel:+8619806710053" className="btn-svc-ghost !px-3 !py-2 text-xs sm:text-sm">
              +86 198 0671 0053
            </a>
            <a href={MAILTO} className="btn-svc-ghost !px-3 !py-2 text-sm hidden sm:inline-flex">
              Email
            </a>
            <a
              href="#enquire"
              className="btn-svc !px-3 !py-2 text-sm text-[#061315]"
              style={{ background: "linear-gradient(90deg, #00c8d4, #9af6ff)" }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </header>

      <section className="relative z-[1]">
        <div className="container-page grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="ppc-rise">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-cyan">
              Ecommerce & service websites
            </p>
            <h1 className="serif mt-5 text-[2.6rem] leading-[1.02] text-white sm:text-6xl lg:text-[4.4rem]">
              Websites for stores that sell, and companies that take clients.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
              Hindalson builds websites for two kinds of businesses only on this page: ecommerce brands, and service companies. Clear language. A finished look. A path to buy or enquire.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#enquire"
                className="btn-svc text-[#061315]"
                style={{
                  background: "linear-gradient(90deg, #00c8d4, #9af6ff)",
                  boxShadow: "0 16px 48px rgba(0,200,212,0.28)",
                }}
              >
                Get a website quote →
              </a>
              <a href="#built-for" className="btn-svc-ghost">
                See who this is for
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {["Ecommerce stores", "Service companies", "India", "You own the site"].map((item) => (
                <span key={item} className="tag-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="ppc-float relative mx-auto w-full max-w-xl">
            <div aria-hidden className="pointer-events-none absolute -inset-10 rounded-full bg-cyan/20 blur-3xl" />
            <div className="relative grid gap-3 sm:grid-cols-2">
              <article className="overflow-hidden rounded-[1.4rem] border border-white/12 bg-[#151d25]/90 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-cyan">Ecommerce</p>
                <p className="serif mt-3 text-2xl text-white">The collection.</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {["01", "02", "03", "04"].map((n) => (
                    <div
                      key={n}
                      className="flex aspect-[4/5] flex-col justify-end rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-2"
                    >
                      <span className="text-[0.6rem] tracking-[0.16em] text-white/35">ITEM {n}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-full bg-white py-2.5 text-center text-xs font-semibold text-[#061315]">
                  Add to bag
                </div>
              </article>
              <article className="overflow-hidden rounded-[1.4rem] border border-cyan/25 bg-[#151d25]/90 p-5 shadow-[0_30px_80px_rgba(0,200,212,0.08)] backdrop-blur sm:mt-10">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-cyan">Service company</p>
                <p className="serif mt-3 text-2xl leading-tight text-white">What you do, said once.</p>
                <ul className="mt-4 space-y-2 text-sm text-white/55">
                  {["Service", "Process", "Proof", "Enquire"].map((item) => (
                    <li key={item} className="flex items-center justify-between border-b border-white/8 py-2">
                      <span>{item}</span>
                      <span className="text-cyan">→</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 rounded-full border border-cyan/40 py-2.5 text-center text-xs font-semibold text-cyan">
                  Request a consultation
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-[1] border-t border-white/8">
        <div className="container-page grid gap-3 py-5 sm:grid-cols-3">
          {[
            { k: "Focus", v: "Ecommerce & services" },
            { k: "Outcome", v: "Buy or enquire" },
            { k: "Launch", v: "Typically 3–6 weeks" },
          ].map((item) => (
            <div key={item.k} className="rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-4">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-cyan">{item.k}</p>
              <p className="mt-1 text-sm text-white/70">{item.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="built-for" className="relative z-[1] section-pad scroll-mt-20">
        <div className="container-page">
          <p className="eyebrow">Who this page is for</p>
          <h2 className="serif mt-3 max-w-3xl text-3xl text-white sm:text-5xl">
            We build these websites for ecommerce brands and service companies.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/45 sm:text-base">
            Not a general agency menu. If you sell products online, or you sell a service and need clients to enquire — this is the build.
          </p>
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {audiences.map((item) => (
              <article
                key={item.type}
                className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#151d25] p-7 sm:p-9"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan/10 blur-3xl transition duration-700 group-hover:bg-cyan/20"
                />
                <p className="relative text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-cyan">
                  {item.kicker}
                </p>
                <h3 className="serif relative mt-4 text-3xl text-white sm:text-4xl">{item.title}</h3>
                <p className="relative mt-4 max-w-md text-sm leading-relaxed text-white/50">{item.text}</p>
                <ul className="relative mt-8 grid gap-2 sm:grid-cols-2">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-3 text-sm text-white/70"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-[1] border-t border-white/8 section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow">What’s included</p>
            <h2 className="serif mt-3 text-3xl text-white sm:text-4xl">A finished website, shaped to the business.</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/45">
              Ecommerce gets a storefront. A service company gets pages that explain the offer and collect the enquiry. Same craft. Different job.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {includes.map((item, i) => (
              <div key={item.title} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                <p className="text-[0.65rem] tracking-[0.2em] text-cyan/80">0{i + 1}</p>
                <h3 className="mt-3 text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-[1] border-t border-white/8 section-pad">
        <div className="container-page">
          <p className="eyebrow">How it works</p>
          <h2 className="serif mt-3 text-3xl text-white sm:text-4xl">Four steps. The business type comes first.</h2>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/10 md:grid-cols-4">
            {steps.map((step) => (
              <li key={step.n} className="bg-[#07090c] p-6">
                <span className="serif text-4xl text-cyan/80">{step.n}</span>
                <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative z-[1] border-t border-white/8 section-pad">
        <div className="container-page">
          <p className="eyebrow">Selected work</p>
          <h2 className="serif mt-3 max-w-2xl text-3xl text-white sm:text-4xl">
            Stores, marketplaces, and service companies we’ve already shipped.
          </h2>
          <div className="mt-12 space-y-10">
            {[
              { label: "Ecommerce & commerce", items: ecommerceWork },
              { label: "Service companies", items: serviceWork },
            ].map((group) => (
              <div key={group.label}>
                <p className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/35">
                  {group.label}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {group.items.map((project) => (
                    <a
                      key={project.id}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group overflow-hidden rounded-[1.4rem] border border-white/10 bg-black"
                    >
                      <div className="relative aspect-[16/9]">
                        <Image
                          src={project.image}
                          alt={`${project.client} website`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover object-top transition duration-700 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      </div>
                      <div className="flex items-center justify-between gap-3 px-5 py-4">
                        <div>
                          <p className="font-semibold text-white">{project.client}</p>
                          <p className="text-xs uppercase tracking-[0.14em] text-white/35">{project.industry}</p>
                        </div>
                        <span className="text-sm text-cyan">Visit →</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="enquire" className="relative z-[1] scroll-mt-20 border-t border-white/8 section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 className="serif mt-3 text-3xl text-white sm:text-5xl">Tell us which website you need.</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/50">
              Ecommerce store or service company. We’ll reply within one business day with the next step — no pitch deck, no other services mixed in.
            </p>
            <a href={MAILTO} className="mt-8 inline-block text-cyan">
              {EMAIL}
            </a>
          </div>

          <div className="rounded-[1.6rem] border border-white/10 bg-[#151d25]/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur sm:p-8">
            {submitted ? (
              <div className="flex min-h-[320px] flex-col justify-center">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cyan">Request received</p>
                <h3 className="serif mt-3 text-4xl text-white">Thank you.</h3>
                <p className="mt-3 max-w-md text-sm text-white/50">
                  We’ve got your {type.toLowerCase()} brief. If it’s urgent, email us at {EMAIL}.
                </p>
                <a
                  href={MAILTO}
                  className="btn-svc mt-8 w-fit text-[#061315]"
                  style={{ background: "linear-gradient(90deg, #00c8d4, #9af6ff)" }}
                >
                  Open email →
                </a>
              </div>
            ) : (
              <form className="grid gap-4" onSubmit={onSubmit}>
                <div>
                  <p className="text-sm text-white/55">This website is for</p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {(["Ecommerce", "Service company"] as const).map((option) => {
                      const active = type === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setType(option)}
                          className="rounded-xl border px-3 py-3 text-sm font-semibold transition"
                          style={
                            active
                              ? {
                                  borderColor: "rgba(0,200,212,0.7)",
                                  background: "rgba(0,200,212,0.12)",
                                  color: "#fff",
                                }
                              : {
                                  borderColor: "rgba(255,255,255,0.1)",
                                  color: "rgba(255,255,255,0.45)",
                                }
                          }
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm text-white/55">
                    Name
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="input-field mt-1.5"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block text-sm text-white/55">
                    Company
                    <input
                      required
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                      className="input-field mt-1.5"
                      placeholder="Brand or company"
                    />
                  </label>
                  <label className="block text-sm text-white/55">
                    Mobile
                    <input
                      required
                      type="tel"
                      value={form.mobile}
                      onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
                      className="input-field mt-1.5"
                      placeholder="Your number"
                    />
                  </label>
                  <label className="block text-sm text-white/55">
                    Email
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="input-field mt-1.5"
                      placeholder="you@company.com"
                    />
                  </label>
                </div>
                <label className="block text-sm text-white/55">
                  What should the website do?
                  <textarea
                    required
                    minLength={8}
                    rows={4}
                    value={form.brief}
                    onChange={(e) => setForm((f) => ({ ...f, brief: e.target.value }))}
                    className="input-field mt-1.5 resize-y"
                    placeholder={
                      type === "Ecommerce"
                        ? "Example: Clothing store, about 40 products, need collections and a simple checkout."
                        : "Example: Clinic site with services, doctor proof, and an appointment enquiry form."
                    }
                  />
                </label>
                {error ? (
                  <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                    {error}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-svc text-[#061315] disabled:opacity-50"
                  style={{
                    background: "linear-gradient(90deg, #00c8d4, #9af6ff)",
                    boxShadow: "0 12px 36px rgba(0,200,212,0.22)",
                  }}
                >
                  {submitting ? "Sending…" : "Request a website quote →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <div className="relative z-[1]">
        <Footer />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#07090c]/95 p-3 backdrop-blur md:hidden">
        <div className="grid grid-cols-2 gap-2">
          <a href={MAILTO} className="btn-secondary text-center text-sm">
            Email
          </a>
          <a href="#enquire" className="btn-primary text-center text-sm">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
