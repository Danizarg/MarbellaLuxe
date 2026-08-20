import { properties, type Region } from "./properties";

/**
 * The markets the agency covers. The four it leads with are Marbella,
 * Benahavís, Estepona and Sotogrande; Mijas is added here because the client
 * genuinely trades there - it has listings in La Cala and Cerros del Águila and
 * publishes a Mijas renovations service.
 *
 * Copy is deliberately one paragraph per market. This runs on the homepage,
 * where the job is to seduce first and explain second; the longer argument for
 * each area belongs in a conversation, not in a scroll.
 */

export type Location = {
  region: Region;
  /** Sub-areas, shown under the name in the selector. */
  note: string;
  /** One strong sentence, then the qualifier. */
  statement: string;
  copy: string;
  areas: string[];
  imageRef: string;
  imageIndex: number;
};

export const locations: Location[] = [
  {
    region: "Marbella",
    note: "Golden Mile · Nueva Andalucía · Elviria",
    statement: "The benchmark everything else is priced against.",
    copy: "Really several markets in one municipality: beachside plots on the Golden Mile that almost never come up, the Golf Valley behind Puerto Banús that trades faster and rents harder, and the larger, calmer ground east towards Elviria.",
    areas: ["Golden Mile", "Guadalmina Baja", "Nueva Andalucía", "Puerto Banús", "Elviria"],
    imageRef: "R5463289",
    imageIndex: 3,
  },
  {
    region: "Benahavís",
    note: "El Madroñal · La Quinta · La Zagaleta",
    statement: "Twenty minutes inland and three hundred metres up.",
    copy: "Where the coast keeps its largest plots — gated estates in cork oak and pine, two or three degrees cooler in August, and a view down the valley that beachside property cannot offer by definition.",
    areas: ["El Madroñal", "La Quinta", "La Zagaleta", "Los Arqueros", "Benahavís village"],
    imageRef: "R5439580",
    imageIndex: 2,
  },
  {
    region: "Estepona",
    note: "New Golden Mile · Atalaya · El Paraíso",
    statement: "The stretch where the coast still has room.",
    copy: "A restored old quarter, a rebuilt marina and a restaurant scene that now trades year-round — with a price per square metre on the New Golden Mile that has still not caught Marbella.",
    areas: ["Atalaya", "El Paraíso", "New Golden Mile", "Costalita", "Estepona Centro"],
    imageRef: "R5448211",
    imageIndex: 2,
  },
  {
    region: "Sotogrande",
    note: "Alto · Costa · La Reserva",
    statement: "A private estate, not a resort town.",
    copy: "Master-planned from 1962 with covenants that kept density low and trees tall. Four golf courses including Valderrama, the polo grounds, a marina, an international school — and Gibraltar airport twenty minutes away.",
    areas: ["Sotogrande Alto", "Sotogrande Costa", "La Reserva", "Torreguadiaro", "San Roque Club"],
    imageRef: "R5464381",
    imageIndex: 1,
  },
  {
    region: "Mijas",
    note: "La Cala · Mijas Pueblo · Calahonda",
    statement: "Closest to the airport, by a wide margin.",
    copy: "Beach and golf along the coastal strip, quieter and cheaper per square metre in the hills behind it. From La Cala, Málaga is twenty-five minutes rather than the better part of an hour.",
    areas: ["La Cala de Mijas", "Mijas Pueblo", "Calahonda", "Cerros del Águila", "Mijas Golf"],
    imageRef: "R5443351-N",
    imageIndex: 1,
  },
];

export function countIn(region: Region) {
  return properties.filter((p) => p.region === region).length;
}

/**
 * The five lenses buyers shop through, pinned into a scroll sequence on the
 * homepage. Each is illustrated by the strongest real frame for it in the
 * portfolio and credits the listing it came from, so the sequence doubles as a
 * route into the properties.
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
    copy: "Contemporary work on this coast is judged on restraint, not on scale. The houses that age worst are the ones that tried hardest at the front door.",
    imageRef: "R5374861",
    imageIndex: 3,
    creditSlug: "guadalmina-baja-villa",
    creditName: "Guadalmina Baja",
  },
  {
    id: "interiors",
    label: "Interiors",
    headline: "Rooms that hold their proportion",
    copy: "Stone, timber and daylight doing the work furniture usually has to. Sized to the plot rather than to the floor plan.",
    imageRef: "R5374861",
    imageIndex: 9,
    creditSlug: "guadalmina-baja-villa",
    creditName: "Guadalmina Baja",
  },
  {
    id: "views",
    label: "Views",
    headline: "The one thing you cannot renovate",
    copy: "You can change a kitchen, move a pool, rebuild a roof. Orientation is fixed the moment the plot is bought — and it decides what the house is worth in ten years.",
    imageRef: "R5439580",
    imageIndex: 13,
    creditSlug: "el-madronal-villa",
    creditName: "El Madroñal",
  },
  {
    id: "location",
    label: "Location",
    headline: "Twenty minutes decides the price",
    copy: "Beachside, Golf Valley, or above the treeline. The same house moves by several million euros depending on which of the three it stands in.",
    imageRef: "R5464375",
    imageIndex: 2,
    creditSlug: "nueva-andalucia-villa",
    creditName: "Nueva Andalucía",
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    headline: "Three hundred days of outdoors",
    copy: "A terrace that is genuinely used in February. It is why outdoor space here is specified as carefully as the kitchen.",
    imageRef: "R5443516",
    imageIndex: 2,
    creditSlug: "atalaya-penthouse",
    creditName: "the Atalaya penthouse",
  },
];
