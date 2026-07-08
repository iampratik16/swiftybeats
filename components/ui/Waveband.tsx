import { cn } from "@/lib/utils";

// Fixed bar heights (percent) so SSR and client match — no hydration drift.
const BARS = [40, 70, 52, 88, 46, 64, 96, 58, 44, 76, 50, 68];

/**
 * Compact "now playing" waveform — a row of gold bars breathing on staggered
 * beats. Pure CSS (see .waveband in globals). Decorative, so aria-hidden.
 * The colourful hero version is bespoke; this is the reusable mono accent.
 */
export function Waveband({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("waveband h-5", className)}>
      {BARS.map((h, i) => (
        <span
          key={i}
          style={{
            ["--h" as string]: `${h}%`,
            ["--d" as string]: `${720 + ((i * 61) % 480)}ms`,
            ["--delay" as string]: `${(i * 53) % 560}ms`,
          }}
        />
      ))}
    </span>
  );
}
