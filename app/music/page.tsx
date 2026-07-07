import type { Metadata } from "next";
import { releases, musicPlatforms } from "@/lib/content";
import { spotify, media, HANDLE } from "@/lib/links";
import { SmartImage } from "@/components/media/SmartImage";
import { SpotifyEmbed } from "@/components/media/SpotifyEmbed";
import { YouTubeFacade } from "@/components/media/YouTubeFacade";
import { socialIcons } from "@/components/brand/SocialIcons";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { BorderGlow } from "@/components/ui/BorderGlow";

export const metadata: Metadata = {
  title: "Music",
  description:
    "Singles, remixes and bootlegs from Swifty Beats. Listen on Spotify, SoundCloud and YouTube, all under @swiftybeats.",
};

export default function MusicPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-28 pt-40 md:pt-48">
      <header className="max-w-3xl">
        <p className="text-eyebrow uppercase text-gold">Music</p>
        <h1 className="mt-6 text-display font-semibold">
          <SplitText text="Remixes, bootlegs and originals." immediate />
        </h1>
        <p className="mt-6 text-lg text-muted">
          Full-track listening through Spotify, remixes and bootlegs through
          SoundCloud, videos through YouTube. All under {HANDLE}.
        </p>
      </header>

      {/* Releases */}
      <section className="mt-20">
        <h2 className="text-eyebrow uppercase text-faint">Releases</h2>
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {releases.map((release, i) => (
            <Reveal key={release.id} delay={i * 0.06}>
              <a
                href={release.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="listen"
                className="group block"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl tile-surface">
                  <SmartImage
                    src={release.cover}
                    alt={`${release.title} cover`}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-base/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-ink">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </div>
                <h3 className="mt-3 font-medium text-primary">{release.title}</h3>
                <p className="text-sm text-faint">{release.type}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Spotify + YouTube */}
      <section className="mt-20 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-eyebrow uppercase text-faint">On Spotify</h2>
          <div className="mt-6">
            <BorderGlow alwaysOn borderRadius={20} glowRadius={28} backgroundColor="#141416">
              <SpotifyEmbed bare type="artist" id={spotify.artistId} title="Swifty Beats on Spotify" />
            </BorderGlow>
          </div>
        </div>
        <div>
          <h2 className="text-eyebrow uppercase text-faint">Watch</h2>
          <div className="mt-6">
            <YouTubeFacade videoId={media.youtubeFeaturedId} title="Swifty Beats on YouTube" />
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="mt-20">
        <h2 className="text-eyebrow uppercase text-faint">Everywhere else</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {musicPlatforms.map((platform) => {
            const Icon = socialIcons[platform.id as keyof typeof socialIcons];
            return (
              <a
                key={platform.id}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="visit"
                className="group block"
              >
                <BorderGlow alwaysOn borderRadius={18} glowRadius={18} backgroundColor="#141416" className="h-full">
                  <div className="flex items-center gap-4 p-5">
                    {Icon ? (
                      <Icon className="h-7 w-7 text-primary transition-colors group-hover:text-gold" />
                    ) : null}
                    <div>
                      <p className="font-medium text-primary">{platform.name}</p>
                      <p className="text-sm text-muted">{platform.role}</p>
                    </div>
                  </div>
                </BorderGlow>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}
