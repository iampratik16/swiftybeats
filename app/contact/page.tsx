import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact/ContactForm";
import { SplitText } from "@/components/ui/SplitText";
import { Waveband } from "@/components/ui/Waveband";
import { SocialLinks } from "@/components/shell/SocialLinks";
import { InstagramIcon } from "@/components/brand/SocialIcons";
import { management, smgSocials } from "@/lib/links";

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
        {/* Management + artist details, split into two clear blocks */}
        <div className="flex flex-col gap-10">
          {/* Supreme Music Group */}
          <div>
            <Image
              src="/assets/brand/smg-logo.jpeg"
              alt="Supreme Music Group"
              width={220}
              height={110}
              // JPEG has a black background; screen blend drops it so the mark
              // sinks into the dark site instead of sitting in a box.
              className="h-auto w-44 mix-blend-screen"
            />
            <p className="mt-4 font-display text-xl font-medium text-primary">{management.name}</p>
            <a
              href={`mailto:${management.email}`}
              data-cursor="email"
              className="mt-1 inline-block text-muted transition-colors hover:text-gold"
            >
              {management.email}
            </a>
            <ul className="mt-4 flex items-center gap-5">
              <li>
                <a
                  href={smgSocials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Supreme Music Group on Instagram"
                  data-cursor="visit"
                  className="block text-muted transition-colors duration-300 hover:text-gold"
                >
                  <InstagramIcon className="h-7 w-7" />
                </a>
              </li>
            </ul>
          </div>

          {/* Swifty Beats */}
          <div>
            <p className="text-eyebrow uppercase text-faint">Swifty Beats</p>
            <SocialLinks className="mt-4 gap-6" iconClassName="h-7 w-7" />
          </div>
        </div>

        {/* Form */}
        <ContactForm />
      </div>
    </div>
  );
}
