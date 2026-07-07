"use client";

import { motion } from "framer-motion";
import { SmartVideo } from "@/components/media/SmartVideo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SplitText } from "@/components/ui/SplitText";
import { socials } from "@/lib/links";

/**
 * Flagship hero (brief §6.1). A high-quality Vertex/Veo loop IS the hero:
 * full-bleed cinematic footage of a producer at a studio setup (hands on a pad
 * controller and keys, face in shadow), warm gold and violet (client prompt).
 * Editorial layout: the footage breathes across the top, the type is anchored
 * bottom-left over a gradient plinth. Text-shadows keep it crisp. Muted until pressed.
 */
export function Hero({ hasVideo = false }: { hasVideo?: boolean }) {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-20 pt-32 md:px-10 md:pb-24 lg:px-14">
      <div className="absolute inset-0 -z-10">
        {hasVideo && (
          <SmartVideo
            priority
            sources={[
              // Versioned filenames: new content -> new URL, so the immutable
              // /assets cache never serves a stale hero to returning visitors.
              { src: "/assets/hero/hero-loop-v5.webm", type: "video/webm" },
              { src: "/assets/hero/hero-loop-v5.mp4", type: "video/mp4" },
            ]}
            poster="/assets/hero/hero-poster-v5.jpg"
            alt="A producer at a studio setup, hands on a pad controller in warm gold and violet light"
            className="h-full w-full opacity-95"
          />
        )}
        {/* Editorial plinth: strong gradient rising from the bottom-left seats the
            type; the top stays vivid so the footage reads as the hero. */}
        <div className="absolute inset-0 [background:radial-gradient(120%_90%_at_20%_100%,rgba(10,10,11,0.85)_0%,transparent_55%)]" />
        <div className="absolute inset-0 [background:linear-gradient(to_bottom,rgba(10,10,11,0.7)_0%,transparent_24%,transparent_58%,rgba(10,10,11,0.96)_100%)]" />
      </div>

      <div className="relative w-full max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 text-eyebrow uppercase text-gold [text-shadow:0_1px_20px_rgba(0,0,0,0.7)]"
        >
          <span className="h-px w-8 bg-gold/60" aria-hidden />
          Asian House Producer · UK DJ
        </motion.p>

        <h1 className="mt-6 text-[clamp(3rem,11vw,9rem)] font-semibold leading-[0.86] tracking-[-0.04em] [text-shadow:0_2px_50px_rgba(0,0,0,0.6)]">
          <SplitText text="Swifty Beats" delay={0.2} immediate />
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-6 max-w-lg text-balance text-lg text-primary/85 [text-shadow:0_1px_24px_rgba(0,0,0,0.8)]"
        >
          South Asian percussion, built for the dancefloor. Dhol heritage fused
          with house and electronic production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="/booking" cursorLabel="book">
            Book Swifty
          </MagneticButton>
          <MagneticButton
            variant="glass"
            href={socials.spotify}
            cursorLabel="listen"
            ariaLabel="Listen on Spotify"
          >
            <span className="flex items-center gap-2">
              Listen
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll cue, bottom-right so it never crowds the type */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 right-8 hidden md:block"
        aria-hidden
      >
        <span className="flex flex-col items-center gap-2 text-faint">
          <span className="text-eyebrow uppercase tracking-[0.22em]">Scroll</span>
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="[animation:slow-float_2.4s_ease-in-out_infinite]"
          >
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </span>
      </motion.div>
    </section>
  );
}
