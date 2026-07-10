import { cn } from "@/lib/utils";

/**
 * Swifty Beats wordmark, drawn as inline SVG text (not a PNG) so "BEATS" keeps
 * its wide tracking and stays razor-sharp at every size — the nav renders it at
 * h-6, the preloader at h-20, both from the one vector. Sizes via a height class
 * (e.g. `h-6`); width follows the viewBox. `glow` adds the warm gold halo.
 *
 * ponytail: text-as-SVG, not an image — no logo.png request, no baked spacing.
 * `priority`/`sizes` are accepted for call-site compatibility and ignored.
 */
export function Logo({
  className,
  glow = false,
}: {
  className?: string;
  priority?: boolean;
  glow?: boolean;
  sizes?: string;
}) {
  return (
    <svg
      // viewBox is padded on X (-10..210) so the wide "SWIFTY" (which renders
      // ~-5..207) is never clipped by the SVG's default overflow:hidden.
      viewBox="-10 0 220 92"
      // Intrinsic size so it never balloons to full width before CSS applies
      // (dev FOUC / slow style load). Height classes override this once styled.
      width={220}
      height={92}
      role="img"
      aria-label="Swifty Beats"
      className={cn(
        "block h-8 w-auto text-primary",
        glow && "[filter:drop-shadow(0_0_36px_rgba(230,180,90,0.35))]",
        className,
      )}
      // In-var fallback keeps the declaration valid if --font-clash isn't loaded
      // yet, so it degrades to a sans fallback — never the browser serif.
      style={{ fontFamily: "var(--font-clash, ui-sans-serif), ui-sans-serif, system-ui, sans-serif" }}
    >
      <text
        x="100"
        y="50"
        textAnchor="middle"
        fontSize="52"
        fontWeight={700}
        letterSpacing="-1"
        fill="currentColor"
      >
        SWIFTY
      </text>
      <text
        x="100"
        y="82"
        textAnchor="middle"
        fontSize="16.5"
        fontWeight={500}
        letterSpacing="13"
        fill="currentColor"
        // The trailing letter-space pushes the visual centre right; nudge back.
        dx="6.5"
      >
        BEATS
      </text>
    </svg>
  );
}
