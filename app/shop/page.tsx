import type { Metadata } from "next";
import { PageIntro } from "@/components/shell/PageIntro";
import { NewsletterForm } from "@/components/shell/NewsletterForm";

export const metadata: Metadata = {
  title: "Shop",
  description: "Swifty Beats merch is dropping soon. Join the list to hear first.",
};

export default function ShopPage() {
  return (
    <PageIntro
      eyebrow="Shop"
      title="Merch, dropping soon."
      description="The first Swifty Beats merch run is on the way. Join the list and you will be first through the door when it lands."
    >
      <NewsletterForm className="max-w-md" />
    </PageIntro>
  );
}
