import { properties, type Region } from "./properties";

/**
 * The four markets CENTURY 21 Luxe states it covers, in the order the client
 * lists them. Each entry borrows a real image from a property in that region so
 * the explorer never shows stock photography.
 */

export type Location = {
  region: Region;
  /** Displayed under the name - a fact about the market, not a slogan. */
  note: string;
  copy: string;
  /** Sub-areas the client actually lists under this market. */
  areas: string[];
  imageRef: string;
  imageIndex: number;
};

export const locations: Location[] = [
  {
    region: "Marbella",
    note: "Golden Mile · Nueva Andalucía · Elviria",
    copy: "The benchmark the rest of the coast is priced against. Beachside plots on the Golden Mile and Guadalmina, the Golf Valley behind Puerto Banús, and the larger, calmer plots east towards Elviria.",
    areas: ["Golden Mile", "Guadalmina Baja", "Nueva Andalucía", "Elviria", "Marbella Centro"],
    imageRef: "R5463289",
    imageIndex: 3,
  },
  {
    region: "Benahavís",
    note: "El Madroñal · La Quinta · La Zagaleta",
    copy: "Twenty minutes inland and three hundred metres up. Gated estates in cork oak and pine, plots measured in hectares, and the sea seen from above rather than across.",
    areas: ["El Madroñal", "La Quinta", "La Zagaleta", "Los Arqueros"],
    imageRef: "R5439580",
    imageIndex: 2,
  },
  {
    region: "Estepona",
    note: "New Golden Mile · Atalaya · El Paraíso",
    copy: "The stretch where the coast still has room. Golf on both sides of the road, newer construction, and a price per square metre that has not yet caught Marbella.",
    areas: ["Atalaya", "El Paraíso", "New Golden Mile", "Estepona Centro"],
    imageRef: "R5448211",
    imageIndex: 2,
  },
  {
    region: "Sotogrande",
    note: "Alto · Costa · La Reserva",
    copy: "A private residential estate rather than a resort town. Polo in summer, four golf courses, a marina, and a covenant structure that has kept the density low since 1962.",
    areas: ["Sotogrande Alto", "Sotogrande Costa", "La Reserva", "San Roque Club"],
    imageRef: "R5464381",
    imageIndex: 1,
  },
];

export function countIn(region: Region) {
  return properties.filter((p) => p.region === region).length;
}

/**
 * The five lenses a buyer actually shops through. Each facet is illustrated by
 * the single strongest real image for it in the portfolio, and credits the
 * property it came from - so the selector doubles as a route into the listings.
 */
export type Facet = {
  id: string;
  label: string;
  headline: string;
  copy: string;
  imageRef: string;
  imageIndex: number;
  creditSlug: string;
  creditName: string;
};

export const facets: Facet[] = [
  {
    id: "architecture",
    label: "Architecture",
    headline: "The line before the finish",
    copy: "Horizontal banding, deep reveals, and a facade that withholds the view until you are inside it. Contemporary work on this coast is judged on restraint, not on scale.",
    imageRef: "R5374861",
    imageIndex: 3,
    creditSlug: "guadalmina-baja-villa",
    creditName: "Guadalmina Baja",
  },
  {
    id: "interiors",
    label: "Interiors",
    headline: "Rooms that hold their proportion",
    copy: "Stone, timber and light doing the work that furniture usually has to. Principal rooms sized for the plot rather than the floor plan.",
    imageRef: "R5374861",
    imageIndex: 9,
    creditSlug: "guadalmina-baja-villa",
    creditName: "Guadalmina Baja",
  },
  {
    id: "views",
    label: "Views",
    headline: "What the terrace is actually for",
    copy: "From the ridge above Benahavís the ground falls in wooded steps to Marbella and the Mediterranean behind it. Orientation is the one specification that cannot be renovated.",
    imageRef: "R5439580",
    imageIndex: 13,
    creditSlug: "el-madronal-villa",
    creditName: "El Madroñal",
  },
  {
    id: "location",
    label: "Location",
    headline: "Twenty minutes decides the price",
    copy: "Beachside, Golf Valley, or above the treeline. The same house moves by several million euros depending on which of the three it sits in.",
    imageRef: "R5464375",
    imageIndex: 2,
    creditSlug: "nueva-andalucia-villa",
    creditName: "Nueva Andalucía",
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    headline: "Three hundred days of outdoors",
    copy: "Lawn, palms, and a pool that is used in February. The reason the terrace on a Costa del Sol villa is specified as carefully as the kitchen.",
    imageRef: "R5463289",
    imageIndex: 4,
    creditSlug: "elviria-villa",
    creditName: "Elviria",
  },
];
