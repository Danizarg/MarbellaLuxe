import { footerNav, site } from "@/lib/site";
import { PLink } from "./proposal";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-ink-hairline)] bg-ink">
      <div className="shell grid gap-14 py-20 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-baseline gap-2.5">
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-bone">
              Century 21
            </span>
            <span className="display text-xl leading-none text-gold">Luxe</span>
          </div>
          <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-mist">
            {site.tagline}. We sell, let, value and renovate property across Marbella, Benahavís,
            Estepona, Sotogrande and Mijas, with more than {site.experienceYears} years on the
            coast and a team working in {site.languages.length} languages.
          </p>

          <address className="mt-8 not-italic text-xs leading-relaxed tracking-wide text-mist-dim">
            {site.address.line1}
            <br />
            {site.address.line2}
            <br />
            {site.address.region}
          </address>

          <ul className="mt-8 space-y-2 text-sm">
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

        {footerNav.map((group) => (
          <nav key={group.heading} className="lg:col-span-2" aria-label={group.heading}>
            <h2 className="eyebrow">{group.heading}</h2>
            <ul className="mt-6 space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <PLink
                    href={link.href}
                    className="text-sm text-mist transition-colors hover:text-bone"
                  >
                    {link.label}
                  </PLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="lg:col-span-2">
          <h2 className="eyebrow">Languages</h2>
          <ul className="mt-6 space-y-2">
            {site.languages.map((language) => (
              <li key={language} className="text-sm text-mist">
                {language}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell flex flex-col gap-3 border-t border-[var(--color-ink-hairline)] py-8 text-xs text-mist-dim md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name} Marbella. Each office is independently owned
          and operated.
        </p>
        <p className="max-w-[62ch]">
          Prices, references and measurements as published by the agency. Subject to change,
          availability and prior sale.
        </p>
      </div>
    </footer>
  );
}
