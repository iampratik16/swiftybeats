"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Word-by-word reveal for headings (brief §3.4, §10): each word fades and rises
 * a touch, staggered. Screen readers get the whole phrase via aria-label.
 *
 * No overflow mask — that clipped descenders (g/y/p) and swallowed inter-word
 * spaces. Instead: fade + small translateY, with the visual className (incl. the
 * text-jewel gradient) on the SAME element that transforms, so background-clip
 * text keeps painting. Spaces are real text nodes between words, so lines wrap
 * and space normally.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  immediate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount rather than on scroll-into-view. Use above the fold. */
  immediate?: boolean;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <span className={className}>{text}</span>;

  // Above-the-fold: CSS-driven, so the reveal plays at first paint and never
  // waits on JS hydration (the heavy bundle delays that).
  if (immediate) {
    return (
      <span className="inline" aria-label={text}>
        {words.map((word, i) => (
          <span key={`${word}-${i}`} aria-hidden className="inline">
            <span
              className={cn("word-rise", className)}
              style={{ animationDelay: `${delay + i * stagger}s` }}
            >
              {word}
            </span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    );
  }

  // Scroll-triggered reveal keeps framer (needs viewport detection).
  return (
    <span className="inline" aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden className="inline">
          <motion.span
            className={cn(className)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: delay + i * stagger }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
