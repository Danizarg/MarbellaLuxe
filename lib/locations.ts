import { properties, type Region } from "./properties";

/**
 * The markets the agency covers. The four it leads with are Marbella,
 * Benahavís, Estepona and Sotogrande; Mijas is added here because the client
 * genuinely trades there - it has listings in La Cala and Cerros del Águila and
 * publishes a Mijas renovations service.
 *
 * Each entry borrows a real image from a property in that region, so the
 * explorer never shows stock photography.
 */

export type Location = {
  region: Region;
  /** Sub-areas, shown under the name in the selector. */
  note: string;
  copy: string[];
  areas: string[];
  imageRef: string;
  imageIndex: number;
};

export const locations: Location[] = [
  {
    region: "Marbella",
    note: "Golden Mile · Nueva Andalucía · Elviria",
    copy: [
      "Marbella is the benchmark the rest of the coast is priced against, and it is really several markets stacked into one municipality. The beachside plots of the Golden Mile and Guadalmina hold the highest values and almost never come to market; the Golf Valley behind Puerto Banús trades faster and rents harder; and east of the town, towards Elviria and Las Chapas, the plots grow, the traffic thins and the same money buys noticeably more ground.",
      "What has not changed in twenty years is the premium on beachside land. There is a finite quantity of it, none of it is being created, and the gap between a beachside plot and one five minutes inland has widened in every cycle we have traded through.",
    ],
    areas: ["Golden Mile", "Guadalmina Baja", "Nueva Andalucía", "Puerto Banús", "Elviria"],
    imageRef: "R5463289",
    imageIndex: 3,
  },
  {
    region: "Benahavís",
    note: "El Madroñal · La Quinta · La Zagaleta",
    copy: [
      "Twenty minutes inland and three hundred metres up. Benahavís is where the coast's largest plots are, held inside gated estates — El Madroñal, La Zagaleta, La Quinta — with cork oak and pine instead of palms, and a temperature two or three degrees below the beach in August.",
      "Buyers come here for land and privacy, and they accept a drive to the sea in exchange. The compensation is the outlook: from most of these plots you look down the valley to Marbella with the Mediterranean behind it, which is a view that beachside property, by definition, cannot offer.",
    ],
    areas: ["El Madroñal", "La Quinta", "La Zagaleta", "Los Arqueros", "Benahavís village"],
    imageRef: "R5439580",
    imageIndex: 2,
  },
  {
    region: "Estepona",
    note: "New Golden Mile · Atalaya · El Paraíso",
    copy: [
      "Estepona is the stretch where the coast still has room, and it has been the most improved town on the western Costa del Sol over the past decade — a restored old quarter, a rebuilt marina, an extended seafront promenade, and a restaurant scene that now trades year-round rather than seasonally.",
      "The New Golden Mile between Estepona and Marbella carries most of the new construction, with golf on both sides of the road and a price per square metre that has still not caught Marbella's. For buyers weighing value against address, this is usually where the conversation ends up.",
    ],
    areas: ["Atalaya", "El Paraíso", "New Golden Mile", "Costalita", "Estepona Centro"],
    imageRef: "R5448211",
    imageIndex: 2,
  },
  {
    region: "Sotogrande",
    note: "Alto · Costa · La Reserva",
    copy: [
      "Sotogrande is a private residential estate rather than a resort town. Master-planned from 1962 with covenants that have kept density low and trees tall, it contains four golf courses including Valderrama, the Santa María polo grounds, the largest marina between Gibraltar and Marbella, and an international school.",
      "It behaves differently from the rest of the coast commercially too. The market is smaller, slower and less exposed to short-term holiday demand, and a meaningful proportion of properties change hands between people who already own there. Gibraltar airport is twenty minutes away.",
    ],
    areas: ["Sotogrande Alto", "Sotogrande Costa", "La Reserva", "Torreguadiaro", "San Roque Club"],
    imageRef: "R5464381",
    imageIndex: 1,
  },
  {
    region: "Mijas",
    note: "La Cala · Mijas Pueblo · Calahonda",
    copy: [
      "Mijas covers a long stretch of coast plus the hillside behind it, and it splits cleanly in two. La Cala and the coastal strip are beach-and-golf territory, well served and increasingly well built; Mijas Pueblo and the hills above are quieter, cheaper per square metre, and where the larger land holdings are.",
      "The practical argument for Mijas is the airport. From La Cala, Málaga is around twenty-five minutes rather than the forty-five to an hour from the western end of the coast — which matters a great deal to owners who come for long weekends rather than long summers.",
    ],
    areas: ["La Cala de Mijas", "Mijas Pueblo", "Calahonda", "Cerros del Águila", "Mijas Golf"],
    imageRef: "R5443351-N",
    imageIndex: 1,
  },
];

export function countIn(region: Region) {
  return properties.filter((p) => p.region === region).length;
}

/**
 * The five lenses buyers actually shop through. Each facet is illustrated by the
 * strongest real image for it in the current portfolio and credits the listing it
 * came from, so the selector doubles as a route into the properties.
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
    copy: "Contemporary work on this coast is judged on restraint rather than on scale. Horizontal banding, deep reveals and a facade that withholds the view until you are inside it will hold their value long after the fashion for double-height glazing has moved on — and the houses that age worst are almost always the ones that tried hardest at the front door.",
    imageRef: "R5374861",
    imageIndex: 3,
    creditSlug: "guadalmina-baja-villa",
    creditName: "Guadalmina Baja",
  },
  {
    id: "interiors",
    label: "Interiors",
    headline: "Rooms that hold their proportion",
    copy: "Stone, timber and daylight doing the work that furniture usually has to. The reception rooms that succeed here are sized to the plot rather than to the floor plan, and they keep working when the house is empty in February as well as when it is full in August.",
    imageRef: "R5374861",
    imageIndex: 9,
    creditSlug: "guadalmina-baja-villa",
    creditName: "Guadalmina Baja",
  },
  {
    id: "views",
    label: "Views",
    headline: "The one specification you cannot renovate",
    copy: "From the ridge above Benahavís the ground falls in wooded steps towards Marbella with the Mediterranean behind it. You can change a kitchen, move a pool and rebuild a roof. Orientation and outlook are fixed at the moment the plot is bought, and they are the single largest determinant of what a property is worth in ten years.",
    imageRef: "R5439580",
    imageIndex: 13,
    creditSlug: "el-madronal-villa",
    creditName: "El Madroñal",
  },
  {
    id: "location",
    label: "Location",
    headline: "Twenty minutes decides the price",
    copy: "Beachside, Golf Valley, or above the treeline. The same house moves by several million euros depending on which of the three it sits in, and the ranking has not changed in twenty years. Everything else about a property is negotiable; where it stands is not.",
    imageRef: "R5464375",
    imageIndex: 2,
    creditSlug: "nueva-andalucia-villa",
    creditName: "Nueva Andalucía",
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    headline: "Three hundred days of outdoors",
    copy: "Lawn, palms, and a pool that is genuinely used in February. It is the reason the terrace on a Costa del Sol villa is specified as carefully as the kitchen, and the reason a property with 400 m² of usable outdoor space commands a premium over one with a balcony and a better address.",
    imageRef: "R5463289",
    imageIndex: 4,
    creditSlug: "elviria-villa",
    creditName: "Elviria",
  },
];
