import { socials } from "@/lib/links";
import { socialIcons } from "@/components/brand/SocialIcons";
import { cn } from "@/lib/utils";

const ORDER = ["spotify", "soundcloud", "youtube", "instagram", "tiktok"] as const;
const LABELS: Record<(typeof ORDER)[number], string> = {
  spotify: "Spotify",
  soundcloud: "SoundCloud",
  youtube: "YouTube",
  instagram: "Instagram",
  tiktok: "TikTok",
};

export function SocialLinks({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) {
  return (
    <ul className={cn("flex items-center gap-5", className)}>
      {ORDER.map((key) => {
        const Icon = socialIcons[key];
        return (
          <li key={key}>
            <a
              href={socials[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={LABELS[key]}
              data-cursor="visit"
              className="block text-muted transition-colors duration-300 hover:text-gold"
            >
              <Icon className={cn("h-5 w-5", iconClassName)} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
