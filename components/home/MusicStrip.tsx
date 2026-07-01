import { musicPlatforms } from "@/lib/content";
import { spotify } from "@/lib/links";
import { socialIcons } from "@/components/brand/SocialIcons";
import { SpotifyEmbed } from "@/components/media/SpotifyEmbed";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function MusicStrip() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28 md:py-36">
      <header className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-eyebrow uppercase text-gold">Listen</p>
          <h2 className="mt-5 max-w-xl text-display font-semibold">
            <SplitText text="Everywhere you already are." immediate />
          </h2>
        </div>
        <p className="max-w-sm text-muted">
          Singles on Spotify, remixes and bootlegs on SoundCloud, videos on
          YouTube. All under {""}
          <span className="text-primary">@swiftybeats</span>.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-3">
        {musicPlatforms.map((platform, i) => {
          const Icon = socialIcons[platform.id as keyof typeof socialIcons];
          return (
            <Reveal key={platform.id} delay={i * 0.08}>
              <a
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="visit"
                className="group relative flex h-56 flex-col justify-between overflow-hidden rounded-3xl glass p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
              >
                <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(60%_60%_at_50%_0%,rgba(230,180,90,0.12),transparent)]" />
                <div className="relative flex items-center justify-between">
                  {Icon ? (
                    <Icon className="h-8 w-8 text-primary transition-colors duration-500 group-hover:text-gold" />
                  ) : null}
                  <span className="text-faint transition-colors duration-500 group-hover:text-gold">
                    <ArrowUpRight />
                  </span>
                </div>
                <div className="relative">
                  <h3 className="text-title font-medium">{platform.name}</h3>
                  <p className="mt-1 text-sm text-muted">{platform.role}</p>
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>

      {/* His Spotify — top tracks, straight from the source */}
      <Reveal className="mt-6" delay={0.1}>
        <SpotifyEmbed type="artist" id={spotify.artistId} title="Swifty Beats on Spotify" />
      </Reveal>
    </section>
  );
}
