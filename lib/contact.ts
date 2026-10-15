/**
 * Centralized contact configuration for Hindalson Technology.
 * Official Contact: +86 198 0671 0053 (China)
 */

export const CONTACT_CONFIG = {
  company: "Hindalson Technology",
  phone: {
    display: "+86 198 0671 0053",
    raw: "8619806710053",
    countryCode: "+86",
    country: "China",
    tel: "tel:+8619806710053",
  },
  email: "hello@hindalson.com",
  whatsappBaseUrl: "https://wa.me/8619806710053",
} as const;

/**
 * Returns a standardized WhatsApp link with an optional prefilled message.
 */
export function getWhatsAppUrl(message?: string): string {
  if (!message) {
    return CONTACT_CONFIG.whatsappBaseUrl;
  }
  return `${CONTACT_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

/**
 * Returns a standardized telephone link.
 */
export function getTelUrl(): string {
  return CONTACT_CONFIG.phone.tel;
}

/**
 * Validates international phone numbers, supporting China (+86), and all
 * standard E.164 international formats (7 to 15 digits).
 */
export function isValidInternationalPhone(phone: string): boolean {
  if (!phone || typeof phone !== "string") return false;
  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) {
    return false;
  }
  return /^\+?[\d\s\-().]{7,25}$/.test(trimmed);
}

/**
 * Cleans phone number digits for external links.
 */
export function sanitizePhoneDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}
