/** Canonical public site origin (no trailing slash). */
export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hindalson.com";
  try {
    return new URL(raw).origin;
  } catch {
    return "https://www.hindalson.com";
  }
}
