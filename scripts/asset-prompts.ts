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

/** Veo hero loop (brief §9.2). Client-supplied prompt. "Vertical" generated as
    16:9 to fit the landscape hero. Person at a production setup, face never
    shown, no drums/percussion. */
export const veoHeroPrompt =
  "Cinematic widescreen clip, dark and moody studio atmosphere. A person sits at a music production setup with a pad controller, keyboard and glowing screens, seen from behind and slightly to the side, hands working over the equipment. The face is never shown, kept out of frame and in shadow. Deep blacks with a warm gold key light and faint violet rim light, soft volumetric haze, shallow depth of field, subtle film grain. Slow, controlled camera push-in with a gentle handheld feel. Premium, atmospheric, understated. No on-screen text, no logos.";

/** Veo negative prompt (client-supplied). */
export const veoNegativePrompt =
  "visible face, facial features, bright daylight, flat lighting, cartoon, low resolution, warped hands, extra fingers, text, watermark, jitter, oversaturated, dhol, tabla, drums, percussion instruments.";
