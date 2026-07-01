/**
 * Prompt library for Vertex AI asset generation (brief §9).
 * Generated imagery is ABSTRACT, TEXTURAL or ENVIRONMENTAL only — never a fake
 * photo of the artist (brief §9, §14). Dark, premium, no text, no faces.
 */

export type ImagenAsset = {
  id: string;
  prompt: string;
  aspectRatio: "1:1" | "16:9" | "9:16" | "4:3" | "3:4";
  /** og gets the wordmark composited and is saved as JPEG at 1200x630 */
  kind: "texture" | "backdrop" | "og" | "artwork";
};

export const imagenAssets: ImagenAsset[] = [
  {
    id: "texture-tabla",
    kind: "texture",
    aspectRatio: "16:9",
    prompt:
      "Extreme macro photograph of a tabla drum skin, deep shadow, single warm gold rim light, fine dust particles in the air, near-black background, cinematic, high detail, moody, premium, no text, no people.",
  },
  {
    id: "backdrop-gold-haze",
    kind: "backdrop",
    aspectRatio: "16:9",
    prompt:
      "Abstract dark atmosphere, drifting gold dust and soft volumetric haze over deep near-black, faint warm bokeh, cinematic, premium, minimal, no text, no people.",
  },
  {
    id: "backdrop-violet",
    kind: "backdrop",
    aspectRatio: "16:9",
    prompt:
      "Abstract dark haze with a faint electric violet glow and drifting gold particles, deep blacks, cinematic volumetric light, premium, minimal, no text, no people.",
  },
  {
    id: "artwork-featured",
    kind: "artwork",
    aspectRatio: "1:1",
    prompt:
      "Abstract dark premium album artwork, a single warm gold light bloom over near-black, fine grain, faint violet edge, minimal, cinematic, no text, no people.",
  },
  {
    id: "og",
    kind: "og",
    aspectRatio: "16:9",
    prompt:
      "Moody abstract close-up of a dark club atmosphere, drifting gold particles and soft violet light, deep blacks, shallow depth of field, cinematic, premium, no text, no faces.",
  },
  // Origin-story era imagery (Silent House editorial layout). Environmental only.
  {
    id: "era-dhol",
    kind: "texture",
    aspectRatio: "4:3",
    prompt:
      "Extreme macro of a dhol drum, taut skin and rope lacing, deep shadow, warm gold rim light, dust in the air, near-black background, cinematic, premium, no text, no people.",
  },
  {
    id: "era-studio",
    kind: "texture",
    aspectRatio: "4:3",
    prompt:
      "Dark music studio atmosphere, a mixing desk and faders lit by a single warm lamp, deep shadows, gold glow, moody, cinematic, premium, no text, no people, no faces.",
  },
  {
    id: "era-festival",
    kind: "texture",
    aspectRatio: "4:3",
    prompt:
      "Festival main stage at night seen from behind the crowd, silhouetted raised hands, warm gold and faint violet stage haze, deep blacks, cinematic, premium, no text, no identifiable faces.",
  },
  {
    id: "era-broadcast",
    kind: "texture",
    aspectRatio: "4:3",
    prompt:
      "Abstract radio broadcast concept, glowing concentric sound waves in warm gold over deep near-black, subtle grain, cinematic, premium, minimal, no text, no people.",
  },
  {
    id: "era-streams",
    kind: "texture",
    aspectRatio: "4:3",
    prompt:
      "Abstract streams of warm gold light particles flowing through dark space, motion and depth, cinematic, premium, minimal, no text, no people.",
  },
];

/** Veo hero loop (brief §9.2). Short, dark, seamless, no faces in focus. */
export const veoHeroPrompt =
  "Slow cinematic loop, dark club atmosphere, abstract close-ups: hands moving over DJ decks dissolving into a tabla being played, drifting gold particles and soft volumetric haze, deep blacks with warm gold and faint violet light, shallow depth of field, no faces in focus, premium, moody, seamless loop, no text.";
