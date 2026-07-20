import type { Metadata } from "next";
import { SmartImage } from "@/components/media/SmartImage";
import { SpotifyEmbed } from "@/components/media/SpotifyEmbed";
import { SplitText } from "@/components/ui/SplitText";
import { Waveband } from "@/components/ui/Waveband";
import { BorderGlow } from "@/components/ui/BorderGlow";
import { socialIcons } from "@/components/brand/SocialIcons";
import { management } from "@/lib/links";
import { artistBio, epkReleases, pressPhotos, type EpkRelease } from "@/lib/epk";

export const metadata: Metadata = {
  title: "EPK",
  description: "Swifty Beats electronic press kit for radio, labels, PR and playlist curators.",
  // Hidden, industry-only page — keep it out of search and the main nav.
  robots: { index: false, follow: false },
};

export default function EpkPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-28 pt-40 md:pt-48">
      <header className="max-w-3xl">
        <div className="flex items-center gap-4">
          <p className="text-eyebrow uppercase text-gold">Electronic Press Kit · Industry only</p>
          <Waveband className="h-4" />
        </div>
        <h1 className="mt-6 text-display font-semibold">
          <SplitText text="Swifty Beats" immediate />{" "}
          <SplitText text="EPK." immediate className="accent font-normal text-jewel" />
        </h1>
        <p className="mt-6 text-lg text-muted">
          For radio stations, record labels, PR companies, playlist curators and
          industry contacts. Press release, artwork, streaming and download links,
          previews, photos and bio below.
        </p>
      </header>

      {/* Artist bio */}
      <Section title="Artist bio">
        <p className="max-w-3xl text-lg leading-relaxed text-muted">{artistBio}</p>
      </Section>

      {/* Press photos */}
      <Section title="Press photos">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {pressPhotos.map((src, i) => (
            <div key={src} className="relative aspect-[4/5] overflow-hidden rounded-xl tile-surface">
              <SmartImage src={src} alt={`Swifty Beats press photo ${i + 1}`} fill sizes="(max-width:640px) 50vw, 25vw" className="object-cover" />
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-faint">
          Hi-res press photos available on request. Email{" "}
          <a href={`mailto:${management.email}`} className="text-muted underline underline-offset-2 transition-colors hover:text-gold">
            {management.email}
          </a>
          .
        </p>
      </Section>

      {/* Per-release EPKs */}
      <Section title="Releases">
        <div className="flex flex-col gap-12">
          {epkReleases.map((release) => (
            <ReleaseEPK key={release.id} release={release} />
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section title="Contact">
        <p className="text-muted">{management.name}: management, bookings and PR.</p>
        <a
          href={`mailto:${management.email}`}
          data-cursor="email"
          className="mt-2 inline-block text-lg text-primary transition-colors hover:text-gold"
        >
          {management.email}
        </a>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-16 border-t border-white/10 pt-10">
      <h2 className="text-eyebrow uppercase text-faint">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function ReleaseEPK({ release }: { release: EpkRelease }) {
  return (
    <BorderGlow alwaysOn borderRadius={22} glowRadius={24} backgroundColor="#1d1512">
      <div className="grid gap-8 p-6 md:grid-cols-2 md:gap-10 md:p-8">
        {/* Cover artwork + song preview */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg">
            <SmartImage src={release.cover} alt={`${release.title} cover artwork`} fill sizes="(max-width:768px) 100vw, 40vw" className="object-cover" />
          </div>
          {release.preview && (
            <div className="mt-4">
              <p className="text-eyebrow uppercase text-faint">Song preview</p>
              <div className="mt-3">
                <SpotifyEmbed compact bare type={release.preview.embedType} id={release.preview.embedId} title={`${release.title} preview`} />
              </div>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-eyebrow uppercase text-gold">{release.type}</p>
            <h3 className="mt-1 font-display text-3xl font-semibold text-primary">{release.title}</h3>
          </div>

          {release.pressRelease && (
            <div>
              <p className="text-eyebrow uppercase text-faint">Press release</p>
              <p className="mt-2 text-muted">{release.pressRelease}</p>
            </div>
          )}

          <div>
            <p className="text-eyebrow uppercase text-faint">Streaming links</p>
            <ul className="mt-3 flex flex-wrap gap-2.5">
              {release.streaming.map((s) => {
                const Icon = socialIcons[s.id as keyof typeof socialIcons];
                return (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="visit"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition-colors hover:border-gold hover:text-gold"
                    >
                      {Icon ? <Icon className="h-4 w-4" /> : null}
                      {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-wrap gap-3">
            <AssetButton label="Download assets" url={release.downloadUrl} subject={`Download: ${release.title}`} />
            <AssetButton label="Additional assets" url={release.assetsUrl} subject={`Assets: ${release.title}`} variant="glass" />
          </div>
        </div>
      </div>
    </BorderGlow>
  );
}

/** Links to a file-share (Dropbox etc.) when set, else falls back to an email request. */
function AssetButton({ label, url, subject, variant = "gold" }: { label: string; url?: string; subject: string; variant?: "gold" | "glass" }) {
  const href = url ?? `mailto:${management.email}?subject=${encodeURIComponent(subject)}`;
  // A local file (served from /public) downloads; an external link opens in a new tab.
  const isLocalFile = url?.startsWith("/");
  const base =
    variant === "gold"
      ? "bg-gold text-ink hover:bg-gold-bright"
      : "border border-white/15 text-primary hover:border-white/30";
  return (
    <a
      href={href}
      download={isLocalFile || undefined}
      target={url && !isLocalFile ? "_blank" : undefined}
      rel={url && !isLocalFile ? "noopener noreferrer" : undefined}
      data-cursor={url ? "visit" : "email"}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${base}`}
    >
      {label}
      {!url && <span className="text-xs opacity-70">(on request)</span>}
    </a>
  );
}
