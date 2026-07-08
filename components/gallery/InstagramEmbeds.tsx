"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Instagram gallery without the raw blockquote + embed.js flash (which paints a
 * white block first, then hydrates — the "blank canvas" on slow/mobile data).
 *
 * Each post is a direct `/embed/` iframe with:
 *  - a branded skeleton loader shown until the embed is revealed;
 *  - IntersectionObserver so the first two load immediately and the rest only
 *    once they near the viewport (preload critical, lazy the rest).
 *
 * Reveal is driven by `onLoad` OR a short safety timer, never by `onLoad` alone:
 * an eager iframe can fire `load` before React binds the handler (the event is
 * missed), which would otherwise leave a fully-loaded embed hidden behind the
 * skeleton forever. The timer guarantees the embed always surfaces. A genuinely
 * dead post falls back to Instagram's own in-frame "post unavailable" page.
 *
 * Fixed-height cards in a real grid keep every row aligned. Tokenless — the
 * /embed/ endpoint renders the post itself, no API key, no download.
 */

/** Instagram permalink -> its self-contained embed page (works for p/ and reel/). */
function toEmbedUrl(permalink: string) {
  return `${permalink.replace(/\/+$/, "")}/embed/`;
}

// Safety net for a missed `load` event — reveal the embed even if onLoad never
// fires. By this point a reachable embed has already painted, so no white flash.
const REVEAL_FALLBACK_MS = 4000;

export function InstagramEmbeds({ urls }: { urls: string[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {urls.map((url, i) => (
        <InstaCard key={url} url={url} eager={i < 2} />
      ))}
    </div>
  );
}

function InstaCard({ url, eager }: { url: string; eager: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(eager);
  const [revealed, setRevealed] = useState(false);

  // Load only when near the viewport (skip for the first eager cards).
  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  // Reveal even if onLoad was missed (eager-iframe race) or the post is dead.
  useEffect(() => {
    if (!visible || revealed) return;
    const t = window.setTimeout(() => setRevealed(true), REVEAL_FALLBACK_MS);
    return () => window.clearTimeout(t);
  }, [visible, revealed]);

  return (
    <div
      ref={ref}
      className="relative h-[540px] overflow-hidden rounded-2xl border border-white/5 bg-raised"
    >
      {visible && (
        <iframe
          src={toEmbedUrl(url)}
          title="Instagram post by Swifty Beats"
          loading={eager ? "eager" : "lazy"}
          scrolling="no"
          allowTransparency
          onLoad={() => setRevealed(true)}
          className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
            revealed ? "opacity-100" : "opacity-0"
          }`}
          style={{ border: 0 }}
        />
      )}

      {/* Skeleton loader — visible until the embed is revealed. */}
      {!revealed && (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-b from-elevated to-raised">
          <div className="flex flex-col items-center gap-3">
            <InstaGlyph className="h-10 w-10 animate-pulse text-muted" />
            <span className="h-1 w-16 overflow-hidden rounded-full bg-white/10">
              <span className="block h-full w-1/2 animate-[loaderslide_1.1s_ease-in-out_infinite] rounded-full bg-gold/70" />
            </span>
          </div>
          <span className="sr-only">Loading Instagram post…</span>
        </div>
      )}
    </div>
  );
}

function InstaGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
    </svg>
  );
}
