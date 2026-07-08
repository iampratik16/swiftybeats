import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { SplitText } from "@/components/ui/SplitText";
import { Waveband } from "@/components/ui/Waveband";
import { SocialLinks } from "@/components/shell/SocialLinks";
import { management } from "@/lib/links";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Swifty Beats through management, Supreme Music Group. Bookings, press and general enquiries.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-28 pt-40 md:pt-48">
      <header className="max-w-3xl">
        <div className="flex items-center gap-4">
          <p className="text-eyebrow uppercase text-gold">Contact</p>
          <Waveband className="h-4" />
        </div>
        <h1 className="mt-6 text-display font-semibold">
          <SplitText text="Let's" immediate />{" "}
          <SplitText text="talk." immediate className="accent font-normal text-jewel" />
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          Bookings, press and every other enquiry are handled by management.
          Send a message and {management.name} will come straight back.
        </p>
      </header>

      <div className="mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Management details */}
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-eyebrow uppercase text-faint">Management</p>
            <p className="mt-3 font-display text-2xl font-medium text-primary">
              {management.name}
            </p>
            <a
              href={`mailto:${management.email}`}
              data-cursor="email"
              className="mt-2 inline-block text-muted transition-colors hover:text-gold"
            >
              {management.email}
            </a>
          </div>
          <div>
            <p className="text-eyebrow uppercase text-faint">Follow</p>
            <SocialLinks className="mt-4" />
          </div>
        </div>

        {/* Form */}
        <ContactForm />
      </div>
    </div>
  );
}
