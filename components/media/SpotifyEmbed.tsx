"use client";

import { useEffect, useRef, useState } from "react";
import { spotify } from "@/lib/links";
import { cn } from "@/lib/utils";

/**
 * Styled, dark-theme Spotify embed for full-track listening (brief §7). The
 * heavy iframe is only injected once scrolled near the viewport, so it never
 * blocks first paint. Wrapped in glass so it never reads as a bare embed.
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
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const height = compact ? 152 : 352;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "250px" },
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
      {load ? (
        <iframe
          src={spotify.embed(type, id)}
          title={title}
          width="100%"
          height={height}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="rounded-xl"
          style={{ border: 0 }}
        />
      ) : (
        <div
          style={{ height }}
          className="grid place-items-center rounded-xl bg-elevated/60"
        >
          <span className="text-sm text-faint">Loading player</span>
        </div>
      )}
    </div>
  );
}
