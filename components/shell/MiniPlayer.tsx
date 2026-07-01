"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAudio } from "@/components/providers/AudioProvider";
import { socials } from "@/lib/links";
import { SpotifyIcon } from "@/components/brand/SocialIcons";

/**
 * Persistent glass mini-player (brief §7). Docks bottom-centre after the hero,
 * controls the shared audio graph, and is dismissable. When the hosted loop is
 * unavailable it deep-links straight into Spotify instead.
 */
export function MiniPlayer() {
  const { status, toggle } = useAudio();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const playing = status === "playing";
  const unavailable = status === "unavailable";
  const show = visible && !dismissed;

  function onPlay() {
    if (unavailable) window.open(socials.spotify, "_blank", "noopener");
    else toggle();
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-3 z-40 lg:inset-x-auto lg:bottom-4 lg:left-1/2 lg:-translate-x-1/2"
        >
          <div className="glass glass-strong flex items-center gap-3 rounded-2xl py-2 pl-2 pr-3 lg:rounded-full">
            <button
              type="button"
              onClick={onPlay}
              data-cursor={playing ? "pause" : "play"}
              aria-label={
                unavailable ? "Listen on Spotify" : playing ? "Pause" : "Play featured track"
              }
              className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gold text-ink transition-colors hover:bg-gold-bright"
            >
              {playing && (
                <span className="absolute inset-0 rounded-full border border-gold [animation:pulse-ring_1.8s_ease-out_infinite]" />
              )}
              {playing ? (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <div className="min-w-0 flex-1 pr-1 text-xs leading-tight lg:flex-none">
              <p className="font-medium text-primary">Featured track</p>
              <p className="text-faint">
                {unavailable ? "Listen on Spotify" : playing ? "Now playing" : "Tap to play"}
              </p>
            </div>

            <a
              href={socials.spotify}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Spotify profile"
              data-cursor="visit"
              className="text-muted transition-colors hover:text-gold"
            >
              <SpotifyIcon className="h-5 w-5" />
            </a>

            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss player"
              className="ml-1 flex h-7 w-7 items-center justify-center rounded-full text-faint transition-colors hover:text-primary"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
