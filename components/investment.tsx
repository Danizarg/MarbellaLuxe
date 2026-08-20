import { PLink } from "./proposal";
import { SectionHead } from "./section-head";

/**
 * The investment section answers the question every non-resident buyer asks
 * second: what does this actually cost me on top of the price?
 *
 * The figures are the standard Andalucían purchase costs, stated as ranges and
 * explicitly flagged as indicative. Nothing here is presented as advice.
 */

const costs = [
  {
    label: "Transfer tax (ITP)",
    value: "7%",
    note: "Andalucía, resale property. Charged on the declared purchase price and payable within thirty days of the deed.",
  },
  {
    label: "New build",
    value: "10% + 1.2%",
    note: "VAT (IVA) at 10% plus stamp duty (AJD) at 1.2%, in place of ITP, where you are the first occupant.",
  },
  {
    label: "Notary, registry & legal",
    value: "1 – 2%",
    note: "Notary fees, land registry inscription and independent legal representation. Budget at the upper end on a complex title.",
  },
  {
    label: "Annual holding",
    value: "0.4 – 1.1%",
    note: "IBI, refuse charges, community fees and non-resident income tax. Varies widely by municipality and urbanisation.",
  },
];

export function Investment() {
  return (
    <section id="investment" className="border-t border-[var(--color-ink-hairline)] py-24 md:py-32">
      <div className="shell">
        <SectionHead
          eyebrow="Buying from abroad"
          title="The number under the number."
          copy={[
            "Most of our buyers are not resident in Spain, and the figure that matters to them is not the asking price but the total cost of acquisition. On a resale purchase in Andalucía that is typically eight to nine per cent on top, and it is payable in cash rather than financed.",
            "Below is what those costs actually consist of, followed by the one structural change that has altered the case for buying here.",
          ]}
        />

        <dl className="mt-16 grid gap-px border border-[var(--color-ink-hairline)] bg-[var(--color-ink-hairline)] sm:grid-cols-2 lg:grid-cols-4">
          {costs.map((cost) => (
            <div key={cost.label} className="reveal bg-ink p-8 md:p-10">
              <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-mist-dim">
                {cost.label}
              </dt>
              <dd className="numeric display mt-5 text-[clamp(2rem,4vw,3rem)] text-gold">
                {cost.value}
              </dd>
              <p className="mt-5 text-xs leading-relaxed text-mist">{cost.note}</p>
            </div>
          ))}
        </dl>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-7">
            <h3 className="display text-[clamp(1.75rem,3.2vw,2.5rem)]">
              Residency by investment ended in April 2025.
            </h3>
            <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-mist">
              Spain closed its Golden Visa route on 3 April 2025, so buying property no longer
              carries a residency permit with it. Applications lodged before that date continue to
              be processed, and existing permits remain valid and renewable, but the route is
              closed to new purchasers.
            </p>
            <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-mist">
              It has not slowed the top of this market, and the reason is worth stating plainly: at
              this level very few buyers were purchasing for the visa. What they were buying was an
              asset in a supply-constrained location — a coastline that is effectively built out, a
              planning regime that will not permit a great deal more of it, and a season that now
              runs for most of the year. That case is unchanged.
            </p>
            <p className="mt-5 max-w-[62ch] text-sm leading-relaxed text-mist-dim">
              Figures above are indicative and current at the time of writing. They are not tax or
              legal advice — confirm your own position with an independent Spanish lawyer before
              committing to a purchase. We are happy to introduce you to one who is not connected
              to us.
            </p>
          </div>

          <div className="reveal lg:col-span-5 lg:pl-10">
            <div className="hairline pt-8">
              <p className="text-base leading-relaxed text-mist">
                We work with buyers who want the arithmetic before the viewing rather than after
                it, and with developers and private investors on land, construction and
                income-producing assets along the coast.
              </p>
              <PLink
                href="/services/developers-and-investors"
                className="mt-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-bone transition-colors hover:text-gold"
              >
                <span className="h-px w-8 bg-gold" />
                Developers &amp; investors
              </PLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
