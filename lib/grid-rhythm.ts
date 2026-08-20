/**
 * The editorial rhythm for the property grid.
 *
 * A wide feature, a portrait, a run of three level frames, then a portrait and a
 * second wide one — enough variation that the page reads as curated, little
 * enough that it stays scannable. Repeats every seven cards, and collapses to a
 * single column of equal 4:3 frames below `xl` — a landscape photograph cropped
 * to portrait at full phone width shows mostly ceiling.
 *
 * Deliberately a plain module rather than part of property-card.tsx: the card is
 * a client component, and both the server-rendered homepage grid and the client
 * search grid need this.
 */
const RHYTHM = [
  { span: "xl:col-span-2", aspect: "aspect-[4/3] xl:aspect-[16/10]" },
  { span: "", aspect: "aspect-[4/3] xl:aspect-[3/4]" },
  { span: "", aspect: "aspect-[4/3]" },
  { span: "", aspect: "aspect-[4/3]" },
  { span: "", aspect: "aspect-[4/3]" },
  { span: "", aspect: "aspect-[4/3] xl:aspect-[3/4]" },
  { span: "xl:col-span-2", aspect: "aspect-[4/3] xl:aspect-[16/9]" },
] as const;

export const rhythmAt = (i: number) => RHYTHM[i % RHYTHM.length];
