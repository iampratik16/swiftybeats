import { credentials } from "@/lib/content";

/**
 * Infinite wordmark band of real credentials (brief §6.1.6). Two identical
 * halves + a -50% translate = a seamless loop; edges masked with mask-x-fade.
 * Decorative here (facts also appear in the origin story), so aria-hidden.
 */
export function Marquee() {
  return (
    <section
      aria-hidden
      className="mask-x-fade overflow-hidden border-y border-white/5 bg-base py-7"
    >
      <div
        className="flex w-max animate-marquee will-change-transform"
        style={{ "--marquee-duration": "38s" } as React.CSSProperties}
      >
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {credentials.map((item, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center whitespace-nowrap font-display text-xl font-medium text-primary/70 md:text-3xl"
              >
                <span className="mx-8">{item}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-gold/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
