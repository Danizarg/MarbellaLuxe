import type { ReactNode } from "react";

/** Shared section opening: gold eyebrow, display title, one paragraph, optional action. */
export function SectionHead({
  eyebrow,
  title,
  copy,
  action,
  light,
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: string;
  action?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
      <div className="reveal max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="display mt-6 text-[clamp(2.25rem,5.5vw,4.5rem)]">{title}</h2>
        {copy ? (
          <p
            className={`measure mt-7 text-base leading-relaxed ${
              light ? "text-ink/60" : "text-mist"
            }`}
          >
            {copy}
          </p>
        ) : null}
      </div>
      {action ? <div className="reveal">{action}</div> : null}
    </div>
  );
}
