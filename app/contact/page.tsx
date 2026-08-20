import type { Metadata } from "next";
import { ContactSection } from "@/components/contact-section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Arrange a viewing or request a valuation. ${site.address.line1}, ${site.address.line2}.`,
};

type Props = { searchParams: Promise<{ ref?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { ref } = await searchParams;

  return (
    <>
      <header className="shell pb-4 pt-36 md:pt-48">
        <p className="rise eyebrow">Contact</p>
        <h1 className="rise display mt-6 max-w-[16ch] text-[clamp(2.5rem,7vw,5.5rem)]">
          Start with a conversation.
        </h1>
      </header>

      <ContactSection defaultRef={ref} />
    </>
  );
}
