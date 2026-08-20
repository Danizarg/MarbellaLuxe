import { Hero } from "@/components/hero";
import { Curated } from "@/components/curated";
import { FlagshipStory } from "@/components/flagship-story";
import { LocationExplorer } from "@/components/location-explorer";
import { FeatureExplorer } from "@/components/feature-explorer";
import { SearchTeaser } from "@/components/search-teaser";
import { Seller } from "@/components/seller";
import { Investment } from "@/components/investment";
import { TeamPreview } from "@/components/team-preview";
import { ContactSection } from "@/components/contact-section";

/**
 * Homepage order is deliberate: one property, then the portfolio, then the
 * flagship at length, then the two ways buyers narrow down (place, then quality),
 * then search. Sellers and investors come after the buying story, not before it.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Curated />
      <FlagshipStory />
      <LocationExplorer />
      <FeatureExplorer />
      <SearchTeaser />
      <Seller />
      <Investment />
      <TeamPreview />
      <ContactSection />
    </>
  );
}
