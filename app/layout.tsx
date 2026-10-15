import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { Instrument_Serif, Outfit } from "next/font/google";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-G71N01G1Y3";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#10151c",
};

export const metadata: Metadata = {
  title: "Hindalson Technology | Websites, Apps & Growth",
  description:
    "Hindalson Technology builds and manages websites, apps, and performance marketing for small and mid-size businesses across India.",
  applicationName: "Hindalson Technology",
  metadataBase: new URL(getSiteUrl()),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon-32.png"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Hindalson Technology | Build. Manage. Grow.",
    description:
      "Production-grade website development, app development, monthly management, and performance marketing.",
    type: "website",
    images: [{ url: "/icon-512.png", width: 512, height: 512, alt: "Hindalson Technology" }],
  },
  twitter: {
    card: "summary",
    title: "Hindalson Technology | Build. Manage. Grow.",
    description:
      "Production-grade website development, app development, monthly management, and performance marketing.",
    images: ["/icon-512.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-surface text-ink">
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { anonymize_ip: true });
          `}
        </Script>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
