import type { Metadata } from "next";
import { WorkPage } from "@/components/work/WorkPage";

export const metadata: Metadata = {
  title: "Work | Hindalson Technology",
  description:
    "Selected work from Hindalson Technology — websites, SEO, and digital care for growing businesses across India.",
};

export default function Portfolio() {
  return <WorkPage />;
}
