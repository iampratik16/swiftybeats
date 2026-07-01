"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

let warmed = false;
function warmConnections() {
  if (warmed || typeof document === "undefined") return;
  warmed = true;
  for (const href of ["https://www.youtube-nocookie.com", "https://i.ytimg.com"]) {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = href;
    document.head.appendChild(link);
  }
}

/**
 * Lite YouTube embed (brief §7). Ships a thumbnail, not the ~1MB player. The
 * iframe is injected only on click; preconnect fires on hover so play is warm.
 */
export function YouTubeFacade({
  videoId,
  title,
  className,
}: {
  videoId: string;
  title: string;
  className?: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <div
      className={cn(
        "group relative aspect-video overflow-hidden rounded-2xl bg-raised",
        className,
      )}
      onPointerEnter={warmConnections}
      onFocus={warmConnections}
    >
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          loading="lazy"
          allow="accelerated-download; autoplay; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Play video: ${title}`}
          className="absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static YT thumb, no optimisation needed */}
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full scale-105 object-cover opacity-80 transition duration-700 group-hover:scale-100 group-hover:opacity-100"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-base/40 backdrop-blur transition duration-500 group-hover:scale-110 group-hover:border-gold">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="var(--color-gold)" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
