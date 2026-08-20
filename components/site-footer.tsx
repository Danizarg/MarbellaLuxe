import { nav, site } from "@/lib/site";
import { locations } from "@/lib/locations";
import { PLink } from "./proposal";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-ink-hairline)] bg-ink">
      <div className="shell grid gap-14 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <div className="flex items-baseline gap-2.5">
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-bone">
              Century 21
            </span>
            <span className="display text-xl leading-none text-gold">Luxe</span>
          </div>
          <p className="measure mt-6 text-sm leading-relaxed text-mist">
            {site.tagline}. Marbella, Benahavís, Estepona and Sotogrande — with more than{" "}
            {site.experienceYears} years on the coast and a team that works in{" "}
            {site.languages.length} languages.
          </p>
          <p className="mt-8 text-xs leading-relaxed tracking-wide text-mist-dim">
            {site.address.line1}
            <br />
            {site.address.line2}
            <br />
            {site.address.region}
          </p>
        </div>

        <nav className="md:col-span-3" aria-label="Footer">
          <h2 className="eyebrow">Explore</h2>
          <ul className="mt-6 space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <PLink
                  href={item.href}
                  className="text-sm text-mist transition-colors hover:text-bone"
                >
                  {item.label}
                </PLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <h2 className="eyebrow">Markets</h2>
          <ul className="mt-6 space-y-3">
            {locations.map((l) => (
              <li key={l.region} className="text-sm text-mist">
                {l.region}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="eyebrow">Contact</h2>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a
                href={`tel:${site.phoneHref}`}
                className="numeric text-mist transition-colors hover:text-bone"
              >
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="break-all text-mist transition-colors hover:text-bone"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.officialSite}
                className="text-mist transition-colors hover:text-bone"
                rel="noreferrer"
                target="_blank"
              >
                luxe.century21.es
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="shell flex flex-col gap-3 border-t border-[var(--color-ink-hairline)] py-8 text-xs text-mist-dim md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name} Marbella. Each office is independently owned
          and operated.
        </p>
        <p>
          Prices, references and measurements as published by the agency. Subject to change and
          availability.
        </p>
      </div>
    </footer>
  );
}
