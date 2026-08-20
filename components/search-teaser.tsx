"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { locations } from "@/lib/locations";
import { formatPrice, properties } from "@/lib/properties";
import { useIsProposal } from "./proposal";

const BUDGETS = [0, 2_000_000, 3_500_000, 5_000_000, 8_000_000];

/**
 * A three-control search bar, on the homepage, that hands off to /properties
 * with the filters already applied. Anything more than three controls belongs on
 * the search page itself.
 */
export function SearchTeaser() {
  const router = useRouter();
  const isProposal = useIsProposal();
  const [region, setRegion] = useState("");
  const [min, setMin] = useState("0");
  const [beds, setBeds] = useState("0");

  const matches = properties.filter(
    (p) =>
      (!region || p.region === region) &&
      p.price >= Number(min) &&
      p.beds >= Number(beds),
  ).length;

  const go = () => {
    const query = new URLSearchParams();
    if (region) query.set("region", region);
    if (min !== "0") query.set("min", min);
    if (beds !== "0") query.set("beds", beds);
    if (isProposal) query.set("proposal", "true");
    router.push(`/properties${query.size ? `?${query}` : ""}`);
  };

  return (
    <section className="border-t border-[var(--color-ink-hairline)] py-24 md:py-32">
      <div className="shell">
        <div className="reveal flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="eyebrow">Search</p>
            <h2 className="display mt-6 text-[clamp(2rem,4.5vw,3.5rem)]">
              Or start from what you need.
            </h2>
          </div>
          <p className="numeric text-sm text-mist">
            <span className="text-gold">{String(matches).padStart(2, "0")}</span> of{" "}
            {String(properties.length).padStart(2, "0")} match
          </p>
        </div>

        <div className="reveal mt-12 grid gap-px border border-[var(--color-ink-hairline)] bg-[var(--color-ink-hairline)] md:grid-cols-4">
          <Select label="Location" value={region} onChange={setRegion}>
            <option value="" className="bg-ink">
              All markets
            </option>
            {locations.map((l) => (
              <option key={l.region} value={l.region} className="bg-ink">
                {l.region}
              </option>
            ))}
          </Select>

          <Select label="Minimum budget" value={min} onChange={setMin}>
            {BUDGETS.map((b) => (
              <option key={b} value={String(b)} className="bg-ink">
                {b === 0 ? "No minimum" : `From ${formatPrice(b)}`}
              </option>
            ))}
          </Select>

          <Select label="Bedrooms" value={beds} onChange={setBeds}>
            {[0, 4, 5, 6, 7, 8].map((b) => (
              <option key={b} value={String(b)} className="bg-ink">
                {b === 0 ? "Any" : `${b}+`}
              </option>
            ))}
          </Select>

          <button
            type="button"
            onClick={go}
            className="bg-gold px-6 py-6 text-[0.75rem] uppercase tracking-[0.18em] text-ink transition-colors duration-500 hover:bg-gold-lift"
          >
            Show properties
          </button>
        </div>
      </div>
    </section>
  );
}

function Select({
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
    <label className="bg-ink px-6 py-5">
      <span className="text-[0.65rem] uppercase tracking-[0.2em] text-mist-dim">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full appearance-none bg-transparent text-base text-bone focus:outline-none"
      >
        {children}
      </select>
    </label>
  );
}
