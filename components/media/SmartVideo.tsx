"use client";

import { useEffect, useRef, useState } from "react";
import { SmartImage } from "./SmartImage";
import { cn } from "@/lib/utils";

export type VideoSource = { src: string; type: string };

type SmartVideoProps = {
  /** Ordered by preference, e.g. WebM before MP4 */
  sources: VideoSource[];
  /** Lighter cut used below 768px (e.g. a 480p encode). Falls back to `sources`. */
  mobileSources?: VideoSource[];
  poster: string;
  alt?: string;
  className?: string;
  posterSizes?: string;
  priority?: boolean;
  /** Preload margin before the element enters the viewport */
  rootMargin?: string;
  /** object-fit: "cover" fills+crops (default), "contain" shows the whole frame */
  fit?: "cover" | "contain";
  /** Controlled mute. Must start muted for mobile autoplay; flip to unmute. */
  muted?: boolean;
  /**
   * Fill the whole box with a blurred, scaled copy of the video behind the main
   * one. Lets a `fit="contain"` clip read full-bleed (every pixel is video) with
   * the complete frame still uncropped and sharp in the centre. No black bars.
   */
  blurBackdrop?: boolean;
};

/**
 * Facade video (brief §8, §11). Poster paints immediately; the real <video>
 * mounts only when near the viewport (preload="none" until then), autoplays
 * muted, and pauses when off-screen or the tab is hidden. Reduced-motion users
 * get the poster only and no video is ever fetched.
 */
export function SmartVideo({
  sources,
  mobileSources,
  poster,
  alt = "",
  className,
  posterSizes = "100vw",
  priority = false,
  rootMargin = "300px",
  fit = "cover",
  muted = true,
  blurBackdrop = false,
}: SmartVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useRef(false);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  // Phones load a lighter cut (mobileSources) rather than the full desktop clip.
  const [small, setSmall] = useState(false);
  const firedReady = useRef(false);

  // Tell the Preloader the hero is visible so it can lift the curtain. Fired
  // once — when the video starts playing (desktop) or when the poster paints
  // (mobile / reduced-motion, where no video ever loads). priority hero only.
  const signalReady = () => {
    if (priority && !firedReady.current) {
      firedReady.current = true;
      (window as unknown as { __heroReady?: boolean }).__heroReady = true;
      window.dispatchEvent(new Event("hero-ready"));
    }
  };

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const width = window.matchMedia("(max-width: 767px)");
    const sync = () => {
      setReduced(motion.matches);
      setSmall(width.matches);
    };
    sync();
    motion.addEventListener("change", sync);
    width.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      width.removeEventListener("change", sync);
    };
  }, []);

  // Reduced-motion users get the poster only; everyone else gets a video —
  // phones the lighter mobileSources cut, desktop the full sources.
  const skipVideo = reduced;
  const activeSources = small && mobileSources ? mobileSources : sources;

  useEffect(() => {
    if (skipVideo) return; // no video for reduced-motion users
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          setLoad(true);
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [skipVideo, rootMargin]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) videoRef.current?.pause();
      else if (inView.current) videoRef.current?.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Reflect controlled mute onto the element (React's `muted` attr alone is
  // unreliable). Unmuting is triggered by a click, so the audio is allowed.
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted, load]);

  const fitClass = fit === "contain" ? "object-contain" : "object-cover";

  return (
    <div
      ref={wrapRef}
      className={cn("relative overflow-hidden", blurBackdrop ? "bg-base" : "bg-raised", className)}
    >
      {/* Blurred, scaled full-bleed backdrop so a contained clip still covers the
          whole box. Static blurred poster first; the live blurred video fades
          in over it once loaded (same file — one fetch, decoded twice). */}
      {blurBackdrop && (
        <>
          <SmartImage
            src={poster}
            alt=""
            fill
            sizes={posterSizes}
            priority={priority}
            aria-hidden
            className="scale-125 object-cover blur-2xl brightness-[0.55]"
          />
          {load && !skipVideo && (
            <video
              muted
              loop
              playsInline
              autoPlay
              preload="none"
              aria-hidden="true"
              className={cn(
                "absolute inset-0 h-full w-full scale-125 object-cover blur-2xl brightness-[0.55] transition-opacity duration-700 ease-out",
                ready ? "opacity-100" : "opacity-0",
              )}
            >
              {activeSources.map((s) => (
                <source key={`bg-${s.src}`} src={s.src} type={s.type} />
              ))}
            </video>
          )}
        </>
      )}

      <SmartImage
        src={poster}
        alt={alt}
        fill
        sizes={posterSizes}
        priority={priority}
        // Reduced-motion: no video loads, so the poster IS the hero — signal
        // the Preloader as soon as it paints.
        onLoad={() => { if (skipVideo) signalReady(); }}
        className={cn(
          fitClass,
          "transition-opacity duration-700 ease-out",
          ready ? "opacity-0" : "opacity-100",
        )}
      />
      {load && !skipVideo && (
        <video
          ref={videoRef}
          muted={muted}
          loop
          playsInline
          autoPlay
          preload="none"
          aria-hidden="true"
          onPlaying={() => { setReady(true); signalReady(); }}
          onCanPlay={() => videoRef.current?.play().catch(() => {})}
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-700 ease-out",
            fitClass,
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          {activeSources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      )}
    </div>
  );
}
