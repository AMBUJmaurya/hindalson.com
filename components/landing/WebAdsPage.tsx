"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { submitLead } from "@/lib/api";

const EMAIL = "projects@hindalson.com";
const MAIL_SUBJECT = "Website project enquiry";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(MAIL_SUBJECT)}`;
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent(MAIL_SUBJECT)}`;

const checks = [
  "Mobile-first design",
  "Ecommerce & payment integration",
  "SEO-ready structure",
  "Fast, responsive & secure",
  "You own the website",
];

const steps = [
  {
    title: "Built around your business",
    text: "We don't start with a template and ask you to fit your business into it. We first understand what you sell, who your customers are, and what the website needs to achieve.",
  },
  {
    title: "Designed to generate action",
    text: "A beautiful website is not enough. Your website needs to guide visitors toward the next step — buying, enquiring, calling, or booking.",
  },
  {
    title: "Mobile-first",
    text: "Your customers are likely to visit from their phones. We make sure the website looks professional and works smoothly across mobile, tablet and desktop.",
  },
  {
    title: "SEO-ready from the start",
    text: "We build a clean structure with search-friendly pages, technical basics and performance considerations from the beginning.",
  },
  {
    title: "You own your website",
    text: "Your website, domain, hosting access and business data remain yours. We provide the necessary handover and access after launch.",
  },
  {
    title: "Support after launch",
    text: "Launching the website isn't the end. We can help with fixes, improvements, new pages and ongoing updates when you need them.",
  },
];

const forYou = [
  "You want a professional website for your business",
  "You want to sell products online",
  "Your current website looks outdated",
  "Your website isn’t generating enquiries",
  "You want a website you can own and grow",
];

const notForYou = [
  "You only want the cheapest possible website",
  "You want a website built without discussing your business",
  "You want a template installed with no customization",
];

const trustStats = [
  { value: "250+", label: "Projects delivered" },
  { value: "5+", label: "Years of experience" },
  { value: "India-based", label: "Development team" },
];

const techStack = [
  {
    title: "Ecommerce",
    items: ["Shopify", "WooCommerce", "Custom Ecommerce"],
  },
  {
    title: "Business or Service based websites",
    items: ["WordPress"],
  },
  {
    title: "Technology",
    items: ["React", "Next.js", "Node.js", "TypeScript", "Express", "MongoDB", "PostgreSQL", "Tailwind CSS", "AWS"],
  },
];

const costFactors = [
  {
    title: "Number of pages",
    text: "More pages require more design and development time.",
  },
  {
    title: "Design requirements",
    text: "Standard website vs. highly customized brand experience.",
  },
  {
    title: "Functionality",
    text: "Contact forms, search, CMS, payments, booking, user accounts, dashboards, APIs, CRM/email integrations, multilingual support, and more.",
  },
  {
    title: "Content",
    text: "Existing content vs. content that needs to be created or migrated.",
  },
  {
    title: "Platform and technology",
    text: "WordPress, Shopify, Webflow, Squarespace, or custom code.",
  },
  {
    title: "Tentative Cost",
    text: "Business, service, or appointment websites start from HK$1000. Ecommerce sites start from HK$2000.",
  },
];

const includeRows = [
  { label: "Custom responsive design", ecommerce: true, business: true },
  { label: "Mobile optimization", ecommerce: true, business: true },
  { label: "SEO-ready structure", ecommerce: true, business: true },
  { label: "Contact / enquiry forms", ecommerce: true, business: true },
  { label: "WhatsApp integration", ecommerce: true, business: true },
  { label: "Google Analytics setup", ecommerce: true, business: true },
  { label: "Payment integration", ecommerce: true, business: false },
  { label: "Product catalogue", ecommerce: true, business: false },
  { label: "Shopping cart & checkout", ecommerce: true, business: false },
  { label: "Inventory / product variants", ecommerce: true, business: false },
  { label: "Order & payment notifications", ecommerce: true, business: false },
  { label: "Service & lead page structure", ecommerce: false, business: true },
  { label: "CMS / content management", ecommerce: true, business: true },
  { label: "Blog-ready page structure", ecommerce: true, business: true },
  { label: "Basic speed optimization", ecommerce: true, business: true },
  { label: "SSL & security basics", ecommerce: true, business: true },
  { label: "Cross-browser QA", ecommerce: true, business: true },
  { label: "Domain / hosting assistance", ecommerce: true, business: true },
  { label: "Website handover & access", ecommerce: true, business: true },
  { label: "Admin walkthrough", ecommerce: true, business: true },
];

function WebxMarquee({
  tone = "dark",
  reverse = false,
}: {
  tone?: "dark" | "light" | "glow";
  reverse?: boolean;
}) {
  const loop = [...checks, ...checks];
  return (
    <div className={`webx-ticker-wrap webx-ticker-wrap-${tone}`} aria-hidden>
      <div className={`webx-ticker webx-ticker-${tone}${reverse ? " is-reverse" : ""}`}>
        <span className="webx-ticker-sheen" />
        <div className="webx-ticker-fade webx-ticker-fade-left" />
        <div className="webx-ticker-fade webx-ticker-fade-right" />
        <div className="webx-ticker-track">
          <div className="webx-ticker-group">
            {loop.map((item, i) => (
              <span key={`a-${item}-${i}`} className="webx-ticker-item">
                <span className="webx-ticker-sep" />
                <span className="webx-ticker-text">{item}</span>
              </span>
            ))}
          </div>
          <div className="webx-ticker-group">
            {loop.map((item, i) => (
              <span key={`b-${item}-${i}`} className="webx-ticker-item">
                <span className="webx-ticker-sep" />
                <span className="webx-ticker-text">{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function WebAdsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const revealedRef = useRef(new Set<Element>());
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [mailOpen, setMailOpen] = useState(false);
  const [mailCopied, setMailCopied] = useState(false);
  const [form, setForm] = useState({
    email: "",
    brief: "",
  });

  function openEmailSheet(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setMailCopied(false);
    setMailOpen(true);
  }

  async function copyProjectEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setMailCopied(true);
    } catch {
      setMailCopied(false);
    }
  }

  function openMailApp() {
    window.location.href = MAILTO;
  }

  function openGmailCompose() {
    // Same-tab navigation works inside WhatsApp / Instagram WebViews
    window.location.href = GMAIL_COMPOSE;
  }

  useEffect(() => {
    const handleOpenSheet = () => {
      setMailCopied(false);
      setMailOpen(true);
    };
    window.addEventListener("open-email-sheet", handleOpenSheet);
    return () => window.removeEventListener("open-email-sheet", handleOpenSheet);
  }, []);

  useEffect(() => {
    if (!mailOpen) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") setMailOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mailOpen]);

  useLayoutEffect(() => {
    revealedRef.current.forEach((el) => {
      if (el.isConnected) el.classList.add("is-shown");
    });
  });

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const revealEls = root.querySelectorAll("[data-reveal]");
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-shown");
          revealedRef.current.add(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    revealEls.forEach((el) => reveal.observe(el));

    return () => {
      reveal.disconnect();
    };
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await submitLead({
        service: "Website Development",
        brief: form.brief.trim(),
        name: "",
        company: "",
        mobile: "",
        email: form.email.trim(),
        source: "ads",
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div ref={pageRef} className="webx relative min-h-screen text-white">
      <div aria-hidden className="webx-mesh" />
      <div aria-hidden className="webx-grid" />

      <header className="webx-header sticky top-0 z-40">
        <div className="webx-shell flex h-14 items-center justify-between sm:h-[4.25rem]">
          <Link href="/web-development" className="leading-none" aria-label="Hindalson Technology">
            <span className="brand-mark text-[0.8rem] tracking-[0.12em] sm:text-base">Hindalson</span>
            <span className="brand-sub mt-0.5 block text-[0.45rem] tracking-[0.32em] sm:mt-1 sm:text-[0.5rem] sm:tracking-[0.36em]">
              Technology
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href={MAILTO} onClick={openEmailSheet} className="webx-ghost" aria-label={`Email ${EMAIL}`}>
              Email
            </a>
            <a href="#enquire" className="webx-btn webx-btn-sm">
              Contact Us
            </a>
          </div>
        </div>
      </header>

      <section className="relative z-[1] overflow-hidden">
        <div className="webx-shell pb-6 pt-6 sm:pb-8 sm:pt-10 lg:pb-10 lg:pt-12">
          <div className="webx-hero-top" data-reveal>
            <p className="webx-kicker">Hindalson Technology</p>
            <a href={MAILTO} onClick={openEmailSheet} className="webx-hero-mail">
              {EMAIL}
            </a>
          </div>
          <h1 className="webx-hero-title mt-3 sm:mt-5" data-reveal style={{ transitionDelay: "80ms" }}>
            <span className="block">Websites &amp; Ecommerce Stores</span>
            <span className="block">for businesses that</span>
            <span className="webx-hero-accent block">want to grow</span>
          </h1>
          <p
            className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-white/70 sm:mt-6 sm:text-lg"
            data-reveal
            style={{ transitionDelay: "140ms" }}
          >
            We build an online presence that makes your business look credible — and makes it easier for customers to buy or enquire.
          </p>
          <p
            className="mt-2 max-w-xl text-[0.86rem] leading-relaxed text-white/42 sm:mt-3 sm:text-base"
            data-reveal
            style={{ transitionDelay: "180ms" }}
          >
            Custom ecommerce and business websites designed around your brand, your customers, and your goals.
          </p>

          <div className="webx-hero-actions mt-6 sm:mt-10" data-reveal style={{ transitionDelay: "220ms" }}>
            <a href="#enquire" className="webx-btn">
              Send My Project Details →
            </a>
            <p className="webx-hero-note">
              Tell us what you need. We’ll review your requirements and get back to you within 1 business day.
            </p>
          </div>

          <ul className="webx-checks mt-6 sm:mt-8" data-reveal style={{ transitionDelay: "260ms" }}>
            {checks.map((item) => (
              <li key={item}>
                <span>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <WebxMarquee tone="glow" />

      <section id="steps" className="webx-paper relative z-[1]">
        <div className="webx-shell py-8 sm:py-12 lg:py-14">
          <div className="webx-steps-head" data-reveal>
            <div>
              <p className="webx-kicker webx-kicker-dark">A step-by-step explanation</p>
              <h2 className="serif mt-3 text-[1.7rem] leading-[1.08] text-[#0e1210] sm:mt-4 sm:text-4xl lg:text-[3rem]">
                From your initial contact to your project execution
              </h2>
            </div>
          </div>

          <ol className="webx-steps-list mt-6 sm:mt-8" data-reveal>
            {steps.map((step, index) => (
              <li key={step.title} id={`step-${index}`} className="webx-step is-shown">
                <span className="webx-step-num">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="serif text-[1.15rem] leading-snug text-[#0e1210] sm:text-[1.35rem]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-[#3d4642] sm:mt-2.5 sm:text-[0.95rem]">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {false && (
      <section className="webx-fit relative z-[1] overflow-hidden py-8 sm:py-12 lg:py-14">
        <div aria-hidden className="webx-fit-orb webx-fit-orb-a" />
        <div aria-hidden className="webx-fit-orb webx-fit-orb-b" />
        <div className="webx-shell">
          <div className="webx-fit-head" data-reveal>
            <div>
              <p className="webx-kicker webx-kicker-dark">Who this is for</p>
              <h2 className="serif mt-3 max-w-2xl text-[1.7rem] leading-[1.08] text-[#0e1210] sm:mt-4 sm:text-4xl">
                Clear on who this is for — and who it isn’t.
              </h2>
            </div>
          </div>

          <div className="webx-fit-grid mt-6 sm:mt-8">
            <article className="webx-fit-panel webx-fit-yes" data-reveal style={{ transitionDelay: "60ms" }}>
              <div className="webx-fit-panel-top">
                <p className="webx-fit-label">Who this is for</p>
                <h3 className="serif mt-2 text-[1.25rem] text-[#0e1210] sm:text-2xl">This service is for you if…</h3>
              </div>
              <ul className="webx-fit-list">
                {forYou.map((item, index) => (
                  <li key={item} data-reveal style={{ transitionDelay: `${140 + index * 70}ms` }}>
                    <span className="webx-fit-mark is-yes" aria-hidden>
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="webx-fit-panel webx-fit-no" data-reveal style={{ transitionDelay: "140ms" }}>
              <div className="webx-fit-panel-top">
                <p className="webx-fit-label is-muted">Who this is not for</p>
                <h3 className="serif mt-2 text-[1.25rem] text-[#1a221f] sm:text-2xl">Probably not for you if…</h3>
              </div>
              <ul className="webx-fit-list">
                {notForYou.map((item, index) => (
                  <li key={item} data-reveal style={{ transitionDelay: `${220 + index * 70}ms` }}>
                    <span className="webx-fit-mark is-no" aria-hidden>
                      ×
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="webx-trust" data-reveal style={{ transitionDelay: "200ms" }}>
            <p className="webx-trust-line">Trusted by businesses, startups &amp; growing brands</p>
            <div className="webx-trust-stats">
              {trustStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="webx-trust-stat"
                  data-reveal
                  style={{ transitionDelay: `${280 + index * 90}ms` }}
                >
                  <p className="webx-trust-value">{stat.value}</p>
                  <p className="webx-trust-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      <WebxMarquee tone="light" />

      <section className="webx-tech webx-tech-static relative z-[1] overflow-hidden py-8 sm:py-12 lg:py-14">
        <div aria-hidden className="webx-tech-glow" />
        <div aria-hidden className="webx-tech-glow webx-tech-glow-b" />
        <div className="webx-shell">
          <div className="webx-tech-head" data-reveal>
            <p className="webx-kicker">Capabilities</p>
            <h2 className="serif mt-3 max-w-3xl text-[1.7rem] leading-[1.08] text-white sm:mt-4 sm:text-4xl">
              Technologies and platforms we genuinely excel in
            </h2>
          </div>

          <ol className="webx-tech-list mt-6 sm:mt-8">
            {techStack.map((row, index) => (
              <li
                key={row.title}
                data-reveal
                className="webx-tech-row"
                style={{ transitionDelay: `${80 + index * 70}ms` }}
              >
                <span className="webx-tech-num">{String(index + 1).padStart(2, "0")}</span>
                <div className="webx-tech-copy">
                  <h3 className="webx-tech-title">{row.title}</h3>
                  <div className="webx-tech-chips">
                    {row.items.map((item, i) => (
                      <span
                        key={item}
                        className="webx-tech-chip"
                        style={{ transitionDelay: `${120 + index * 40 + i * 35}ms` }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <WebxMarquee tone="glow" reverse />

      <section className="webx-cost relative z-[1] overflow-hidden py-8 sm:py-12 lg:py-14">
        <div aria-hidden className="webx-cost-orb webx-cost-orb-a" />
        <div aria-hidden className="webx-cost-orb webx-cost-orb-b" />
        <div className="webx-shell">
          <div className="webx-cost-head" data-reveal>
            <p className="webx-kicker webx-kicker-dark">Pricing clarity</p>
            <h2 className="serif mt-3 max-w-3xl text-[1.7rem] leading-[1.08] text-[#0e1210] sm:mt-4 sm:text-4xl">
              What determines your website cost?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#4a524e] sm:mt-4 sm:text-base">
              Every project is scoped around the real work involved — so the quote stays clear, fair, and tied to what you actually need.
            </p>
          </div>

          <div className="webx-cost-grid mt-6 sm:mt-8">
            {costFactors.map((factor, index) => (
              <article
                key={factor.title}
                className="webx-cost-card"
                data-reveal
                style={{ transitionDelay: `${70 + index * 70}ms` }}
              >
                <span className="webx-cost-num">{String(index + 1).padStart(2, "0")}</span>
                <div className="webx-cost-body">
                  <h3 className="webx-cost-title">{factor.title}</h3>
                  <p className="webx-cost-text">{factor.text}</p>
                </div>
                <span aria-hidden className="webx-cost-line" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <WebxMarquee tone="light" />

      <section className="webx-include relative z-[1] overflow-hidden py-8 sm:py-12 lg:py-14">
        <div aria-hidden className="webx-include-glow" />
        <div aria-hidden className="webx-include-glow webx-include-glow-b" />
        <div className="webx-shell">
          <div className="webx-include-head" data-reveal>
            <div>
              <p className="webx-kicker">What’s included</p>
              <h2 className="serif mt-3 max-w-3xl text-[1.7rem] leading-[1.08] text-white sm:mt-4 sm:text-4xl">
                A checklist of what you will receive
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/48 sm:mt-4 sm:text-base">
                Clear scope for Ecommerce and Business websites — so you know exactly what’s covered before we start.
              </p>
            </div>
            <div className="webx-include-legend" aria-hidden>
              <span>
                <i className="is-yes">✓</i> Included
              </span>
              <span>
                <i className="is-no">—</i> Not in this package
              </span>
            </div>
          </div>

          <div className="webx-include-board mt-5 hidden sm:block sm:mt-7" data-reveal style={{ transitionDelay: "80ms" }}>
            <div className="webx-include-table" role="table" aria-label="Included features comparison">
              <div className="webx-include-row is-head" role="row">
                <div className="webx-include-cell is-feature" role="columnheader">
                  Included
                </div>
                <div className="webx-include-cell is-plan is-ecom" role="columnheader">
                  <span className="webx-include-plan-tag">Sell online</span>
                  <strong>Ecommerce</strong>
                </div>
                <div className="webx-include-cell is-plan is-biz" role="columnheader">
                  <span className="webx-include-plan-tag">Grow leads</span>
                  <strong>Business</strong>
                </div>
              </div>

              {includeRows.map((row, index) => (
                <div
                  key={row.label}
                  className="webx-include-row"
                  role="row"
                  data-reveal
                  style={{ transitionDelay: `${40 + index * 28}ms` }}
                >
                  <div className="webx-include-cell is-feature" role="cell">
                    {row.label}
                  </div>
                  <div className="webx-include-cell is-check" role="cell">
                    <span className={row.ecommerce ? "webx-include-mark is-yes" : "webx-include-mark is-no"}>
                      {row.ecommerce ? "✓" : "—"}
                    </span>
                  </div>
                  <div className="webx-include-cell is-check" role="cell">
                    <span className={row.business ? "webx-include-mark is-yes" : "webx-include-mark is-no"}>
                      {row.business ? "✓" : "—"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="webx-include-cards mt-5 sm:hidden" data-reveal style={{ transitionDelay: "100ms" }}>
            <p className="webx-mobile-hint webx-mobile-hint-light mb-3">Swipe packages →</p>
            <div className="webx-include-cards-track">
              <article className="webx-include-card is-ecom">
                <p className="webx-include-plan-tag">Sell online</p>
                <h3 className="serif mt-2 text-[1.35rem] text-white">Ecommerce</h3>
                <ul>
                  {includeRows.map((r) => (
                    <li key={`e-${r.label}`} className={r.ecommerce ? undefined : "is-out"}>
                      <span className={r.ecommerce ? "webx-include-mark is-yes" : "webx-include-mark is-no"}>
                        {r.ecommerce ? "✓" : "—"}
                      </span>
                      <span>{r.label}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="webx-include-card is-biz">
                <p className="webx-include-plan-tag">Grow leads</p>
                <h3 className="serif mt-2 text-[1.35rem] text-white">Business</h3>
                <ul>
                  {includeRows.map((r) => (
                    <li key={`b-${r.label}`} className={r.business ? undefined : "is-out"}>
                      <span className={r.business ? "webx-include-mark is-yes" : "webx-include-mark is-no"}>
                        {r.business ? "✓" : "—"}
                      </span>
                      <span>{r.label}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>

          <div className="webx-include-note mt-5 sm:mt-6" data-reveal style={{ transitionDelay: "160ms" }}>
            <p>
              Need something outside this list? Tell us in the form — we scope extras clearly before work begins.
            </p>
            <a href="#enquire" className="webx-btn webx-btn-sm">
              Send My Project Details →
            </a>
          </div>
        </div>
      </section>

      <WebxMarquee tone="glow" reverse />

      <section id="enquire" className="webx-enquire-section relative z-[1] scroll-mt-20 pb-28 pt-2 sm:scroll-mt-24 sm:pb-12 lg:pb-16">
        <div className="webx-shell">
          <div className="webx-enquire" data-reveal>
            <div className="webx-enquire-copy">
              <div className="webx-enquire-title-row">
                <p className="webx-kicker">Hindalson Technology</p>
                <h2 className="serif text-[2rem] italic leading-[1.1] text-white sm:text-4xl lg:text-[2.6rem]">
                  Tell us what you need.
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-white/60 sm:text-[0.95rem]">
                Hindalson builds websites for two kinds of businesses only on this page: ecommerce brands, and
                service companies.
              </p>

              <div className="webx-enquire-perks">
                <div className="webx-enquire-perk">
                  <span className="webx-enquire-perk-icon" aria-hidden>
                    ⚡
                  </span>
                  <div className="webx-enquire-perk-text">
                    <h4>1 Business Day Turnaround</h4>
                    <p>We review your brief and reply with the recommended approach, timeline, and quote.</p>
                  </div>
                </div>

                <div className="webx-enquire-perk">
                  <span className="webx-enquire-perk-icon" aria-hidden>
                    💎
                  </span>
                  <div className="webx-enquire-perk-text">
                    <h4>Fixed &amp; Transparent Scope</h4>
                    <p>Clear deliverables and pricing with no hidden charges or scope surprises.</p>
                  </div>
                </div>

                <div className="webx-enquire-perk">
                  <span className="webx-enquire-perk-icon" aria-hidden>
                    🤝
                  </span>
                  <div className="webx-enquire-perk-text">
                    <h4>100% Code &amp; Asset Ownership</h4>
                    <p>Your domain, hosting access, code repository, and customer data remain yours.</p>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-3 pt-2">
                <a href={MAILTO} onClick={openEmailSheet} className="webx-enquire-mail">
                  <span>✉</span> {EMAIL}
                </a>
                <span className="text-white/20">|</span>
                <span className="text-xs text-white/50">Official WhatsApp: +86 198 0671 0053</span>
              </div>
            </div>

            <div className="webx-form-card">
              {submitted ? (
                <div className="flex min-h-[300px] flex-col justify-center py-6 text-center sm:min-h-[360px]">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00c8d4]/15 text-2xl text-[#0b6e72]">
                    ✓
                  </div>
                  <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#0b6e72]">
                    Request received
                  </p>
                  <h3 className="serif mt-1 text-3xl font-bold text-[#0f172a] sm:text-4xl">
                    Thank you!
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#475569]">
                    We’ve received your project details. Our team will review your requirements and reach out within 1 business day.
                  </p>
                  <div className="mt-6">
                    <a
                      href={MAILTO}
                      onClick={openEmailSheet}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0b6e72] hover:underline"
                    >
                      Need immediate assistance? Email {EMAIL} →
                    </a>
                  </div>
                </div>
              ) : (
                <div className="webx-form">
                  <div className="webx-form-head">
                    <span className="inline-block rounded-md bg-[#00c8d4]/12 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-[#0b6e72]">
                      Project Scope &amp; Proposal
                    </span>
                    <h3 className="serif mt-1.5 text-2xl font-bold text-[#0f172a] sm:text-[1.75rem]">
                      Start your project
                    </h3>
                    <p className="mt-1 text-xs text-[#475569] sm:text-sm">
                      Fill out the form below to receive a customized approach, estimated timeline, and quote.
                    </p>
                  </div>

                  <form className="grid gap-4" onSubmit={onSubmit}>
                    <label className="block">
                      Email
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="input-field"
                        placeholder="you@company.com"
                      />
                    </label>

                    <label className="block">
                      Describe your Requirement
                      <textarea
                        required
                        minLength={8}
                        rows={5}
                        value={form.brief}
                        onChange={(e) => setForm((f) => ({ ...f, brief: e.target.value }))}
                        className="input-field resize-y"
                        placeholder="Describe your requirement..."
                      />
                    </label>

                    {error ? (
                      <p className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-700">
                        {error}
                      </p>
                    ) : null}

                    <p className="webx-form-note">
                      No obligation. We review your requirements and reply with the recommended approach, estimated timeline, and next steps within 1 business day.
                    </p>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="webx-form-btn-submit"
                    >
                      {submitting ? "Submitting Your Details…" : "Send My Project Details →"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {mailOpen ? (
        <div className="webx-mail-sheet" role="dialog" aria-modal="true" aria-labelledby="webx-mail-title">
          <button type="button" className="webx-mail-sheet-backdrop" aria-label="Close" onClick={() => setMailOpen(false)} />
          <div className="webx-mail-sheet-panel">
            <p className="webx-kicker">Email us</p>
            <h3 id="webx-mail-title" className="serif mt-2 text-2xl text-white">
              {EMAIL}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              Choose how you want to email us:
            </p>
            <div className="webx-mail-sheet-actions">
              <button type="button" className="webx-btn" onClick={openGmailCompose}>
                Open Gmail
              </button>
              <button type="button" className="webx-ghost" onClick={openMailApp}>
                Open Mail App
              </button>
              <button type="button" className="webx-ghost" onClick={copyProjectEmail}>
                {mailCopied ? "Copied ✓" : "Copy Email"}
              </button>
            </div>
            <button type="button" className="webx-mail-sheet-close" onClick={() => setMailOpen(false)}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
