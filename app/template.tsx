"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Per-route enter transition (brief §11). Opacity-only on purpose: a wrapper
 * that transforms would become the containing block for fixed shell elements.
 * The branded curtain wipe lives in the layout, outside this wrapper.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
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
