import Image from "next/image";
import { imageSrc } from "@/lib/properties";
import { PLink } from "./proposal";

/**
 * The one light section on the site.
 *
 * Sellers are a different audience arriving with a different question, and the
 * change of ground signals that without a word. The four services below are the
 * agency's own, expanded from the summaries published on the live site.
 */

const services = [
  {
    n: "01",
    title: "A valuation built on evidence",
    body: "Not a portal estimate, and not what your neighbour was asking three years ago. We assemble the transactions that have actually completed nearby in the last twelve months, adjust for orientation, plot, condition and community, and give you a written figure with the comparables attached. If the number you had in mind is achievable we will say so; if it will cost you a year on the market, we will say that instead.",
  },
  {
    n: "02",
    title: "Marketing matched to the price bracket",
    body: "A €4M villa marketed like a €400,000 apartment sells like one. Professional photography shot at the right hour, measured floor plans, drone footage where the plot justifies it, and placement on the portals that matter for your buyer rather than on all of them indiscriminately. Presentation is the largest controllable variable in how long a property sits.",
  },
  {
    n: "03",
    title: "A process you stay inside",
    body: "One consultant, in your language, from valuation through to notary. You are told what is happening at each stage rather than briefed after it — every viewing reported back with the feedback attached, every offer put to you alongside our view of the buyer's position and their ability to complete. Nothing is negotiated on your behalf without your instruction.",
  },
  {
    n: "04",
    title: "An international buyer list",
    body: "Nine languages across the team and the CENTURY 21 network behind it, which matters because most of our buyers do not live in Spain yet. We also work a private list of registered buyers who see suitable properties before they are published — and for owners who would rather not advertise at all, that route is available on its own.",
  },
];

export function Seller() {
  return (
    <section id="sell" className="bg-bone text-ink">
      <div className="shell grid gap-14 py-24 md:py-32 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="reveal">
            <p className="eyebrow" style={{ color: "#8a7c58" }}>
              Selling or letting
            </p>
            <h2 className="display mt-6 text-[clamp(2.25rem,5vw,3.75rem)]">
              What is your property actually worth?
            </h2>
            <p className="mt-7 max-w-[58ch] text-base leading-relaxed text-ink/60">
              Asking prices on this coast routinely sit ten to twenty per cent above what
              eventually completes, so a valuation built on what is currently listed simply repeats
              that error back to you.
            </p>
            <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-ink/60">
              We would rather start from evidence. The valuation is free, takes three to five days,
              and carries no obligation to instruct us afterwards.
            </p>

            <PLink
              href="/services/valuation"
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
            <li key={service.n} className="reveal border-t border-ink/12 py-8 md:py-10">
              <div className="flex gap-6 md:gap-10">
                <span className="numeric pt-1 text-xs tracking-[0.2em] text-ink/35">
                  {service.n}
                </span>
                <div>
                  <h3 className="display text-2xl md:text-[1.875rem]">{service.title}</h3>
                  <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-ink/60">
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
