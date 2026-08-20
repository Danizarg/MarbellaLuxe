import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { serviceBySlug, services } from "@/lib/services";
import { imageSrc } from "@/lib/properties";
import { ContactSection } from "@/components/contact-section";
import { PLink } from "@/components/proposal";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const service = serviceBySlug((await params).slug);
  if (!service) return {};
  return { title: service.title, description: service.summary };
}

export default async function ServicePage({ params }: Params) {
  const service = serviceBySlug((await params).slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <header className="relative h-[58svh] min-h-[24rem] overflow-hidden">
        <Image
          src={imageSrc(service.imageRef, service.imageIndex)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="drift object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/55" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/70 to-transparent" />

        <div className="shell relative flex h-full flex-col justify-end pb-12">
          <p className="rise eyebrow">Services</p>
          <h1 className="rise display mt-5 max-w-[18ch] text-[clamp(2.5rem,7vw,5rem)]">
            {service.title}
          </h1>
        </div>
      </header>

      <section className="shell grid gap-12 py-20 md:py-24 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-7">
          <p className="reveal text-lg leading-relaxed text-bone md:text-xl">{service.intro}</p>
          {service.body.map((paragraph, i) => (
            <p
              key={i}
              className="reveal mt-6 max-w-[64ch] text-base leading-relaxed text-mist md:text-[1.0625rem]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {service.facts?.length ? (
          <aside className="reveal lg:col-span-5 lg:pl-10">
            <h2 className="eyebrow">In short</h2>
            <dl className="mt-7">
              {service.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-wrap justify-between gap-4 border-t border-[var(--color-ink-hairline)] py-4"
                >
                  <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-mist-dim">
                    {fact.label}
                  </dt>
                  <dd className="text-sm text-bone">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        ) : null}
      </section>

      {/* Process */}
      <section className="border-t border-[var(--color-ink-hairline)] py-20 md:py-24">
        <div className="shell">
          <h2 className="reveal eyebrow">How it works</h2>
          <ol className="mt-10 grid gap-px border border-[var(--color-ink-hairline)] bg-[var(--color-ink-hairline)] md:grid-cols-2 xl:grid-cols-3">
            {service.steps.map((step, i) => (
              <li key={step.title} className="reveal bg-ink p-8 md:p-10">
                <span className="numeric text-xs tracking-[0.2em] text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-5 text-xl md:text-2xl">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-mist">{step.body}</p>
              </li>
            ))}
          </ol>

          <PLink
            href={`/contact?intent=${service.intent}`}
            className="reveal mt-12 inline-block bg-bone px-8 py-4 text-[0.75rem] uppercase tracking-[0.18em] text-ink transition-colors duration-500 hover:bg-gold"
          >
            {service.cta}
          </PLink>
        </div>
      </section>

      {/* Other services */}
      <section className="border-t border-[var(--color-ink-hairline)] py-20 md:py-24">
        <div className="shell">
          <h2 className="reveal eyebrow">Other services</h2>
          <ul className="mt-10 grid gap-px border border-[var(--color-ink-hairline)] bg-[var(--color-ink-hairline)] sm:grid-cols-2 xl:grid-cols-4">
            {others.map((other) => (
              <li key={other.slug} className="reveal bg-ink">
                <PLink href={`/services/${other.slug}`} className="group block h-full p-8">
                  <h3 className="display text-xl transition-colors group-hover:text-gold">
                    {other.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">{other.summary}</p>
                </PLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
