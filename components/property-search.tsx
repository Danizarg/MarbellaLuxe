"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { locations } from "@/lib/locations";
import { categories, formatPrice, properties, type Category } from "@/lib/properties";
import { PropertyCard } from "./property-card";

type Sort = "price-desc" | "price-asc" | "built-desc" | "plot-desc";

const SORTS: { id: Sort; label: string }[] = [
  { id: "price-desc", label: "Price, high to low" },
  { id: "price-asc", label: "Price, low to high" },
  { id: "built-desc", label: "Largest built area" },
  { id: "plot-desc", label: "Largest plot" },
];

const BUDGETS = [0, 500_000, 1_000_000, 2_000_000, 3_500_000, 5_000_000, 8_000_000];

/**
 * Filtering runs in the client over the full portfolio, which is the honest
 * shape of this build. Against the live Resales-Online feed the same control
 * surface would post to the API; the filter state model would not change.
 *
 * Initial state is seeded from the query string, so the homepage search bar,
 * the footer category links and shared URLs all land here with filters applied.
 */
export function PropertySearch() {
  const params = useSearchParams();

  const [category, setCategory] = useState(params.get("category") ?? "");
  const [region, setRegion] = useState(params.get("region") ?? "");
  const [min, setMin] = useState(params.get("min") ?? "0");
  const [beds, setBeds] = useState(params.get("beds") ?? "0");
  const [sort, setSort] = useState<Sort>("price-desc");

  const results = useMemo(() => {
    const filtered = properties.filter(
      (p) =>
        (!category || p.category === (category as Category)) &&
        (!region || p.region === region) &&
        p.price >= Number(min) &&
        p.beds >= Number(beds),
    );

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "built-desc":
          return b.built - a.built;
        case "plot-desc":
          return b.plot - a.plot;
        default:
          return b.price - a.price;
      }
    });
  }, [category, region, min, beds, sort]);

  const isFiltered = category !== "" || region !== "" || min !== "0" || beds !== "0";

  const reset = () => {
    setCategory("");
    setRegion("");
    setMin("0");
    setBeds("0");
  };

  return (
    <>
      {/* Filter bar — sticks under the header so it is never more than a glance away */}
      <div className="sticky top-16 z-40 border-y border-[var(--color-ink-hairline)] bg-ink/90 backdrop-blur-xl">
        <div className="shell flex flex-wrap items-center gap-x-7 gap-y-3 py-4">
          <Control label="Type" value={category} onChange={setCategory}>
            <option value="" className="bg-ink">
              All types
            </option>
            {categories.map((c) => (
              <option key={c} value={c} className="bg-ink">
                {c}
              </option>
            ))}
          </Control>

          <Control label="Location" value={region} onChange={setRegion}>
            <option value="" className="bg-ink">
              All markets
            </option>
            {locations.map((l) => (
              <option key={l.region} value={l.region} className="bg-ink">
                {l.region}
              </option>
            ))}
          </Control>

          <Control label="From" value={min} onChange={setMin}>
            {BUDGETS.map((b) => (
              <option key={b} value={String(b)} className="bg-ink">
                {b === 0 ? "No minimum" : formatPrice(b)}
              </option>
            ))}
          </Control>

          <Control label="Beds" value={beds} onChange={setBeds}>
            {[0, 2, 3, 4, 5, 6, 7].map((b) => (
              <option key={b} value={String(b)} className="bg-ink">
                {b === 0 ? "Any" : `${b}+`}
              </option>
            ))}
          </Control>

          <Control label="Sort" value={sort} onChange={(v) => setSort(v as Sort)}>
            {SORTS.map((s) => (
              <option key={s.id} value={s.id} className="bg-ink">
                {s.label}
              </option>
            ))}
          </Control>

          <div className="ml-auto flex items-center gap-5">
            <p className="numeric text-xs text-mist" role="status" aria-live="polite">
              <span className="text-gold">{String(results.length).padStart(2, "0")}</span>{" "}
              {results.length === 1 ? "property" : "properties"}
            </p>
            {isFiltered ? (
              <button
                type="button"
                onClick={reset}
                className="text-xs uppercase tracking-[0.15em] text-mist-dim transition-colors hover:text-bone"
              >
                Clear
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="shell py-16 md:py-24">
        {results.length ? (
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
            {results.map((property, i) => (
              <PropertyCard
                key={property.ref}
                property={property}
                priority={i < 3}
                className="reveal"
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="display text-3xl text-bone">Nothing matches that combination.</p>
            <p className="mx-auto mt-5 max-w-[52ch] text-sm leading-relaxed text-mist">
              Our off-market list is considerably longer than our published one, and a good
              proportion of the best properties on this coast never reach a portal at all. Tell us
              what you are looking for and we will check it against what has not been listed.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-8 border border-[var(--rule)] px-6 py-3 text-xs uppercase tracking-[0.18em] text-bone transition-colors hover:border-gold hover:text-gold"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function Control({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-baseline gap-2.5">
      <span className="text-[0.65rem] uppercase tracking-[0.18em] text-mist-dim">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-transparent text-sm text-bone focus:outline-none"
      >
        {children}
      </select>
    </label>
  );
}
