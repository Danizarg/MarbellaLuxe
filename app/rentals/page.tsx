import type { Metadata } from "next";
import { formatArea } from "@/lib/properties";
import { formatPcm, rentals } from "@/lib/rentals";
import { ContactSection } from "@/components/contact-section";
import { PLink } from "@/components/proposal";

export const metadata: Metadata = {
  title: "Long-term rentals",
  description:
    "Long-term rental villas and apartments in Marbella, Puerto Banús, Estepona and Sotogrande, from €2,200 per calendar month.",
};

/**
 * The rentals index is presented as a typographic schedule rather than as
 * photographic cards, because every rental on the client's feed is served under
 * a CDN key that burns a watermark into the frame. Publishing watermarked
 * photography on a site at this level is worse than publishing none — see
 * lib/rentals.ts for the full reasoning and how to switch it back.
 */
export default function RentalsPage() {
  return (
    <>
      <header className="shell pb-14 pt-36 md:pb-16 md:pt-48">
        <p className="rise eyebrow">Long-term rentals</p>
        <h1 className="rise display mt-6 max-w-[20ch] text-[clamp(2.5rem,7vw,5rem)]">
          Live here first. Buy here later.
        </h1>
        <p className="rise mt-8 max-w-[64ch] text-base leading-relaxed text-mist">
          A significant proportion of the people who buy on this coast rent for a season first, and
          it is almost always the right order. Six months in Nueva Andalucía will tell you more
          about whether you want to live in Nueva Andalucía than any number of viewings.
        </p>
        <p className="rise mt-5 max-w-[64ch] text-base leading-relaxed text-mist">
          Below is our current long-term schedule. Rentals of eleven months and over are governed by
          the Spanish LAU and require proof of income, a deposit and, usually, a bank guarantee;
          we will walk you through what a landlord here will ask for before you view.
        </p>
      </header>

      <section className="shell pb-8">
        {/* Mobile: stacked cards. A horizontally scrolling table pushes the rent —
            the one number anyone is looking for — off the right edge. */}
        <ul className="md:hidden">
          {rentals.map((rental) => (
            <li
              key={rental.ref}
              className="reveal border-t border-[var(--color-ink-hairline)] py-7"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="display text-2xl text-bone">{rental.location}</h2>
                <p className="numeric shrink-0 text-base text-gold">{formatPcm(rental.pcm)}</p>
              </div>
              <p className="mt-1.5 text-sm text-mist-dim">
                {rental.kind} · {rental.ref}
              </p>
              <dl className="numeric mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-mist-dim">
                <span className="flex gap-2">
                  <dt>Beds</dt>
                  <dd className="text-mist">{rental.beds}</dd>
                </span>
                <span className="flex gap-2">
                  <dt>Baths</dt>
                  <dd className="text-mist">{rental.baths}</dd>
                </span>
                <span className="flex gap-2">
                  <dt>Built</dt>
                  <dd className="text-mist">{formatArea(rental.built)}</dd>
                </span>
                {rental.plot ? (
                  <span className="flex gap-2">
                    <dt>Plot</dt>
                    <dd className="text-mist">{formatArea(rental.plot)}</dd>
                  </span>
                ) : null}
              </dl>
              <PLink
                href={`/contact?intent=other&ref=${rental.ref}`}
                className="mt-5 inline-flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-bone transition-colors hover:text-gold"
              >
                <span className="h-px w-6 bg-gold" />
                Enquire
              </PLink>
            </li>
          ))}
        </ul>

        <div className="reveal hidden overflow-x-auto md:block">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <caption className="sr-only">Long-term rental properties, by monthly rent</caption>
            <thead>
              <tr className="border-y border-[var(--color-ink-hairline)]">
                {["Location", "Type", "Beds", "Baths", "Built", "Plot", "Rent", ""].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="py-4 pr-6 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-mist-dim"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rentals.map((rental) => (
                <tr
                  key={rental.ref}
                  className="border-b border-[var(--color-ink-hairline)] transition-colors hover:bg-ink-raised"
                >
                  <td className="py-6 pr-6">
                    <span className="display block text-xl text-bone">{rental.location}</span>
                    <span className="numeric mt-1 block text-xs text-mist-dim">{rental.ref}</span>
                  </td>
                  <td className="py-6 pr-6 text-sm text-mist">{rental.kind}</td>
                  <td className="numeric py-6 pr-6 text-sm text-mist">{rental.beds}</td>
                  <td className="numeric py-6 pr-6 text-sm text-mist">{rental.baths}</td>
                  <td className="numeric py-6 pr-6 text-sm text-mist">
                    {formatArea(rental.built)}
                  </td>
                  <td className="numeric py-6 pr-6 text-sm text-mist">
                    {rental.plot ? formatArea(rental.plot) : "—"}
                  </td>
                  <td className="numeric py-6 pr-6 text-base text-gold">
                    {formatPcm(rental.pcm)}
                  </td>
                  <td className="py-6 text-right">
                    <PLink
                      href={`/contact?intent=other&ref=${rental.ref}`}
                      className="whitespace-nowrap text-xs uppercase tracking-[0.15em] text-mist transition-colors hover:text-gold"
                    >
                      Enquire
                    </PLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="reveal mt-8 max-w-[64ch] text-xs leading-relaxed text-mist-dim">
          Photography for rental properties is sent on request rather than published here — the
          images on our current feed carry an agency watermark and we would rather show you the
          originals. Rents are quoted per calendar month and generally exclude utilities,
          community charges and the tenant&apos;s share of any short-stay tourist licence.
        </p>
      </section>

      <section className="border-t border-[var(--color-ink-hairline)] py-20 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="reveal">
            <h2 className="display text-[clamp(1.75rem,3.4vw,2.5rem)]">
              Short-term and holiday lets
            </h2>
            <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-mist">
              We also handle short-term and holiday rentals across the same areas, which in
              Andalucía requires a registered tourist licence (VFT) for the property. If you own
              here and are considering letting seasonally, we can advise on whether your property
              qualifies, what the community rules allow, and what it would realistically earn.
            </p>
            <PLink
              href="/contact?intent=other"
              className="mt-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-bone transition-colors hover:text-gold"
            >
              <span className="h-px w-8 bg-gold" />
              Ask about short-term letting
            </PLink>
          </div>

          <div className="reveal">
            <h2 className="display text-[clamp(1.75rem,3.4vw,2.5rem)]">Letting your property</h2>
            <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-mist">
              For owners, we handle tenant sourcing and referencing, the contract, the inventory and
              the deposit registration, and can take on full management including maintenance and
              the tax filings a non-resident landlord is required to make quarterly.
            </p>
            <PLink
              href="/sell"
              className="mt-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-bone transition-colors hover:text-gold"
            >
              <span className="h-px w-8 bg-gold" />
              Sell or let with us
            </PLink>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
