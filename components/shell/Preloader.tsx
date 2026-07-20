"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";

const KEY = "sb_preloaded";

/**
 * Preloader (brief §6.1): wordmark + gold progress line, curtain-wipes up to
 * reveal the site. Shown once per session, no auto-sound. Locks scroll via body
 * overflow (reliable regardless of Lenis init timing).
 *
 * This is a real gate, not a fixed timer: the curtain holds until fonts are
 * ready AND the page has fully loaded (`window` load) — so the site is never
 * revealed mid-blank-paint — but is capped at `maxWait` so a slow third-party
 * embed can never trap the visitor behind it. Progress creeps while waiting and
 * snaps to 100 the moment resources are ready (past a short minimum on-screen).
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

    const start = performance.now();
    const maxWait = reduced ? 400 : 1500;
    const minShow = reduced ? 150 : 550;
    let readyAt = 0;
    let raf = 0;

    const tick = (t: number) => {
      const elapsed = t - start;
      const p = readyAt && elapsed >= minShow ? 1 : Math.min(0.92, elapsed / maxWait);
      setProgress(p);
      if (p >= 1) {
        sessionStorage.setItem(KEY, "1");
        window.setTimeout(() => setDone(true), reduced ? 0 : 380);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Ready = fonts loaded + full window load; whichever is slower, capped.
    const markReady = () => {
      if (!readyAt) readyAt = performance.now();
    };
    const fonts = document.fonts?.ready ?? Promise.resolve();
    // On the home page, reveal as soon as the HERO is visible — its video is
    // playing (desktop) or its poster has painted (mobile) — NOT window.load,
    // which waits for heavy third-party embeds (Spotify). On pages with no hero,
    // fall back to window.load (fast there, nothing heavy). First one wins.
    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((r) => window.addEventListener("load", () => r(), { once: true }));
    const heroReady = (window as unknown as { __heroReady?: boolean }).__heroReady
      ? Promise.resolve()
      : new Promise<void>((r) => window.addEventListener("hero-ready", () => r(), { once: true }));
    Promise.all([fonts, Promise.race([heroReady, loaded])]).then(markReady);
    const cap = window.setTimeout(markReady, maxWait);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(cap);
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
          transition={{ duration: reduced ? 0.2 : 0.45, ease: [0.83, 0, 0.17, 1] }}
          aria-hidden
        >
          {/* Plain wrapper (no opacity gate): the wordmark is the loader itself,
              so it must paint immediately — never wait on JS hydration. */}
          <div>
            <Logo glow className="h-16 md:h-20" />
          </div>
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
