import type { ReactNode } from "react";

/**
 * Shared section opening: gold eyebrow, display title, one or more paragraphs,
 * and an optional action aligned to the baseline of the last line.
 */
export function SectionHead({
  eyebrow,
  title,
  copy,
  action,
  light,
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: string | string[];
  action?: ReactNode;
  light?: boolean;
}) {
  const paragraphs = typeof copy === "string" ? [copy] : (copy ?? []);

  return (
    <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
      <div className="reveal max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="display mt-6 text-[clamp(2.25rem,5vw,4rem)]">{title}</h2>
        {paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className={`mt-7 max-w-[62ch] text-base leading-relaxed ${
              light ? "text-ink/60" : "text-mist"
            }`}
          >
            {paragraph}
          </p>
        ))}
      </div>
      {action ? <div className="reveal">{action}</div> : null}
    </div>
  );
}
