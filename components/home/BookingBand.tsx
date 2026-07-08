import { contact } from "@/lib/links";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SplitText } from "@/components/ui/SplitText";
import { SmartImage } from "@/components/media/SmartImage";
import { BorderGlow } from "@/components/ui/BorderGlow";

// Each credibility stat in its own jewel colour, matching the palette.
const stats = [
  ["5M+", "Streams", "text-gold"],
  ["Wireless", "Glastonbury", "text-teal"],
  ["BBC", "Radio play", "text-rose"],
];

/**
 * The commercial pivot (brief §6.1.7). Split band: festival atmosphere on one
 * side, the booking pitch + true credibility stats on the other.
 */
export function BookingBand() {
  return (
    <section className="px-6 py-24 md:py-32">
      <BorderGlow alwaysOn borderRadius={32} glowRadius={30} backgroundColor="#0f0f11" className="mx-auto max-w-6xl">
      <div className="relative grid overflow-hidden rounded-[2rem] lg:grid-cols-2">
        <div className="relative min-h-[260px] lg:min-h-full">
          <SmartImage
            src="/assets/generated/era-festival.avif"
            alt="Festival stage atmosphere"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base/80 via-base/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-base" />
        </div>

        <div className="relative flex flex-col justify-center gap-6 p-9 md:p-14">
          <p className="text-eyebrow uppercase text-gold">For promoters and brands</p>
          <h2 className="text-display font-semibold">
            <SplitText text="Bring a set no one else can play." immediate />
          </h2>
          <p className="max-w-md text-muted">
            Clubs, festivals, private and brand events across the UK and beyond.
            Tell us the date and the room, and we will take it from there.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton href="/booking" cursorLabel="book">
              Start a booking enquiry
            </MagneticButton>
            <a
              href={`mailto:${contact.bookings}`}
              data-cursor="email"
              className="text-sm text-muted transition-colors hover:text-primary"
            >
              {contact.bookings}
            </a>
          </div>
          <dl className="mt-2 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-6">
            {stats.map(([big, small, colour]) => (
              <div key={big}>
                <dt className={`font-display text-2xl font-semibold ${colour}`}>{big}</dt>
                <dd className="text-sm text-faint">{small}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      </BorderGlow>
    </section>
  );
}
