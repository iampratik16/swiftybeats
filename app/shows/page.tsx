import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SplitText } from "@/components/ui/SplitText";
import { Waveband } from "@/components/ui/Waveband";
import { shows } from "@/lib/content";

export const metadata: Metadata = {
  title: "Shows",
  description:
    "Live shows from Swifty Beats. No public dates on sale right now. For availability, routing and holds across clubs, festivals and private events, get in touch.",
};

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export default function ShowsPage() {
  // No dates yet -> premium holding page. Add entries to `shows` and this
  // switches to the dated list automatically, no redesign needed.
  if (shows.length === 0) {
    return (
      <ComingSoon
        eyebrow="Shows"
        description="No live dates on sale right now. New shows, festivals and club nights land here first. For availability and holds, get in touch."
        primary={{ label: "Enquire to book", href: "/contact", cursorLabel: "book" }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 pb-28 pt-40 md:pt-48">
      <header className="max-w-3xl">
        <div className="flex items-center gap-4">
          <p className="text-eyebrow uppercase text-gold">Shows</p>
          <Waveband className="h-4" />
        </div>
        <h1 className="mt-6 text-display font-semibold">
          <SplitText text="Live" immediate />{" "}
          <SplitText text="dates." immediate className="accent font-normal text-jewel" />
        </h1>
      </header>

      <ul className="mt-12 divide-y divide-white/10 border-y border-white/10">
        {shows.map((show) => (
          <li
            key={show.id}
            className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-display text-2xl font-medium text-primary">{show.venue}</p>
              <p className="mt-1 text-sm text-muted">
                {show.city} · {dateFmt.format(new Date(show.date))}
              </p>
            </div>
            {show.ticketUrl ? (
              <MagneticButton href={show.ticketUrl} cursorLabel="tickets">
                Tickets
              </MagneticButton>
            ) : (
              <MagneticButton href="/contact" variant="glass" cursorLabel="book">
                Enquire
              </MagneticButton>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
