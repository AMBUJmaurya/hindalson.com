import type { Metadata } from "next";
import { ProcessPage } from "@/components/process/ProcessPage";

export const metadata: Metadata = {
  title: "Process | Hindalson Technology",
  description:
    "How Hindalson Technology delivers websites, apps, SEO, and marketing — from discovery and design to launch and ongoing management.",
};

export default function Process() {
  return <ProcessPage />;
}
