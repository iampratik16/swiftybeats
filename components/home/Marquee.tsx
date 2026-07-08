import { credentials } from "@/lib/content";
import { cn } from "@/lib/utils";

// Jewel dots cycle through the artwork palette between each credential.
const DOTS = ["bg-gold", "bg-vermilion", "bg-teal", "bg-rose"];

/**
 * Infinite wordmark band of real credentials (brief §6.1.6). Two identical
 * halves + a -50% translate = a seamless loop; edges masked with mask-x-fade.
 * Funk pass: bigger type, alternating solid / jewel-gradient words, jewel dots
 * cycling colour, and hover-to-pause. Decorative, so aria-hidden.
 */
export function Marquee() {
  return (
    <section
      aria-hidden
      className="group mask-x-fade overflow-hidden border-y border-gold/10 bg-raised py-8"
    >
      <div
        className="flex w-max animate-marquee will-change-transform [animation-play-state:running] group-hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": "34s" } as React.CSSProperties}
      >
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {credentials.map((item, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center whitespace-nowrap font-display text-2xl font-semibold md:text-4xl"
              >
                <span className={cn("mx-8", i % 2 === 0 ? "text-primary/85" : "text-jewel")}>
                  {item}
                </span>
                <span className={cn("h-2 w-2 rounded-full", DOTS[i % DOTS.length])} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
