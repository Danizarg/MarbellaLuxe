import { consultants, initials, leadership } from "@/lib/team";
import { site } from "@/lib/site";
import { PLink } from "./proposal";
import { SectionHead } from "./section-head";

/**
 * The live site publishes no portraits, so this renders monogram plates instead
 * of stock faces. When the agency supplies headshots the plate is the frame they
 * drop into — see CLAUDE_CONTEXT.md -> "Known Issues".
 */
export function TeamPreview() {
  return (
    <section id="team" className="border-t border-[var(--color-ink-hairline)] py-24 md:py-36">
      <div className="shell">
        <SectionHead
          eyebrow="The team"
          title="Nine languages, one office."
          copy={`Two brokers and eight consultants working across ${site.languages.length} languages, with more than ${site.experienceYears} years on this coast between them.`}
          action={
            <PLink
              href="/team"
              className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-bone transition-colors hover:text-gold"
            >
              <span className="h-px w-8 bg-gold" />
              Meet everyone
            </PLink>
          }
        />

        <div className="mt-16 grid gap-px border border-[var(--color-ink-hairline)] bg-[var(--color-ink-hairline)] sm:grid-cols-2 lg:grid-cols-5">
          {[...leadership, ...consultants.slice(0, 3)].map((member) => (
            <article
              key={member.name}
              className="reveal flex flex-col bg-ink p-7"
            >
              <span
                aria-hidden
                className={[
                  "display grid h-14 w-14 place-items-center border text-xl",
                  member.lead ? "border-gold text-gold" : "border-[var(--color-ink-hairline)] text-mist-dim",
                ].join(" ")}
              >
                {initials(member.name)}
              </span>
              <h3 className="mt-7 text-base text-bone">{member.name}</h3>
              <p className="mt-1.5 text-xs uppercase tracking-[0.15em] text-mist-dim">
                {member.role}
              </p>
              {member.languages.length ? (
                <p className="mt-4 text-xs leading-relaxed text-mist">
                  {member.languages.join(" · ")}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
