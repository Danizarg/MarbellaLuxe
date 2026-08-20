/**
 * Verified business information for CENTURY 21 Luxe Marbella.
 * Every value here was read off the live site (marbellaluxe.es) during research -
 * see CLAUDE_CONTEXT.md → "Verified Business Information". Do not invent values.
 */
export const site = {
  name: "CENTURY 21 Luxe",
  shortName: "C21 Luxe",
  city: "Marbella",
  tagline: "Luxury property on the Costa del Sol",
  officialSite: "http://luxe.century21.es",
  email: "luxe@century21.es",
  phone: "+34 667 273 377",
  phoneHref: "+34667273377",
  address: {
    line1: "Centro Comercial Diana Park, local 21",
    line2: "29680 El Paraíso",
    region: "Estepona · Málaga",
  },
  languages: [
    "English",
    "Spanish",
    "Dutch",
    "French",
    "Russian",
    "Ukrainian",
    "Arabic",
    "Swedish",
    "Finnish",
  ],
  experienceYears: 20,
} as const;

/** Header navigation. Kept to six items; the footer carries the full map. */
export const nav = [
  { label: "Properties", href: "/properties" },
  { label: "Rentals", href: "/rentals" },
  { label: "Services", href: "/services" },
  { label: "Locations", href: "/#locations" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = [
  {
    heading: "Buying",
    links: [
      { label: "All properties", href: "/properties" },
      { label: "Villas", href: "/properties?category=Villa" },
      { label: "Apartments", href: "/properties?category=Apartment" },
      { label: "Penthouses", href: "/properties?category=Penthouse" },
      { label: "New developments", href: "/properties?category=New+development" },
      { label: "Plots & land", href: "/properties?category=Plot" },
      { label: "Commercial & hotels", href: "/properties?category=Hotel" },
      { label: "Long-term rentals", href: "/rentals" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Property valuation", href: "/services/valuation" },
      { label: "Renovations", href: "/services/renovations" },
      { label: "Architect studio", href: "/services/architect-studio" },
      { label: "Personal buying agent", href: "/services/buying-agent" },
      { label: "Developers & investors", href: "/services/developers-and-investors" },
      { label: "Sell or let your property", href: "/sell" },
      { label: "Purchase costs & investment", href: "/investment" },
    ],
  },
  {
    heading: "Agency",
    links: [
      { label: "About us", href: "/about" },
      { label: "The team", href: "/team" },
      { label: "Careers & internships", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;
