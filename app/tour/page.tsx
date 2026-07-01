import type { Metadata } from "next";
import { SmartImage } from "@/components/media/SmartImage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Tour and Events",
  description:
    "No public dates listed right now. For availability, routing and holds across clubs, festivals and private events, send a booking enquiry.",
};

const highlights = [
  ["Wireless", "Main-stage electronic sets", "/assets/generated/era-festival.avif"],
  ["Glastonbury", "South Asian percussion, live", "/assets/generated/era-streams.avif"],
];

export default function TourPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-28 pt-40 md:pt-48">
      <header className="max-w-3xl">
        <p className="text-eyebrow uppercase text-gold">Tour and Events</p>
        <h1 className="mt-6 text-display font-semibold">
          <SplitText text="No dates listed. Yet." immediate />
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          There are no public dates on sale right now. For availability, routing
          and holds across clubs, festivals and private events, send an enquiry
          and we will come straight back.
        </p>
        <div className="mt-8">
          <MagneticButton href="/booking" cursorLabel="book">
            Enquire to book
          </MagneticButton>
        </div>
      </header>

      <section className="mt-24">
        <h2 className="text-eyebrow uppercase text-faint">Past highlights</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {highlights.map(([name, note, src], i) => (
            <Reveal key={name} delay={i * 0.08}>
              <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl glass">
                <SmartImage
                  src={src}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base/85 via-base/20 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="font-display text-3xl font-medium text-primary">{name}</p>
                  <p className="mt-1 text-sm text-muted">{note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
