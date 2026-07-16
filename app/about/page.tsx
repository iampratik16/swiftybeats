import type { Metadata } from "next";
import { SmartImage } from "@/components/media/SmartImage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { Waveband } from "@/components/ui/Waveband";

export const metadata: Metadata = {
  title: "About",
  description:
    "Swifty Beats is an Asian House producer and DJ. Dhol at seven, P.D.S at fifteen. Wireless and Glastonbury before twenty, BBC Radio play and five million streams. South Asian percussion fused with house.",
};

const facts = [
  ["5M+", "Streams", "text-gold"],
  ["7", "First dhol", "text-teal"],
  ["2", "Landmark festivals", "text-rose"],
];

export default function AboutPage() {
  return (
    <div className="pb-28 pt-40 md:pt-48">
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        <div>
          <div className="flex items-center gap-4">
            <p className="text-eyebrow uppercase text-gold">Asian House Producer · UK DJ</p>
            <Waveband className="h-4" />
          </div>
          <h1 className="mt-6 text-hero font-semibold leading-[0.92]">
            <SplitText text="Percussion to" immediate />{" "}
            <SplitText text="house." immediate className="accent font-normal text-jewel" />
          </h1>
          <p className="mt-7 max-w-lg text-lg text-muted">
            Swifty Beats is an Asian House producer and DJ, working the rare
            space where South Asian percussion and dhol heritage meet house and
            electronic production.
          </p>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {facts.map(([big, small, colour]) => (
              <div key={small}>
                <dt className={`font-display text-3xl font-semibold ${colour}`}>{big}</dt>
                <dd className="text-sm text-faint">{small}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl tile-surface md:aspect-[5/6] lg:aspect-[4/5]">
            <SmartImage
              src="/assets/artist/swifty-portrait.jpg"
              alt="Swifty Beats in the studio"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="ken-burns"
            />
          </div>
        </Reveal>
      </section>

      {/* Story */}
      <section className="mx-auto mt-28 max-w-3xl px-6">
        <div className="space-y-6 text-lg leading-relaxed text-muted">
          <Reveal>
            <p>
              It started as a dream, dhol in hand at a school assembly, seven
              years old. That same instrument would go on to carry him to stages
              worldwide. Loud, heavy, built for the crowd: the beginning of a
              lifelong obsession with rhythm that runs through everything he
              makes.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p>
              At fifteen he co-founded Pure Divine Sounds, turning a bedroom setup
              into a collective and a name that travels. By the time he turned
              twenty he had played Wireless and Glastonbury, carrying dhol and
              South Asian percussion into main-stage electronic sets.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              The catalogue spans remixes, bootlegs and original music. Tracks
              have reached BBC Radio, and the streams have passed five million,
              built without a label pushing it.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              That heritage is the foundation for what comes next. Asian House
              Volume 1, the debut EP, keeps dhol and South Asian rhythm at the
              centre while pushing the production further than ever. Lead single
              &apos;Let Me Go&apos; lands 31 July.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-16" delay={0.05}>
          <blockquote className="border-l-2 border-gold pl-6 font-display text-title font-medium text-primary">
            &ldquo;Very few artists occupy the space where dhol and South Asian
            percussion meet contemporary house and electronic production. Swifty
            Beats built a career there.&rdquo;
            <cite className="mt-4 block text-eyebrow uppercase not-italic text-faint">
              Supreme Music Group
            </cite>
          </blockquote>
        </Reveal>
      </section>

      {/* Atmosphere strip */}
      <section className="mx-auto mt-24 grid max-w-6xl grid-cols-2 gap-4 px-6 md:grid-cols-3">
        {[
          ["/assets/generated/era-dhol.avif", "Dhol"],
          ["/assets/generated/era-studio.avif", "Studio"],
          ["/assets/generated/era-festival.avif", "Live"],
        ].map(([src, label]) => (
          <div key={label} className="group relative aspect-[4/5] overflow-hidden rounded-xl tile-surface md:aspect-square">
            <SmartImage
              src={src}
              alt={label}
              fill
              sizes="33vw"
              className="transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span className="absolute bottom-3 left-3 text-eyebrow uppercase text-gold">
              {label}
            </span>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="mx-auto mt-24 flex max-w-6xl flex-wrap items-center gap-4 px-6">
        <MagneticButton href="/booking" cursorLabel="book">
          Book Swifty
        </MagneticButton>
        <MagneticButton href="/press" variant="glass" cursorLabel="view">
          Press and EPK
        </MagneticButton>
      </section>
    </div>
  );
}
