import Image from "next/image";
import {
  bathsLabel,
  bedsLabel,
  flagship,
  formatArea,
  formatPrice,
  imageSrc,
} from "@/lib/properties";
import { PLink } from "./proposal";

/**
 * The flagship residence, presented as an editorial feature.
 *
 * An earlier version hijacked the scroll: a sticky full-viewport stage with the
 * narrative cross-fading over it across three screens. It demonstrated well and
 * it made the most expensive property on the site harder to read than the
 * cheapest. The animation now lives in the intro; here the house gets a normal,
 * generous magazine spread - large photography, real paragraphs, and a
 * specification table you can actually scan.
 */

const chapters = [
  { image: 2, title: "Arrival" },
  { image: 9, title: "The living floor" },
  { image: 17, title: "Below and beyond" },
];

export function FlagshipStory() {
  return (
    <section
      aria-label={`Featured residence: ${flagship.name}`}
      className="border-t border-[var(--color-ink-hairline)] bg-ink py-24 md:py-32"
    >
      <div className="shell">
        {/* Opening */}
        <div className="reveal max-w-3xl">
          <p className="eyebrow">Featured residence · {flagship.location}</p>
          <h2 className="display mt-6 text-[clamp(2.5rem,6vw,5rem)]">{flagship.name}</h2>
          <p className="mt-8 text-lg leading-relaxed text-mist">{flagship.standfirst}</p>
        </div>

        {/* Lead image */}
        <div className="reveal relative mt-14 aspect-[16/9] overflow-hidden bg-ink-raised">
          <Image
            src={imageSrc(flagship.ref, flagship.hero)}
            alt={`${flagship.name}, ${flagship.location}`}
            fill
            sizes="(max-width: 768px) 92vw, 90vw"
            className="object-cover"
          />
        </div>

        {/* Narrative, alternating with photography */}
        <div className="mt-20 space-y-20 md:mt-24 md:space-y-24">
          {chapters.map((chapter, i) => (
            <div
              key={chapter.title}
              className="reveal grid items-center gap-10 md:grid-cols-2 md:gap-16"
            >
              <div className={i % 2 === 1 ? "md:order-2" : undefined}>
                <div className="relative aspect-[4/3] overflow-hidden bg-ink-raised">
                  <Image
                    src={imageSrc(flagship.ref, chapter.image)}
                    alt={`${flagship.name}: ${chapter.title}`}
                    fill
                    sizes="(max-width: 768px) 92vw, 45vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <p className="eyebrow">{chapter.title}</p>
                <p className="mt-6 text-base leading-relaxed text-mist md:text-[1.0625rem]">
                  {flagship.story[i]}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing paragraph */}
        <div className="reveal mt-20 max-w-3xl">
          <p className="text-base leading-relaxed text-mist md:text-[1.0625rem]">
            {flagship.story[3]}
          </p>
        </div>

        {/* Specification */}
        <dl className="reveal numeric mt-14 grid grid-cols-2 gap-px border border-[var(--color-ink-hairline)] bg-[var(--color-ink-hairline)] md:grid-cols-4">
          <Cell label="Guide price" value={formatPrice(flagship.price)} accent />
          <Cell label="Built" value={formatArea(flagship.built)} />
          <Cell label="Plot" value={formatArea(flagship.plot)} />
          <Cell label="Terrace" value={formatArea(flagship.terrace)} />
          <Cell label="Bedrooms" value={bedsLabel(flagship)} />
          <Cell label="Bathrooms" value={bathsLabel(flagship)} />
          <Cell label="Type" value={flagship.kind} />
          <Cell label="Reference" value={flagship.ref} />
        </dl>

        <div className="reveal mt-12 flex flex-wrap gap-4">
          <PLink
            href={`/properties/${flagship.slug}`}
            className="bg-bone px-8 py-4 text-[0.75rem] uppercase tracking-[0.18em] text-ink transition-colors duration-500 hover:bg-gold"
          >
            Full detail &amp; gallery
          </PLink>
          <PLink
            href={`/contact?intent=viewing&ref=${flagship.ref}`}
            className="border border-[var(--rule)] px-8 py-4 text-[0.75rem] uppercase tracking-[0.18em] text-bone transition-colors duration-500 hover:border-gold hover:text-gold"
          >
            Arrange a private viewing
          </PLink>
        </div>
      </div>
    </section>
  );
}

function Cell({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="bg-ink p-5 md:p-6">
      <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-mist-dim">{label}</dt>
      <dd className={`mt-2 text-lg ${accent ? "text-gold" : "text-bone"}`}>{value}</dd>
    </div>
  );
}
