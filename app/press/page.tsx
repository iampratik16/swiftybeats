import type { Metadata } from "next";
import { SmartImage } from "@/components/media/SmartImage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { contact } from "@/lib/links";

export const metadata: Metadata = {
  title: "Press and EPK",
  description:
    "Key facts, bio and press contact for Swifty Beats. Hi-res press shots and a logo pack arrive with the full EPK.",
};

const facts = [
  ["Started", "Tabla at 6, dhol at 7"],
  ["Founded", "P.D.S (Pure Divine Sounds) at 15"],
  ["Festivals", "Wireless, Glastonbury"],
  ["Radio", "Played on BBC Radio"],
  ["Streams", "5 million plus"],
  ["Based", "United Kingdom"],
];

export default function PressPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-28 pt-40 md:pt-48">
      <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div>
          <p className="text-eyebrow uppercase text-gold">Press and EPK</p>
          <h1 className="mt-6 text-display font-semibold">
            <SplitText text="The facts, ready to quote." immediate />
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted">
            A clean, screenshot-worthy press kit. Hi-res press shots and a logo
            pack arrive with the full EPK. For interviews and assets, contact
            press direct.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton href={`mailto:${contact.press}`} cursorLabel="email">
              Contact press
            </MagneticButton>
            <a
              href={`mailto:${contact.press}`}
              data-cursor="email"
              className="text-sm text-muted transition-colors hover:text-primary"
            >
              {contact.press}
            </a>
          </div>
        </div>
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl glass">
            <SmartImage
              src="/assets/artist/swifty-portrait.jpg"
              alt="Swifty Beats press shot"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </Reveal>
      </section>

      <section className="mt-20">
        <h2 className="text-eyebrow uppercase text-faint">Key facts</h2>
        <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl glass sm:grid-cols-2 lg:grid-cols-3">
          {facts.map(([term, detail]) => (
            <div key={term} className="bg-raised/40 p-6">
              <dt className="text-eyebrow uppercase text-faint">{term}</dt>
              <dd className="mt-2 text-primary">{detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-20 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-eyebrow uppercase text-faint">Short bio</h2>
          <p className="mt-5 text-muted">
            Swifty Beats is a UK DJ, producer and multi-instrumentalist who fuses
            tabla and dhol heritage with contemporary electronic production.
            Wireless and Glastonbury before twenty, BBC Radio play, and five
            million streams and counting.
          </p>
        </div>
        <div>
          <h2 className="text-eyebrow uppercase text-faint">Long bio</h2>
          <p className="mt-5 text-muted">
            Tabla at six, dhol at seven. At fifteen he co-founded Pure Divine
            Sounds. Before turning twenty he carried South Asian percussion onto
            UK festival main stages including Wireless and Glastonbury. His
            catalogue of remixes, bootlegs and originals has reached BBC Radio
            and passed five million streams, built without a label behind it.
            Very few artists own the intersection of tabla, dhol and electronic
            production; Swifty Beats does.
          </p>
        </div>
      </section>
    </div>
  );
}
