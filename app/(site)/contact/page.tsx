import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact | Hindalson Technology",
  description:
    "Contact Hindalson Technology — request a free proposal for websites, apps, SEO-led management, or performance marketing across India. Email hello@hindalson.com.",
};

export default function Contact() {
  return <ContactPage />;
}
