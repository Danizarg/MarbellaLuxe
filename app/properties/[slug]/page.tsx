import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  formatArea,
  formatPrice,
  imageSrc,
  properties,
  propertyBySlug,
} from "@/lib/properties";
import { Gallery } from "@/components/gallery";
import { PropertyCard } from "@/components/property-card";
import { ContactSection } from "@/components/contact-section";
import { PLink } from "@/components/proposal";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const property = propertyBySlug((await params).slug);
  if (!property) return {};
  return {
    title: `${property.name}, ${property.location}`,
    description: property.standfirst,
    openGraph: { images: [imageSrc(property.ref, property.hero)] },
  };
}

export default async function PropertyPage({ params }: Params) {
  const property = propertyBySlug((await params).slug);
  if (!property) notFound();

  const others = properties.filter((p) => p.ref !== property.ref).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[86svh] min-h-[32rem] w-full overflow-hidden">
        <Image
          src={imageSrc(property.ref, property.hero)}
          alt={`${property.name}, ${property.location}`}
          fill
          priority
          sizes="100vw"
          className="drift object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/45" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/70 to-transparent" />

        <div className="shell relative flex h-full flex-col justify-end pb-14">
          <p className="rise eyebrow">{property.location}</p>
          <h1 className="rise display mt-5 text-[clamp(2.75rem,8vw,7rem)]">
            {property.name}
          </h1>
          <p className="rise measure mt-6 text-base leading-relaxed text-mist">
            {property.standfirst}
          </p>
        </div>
      </section>

      {/* Specification */}
      <section className="shell -mt-px">
        <dl className="numeric grid grid-cols-2 gap-px border border-[var(--color-ink-hairline)] bg-[var(--color-ink-hairline)] md:grid-cols-4 lg:grid-cols-7">
          <Cell label="Guide price" value={formatPrice(property.price)} accent />
          <Cell label="Bedrooms" value={String(property.beds)} />
          <Cell label="Bathrooms" value={String(property.baths)} />
          <Cell label="Built" value={formatArea(property.built)} />
          <Cell label="Plot" value={formatArea(property.plot)} />
          <Cell
            label="Terrace"
            value={property.terrace ? formatArea(property.terrace) : "—"}
          />
          <Cell label="Reference" value={property.ref} />
        </dl>
      </section>

      {/* Story */}
      <section className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-7">
          {property.story.map((paragraph, i) => (
            <p
              key={i}
              className={[
                "reveal leading-relaxed text-mist",
                i === 0 ? "display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.2] text-bone" : "mt-7 text-base",
              ].join(" ")}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <aside className="reveal lg:col-span-5 lg:pl-10">
          <h2 className="eyebrow">At a glance</h2>
          <ul className="mt-7">
            {property.highlights.map((highlight) => (
              <li
                key={highlight}
                className="border-t border-[var(--color-ink-hairline)] py-4 text-sm text-mist"
              >
                {highlight}
              </li>
            ))}
            <li className="border-t border-[var(--color-ink-hairline)] py-4 text-sm text-mist">
              {property.region} · {property.type}
            </li>
          </ul>

          <PLink
            href={`/contact?intent=viewing&ref=${property.ref}`}
            className="mt-10 inline-block bg-bone px-8 py-4 text-[0.75rem] uppercase tracking-[0.18em] text-ink transition-colors duration-500 hover:bg-gold"
          >
            Arrange a viewing
          </PLink>

          <p className="mt-6 text-xs leading-relaxed text-mist-dim">
            Reference {property.ref}. Measurements and price as published by the agency.{" "}
            <a
              href={property.sourceUrl}
              rel="noreferrer"
              target="_blank"
              className="underline decoration-[var(--rule)] underline-offset-4 transition-colors hover:text-mist"
            >
              Original listing
            </a>
            .
          </p>
        </aside>
      </section>

      <Gallery property={property} />

      {/* Elsewhere in the portfolio */}
      <section className="border-t border-[var(--color-ink-hairline)] py-20 md:py-28">
        <div className="shell">
          <h2 className="reveal eyebrow">Elsewhere in the portfolio</h2>
          <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {others.map((other) => (
              <PropertyCard key={other.ref} property={other} className="reveal" />
            ))}
          </div>
        </div>
      </section>

      <ContactSection defaultRef={property.ref} />
    </>
  );
}

function Cell({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="bg-ink p-5 md:p-6">
      <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-mist-dim">{label}</dt>
      <dd className={`mt-2 text-base md:text-lg ${accent ? "text-gold" : "text-bone"}`}>
        {value}
      </dd>
    </div>
  );
}
