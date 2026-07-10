"use client";

import { useEffect, useRef, useState } from "react";
import { SmartImage } from "./SmartImage";
import { cn } from "@/lib/utils";

export type VideoSource = { src: string; type: string };

type SmartVideoProps = {
  /** Ordered by preference, e.g. WebM before MP4 */
  sources: VideoSource[];
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

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return; // never fetch video for reduced-motion users
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
  }, [reduced, rootMargin]);

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
          {load && !reduced && (
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
              {sources.map((s) => (
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
        className={cn(
          fitClass,
          "transition-opacity duration-700 ease-out",
          ready ? "opacity-0" : "opacity-100",
        )}
      />
      {load && !reduced && (
        <video
          ref={videoRef}
          muted={muted}
          loop
          playsInline
          autoPlay
          preload="none"
          poster={poster}
          aria-hidden="true"
          onPlaying={() => setReady(true)}
          onCanPlay={() => videoRef.current?.play().catch(() => {})}
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-700 ease-out",
            fitClass,
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      )}
    </div>
  );
}
