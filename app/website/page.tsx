import type { Metadata } from "next";
import { WebsitePpcPage } from "@/components/landing/WebsitePpcPage";

export const metadata: Metadata = {
  title: "Ecommerce & Service Websites | Hindalson Technology",
  description:
    "Hindalson builds websites for ecommerce stores and service companies in India. Product pages, service pages, and a clear path to buy or enquire.",
  openGraph: {
    title: "Ecommerce & Service Websites | Hindalson Technology",
    description:
      "Dedicated websites for stores that sell and companies that take clients. Typical launch in 3–6 weeks.",
    type: "website",
  },
};

export default function WebsiteLandingPage() {
  return <WebsitePpcPage />;
}
