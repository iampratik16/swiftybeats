import Link from "next/link";
import { footerNav } from "@/lib/nav";
import { management, site, socials } from "@/lib/links";
import { socialIcons } from "@/components/brand/SocialIcons";
import { NewsletterForm } from "./NewsletterForm";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Logo } from "@/components/brand/Logo";

const socialRow = ["spotify", "soundcloud", "youtube", "instagram", "tiktok"] as const;

/**
 * Minimal, premium footer. A single compact CTA + newsletter row over a thin
 * bottom bar (logo, links, social icons, copyright). No video backdrop and no
 * oversized wordmark — cleaner, lighter, and one fewer decode layer on the page.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="cv-section relative border-t border-white/10 bg-base">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        {/* CTA + newsletter */}
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-eyebrow uppercase text-gold">Asian House Production · Bookings open</p>
            <h2 className="mt-3 max-w-md font-display text-title font-semibold">
              Let&apos;s make it loud.
            </h2>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <MagneticButton href="/contact" cursorLabel="contact">
                Get in touch
              </MagneticButton>
              <a
                href={`mailto:${management.email}`}
                data-cursor="email"
                className="text-sm text-muted transition-colors hover:text-primary"
              >
                {management.email}
              </a>
            </div>
          </div>
          <div className="lg:justify-self-end lg:text-right">
            <p className="text-eyebrow uppercase text-faint">Newsletter</p>
            <p className="mt-2 text-sm text-muted">New music, dates and drops. No noise.</p>
            <NewsletterForm className="mt-4 max-w-md lg:ml-auto" />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Logo className="h-6" sizes="120px" />

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <ul className="flex items-center gap-4">
            {socialRow.map((key) => {
              const Icon = socialIcons[key];
              return (
                <li key={key}>
                  <a
                    href={socials[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    data-cursor="visit"
                    className="text-muted transition-colors hover:text-gold"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-1 text-xs text-faint md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. Management: {management.name}.
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
