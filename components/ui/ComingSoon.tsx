import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";

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
  return (
    <div className="mx-auto flex min-h-[72vh] max-w-3xl flex-col items-center justify-center px-6 pb-28 pt-40 text-center md:pt-48">
      <p className="text-eyebrow uppercase text-gold">{eyebrow}</p>
      <h1 className="mt-6 text-hero font-semibold leading-[0.9]">
        <SplitText text={title} immediate />
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
