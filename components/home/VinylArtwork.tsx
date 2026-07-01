"use client";

import { useEffect, useRef, useState } from "react";
import { SmartImage } from "@/components/media/SmartImage";
import { useAudio } from "@/components/providers/AudioProvider";
import { cn } from "@/lib/utils";

/**
 * Vinyl artwork card (adapted from a 21.dev component, re-themed to the token
 * system, brief §10). His portrait is the cover; a CSS-drawn record slides out
 * on hover and spins while playing. A cursor-following glass tooltip names the
 * track. Click toggles the shared audio; `animation-play-state` freezes the
 * spin in place on pause (no angle-capture maths needed).
 */
export function VinylArtwork({
  photo,
  artist,
  track,
  spotifyUrl,
  className,
}: {
  photo: string;
  artist: string;
  track: string;
  spotifyUrl: string;
  className?: string;
}) {
  const { toggle } = useAudio();
  const [spinning, setSpinning] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const fine = useRef(false);

  useEffect(() => {
    fine.current = window.matchMedia("(pointer: fine)").matches;
  }, []);

  useEffect(() => {
    if (!hovered || !fine.current) return;
    const move = (e: PointerEvent) => {
      let x = e.clientX + 18;
      let y = e.clientY - 44;
      if (x + 240 > window.innerWidth) x = e.clientX - 240;
      if (y < 8) y = e.clientY + 22;
      setPos({ x, y });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [hovered]);

  function onToggle() {
    setSpinning((v) => !v);
    toggle(); // plays the hosted loop if available; harmless otherwise
  }

  return (
    <div className={cn("relative", className)}>
      {/* Cursor-following tooltip (desktop only) */}
      {hovered && (
        <div
          className="pointer-events-none fixed z-[70] hidden md:block"
          style={{ left: pos.x, top: pos.y, transform: "translateZ(0)" }}
        >
          <div className="glass rounded-full px-4 py-2 text-sm text-primary shadow-lg">
            <span className="font-medium text-gold">{artist}</span>
            <span className="mx-1.5 text-faint">·</span>
            {track}
          </div>
        </div>
      )}

      <div className="group relative">
        {/* Record — slides out from behind the cover, spins while playing */}
        <div
          className={cn(
            "absolute left-1/2 top-1/2 aspect-square h-[92%] -translate-y-1/2 transition-all duration-700 ease-out",
            hovered ? "-translate-x-[18%] opacity-100" : "-translate-x-1/2 opacity-0",
          )}
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              animation: "record-spin 2.4s linear infinite",
              animationPlayState: spinning ? "running" : "paused",
              background:
                "repeating-radial-gradient(circle at 50% 50%, #050506 0px, #050506 1px, #1b1b20 2px, #1b1b20 3px), radial-gradient(circle at 38% 32%, rgba(255,255,255,0.10), transparent 45%)",
              boxShadow: "0 20px 50px -12px rgba(0,0,0,0.8)",
            }}
          >
            {/* Centre label */}
            <div className="absolute left-1/2 top-1/2 flex h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-bright">
              <span className="font-display text-sm font-semibold text-ink">SB</span>
              <span className="absolute h-2 w-2 rounded-full bg-ink" />
            </div>
          </div>
        </div>

        {/* Cover — his portrait */}
        <button
          type="button"
          onClick={onToggle}
          onPointerEnter={(e) => {
            setHovered(true);
            setPos({ x: e.clientX + 18, y: e.clientY - 44 });
          }}
          onPointerLeave={() => setHovered(false)}
          aria-label={spinning ? `Pause ${track}` : `Play ${track} by ${artist}`}
          className="relative z-10 block aspect-[4/5] w-56 overflow-hidden rounded-2xl glass shadow-2xl transition-transform duration-500 ease-out hover:scale-[1.02] sm:w-64"
        >
          <SmartImage
            src={photo}
            alt={`${artist} in the studio`}
            fill
            priority
            sizes="(max-width: 640px) 224px, 256px"
            className="transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-base/80 via-transparent to-transparent" />

          {/* Play / pause badge */}
          <span className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-ink shadow-lg">
              {spinning ? (
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </span>
            <span className="text-xs font-medium text-primary">
              <span className="text-gold">{artist}</span> · {track}
            </span>
          </span>
        </button>
      </div>

      {/* Honest deep-link, since the on-site loop may be absent */}
      <a
        href={spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-xs text-muted transition-colors hover:text-gold"
      >
        Full track on Spotify
      </a>
    </div>
  );
}
