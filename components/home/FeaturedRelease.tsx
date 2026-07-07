import { featuredRelease } from "@/lib/content";
import { spotify, socials } from "@/lib/links";
import { SpotifyEmbed } from "@/components/media/SpotifyEmbed";
import { SmartImage } from "@/components/media/SmartImage";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { BorderGlow } from "@/components/ui/BorderGlow";

export function FeaturedRelease() {
  return (
    <section className="relative isolate overflow-hidden border-y border-white/5 bg-raised py-28 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(70%_80%_at_80%_50%,#000,transparent)]"
      >
        <SmartImage src="/assets/generated/backdrop-gold-haze.avif" alt="" fill sizes="100vw" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <p className="text-eyebrow uppercase text-gold">{featuredRelease.eyebrow}</p>
          <h2 className="mt-5 text-display font-semibold">
            <SplitText text={featuredRelease.title} immediate />
          </h2>
          <Reveal className="mt-5 max-w-md text-muted" delay={0.05}>
            <p>{featuredRelease.body}</p>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={socials.spotify}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="visit"
              className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-primary transition-colors hover:border-gold hover:text-gold"
            >
              Open in Spotify
            </a>
            <a
              href={socials.soundcloud}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="visit"
              className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-muted transition-colors hover:border-white/25 hover:text-primary"
            >
              Remixes on SoundCloud
            </a>
          </div>
        </div>
        <Reveal>
          <BorderGlow alwaysOn borderRadius={20} glowRadius={30} backgroundColor="#141416">
            <SpotifyEmbed
              bare
              type={spotify.featured.type}
              id={spotify.featured.id}
              title={`Swifty Beats — ${spotify.featured.title}`}
            />
          </BorderGlow>
        </Reveal>
      </div>
    </section>
  );
}
