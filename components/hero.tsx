import Image from "next/image";
import { flagship, formatArea, formatPrice, imageSrc } from "@/lib/properties";
import { PLink } from "./proposal";

/**
 * The hero is a property, not a slogan.
 *
 * A €9.9M residence is treated the way a flagship device is treated: one image,
 * held full-bleed and drifting slowly, with the specification laid underneath it
 * as data rather than as marketing copy.
 */
export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[36rem] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={imageSrc(flagship.ref, flagship.hero)}
          alt={`${flagship.name} — ${flagship.location}`}
          fill
          priority
          sizes="100vw"
          className="drift object-cover"
        />
      </div>

      {/* Three scrims: one under the header, one from the left to seat the display
          type, and a heavier one across the bottom third so the price and spec
          strip hold contrast over water and pale stone. */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/75 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-ink via-ink/85 to-transparent" />

      <div className="shell relative flex h-full flex-col justify-end pb-16 md:pb-24">
        <p className="rise eyebrow" style={{ ["--rise-delay" as string]: "120ms" }}>
          {flagship.location}
        </p>

        <h1
          className="rise display mt-6 max-w-[16ch] text-[clamp(3rem,9vw,8rem)]"
          style={{ ["--rise-delay" as string]: "220ms" }}
        >
          Some houses are not listed. They are presented.
        </h1>

        <div
          className="rise mt-10 flex flex-wrap items-end gap-x-12 gap-y-6 md:mt-14"
          style={{ ["--rise-delay" as string]: "380ms" }}
        >
          <Spec label="Guide price" value={formatPrice(flagship.price)} lead />
          <Spec label="Built" value={formatArea(flagship.built)} />
          <Spec label="Plot" value={formatArea(flagship.plot)} />
          <Spec label="Bedrooms" value={String(flagship.beds)} />
          <Spec label="Reference" value={flagship.ref} />
        </div>

        <div
          className="rise mt-12 flex flex-wrap items-center gap-4"
          style={{ ["--rise-delay" as string]: "500ms" }}
        >
          <PLink
            href={`/properties/${flagship.slug}`}
            className="bg-bone px-8 py-4 text-[0.75rem] uppercase tracking-[0.18em] text-ink transition-colors duration-500 hover:bg-gold"
          >
            View the residence
          </PLink>
          <PLink
            href="/properties"
            className="border border-[var(--rule)] px-8 py-4 text-[0.75rem] uppercase tracking-[0.18em] text-bone transition-colors duration-500 hover:border-gold hover:text-gold"
          >
            The full portfolio
          </PLink>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 right-[var(--shell)] hidden items-center gap-3 md:flex">
        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-mist-dim">Scroll</span>
        <span className="block h-10 w-px bg-gradient-to-b from-transparent via-gold to-transparent" />
      </div>
    </section>
  );
}

function Spec({ label, value, lead }: { label: string; value: string; lead?: boolean }) {
  return (
    <div>
      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-mist-dim">{label}</p>
      <p
        className={
          lead
            ? "numeric display mt-2 text-3xl text-gold md:text-4xl"
            : "numeric mt-2 text-lg text-bone"
        }
      >
        {value}
      </p>
    </div>
  );
}
