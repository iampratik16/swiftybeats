import { cn } from "@/lib/utils";

/**
 * Hero eyebrow — a single clean genre label in mono, sitting above the wordmark.
 */
export function TrackSpec({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "font-mono text-xs uppercase tracking-widest text-primary",
        className,
      )}
    >
      Asian House Producer
    </div>
  );
}
