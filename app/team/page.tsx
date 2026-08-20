import type { Metadata } from "next";
import { consultants, initials, leadership } from "@/lib/team";
import { site } from "@/lib/site";
import { ContactSection } from "@/components/contact-section";

export const metadata: Metadata = {
  title: "The team",
  description:
    "Two brokers and eight sales consultants working across nine languages from El Paraíso, Estepona.",
};

export default function TeamPage() {
  return (
    <>
      <header className="shell pb-16 pt-36 md:pt-48">
        <p className="rise eyebrow">The team</p>
        <h1 className="rise display mt-6 max-w-[16ch] text-[clamp(2.5rem,7vw,5.5rem)]">
          Whoever picks up speaks your language.
        </h1>
        <p className="rise measure mt-8 text-base leading-relaxed text-mist">
          {site.languages.join(", ")} — across ten people in one office on the New Golden Mile.
          Most of our clients are buying in a country they do not live in; that is the problem this
          team was assembled to solve.
        </p>
      </header>

      <section className="shell pb-8">
        <h2 className="reveal eyebrow">Leadership</h2>
        <div className="mt-8 grid gap-px border border-[var(--color-ink-hairline)] bg-[var(--color-ink-hairline)] sm:grid-cols-2">
          {leadership.map((member) => (
            <article key={member.name} className="reveal bg-ink p-10">
              <span
                aria-hidden
                className="display grid h-16 w-16 place-items-center border border-gold text-2xl text-gold"
              >
                {initials(member.name)}
              </span>
              <h3 className="display mt-8 text-3xl">{member.name}</h3>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-mist-dim">
                {member.role}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="shell pb-20 pt-12 md:pb-28">
        <h2 className="reveal eyebrow">Sales consultants</h2>
        <div className="mt-8 grid gap-px border border-[var(--color-ink-hairline)] bg-[var(--color-ink-hairline)] sm:grid-cols-2 lg:grid-cols-4">
          {consultants.map((member) => (
            <article
              key={member.name}
              className="reveal flex flex-col bg-ink p-8"
            >
              <span
                aria-hidden
                className="display grid h-14 w-14 place-items-center border border-[var(--color-ink-hairline)] text-xl text-mist-dim"
              >
                {initials(member.name)}
              </span>
              <h3 className="mt-7 text-base text-bone">{member.name}</h3>
              <p className="mt-1.5 text-xs uppercase tracking-[0.15em] text-mist-dim">
                {member.role}
              </p>
              <p className="mt-4 text-xs leading-relaxed text-mist">
                {member.languages.join(" · ")}
              </p>
              {member.profile ? (
                <p className="mt-auto pt-6 text-xs text-mist-dim">{member.profile}</p>
              ) : null}
            </article>
          ))}
        </div>

        <p className="reveal mt-10 text-xs leading-relaxed text-mist-dim">
          Portraits are not published on the current site. Monogram plates stand in until the
          agency supplies headshots — the layout is built to take them without change.
        </p>
      </section>

      <ContactSection />
    </>
  );
}
