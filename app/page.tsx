import { existsSync } from "node:fs";
import { join } from "node:path";
import { Hero } from "@/components/home/Hero";
import { OriginStory } from "@/components/home/OriginStory";
import { FeaturedRelease } from "@/components/home/FeaturedRelease";
import { MusicStrip } from "@/components/home/MusicStrip";
import { Marquee } from "@/components/home/Marquee";
import { BookingBand } from "@/components/home/BookingBand";

export default function HomePage() {
  // Include the hero loop only if the asset exists (Veo Asian-House atmosphere).
  const hasVideo = existsSync(join(process.cwd(), "public/assets/hero/hero-loop-v7.mp4"));

  return (
    <>
      <Hero hasVideo={hasVideo} />
      <OriginStory />
      <FeaturedRelease />
      <MusicStrip />
      <Marquee />
      <BookingBand />
    </>
  );
}
