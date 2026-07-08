import { spotify } from "@/lib/links";
import { cn } from "@/lib/utils";

/**
 * Styled Spotify embed for full-track listening (brief §7).
 *
 * The iframe is rendered in the INITIAL HTML (server component, no JS gate), so
 * the browser starts fetching it via native lazy-loading at the right moment —
 * it never waits on the heavy bundle to hydrate first (which stacked hydration
 * time on top of Spotify's fetch and made the box slow to appear). A dark
 * skeleton sits behind it: space is reserved (no layout shift) and the "Loading"
 * state shows until Spotify's player paints over it.
 */
export function SpotifyEmbed({
  type,
  id,
  title,
  compact = false,
  bare = false,
  className,
}: {
  type: "track" | "album" | "artist" | "playlist";
  id: string;
  title: string;
  compact?: boolean;
  /** Drop the glass frame — for nesting inside another framed container (BorderGlow) */
  bare?: boolean;
  className?: string;
}) {
  const height = compact ? 152 : 352;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl p-1.5",
        bare ? "rounded-[inherit]" : "glass",
        className,
      )}
    >
      <div className="relative rounded-xl bg-elevated/70" style={{ height }}>
        {/* Skeleton behind the iframe — visible only until Spotify's UI paints */}
        <div className="absolute inset-0 grid place-items-center">
          <span className="animate-pulse text-sm text-faint">Loading player…</span>
        </div>
        <iframe
          src={spotify.embed(type, id)}
          title={title}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="absolute inset-0 h-full w-full rounded-xl"
          style={{ border: 0 }}
        />
      </div>
    </div>
  );
}
