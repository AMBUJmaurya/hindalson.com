import Script from "next/script";

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18471716686";

/**
 * Google Ads gtag — mount only on /web (ads landing).
 * Works alongside site-wide GA4; uses the same dataLayer/gtag.
 */
export function GoogleAdsTag() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-web" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${ADS_ID}');
        `}
      </Script>
    </>
  );
}
