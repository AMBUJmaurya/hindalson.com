export type AdminNavItem = {
  href: string;
  label: string;
  description: string;
  live: boolean;
  badge?: string;
};

export const adminNavMain: AdminNavItem[] = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    description: "Overview & quick actions",
    live: true,
  },
  {
    href: "/admin/leads",
    label: "Leads",
    description: "Contact & proposal requests",
    live: true,
  },
  {
    href: "/admin/testimonials",
    label: "Testimonials",
    description: "Client voices on homepage",
    live: true,
  },
];

export const adminNavSoon: AdminNavItem[] = [
  {
    href: "#",
    label: "Portfolio",
    description: "Work & case studies",
    live: false,
    badge: "Soon",
  },
  {
    href: "#",
    label: "Blog",
    description: "Articles & updates",
    live: false,
    badge: "Soon",
  },
  {
    href: "#",
    label: "Settings",
    description: "Site & admin preferences",
    live: false,
    badge: "Soon",
  },
];

export const adminModuleCards = [...adminNavMain, ...adminNavSoon];
