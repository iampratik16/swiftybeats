import localFont from "next/font/local";
import { Fraunces } from "next/font/google";

// Warm italic editorial accent (the Fraunces flourish approved in the Palace
// concept). Only the italic 400/500 are used, for the odd accented word.
export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

// Self-hosted from Fontshare (see brief 3.4). Variable weights subset to Latin.
// Exposed as CSS variables so the Tailwind @theme tokens can reference them.
export const clashDisplay = localFont({
  src: [
    { path: "../public/fonts/ClashDisplay-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/ClashDisplay-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/ClashDisplay-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/ClashDisplay-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const satoshi = localFont({
  src: [
    { path: "../public/fonts/Satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Satoshi-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});
