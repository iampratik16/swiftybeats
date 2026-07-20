import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { management } from "@/lib/links";

export const metadata: Metadata = {
  title: "PR",
  description:
    "The Swifty Beats press kit and EPK are coming soon. For interviews, assets and PR enquiries, contact Supreme Music Group.",
};

export default function PressPage() {
  return (
    <ComingSoon
      eyebrow="PR"
      description="The full press kit and EPK are on the way. For interviews, hi-res assets and PR enquiries, reach management directly."
      primary={{
        label: "PR enquiries",
        href: `mailto:${management.email}`,
        cursorLabel: "email",
        // Must contain the visible label ("PR enquiries") to avoid a
        // label/accessible-name mismatch.
        ariaLabel: "Email PR enquiries",
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
