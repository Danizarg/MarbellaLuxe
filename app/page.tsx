import { IntroHero } from "@/components/intro-hero";
import { FlagshipReveal } from "@/components/flagship-reveal";
import { FlagshipStory, Interlude } from "@/components/flagship-story";
import { Curated } from "@/components/curated";
import { LocationExplorer } from "@/components/location-explorer";
import { FeatureExplorer } from "@/components/feature-explorer";
import { SearchTeaser } from "@/components/search-teaser";
import { Seller } from "@/components/seller";
import { Investment } from "@/components/investment";
import { PhotoBand } from "@/components/photo-band";
import { TeamPreview } from "@/components/team-preview";
import { ContactSection } from "@/components/contact-section";

/**
 * The homepage alternates impact and information rather than front-loading the
 * animation and then going quiet:
 *
 *   intro resolving into the hero   (pinned, scroll-driven)   IMPACT
 *   the residence told in numbers   (pinned, scroll-driven)   IMPACT
 *   the residence told in pictures  (editorial, sequenced)    INFORMATION
 *   1,303 m² — on white             (typographic interlude)   IMPACT
 *   selected properties             (editorial grid)          INFORMATION
 *   the five markets                (interactive)             INFORMATION
 *   architecture → lifestyle        (pinned, scroll-driven)   IMPACT
 *   search                          (configurator)            INFORMATION
 *   selling · investment                                     INFORMATION
 *   24 residences. 5 markets.       (bright photographic band)  IMPACT
 *   team · contact                                            INFORMATION
 *
 * Three moments are pinned and scroll-driven; everything between them is a
 * normal page you can read and click. That balance is deliberate — this sells
 * real estate, and the animation is there to make the properties feel expensive,
 * not to delay access to them.
 */
export default function HomePage() {
  return (
    <>
      <IntroHero />
      <FlagshipReveal />
      <FlagshipStory />
      <Interlude />
      <Curated />
      <LocationExplorer />
      <FeatureExplorer />
      <SearchTeaser />
      <Seller />
      <Investment />
      <PhotoBand />
      <TeamPreview />
      <ContactSection />
    </>
  );
}
