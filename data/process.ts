export type ProcessStep = {
  num: string;
  title: string;
  tag: string;
  text: string;
  detail: string;
  duration: string;
  deliverables: string[];
  accent: string;
};

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "Discovery",
    tag: "Listen",
    text: "Goals, audience, constraints, and success metrics in one focused call.",
    detail:
      "We map what you sell, who you serve, and what “good” looks like — so the build starts with clarity, not assumptions.",
    duration: "1–3 days",
    deliverables: [
      "Discovery call & notes",
      "Scope outline",
      "Success metrics",
      "Timeline draft",
    ],
    accent: "#00c8d4",
  },
  {
    num: "02",
    title: "Design",
    tag: "Shape",
    text: "Wireframes and UI that match your brand and convert visitors.",
    detail:
      "Structure first, then polish. Pages are designed to guide visitors toward a call, form, or WhatsApp — not just look pretty.",
    duration: "3–7 days",
    deliverables: [
      "Information architecture",
      "Key page layouts",
      "Brand-aligned UI",
      "Revision round",
    ],
    accent: "#3BA7FF",
  },
  {
    num: "03",
    title: "Development",
    tag: "Build",
    text: "Clean, production-ready builds with SEO and analytics wired in.",
    detail:
      "We build for speed, mobile, and ownership. Forms, tracking, and SEO foundations go in during the build — not as an afterthought.",
    duration: "1–4 weeks",
    deliverables: [
      "Responsive build",
      "Forms & CTAs",
      "SEO basics",
      "Analytics setup",
    ],
    accent: "#A78BFA",
  },
  {
    num: "04",
    title: "Launch",
    tag: "Ship",
    text: "QA, go-live, handover, and training so your team can run day one.",
    detail:
      "Before go-live we stress-test flows, fix edge cases, then hand over access with a clear walkthrough of what you own.",
    duration: "2–5 days",
    deliverables: [
      "QA checklist",
      "Go-live support",
      "Access handover",
      "Team walkthrough",
    ],
    accent: "#2DD4BF",
  },
  {
    num: "05",
    title: "Ongoing Management",
    tag: "Grow",
    text: "SEO, updates, monitoring, and growth — if you want us retained.",
    detail:
      "Launch is not the finish line. Monthly care keeps pages fresh, rankings compounding, and issues caught early.",
    duration: "Monthly",
    deliverables: [
      "SEO & content care",
      "Updates & fixes",
      "Performance checks",
      "Clear reporting",
    ],
    accent: "#FB7185",
  },
];

export const processPrinciples = [
  {
    title: "One accountable team",
    text: "Design, build, SEO, and marketing stay under one roof — no silent handoffs.",
  },
  {
    title: "Clear communication",
    text: "You always know what’s next, what’s blocked, and when you’ll see progress.",
  },
  {
    title: "Lead-first decisions",
    text: "Every stage optimises for enquiries — calls, forms, and WhatsApp — not vanity.",
  },
];
