import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Waveband } from "@/components/ui/Waveband";

type CTA = { label: string; href: string; cursorLabel?: string; ariaLabel?: string };

/**
 * Shared centred "coming soon" hero (Press, Shows). Visual-first, minimal copy,
 * one clear action — keeps holding pages premium and consistent.
 */
export function ComingSoon({
  eyebrow,
  title = "Coming soon.",
  description,
  primary,
  footnote,
}: {
  eyebrow: string;
  title?: string;
  description: string;
  primary?: CTA;
  footnote?: React.ReactNode;
}) {
  // Jewel-accent the last word of the title (the funk signature, site-wide).
  const words = title.split(" ");
  const tail = words.pop() ?? "";
  const head = words.join(" ");
  return (
    <div className="mx-auto flex min-h-[72vh] max-w-3xl flex-col items-center justify-center px-6 pb-28 pt-40 text-center md:pt-48">
      <div className="flex items-center gap-3">
        <p className="text-eyebrow uppercase text-gold">{eyebrow}</p>
        <Waveband className="h-4" />
      </div>
      <h1 className="mt-6 text-hero font-semibold leading-[0.9]">
        {head && <SplitText text={head} immediate />}
        {head && " "}
        <SplitText text={tail} immediate className="accent font-normal text-jewel" />
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted">{description}</p>
      {primary && (
        <div className="mt-9">
          <MagneticButton
            href={primary.href}
            cursorLabel={primary.cursorLabel}
            ariaLabel={primary.ariaLabel}
          >
            {primary.label}
          </MagneticButton>
        </div>
      )}
      {footnote && <div className="mt-5 text-sm text-muted">{footnote}</div>}
    </div>
  );
}
