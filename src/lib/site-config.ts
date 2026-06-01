/**
 * Central business configuration for Towns Auto.
 * Edit these values once and they update across the whole site
 * (header, footer, contact page, metadata, etc.).
 */
export const siteConfig = {
  name: "Towns Auto",
  legalName: "Towns Auto",
  tagline: "Trusted Seller",
  description:
    "Affordable used cars, trucks, and SUVs for sale. Quality pre-owned vehicles at honest prices with simple financing.",
  // Primary contact is WhatsApp. The number also works for calls.
  phone: "+1 (262) 509-0225",
  phoneHref: "tel:+12625090225",
  whatsapp: "+1 (262) 509-0225",
  whatsappHref: "https://wa.me/12625090225",
  email: "kelvinej191@gmail.com",
  city: "Nashville, TN",
  serviceArea: ["Nashville", "Murfreesboro", "Franklin"],
  address: "2400 Nolensville Pike, Nashville, TN",
  hours: [
    { day: "Mon – Fri", time: "9:00 AM – 7:00 PM" },
    { day: "Saturday", time: "9:00 AM – 5:00 PM" },
    { day: "Sunday", time: "By appointment" },
  ],
  social: {
    facebook: "",
    instagram: "",
  },
  // Set this to your production URL once deployed (used for SEO/metadata).
  url: "https://townsautos.com",
} as const;

export type SiteConfig = typeof siteConfig;
