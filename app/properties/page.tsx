import { Suspense } from "react";
import type { Metadata } from "next";
import { PropertySearch } from "@/components/property-search";
import { properties } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Properties for sale",
  description:
    "Villas and residences for sale in Marbella, Benahavís, Estepona and Sotogrande, presented in full.",
};

export default function PropertiesPage() {
  return (
    <>
      <header className="shell pb-14 pt-36 md:pb-16 md:pt-48">
        <p className="rise eyebrow">The portfolio</p>
        <h1 className="rise display mt-6 max-w-[18ch] text-[clamp(2.5rem,7vw,5.5rem)]">
          Every property, in full.
        </h1>
        <p className="rise measure mt-8 text-base leading-relaxed text-mist">
          {properties.length} residences across four markets. No teaser pricing, no cropped
          galleries — the same detail we would put in front of you in the office.
        </p>
      </header>

      <Suspense fallback={<div className="h-32" />}>
        <PropertySearch />
      </Suspense>
    </>
  );
}
