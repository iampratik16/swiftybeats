"use client";

import { useState } from "react";
import { SmartImage } from "@/components/media/SmartImage";
import { spotify } from "@/lib/links";
import { cn } from "@/lib/utils";

let warmed = false;
function warmConnections() {
  if (warmed || typeof document === "undefined") return;
  warmed = true;
  for (const href of ["https://open.spotify.com", "https://open.spotifycdn.com", "https://i.scdn.co"]) {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = href;
    link.crossOrigin = "";
    document.head.appendChild(link);
  }
}

/**
 * Lite Spotify embed. Ships an instant card (cover + title + play), NOT the
 * heavy Spotify iframe — that only loads when the visitor taps play, so the box
 * appears immediately even on slow mobile data. Preconnect fires on hover so the
 * real player is warm by the time it is requested. Mirrors YouTubeFacade.
 */
export function SpotifyFacade({
  type,
  id,
  title,
  cover,
  heading,
  sub,
  compact = false,
  bare = false,
  className,
}: {
  type: "track" | "album" | "artist" | "playlist";
  id: string;
  title: string;
  cover: string;
  heading: string;
  sub: string;
  compact?: boolean;
  bare?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(false);
  const height = compact ? 152 : 352;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl p-1.5",
        bare ? "rounded-[inherit]" : "glass",
        className,
      )}
      onPointerEnter={warmConnections}
      onFocus={warmConnections}
    >
      {active ? (
        <iframe
          src={`${spotify.embed(type, id)}&autoplay=1`}
          title={title}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="block w-full rounded-xl"
          style={{ border: 0, height }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Play ${heading} on Spotify`}
          className="group relative flex w-full items-center gap-4 rounded-xl bg-elevated/80 p-5 text-left sm:gap-5"
          style={{ height }}
        >
          <div className="relative aspect-square h-full max-h-40 shrink-0 overflow-hidden rounded-lg shadow-lg">
            <SmartImage src={cover} alt="" fill sizes="160px" className="object-cover" />
          </div>

          <div className="min-w-0 flex-1">
            <SpotifyMark className="mb-3 h-6 w-6 text-[#1DB954]" />
            <p className="truncate font-display text-2xl font-semibold text-primary">{heading}</p>
            <p className="mt-1 text-sm text-muted">{sub}</p>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1DB954] px-4 py-2 text-sm font-medium text-black transition group-hover:scale-[1.03]">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
              Play on Spotify
            </span>
          </div>
        </button>
      )}
    </div>
  );
}

function SpotifyMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.586 14.424a.622.622 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.622.622 0 11-.277-1.213c3.809-.871 7.077-.496 9.712 1.114a.623.623 0 01.207.856zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 11-.452-1.492c3.632-1.102 8.147-.568 11.234 1.329a.78.78 0 01.255 1.072zm.105-2.835c-3.223-1.914-8.54-2.09-11.618-1.156a.935.935 0 11-.542-1.79c3.532-1.072 9.404-.865 13.115 1.338a.936.936 0 01-.955 1.608z" />
    </svg>
  );
}
