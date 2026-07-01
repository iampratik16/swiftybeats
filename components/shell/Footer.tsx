import Link from "next/link";
import { footerNav } from "@/lib/nav";
import { contact, site, socials } from "@/lib/links";
import { socialIcons } from "@/components/brand/SocialIcons";
import { NewsletterForm } from "./NewsletterForm";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Logo } from "@/components/brand/Logo";
import { SplitText } from "@/components/ui/SplitText";
import { SmartVideo } from "@/components/media/SmartVideo";

const socialRow = [
  ["spotify", "Spotify"],
  ["soundcloud", "SoundCloud"],
  ["youtube", "YouTube"],
  ["instagram", "Instagram"],
  ["tiktok", "TikTok"],
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/5 bg-base">
      {/* Ambient video backdrop */}
      <div className="absolute inset-0 -z-10 opacity-[0.16]">
        <SmartVideo
          sources={[
            { src: "/assets/hero/hero-loop.webm", type: "video/webm" },
            { src: "/assets/hero/hero-loop.mp4", type: "video/mp4" },
          ]}
          poster="/assets/hero/hero-poster.jpg"
          alt=""
          className="h-full w-full"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-base/70 via-base/85 to-base" />

      <div className="mx-auto max-w-7xl px-6 pb-10 pt-24 md:px-8 md:pt-28">
        {/* CTA + newsletter */}
        <div className="grid gap-12 border-b border-white/10 pb-16 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-eyebrow uppercase text-gold">Bookings open</p>
            <h2 className="mt-4 max-w-md text-display font-semibold">
              <SplitText text="Let's make it loud." immediate />
            </h2>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <MagneticButton href="/booking" cursorLabel="book">
                Book Swifty
              </MagneticButton>
              <a
                href={`mailto:${contact.bookings}`}
                data-cursor="email"
                className="text-sm text-muted transition-colors hover:text-primary"
              >
                {contact.bookings}
              </a>
            </div>
          </div>
          <div className="lg:justify-self-end lg:text-right">
            <p className="text-eyebrow uppercase text-faint">Newsletter</p>
            <p className="mt-3 text-sm text-muted">New music, dates and drops. No noise.</p>
            <NewsletterForm className="mt-4 max-w-md lg:ml-auto" />
          </div>
        </div>

        {/* Link columns + social pills */}
        <div className="mt-14 grid grid-cols-2 gap-10 md:grid-cols-4">
          <nav aria-label="Footer">
            <p className="text-eyebrow uppercase text-faint">Explore</p>
            <ul className="mt-5 space-y-2.5">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2">
            <p className="text-eyebrow uppercase text-faint">Listen and follow</p>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {socialRow.map(([key, label]) => {
                const Icon = socialIcons[key];
                return (
                  <li key={key}>
                    <a
                      href={socials[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="visit"
                      className="group flex items-center gap-3 rounded-full glass px-4 py-2.5 transition-colors hover:border-white/20"
                    >
                      <Icon className="h-4 w-4 text-muted transition-colors group-hover:text-gold" />
                      <span className="text-sm text-muted transition-colors group-hover:text-primary">
                        {label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="text-eyebrow uppercase text-faint">Contact</p>
            <ul className="mt-5 space-y-2.5 text-sm text-muted">
              <li>
                <a href={`mailto:${contact.bookings}`} className="transition-colors hover:text-primary">
                  Bookings
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.press}`} className="transition-colors hover:text-primary">
                  Press and media
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Brand logo */}
      <div className="flex justify-center px-6 pb-6 pt-4">
        <Logo glow className="h-auto w-[min(86%,560px)]" sizes="560px" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 pb-10 pt-6 text-xs text-faint md:flex-row md:px-8">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <p>{site.tagline}</p>
      </div>
    </footer>
  );
}
