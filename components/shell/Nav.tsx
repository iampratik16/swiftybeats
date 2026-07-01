"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { primaryNav, footerNav } from "@/lib/nav";
import { Logo } from "@/components/brand/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

/**
 * Glass nav (brief §6.1, §11). Larger, and fixed/visible throughout — it no
 * longer hides on scroll; it just deepens its frost once scrolled. A busy
 * promoter can reach "Book Swifty" in one tap from anywhere.
 */
export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-5">
        <nav
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3.5 transition-all duration-500 md:px-7 md:py-4",
            scrolled ? "glass glass-strong" : "glass",
          )}
        >
          <Link href="/" aria-label="Swifty Beats, home" className="flex items-center">
            <Logo className="h-9 md:h-10" priority sizes="180px" />
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative text-[15px] text-muted transition-colors hover:text-primary",
                    active && "text-primary",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100",
                      active && "scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <MagneticButton href="/booking" cursorLabel="book" className="px-6 py-3 text-sm">
                Book Swifty
              </MagneticButton>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative flex h-12 w-12 items-center justify-center rounded-full glass md:hidden"
            >
              <span className="sr-only">Menu</span>
              <span className="relative block h-3.5 w-6">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-full bg-primary transition-transform duration-300",
                    open && "translate-y-[7px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-full bg-primary transition-transform duration-300",
                    open && "-translate-y-[7px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass fixed inset-0 z-40 flex flex-col justify-center gap-1 px-8 md:hidden"
          >
            {footerNav.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "font-display text-4xl font-medium tracking-tight transition-colors",
                    pathname === item.href ? "text-gold" : "text-primary",
                  )}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <div className="mt-8">
              <MagneticButton href="/booking">Book Swifty</MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
