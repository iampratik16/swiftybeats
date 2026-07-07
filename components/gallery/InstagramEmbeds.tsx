"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Official Instagram embeds for a fixed set of posts/reels. Renders each
 * permalink as an `.instagram-media` blockquote and loads Instagram's embed.js
 * once — it hydrates the blockquotes into post iframes. embed.js is loaded
 * lazily (only when the grid nears the viewport) so it never blocks first paint.
 * Works for photos, videos and reels with no API token.
 * ponytail: no token/no download — Instagram serves the embed itself.
 */

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

export function InstagramEmbeds({ urls }: { urls: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "500px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!load) return;
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }
    const s = document.createElement("script");
    s.src = "https://www.instagram.com/embed.js";
    s.async = true;
    s.onload = () => window.instgrm?.Embeds.process();
    document.body.appendChild(s);
  }, [load]);

  return (
    <div
      ref={ref}
      className="[column-gap:1.25rem] columns-1 sm:columns-2 lg:columns-3 [&>*]:mb-5"
    >
      {urls.map((url) => (
        <blockquote
          key={url}
          className="instagram-media break-inside-avoid"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{
            background: "#fff",
            border: 0,
            borderRadius: 14,
            margin: 0,
            width: "100%",
            minWidth: 0,
          }}
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            View this post on Instagram
          </a>
        </blockquote>
      ))}
    </div>
  );
}
