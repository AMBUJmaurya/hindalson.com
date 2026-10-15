import type { Metadata } from "next";
import { GoogleAdsTag } from "@/components/GoogleAdsTag";
import { WebAdsPage } from "@/components/landing/WebAdsPage";

export const metadata: Metadata = {
  title: "Websites & Ecommerce Stores for Businesses That Want to Grow | Hindalson Technology",
  description:
    "We build an online presence that makes your business look credible — and makes it easier for customers to buy or enquire. Custom ecommerce and business websites.",
  openGraph: {
    title: "Websites & Ecommerce Stores for Businesses That Want to Grow | Hindalson Technology",
    description:
      "Custom ecommerce and business websites designed around your brand, your customers, and your goals.",
    type: "website",
  },
};

export default function WebLandingPage() {
  return (
    <>
      <GoogleAdsTag />
      <WebAdsPage />
    </>
  );
}
