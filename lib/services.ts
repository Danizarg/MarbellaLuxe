/**
 * The agency's services, as published on marbellaluxe.es.
 *
 * The live site spreads these across a dozen thin pages - five near-identical
 * "Renovations <town>" pages, an architect studio page, a buying-agent page, a
 * valuation page and a developers page. Here they are consolidated into one
 * service index with a full page each, which is both easier to maintain and
 * considerably better for search than five pages of duplicated copy.
 *
 * Copy is written for this redesign. The service list, the areas covered and the
 * agency's positioning are the client's.
 */

export type Service = {
  slug: string;
  title: string;
  /** One line for the index card. */
  summary: string;
  /** Opening paragraph on the service page. */
  intro: string;
  body: string[];
  /** Numbered process steps. */
  steps: { title: string; body: string }[];
  /** Facts shown as a small data strip. */
  facts?: { label: string; value: string }[];
  imageRef: string;
  imageIndex: number;
  cta: string;
  intent: string;
};

export const services: Service[] = [
  {
    slug: "valuation",
    title: "Property valuation",
    summary:
      "A documented, no-obligation valuation benchmarked against what is actually transacting in your street.",
    intro:
      "Most owners arrive with a number in mind, and it usually comes from a portal estimate or from what a neighbour was asking three years ago. Neither is a valuation. What we produce is a written assessment of what a buyer with financing in place will realistically sign for, in this street, this quarter.",
    body: [
      "The exercise begins with comparable evidence. We look at what has completed nearby in the last twelve months rather than what is currently listed, because asking prices on the Costa del Sol routinely sit ten to twenty per cent above achieved prices, and a valuation built on asking prices simply repeats that error back to you.",
      "We then adjust for the things that genuinely move a price in this market: orientation, plot ratio, whether the property is legally registered as built, the condition of the community it sits in, and — more than anything else — how it will photograph. Two houses with identical specifications can sit six months apart in selling time purely on the strength of their light and their outlook.",
      "The result is a short written document with the comparables attached, a recommended asking price, and a realistic view of the time to completion at that price. If we think the number you had in mind is achievable, we will say so. If we think it will cost you a year on the market, we will say that instead — and explain what would have to change.",
      "There is no charge and no obligation to instruct us afterwards. A valuation is the beginning of a conversation, not a contract.",
    ],
    steps: [
      {
        title: "Visit and measure",
        body: "One of our consultants visits the property, photographs it, and confirms the built area, plot and terrace against the Nota Simple and the cadastral record. Discrepancies between the registry and what has actually been built are common here, and they are far cheaper to resolve before a buyer's lawyer finds them.",
      },
      {
        title: "Comparable analysis",
        body: "We assemble completed transactions in the immediate area over the previous twelve months, adjusted for size, condition, orientation and community. Where evidence is thin — which it often is for larger villas — we widen the search and say so explicitly rather than extrapolating quietly.",
      },
      {
        title: "Written valuation",
        body: "You receive a written recommendation with the evidence behind it, a suggested asking price and a realistic timeline. We will also flag anything likely to slow a sale, from an unregistered extension to an expired energy certificate.",
      },
      {
        title: "Your decision",
        body: "Instruct us, instruct someone else, or do nothing at all. The valuation is yours either way.",
      },
    ],
    facts: [
      { label: "Cost", value: "No charge" },
      { label: "Turnaround", value: "3 – 5 days" },
      { label: "Obligation", value: "None" },
    ],
    imageRef: "R5463289",
    imageIndex: 2,
    cta: "Request a valuation",
    intent: "valuation",
  },
  {
    slug: "renovations",
    title: "Renovations",
    summary:
      "Full renovation management across Marbella, Benahavís, Estepona, Sotogrande and Mijas — from survey through to handover.",
    intro:
      "A significant proportion of the best-value property on this coast is in original condition. Buying it is the easy part; renovating it from another country, in another language, under Andalucían planning rules, is where most projects come unstuck. We manage that process end to end.",
    body: [
      "The economics are usually compelling. A 1990s villa on a large, well-oriented plot in La Quinta or Nueva Andalucía can be bought for substantially less per square metre than a finished contemporary house nearby, and a full renovation frequently costs less than the gap between the two. The catch is that the gap only closes if the work is properly specified, properly licensed and properly supervised.",
      "We start with a condition survey and an indicative budget before you buy, not after. That means a walk-through with our architect and a builder, an honest view of what the structure will and will not allow, and a cost range with a contingency built in. Buyers regularly change which property they bid on once they have seen those numbers side by side, which is exactly the point of doing it early.",
      "Once a property is acquired we handle the licence applications, tender the work to contractors we have used before, and supervise on site. You receive a fixed schedule, a payment plan tied to completed stages rather than to dates, and photographs each week. Nothing is ordered or varied without written approval.",
      "We work across Marbella, Benahavís, Estepona, Sotogrande and Mijas. Municipal procedures differ meaningfully between them — Sotogrande in particular applies its own additional design controls on top of the San Roque rules — and knowing which town hall you are dealing with before you commit is not a detail.",
    ],
    steps: [
      {
        title: "Survey and budget",
        body: "A condition survey with our architect and a contractor, producing an indicative cost range with contingency. Done before purchase wherever possible.",
      },
      {
        title: "Design and licensing",
        body: "Scheme design, technical drawings and the licence application to the relevant town hall. Timelines vary by municipality and we will tell you what to expect for yours.",
      },
      {
        title: "Tender and contract",
        body: "The work is tendered to contractors we have used before. You see the tenders. Payments are tied to completed stages, never to calendar dates.",
      },
      {
        title: "Build and supervision",
        body: "Weekly site supervision and a weekly photographic report. Variations require written approval before any work is ordered.",
      },
      {
        title: "Handover",
        body: "Snagging, certification, and the updated documentation you will need if you ever sell — including the first-occupation licence where the work requires one.",
      },
    ],
    facts: [
      { label: "Areas", value: "Marbella · Benahavís · Estepona · Sotogrande · Mijas" },
      { label: "Reporting", value: "Weekly, with photographs" },
      { label: "Payments", value: "Tied to completed stages" },
    ],
    imageRef: "R5460766",
    imageIndex: 2,
    cta: "Discuss a renovation",
    intent: "other",
  },
  {
    slug: "architect-studio",
    title: "Architect studio",
    summary:
      "In-house architectural design for new build, extension and reconfiguration — including feasibility studies before you bid.",
    intro:
      "We keep architectural capability in-house rather than referring it out, for one reason: buyers make better decisions when they can see what a property could become before they commit to buying it.",
    body: [
      "The most valuable work our studio does is the least glamorous — a feasibility study on a plot or a tired villa, produced in the few days between a viewing and an offer. Buildable ratio, set-backs, height limits, whether the pool can move, whether the roof can take another storey, roughly what it will cost. It is not a design; it is the information you need in order to bid sensibly.",
      "For clients who go ahead, the studio takes projects from concept through to technical drawings and the licence submission. We work in a restrained contemporary idiom that sits comfortably in this landscape — long horizontal openings, deep overhangs, natural stone and timber — but we design to the site and the client rather than to a house style.",
      "On new build we work closely with the renovation team so that the drawings and the buildability are considered together. A design that cannot be built to budget is not a design, and separating the two disciplines is how projects end up twenty per cent over.",
      "The studio also handles the legalisation work that comes up repeatedly on this coast: extensions built without licence, discrepancies between the registry and the cadastre, and the documentation needed to bring a property into a saleable condition.",
    ],
    steps: [
      {
        title: "Feasibility",
        body: "What the plot or the building will legally allow, and roughly what it will cost. Delivered in days, so it can inform an offer.",
      },
      {
        title: "Concept design",
        body: "Plans, sections and visualisations developed with you until the scheme is right, before any technical work begins.",
      },
      {
        title: "Technical package",
        body: "Full technical drawings, specifications and the licence submission to the town hall, with the college of architects visa where required.",
      },
      {
        title: "Construction support",
        body: "Site inspections and technical direction through the build, coordinated with the renovation team.",
      },
    ],
    imageRef: "R4974751-N",
    imageIndex: 1,
    cta: "Ask about a feasibility study",
    intent: "other",
  },
  {
    slug: "buying-agent",
    title: "Personal buying agent",
    summary:
      "Representation on the buyer's side of the table — including access to properties that are never publicly listed.",
    intro:
      "Almost every agent on this coast works for the seller. A buying agent works for you: sourcing, shortlisting, valuing and negotiating on your behalf, and being paid by you rather than out of the sale.",
    body: [
      "The Costa del Sol runs on a shared multi-listing system, which means most agencies can show you most of the same properties. What differs is who is representing your interests when it comes to deciding what something is worth and what to offer. If the only professional in the room is paid a percentage of the sale price, that is worth knowing.",
      "We begin with a proper brief — not a list of bedrooms, but the actual constraints: how the property will be used, how often, by how many people, what the school run looks like, whether the airport transfer matters, what you would regret. That conversation usually reshapes the search area more than any filter does.",
      "We then search across the whole market rather than our own stock, including the off-market properties that never reach a portal. A meaningful share of the best houses on this coast change hands quietly between agents and known buyers; being on that list is largely a matter of having been here long enough.",
      "For each shortlisted property we produce our own valuation, flag the legal and structural questions, and negotiate. You see everything we see, including the arguments against a property we otherwise like.",
    ],
    steps: [
      {
        title: "Brief",
        body: "A long conversation about how the property will actually be used, and what would make it a mistake.",
      },
      {
        title: "Search",
        body: "The whole market, not just our own listings — including off-market properties.",
      },
      {
        title: "Shortlist and viewings",
        body: "A curated shortlist with our own valuation and a written view on each, then an efficient viewing trip.",
      },
      {
        title: "Negotiation and completion",
        body: "We negotiate on your behalf and coordinate lawyer, surveyor and notary through to completion.",
      },
    ],
    imageRef: "R5464375",
    imageIndex: 2,
    cta: "Brief a buying agent",
    intent: "other",
  },
  {
    slug: "developers-and-investors",
    title: "Developers & investors",
    summary:
      "Site sourcing, feasibility and sales strategy for construction and investment projects along the coast.",
    intro:
      "We work with developers and private investors on the acquisition side — finding sites, testing what they will carry, and planning the exit before the entry is signed.",
    body: [
      "Land is the constraint on this coast. The coastal strip between Marbella and Estepona is effectively built out, which is why value has been moving inland and upward for a decade, and why the plots that do come to market are frequently sold before they are advertised. We see those early because we are asked to value them.",
      "For each site we can produce a development appraisal: buildable area under the current municipal plan, indicative construction cost, a realistic sales rate for the finished product based on what is actually completing nearby, and the resulting residual land value. That number is usually the difference between a good site and an expensive one.",
      "On the sales side we handle off-plan marketing and the reservation process for completed schemes, working with the developer's legal team on the bank guarantees and staged-payment structures that Spanish off-plan sales require.",
      "We also act for investors on income-producing assets — the hotels, commercial premises and residential blocks that sit alongside the villa market and rarely reach public portals at all.",
    ],
    steps: [
      {
        title: "Site sourcing",
        body: "Plots and development opportunities across Marbella, Benahavís, Estepona, Sotogrande and Mijas, including off-market.",
      },
      {
        title: "Appraisal",
        body: "Buildable area, construction cost, achievable sales rate and residual land value — the numbers that decide whether to bid.",
      },
      {
        title: "Planning and design",
        body: "Feasibility and scheme design through our architect studio, coordinated with the relevant town hall.",
      },
      {
        title: "Sales strategy",
        body: "Off-plan launch, pricing, reservation process and staged payments, with the marketing built for the price bracket.",
      },
    ],
    imageRef: "R5457280",
    imageIndex: 1,
    cta: "Discuss a project",
    intent: "investment",
  },
];

export function serviceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
