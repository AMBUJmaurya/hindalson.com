import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About Us | Hindalson Technology",
  description:
    "Learn about Hindalson Technology — an India-based digital partner for websites, apps, SEO-led management, and performance marketing. Founded by Mohak Anand.",
};

export default function About() {
  return <AboutPage />;
}
