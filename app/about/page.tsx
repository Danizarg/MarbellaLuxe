import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { imageSrc, properties } from "@/lib/properties";
import { locations } from "@/lib/locations";
import { ContactSection } from "@/components/contact-section";
import { PLink } from "@/components/proposal";

export const metadata: Metadata = {
  title: "About us",
  description:
    "CENTURY 21 Luxe Marbella — an international team selling, letting and renovating property across Marbella, Benahavís, Estepona, Sotogrande and Mijas.",
};

const numbers = [
  { value: `${site.experienceYears}+`, label: "Years on the Costa del Sol" },
  { value: String(site.languages.length), label: "Languages spoken in the office" },
  { value: String(locations.length), label: "Markets covered" },
  { value: "10", label: "Brokers and consultants" },
];

export default function AboutPage() {
  return (
    <>
      <header className="relative h-[62svh] min-h-[26rem] overflow-hidden">
        <Image
          src={imageSrc("R5464381", 2)}
          alt="Sotogrande Alto, San Roque"
          fill
          priority
          sizes="100vw"
          className="drift object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/55" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/70 to-transparent" />

        <div className="shell relative flex h-full flex-col justify-end pb-14">
          <p className="rise eyebrow">About us</p>
          <h1 className="rise display mt-5 max-w-[18ch] text-[clamp(2.5rem,7vw,5.5rem)]">
            A local agency with an international address book.
          </h1>
        </div>
      </header>

      <section className="shell grid gap-12 py-20 md:py-24 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-7">
          <p className="reveal text-lg leading-relaxed text-bone md:text-xl">
            CENTURY 21 Luxe is an international real estate team based at El Paraíso, on the New
            Golden Mile between Marbella and Estepona, specialising in luxury property along the
            Costa del Sol.
          </p>
          <p className="reveal mt-6 max-w-[64ch] text-base leading-relaxed text-mist md:text-[1.0625rem]">
            The office was built around a simple observation: almost nobody buying property here
            lives here yet. Our clients are arriving from Belgium, the Netherlands, France, the
            United Kingdom, Scandinavia, Ukraine, Russia and Morocco, and they are trying to make a
            significant financial decision in a country whose conveyancing process, tax treatment
            and planning system are unfamiliar to them.
          </p>
          <p className="reveal mt-6 max-w-[64ch] text-base leading-relaxed text-mist md:text-[1.0625rem]">
            So the team was assembled around languages rather than around territory. Between ten
            brokers and consultants we work in {site.languages.join(", ")} — which means the person
            who answers your first email is usually the person who can also explain a Nota Simple
            to you, and stand beside you at the notary when it matters.
          </p>
          <p className="reveal mt-6 max-w-[64ch] text-base leading-relaxed text-mist md:text-[1.0625rem]">
            Behind that sits the CENTURY 21 network — the largest residential real estate
            organisation in the world by office count — which gives a small local team a genuinely
            international buyer pool. In practice, that is the difference between selling a villa in
            four months and selling it in fourteen.
          </p>
          <p className="reveal mt-6 max-w-[64ch] text-base leading-relaxed text-mist md:text-[1.0625rem]">
            We are deliberately not a volume agency. We publish a fraction of what we can access,
            we keep valuation, renovation management and architectural design in-house rather than
            referring them out, and we would rather tell a seller their price is wrong than take an
            instruction we cannot deliver on.
          </p>
        </div>

        <aside className="reveal lg:col-span-5 lg:pl-10">
          <dl className="grid grid-cols-2 gap-px border border-[var(--color-ink-hairline)] bg-[var(--color-ink-hairline)]">
            {numbers.map((n) => (
              <div key={n.label} className="bg-ink p-6">
                <dt className="numeric display text-[clamp(2rem,4vw,2.75rem)] text-gold">
                  {n.value}
                </dt>
                <dd className="mt-2 text-xs leading-relaxed text-mist">{n.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 border-t border-[var(--color-ink-hairline)] pt-8">
            <h2 className="eyebrow">Where we work</h2>
            <ul className="mt-5 space-y-2 text-sm text-mist">
              {locations.map((l) => (
                <li key={l.region}>
                  {l.region} — <span className="text-mist-dim">{l.note}</span>
                </li>
              ))}
            </ul>
            <p className="numeric mt-6 text-xs text-mist-dim">
              {properties.length} properties currently published
            </p>
          </div>
        </aside>
      </section>

      <section className="border-t border-[var(--color-ink-hairline)] py-20 md:py-24">
        <div className="shell grid gap-10 md:grid-cols-3">
          {[
            {
              title: "Meet the team",
              body: "Two brokers and eight sales consultants, and the languages each of them works in.",
              href: "/team",
              cta: "The team",
            },
            {
              title: "What we do",
              body: "Valuation, renovation management, architectural design, buying agency and development advisory.",
              href: "/services",
              cta: "Services",
            },
            {
              title: "Work with us",
              body: "We take on consultants and run a structured internship programme for students of real estate.",
              href: "/careers",
              cta: "Careers",
            },
          ].map((card) => (
            <div key={card.href} className="reveal border-t border-[var(--rule)] pt-8">
              <h2 className="display text-2xl">{card.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-mist">{card.body}</p>
              <PLink
                href={card.href}
                className="mt-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-bone transition-colors hover:text-gold"
              >
                <span className="h-px w-8 bg-gold" />
                {card.cta}
              </PLink>
            </div>
          ))}
        </div>
      </section>

      <ContactSection />
    </>
  );
}
