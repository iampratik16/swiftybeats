"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { timeline } from "@/lib/content";
import { SmartImage } from "@/components/media/SmartImage";
import { SplitText } from "@/components/ui/SplitText";
import { cn } from "@/lib/utils";

/**
 * Origin-story scroll (brief §6.1.3), Silent House editorial style. A numbered
 * row list; hovering a row crossfades the large sticky image panel to that
 * era's atmosphere (Vertex-generated). Mobile shows each image inline.
 */
export function OriginStory() {
  const [active, setActive] = useState(0);
  const current = timeline[active];

  return (
    <section className="mx-auto max-w-7xl px-6 py-28 md:py-40">
      <header className="mb-14 flex items-end justify-between gap-6 md:mb-20">
        <div>
          <p className="text-eyebrow uppercase text-gold">Origin</p>
          <h2 className="mt-5 max-w-2xl text-display font-semibold">
            <SplitText text="From the tabla to the main stage." immediate />
          </h2>
        </div>
        <span className="hidden shrink-0 text-sm text-faint md:block">Age 6 — now</span>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* Editorial list */}
        <ol className="border-t border-white/10" onMouseLeave={() => setActive(0)}>
          {timeline.map((event, i) => {
            const isActive = i === active;
            return (
              <li
                key={event.id}
                onMouseEnter={() => setActive(i)}
                className="group grid grid-cols-[2.75rem_1fr] items-baseline gap-x-4 border-b border-white/10 py-7 md:grid-cols-[3.5rem_1.1fr_1fr] md:gap-x-8 md:py-9"
              >
                <span
                  className={cn(
                    "font-display text-lg tabular-nums transition-colors duration-300 md:text-2xl",
                    isActive ? "text-gold" : "text-faint",
                  )}
                >
                  {event.marker}
                </span>
                <div className="flex items-baseline justify-between gap-4">
                  <h3
                    className={cn(
                      "font-display text-2xl font-medium transition-colors duration-300 md:text-4xl",
                      isActive ? "text-primary" : "text-muted group-hover:text-primary",
                    )}
                  >
                    {event.title}
                  </h3>
                  <span className="hidden shrink-0 text-eyebrow uppercase text-faint md:block">
                    {event.label}
                  </span>
                </div>
                <p className="col-span-2 mt-4 max-w-md text-muted md:col-span-1 md:col-start-3 md:mt-0">
                  {event.body}
                  <span className="relative mt-5 block aspect-[4/3] overflow-hidden rounded-xl lg:hidden">
                    <SmartImage src={event.image} alt={event.title} fill sizes="100vw" />
                  </span>
                </p>
              </li>
            );
          })}
        </ol>

        {/* Sticky image panel (desktop) — crossfades on hover */}
        <div className="hidden lg:block">
          <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-2xl glass">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <SmartImage
                  src={current.image}
                  alt={current.title}
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-eyebrow uppercase text-gold">{current.label}</p>
                  <p className="mt-1 font-display text-2xl text-primary">{current.title}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
