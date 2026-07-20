"use client";

import { useEffect, useRef, useState } from "react";
import { spotify } from "@/lib/links";
import { cn } from "@/lib/utils";

/**
 * Styled Spotify embed for full-track listening (brief §7).
 *
 * The iframe is Spotify's own Next.js app (~16 requests + its bundle), so it is
 * NOT mounted until the player scrolls near the viewport — it never competes
 * with the hero on first load. A dark skeleton reserves the space (no layout
 * shift) and shows "Loading" until Spotify's UI paints over it.
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
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  // Mount the iframe only when it's within 300px of the viewport — keeps
  // Spotify's whole app out of the initial page load on tall pages like Home.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
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
        {show && (
          <iframe
            src={spotify.embed(type, id)}
            title={title}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="absolute inset-0 h-full w-full rounded-xl"
            style={{ border: 0 }}
          />
        )}
      </div>
    </div>
  );
}
