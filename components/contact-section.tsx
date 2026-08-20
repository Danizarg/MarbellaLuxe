"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { site } from "@/lib/site";
import { properties } from "@/lib/properties";

/**
 * There is no backend in this build, and pretending otherwise would be the wrong
 * kind of demo. Submitting composes a fully populated email to the agency's real
 * address instead - which works today, on any device, with nothing to host.
 *
 * Wiring this to a form service later means replacing `onSubmit` and nothing else.
 */

const intents = [
  { id: "viewing", label: "Arrange a viewing" },
  { id: "valuation", label: "Value my property" },
  { id: "investment", label: "Investment enquiry" },
  { id: "other", label: "Something else" },
] as const;

function ContactForm({ defaultRef }: { defaultRef?: string }) {
  const params = useSearchParams();
  const initial = intents.find((i) => i.id === params.get("intent"))?.id ?? "viewing";

  const [intent, setIntent] = useState<string>(initial);
  const [reference, setReference] = useState(defaultRef ?? "");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const label = intents.find((i) => i.id === intent)?.label ?? "Enquiry";

    const body = [
      `Enquiry type: ${label}`,
      reference ? `Property reference: ${reference}` : null,
      "",
      `Name: ${data.get("name") ?? ""}`,
      `Email: ${data.get("email") ?? ""}`,
      `Phone: ${data.get("phone") ?? ""}`,
      "",
      String(data.get("message") ?? ""),
    ]
      .filter((line) => line !== null)
      .join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `${label}${reference ? ` — ${reference}` : ""}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={onSubmit} className="reveal">
      <fieldset>
        <legend className="eyebrow">What can we help with?</legend>
        <div className="mt-5 flex flex-wrap gap-2">
          {intents.map((option) => {
            const isActive = option.id === intent;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setIntent(option.id)}
                aria-pressed={isActive}
                className={[
                  "border px-4 py-2.5 text-xs tracking-wide transition-colors duration-500",
                  isActive
                    ? "border-gold bg-gold text-ink"
                    : "border-[var(--color-ink-hairline)] text-mist hover:border-mist-dim hover:text-bone",
                ].join(" ")}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Field name="name" label="Name" autoComplete="name" required />
        <Field name="email" label="Email" type="email" autoComplete="email" required />
        <Field name="phone" label="Phone" type="tel" autoComplete="tel" />
        <label className="block">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-mist-dim">
            Property reference
          </span>
          <select
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className="mt-3 w-full appearance-none border-b border-[var(--color-ink-hairline)] bg-transparent py-3 text-base text-bone transition-colors focus:border-gold focus:outline-none"
          >
            <option value="" className="bg-ink">
              No specific property
            </option>
            {properties.map((property) => (
              <option key={property.ref} value={property.ref} className="bg-ink">
                {property.ref} — {property.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-8 block">
        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-mist-dim">Message</span>
        <textarea
          name="message"
          rows={4}
          className="mt-3 w-full resize-none border-b border-[var(--color-ink-hairline)] bg-transparent py-3 text-base text-bone transition-colors focus:border-gold focus:outline-none"
          placeholder="Timing, budget, what you are looking for."
        />
      </label>

      <button
        type="submit"
        className="mt-10 bg-bone px-8 py-4 text-[0.75rem] uppercase tracking-[0.18em] text-ink transition-colors duration-500 hover:bg-gold"
      >
        Send enquiry
      </button>

      <p className="measure mt-5 text-xs leading-relaxed text-mist-dim">
        This opens a pre-filled message in your email client addressed to {site.email}. Nothing is
        stored or transmitted by this website.
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  ...rest
}: { name: string; label: string; type?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-[0.65rem] uppercase tracking-[0.2em] text-mist-dim">{label}</span>
      <input
        name={name}
        type={type}
        {...rest}
        className="mt-3 w-full border-b border-[var(--color-ink-hairline)] bg-transparent py-3 text-base text-bone transition-colors focus:border-gold focus:outline-none"
      />
    </label>
  );
}

export function ContactSection({ defaultRef }: { defaultRef?: string }) {
  return (
    <section id="contact" className="border-t border-[var(--color-ink-hairline)] py-24 md:py-36">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="reveal">
            <p className="eyebrow">Contact</p>
            <h2 className="display mt-6 text-[clamp(2.25rem,5vw,4rem)]">
              Come and see it in person.
            </h2>
            <p className="measure mt-7 text-base leading-relaxed text-mist">
              Photographs settle very little at this level. Tell us roughly what you are after and
              we will put together a short list worth flying for.
            </p>
          </div>

          <dl className="reveal mt-14 space-y-8">
            <Detail label="Office">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.region}
            </Detail>
            <Detail label="Telephone">
              <a href={`tel:${site.phoneHref}`} className="numeric transition-colors hover:text-gold">
                {site.phone}
              </a>
            </Detail>
            <Detail label="Email">
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold">
                {site.email}
              </a>
            </Detail>
            <Detail label="Languages">{site.languages.join(" · ")}</Detail>
          </dl>
        </div>

        <div className="lg:col-span-7">
          <Suspense fallback={null}>
            <ContactForm defaultRef={defaultRef} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-mist-dim">{label}</dt>
      <dd className="mt-3 text-sm leading-relaxed text-mist">{children}</dd>
    </div>
  );
}
