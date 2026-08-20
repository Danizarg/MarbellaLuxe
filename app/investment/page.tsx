import type { Metadata } from "next";
import { Investment } from "@/components/investment";
import { ContactSection } from "@/components/contact-section";

export const metadata: Metadata = {
  title: "Investment & purchase costs",
  description:
    "Indicative Andalucían purchase costs, annual holding costs, and what changed when Spain closed the Golden Visa route in April 2025.",
};

export default function InvestmentPage() {
  return (
    <>
      <header className="shell pb-4 pt-36 md:pt-48">
        <p className="rise eyebrow">Investment</p>
        <h1 className="rise display mt-6 max-w-[18ch] text-[clamp(2.5rem,7vw,5.5rem)]">
          Know the arithmetic before the viewing.
        </h1>
      </header>

      <Investment />
      <ContactSection />
    </>
  );
}
