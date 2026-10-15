export type ProjectCategory = "all" | "website" | "seo" | "marketing";

export type PortfolioProject = {
  id: string;
  client: string;
  industry: string;
  service: string;
  category: Exclude<ProjectCategory, "all">;
  summary: string;
  focus: string[];
  year: string;
  tone: string;
  accent: string;
  url: string;
  image: string;
  domain: string;
  problem: string;
  solution: string;
  keyWork: string[];
  result: string;
  technologies: string[];
};

export const portfolioFilters: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "website", label: "Websites & Platforms" },
  { id: "seo", label: "SEO & Management" },
  { id: "marketing", label: "Growth & Ads" },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "loudsup",
    client: "LoudSup",
    industry: "Talent Marketplace",
    service: "Web Platform Development",
    category: "website",
    summary:
      "A modern freelance marketplace where businesses hire verified talent — escrow-protected, zero client fees.",
    focus: ["Marketplace UX", "Verified talent", "Escrow flows"],
    year: "2025",
    tone: "from-[#0c2426] via-[#0a1416] to-[#070a0b]",
    accent: "#22C55E",
    url: "https://loudsup.com/",
    image: "/portfolio/loudsup.png",
    domain: "loudsup.com",
    problem:
      "Traditional freelancer platforms charge heavy platform commissions on clients and have complex, cluttered interfaces that create friction between hiring managers and top talent.",
    solution:
      "Hindalson engineered a high-speed web application with clean onboarding, verified talent profiles, transparent escrow payment workflows, and zero client fees.",
    keyWork: [
      "Intuitive client-to-freelancer search & hiring flow",
      "Escrow milestone-based payment UX & verification badges",
      "High-converting landing pages with responsive performance",
      "Instant real-time project posting and proposal review",
    ],
    result: "Live in production — powering frictionless hiring between businesses and verified talent nationwide.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Node.js API", "Vercel Hosting"],
  },
  {
    id: "house-of-fitness",
    client: "The House of Fitness",
    industry: "Fitness & Wellness",
    service: "Website + Local SEO",
    category: "seo",
    summary:
      "Premium gym portal with memberships, programs, and enquiry paths — built for local discovery and conversion.",
    focus: ["Local SEO", "Memberships", "Enquiry flow"],
    year: "2025",
    tone: "from-[#122030] via-[#0d1520] to-[#080b10]",
    accent: "#C4A484",
    url: "https://thehouseoffitness.in/",
    image: "/portfolio/house-of-fitness.jpg",
    domain: "thehouseoffitness.in",
    problem:
      "A premium gym needed a high-end digital presence to attract high-intent local fitness seekers, explain tiered training memberships, and capture membership enquiries reliably.",
    solution:
      "Designed an elegant dark-aesthetic portal with visual training program breakdowns, WhatsApp booking CTAs, and a comprehensive local SEO foundation for Google Maps and search.",
    keyWork: [
      "Program & trainer showcase with video-ready layouts",
      "Integrated lead capture & WhatsApp consultation path",
      "Local schema markup, on-page optimization & fast loading",
      "Mobile-first responsive UX for gym visitors on the go",
    ],
    result: "Live portal generating recurring local membership enquiries and enhanced search visibility.",
    technologies: ["React / Next.js", "Local SEO Schema", "Tailwind CSS", "Analytics Tracking"],
  },
  {
    id: "primary-classes",
    client: "Primary Classes",
    industry: "EdTech Coaching",
    service: "Website & Parent Portal",
    category: "website",
    summary:
      "Live + recorded coaching platform for Class 1–8 — clear CTAs, parent trust, and structured learning tracks.",
    focus: ["EdTech UX", "Parent trust", "Clear CTAs"],
    year: "2025",
    tone: "from-[#14241e] via-[#0d1612] to-[#080c0a]",
    accent: "#3B82F6",
    url: "https://www.primaryclasses.com/",
    image: "/portfolio/primary-classes.png",
    domain: "primaryclasses.com",
    problem:
      "Parents of young school students needed a trustworthy, simple platform to explore live batches, faculty credentials, and syllabus details without navigating confusing LMS portals.",
    solution:
      "Built a bright, accessible EdTech platform highlighting faculty experience, course curriculums, student milestones, and an intuitive demo-class booking funnel.",
    keyWork: [
      "Grade-wise class syllabus discovery (Class 1–8)",
      "Instant free trial class scheduling form",
      "Parent trust signals, teacher profiles & reviews",
      "Ultra-fast page loads optimized for mobile parents",
    ],
    result: "Live EdTech platform streamlining student enrollments and trial class bookings.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Form Automation"],
  },
  {
    id: "kings-food",
    client: "King's Food",
    industry: "Hospitality & Cloud Kitchen",
    service: "Website Development",
    category: "website",
    summary:
      "Chef-led cloud kitchen site — menu discovery, brand story, and order-ready CTAs.",
    focus: ["Menu UX", "Brand polish", "Order CTAs"],
    year: "2025",
    tone: "from-[#241c14] via-[#16110d] to-[#0c0a08]",
    accent: "#EAB308",
    url: "http://72.61.253.19:9300/",
    image: "/portfolio/kings-food.jpg",
    domain: "King's Food",
    problem:
      "A chef-driven food brand wanted to showcase its specialty menu, kitchen hygiene standards, and catering options with instant direct ordering links.",
    solution:
      "Developed a rich, appetite-stimulating digital menu with visual dish categories, direct WhatsApp order routing, and party catering enquiry forms.",
    keyWork: [
      "Categorized food menu with dish highlights and pricing",
      "Direct ordering routing to delivery channels and WhatsApp",
      "Catering & bulk order consultation flow",
      "Fast mobile rendering for hungry customers",
    ],
    result: "Live culinary brand website increasing direct orders and catering inquiries.",
    technologies: ["Next.js", "Tailwind CSS", "Responsive Web Design"],
  },
  {
    id: "credo",
    client: "Credo Future Care",
    industry: "Travel & Consultations",
    service: "Website Development",
    category: "website",
    summary:
      "Multi-service company site for visas, tours, recruitment, and more — built for trust and consultations.",
    focus: ["Service pages", "Lead forms", "Trust design"],
    year: "2025",
    tone: "from-[#141a22] via-[#0d1016] to-[#08090c]",
    accent: "#3BA7FF",
    url: "https://credotravels.in/",
    image: "/portfolio/credo.jpg",
    domain: "credotravels.in",
    problem:
      "A comprehensive agency offering overseas recruitment, visa assistance, and holiday tours needed to clearly structure diverse offerings while building high client credibility.",
    solution:
      "Architected dedicated service tracks with clear documentation requirements, customer guidance steps, and targeted consultation booking forms.",
    keyWork: [
      "Structured navigation across visa, travel, and recruitment divisions",
      "Interactive consultation request funnel",
      "Compliance, certification, and agency trust markers",
      "SEO-ready page structure for service keywords",
    ],
    result: "Live corporate website establishing authoritative credibility and capturing qualified leads.",
    technologies: ["Next.js", "React", "SEO Meta Framework", "Tailwind CSS"],
  },
  {
    id: "bhumap",
    client: "Bhumap",
    industry: "Real Estate Tech",
    service: "Website & Discovery Portal",
    category: "website",
    summary:
      "Property discovery platform with verified listings, search, and owner listing flows.",
    focus: ["Search UX", "Listings", "Owner tools"],
    year: "2025",
    tone: "from-[#1a2218] via-[#101610] to-[#080a08]",
    accent: "#14B8A6",
    url: "https://bhumap.com/",
    image: "/portfolio/bhumap.jpg",
    domain: "bhumap.com",
    problem:
      "Buyers and sellers faced cluttered classifieds sites filled with outdated property data and unverified agent listings.",
    solution:
      "Engineered a clean real estate discovery platform with verified property cards, location filters, price range filters, and a streamlined owner listing submission flow.",
    keyWork: [
      "Intuitive property filter by city, locality, and property type",
      "Owner listing onboarding and verification portal",
      "Direct buyer-seller contact and WhatsApp enquiry channel",
      "High-speed map and card discovery layout",
    ],
    result: "Live property portal driving genuine real estate connections with verified listings.",
    technologies: ["Next.js", "React", "Tailwind CSS", "REST Backend"],
  },
  {
    id: "garib-nawaz",
    client: "Garib Nawaz Help Foundation",
    industry: "Nonprofit & Social Impact",
    service: "Website Development",
    category: "website",
    summary:
      "NGO site for donations, mission clarity, and transparent community support.",
    focus: ["Donation path", "Mission clarity", "Accessible UI"],
    year: "2025",
    tone: "from-[#1c1824] via-[#121018] to-[#0a090e]",
    accent: "#D97706",
    url: "https://garibnawazhelpfoundation.org/",
    image: "/portfolio/garib-nawaz.png",
    domain: "garibnawazhelpfoundation.org",
    problem:
      "An active nonprofit needed to showcase ongoing humanitarian initiatives, community aid drives, and enable transparent donation channels for supporters.",
    solution:
      "Created an inspiring, accessible web presence with mission updates, visual photo reports of relief drives, and seamless bank / UPI contribution details.",
    keyWork: [
      "Transparent project & relief program breakdown",
      "Direct UPI and bank donation path with zero platform deduction",
      "Accessible high-contrast typography and mobile UI",
      "Regular impact updates and event reports",
    ],
    result: "Live foundation website communicating clear social impact and facilitating transparent donor support.",
    technologies: ["Next.js", "React", "Accessible HTML5", "Tailwind CSS"],
  },
];

