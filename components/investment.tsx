import { PLink } from "./proposal";
import { SectionHead } from "./section-head";

/**
 * The investment section exists to answer the question every non-resident buyer
 * asks second: what does this actually cost me on top of the price?
 *
 * The figures below are the standard Andalucían purchase costs, stated as ranges
 * and explicitly flagged as indicative. Nothing here is presented as advice.
 */

const costs = [
  {
    label: "Transfer tax (ITP)",
    value: "7%",
    note: "Andalucía, resale property. Charged on the declared purchase price.",
  },
  {
    label: "New build",
    value: "10% + 1.2%",
    note: "VAT (IVA) at 10% plus stamp duty (AJD) at 1.2% in place of ITP.",
  },
  {
    label: "Notary, registry & legal",
    value: "1 – 2%",
    note: "Notary, land registry, and independent legal representation.",
  },
  {
    label: "Annual holding",
    value: "0.4 – 1.1%",
    note: "IBI, community fees and non-resident tax vary by municipality and urbanisation.",
  },
];

export function Investment() {
  return (
    <section id="investment" className="border-t border-[var(--color-ink-hairline)] py-24 md:py-36">
      <div className="shell">
        <SectionHead
          eyebrow="Buying from abroad"
          title="The number under the number."
          copy="Most of our buyers are not resident in Spain. Before anything is signed, it is worth knowing what sits on top of the asking price — and what changed in 2025."
        />

        <dl className="mt-16 grid gap-px border border-[var(--color-ink-hairline)] bg-[var(--color-ink-hairline)] sm:grid-cols-2 lg:grid-cols-4">
          {costs.map((cost) => (
            <div
              key={cost.label}
              className="reveal bg-ink p-8 md:p-10"
            >
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
            <p className="measure mt-6 text-base leading-relaxed text-mist">
              Spain closed its Golden Visa route on 3 April 2025, so property purchase no longer
              carries a residency permit with it. It has not slowed the top of this market — but it
              does mean the case for buying here is now the asset itself: supply that cannot be
              expanded, a coastline that is effectively built out, and a rental season that runs
              most of the year.
            </p>
            <p className="measure mt-5 text-sm leading-relaxed text-mist-dim">
              Figures above are indicative and current at the time of writing. They are not tax or
              legal advice — confirm your position with an independent Spanish lawyer before
              committing to a purchase.
            </p>
          </div>

          <div className="reveal lg:col-span-5 lg:pl-10">
            <div className="hairline pt-8">
              <p className="text-sm leading-relaxed text-mist">
                We work with buyers who want the arithmetic before the viewing, and with developers
                and investors on construction and renovation projects along the coast.
              </p>
              <PLink
                href="/contact?intent=investment"
                className="mt-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-bone transition-colors hover:text-gold"
              >
                <span className="h-px w-8 bg-gold" />
                Speak to the investment desk
              </PLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
