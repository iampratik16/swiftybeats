/**
 * Single swap point for every external link and handle (brief §7).
 * Handle is @swiftybeats across platforms. Replace the TODO placeholders
 * with the real profile URLs / IDs when the client provides them — nothing
 * else in the codebase should hard-code an external URL.
 */

export const HANDLE = "@swiftybeats";

export const site = {
  name: "Swifty Beats",
  domain: "swiftybeats.com",
  url: "https://swiftybeats.com",
  tagline: "Tabla to techno. UK DJ, producer and multi-instrumentalist.",
} as const;

export const contact = {
  // TODO(client): confirm real inboxes before launch
  bookings: "bookings@swiftybeats.com",
  press: "press@swiftybeats.com",
} as const;

export const socials = {
  // Real profiles (from swiftybeatsofficial.komi.io). SoundCloud/TikTok handles
  // are best-guess placeholders — TODO(client) confirm.
  spotify: "https://open.spotify.com/artist/6wmOEv1HDNNQadm7KoxsOU",
  soundcloud: "https://soundcloud.com/swiftybeats",
  youtube: "https://youtube.com/@SwiftyBeatsOfficial",
  instagram: "https://instagram.com/swiftybeats",
  tiktok: "https://www.tiktok.com/@swiftybeats",
  appleMusic: "https://music.apple.com/artist/PLACEHOLDER",
} as const;

export type SocialKey = keyof typeof socials;

/**
 * Spotify embed helper — dark theme, full-track listening (brief §7).
 * Featured = his real release "Freedom". Cover art served from i.scdn.co.
 */
export const spotify = {
  artistId: "6wmOEv1HDNNQadm7KoxsOU",
  featured: {
    type: "album" as const,
    id: "4ViV6MJIs3DZeLjS7QCMrf", // "Freedom"
    title: "Freedom",
    cover: "https://i.scdn.co/image/ab67616d0000b2735657016372a0fc50612cd069",
  },
  embed(type: "track" | "album" | "artist" | "playlist", id: string) {
    return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
  },
} as const;

/**
 * Short, high-energy clip the client approves, hosted on-site, that drives the
 * audio-reactive visualiser (brief §8). Spotify cannot expose frequency data,
 * so the reactive analysis runs off this file, not the Spotify stream.
 */
export const audio = {
  // TODO(client): drop a 20–40s approved loop here (MP3 + optional WebM/OGG)
  featuredLoop: "/assets/audio/featured-loop.mp3",
} as const;

export const media = {
  youtubeFeaturedId: "IiF49B_iAnw", // from his channel — TODO(client) confirm
} as const;
