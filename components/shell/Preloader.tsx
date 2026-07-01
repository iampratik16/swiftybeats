"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";

const KEY = "sb_preloaded";

/**
 * Preloader (brief §6.1): wordmark + gold progress line, curtain-wipes up to
 * reveal the site. Shown once per session, kept under ~1.5s, no auto-sound.
 * Locks scroll via body overflow (reliable regardless of Lenis init timing).
 */
export function Preloader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) {
      setDone(true);
      return;
    }
    document.body.style.overflow = "hidden";
    const total = reduced ? 350 : 1100;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / total);
      setProgress(p);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem(KEY, "1");
        window.setTimeout(() => setDone(true), reduced ? 0 : 380);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [reduced]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-base"
          initial={{ opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: reduced ? 0.2 : 0.9, ease: [0.83, 0, 0.17, 1] }}
          aria-hidden
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Logo glow priority className="h-16 md:h-20" sizes="320px" />
          </motion.div>
          <div className="mt-8 h-px w-56 overflow-hidden bg-white/10">
            <motion.div
              className="h-full origin-left bg-gold"
              style={{ scaleX: progress }}
            />
          </div>
          <span className="mt-3 text-xs tabular-nums text-faint">
            {Math.round(progress * 100)}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
