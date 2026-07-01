"use client";

import { motion } from "framer-motion";
import { SmartVideo } from "@/components/media/SmartVideo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SplitText } from "@/components/ui/SplitText";
import { VinylArtwork } from "@/components/home/VinylArtwork";
import { useAudio } from "@/components/providers/AudioProvider";
import { spotify, socials } from "@/lib/links";

/**
 * Flagship hero (brief §6.1). A Veo studio loop sits behind a centred stack:
 * wordmark, strapline, the spinning-vinyl card featuring Swifty's portrait and
 * his release "Freedom", then the CTAs. Nothing plays with sound until pressed.
 */
export function Hero({ hasVideo = false }: { hasVideo?: boolean }) {
  const { status, toggle } = useAudio();
  const playing = status === "playing";

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-28 text-center">
      <div className="absolute inset-0 -z-10">
        {hasVideo && (
          <SmartVideo
            priority
            sources={[
              { src: "/assets/hero/hero-loop.webm", type: "video/webm" },
              { src: "/assets/hero/hero-loop.mp4", type: "video/mp4" },
            ]}
            poster="/assets/hero/hero-poster.jpg"
            alt="Swifty Beats in the studio"
            className="h-full w-full opacity-30"
          />
        )}
        <div className="absolute inset-0 [background:radial-gradient(90%_90%_at_50%_45%,transparent_30%,rgba(10,10,11,0.6)_80%,var(--color-base))]" />
        <div className="absolute inset-0 [background:linear-gradient(to_bottom,rgba(10,10,11,0.7)_0%,transparent_18%,transparent_80%,rgba(10,10,11,0.9)_100%)]" />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-eyebrow uppercase text-gold"
      >
        UK DJ · Producer · Multi-instrumentalist
      </motion.p>

      <h1 className="mt-5 text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.9] tracking-[-0.03em]">
        <SplitText text="Swifty Beats" delay={0.2} immediate />
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mx-auto mt-5 max-w-xl text-balance text-muted"
      >
        Tabla to techno. South Asian percussion heritage fused with contemporary
        electronic production.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mt-9"
      >
        <VinylArtwork
          photo="/assets/artist/swifty-portrait.jpg"
          artist="Swifty Beats"
          track={spotify.featured.title}
          spotifyUrl={socials.spotify}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-9 flex flex-wrap items-center justify-center gap-4"
      >
        <MagneticButton href="/booking" cursorLabel="book">
          Book Swifty
        </MagneticButton>
        <MagneticButton
          variant="glass"
          onClick={toggle}
          cursorLabel={playing ? "pause" : "listen"}
          ariaLabel={playing ? "Pause featured track" : "Play featured track"}
        >
          <span className="flex items-center gap-2">
            {playing ? "Pause" : "Listen"}
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
              {playing ? (
                <>
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </>
              ) : (
                <path d="M8 5v14l11-7z" />
              )}
            </svg>
          </span>
        </MagneticButton>
      </motion.div>
    </section>
  );
}
