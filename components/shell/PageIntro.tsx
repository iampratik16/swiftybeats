import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";

/** Shared intro for the routes built out in later slices — on-brand, not lorem. */
export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mx-auto flex min-h-[72svh] max-w-4xl flex-col justify-center px-6 py-40">
      <p className="text-eyebrow uppercase text-gold">{eyebrow}</p>
      <h1 className="mt-6 text-display font-semibold">
        <SplitText text={title} />
      </h1>
      {description && (
        <Reveal className="mt-6 max-w-2xl text-lg text-muted" delay={0.08}>
          <p>{description}</p>
        </Reveal>
      )}
      {children && <div className="mt-10">{children}</div>}
    </section>
  );
}
