import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { SplitText } from "@/components/ui/SplitText";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Press, live and studio imagery from Swifty Beats, plus video. Built for speed with a glass lightbox.",
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-28 pt-40 md:pt-48">
      <header className="mb-12 max-w-3xl">
        <p className="text-eyebrow uppercase text-gold">Gallery</p>
        <h1 className="mt-6 text-display font-semibold">
          <SplitText text="Live, studio, backstage." immediate />
        </h1>
        <p className="mt-6 text-lg text-muted">
          A first look. More press and performance media drops in as it lands;
          tap any tile to open it.
        </p>
      </header>
      <GalleryGrid />
    </div>
  );
}
