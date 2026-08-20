import Image from "next/image";
import { imageSrc, properties } from "@/lib/properties";
import { locations } from "@/lib/locations";
import { PLink } from "./proposal";

/**
 * A contrast reset.
 *
 * The lower half of the page runs dark for a long stretch — search, investment,
 * team, contact — and a uniformly dark run flattens the hierarchy however good
 * the type is. This is a single bright photograph at full bleed, carrying one
 * line, placed where the eye needs somewhere to land.
 *
 * The frame opens under a clip mask and the image settles out of a slow drift,
 * so it arrives rather than simply being there.
 */
export function PhotoBand() {
  return (
    <section className="relative h-[78svh] min-h-[26rem] w-full overflow-hidden">
      <div className="clip-reveal absolute inset-0">
        <Image
          src={imageSrc("R5464381", 1)}
          alt="Sotogrande Alto, San Roque"
          fill
          sizes="100vw"
          className="drift object-cover"
        />
      </div>

      {/* Light enough to keep the photograph bright, dark enough to hold the type */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/85 to-transparent" />

      <div className="shell relative flex h-full flex-col justify-end pb-14">
        <p className="meta-in seq-1 eyebrow">The portfolio</p>
        <p className="display mt-5 max-w-[20ch] text-[clamp(2rem,5vw,4rem)]">
          <span className="mask">
            <span className="mask-line seq-2">
              {properties.length} residences. {locations.length} markets.
            </span>
          </span>
          <span className="mask">
            <span className="mask-line seq-3 text-mist">One office.</span>
          </span>
        </p>
        <PLink
          href="/properties"
          className="meta-in seq-4 mt-8 inline-flex w-fit items-center gap-3 text-xs uppercase tracking-[0.18em] text-bone transition-colors hover:text-gold"
        >
          <span className="h-px w-8 bg-gold" />
          See all of them
        </PLink>
      </div>
    </section>
  );
}
