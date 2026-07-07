import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { management } from "@/lib/links";

export const metadata: Metadata = {
  title: "Press",
  description:
    "The Swifty Beats press kit and EPK are coming soon. For interviews, assets and press enquiries, contact Supreme Music Group.",
};

export default function PressPage() {
  return (
    <ComingSoon
      eyebrow="Press"
      description="The full press kit and EPK are on the way. For interviews, hi-res assets and press enquiries, reach management directly."
      primary={{
        label: "Press enquiries",
        href: `mailto:${management.email}`,
        cursorLabel: "email",
        ariaLabel: "Email press enquiries",
      }}
      footnote={
        <a
          href={`mailto:${management.email}`}
          data-cursor="email"
          className="transition-colors hover:text-gold"
        >
          {management.email}
        </a>
      }
    />
  );
}
