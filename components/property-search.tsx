"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { locations } from "@/lib/locations";
import { categories, formatPrice, properties, type Category } from "@/lib/properties";
import { PropertyCard } from "./property-card";
import { rhythmAt } from "@/lib/grid-rhythm";
import { SelectField, type Option } from "./select-field";
import { ResultCount } from "./result-count";

type Sort = "featured" | "price-desc" | "price-asc" | "built-desc" | "plot-desc";

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
  label: b === 0 ? "No minimum" : formatPrice(b),
}));
const bedOptions: Option[] = [0, 2, 3, 4, 5, 6, 7].map((b) => ({
  value: String(b),
  label: b === 0 ? "Any" : `${b}+`,
}));
const sortOptions: Option[] = [
  { value: "featured", label: "Featured" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "built-desc", label: "Largest built area" },
  { value: "plot-desc", label: "Largest plot" },
];

/**
 * Filtering runs in the client over the full portfolio, which is the honest
 * shape of this build. Against the live Resales-Online feed the same control
 * surface would post to the API; the filter state model would not change.
 *
 * Two details matter more than the filtering itself. The bar is a configurator
 * rather than a form — the site's own listbox, generous spacing, hairline
 * separators. And when the results change the grid fades through the change
 * instead of snapping, so a filter feels like a transition rather than a reload.
 */
export function PropertySearch() {
  const params = useSearchParams();

  const [category, setCategory] = useState(params.get("category") ?? "");
  const [region, setRegion] = useState(params.get("region") ?? "");
  const [min, setMin] = useState(params.get("min") ?? "0");
  const [beds, setBeds] = useState(params.get("beds") ?? "0");
  const [sort, setSort] = useState<Sort>("featured");

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
        // Curated order: the featured residence leads, then by price. It is one
        // position away from price-desc, and it stops a 54-key hotel opening a
        // portfolio of villas purely because it is 100k more expensive.
        case "featured":
          if (a.flagship) return -1;
          if (b.flagship) return 1;
          return b.price - a.price;
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

  /* Fade the grid through a change of results rather than snapping to it. */
  const signature = `${category}|${region}|${min}|${beds}|${sort}`;
  const [settled, setSettled] = useState(signature);
  const [shifting, setShifting] = useState(false);

  useEffect(() => {
    if (signature === settled) return;
    setShifting(true);
    const timer = window.setTimeout(() => {
      setSettled(signature);
      setShifting(false);
    }, 220);
    return () => window.clearTimeout(timer);
  }, [signature, settled]);

  const isFiltered = category !== "" || region !== "" || min !== "0" || beds !== "0";

  const reset = () => {
    setCategory("");
    setRegion("");
    setMin("0");
    setBeds("0");
  };

  return (
    <>
      <div className="sticky top-16 z-40 border-y border-[var(--color-ink-hairline)] bg-ink/92 backdrop-blur-xl">
        <div className="shell">
          {/* Two columns on a phone rather than six stacked rows — a sticky bar
              that eats half the viewport is worse than no sticky bar. */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 py-4 lg:grid-cols-[repeat(5,minmax(0,1fr))_auto] lg:items-center lg:gap-x-0 lg:gap-y-0 lg:divide-x lg:divide-[var(--color-ink-hairline)] lg:py-0">
            <div className="lg:py-5 lg:pr-6">
              <SelectField label="Type" value={category} options={typeOptions} onChange={setCategory} />
            </div>
            <div className="lg:px-6 lg:py-5">
              <SelectField label="Location" value={region} options={regionOptions} onChange={setRegion} />
            </div>
            <div className="lg:px-6 lg:py-5">
              <SelectField label="From" value={min} options={budgetOptions} onChange={setMin} />
            </div>
            <div className="lg:px-6 lg:py-5">
              <SelectField label="Beds" value={beds} options={bedOptions} onChange={setBeds} />
            </div>
            <div className="lg:px-6 lg:py-5">
              <SelectField
                label="Sort"
                value={sort}
                options={sortOptions}
                onChange={(v) => setSort(v as Sort)}
                align="end"
              />
            </div>

            <div className="col-span-2 flex items-center gap-6 lg:col-span-1 lg:pl-6">
              <ResultCount count={results.length} total={properties.length} />
              <button
                type="button"
                onClick={reset}
                className="whitespace-nowrap text-xs uppercase tracking-[0.15em] text-mist-dim transition-all duration-500 hover:text-bone"
                style={{
                  opacity: isFiltered ? 1 : 0,
                  pointerEvents: isFiltered ? "auto" : "none",
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="shell py-16 md:py-24">
        {results.length ? (
          <div
            className="grid gap-x-8 gap-y-16 transition-all duration-300 md:grid-cols-2 xl:grid-cols-3"
            style={{
              opacity: shifting ? 0 : 1,
              transform: shifting ? "translateY(0.75rem)" : "none",
              transitionTimingFunction: "var(--ease-luxe)",
            }}
          >
            {results.map((property, i) => {
              const rhythm = rhythmAt(i);
              return (
                <PropertyCard
                  key={property.ref}
                  property={property}
                  priority={i < 2}
                  className={`reveal ${rhythm.span}`}
                  aspect={rhythm.aspect}
                />
              );
            })}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="display text-3xl text-bone">Nothing matches that combination.</p>
            <p className="mx-auto mt-5 max-w-[52ch] text-sm leading-relaxed text-mist">
              Our off-market list is considerably longer than our published one. Tell us what you
              are looking for and we will check it against what has not been listed.
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
