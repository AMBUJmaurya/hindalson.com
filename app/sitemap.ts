import type { MetadataRoute } from "next";
import { servicesData } from "@/data/services";
import { getSiteUrl } from "@/lib/site";

type Entry = MetadataRoute.Sitemap[number];

function page(
  path: string,
  options: Pick<Entry, "changeFrequency" | "priority" | "lastModified"> = {},
): Entry {
  const base = getSiteUrl();
  return {
    url: path === "/" ? base : `${base}${path}`,
    lastModified: options.lastModified ?? new Date(),
    changeFrequency: options.changeFrequency ?? "monthly",
    priority: options.priority ?? 0.7,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: Entry[] = [
    page("/", { changeFrequency: "weekly", priority: 1 }),
    page("/about", { changeFrequency: "monthly", priority: 0.8 }),
    page("/services", { changeFrequency: "weekly", priority: 0.9 }),
    page("/portfolio", { changeFrequency: "weekly", priority: 0.8 }),
    page("/process", { changeFrequency: "monthly", priority: 0.7 }),
    page("/contact", { changeFrequency: "monthly", priority: 0.8 }),
    page("/privacy", { changeFrequency: "yearly", priority: 0.3 }),
    page("/terms", { changeFrequency: "yearly", priority: 0.3 }),
  ];

  const servicePages = servicesData.map((service) =>
    page(`/services/${service.slug}`, {
      changeFrequency: "monthly",
      priority: 0.85,
    }),
  );

  return [...staticPages, ...servicePages];
}
