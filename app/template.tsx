"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Per-route enter transition (brief §11). Opacity-only on purpose: a wrapper
 * that transforms would become the containing block for fixed shell elements.
 * The branded curtain wipe lives in the layout, outside this wrapper.
 *
 * CRITICAL: the fade is skipped on the FIRST page load. An `opacity:0` wrapper
 * around the whole page gates LCP for everything inside it (the hero paints only
 * after hydration + the fade) — it was ~440ms of pure render delay. The branded
 * Preloader already covers the first reveal, so the first page renders instantly
 * and only later client-side route changes get the fade.
 */
let hasNavigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const [fade] = useState(hasNavigated);

  useEffect(() => {
    // Every route change after this first mount is a real navigation → fade it.
    hasNavigated = true;
  }, []);

  if (reduced || !fade) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
