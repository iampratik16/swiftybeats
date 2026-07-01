import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

// Tiny dark placeholder so image boxes read as intentional shadow, never white
// flash, while the real AVIF/WebP streams in. Per-asset blurDataURL overrides.
export const DARK_BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

type SmartImageProps = ImageProps & {
  /** Wrapper aspect ratio helper, e.g. "aspect-[4/5]" */
  ratioClassName?: string;
};

/**
 * next/image with the media-speed defaults baked in (brief §11): modern
 * formats (config), lazy by default, dark blur placeholder, sane `sizes`.
 * Everything else passes straight through.
 */
export function SmartImage({
  className,
  ratioClassName,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  placeholder = "blur",
  blurDataURL = DARK_BLUR,
  quality = 82,
  alt,
  ...props
}: SmartImageProps) {
  return (
    <Image
      alt={alt}
      sizes={sizes}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      quality={quality}
      className={cn("object-cover", ratioClassName, className)}
      {...props}
    />
  );
}
