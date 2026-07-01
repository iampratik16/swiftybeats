import type { Metadata } from "next";
import { PageIntro } from "@/components/shell/PageIntro";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SocialLinks } from "@/components/shell/SocialLinks";
import { contact } from "@/lib/links";

export const metadata: Metadata = {
  title: "Booking",
  description:
    "Book Swifty Beats for clubs, festivals, private, corporate, wedding and brand events across the UK and beyond.",
};

export default function BookingPage() {
  return (
    <PageIntro
      eyebrow="Booking"
      title="Book Swifty."
      description="Clubs, festivals, private, corporate, wedding and brand collaborations. The full enquiry form, with dates, budget and event detail, lands here in the next release. Until then, email direct and we will reply fast."
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center gap-4">
          <MagneticButton href={`mailto:${contact.bookings}`} cursorLabel="email">
            Email bookings
          </MagneticButton>
          <a
            href={`mailto:${contact.bookings}`}
            data-cursor="email"
            className="text-sm text-muted transition-colors hover:text-primary"
          >
            {contact.bookings}
          </a>
        </div>
        <div>
          <p className="text-eyebrow uppercase text-faint">Or find Swifty on</p>
          <SocialLinks className="mt-4" />
        </div>
      </div>
    </PageIntro>
  );
}
