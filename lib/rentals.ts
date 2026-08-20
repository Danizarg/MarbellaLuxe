import type { Region } from "./properties";

/**
 * Long-term rentals.
 *
 * These listings are presented WITHOUT photography, and that is a deliberate
 * decision rather than an omission. Every rental on the client's feed (-L
 * references) is served under CDN key `wuap72y7is`, which burns a watermark into
 * every frame it returns. Publishing watermarked photography on a luxury site is
 * worse than publishing none, so the rentals index is built as a typographic
 * schedule instead, and viewings carry the images.
 *
 * As soon as the agency supplies unwatermarked frames, add the references to
 * scripts/asset-manifest.json, run `npm run assets`, and this section can adopt
 * the standard property card.
 *
 * Figures transcribed from marbellaluxe.es. Prices are per calendar month.
 */

export type Rental = {
  ref: string;
  location: string;
  region: Region;
  kind: string;
  /** € per calendar month */
  pcm: number;
  beds: number;
  baths: number;
  built: number;
  plot: number;
  terrace: number;
  sourceUrl: string;
};

const SRC = "https://marbellaluxe.es/en/property/";

export const rentals: Rental[] = [
  {
    ref: "R5177188-L",
    location: "Costalita, Estepona",
    region: "Estepona",
    kind: "Detached Villa",
    pcm: 15_000,
    beds: 5,
    baths: 5,
    built: 600,
    plot: 1447,
    terrace: 30,
    sourceUrl: `${SRC}R5177188-L_detached-villa-costalita/`,
  },
  {
    ref: "R5114644-L",
    location: "Sotogrande, San Roque",
    region: "Sotogrande",
    kind: "Detached Villa",
    pcm: 10_000,
    beds: 5,
    baths: 5,
    built: 629,
    plot: 1480,
    terrace: 0,
    sourceUrl: `${SRC}R5114644-L_detached-villa-sotogrande/`,
  },
  {
    ref: "R5375902-L",
    location: "El Paraíso, Estepona",
    region: "Estepona",
    kind: "Detached Villa",
    pcm: 8_500,
    beds: 5,
    baths: 4,
    built: 514,
    plot: 4007,
    terrace: 0,
    sourceUrl: `${SRC}R5375902-L_detached-villa-el-paraiso/`,
  },
  {
    ref: "R5355280-L",
    location: "Benamara, Estepona",
    region: "Estepona",
    kind: "Detached Villa",
    pcm: 5_000,
    beds: 3,
    baths: 3,
    built: 250,
    plot: 503,
    terrace: 0,
    sourceUrl: `${SRC}R5355280-L_detached-villa-benamara/`,
  },
  {
    ref: "R5419801-L",
    location: "Puerto Banús, Marbella",
    region: "Marbella",
    kind: "Middle Floor Apartment",
    pcm: 4_500,
    beds: 3,
    baths: 2,
    built: 135,
    plot: 0,
    terrace: 25,
    sourceUrl: `${SRC}R5419801-L_middle-floor-apartment-puerto-banus/`,
  },
  {
    ref: "R5063653-L",
    location: "Nueva Andalucía, Marbella",
    region: "Marbella",
    kind: "Middle Floor Apartment",
    pcm: 4_000,
    beds: 3,
    baths: 2,
    built: 152,
    plot: 0,
    terrace: 69,
    sourceUrl: `${SRC}R5063653-L_middle-floor-apartment-nueva-andalucia/`,
  },
  {
    ref: "R5076376-L",
    location: "The Golden Mile, Marbella",
    region: "Marbella",
    kind: "Ground Floor Apartment",
    pcm: 3_700,
    beds: 2,
    baths: 3,
    built: 173,
    plot: 0,
    terrace: 75,
    sourceUrl: `${SRC}R5076376-L_ground-floor-apartment-the-golden-mile/`,
  },
  {
    ref: "R5419741-L",
    location: "Costalita, Estepona",
    region: "Estepona",
    kind: "Ground Floor Apartment",
    pcm: 2_200,
    beds: 3,
    baths: 2,
    built: 98,
    plot: 0,
    terrace: 10,
    sourceUrl: `${SRC}R5419741-L_ground-floor-apartment-costalita/`,
  },
];

const euro = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export const formatPcm = (n: number) => `${euro.format(n)} pcm`;
