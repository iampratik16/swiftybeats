import { socials, spotify } from "./links";

/**
 * Electronic Press Kit data — one reusable template per release. Industry-only
 * (the page is hidden from the main nav and noindexed). Fill in the optional
 * fields (download/assets Dropbox links, press release) as they land; anything
 * left undefined renders a tasteful "available on request" state.
 */

export type EpkStreaming = { id: string; label: string; href: string };

export type EpkRelease = {
  id: string;
  title: string;
  type: string;
  cover: string;
  /** Short press-release blurb. */
  pressRelease?: string;
  streaming: EpkStreaming[];
  /** Song preview via the styled Spotify embed. */
  preview?: { embedType: "album" | "track" | "artist"; embedId: string };
  /** Dropbox / file-share link for hi-res download. Undefined = on request. */
  downloadUrl?: string;
  /** Dropbox / file-share link for any extra release assets. */
  assetsUrl?: string;
};

/** Real bio, drawn only from confirmed facts on the site. */
export const artistBio =
  "Swifty Beats is an Asian House producer and DJ from the UK, working the rare space where South Asian percussion and dhol heritage meet house and electronic production. It starts on the dhol at seven; at fifteen he co-founds Pure Divine Sounds, and before turning twenty he plays landmark UK stages including Wireless and Glastonbury. A catalogue of singles, remixes and bootlegs has reached BBC Radio and passed five million streams, built without a label pushing it.";

/** Press photos — swap for hi-res shots when supplied. */
export const pressPhotos = [
  "/assets/artist/swifty-portrait.jpg",
  "/assets/generated/era-studio.avif",
  "/assets/generated/era-festival.avif",
  "/assets/generated/era-dhol.avif",
];

// Newest first. Archive older EPKs by removing them here.
export const epkReleases: EpkRelease[] = [
  {
    id: "freedom",
    title: "Freedom",
    type: "Single",
    cover: spotify.featured.cover,
    pressRelease:
      "Freedom is the latest single from Swifty Beats, Asian House built for the dancefloor, fusing dhol and South Asian percussion with house and electronic production. Out now on all platforms.",
    streaming: [
      { id: "spotify", label: "Spotify", href: "https://open.spotify.com/album/4ViV6MJIs3DZeLjS7QCMrf" },
      { id: "appleMusic", label: "Apple Music", href: socials.appleMusic },
      { id: "amazonMusic", label: "Amazon Music", href: socials.amazonMusic },
      { id: "youtube", label: "YouTube", href: socials.youtube },
      { id: "soundcloud", label: "SoundCloud", href: socials.soundcloud },
    ],
    preview: { embedType: "album", embedId: "4ViV6MJIs3DZeLjS7QCMrf" },
    // Real, self-hosted press kit (cover + press photos). Downloads on click.
    // Swap for a Dropbox folder link once the client supplies audio/hi-res masters.
    downloadUrl: "/assets/downloads/freedom-press-kit.zip",
    assetsUrl: "/assets/downloads/freedom-press-kit.zip",
  },
];
