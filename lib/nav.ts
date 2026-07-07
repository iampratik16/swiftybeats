/** Shared route list (brief §6). Used by the nav and footer. */
export type NavItem = { href: string; label: string };

export const primaryNav: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/music", label: "Music" },
  { href: "/shows", label: "Shows" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export const footerNav: NavItem[] = [
  ...primaryNav,
  { href: "/press", label: "Press" },
  { href: "/booking", label: "Booking" },
  { href: "/shop", label: "Shop" },
  { href: "/news", label: "News" },
];
