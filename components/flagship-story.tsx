import Image from "next/image";
import { flagship, imageSrc } from "@/lib/properties";
import { PLink } from "./proposal";

/**
 * The featured residence as an editorial story.
 *
 * The homepage seduces first and explains second: each chapter is a photograph,
 * a headline-sized statement, and one or two supporting sentences. The full
 * four-paragraph account lives on the property's own page, where a reader who
 * has decided to care will actually read it.
 *
 * Scrolling through this is authored, not uniform. Rows alternate direction:
 * the first image opens downward and its copy follows in sequence; the second
 * opens upward. The interlude between chapters is a typographic moment built
 * from the property's real numbers.
 */

const chapters = [
  {
    image: 2,
    label: "Arrival",
    statement: "The facade gives nothing away.",
    support:
      "Low and wide behind mature planting, with no view of the sea from the entrance court. In Guadalmina Baja, privacy is a specification.",
  },
  {
    image: 9,
    label: "The living floor",
    statement: "Inside and outside stop being different rooms.",
    support:
      "Every principal room faces south onto the pool terrace, and the glazing folds back until the distinction stops being useful.",
  },
  {
    image: 17,
    label: "Below and beyond",
    statement: "Gym, spa, sauna, cinema.",
    support:
      "The floor below the living floor is what makes this a residence rather than a villa. Eight suites and ten bathrooms sit above it.",
  },
];

export function FlagshipStory() {
  return (
    <section
      aria-label={`Featured residence: ${flagship.name}`}
      className="border-t border-[var(--color-ink-hairline)] bg-ink py-24 md:py-32"
    >
      <div className="shell">
        {/* Opening */}
        <div className="max-w-3xl">
          <p className="meta-in seq-1 eyebrow">Featured residence · {flagship.location}</p>
          <h2 className="display mt-6 text-[clamp(2.5rem,6vw,5rem)]">
            <span className="mask">
              <span className="mask-line seq-2">{flagship.name}</span>
            </span>
          </h2>
          <p className="meta-in seq-3 mt-7 max-w-[58ch] text-base leading-relaxed text-mist">
            {flagship.standfirst}
          </p>
        </div>

        {/* Chapters — alternating reveal direction */}
        <div className="mt-20 space-y-24 md:mt-24 md:space-y-32">
          {chapters.map((chapter, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={chapter.label}
                className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
              >
                <div className={reverse ? "md:order-2" : undefined}>
                  <div
                    className={`${reverse ? "clip-reveal-up" : "clip-reveal"} seq-1 relative aspect-[4/3] overflow-hidden bg-ink-raised`}
                  >
                    <Image
                      src={imageSrc(flagship.ref, chapter.image)}
                      alt={`${flagship.name}: ${chapter.label}`}
                      fill
                      sizes="(max-width: 768px) 92vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div>
                  <p className="meta-in seq-2 eyebrow">{chapter.label}</p>
                  <p className="display mt-5 text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.06]">
                    <span className="mask">
                      <span className="mask-line seq-3">{chapter.statement}</span>
                    </span>
                  </p>
                  <p className="meta-in seq-4 mt-5 max-w-[46ch] text-base leading-relaxed text-mist">
                    {chapter.support}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Close */}
        <div className="mt-20 flex flex-wrap items-center gap-4">
          <PLink
            href={`/properties/${flagship.slug}`}
            className="meta-in seq-1 bg-bone px-8 py-4 text-[0.75rem] uppercase tracking-[0.18em] text-ink transition-colors duration-500 hover:bg-gold"
          >
            The full account &amp; gallery
          </PLink>
          <PLink
            href={`/contact?intent=viewing&ref=${flagship.ref}`}
            className="meta-in seq-2 border border-[var(--rule)] px-8 py-4 text-[0.75rem] uppercase tracking-[0.18em] text-bone transition-colors duration-500 hover:border-gold hover:text-gold"
          >
            Arrange a private viewing
          </PLink>
        </div>
      </div>
    </section>
  );
}

/**
 * A typographic interlude: most of a viewport, three lines arriving in
 * sequence, built on the featured property's real principal figure.
 */
export function Interlude() {
  return (
    <section
      aria-label="1,303 square metres"
      className="flex min-h-[85svh] items-center bg-bone text-ink"
    >
      <div className="shell w-full py-24">
        <p className="meta-in seq-1 eyebrow" style={{ color: "#8a7c58" }}>
          {flagship.name} · {flagship.location}
        </p>
        <p className="display mt-8 text-[clamp(3.5rem,11vw,9.5rem)] leading-[0.95]">
          <span className="mask">
            <span className="mask-line seq-2 numeric">1,303 m².</span>
          </span>
          <span className="mask">
            <span className="mask-line seq-3 text-ink/35">Not a metre</span>
          </span>
          <span className="mask">
            <span className="mask-line seq-4 text-ink/35">without purpose.</span>
          </span>
        </p>
      </div>
    </section>
  );
}
