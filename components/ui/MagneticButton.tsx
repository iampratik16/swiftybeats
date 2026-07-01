"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "gold" | "glass";
  className?: string;
  cursorLabel?: string;
  ariaLabel?: string;
  strength?: number;
};

/**
 * Magnetic CTA (brief §10) — the element eases toward the pointer on hover.
 * Renders a Link (internal), anchor (external), or button. Magnetism is off
 * for reduced-motion users; the custom cursor reads `data-cursor`.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "gold",
  className,
  cursorLabel = "click",
  ariaLabel,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  function onMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const inner = (
    <span
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300",
        variant === "gold"
          ? "bg-gold text-ink hover:bg-gold-bright"
          : "glass text-primary hover:border-white/20",
        className,
      )}
    >
      {children}
    </span>
  );

  const external = href?.startsWith("http");

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      data-cursor={cursorLabel}
      className="inline-flex will-change-transform"
    >
      {href ? (
        external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
            {inner}
          </a>
        ) : (
          <Link href={href} onClick={onClick} aria-label={ariaLabel}>
            {inner}
          </Link>
        )
      ) : (
        <button type="button" onClick={onClick} aria-label={ariaLabel}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
