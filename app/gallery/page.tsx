import type { Metadata } from "next";
import { Gallery, type GalleryItem } from "@/components/gallery/InstagramEmbeds";
import { SplitText } from "@/components/ui/SplitText";
import { Waveband } from "@/components/ui/Waveband";
import { socials, HANDLE } from "@/lib/links";
import { socialIcons } from "@/components/brand/SocialIcons";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Posts and reels from Swifty Beats' Instagram — studio, live and behind the scenes. Asian House Production on and off the stage.",
};

// Client-selected posts, shown via Instagram's embed. Exception: Ma Penzi's
// embed only offers "Watch on Instagram" (Instagram blocks inline playback for
// that reel — licensed music), so it's self-hosted to play inline like the
// rest. Add or reorder here.
const posts: GalleryItem[] = [
  { type: "video", src: "/assets/gallery/DNbs7qasncP.mp4", poster: "/assets/gallery/DNbs7qasncP.jpg", permalink: "https://www.instagram.com/reel/DNbs7qasncP/" },
  { type: "embed", permalink: "https://www.instagram.com/p/DILYJA_MesS/" },
  { type: "embed", permalink: "https://www.instagram.com/p/DHrNmd-MmZI/" },
  { type: "embed", permalink: "https://www.instagram.com/p/DHmD7e1MqqI/" },
  { type: "embed", permalink: "https://www.instagram.com/reel/DRxojevCik3/" },
  { type: "embed", permalink: "https://www.instagram.com/p/DR6pckFCgur/" },
];

export default function GalleryPage() {
  const InstagramIcon = socialIcons.instagram;

  return (
    <div className="mx-auto max-w-6xl px-6 pb-28 pt-40 md:pt-48">
      <header className="mb-12 max-w-3xl">
        <div className="flex items-center gap-4">
          <p className="text-eyebrow uppercase text-gold">Gallery</p>
          <Waveband className="h-4" />
        </div>
        <h1 className="mt-6 text-display font-semibold">
          <SplitText text="Live, studio," immediate />{" "}
          <SplitText text="backstage." immediate className="accent font-normal text-jewel" />
        </h1>
        <p className="mt-6 text-lg text-muted">
          Posts and reels straight from Instagram. Follow along for the latest.
        </p>
        <a
          href={socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="visit"
          className="mt-6 inline-flex items-center gap-2.5 rounded-full glass px-5 py-2.5 text-sm text-primary transition-colors hover:border-white/25 hover:text-gold"
        >
          <InstagramIcon className="h-4 w-4" />
          Follow {HANDLE} on Instagram
        </a>
      </header>
      <Gallery items={posts} />
    </div>
  );
}
