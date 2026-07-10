"use client";

import { useEffect, useRef, useState } from "react";
import { SmartImage } from "@/components/media/SmartImage";

/**
 * Gallery grid. Video posts are self-hosted and play INLINE on tap (works on
 * mobile — Instagram's own embed only offers "Watch on Instagram", which leaves
 * the site). Photo posts keep the tokenless Instagram `/embed/` iframe, which
 * displays fine. Fixed-height cards keep every row aligned.
 */

export type GalleryItem =
  | { type: "video"; src: string; poster: string; permalink: string }
  | { type: "embed"; permalink: string };

/** Instagram permalink -> its self-contained embed page (works for p/ and reel/). */
function toEmbedUrl(permalink: string) {
  return `${permalink.replace(/\/+$/, "")}/embed/`;
}

const REVEAL_FALLBACK_MS = 4000;
const CARD = "relative h-[540px] overflow-hidden rounded-2xl border border-white/5 bg-raised";

export function Gallery({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) =>
        item.type === "video" ? (
          <GalleryVideo key={item.permalink} src={item.src} poster={item.poster} permalink={item.permalink} />
        ) : (
          <InstaEmbed key={item.permalink} url={item.permalink} eager={i < 2} />
        ),
      )}
    </div>
  );
}

/** Self-hosted clip: poster + play button, swaps to a playing <video> on tap. */
function GalleryVideo({ src, poster, permalink }: { src: string; poster: string; permalink: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={CARD}>
      {playing ? (
        <video
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          className="absolute inset-0 h-full w-full bg-black object-contain"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Play video"
          className="group absolute inset-0 block"
        >
          <SmartImage src={poster} alt="" fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover" />
          <span className="absolute inset-0 grid place-items-center bg-black/25 transition-colors group-hover:bg-black/35">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition-transform group-hover:scale-105">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
          <a
            href={permalink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white backdrop-blur transition-colors hover:text-gold"
          >
            <InstaGlyph className="h-3.5 w-3.5" />
            Instagram
          </a>
        </button>
      )}
    </div>
  );
}

/** Photo post via Instagram's tokenless embed iframe (with a skeleton loader). */
function InstaEmbed({ url, eager }: { url: string; eager: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(eager);
  const [revealed, setRevealed] = useState(false);

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

  useEffect(() => {
    if (!visible || revealed) return;
    const t = window.setTimeout(() => setRevealed(true), REVEAL_FALLBACK_MS);
    return () => window.clearTimeout(t);
  }, [visible, revealed]);

  return (
    <div ref={ref} className={CARD}>
      {visible && (
        <iframe
          src={toEmbedUrl(url)}
          title="Instagram post by Swifty Beats"
          loading={eager ? "eager" : "lazy"}
          scrolling="no"
          onLoad={() => setRevealed(true)}
          className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
            revealed ? "opacity-100" : "opacity-0"
          }`}
          style={{ border: 0 }}
        />
      )}
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
