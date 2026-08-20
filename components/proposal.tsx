"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ComponentProps } from "react";

/**
 * Proposal mode is switched on with `?proposal=true` on any route.
 *
 * This deliberately reads `window.location` after mount rather than calling
 * `useSearchParams()`. `useSearchParams` opts the whole subtree out of static
 * prerendering unless every caller sits inside a Suspense boundary, and PLink is
 * used in the header, the footer and every property card - so that bailout would
 * cascade across the entire site. Reading the URL in an effect keeps all pages
 * static and costs one render of non-proposal hrefs before hydration, which is
 * invisible in normal mode and harmless in proposal mode.
 */
export function useIsProposal() {
  const pathname = usePathname();
  const [isProposal, setIsProposal] = useState(false);

  useEffect(() => {
    setIsProposal(new URLSearchParams(window.location.search).get("proposal") === "true");
  }, [pathname]);

  return isProposal;
}

/**
 * A Link that carries proposal mode with it, so the client can browse the whole
 * site from a single link without dropping back into normal mode.
 */
export function PLink({ href, ...rest }: ComponentProps<typeof Link>) {
  const isProposal = useIsProposal();
  const raw = typeof href === "string" ? href : "";

  let next = href;
  if (isProposal && raw && !raw.startsWith("http") && !raw.includes("proposal=")) {
    const [path, hash] = raw.split("#");
    const join = path.includes("?") ? "&" : "?";
    next = `${path}${join}proposal=true${hash ? `#${hash}` : ""}`;
  }

  return <Link href={next} {...rest} />;
}
