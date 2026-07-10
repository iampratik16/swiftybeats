import { z } from "zod";
import { socials } from "./links";

/**
 * Typed local content, validated with Zod at module load (brief §5).
 * A malformed entry throws on import — that parse IS the content-loader test.
 * Clean seam to graduate to Sanity later: swap these arrays for a fetch.
 *
 * British English, no em-dashes, real facts only (brief §1, §14).
 */

/* ----------------------------- Origin story ----------------------------- */
const TimelineEvent = z.object({
  id: z.string(),
  marker: z.string(), // big typographic marker: an age, then a milestone
  label: z.string(), // eyebrow
  title: z.string(),
  body: z.string(),
  image: z.string(), // atmospheric era image (Vertex-generated)
});
export type TimelineEvent = z.infer<typeof TimelineEvent>;

export const timeline = z.array(TimelineEvent).parse([
  {
    id: "dhol",
    marker: "DHOL",
    label: "Dhol",
    title: "It starts on the dhol",
    body: "Rhythm before melody, discipline before everything. Loud, heavy, built for the crowd, the drum sets a lifelong pull between the intimate and the enormous.",
    image: "/assets/generated/era-dhol.avif",
  },
  {
    id: "pds",
    marker: "15",
    label: "P.D.S",
    title: "Pure Divine Sounds",
    body: "At fifteen he co-founds P.D.S, turning a bedroom obsession into a collective and a name that travels.",
    image: "/assets/generated/era-studio.avif",
  },
  {
    id: "festivals",
    marker: "LIVE",
    label: "Festivals",
    title: "Wireless. Glastonbury.",
    body: "Before turning twenty he plays landmark UK stages, carrying South Asian percussion into main-stage electronic sets.",
    image: "/assets/generated/era-festival.avif",
  },
  {
    id: "radio",
    marker: "BBC",
    label: "Broadcast",
    title: "On the radio",
    body: "Original tracks and edits reach BBC Radio, moving the sound from the club to the airwaves.",
    image: "/assets/generated/era-broadcast.avif",
  },
  {
    id: "streams",
    marker: "5M+",
    label: "Streams",
    title: "Five million and counting",
    body: "A catalogue of remixes, bootlegs and originals passes five million streams, built without a label pushing it.",
    image: "/assets/generated/era-streams.avif",
  },
]);

/* ------------------------- Credentials marquee -------------------------- */
// True credentials only — no invented festival names (brief §14).
export const credentials = [
  "Asian House Production",
  "Wireless",
  "Glastonbury",
  "BBC Radio",
  "5M+ Streams",
  "Pure Divine Sounds",
  "Dhol & Percussion",
  "UK Tours",
  "Remixes & Bootlegs",
] as const;

/* --------------------------- Music platforms ---------------------------- */
const MusicPlatform = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  href: z.url(),
});
export type MusicPlatform = z.infer<typeof MusicPlatform>;

export const musicPlatforms = z.array(MusicPlatform).parse([
  { id: "spotify", name: "Spotify", role: "Singles and originals", href: socials.spotify },
  { id: "soundcloud", name: "SoundCloud", role: "Remixes and bootlegs", href: socials.soundcloud },
  { id: "youtube", name: "YouTube", role: "Videos and visuals", href: socials.youtube },
]);

/* ------------------------------ Releases -------------------------------- */
// Real releases from his Spotify (covers on i.scdn.co). Ma Penzi links to his
// artist page (no direct track ID to hand) — TODO(client) confirm links.
const Release = z.object({
  id: z.string(),
  title: z.string(),
  type: z.string(),
  cover: z.url(),
  href: z.url(),
});
export type Release = z.infer<typeof Release>;

export const releases = z.array(Release).parse([
  {
    id: "freedom",
    title: "Freedom",
    type: "Single",
    cover: "https://i.scdn.co/image/ab67616d0000b2735657016372a0fc50612cd069",
    href: "https://open.spotify.com/album/4ViV6MJIs3DZeLjS7QCMrf",
  },
  {
    id: "ma-penzi",
    title: "Ma Penzi",
    type: "Single",
    cover: "https://i.scdn.co/image/ab67616d0000b273534e0af82fccf47abd8fb10d",
    href: "https://open.spotify.com/artist/6wmOEv1HDNNQadm7KoxsOU",
  },
]);

/* --------------------------- Featured release --------------------------- */
// No fabricated title/stats — the styled Spotify embed carries the real track
// once its ID is set in lib/links.ts. Copy talks about the sound, not a name.
export const featuredRelease = {
  eyebrow: "Latest release",
  title: "Freedom",
  body: "Out now on Spotify. Full-track listening, straight from the source. Press play and let it run.",
} as const;

/* -------------------------------- Shows --------------------------------- */
// Live dates. Empty for now — the /shows page shows a "coming soon" hero while
// this is empty and switches to a dated list automatically once entries land.
// Add a show here and it appears with no redesign. Dates: ISO "YYYY-MM-DD".
const Show = z.object({
  id: z.string(),
  date: z.string(),
  venue: z.string(),
  city: z.string(),
  ticketUrl: z.url().optional(),
});
export type Show = z.infer<typeof Show>;

export const shows = z.array(Show).parse([]);
