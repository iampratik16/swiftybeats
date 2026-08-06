"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SmartVideo } from "@/components/media/SmartVideo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Logo } from "@/components/brand/Logo";
import { TrackSpec } from "@/components/ui/TrackSpec";
import { socials } from "@/lib/links";

/**
 * Flagship hero (brief §6.1). A high-quality Vertex/Veo loop IS the hero:
 * full-bleed cinematic footage of a producer at a studio setup (hands on a pad
 * controller and keys, face in shadow), warm gold and violet (client prompt).
 * Editorial layout: the footage breathes across the top, the type is anchored
 * bottom-left over a gradient plinth. Text-shadows keep it crisp. Muted until pressed.
 */
export function Hero({ hasVideo = false }: { hasVideo?: boolean }) {
  // Muted so it autoplays everywhere (browsers block autoplay with sound); a
  // click anywhere on the hero — or the button — unmutes so the audio plays.
  const [muted, setMuted] = useState(true);

  return (
    <section
      onClick={hasVideo ? () => setMuted(false) : undefined}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-20 pt-32 md:px-10 md:pb-24 lg:px-14"
    >
      <div className="absolute inset-0 -z-10">
        {hasVideo && (
          // Full-screen: the clip covers the entire hero, edge to edge. Desktop
          // gets the 16:9 landscape crop; phones get the uncropped portrait cut.
          <SmartVideo
            priority
            fit="cover"
            muted={muted}
            sources={[
              // Versioned filenames: new encode -> new URL, so the immutable
              // /assets cache never serves a stale hero. v17 = the full 13s clip,
              // 16:9 landscape crop of the portrait source, WITH audio.
              { src: "/assets/hero/hero-loop-v17.webm", type: "video/webm" },
              { src: "/assets/hero/hero-loop-v17.mp4", type: "video/mp4" },
            ]}
            mobileSources={[
              // Phones get the full uncropped portrait cut (light 640-wide).
              { src: "/assets/hero/hero-loop-v17-sm.webm", type: "video/webm" },
              { src: "/assets/hero/hero-loop-v17-sm.mp4", type: "video/mp4" },
            ]}
            poster="/assets/hero/hero-poster-v17.jpg"
            alt="Swifty Beats in the studio, producing a track under warm studio light"
            className="h-full w-full"
          />
        )}
        {/* Editorial plinth: strong gradient rising from the bottom-left seats the
            type; the top stays vivid so the footage reads as the hero. */}
        <div className="absolute inset-0 [background:radial-gradient(120%_90%_at_20%_100%,rgba(10,10,11,0.85)_0%,transparent_55%)]" />
        <div className="absolute inset-0 [background:linear-gradient(to_bottom,rgba(10,10,11,0.7)_0%,transparent_24%,transparent_58%,rgba(10,10,11,0.96)_100%)]" />
      </div>

      <div className="relative w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <TrackSpec className="[text-shadow:0_1px_20px_rgba(0,0,0,0.7)]" />
        </motion.div>

        {/* Brand logo IS the hero heading (image carries the "Swifty Beats" name) */}
        <h1 className="mt-6">
          <Logo
            priority
            // Tight dark halo (0-offset) outlines the thin BEATS letters so they
            // stay legible over bright video; the soft one adds depth.
            className="h-[clamp(4.25rem,13vw,8.5rem)] w-auto [filter:drop-shadow(0_0_5px_rgba(0,0,0,0.9))_drop-shadow(0_3px_22px_rgba(0,0,0,0.75))]"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-6 max-w-none text-pretty text-lg leading-relaxed text-primary/85 [text-shadow:0_1px_24px_rgba(0,0,0,0.8)] [&_br]:hidden sm:[&_br]:block sm:whitespace-nowrap"
        >
          Dancefloor music from Asian House Volume 1 —
          <br />{" "}
          South Asian percussion fused with house and electronic production.
        </motion.p>

        {/* Live multicolour waveform beat-signal — pure CSS, breathes on staggered delays */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          aria-hidden
          className="waveband mt-7 h-8 !justify-start"
        >
          {WAVE.map((h, i) => (
            <span
              key={i}
              style={{
                ["--h" as string]: `${h}%`,
                ["--d" as string]: `${700 + ((i * 53) % 500)}ms`,
                ["--delay" as string]: `${(i * 47) % 600}ms`,
                background:
                  i % 3 === 0
                    ? "var(--color-vermilion)"
                    : i % 3 === 1
                      ? "var(--color-gold)"
                      : "var(--color-teal)",
              }}
            />
          ))}
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href={socials.spotify} cursorLabel="listen" ariaLabel="Listen on Spotify">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
            Listen on Spotify
          </MagneticButton>
        </motion.div>
      </div>

      {/* Mute / unmute for the hero video, bottom-right (all devices). */}
      {hasVideo && (
        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // don't double-fire with the section handler
            setMuted((m) => !m);
          }}
          aria-label={muted ? "Unmute video" : "Mute video"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="glass absolute bottom-6 right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full text-primary transition-colors hover:text-gold"
        >
          {muted ? <MutedIcon /> : <SoundIcon />}
        </motion.button>
      )}

      {/* Scroll cue, bottom-centre so it never crowds the mute control */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
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

function MutedIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="m22 9-6 6M16 9l6 6" />
    </svg>
  );
}

function SoundIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="M16 9a3 3 0 0 1 0 6M19 6a7 7 0 0 1 0 12" />
    </svg>
  );
}

// Bar heights for the hero waveform (percent). Fixed array so SSR and client
// render identically — no Math.random hydration mismatch.
const WAVE = [38, 62, 46, 88, 54, 72, 40, 96, 58, 44, 80, 50, 66, 42, 90, 56, 48, 76, 52, 60];
