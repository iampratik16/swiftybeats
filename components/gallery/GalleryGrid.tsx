"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SmartImage } from "@/components/media/SmartImage";
import { YouTubeFacade } from "@/components/media/YouTubeFacade";
import { media } from "@/lib/links";
import { cn } from "@/lib/utils";

type Tile =
  | { kind: "image"; src: string; alt: string; ratio: string }
  | { kind: "video"; id: string; alt: string };

const tiles: Tile[] = [
  { kind: "image", src: "/assets/artist/swifty-portrait.jpg", alt: "Swifty Beats in the studio", ratio: "aspect-[3/4]" },
  { kind: "image", src: "/assets/generated/era-festival.avif", alt: "Live", ratio: "aspect-[4/3]" },
  { kind: "video", id: media.youtubeFeaturedId, alt: "Swifty Beats on YouTube" },
  { kind: "image", src: "/assets/generated/texture-tabla.avif", alt: "Tabla", ratio: "aspect-square" },
  { kind: "image", src: "/assets/generated/era-studio.avif", alt: "Studio", ratio: "aspect-[4/5]" },
  { kind: "image", src: "/assets/generated/era-dhol.avif", alt: "Dhol", ratio: "aspect-[4/3]" },
  { kind: "image", src: "/assets/generated/backdrop-gold-haze.avif", alt: "Atmosphere", ratio: "aspect-[16/10]" },
  { kind: "image", src: "/assets/generated/era-broadcast.avif", alt: "Broadcast", ratio: "aspect-square" },
  { kind: "image", src: "/assets/generated/era-streams.avif", alt: "Streams", ratio: "aspect-[4/3]" },
];

export function GalleryGrid() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {tiles.map((tile, i) =>
          tile.kind === "video" ? (
            <div key={i} className="break-inside-avoid">
              <YouTubeFacade videoId={tile.id} title={tile.alt} />
            </div>
          ) : (
            <button
              key={i}
              type="button"
              onClick={() => setLightbox({ src: tile.src, alt: tile.alt })}
              data-cursor="view"
              className={cn(
                "group relative block w-full break-inside-avoid overflow-hidden rounded-2xl glass",
                tile.ratio,
              )}
            >
              <SmartImage
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-base/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 text-eyebrow uppercase text-primary/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {tile.alt}
              </span>
            </button>
          ),
        )}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-base/90 p-6 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.alt}
          >
            <motion.img
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-h-[85vh] max-w-4xl rounded-2xl object-contain"
            />
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full glass text-primary"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
