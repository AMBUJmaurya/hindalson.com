import type { ServiceData } from "@/data/services";
import { PremiumServiceLayout } from "@/components/services/PremiumServiceLayout";
import { WebsitePremiumPage } from "@/components/services/WebsitePremiumPage";

export function ServicePageView({ service }: { service: ServiceData }) {
  if (service.slug === "website-development") {
    return <WebsitePremiumPage service={service} />;
  }
  return <PremiumServiceLayout service={service} />;
}
