import type { Metadata } from "next";
import { PageIntro } from "@/components/shell/PageIntro";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "News",
  description: "Announcements and releases from Swifty Beats.",
};

export default function NewsPage() {
  return (
    <PageIntro
      eyebrow="News"
      title="Nothing to report. For now."
      description="Releases, dates and announcements will land here. Follow along or join the list so the next drop reaches you first."
    >
      <MagneticButton href="/shop" variant="glass" cursorLabel="view">
        Join the list
      </MagneticButton>
    </PageIntro>
  );
}
