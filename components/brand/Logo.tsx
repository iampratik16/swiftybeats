import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The real Swifty Beats logo (white, transparent — sits on the dark UI).
 * Size it with a height class (e.g. `h-10`) and keep width auto.
 * `glow` adds the warm gold halo used in the preloader and footer.
 */
export function Logo({
  className,
  priority = false,
  glow = false,
  sizes = "240px",
}: {
  className?: string;
  priority?: boolean;
  glow?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src="/assets/brand/logo.png"
      alt="Swifty Beats"
      width={462}
      height={234}
      priority={priority}
      sizes={sizes}
      className={cn(
        "w-auto object-contain",
        glow && "[filter:drop-shadow(0_0_36px_rgba(230,180,90,0.35))]",
        className,
      )}
    />
  );
}
