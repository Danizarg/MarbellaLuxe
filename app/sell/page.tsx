import type { Metadata } from "next";
import Image from "next/image";
import { Seller } from "@/components/seller";
import { ContactSection } from "@/components/contact-section";
import { imageSrc } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Sell or let your property",
  description:
    "A documented valuation, marketing matched to the price bracket, and an international buyer list. Marbella, Benahavís, Estepona and Sotogrande.",
};

export default function SellPage() {
  return (
    <>
      <header className="relative h-[62svh] min-h-[26rem] overflow-hidden">
        <Image
          src={imageSrc("R5464381", 1)}
          alt="A villa in Sotogrande Alto"
          fill
          priority
          sizes="100vw"
          className="drift object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />
        <div className="shell relative flex h-full flex-col justify-end pb-14">
          <p className="rise eyebrow">Sellers</p>
          <h1 className="rise display mt-5 max-w-[16ch] text-[clamp(2.5rem,7vw,5.5rem)]">
            The right buyer is rarely local.
          </h1>
        </div>
      </header>

      <Seller />
      <ContactSection />
    </>
  );
}
