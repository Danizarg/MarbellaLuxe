/**
 * Verified business information for CENTURY 21 Luxe Marbella.
 * Every value here was read off the live site (marbellaluxe.es) during research —
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

export const nav = [
  { label: "Properties", href: "/properties" },
  { label: "Locations", href: "/#locations" },
  { label: "Sell", href: "/sell" },
  { label: "Invest", href: "/investment" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
] as const;
