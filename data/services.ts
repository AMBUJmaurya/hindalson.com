export type ServiceTheme = {
  accent: string;
  accentSoft: string;
  accentGlow: string;
  gradientFrom: string;
  gradientTo: string;
  buttonGradient: string;
};

export type ServiceData = {
  slug: string;
  num: string;
  short: string;
  title: string;
  eyebrow: string;
  headline: string;
  headlineAccent?: string;
  subhead: string;
  ctaLabel: string;
  tags: string[];
  stats: { value: string; label: string }[];
  intro: string[];
  includes: { title: string; text: string }[];
  offerings: { title: string; text: string }[];
  process: { title: string; text: string }[];
  tools: string[];
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaText: string;
  theme: ServiceTheme;
};

export const servicesData: ServiceData[] = [
  {
    slug: "website-development",
    num: "01",
    short: "Websites",
    title: "Website Development",
    eyebrow: "01 — Website Development",
    headline: "Websites that look expensive, load fast, and convert.",
    headlineAccent: "expensive, load fast, and convert",
    subhead:
      "Business sites, stores, and landing pages designed to feel premium — and wired to bring enquiries.",
    ctaLabel: "Get a website proposal",
    tags: ["Responsive", "SEO-ready", "Fast load", "Lead forms"],
    stats: [
      { value: "3–6 weeks", label: "Typical launch" },
      { value: "Custom", label: "Scoped quote" },
      { value: "Yours", label: "Full ownership" },
    ],
    theme: {
      accent: "#3BA7FF",
      accentSoft: "rgba(59, 167, 255, 0.12)",
      accentGlow: "rgba(59, 167, 255, 0.28)",
      gradientFrom: "#0a1528",
      gradientTo: "#070b12",
      buttonGradient: "linear-gradient(90deg, #3BA7FF, #7B6CFF)",
    },
    intro: [
      "Your website is often the first serious impression of your brand. We build production-grade sites that feel premium, load fast, and guide visitors toward a clear next step.",
      "From first discovery call to launch support, one in-house team owns design, development, SEO foundations, and handover.",
    ],
    includes: [
      {
        title: "UI design",
        text: "Brand-aligned layouts that feel premium on desktop and mobile.",
      },
      {
        title: "Responsive development",
        text: "Clean builds that work across phones, tablets, and desktops.",
      },
      {
        title: "SEO-ready structure",
        text: "Technical foundations so your site can rank and get discovered.",
      },
      {
        title: "Launch support",
        text: "Testing, go-live, and a clear handover for your team.",
      },
    ],
    offerings: [
      {
        title: "Business / Brand websites",
        text: "Authority sites that explain what you do and convert enquiries.",
      },
      {
        title: "E-commerce websites",
        text: "Product catalogs, carts, and checkout flows built for clarity.",
      },
      {
        title: "Landing pages / funnels",
        text: "Focused pages for campaigns, offers, and lead capture.",
      },
      {
        title: "Custom web platforms",
        text: "Tailored web apps when a standard site isn’t enough.",
      },
    ],
    process: [
      {
        title: "Discovery",
        text: "Goals, audience, and requirements in one focused call.",
      },
      {
        title: "Design",
        text: "Wireframes and UI that match your brand and convert.",
      },
      {
        title: "Development",
        text: "Production-ready build with performance and SEO in mind.",
      },
      {
        title: "Testing",
        text: "QA across devices, forms, and key user flows.",
      },
      {
        title: "Launch & handover",
        text: "Go-live support and training so your team can run day one.",
      },
    ],
    tools: ["Next.js", "React", "WordPress / CMS options", "Vercel / Hosting", "Analytics setup"],
    faqs: [
      {
        q: "How long does a typical website take?",
        a: "Most business sites take a few weeks depending on pages, content readiness, and revision rounds. We’ll share a clear timeline after discovery.",
      },
      {
        q: "Do we own the website after launch?",
        a: "Yes. After agreed payments, final deliverables created for your project are yours as outlined in the proposal.",
      },
      {
        q: "Is domain and hosting included?",
        a: "Domain and hosting can be set up with you or handled by us. Costs depend on the provider and plan — we’ll recommend what fits.",
      },
      {
        q: "Can you manage the site after launch?",
        a: "Yes. Our monthly management retainer focuses on SEO, updates, security, and ongoing care.",
      },
    ],
    ctaTitle: "Need a website that works harder?",
    ctaText: "Starting after a short discovery call — clear scope, timeline, and next steps.",
  },
  {
    slug: "app-development",
    num: "02",
    short: "Apps",
    title: "App Development",
    eyebrow: "02 · App Development",
    headline: "Apps built for real users, not demo day.",
    headlineAccent: "not demo day.",
    subhead:
      "iOS, Android, and cross-platform products with clean UX, solid backends, and store-ready delivery.",
    ctaLabel: "Talk about an app build",
    tags: ["iOS", "Android", "Cross-platform", "Store launch"],
    stats: [
      { value: "MVP+", label: "Build approach" },
      { value: "Custom", label: "Scoped quote" },
      { value: "Support", label: "After launch" },
    ],
    theme: {
      accent: "#A78BFA",
      accentSoft: "rgba(167, 139, 250, 0.14)",
      accentGlow: "rgba(139, 92, 246, 0.3)",
      gradientFrom: "#140f22",
      gradientTo: "#0a0812",
      buttonGradient: "linear-gradient(90deg, #8B5CF6, #6366F1)",
    },
    intro: [
      "We build mobile and web apps that feel simple for users and reliable for your business — from first prototype to store deployment and support.",
      "Whether you need an MVP or a more complete product, we keep scope clear, communication tight, and delivery accountable.",
    ],
    includes: [
      {
        title: "UI/UX design",
        text: "Clear flows and interfaces designed around real user actions.",
      },
      {
        title: "Backend & APIs",
        text: "Secure data handling and integrations your product needs.",
      },
      {
        title: "QA & testing",
        text: "Functional checks before users ever see the release.",
      },
      {
        title: "Store deployment",
        text: "Help publishing to Play Store / App Store where required.",
      },
    ],
    offerings: [
      {
        title: "Android apps",
        text: "Native-feel Android products for your audience.",
      },
      {
        title: "iOS apps",
        text: "Polished iPhone/iPad experiences when Apple users matter.",
      },
      {
        title: "Cross-platform apps",
        text: "React Native / Flutter-style builds when one codebase makes sense.",
      },
      {
        title: "Web apps",
        text: "Browser-based products for dashboards, portals, and workflows.",
      },
    ],
    process: [
      {
        title: "Requirement gathering",
        text: "Features, users, constraints, and success metrics.",
      },
      {
        title: "Prototyping",
        text: "Flows and screens validated before heavy build spend.",
      },
      {
        title: "Development",
        text: "Iterative build with visible progress checkpoints.",
      },
      {
        title: "QA",
        text: "Bug hunting, edge cases, and release readiness.",
      },
      {
        title: "Deployment & support",
        text: "Launch help and optional post-release care.",
      },
    ],
    tools: ["React Native / Flutter", "Node.js", "APIs", "Firebase / custom backend", "Play Store / App Store"],
    faqs: [
      {
        q: "How long does app development take?",
        a: "Depends on features and platforms. An MVP can move faster; fuller products take longer. We confirm timelines after requirements are clear.",
      },
      {
        q: "What affects the cost?",
        a: "Platforms, feature depth, integrations, design complexity, and post-launch support. We quote only after understanding the brief.",
      },
      {
        q: "Do you maintain apps after launch?",
        a: "Yes. We can support updates, bug fixes, and ongoing improvements under a monthly plan.",
      },
      {
        q: "Can you integrate payments or third-party tools?",
        a: "Yes — payments, SMS, maps, CRMs, and other APIs can be scoped into the build.",
      },
    ],
    ctaTitle: "Have an app idea or MVP in mind?",
    ctaText: "Share the brief. We’ll help shape scope, timeline, and a practical build plan.",
  },
  {
    slug: "monthly-management",
    num: "03",
    short: "Management",
    title: "Monthly Management",
    eyebrow: "03 · Monthly Management",
    headline: "Proper SEO — not a checkbox.",
    headlineAccent: "not a checkbox.",
    subhead:
      "Monthly SEO-led care: rankings, content, technical fixes, updates, security, and clear reporting.",
    ctaLabel: "Start monthly plan",
    tags: ["Technical SEO", "On-page", "Content", "Security", "Reports"],
    stats: [
      { value: "Monthly", label: "Retainer cadence" },
      { value: "SEO-first", label: "Core focus" },
      { value: "Reports", label: "Clear updates" },
    ],
    theme: {
      accent: "#2DD4BF",
      accentSoft: "rgba(45, 212, 191, 0.12)",
      accentGlow: "rgba(45, 212, 191, 0.28)",
      gradientFrom: "#0a1a18",
      gradientTo: "#070f0e",
      buttonGradient: "linear-gradient(90deg, #2DD4BF, #22D3EE)",
    },
    intro: [
      "Launch is not the finish line. Our monthly management retainer is built around SEO first, so your site keeps getting found while staying secure and up to date.",
      "Ideal for businesses with an existing site/app, or for projects we built and now help grow month after month.",
    ],
    includes: [
      {
        title: "SEO & rankings",
        text: "Technical SEO, on-page improvements, and content direction.",
      },
      {
        title: "Content / product updates",
        text: "Page edits, posts, and routine content changes as needed.",
      },
      {
        title: "Security & backups",
        text: "Patches, monitoring habits, and recovery readiness.",
      },
      {
        title: "Monthly report",
        text: "Clear updates on what was done and what improved.",
      },
    ],
    offerings: [
      {
        title: "Technical SEO",
        text: "Speed, structure, indexing, and crawl issues handled properly.",
      },
      {
        title: "On-page SEO",
        text: "Titles, content clarity, internal links, and page intent.",
      },
      {
        title: "Local SEO support",
        text: "Help strengthening local / India visibility where relevant.",
      },
      {
        title: "Site health care",
        text: "Uptime awareness, updates, backups, and performance hygiene.",
      },
    ],
    process: [
      {
        title: "Audit",
        text: "Current SEO health, gaps, and quick wins.",
      },
      {
        title: "Plan",
        text: "Monthly priorities tied to your business goals.",
      },
      {
        title: "Execute",
        text: "SEO tasks, fixes, content, and updates shipped consistently.",
      },
      {
        title: "Measure",
        text: "Track movement and adjust what isn’t working.",
      },
      {
        title: "Report",
        text: "Simple monthly summary — no jargon dump.",
      },
    ],
    tools: ["Search Console", "Analytics", "SEO tooling", "CMS updates", "Backup / monitoring"],
    faqs: [
      {
        q: "Is SEO the main focus of monthly management?",
        a: "Yes. SEO is the core. Updates, security, and backups support that so growth isn’t blocked by a neglected site.",
      },
      {
        q: "How long should we stay on a retainer?",
        a: "SEO compounds over time. Most businesses see better results with consistent monthly work rather than one-off fixes.",
      },
      {
        q: "What’s the response time?",
        a: "Routine work follows the monthly plan. Urgent issues are prioritised as agreed in the retainer scope.",
      },
      {
        q: "Can we cancel later?",
        a: "Retainers can be set with clear terms. We’ll keep cancellation and notice periods transparent in the agreement.",
      },
    ],
    ctaTitle: "Want SEO that doesn’t stop after launch?",
    ctaText: "Start a monthly plan. We’ll audit where you are and outline the first 30 days.",
  },
  {
    slug: "performance-marketing",
    num: "04",
    short: "Marketing",
    title: "Performance Marketing",
    eyebrow: "04 — Performance Marketing",
    headline: "Paid traffic with tracking, creative, and weekly optimization.",
    headlineAccent: "creative, and weekly",
    subhead:
      "Meta & Google campaigns built around qualified leads — with tracking and continuous optimization.",
    ctaLabel: "Get a growth plan",
    tags: ["Meta Ads", "Google Ads", "Tracking", "Weekly opts"],
    stats: [
      { value: "Meta · Google", label: "Channels" },
      { value: "Custom", label: "Management fee" },
      { value: "Weekly", label: "Optimization" },
    ],
    theme: {
      accent: "#FB7185",
      accentSoft: "rgba(251, 113, 133, 0.14)",
      accentGlow: "rgba(244, 63, 94, 0.28)",
      gradientFrom: "#1a0c10",
      gradientTo: "#0c0708",
      buttonGradient: "linear-gradient(90deg, #FB7185, #F472B6)",
    },
    intro: [
      "We run performance campaigns that chase real enquiries and sales conversations — not vanity metrics.",
      "From audit to weekly optimization, you get a clear plan, transparent reporting, and continuous improvement.",
    ],
    includes: [
      {
        title: "Ad strategy",
        text: "Audience, offers, and channel plan matched to your goals.",
      },
      {
        title: "Creative & copy",
        text: "Ads designed to stop the scroll and invite action.",
      },
      {
        title: "Tracking & reporting",
        text: "Measurement set up so you can see what’s working.",
      },
      {
        title: "Ongoing optimization",
        text: "Budget, targeting, and creatives refined continuously.",
      },
    ],
    offerings: [
      {
        title: "Meta Ads",
        text: "Facebook & Instagram campaigns for awareness and leads.",
      },
      {
        title: "Google Ads",
        text: "Search and intent-driven campaigns for high-intent traffic.",
      },
      {
        title: "Lead generation funnels",
        text: "Landing pages and flows built around conversion.",
      },
      {
        title: "Campaign management",
        text: "Retainer-style management with regular optimization.",
      },
    ],
    process: [
      {
        title: "Audit",
        text: "Current ads, tracking, and opportunity gaps.",
      },
      {
        title: "Strategy",
        text: "Offer, audience, budget direction, and KPIs.",
      },
      {
        title: "Setup",
        text: "Campaigns, creatives, and conversion tracking live.",
      },
      {
        title: "Launch",
        text: "Controlled rollout with early learning checks.",
      },
      {
        title: "Optimize & report",
        text: "Improve what works. Cut what doesn’t. Report clearly.",
      },
    ],
    tools: ["Meta Ads Manager", "Google Ads", "Analytics", "Pixel / tag setup", "Landing pages"],
    faqs: [
      {
        q: "Is ad spend included in your fee?",
        a: "No. Media spend goes to Meta/Google. Our fee covers strategy, setup, creatives support, and optimization as scoped.",
      },
      {
        q: "What’s a sensible starting ad budget?",
        a: "It depends on market and goals. We’ll recommend a practical range after understanding your offer and location.",
      },
      {
        q: "How often do you report?",
        a: "You’ll get clear updates on a regular cadence — typically weekly/bi-weekly plus monthly summary, based on the plan.",
      },
      {
        q: "Do you guarantee leads or ROAS?",
        a: "We don’t sell fake guarantees. We commit to professional setup, testing, and optimization with transparent reporting.",
      },
    ],
    ctaTitle: "Need better leads from paid ads?",
    ctaText: "Request a free ad audit. We’ll review what’s working and where budget is leaking.",
  },
];

export function getServiceBySlug(slug: string) {
  return servicesData.find((service) => service.slug === slug);
}

export function getOtherServices(slug: string) {
  return servicesData.filter((service) => service.slug !== slug);
}
