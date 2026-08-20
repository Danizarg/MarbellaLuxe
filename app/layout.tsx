import type { Metadata, Viewport } from "next";
import { Inter, Literata } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProposalLayer } from "@/components/proposal-layer";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Literata rather than a high-contrast display serif.
 *
 * The previous face (Instrument Serif) is narrow and high-contrast: at hero size
 * its hairlines read as thin and the line looks under-set against architectural
 * photography. Literata is wider, low-contrast and has substantial stems, so it
 * holds its weight at 90px over a photograph. The opsz axis is requested so the
 * display sizes can use the display optical size.
 */
const literata = Literata({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-literata",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marbellaluxe.es"),
  title: {
    default: `${site.name} — Luxury property in Marbella, Benahavís, Estepona & Sotogrande`,
    template: `%s — ${site.name}`,
  },
  description:
    "A curated portfolio of villas and residences on the Costa del Sol, presented property by property. Marbella, Benahavís, Estepona and Sotogrande.",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${literata.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        <ProposalLayer />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
