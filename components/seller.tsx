import Image from "next/image";
import { imageSrc } from "@/lib/properties";
import { PLink } from "./proposal";

/**
 * The one light section on the site.
 *
 * Sellers are a different audience arriving with a different question, and the
 * change of ground signals that without a word. The four services below are the
 * agency's own, transcribed from the live site.
 */

const services = [
  {
    n: "01",
    title: "Professional valuation",
    body: "A documented, no-obligation valuation of your property, benchmarked against what is actually transacting in your street — not what is being asked for it.",
  },
  {
    n: "02",
    title: "Marketing that matches the asset",
    body: "Photography, presentation and placement built for the price bracket. A €4M villa marketed like a €400k apartment sells like one.",
  },
  {
    n: "03",
    title: "A process you stay inside",
    body: "You are involved at each stage rather than briefed after it. One consultant, in your language, from valuation through to notary.",
  },
  {
    n: "04",
    title: "An international buyer list",
    body: "Nine languages across the team and a CENTURY 21 network behind it. Most of our buyers do not live here yet.",
  },
];

export function Seller() {
  return (
    <section id="sell" className="bg-bone text-ink">
      <div className="shell grid gap-14 py-24 md:py-36 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="reveal">
            <p className="eyebrow" style={{ color: "#8a7c58" }}>
              Selling or letting
            </p>
            <h2 className="display mt-6 text-[clamp(2.25rem,5vw,4rem)]">
              What is your property actually worth?
            </h2>
            <p className="measure mt-7 text-base leading-relaxed text-ink/60">
              Not the number a portal generates from square metres. The number a buyer with
              financing in place will sign for, this quarter, in this street.
            </p>

            <PLink
              href="/contact?intent=valuation"
              className="mt-10 inline-block bg-ink px-8 py-4 text-[0.75rem] uppercase tracking-[0.18em] text-bone transition-colors duration-500 hover:bg-[#8a7c58]"
            >
              Request a valuation
            </PLink>
          </div>

          <div className="reveal relative mt-14 hidden aspect-[4/3] overflow-hidden lg:block">
            <Image
              src={imageSrc("R5463289", 2)}
              alt="A villa in Elviria, Marbella East"
              fill
              sizes="40vw"
              className="object-cover"
            />
          </div>
        </div>

        <ul className="lg:col-span-7">
          {services.map((service) => (
            <li
              key={service.n}
              className="reveal border-t border-ink/12 py-8 md:py-10"
            >
              <div className="flex gap-6 md:gap-10">
                <span className="numeric pt-1 text-xs tracking-[0.2em] text-ink/35">
                  {service.n}
                </span>
                <div>
                  <h3 className="display text-2xl md:text-[1.875rem]">{service.title}</h3>
                  <p className="measure mt-3 text-sm leading-relaxed text-ink/60">
                    {service.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
