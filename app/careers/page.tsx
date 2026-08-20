import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ContactSection } from "@/components/contact-section";

export const metadata: Metadata = {
  title: "Careers & internships",
  description:
    "Sales consultant positions and structured student internships with CENTURY 21 Luxe Marbella, on the New Golden Mile between Marbella and Estepona.",
};

const openings = [
  {
    title: "Sales consultant",
    type: "Full time · El Paraíso, Estepona",
    body: "We take on consultants who already speak at least two of our working languages fluently and who intend to build a career here rather than spend a season. You will be given a market, full CENTURY 21 training, and access to the same listings and tools as everyone else in the office. Commission structure is discussed openly at first interview.",
    looking: [
      "Fluency in at least two of our working languages",
      "Legal right to work in Spain",
      "A driving licence and your own vehicle",
      "Previous sales experience useful, real estate experience not essential",
    ],
  },
  {
    title: "Student internship",
    type: "3 – 6 months · El Paraíso, Estepona",
    body: "A structured placement for students of real estate, business or hospitality, run in cooperation with the university or college rather than around it. Interns rotate through listing preparation, viewings, market research and the back office, and finish with a documented portfolio of the work they contributed to.",
    looking: [
      "Enrolled on a relevant course with a placement agreement",
      "Working English, plus one other language",
      "Available for a minimum of three months",
      "Genuine interest in the market rather than in the coast",
    ],
  },
];

export default function CareersPage() {
  return (
    <>
      <header className="shell pb-14 pt-36 md:pb-16 md:pt-48">
        <p className="rise eyebrow">Careers &amp; internships</p>
        <h1 className="rise display mt-6 max-w-[20ch] text-[clamp(2.5rem,7vw,5rem)]">
          Come and work on the coast.
        </h1>
        <p className="rise mt-8 max-w-[64ch] text-base leading-relaxed text-mist">
          This is a small office with an unusually international make-up — {site.languages.length}{" "}
          languages across ten people — and we hire for language and temperament before we hire for
          experience. Real estate can be taught. Being the person a nervous foreign buyer trusts
          with two million euros cannot.
        </p>
        <p className="rise mt-5 max-w-[64ch] text-base leading-relaxed text-mist">
          We also run a proper student internship rather than an unpaid summer of photocopying, in
          cooperation with the colleges that send us candidates.
        </p>
      </header>

      <section className="shell pb-20 md:pb-28">
        <ul className="grid gap-px border border-[var(--color-ink-hairline)] bg-[var(--color-ink-hairline)] lg:grid-cols-2">
          {openings.map((opening) => (
            <li key={opening.title} className="reveal bg-ink p-8 md:p-12">
              <p className="eyebrow">{opening.type}</p>
              <h2 className="display mt-5 text-[clamp(1.75rem,3.2vw,2.5rem)]">{opening.title}</h2>
              <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-mist">
                {opening.body}
              </p>

              <h3 className="mt-10 text-[0.65rem] uppercase tracking-[0.2em] text-mist-dim">
                What we look for
              </h3>
              <ul className="mt-5">
                {opening.looking.map((item) => (
                  <li
                    key={item}
                    className="border-t border-[var(--color-ink-hairline)] py-3.5 text-sm text-mist"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(
                  `Application — ${opening.title}`,
                )}`}
                className="mt-10 inline-block border border-[var(--rule)] px-7 py-3.5 text-[0.72rem] uppercase tracking-[0.18em] text-bone transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-ink"
              >
                Apply by email
              </a>
            </li>
          ))}
        </ul>

        <p className="reveal mt-10 max-w-[64ch] text-sm leading-relaxed text-mist-dim">
          Speculative applications are welcome even when nothing is advertised — send a CV and a
          paragraph on why this coast rather than another one to{" "}
          <a
            href={`mailto:${site.email}`}
            className="underline decoration-[var(--rule)] underline-offset-4 transition-colors hover:text-mist"
          >
            {site.email}
          </a>
          .
        </p>
      </section>

      <ContactSection />
    </>
  );
}
