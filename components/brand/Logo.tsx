import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Swifty Beats logo — the brand wordmark artwork (white on transparent). Sized
 * by a height class (e.g. `h-6`); width follows the ~2.88:1 aspect. `glow` adds
 * the warm gold halo. Shared by the nav, footer, preloader and hero.
 */
export function Logo({
  className,
  glow = false,
  priority = false,
  sizes,
}: {
  className?: string;
  priority?: boolean;
  glow?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src="/assets/brand/logo-white.png"
      alt="Swifty Beats"
      width={1611}
      height={560}
      priority={priority}
      sizes={sizes}
      className={cn(
        "block h-8 w-auto",
        glow && "[filter:drop-shadow(0_0_36px_rgba(230,180,90,0.35))]",
        className,
      )}
    />
  );
}
