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
    id: "tabla",
    marker: "06",
    label: "Tabla",
    title: "It starts on the tabla",
    body: "At six, Swifty's hands find the tabla. Rhythm before melody, discipline before everything.",
    image: "/assets/generated/texture-tabla.avif",
  },
  {
    id: "dhol",
    marker: "07",
    label: "Dhol",
    title: "The dhol answers",
    body: "A year on, the dhol. Louder, heavier, built for the crowd. Two drums set a lifelong tension between the intimate and the enormous.",
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
  "Wireless",
  "Glastonbury",
  "BBC Radio",
  "5M+ Streams",
  "Pure Divine Sounds",
  "Tabla & Dhol",
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
