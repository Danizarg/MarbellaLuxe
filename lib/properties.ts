/**
 * The live portfolio used across the redesign.
 *
 * Every figure below was read from the client's own listing pages on
 * marbellaluxe.es (reference, price, beds, baths, plot, built, terrace) and is
 * recorded in CLAUDE_CONTEXT.md -> "Property Data Used" together with its source
 * URL. Imagery lives in /public/properties/<ref>/NN.webp and is downloaded by
 * `npm run assets` - nothing is hotlinked at runtime.
 *
 * Narrative copy is written for this redesign; the hard numbers are the client's.
 */

export type Region = "Marbella" | "Benahavís" | "Estepona" | "Sotogrande";

export type Property = {
  ref: string;
  /** Slug used for /properties/<slug> */
  slug: string;
  name: string;
  location: string;
  region: Region;
  type: "Villa";
  price: number;
  beds: number;
  baths: number;
  /** m² */
  built: number;
  plot: number;
  terrace: number;
  imageCount: number;
  /** 1-based index into the image set */
  hero: number;
  gallery: number[];
  /** Short line under the name in cards. */
  standfirst: string;
  /** Two or three paragraphs for the detail page. */
  story: string[];
  /** Three factual highlights surfaced as a spec strip. */
  highlights: string[];
  sourceUrl: string;
  /** Flagship gets the full scroll-told treatment on the homepage. */
  flagship?: boolean;
};

export const properties: Property[] = [
  {
    ref: "R5374861",
    slug: "guadalmina-baja-villa",
    name: "Guadalmina Baja",
    location: "Guadalmina Baja, Marbella",
    region: "Marbella",
    type: "Villa",
    price: 9_900_000,
    beds: 8,
    baths: 10,
    built: 1303,
    plot: 3112,
    terrace: 165,
    imageCount: 24,
    hero: 1,
    gallery: [1, 2, 3, 9, 12, 14, 17, 20, 21],
    standfirst:
      "A contemporary beachside residence on a 3,112 m² plot, minutes from the Mediterranean.",
    story: [
      "The house sits low and wide behind mature planting, its horizontal timber banding reading as one long line against the sky. From the entrance court there is no view of the sea - only clipped topiary, a gravel apron, and a facade that gives very little away.",
      "Inside, a double-height hall opens into the full depth of the plot. Every principal room faces south onto the pool terrace, and the glazing folds back until the distinction between the living floor and the garden stops being useful. 1,303 m² of built space, arranged so that it never announces its size.",
      "Below the main floor sit the parts of the house that make it a residence rather than a villa: gym, spa, sauna, and a cinema lounge. Eight bedroom suites, ten bathrooms, and a principal suite with its own dressing room and terrace over the gardens.",
    ],
    highlights: ["3,112 m² plot", "Spa, sauna & private gym", "Minutes from Puerto Banús"],
    sourceUrl:
      "https://marbellaluxe.es/en/property/R5374861_detached-villa-guadalmina-baja/",
    flagship: true,
  },
  {
    ref: "R5439580",
    slug: "el-madronal-villa",
    name: "El Madroñal",
    location: "El Madroñal, Benahavís",
    region: "Benahavís",
    type: "Villa",
    price: 6_450_000,
    beds: 4,
    baths: 5,
    built: 526,
    plot: 9632,
    terrace: 0,
    imageCount: 14,
    hero: 2,
    gallery: [2, 1, 9, 13, 5, 6, 8, 12],
    standfirst:
      "Above the coast in a gated cork-oak estate, with the sea held at the end of the valley.",
    story: [
      "The road climbs away from the coast through cork oak and pine before reaching the gates of El Madroñal - one of the few addresses on this stretch where the landscape, not the architecture, sets the terms.",
      "The house is Andalusian in the older sense: white walls, clay tile, deep reveals, rooms that stay cool without effort. Nearly a hectare of grounds means the nearest neighbour is an idea rather than a building.",
      "What you buy here is the outlook. From the terrace the ground falls away in wooded steps to Marbella and the Mediterranean beyond it, and the light changes for most of the day.",
    ],
    highlights: ["9,632 m² grounds", "Gated cork-oak estate", "Sea and valley outlook"],
    sourceUrl: "https://marbellaluxe.es/en/property/R5439580_detached-villa-el-madronal/",
  },
  {
    ref: "R5463289",
    slug: "elviria-villa",
    name: "Elviria",
    location: "Elviria, Marbella East",
    region: "Marbella",
    type: "Villa",
    price: 4_200_000,
    beds: 7,
    baths: 8,
    built: 783,
    plot: 6127,
    terrace: 230,
    imageCount: 14,
    hero: 3,
    gallery: [3, 4, 2, 1, 6, 7, 9, 11],
    standfirst:
      "Sole agency. Two adjoining plots totalling 6,127 m², laid out around lawn and palms.",
    story: [
      "Set across two generous plots that were bought and combined, this is a house with room to breathe - 6,127 m² of level ground held behind planting, with the sea visible past the palms.",
      "Seven bedrooms and eight bathrooms across 783 m², plus 230 m² of terrace. The scale suits a family that arrives with other families.",
      "Elviria sits east of Marbella, far enough from the Golden Mile for the plots to grow and the traffic to thin, close enough that dinner in town is a twenty-minute decision.",
    ],
    highlights: ["Sole agency", "Two combined plots", "230 m² of terrace"],
    sourceUrl: "https://marbellaluxe.es/en/property/R5463289_detached-villa-elviria/",
  },
  {
    ref: "R5460766",
    slug: "la-quinta-villa",
    name: "La Quinta",
    location: "La Quinta, Benahavís",
    region: "Benahavís",
    type: "Villa",
    price: 3_650_000,
    beds: 4,
    baths: 4,
    built: 578,
    plot: 5287,
    terrace: 181,
    imageCount: 14,
    hero: 1,
    gallery: [1, 2, 3, 5, 6, 8, 10, 12],
    standfirst:
      "A traditional villa on 5,287 m² below La Quinta, bought for the land as much as the house.",
    story: [
      "Below the La Quinta golf course, on a plot that is unusually large for its price, sits a traditional Andalusian villa in original condition.",
      "578 m² built and 181 m² of terrace, arranged conventionally - which is precisely the opportunity. The bones are sound and the orientation is right; the layout belongs to a different decade.",
      "For a buyer willing to renovate, the arithmetic here is more interesting than anything already finished at this level.",
    ],
    highlights: ["5,287 m² plot", "Renovation upside", "Below La Quinta golf"],
    sourceUrl: "https://marbellaluxe.es/en/property/R5460766_detached-villa-la-quinta/",
  },
  {
    ref: "R5464381",
    slug: "sotogrande-alto-villa",
    name: "Sotogrande Alto",
    location: "Sotogrande Alto, San Roque",
    region: "Sotogrande",
    type: "Villa",
    price: 3_350_000,
    beds: 5,
    baths: 8,
    built: 1051,
    plot: 1786,
    terrace: 466,
    imageCount: 14,
    hero: 1,
    gallery: [1, 2, 3, 4, 6, 8, 10, 12],
    standfirst:
      "1,051 m² built and 466 m² of terrace on one of the quietest roads in the F Zone.",
    story: [
      "Sotogrande does not behave like the rest of the coast. It is older, greener and quieter, and the F Zone is the quietest part of it.",
      "This house answers that with 1,051 m² of built space and an extraordinary 466 m² of terrace - close to half the interior area again, outdoors.",
      "Five bedrooms, eight bathrooms, and the polo, golf and marina that make Sotogrande a season rather than a postcode.",
    ],
    highlights: ["466 m² of terrace", "F Zone, Sotogrande Alto", "Polo, golf & marina"],
    sourceUrl:
      "https://marbellaluxe.es/en/property/R5464381_detached-villa-sotogrande-alto/",
  },
  {
    ref: "R5464375",
    slug: "nueva-andalucia-villa",
    name: "Nueva Andalucía",
    location: "Parcelas del Golf, Nueva Andalucía",
    region: "Marbella",
    type: "Villa",
    price: 3_350_000,
    beds: 5,
    baths: 4,
    built: 350,
    plot: 500,
    terrace: 0,
    imageCount: 14,
    hero: 2,
    gallery: [2, 1, 3, 4, 5, 7, 9, 11],
    standfirst:
      "Inside the gates of Parcelas del Golf, with 24-hour security and Puerto Banús below.",
    story: [
      "Parcelas del Golf is a gated community in the middle of the Golf Valley, with 24-hour security and a street plan that has aged well.",
      "The villa is five bedrooms over 350 m², white-walled and tile-roofed, opening onto a pool terrace with the mountains behind it.",
      "Puerto Banús is a few minutes down the hill; three championship courses are closer than that.",
    ],
    highlights: ["Gated, 24-hour security", "Golf Valley address", "Minutes from Puerto Banús"],
    sourceUrl:
      "https://marbellaluxe.es/en/property/R5464375_detached-villa-nueva-andalucia/",
  },
  {
    ref: "R5448211",
    slug: "atalaya-villa",
    name: "Atalaya",
    location: "Atalaya, Estepona",
    region: "Estepona",
    type: "Villa",
    price: 2_300_000,
    beds: 5,
    baths: 5,
    built: 498,
    plot: 1000,
    terrace: 100,
    imageCount: 14,
    hero: 1,
    gallery: [1, 2, 4, 3, 6, 7, 9, 11],
    standfirst:
      "Andalusian outside, contemporary within - on a private 1,000 m² plot in Atalaya.",
    story: [
      "From the street this is a classical Andalusian villa: arched loggia, clay tile, palms over a hedge that does most of the work of privacy.",
      "Inside, the house has been taken forward - marble floors, reworked reception rooms, and a stair hall that carries light down from the first floor.",
      "Atalaya sits on the New Golden Mile between Marbella and Estepona, which in practice means golf on three sides and the beach in under ten minutes.",
    ],
    highlights: ["1,000 m² private plot", "New Golden Mile", "Contemporary interiors"],
    sourceUrl: "https://marbellaluxe.es/en/property/R5448211_detached-villa-atalaya/",
  },
];

/* ------------------------------------------------------------------ helpers */

export const flagship = properties.find((p) => p.flagship)!;

export function propertyBySlug(slug: string) {
  return properties.find((p) => p.slug === slug);
}

export function imageSrc(ref: string, n: number) {
  return `/properties/${ref}/${String(n).padStart(2, "0")}.webp`;
}

const euro = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export const formatPrice = (n: number) => euro.format(n);
export const formatArea = (n: number) => `${n.toLocaleString("en-GB")} m²`;
