import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageView } from "@/components/services/ServicePageView";
import { getServiceBySlug, servicesData } from "@/data/services";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return { title: "Service | Hindalson Technology" };
  }
  return {
    title: `${service.title} | Hindalson Technology`,
    description: service.subhead,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  return <ServicePageView service={service} />;
}
