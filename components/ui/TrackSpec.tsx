import { cn } from "@/lib/utils";

/**
 * Hero tagline as a producer's DAW-style track readout: a live REC dot, then
 * BPM / key / genre in mono — reads like a session header, not a marketing
 * badge. The tempo/key are signature-plausible for Asian House; treat them as
 * brand flavour and swap for his real defaults if wanted.
 */
export function TrackSpec({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-wide text-muted",
        className,
      )}
    >
      <span className="flex items-center gap-1.5 font-medium text-vermilion">
        <span className="animate-beat h-2 w-2 rounded-full bg-vermilion" aria-hidden />
        REC
      </span>
      <span className="text-faint" aria-hidden>
        /
      </span>
      <span>
        <span className="text-gold">128</span> BPM
      </span>
      <span className="text-faint" aria-hidden>
        &middot;
      </span>
      <span className="text-gold">A&nbsp;min</span>
      <span className="text-faint" aria-hidden>
        &middot;
      </span>
      <span className="uppercase tracking-widest text-primary">Asian House Production</span>
    </div>
  );
}
