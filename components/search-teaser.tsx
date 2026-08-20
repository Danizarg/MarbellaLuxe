"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { locations } from "@/lib/locations";
import { categories, formatPrice, properties, type Category } from "@/lib/properties";
import { useIsProposal } from "./proposal";
import { SelectField, type Option } from "./select-field";
import { ResultCount } from "./result-count";

const BUDGETS = [0, 500_000, 1_000_000, 2_000_000, 3_500_000, 5_000_000, 8_000_000];

const typeOptions: Option[] = [
  { value: "", label: "All types" },
  ...categories.map((c) => ({ value: c, label: c })),
];

const regionOptions: Option[] = [
  { value: "", label: "All markets" },
  ...locations.map((l) => ({ value: l.region, label: l.region })),
];

const budgetOptions: Option[] = BUDGETS.map((b) => ({
  value: String(b),
  label: b === 0 ? "No minimum" : `From ${formatPrice(b)}`,
}));

/**
 * The search bar builds itself as the section arrives — headline, then each
 * control in turn, then the action. The selectors are the site's own listbox
 * rather than an operating-system menu; this is the interaction that turns a
 * visitor into an enquiry and it should not be the one place the design gives up.
 */
export function SearchTeaser() {
  const router = useRouter();
  const isProposal = useIsProposal();
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [min, setMin] = useState("0");

  const matches = properties.filter(
    (p) =>
      (!category || p.category === (category as Category)) &&
      (!region || p.region === region) &&
      p.price >= Number(min),
  ).length;

  const go = () => {
    const query = new URLSearchParams();
    if (category) query.set("category", category);
    if (region) query.set("region", region);
    if (min !== "0") query.set("min", min);
    if (isProposal) query.set("proposal", "true");
    router.push(`/properties${query.size ? `?${query}` : ""}`);
  };

  return (
    <section className="border-t border-[var(--color-ink-hairline)] py-24 md:py-32">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="meta-in seq-1 eyebrow">Search</p>
            <h2 className="display mt-6 text-[clamp(2rem,4.5vw,3.25rem)]">
              <span className="mask">
                <span className="mask-line seq-2">Or start from what you need.</span>
              </span>
            </h2>
          </div>
          <ResultCount
            count={matches}
            total={properties.length}
            className="meta-in seq-2"
          />
        </div>

        <div className="mt-12 border-y border-[var(--color-ink-hairline)]">
          <div className="grid divide-y divide-[var(--color-ink-hairline)] md:grid-cols-2 md:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-[var(--color-ink-hairline)]">
            <div className="meta-in seq-1 px-0 py-6 lg:px-7">
              <SelectField
                label="Type"
                value={category}
                options={typeOptions}
                onChange={setCategory}
              />
            </div>
            <div className="meta-in seq-2 px-0 py-6 lg:px-7">
              <SelectField
                label="Location"
                value={region}
                options={regionOptions}
                onChange={setRegion}
              />
            </div>
            <div className="meta-in seq-3 px-0 py-6 lg:px-7">
              <SelectField label="Budget" value={min} options={budgetOptions} onChange={setMin} />
            </div>
            <button
              type="button"
              onClick={go}
              className="meta-in seq-4 group flex items-center justify-between gap-4 px-0 py-6 text-left text-[0.75rem] uppercase tracking-[0.18em] text-bone transition-colors duration-500 hover:text-gold lg:px-7"
            >
              Show properties
              <span
                aria-hidden
                className="h-px w-8 bg-gold transition-all duration-500 group-hover:w-12"
                style={{ transitionTimingFunction: "var(--ease-luxe)" }}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
