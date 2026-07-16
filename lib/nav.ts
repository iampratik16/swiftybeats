/** Shared route list (brief §6). Used by the nav and footer. */
export type NavItem = { href: string; label: string };

export const primaryNav: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/music", label: "Music" },
  { href: "/shows", label: "Shows" },
  { href: "/gallery", label: "Gallery" },
  { href: "/press", label: "PR" },
  { href: "/contact", label: "Contact" },
];

export const footerNav: NavItem[] = [
  ...primaryNav,
  { href: "/booking", label: "Booking" },
  { href: "/shop", label: "Shop" },
  { href: "/news", label: "News" },
  // Hidden from the main nav; industry-only EPK / press kit.
  { href: "/epk", label: "Press Kit" },
];
