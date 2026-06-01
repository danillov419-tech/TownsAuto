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
  // TODO: replace the placeholders below with the client's real details.
  phone: "+1 (555) 200-1234",
  phoneHref: "tel:+15552001234",
  email: "sales@townsauto.com",
  city: "Dallas, TX",
  serviceArea: ["Dallas", "Atlanta", "Chicago"],
  address: "1234 Example Ave, Dallas, TX 75201",
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
  url: "https://townsauto.com",
} as const;

export type SiteConfig = typeof siteConfig;
