import { SmartImage } from "@/components/media/SmartImage";
import { Reveal } from "@/components/ui/Reveal";
import { BorderGlow } from "@/components/ui/BorderGlow";
import { nextRelease } from "@/lib/content";
import { features } from "@/lib/features";

/**
 * "Coming soon" teaser for the upcoming single (Music + EPK pages). Uses the same
 * BorderGlow + gold-eyebrow language as the home ReleaseBanner so it blends in.
 * Hides itself once NEXT_PUBLIC_LET_ME_GO_LIVE flips on release day — at that
 * point the track is live and shown as a real release instead of a teaser.
 */
export function NextRelease() {
  if (features.letMeGoLive) return null;

  return (
    <Reveal>
      <BorderGlow alwaysOn borderRadius={24} glowRadius={26} backgroundColor="#1d1512">
        <div className="grid gap-6 p-5 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-9 sm:p-7">
          {/* Cover artwork with a status pill */}
          <div className="relative mx-auto aspect-square w-44 shrink-0 overflow-hidden rounded-xl shadow-lg ring-1 ring-white/10 sm:mx-0 sm:w-52">
            <SmartImage
              src={nextRelease.cover}
              alt={`${nextRelease.title} — single cover artwork`}
              fill
              sizes="(max-width: 640px) 176px, 208px"
              className="object-cover"
            />
            <span className="absolute left-3 top-3 rounded-full bg-base/70 px-3 py-1 text-eyebrow uppercase tracking-[0.18em] text-gold backdrop-blur">
              Coming soon
            </span>
          </div>

          {/* Copy + release date */}
          <div className="text-center sm:text-left">
            <p className="text-eyebrow uppercase text-gold">{nextRelease.eyebrow}</p>
            <h2 className="mt-1.5 font-display text-4xl font-semibold text-primary md:text-5xl">
              {nextRelease.title}
            </h2>
            <p className="mt-3 max-w-md text-muted">{nextRelease.body}</p>
            <p className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/5 px-4 py-2 text-sm text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" aria-hidden />
              Out {nextRelease.date}
            </p>
          </div>
        </div>
      </BorderGlow>
    </Reveal>
  );
}
