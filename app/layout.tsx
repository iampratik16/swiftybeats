import type { Metadata, Viewport } from "next";
import { clashDisplay, satoshi, fraunces } from "./fonts";
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
    default: "Swifty Beats · Asian House Producer and DJ",
    template: "%s · Swifty Beats",
  },
  description:
    "The official site of Swifty Beats, an Asian House producer and DJ from the UK. South Asian percussion and dhol heritage fused with house and electronic production. Book for clubs, festivals and brand events.",
  keywords: [
    "Swifty Beats",
    "Asian House",
    "Asian House producer",
    "Asian House DJ",
    "UK DJ",
    "house music",
    "dhol",
    "South Asian electronic",
    "DJ booking",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: "Swifty Beats · Asian House Producer and DJ",
    description:
      "Asian House. South Asian percussion heritage fused with house and electronic production.",
    images: [{ url: "/assets/generated/og.jpg", width: 1200, height: 630, alt: "Swifty Beats" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swifty Beats · Asian House Producer",
    description: "Asian House. South Asian percussion meets electronic production.",
    images: ["/assets/generated/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#140f0c",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: site.name,
  url: site.url,
  genre: ["Asian House", "House", "Electronic", "South Asian fusion"],
  description:
    "Asian House producer and DJ from the UK, fusing dhol and South Asian percussion heritage with house and electronic production.",
  sameAs: [socials.spotify, socials.soundcloud, socials.youtube, socials.instagram, socials.tiktok],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${clashDisplay.variable} ${satoshi.variable} ${fraunces.variable}`}>
      <head>
        <link rel="preconnect" href="https://open.spotify.com" />
        <link rel="preconnect" href="https://open.spotifycdn.com" crossOrigin="" />
        <link rel="preconnect" href="https://i.scdn.co" crossOrigin="" />
        <link rel="preconnect" href="https://w.soundcloud.com" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="preconnect" href="https://www.instagram.com" />
        <link rel="preconnect" href="https://scontent.cdninstagram.com" crossOrigin="" />
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
