"use client";

import { useState } from "react";
import { featuredRelease } from "@/lib/content";
import { spotify } from "@/lib/links";
import { features } from "@/lib/features";
import { SmartImage } from "@/components/media/SmartImage";
import { Reveal } from "@/components/ui/Reveal";
import { BorderGlow } from "@/components/ui/BorderGlow";

/** Spotify share URL -> themed embed URL. Returns null if empty/unparseable. */
function embedFromUrl(url?: string) {
  if (!url) return null;
  const m = url.match(/open\.spotify\.com\/(track|album|artist|playlist)\/([A-Za-z0-9]+)/);
  return m ? `https://open.spotify.com/embed/${m[1]}/${m[2]}?utm_source=generator&theme=0` : null;
}

/**
 * Compact current-release banner near the foot of the home page: cover + copy
 * with a single play button. Tapping play reveals the Spotify player inline
 * (autoplays the preview after the tap). 'Let Me Go' content is gated behind
 * NEXT_PUBLIC_LET_ME_GO_LIVE — off by default, so Freedom stays visible.
 */
export function ReleaseBanner() {
  const [playing, setPlaying] = useState(false);

  const release = features.letMeGoLive
    ? {
        eyebrow: "Latest release",
        title: "Let Me Go",
        body: "Asian House heartbreak, straight from the source. Full-track listening, out now on Spotify. Press play and let it run.",
        // TODO(client-asset:let-me-go-artwork): swap Freedom artwork for Let Me Go artwork on release day
        cover: spotify.featured.cover,
        embed: embedFromUrl(process.env.NEXT_PUBLIC_LET_ME_GO_SPOTIFY_URL),
      }
    : {
        eyebrow: featuredRelease.eyebrow,
        title: featuredRelease.title,
        body: featuredRelease.body,
        cover: spotify.featured.cover,
        embed: spotify.embed(spotify.featured.type, spotify.featured.id),
      };

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <Reveal>
        <BorderGlow alwaysOn borderRadius={24} glowRadius={26} backgroundColor="#1d1512">
          <div className="p-6 sm:p-7">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
              <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-xl shadow-lg sm:w-32">
                <SmartImage
                  src={release.cover}
                  alt={`${release.title} cover`}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <p className="text-eyebrow uppercase text-gold">{release.eyebrow}</p>
                <h2 className="mt-1.5 font-display text-3xl font-semibold text-primary md:text-4xl">
                  {release.title}
                </h2>
                <p className="mt-2 max-w-md text-sm text-muted">{release.body}</p>
              </div>
              {release.embed && (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label={`Play ${release.title}`}
                  data-cursor="listen"
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gold text-ink shadow-lg transition-transform hover:scale-105 disabled:opacity-60"
                  disabled={playing}
                >
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              )}
            </div>

            {playing && release.embed && (
              <div className="mt-5 overflow-hidden rounded-xl">
                <iframe
                  src={`${release.embed}&autoplay=1`}
                  title={`Swifty Beats: ${release.title}`}
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  className="block w-full"
                  style={{ border: 0, height: 152 }}
                />
              </div>
            )}
          </div>
        </BorderGlow>
      </Reveal>
    </section>
  );
}
