import type { Metadata } from "next";
import Image from "next/image";
import { services } from "@/lib/services";
import { imageSrc } from "@/lib/properties";
import { ContactSection } from "@/components/contact-section";
import { PLink } from "@/components/proposal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Valuation, renovation management, architectural design, buying agency and development advisory across Marbella, Benahavís, Estepona, Sotogrande and Mijas.",
};

export default function ServicesPage() {
  return (
    <>
      <header className="shell pb-14 pt-36 md:pb-16 md:pt-48">
        <p className="rise eyebrow">Services</p>
        <h1 className="rise display mt-6 max-w-[20ch] text-[clamp(2.5rem,7vw,5rem)]">
          The transaction is the easy part.
        </h1>
        <p className="rise mt-8 max-w-[64ch] text-base leading-relaxed text-mist">
          Buying or selling a property here takes a few months. Valuing it correctly, renovating it
          from another country, getting a licence through the right town hall, or working out what
          a plot will actually carry — that is where the money is made or lost, and it is where most
          agencies hand you a phone number and step back.
        </p>
        <p className="rise mt-5 max-w-[64ch] text-base leading-relaxed text-mist">
          We keep these disciplines in-house, which is why the advice you get before you bid is the
          same advice you get after you have bought.
        </p>
      </header>

      <section className="shell pb-20 md:pb-28">
        <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {services.map((service, i) => (
            <li key={service.slug} className="reveal">
              <PLink href={`/services/${service.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden bg-ink-raised">
                  <Image
                    src={imageSrc(service.imageRef, service.imageIndex)}
                    alt=""
                    fill
                    priority={i < 2}
                    sizes="(max-width: 768px) 92vw, 45vw"
                    className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.05]"
                    style={{ transitionTimingFunction: "var(--ease-luxe)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                </div>

                <h2 className="display mt-6 text-2xl md:text-[1.875rem]">{service.title}</h2>
                <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-mist">
                  {service.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-mist transition-colors group-hover:text-gold">
                  <span className="h-px w-8 bg-gold" />
                  Read more
                </span>
              </PLink>
            </li>
          ))}
        </ul>
      </section>

      <ContactSection />
    </>
  );
}
