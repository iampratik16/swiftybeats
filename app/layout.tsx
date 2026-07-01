import type { Metadata, Viewport } from "next";
import { clashDisplay, satoshi } from "./fonts";
import "./globals.css";
import { site, socials } from "@/lib/links";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { AudioProvider } from "@/components/providers/AudioProvider";
import { Nav } from "@/components/shell/Nav";
import { Footer } from "@/components/shell/Footer";
import { Preloader } from "@/components/shell/Preloader";
import { MiniPlayer } from "@/components/shell/MiniPlayer";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Swifty Beats · UK DJ, Producer and Multi-instrumentalist",
    template: "%s · Swifty Beats",
  },
  description:
    "The official site of Swifty Beats, a UK DJ, producer and multi-instrumentalist fusing tabla and dhol heritage with contemporary electronic production. Book for clubs, festivals and brand events.",
  keywords: [
    "Swifty Beats",
    "UK DJ",
    "music producer",
    "tabla",
    "dhol",
    "South Asian electronic",
    "festival DJ",
    "DJ booking",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: "Swifty Beats · UK DJ, Producer and Multi-instrumentalist",
    description:
      "Tabla to techno. South Asian percussion heritage fused with contemporary electronic production.",
    images: [{ url: "/assets/generated/og.jpg", width: 1200, height: 630, alt: "Swifty Beats" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swifty Beats",
    description: "Tabla to techno. UK DJ, producer and multi-instrumentalist.",
    images: ["/assets/generated/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: site.name,
  url: site.url,
  genre: ["Electronic", "Bass", "South Asian fusion"],
  description:
    "UK DJ, producer and multi-instrumentalist fusing tabla and dhol heritage with contemporary electronic production.",
  sameAs: [socials.spotify, socials.soundcloud, socials.youtube, socials.instagram, socials.tiktok],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${clashDisplay.variable} ${satoshi.variable}`}>
      <head>
        <link rel="preconnect" href="https://open.spotify.com" />
        <link rel="preconnect" href="https://w.soundcloud.com" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        <AudioProvider>
          <LenisProvider>
            <Preloader />
            <Nav />
            <main id="main">{children}</main>
            <Footer />
            <MiniPlayer />
          </LenisProvider>
        </AudioProvider>
        <div className="fx-grain" aria-hidden />
        <div className="fx-vignette" aria-hidden />
      </body>
    </html>
  );
}
