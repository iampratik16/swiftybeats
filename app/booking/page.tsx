import type { Metadata } from "next";
import { PageIntro } from "@/components/shell/PageIntro";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SocialLinks } from "@/components/shell/SocialLinks";
import { SmartImage } from "@/components/media/SmartImage";
import { contact } from "@/lib/links";

export const metadata: Metadata = {
  title: "Booking",
  description:
    "Book Swifty Beats for clubs, festivals, private, corporate, wedding and brand events across the UK and beyond.",
};

export default function BookingPage() {
  return (
    <div className="relative isolate min-h-[100svh] overflow-hidden">
      {/* Full-bleed live-stage backdrop (his own show photo), held behind the
          content. Absolute (not fixed) so mobile's collapsing address bar can't
          resize it mid-scroll and make the image appear to zoom. Warm-dark
          washes keep the gold/white type legible and blend it into the theme. */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <SmartImage
          src="/assets/booking-stage.jpg"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center ken-burns"
        />
        <div className="absolute inset-0 bg-base/72" />
        <div className="fx-amber absolute inset-0 opacity-70" />
        <div className="absolute inset-0 [background:linear-gradient(to_bottom,rgba(20,15,12,0.6)_0%,transparent_32%,transparent_58%,rgba(20,15,12,0.92)_100%)]" />
      </div>

      {/* TODO(scope:booking-form): the actual enquiry form is out of scope for this copy pass.
          Confirm build slot with Radlabs — bookings are on the revenue path to the £10k/month target. */}
      <PageIntro
        eyebrow="Booking"
        title="Book Swifty."
        description="Clubs, festivals, private, corporate, wedding and brand collaborations. The full enquiry form, with dates, budget and event detail, is coming soon. Until then, email direct and we'll reply fast."
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
    </div>
  );
}
