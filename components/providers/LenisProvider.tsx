"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Module singleton so the mini-player / anchor links can drive scroll and the
// preloader can lock it, without prop-drilling a ref through the tree.
let lenis: Lenis | null = null;

export function lockScroll() {
  lenis?.stop();
}
export function unlockScroll() {
  lenis?.start();
}
export function scrollTo(target: string | number | HTMLElement, offset = 0) {
  if (lenis) lenis.scrollTo(target, { offset, duration: 1.2 });
  else if (typeof target !== "number" && typeof target !== "string") {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Smooth scroll (Lenis) driven by the GSAP ticker so ScrollTrigger stays in
 * lockstep (brief §5). Skipped entirely for reduced-motion users, who get
 * native scroll; ScrollTrigger still works against the native scroller.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: false,
      wheelMultiplier: 1,
    });

    lenis.on("scroll", ScrollTrigger.update);
    // Debug/programmatic handle (anchor links, QA)
    (window as unknown as { lenis?: Lenis }).lenis = lenis;
    const onTick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return <>{children}</>;
}
