/**
 * The portfolio used across the site.
 *
 * Every figure below - reference, price, bedrooms, bathrooms, built area, plot
 * and terrace - was read from the client's own listing pages on marbellaluxe.es
 * and is recorded in CLAUDE_CONTEXT.md together with its source URL. Narrative
 * copy is written for this redesign; the hard numbers are the client's and must
 * never be invented or adjusted.
 *
 * Imagery lives in /public/properties/<ref>/NN.webp and is downloaded by
 * `npm run assets`. Nothing is hotlinked at runtime.
 */

export type Region = "Marbella" | "Benahavís" | "Estepona" | "Sotogrande" | "Mijas";

export type Category =
  | "Villa"
  | "Apartment"
  | "Penthouse"
  | "Plot"
  | "New development"
  | "Commercial"
  | "Hotel";

export type Property = {
  ref: string;
  slug: string;
  name: string;
  location: string;
  region: Region;
  /** Broad category used by the search filter. */
  category: Category;
  /** The client's own property-type string, shown verbatim on the detail page. */
  kind: string;
  price: number;
  /** Upper bound where the client quotes a range (new developments). */
  priceTo?: number;
  beds: number;
  baths: number;
  /** Overrides the numeric beds where the client quotes a range, e.g. "3 – 4". */
  bedsLabel?: string;
  bathsLabel?: string;
  /** m² */
  built: number;
  plot: number;
  terrace: number;
  imageCount: number;
  hero: number;
  gallery: number[];
  standfirst: string;
  story: string[];
  highlights: string[];
  sourceUrl: string;
  flagship?: boolean;
};

const SRC = "https://marbellaluxe.es/en/property/";

export const properties: Property[] = [
  /* ------------------------------------------------------------------ villas */
  {
    ref: "R5374861",
    slug: "guadalmina-baja-villa",
    name: "Guadalmina Baja",
    location: "Guadalmina Baja, Marbella",
    region: "Marbella",
    category: "Villa",
    kind: "Detached Villa",
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
      "A contemporary residence of 1,303 m² set on a private plot of 3,112 m² in one of Marbella's most established beachside communities, a short drive from Puerto Banús and the beaches of San Pedro.",
    story: [
      "The house sits low and wide behind mature planting, its horizontal timber banding reading as a single long line against the sky. There is nothing of the sea from the entrance court — only clipped topiary, a gravel apron and a facade that deliberately gives very little away. That reticence is the point. Guadalmina Baja is a community where the houses are set back from the road and privacy is treated as a specification rather than a bonus, and this property is a careful expression of that idea.",
      "Inside, the plan opens up completely. A double-height entrance hall runs through to the full depth of the plot, and every principal room faces south onto the pool terrace. The glazing folds away almost entirely, so that on most days of the year the distinction between the living floor and the garden stops being useful. The reception rooms are generous without being cavernous: a main lounge, a formal dining room, a second informal sitting area, and a designer kitchen finished in stone and dark timber that opens onto a covered terrace for outdoor dining.",
      "The bedroom accommodation runs to eight suites and ten bathrooms. The principal suite occupies its own wing, with a dressing room, a spa-inspired bathroom in book-matched marble, and a private terrace looking over the gardens and pool. The remaining suites are arranged so that guests, family and staff can occupy the house at the same time without ever crossing paths — the kind of planning that only really matters at this scale, and is conspicuous when it is missing.",
      "Below the main floor is the part of the property that makes it a residence rather than simply a large villa: a private gym, a spa with sauna, a cinema lounge and a garage. Outside, the grounds have been landscaped for year-round use, with a heated pool, several distinct seating areas and lawn enough to be genuinely useful. Guadalmina Baja itself puts three golf courses, two international schools and the beach within a few minutes' drive, while Puerto Banús is close enough for dinner and far enough not to be heard.",
    ],
    highlights: [
      "3,112 m² private plot",
      "Gym, spa, sauna and cinema lounge",
      "Beachside Guadalmina Baja, minutes from Puerto Banús",
    ],
    sourceUrl: `${SRC}R5374861_detached-villa-guadalmina-baja/`,
    flagship: true,
  },
  {
    ref: "R5439580",
    slug: "el-madronal-villa",
    name: "El Madroñal",
    location: "El Madroñal, Benahavís",
    region: "Benahavís",
    category: "Villa",
    kind: "Detached Villa",
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
      "An Andalusian country house of 526 m² standing in grounds of 9,632 m² inside the gated El Madroñal estate, with uninterrupted views down the valley to Marbella and the Mediterranean.",
    story: [
      "The approach tells you most of what you need to know. The road climbs steadily away from the coast through cork oak and umbrella pine, the temperature drops a few degrees, and after ten minutes you reach the gates of El Madroñal — a private estate of large plots and long-established gardens, where the landscape rather than the architecture sets the terms.",
      "The house is Andalusian in the older and better sense of the word: thick white walls, hand-made clay roof tiles, deep window reveals that keep the rooms cool without any help, and a plan that turns inward onto shaded courtyards. Four bedroom suites and five bathrooms are arranged over two floors, with the main reception rooms opening directly onto a terrace that runs the full width of the south elevation.",
      "The grounds are the real luxury here. Nearly a hectare of established garden means the nearest neighbour is a concept rather than a building, and the planting — olive, cork oak, cypress, bougainvillea — has had decades to mature. A swimming pool sits on its own terrace a level below the house, positioned so that the water lines up with the horizon when you swim towards it.",
      "What a buyer is really acquiring at El Madroñal is the outlook and the silence. From the terrace the ground falls away in wooded steps towards Marbella, with the sea beyond and the lights of the coast appearing after dark. It is fifteen minutes to San Pedro and twenty-five to Puerto Banús, but from the garden there is no evidence that either exists.",
    ],
    highlights: [
      "9,632 m² of established grounds",
      "Gated estate with 24-hour security",
      "Panoramic valley and sea views",
    ],
    sourceUrl: `${SRC}R5439580_detached-villa-el-madronal/`,
  },
  {
    ref: "R5463289",
    slug: "elviria-villa",
    name: "Elviria",
    location: "Elviria, Marbella East",
    region: "Marbella",
    category: "Villa",
    kind: "Detached Villa",
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
      "Offered as a sole agency: a seven-bedroom villa of 783 m² set across two adjoining plots totalling 6,127 m², with 230 m² of terrace, mature palms and level lawn on the quieter eastern side of Marbella.",
    story: [
      "Two neighbouring plots were bought and combined to create this property, and the difference that makes is immediately obvious. Where most villas in this bracket sit tightly within their boundaries, this one has 6,127 m² of level ground around it — enough for a full-size lawn, a substantial pool terrace and a screen of mature planting on every side. The sea is visible past the palms from the upper floor and from most of the garden.",
      "The house itself runs to 783 m² across two floors, with seven bedrooms and eight bathrooms. The ground floor is given over to entertaining: a double-aspect main lounge, a separate family room, a dining room that seats twelve comfortably, and a kitchen with a breakfast area that opens onto the covered terrace. The scale suits a family that regularly arrives with other families, which is precisely the market Elviria has always served.",
      "Outside, 230 m² of terrace wraps the southern and western elevations, giving both morning and evening seating without moving the furniture. The pool sits at the centre of the lawn rather than tight against the house, so the garden reads as a garden rather than as a surround.",
      "Elviria sits east of Marbella town, far enough out that plots grow and traffic thins, close enough that dinner in Marbella is a twenty-minute decision. The beaches here are among the best on this stretch of coast, the Santa María golf course is a few minutes inland, and the German and English international schools are both within a short drive.",
    ],
    highlights: [
      "Sole agency",
      "Two combined plots totalling 6,127 m²",
      "230 m² of terrace and level lawn",
    ],
    sourceUrl: `${SRC}R5463289_detached-villa-elviria/`,
  },
  {
    ref: "R5460766",
    slug: "la-quinta-villa",
    name: "La Quinta",
    location: "La Quinta, Benahavís",
    region: "Benahavís",
    category: "Villa",
    kind: "Detached Villa",
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
      "A traditional villa of 578 m² on an exceptional 5,287 m² plot below the La Quinta golf course — sound, well oriented, and offering unusually clear scope for renovation or replacement.",
    story: [
      "This is a property bought for its land as much as for its house. At 5,287 m², the plot is considerably larger than anything else at this price in the immediate area, and it sits on the lower slopes below the La Quinta golf course, where the gradient is gentle and the orientation is due south.",
      "The existing villa runs to 578 m² with four bedrooms, four bathrooms and 181 m² of terrace, arranged in the conventional manner of its period: formal rooms at the front, service at the back, bedrooms above. It is in original condition and entirely habitable, but the layout belongs to a different decade, and the ceiling heights and window openings are of their time.",
      "That is precisely where the opportunity lies. The structure is sound, the orientation is right, and the plot has room for a substantially larger footprint. For a buyer prepared to renovate — or to rebuild altogether — the arithmetic here is more interesting than almost anything already finished at this level. Our in-house architect studio can produce indicative schemes and costings before an offer is made.",
      "La Quinta is one of the more settled parts of Benahavís: a mature golf community with its own club house and hotel, ten minutes from Puerto Banús and San Pedro, and with the mountain road up to Ronda beginning just above it.",
    ],
    highlights: [
      "5,287 m² plot, south-facing",
      "Clear renovation or rebuild potential",
      "Below the La Quinta golf course",
    ],
    sourceUrl: `${SRC}R5460766_detached-villa-la-quinta/`,
  },
  {
    ref: "R5464381",
    slug: "sotogrande-alto-villa",
    name: "Sotogrande Alto",
    location: "Sotogrande Alto, San Roque",
    region: "Sotogrande",
    category: "Villa",
    kind: "Detached Villa",
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
      "A contemporary residence of 1,051 m² with an exceptional 466 m² of terrace, on one of the quietest roads in the F Zone of Sotogrande Alto.",
    story: [
      "Sotogrande does not behave like the rest of the Costa del Sol. Laid out from 1962 as a private residential estate rather than a resort town, it has kept its density low, its trees tall and its streets quiet, and the F Zone of Sotogrande Alto is the quietest part of it.",
      "The house answers that setting with 1,051 m² of built space and, unusually, 466 m² of terrace — close to half the interior area again, outdoors. The design is contemporary and low-slung, arranged around a central courtyard so that light reaches the middle of the plan, with full-height glazing on the southern elevation and deep overhangs to keep the summer sun off it.",
      "Five bedroom suites and eight bathrooms are distributed across two levels, with the principal suite opening onto its own section of terrace. The main living space runs the width of the house and connects directly to the pool deck, and there is a separate guest apartment with its own entrance.",
      "Sotogrande itself is the draw as much as the house. Four golf courses including Valderrama, the largest marina between Gibraltar and Marbella, the Santa María polo grounds, and an international school — all within the estate. Gibraltar airport is twenty minutes away, which for a certain kind of buyer settles the matter entirely.",
    ],
    highlights: [
      "466 m² of terrace",
      "F Zone, Sotogrande Alto",
      "Polo, four golf courses and marina within the estate",
    ],
    sourceUrl: `${SRC}R5464381_detached-villa-sotogrande-alto/`,
  },
  {
    ref: "R5464375",
    slug: "nueva-andalucia-villa",
    name: "Nueva Andalucía",
    location: "Parcelas del Golf, Nueva Andalucía",
    region: "Marbella",
    category: "Villa",
    kind: "Detached Villa",
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
      "A five-bedroom villa of 350 m² inside the gated community of Parcelas del Golf, with 24-hour security, mountain views and Puerto Banús a few minutes down the hill.",
    story: [
      "Parcelas del Golf is one of the better-planned gated communities in the Golf Valley: manned security around the clock, wide streets that have aged well, and plots large enough that the houses are not looking into one another. It is the kind of address that holds its value because the fundamentals do not change.",
      "The villa is a classic Andalusian composition — white rendered walls, clay tile roof, arched loggia — brought up to date inside. Five bedrooms and four bathrooms are spread over two floors, with the main reception rooms opening south onto a pool terrace and the mountains of La Concha rising behind.",
      "At 350 m² on a 500 m² plot it is a manageable house rather than an estate, which is exactly the appeal for buyers who want a lock-and-leave property in a serious location without the staff and maintenance a larger villa demands.",
      "Three championship courses — Las Brisas, Los Naranjos and Aloha — are within a few minutes, and Puerto Banús is a short drive down the hill for restaurants, the marina and the beach.",
    ],
    highlights: [
      "Gated, 24-hour manned security",
      "Golf Valley address",
      "Minutes from Puerto Banús",
    ],
    sourceUrl: `${SRC}R5464375_detached-villa-nueva-andalucia/`,
  },
  {
    ref: "R5448211",
    slug: "atalaya-villa",
    name: "Atalaya",
    location: "Atalaya, Estepona",
    region: "Estepona",
    category: "Villa",
    kind: "Detached Villa",
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
      "Andalusian on the outside and thoroughly contemporary within: a five-bedroom villa of 498 m² on a private 1,000 m² plot on the New Golden Mile, ten minutes from the beach.",
    story: [
      "From the street this reads as a classical Andalusian villa — arched loggia, clay tile roof, palms rising over a hedge that does most of the work of privacy. The impression is deliberate, and it is only once you are inside the gates that the house declares itself.",
      "The interiors have been comprehensively brought forward. Marble floors run throughout the ground floor, the reception rooms have been opened up into one another, and a double-height stair hall carries daylight down from the first floor into the centre of the plan. Five bedrooms and five bathrooms are arranged above, with the principal suite taking the south-west corner and its own terrace.",
      "The plot is a full 1,000 m² and entirely private, with a heated pool, a covered outdoor dining terrace of 100 m² and lawn on two sides. Mature planting rather than fencing does the screening, which is the difference between a garden that feels enclosed and one that feels secluded.",
      "Atalaya sits on the New Golden Mile, the stretch between Marbella and Estepona where the coast still has room to breathe. There is golf on three sides — Atalaya Golf, El Paraíso and Guadalmina — the beach is under ten minutes away, and both Marbella and Estepona town are within a quarter of an hour.",
    ],
    highlights: [
      "1,000 m² private plot",
      "New Golden Mile, golf on three sides",
      "Fully renovated contemporary interiors",
    ],
    sourceUrl: `${SRC}R5448211_detached-villa-atalaya/`,
  },

  /* -------------------------------------------------------------- apartments */
  {
    ref: "R5464111",
    slug: "puerto-banus-apartment",
    name: "Puerto Banús",
    location: "Puerto Banús, Marbella",
    region: "Marbella",
    category: "Apartment",
    kind: "Middle Floor Apartment",
    price: 2_390_000,
    beds: 2,
    baths: 2,
    built: 138,
    plot: 0,
    terrace: 10,
    imageCount: 8,
    hero: 1,
    gallery: [1, 2, 3, 4, 5, 8],
    standfirst:
      "A 138 m² apartment in the front line of Puerto Banús, with the marina and the mountains framed directly from the terrace.",
    story: [
      "There is a small number of buildings that look straight down onto the berths at Puerto Banús, and they trade on that fact alone. This two-bedroom apartment of 138 m² is one of them: the terrace looks out over the yachts, along the harbour wall and up to the mountains behind the town.",
      "The apartment has been kept simple inside, which is the correct decision in a property where the view is the principal feature. An open-plan living and dining room runs the width of the front elevation and opens onto the terrace through sliding glazing. Two bedroom suites sit behind, both with en-suite bathrooms, and the kitchen is fitted and separate.",
      "Buyers here fall into two groups: those who want a base within walking distance of the restaurants, the beach clubs and the marina itself, and those buying for short-term rental yield, which in this position is among the strongest on the coast. Both are well served.",
      "Everything Puerto Banús offers is on foot — the marina, El Corte Inglés, the beachfront and the port's restaurants — with Marbella town ten minutes east and San Pedro five minutes west.",
    ],
    highlights: [
      "Front-line marina position",
      "138 m² with direct harbour views",
      "Walking distance to beach, shops and restaurants",
    ],
    sourceUrl: `${SRC}R5464111_middle-floor-apartment-puerto-banus/`,
  },
  {
    ref: "R5464102",
    slug: "estepona-beachfront-apartment",
    name: "Estepona Beachfront",
    location: "Estepona",
    region: "Estepona",
    category: "Apartment",
    kind: "Middle Floor Apartment",
    price: 1_250_000,
    beds: 3,
    baths: 2,
    built: 111,
    plot: 0,
    terrace: 40,
    imageCount: 8,
    hero: 1,
    gallery: [1, 2, 3, 4, 5, 7],
    standfirst:
      "A three-bedroom apartment of 111 m² with a 40 m² terrace facing directly onto the sea, in a beachfront development on the Estepona coast.",
    story: [
      "The terrace is what sells this apartment. At 40 m² it is more than a third of the interior area again, it faces due south over the water, and there is nothing between it and the beach. In practice the outdoor dining table is used for most of the year, and the sunsets from it are the ones people photograph.",
      "Inside, 111 m² is arranged as three bedrooms and two bathrooms with an open-plan living, dining and kitchen area that runs out onto the terrace. The finish is contemporary and pale — white walls, large-format floor tiles, natural timber — which keeps the focus firmly on the light coming off the sea.",
      "The development itself is beachfront, gated and well maintained, with landscaped communal gardens and a pool. It is the sort of building that works equally well as a permanent home for a couple, a family holiday base, or a rental asset.",
      "Estepona town is a few minutes along the coast and has changed considerably in the last decade — the old quarter has been restored, the marina rebuilt and the seafront promenade extended, and it now supports a genuine year-round restaurant scene rather than a purely seasonal one.",
    ],
    highlights: [
      "40 m² sea-facing terrace",
      "Beachfront gated development",
      "Three bedrooms, contemporary finish",
    ],
    sourceUrl: `${SRC}R5464102_middle-floor-apartment-estepona/`,
  },
  {
    ref: "R5464096",
    slug: "nueva-andalucia-apartment",
    name: "Nueva Andalucía",
    location: "Nueva Andalucía, Marbella",
    region: "Marbella",
    category: "Apartment",
    kind: "Middle Floor Apartment",
    price: 769_999,
    beds: 2,
    baths: 2,
    built: 137,
    plot: 0,
    terrace: 8,
    imageCount: 8,
    hero: 1,
    gallery: [1, 2, 3, 4, 6, 7],
    standfirst:
      "A generously proportioned 137 m² apartment in a mature, well-run community in the heart of the Golf Valley, minutes from Puerto Banús.",
    story: [
      "Two-bedroom apartments of 137 m² are increasingly rare. Newer developments in Nueva Andalucía build the same number of bedrooms into ninety square metres, and the difference is felt immediately in the reception rooms, the circulation and the storage.",
      "The apartment occupies a middle floor in an established community with landscaped gardens, mature planting and a communal pool — the sort of scheme that was built when land was less expensive and buildings were set further apart. Two bedroom suites, two bathrooms and a separate fitted kitchen sit off a large living and dining room with a fireplace.",
      "The interiors are in good order but are of their period, which is reflected in the asking price and leaves clear scope for a buyer who wants to reconfigure and refinish to a contemporary specification.",
      "The location is the Golf Valley proper: Las Brisas, Los Naranjos and Aloha within minutes, Puerto Banús and the beach a short drive south, and the Saturday market at Nueva Andalucía within walking distance.",
    ],
    highlights: [
      "137 m² — unusually large for two bedrooms",
      "Mature community with gardens and pool",
      "Golf Valley, minutes from Puerto Banús",
    ],
    sourceUrl: `${SRC}R5464096_middle-floor-apartment-nueva-andalucia/`,
  },
  {
    ref: "R5464078",
    slug: "estepona-apartment",
    name: "Estepona Garden Apartment",
    location: "Estepona",
    region: "Estepona",
    category: "Apartment",
    kind: "Middle Floor Apartment",
    price: 545_000,
    beds: 2,
    baths: 2,
    built: 97,
    plot: 0,
    terrace: 33,
    imageCount: 8,
    hero: 3,
    gallery: [3, 4, 1, 2, 5, 6],
    standfirst:
      "A bright two-bedroom apartment of 97 m² with a 33 m² terrace, in a landscaped development on the Estepona side of the New Golden Mile.",
    story: [
      "This is a well-judged apartment at a sensible price — 97 m² of interior with a 33 m² terrace attached, in a modern, low-rise development set in landscaped grounds with a communal pool.",
      "The layout is efficient without feeling tight. An open-plan kitchen, dining and living area occupies the southern end and opens through sliding doors onto the terrace; two double bedrooms and two bathrooms sit behind, with the principal bedroom en-suite. The finish throughout is contemporary and neutral — white walls, pale flooring, handleless kitchen units.",
      "For buyers looking at the Costa del Sol for the first time, this is close to the ideal entry point: turnkey condition, low community fees, strong rental demand through the summer, and none of the maintenance burden that comes with a villa.",
      "The New Golden Mile position puts Estepona town, the beach and several golf courses within ten minutes, with Puerto Banús about twenty minutes east along the coast road.",
    ],
    highlights: [
      "33 m² terrace",
      "Turnkey contemporary condition",
      "Landscaped development with communal pool",
    ],
    sourceUrl: `${SRC}R5464078_middle-floor-apartment-estepona/`,
  },

  /* -------------------------------------------------------------- penthouses */
  {
    ref: "R5443516",
    slug: "atalaya-penthouse",
    name: "Atalaya Penthouse",
    location: "Atalaya, Estepona",
    region: "Estepona",
    category: "Penthouse",
    kind: "Penthouse",
    price: 895_000,
    beds: 3,
    baths: 3,
    built: 169,
    plot: 0,
    terrace: 81,
    imageCount: 8,
    hero: 2,
    gallery: [2, 1, 3, 4, 5, 7],
    standfirst:
      "A three-bedroom penthouse of 169 m² with 81 m² of wrap-around terrace, in a resort-style community on the New Golden Mile.",
    story: [
      "The terrace runs to 81 m² and wraps two sides of the apartment, which at this level of the building means sea views to the south and the mountains behind Estepona to the north. It is furnished as three distinct areas — dining, lounging and a shaded pergola — and that is how it gets used.",
      "Indoors, 169 m² is laid out as three bedroom suites and three bathrooms, with an open-plan living and dining space that opens onto the terrace along its full length. The finish is contemporary and recently updated, with a fitted kitchen open to the dining area.",
      "The community itself is one of the better resort-style schemes on this stretch: extensive tropical gardens, a large lagoon-style pool, and full-time maintenance. It suits buyers who want the amenity of a resort without giving up the privacy of a top-floor apartment.",
      "Atalaya is on the New Golden Mile, with Atalaya and El Paraíso golf courses immediately inland, the beach under ten minutes away, and both Estepona and Puerto Banús within a quarter of an hour.",
    ],
    highlights: [
      "81 m² wrap-around terrace",
      "Sea and mountain views",
      "Resort community with lagoon pool",
    ],
    sourceUrl: `${SRC}R5443516_penthouse-atalaya/`,
  },
  {
    ref: "R5164585",
    slug: "elviria-penthouse",
    name: "Elviria Duplex Penthouse",
    location: "Elviria, Marbella East",
    region: "Marbella",
    category: "Penthouse",
    kind: "Penthouse Duplex",
    price: 1_070_000,
    beds: 3,
    baths: 3,
    built: 120,
    plot: 0,
    terrace: 60,
    imageCount: 8,
    hero: 2,
    gallery: [2, 1, 3, 4, 5, 7],
    standfirst:
      "A duplex penthouse of 120 m² with a 60 m² private roof terrace and open views over Elviria to the sea.",
    story: [
      "A duplex penthouse gives you something a single-level apartment cannot: a private roof terrace with nothing above it. Here that terrace runs to 60 m², is reached by an internal staircase, and has been laid out as an outdoor room with dining, seating and a solarium.",
      "The lower level holds three bedrooms and three bathrooms across 120 m², with the living and dining space opening onto a first, covered terrace facing south. The property is presented in good contemporary order throughout.",
      "Elviria has always attracted buyers who want Marbella without Marbella's density. The beaches here are wide and backed by pine, the Santa María golf course is a few minutes inland, and Nikki Beach and the Don Carlos hotel are within walking distance of much of the area.",
      "Marbella town is twenty minutes west along the coast, and Málaga airport is a straightforward thirty-five minutes east on the motorway — noticeably quicker than from the western side of the coast.",
    ],
    highlights: [
      "60 m² private roof terrace",
      "Duplex layout over two floors",
      "Elviria, close to the beach and golf",
    ],
    sourceUrl: `${SRC}R5164585_penthouse-duplex-elviria/`,
  },
  {
    ref: "R5463838",
    slug: "nueva-andalucia-penthouse",
    name: "Nueva Andalucía Penthouse",
    location: "Nueva Andalucía, Marbella",
    region: "Marbella",
    category: "Penthouse",
    kind: "Penthouse",
    price: 749_000,
    beds: 2,
    baths: 2,
    built: 140,
    plot: 0,
    terrace: 100,
    imageCount: 8,
    hero: 1,
    gallery: [1, 2, 3, 4, 6, 7],
    standfirst:
      "A two-bedroom penthouse of 140 m² with 100 m² of terrace — very nearly as much outdoor space as indoor — in the heart of the Golf Valley.",
    story: [
      "One hundred square metres of terrace against 140 m² of interior is an unusual ratio, and it changes how the apartment is lived in. The terrace is large enough to hold a full dining table, a separate lounge arrangement and still leave room to walk around both.",
      "Inside, the apartment has been refurbished to a contemporary standard: an open-plan living, dining and kitchen area with large-format porcelain flooring, and two bedroom suites both with en-suite bathrooms. The building is low-rise, and the penthouse position means single-aspect neighbours only.",
      "Nueva Andalucía is the most consistently in-demand rental location in Marbella outside the port itself, largely because of the golf, and a two-bedroom penthouse with this much terrace performs strongly through the season.",
      "Puerto Banús is five minutes down the hill; the Aloha and Las Brisas clubhouses are closer still.",
    ],
    highlights: [
      "100 m² of terrace",
      "Recently refurbished throughout",
      "Golf Valley, five minutes from Puerto Banús",
    ],
    sourceUrl: `${SRC}R5463838_penthouse-nueva-andalucia/`,
  },

  /* ------------------------------------------------------- new developments */
  {
    ref: "R5444944-N",
    slug: "estepona-new-villa",
    name: "Estepona Villa",
    location: "Estepona",
    region: "Estepona",
    category: "New development",
    kind: "Detached Villa · New development",
    price: 4_750_000,
    beds: 7,
    baths: 10,
    built: 761,
    plot: 2043,
    terrace: 284,
    imageCount: 8,
    hero: 1,
    gallery: [1, 2, 3, 6, 8, 4],
    standfirst:
      "A newly completed villa of 761 m² with seven bedrooms, ten bathrooms and 284 m² of terrace, on a 2,043 m² plot in Estepona.",
    story: [
      "New-build at this scale is comparatively rare on the Estepona side of the coast, where most stock is either resale or apartment-led. This villa runs to 761 m² over three levels on a plot of 2,043 m², and has been finished and handed over rather than sold off-plan — what you see is what completes.",
      "Seven bedrooms and ten bathrooms give the house genuine flexibility: the lower level can operate as independent guest accommodation, and there is provision for staff. The main floor is arranged around a double-height reception hall, with formal and informal living rooms, a dining room and a large kitchen with a separate service kitchen behind it.",
      "The 284 m² of terrace is distributed across all three levels, including a roof terrace with sea views and a covered summer dining area beside the pool. The gardens are landscaped and irrigated and the pool is heated.",
      "Estepona has been the most improved town on the western Costa del Sol over the past decade, and the position here puts the beach, the marina and the restored old town all within a short drive, with Puerto Banús around twenty minutes east.",
    ],
    highlights: [
      "Newly completed, ready to occupy",
      "284 m² of terrace across three levels",
      "2,043 m² landscaped plot",
    ],
    sourceUrl: `${SRC}R5444944-N_detached-villa-estepona/`,
  },
  {
    ref: "R4974751-N",
    slug: "benahavis-new-villas",
    name: "Benahavís Villas",
    location: "Benahavís",
    region: "Benahavís",
    category: "New development",
    kind: "Detached Villa · New development",
    price: 2_875_000,
    priceTo: 3_625_000,
    beds: 3,
    baths: 4,
    bedsLabel: "3 – 4",
    built: 378,
    plot: 2775,
    terrace: 233,
    imageCount: 8,
    hero: 1,
    gallery: [1, 2, 6, 7, 8, 3],
    standfirst:
      "A small development of contemporary villas above Benahavís, from 378 m² on plots up to 2,775 m², with three or four bedrooms and 233 m² of terrace.",
    story: [
      "This is a limited scheme of individually sited contemporary villas set into the hillside above Benahavís, designed so that each house takes the view without overlooking its neighbour. Plots run to 2,775 m² and the architecture is deliberately restrained — flat roofs, long horizontal openings, rendered white volumes cantilevered over the slope.",
      "Each villa offers 378 m² of built space with a choice of three or four bedrooms, four bathrooms, and 233 m² of terrace including a private pool. Interiors are delivered fully finished to a high contemporary specification: underfloor heating, full home automation, and floor-to-ceiling glazing to the south elevation.",
      "Prices run from €2,875,000 to €3,625,000 depending on plot, orientation and final specification. Units remain available at the time of writing, and buyers who commit early retain some choice over finishes.",
      "Benahavís village is a few minutes above the development and has a disproportionate concentration of good restaurants for its size. San Pedro and the coast are fifteen minutes down the valley, Puerto Banús twenty.",
    ],
    highlights: [
      "Plots up to 2,775 m²",
      "233 m² of terrace with private pool",
      "Choice of finishes on remaining units",
    ],
    sourceUrl: `${SRC}R4974751-N_detached-villa-benahavis/`,
  },
  {
    ref: "R5453572-N",
    slug: "estepona-new-apartments",
    name: "Estepona Apartments",
    location: "Estepona",
    region: "Estepona",
    category: "New development",
    kind: "Ground Floor Apartment · New development",
    price: 847_000,
    priceTo: 963_991,
    beds: 3,
    baths: 2,
    bedsLabel: "3 – 4",
    bathsLabel: "2 – 3",
    built: 194,
    plot: 0,
    terrace: 69,
    imageCount: 8,
    hero: 2,
    gallery: [2, 1, 3, 4, 5, 7],
    standfirst:
      "Ground-floor apartments of 194 m² with 69 m² terraces in a new gated development in Estepona, available with three or four bedrooms.",
    story: [
      "A new gated scheme of low-rise apartment blocks set in landscaped grounds, with the ground-floor units offered here taking private terraces of 69 m² opening directly onto the communal gardens.",
      "At 194 m², these are large apartments by current new-build standards, configured as either three or four bedrooms with two or three bathrooms. Specification is contemporary throughout: open-plan living with a fitted island kitchen, underfloor heating in the bathrooms, aerothermal hot water and pre-installation for air conditioning.",
      "Prices run from €847,000 to €963,991 depending on unit, orientation and bedroom count. The development includes a communal pool, landscaped gardens, a gym and underground parking.",
      "The position is a few minutes from Estepona town and the beach, on the stretch of coast that has seen the most new investment on this side of Marbella.",
    ],
    highlights: [
      "194 m² with 69 m² private terrace",
      "Three or four bedroom configurations",
      "Gated, with pool, gym and parking",
    ],
    sourceUrl: `${SRC}R5453572-N_ground-floor-apartment-estepona/`,
  },
  {
    ref: "R5443351-N",
    slug: "la-cala-penthouse",
    name: "La Cala Penthouse",
    location: "La Cala de Mijas",
    region: "Mijas",
    category: "New development",
    kind: "Penthouse · New development",
    price: 1_300_000,
    beds: 3,
    baths: 2,
    built: 109,
    plot: 0,
    terrace: 47,
    imageCount: 8,
    hero: 1,
    gallery: [1, 3, 4, 5, 6, 2],
    standfirst:
      "A three-bedroom penthouse of 109 m² with a 47 m² terrace in a new beachside resort development at La Cala de Mijas.",
    story: [
      "The development is built around a large lagoon-style pool set among tropical planting, a short walk from the beach at La Cala de Mijas. It is unapologetically resort architecture, and it is very well executed.",
      "This penthouse takes 109 m² across three bedrooms and two bathrooms, with a 47 m² terrace facing the sea. The interior specification is contemporary and delivered turnkey — open-plan living, island kitchen, full air conditioning and smart-home pre-installation.",
      "La Cala sits roughly midway between Marbella and Málaga, which for buyers who fly in and out frequently is a meaningful advantage: the airport is twenty-five minutes away rather than forty-five.",
      "The town itself has grown up considerably, with a promenade, a good range of restaurants and three golf courses immediately inland at La Cala Resort.",
    ],
    highlights: [
      "Beachside resort development",
      "47 m² sea-facing terrace",
      "Twenty-five minutes from Málaga airport",
    ],
    sourceUrl: `${SRC}R5443351-N_penthouse-la-cala/`,
  },

  /* ------------------------------------------------------------------- plots */
  {
    ref: "R5461963",
    slug: "sotogrande-land",
    name: "Sotogrande Land",
    location: "Sotogrande, San Roque",
    region: "Sotogrande",
    category: "Plot",
    kind: "Land",
    price: 1_150_000,
    beds: 0,
    baths: 0,
    built: 0,
    plot: 2837,
    terrace: 0,
    imageCount: 5,
    hero: 2,
    gallery: [2, 5, 1, 3, 4],
    standfirst:
      "A building plot of 2,837 m² inside the Sotogrande estate — one of the few opportunities left to build from scratch in an area that is effectively complete.",
    story: [
      "Sotogrande was master-planned from 1962 and is now, to all practical purposes, built out. Plots of this size inside the estate come to the market rarely, and when they do they tend to be bought by people who already live there.",
      "This one runs to 2,837 m², is level enough to build on without significant excavation, and sits among established houses on a mature, tree-lined street. Services are available at the boundary.",
      "Sotogrande's building regulations are stricter than the surrounding municipalities — set-backs, height limits and plot ratios are all controlled — which is precisely why the estate has kept its character while the rest of the coast has densified. Any scheme will need to work within those rules, and our architect studio can advise on what is achievable before you commit.",
      "The estate includes four golf courses among them Valderrama, the Santa María polo grounds, a marina, an international school and beach clubs. Gibraltar airport is twenty minutes away and Málaga around an hour.",
    ],
    highlights: [
      "2,837 m² building plot",
      "Inside the Sotogrande estate",
      "Services available at the boundary",
    ],
    sourceUrl: `${SRC}R5461963_land-sotogrande/`,
  },
  {
    ref: "R5457280",
    slug: "cerros-del-aguila-land",
    name: "Cerros del Águila",
    location: "Cerros del Águila, Mijas",
    region: "Mijas",
    category: "Plot",
    kind: "Land",
    price: 1_100_000,
    beds: 0,
    baths: 0,
    built: 0,
    plot: 45110,
    terrace: 0,
    imageCount: 8,
    hero: 1,
    gallery: [1, 4, 5, 2, 3, 6],
    standfirst:
      "Four and a half hectares — 45,110 m² — of elevated land above Mijas, with long views over the coast and towards the sea.",
    story: [
      "This is a substantial holding rather than a building plot: 45,110 m² of elevated ground above Mijas, running across a south-facing hillside with open views down over the coastal plain and out to sea.",
      "Land of this size at this price sits in a particular category. It suits a buyer with a long horizon — someone assembling a private estate, planning an equestrian or agricultural use, or taking a position on land in an area where the coastal strip is already fully developed and the pressure is moving inland.",
      "Any development is subject to the Mijas municipal plan, and the permitted use and buildable ratio must be confirmed with the town hall before a purchase. We will introduce buyers to a planning lawyer at the outset rather than at the end; on a transaction of this type that is where the value is either created or lost.",
      "Mijas Pueblo is a few minutes above, Fuengirola and the coast around fifteen minutes below, and Málaga airport is about half an hour away.",
    ],
    highlights: [
      "45,110 m² — four and a half hectares",
      "Elevated, south-facing, sea views",
      "Planning position to be confirmed with the town hall",
    ],
    sourceUrl: `${SRC}R5457280_land-cerros-del-aguila/`,
  },

  /* -------------------------------------------------------------- commercial */
  {
    ref: "R5464654",
    slug: "estepona-commercial-premises",
    name: "Estepona Beachfront Premises",
    location: "Estepona",
    region: "Estepona",
    category: "Commercial",
    kind: "Commercial Premises",
    price: 1_850_000,
    beds: 0,
    baths: 5,
    built: 350,
    plot: 0,
    terrace: 600,
    imageCount: 8,
    hero: 1,
    gallery: [1, 2, 3, 4, 5, 7],
    standfirst:
      "A beachfront commercial unit of 350 m² with an exceptional 600 m² of external terrace, delivered as a shell and ready to fit out.",
    story: [
      "Six hundred square metres of terrace on the beach, attached to a 350 m² interior, is a rare commercial proposition on this coast. The unit sits directly on the seafront with unobstructed frontage and is being sold as a structural shell, which leaves the incoming operator free to plan the fit-out from scratch.",
      "The obvious use is hospitality — a beach club, restaurant or chiringuito operation, where the terrace becomes the revenue-generating area and the interior handles kitchen, service and winter covers. The proportions and the frontage suit that model closely.",
      "Buyers should note that licensing for beachfront hospitality in Andalucía involves both the municipality and the coastal authority, and timelines vary. We work regularly with operators on this stretch and can introduce the right advisers early.",
      "Estepona's seafront has been progressively upgraded over the past decade, with the promenade extended and the town's restaurant scene now trading year-round rather than seasonally.",
    ],
    highlights: [
      "600 m² beachfront terrace",
      "Sold as a shell, ready to fit out",
      "Direct, unobstructed sea frontage",
    ],
    sourceUrl: `${SRC}R5464654_commercial-premises-estepona/`,
  },
  {
    ref: "R5455462",
    slug: "marbella-office",
    name: "Marbella Office",
    location: "Marbella",
    region: "Marbella",
    category: "Commercial",
    kind: "Office",
    price: 330_000,
    beds: 0,
    baths: 0,
    built: 76,
    plot: 0,
    terrace: 0,
    imageCount: 6,
    hero: 1,
    gallery: [1, 2, 3, 4, 5, 6],
    standfirst:
      "A bright 76 m² office unit in Marbella, presented in clean, ready-to-occupy condition with good natural light on two elevations.",
    story: [
      "A straightforward, well-proportioned office of 76 m², recently refurbished and presented in white throughout, with full-height glazing on two elevations giving unusually good daylight for a unit of this size.",
      "The space is currently open-plan and can be partitioned into two or three offices with a meeting room, or left as it is. Air conditioning, data cabling and a small kitchen area are already installed.",
      "At this price point in Marbella the unit works either as owner-occupied premises for a small professional practice or as a straightforward yielding investment — office demand in the town centre has held up well and vacancy is low.",
      "The position is central, within walking distance of Marbella's main commercial streets and with street parking and a public car park nearby.",
    ],
    highlights: [
      "76 m², recently refurbished",
      "Dual-aspect natural light",
      "Central Marbella, ready to occupy",
    ],
    sourceUrl: `${SRC}R5455462_office-marbella/`,
  },

  /* ------------------------------------------------------------------ hotels */
  {
    ref: "R4943824",
    slug: "estepona-hotel",
    name: "Estepona Hotel",
    location: "Estepona",
    region: "Estepona",
    category: "Hotel",
    kind: "Hotel",
    price: 10_000_000,
    beds: 54,
    baths: 54,
    built: 2315,
    plot: 571,
    terrace: 0,
    imageCount: 8,
    hero: 1,
    gallery: [1, 2, 3, 4, 5, 8],
    standfirst:
      "A 54-key hotel of 2,315 m² in Estepona, refurbished throughout and trading — offered as a going concern.",
    story: [
      "Fifty-four keys across 2,315 m² of built space, comprehensively refurbished and currently trading. The rooms have been finished to a consistent contemporary standard — slatted timber headboard walls, neutral textiles, compact but well-planned bathrooms in marble-effect porcelain — which is the specification the mid-market leisure segment on this coast now expects.",
      "The asset is offered as a going concern, with the operating business, the fixtures and the forward bookings included. Occupancy on this stretch runs strongly from Easter through October, with a shoulder season that has lengthened noticeably as Estepona has grown as a year-round destination.",
      "For an investor, the interest here is in the ratio: fifty-four keys is enough to support a professional management structure while remaining small enough to run without a large corporate overhead. Detailed trading accounts are available to qualified buyers under NDA.",
      "Estepona has been the fastest-improving town on the western Costa del Sol, with a restored old quarter, a rebuilt marina and an extended seafront promenade — all of which supports room rate rather than just occupancy.",
    ],
    highlights: [
      "54 keys, fully refurbished",
      "Offered as a going concern",
      "Trading accounts available under NDA",
    ],
    sourceUrl: `${SRC}R4943824_hotel-estepona/`,
  },
  {
    ref: "R5396800",
    slug: "torreguadiaro-hotel",
    name: "Torreguadiaro Hotel",
    location: "Torreguadiaro, San Roque",
    region: "Sotogrande",
    category: "Hotel",
    kind: "Hotel",
    price: 5_500_000,
    beds: 12,
    baths: 12,
    built: 455,
    plot: 1502,
    terrace: 0,
    imageCount: 8,
    hero: 1,
    gallery: [1, 2, 3, 4, 5, 6],
    standfirst:
      "A twelve-key boutique hotel on a 1,502 m² plot at Torreguadiaro, beside Sotogrande, with a sea-facing pool terrace and roof deck.",
    story: [
      "Twelve keys on a plot of 1,502 m², a few hundred metres from the beach at Torreguadiaro and immediately adjacent to the Sotogrande estate. The scale is deliberately small: this is a boutique operation rather than a resort hotel, and it trades on service and position rather than on volume.",
      "The building runs to 455 m² of interior with the remainder given over to gardens, a pool terrace facing the sea, and a roof deck used for breakfast and evening service. Rooms are individually finished and the public areas were refurbished recently.",
      "The location is the commercial argument. Sotogrande's polo season, the golf calendar at Valderrama and San Roque, and the marina traffic all generate demand for high-quality rooms in a market that has very little supply of them — most visitors either own property in the estate or stay considerably further away.",
      "Gibraltar airport is twenty minutes away, Málaga about an hour, and the beach and the restaurants of Torreguadiaro are within walking distance.",
    ],
    highlights: [
      "12 keys on a 1,502 m² plot",
      "Sea-facing pool terrace and roof deck",
      "Beside the Sotogrande estate",
    ],
    sourceUrl: `${SRC}R5396800_hotel-torreguadiaro/`,
  },
];

/* ------------------------------------------------------------------ helpers */

export const categories: Category[] = [
  "Villa",
  "Apartment",
  "Penthouse",
  "New development",
  "Plot",
  "Commercial",
  "Hotel",
];

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

/** "€2,875,000 – €3,625,000" where the client quotes a range. */
export function priceLabel(p: Pick<Property, "price" | "priceTo">) {
  return p.priceTo ? `${formatPrice(p.price)} – ${formatPrice(p.priceTo)}` : formatPrice(p.price);
}

export const bedsLabel = (p: Pick<Property, "beds" | "bedsLabel">) =>
  p.bedsLabel ?? String(p.beds);

export const bathsLabel = (p: Pick<Property, "baths" | "bathsLabel">) =>
  p.bathsLabel ?? String(p.baths);

/** Categories where bedroom and bathroom counts are not meaningful. */
export const isLand = (p: Pick<Property, "category">) => p.category === "Plot";
