import type { Metadata } from "next";
import { releases, musicPlatforms, type Release } from "@/lib/content";
import { spotify, socials, media, HANDLE } from "@/lib/links";
import { SmartImage } from "@/components/media/SmartImage";
import { SpotifyEmbed } from "@/components/media/SpotifyEmbed";
import { YouTubeFacade } from "@/components/media/YouTubeFacade";
import { socialIcons } from "@/components/brand/SocialIcons";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { Tabs } from "@/components/ui/Tabs";
import { BorderGlow } from "@/components/ui/BorderGlow";
import { Waveband } from "@/components/ui/Waveband";

export const metadata: Metadata = {
  title: "Music",
  description:
    "Singles, remixes and bootlegs from Swifty Beats. Listen on Spotify, SoundCloud and YouTube, all under @swiftybeats.",
};

export default function MusicPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-28 pt-40 md:pt-48">
      <header className="max-w-3xl">
        <div className="flex items-center gap-4">
          <p className="text-eyebrow uppercase text-gold">Music</p>
          <Waveband className="h-4" />
        </div>
        <h1 className="mt-6 text-display font-semibold">
          <SplitText text="Remixes, bootlegs and" immediate />{" "}
          <SplitText text="originals." immediate className="accent font-normal text-jewel" />
        </h1>
        <p className="mt-6 text-lg text-muted">
          Full-length streaming on Spotify, remixes and bootlegs on SoundCloud,
          videos on YouTube, all under {HANDLE}.
        </p>
      </header>

      {/* Releases / Bootlegs tabs */}
      <section className="mt-16">
        <Tabs
          tabs={[
            {
              id: "releases",
              label: "Releases",
              content: (
                <div className="flex flex-col gap-16">
                  {/* sr-only section heading so the release-card h3s don't skip
                      straight from the page h1 (valid heading outline). */}
                  <h2 className="sr-only">Releases</h2>
                  <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                    {releases.map((release, i) => (
                      <Reveal key={release.id} delay={i * 0.06}>
                        <ReleaseCard release={release} />
                      </Reveal>
                    ))}
                  </div>

                  <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                      <h3 className="text-eyebrow uppercase text-faint">On Spotify</h3>
                      <div className="mt-6">
                        <BorderGlow alwaysOn borderRadius={20} glowRadius={28} backgroundColor="#1d1512">
                          <SpotifyEmbed bare type="artist" id={spotify.artistId} title="Swifty Beats on Spotify" />
                        </BorderGlow>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-eyebrow uppercase text-faint">Watch</h3>
                      <p className="mt-2 text-sm text-muted">
                        The visual side of the sound: live sets, behind the scenes, and music videos.
                      </p>
                      <div className="mt-6">
                        <YouTubeFacade videoId={media.youtubeFeaturedId} title="Swifty Beats on YouTube" />
                      </div>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: "bootlegs",
              label: "Bootlegs",
              content: (
                <div>
                  <p className="max-w-2xl text-muted">
                    SoundCloud-exclusive bootlegs and edits, remixes that live outside
                    the official releases. Stream the full catalogue below.
                  </p>
                  <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                    <iframe
                      title="Swifty Beats bootlegs on SoundCloud"
                      width="100%"
                      height="520"
                      scrolling="no"
                      loading="lazy"
                      allow="autoplay"
                      className="block w-full"
                      style={{ border: 0 }}
                      // visual=true = SoundCloud's dark artwork player, on-theme
                      // (the classic list player is white).
                      src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                        socials.soundcloud,
                      )}&color=%23e2ac5c&visual=true&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
                    />
                  </div>
                  <a
                    href={socials.soundcloud}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="visit"
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-muted transition-colors hover:border-gold hover:text-gold"
                  >
                    Open SoundCloud
                  </a>
                </div>
              ),
            },
          ]}
        />
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
                <BorderGlow alwaysOn borderRadius={18} glowRadius={18} backgroundColor="#1d1512" className="h-full">
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

/** Release cover + title. Links to the track when a URL exists; otherwise
 *  renders non-clickable (no broken/wrong link) — see Ma Penzi TODO. */
function ReleaseCard({ release }: { release: Release }) {
  const inner = (
    <>
      <div className="relative aspect-square overflow-hidden rounded-xl tile-surface">
        <SmartImage
          src={release.cover}
          alt={`${release.title} cover`}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="transition-transform duration-700 group-hover:scale-105"
        />
        {release.href && (
          <span className="absolute inset-0 flex items-center justify-center bg-base/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-ink">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        )}
      </div>
      <h3 className="mt-3 font-medium text-primary">{release.title}</h3>
      <p className="text-sm text-faint">{release.type}</p>
    </>
  );

  return release.href ? (
    <a href={release.href} target="_blank" rel="noopener noreferrer" data-cursor="listen" className="group block">
      {inner}
    </a>
  ) : (
    <div className="group block">{inner}</div>
  );
}
