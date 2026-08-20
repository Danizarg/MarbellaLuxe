import { SiteIntro } from "@/components/site-intro";
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
 * The intro plays once per session and only here, on the way in. Deep links to a
 * property or a service page never sit behind an animation.
 *
 * Section order is deliberate: the portfolio, then the featured residence at
 * length, then the two ways buyers narrow down — place, then quality — then
 * search. Sellers and investors come after the buying story, not before it.
 */
export default function HomePage() {
  return (
    <>
      <SiteIntro />
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
