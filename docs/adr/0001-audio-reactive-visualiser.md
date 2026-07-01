# ADR 0001: Audio-reactive hero visualiser and the Spotify data constraint

## Status

Accepted.

## Context

The hero needs one genuine audio-reactive moment (brief §8): a WebGL visualiser
that truly responds to sound, not a fake. Two hard constraints apply:

1. Browsers block audio autoplay with sound until a user gesture.
2. The Spotify embed and Web Playback SDK do not expose raw audio frequency
   data to the page, so a visualiser cannot be driven from a Spotify stream.

We also must protect the primary audience (promoters on mid-range mobile) from a
heavy 3D bundle blocking first paint.

## Decision

- Drive the analysis from a **short, self-hosted audio loop** (`lib/links.ts` →
  `audio.featuredLoop`), piped through the Web Audio API `AnalyserNode`. Spotify
  remains the route for full-track listening; it is never the analysis source.
- Render with **React Three Fiber**: a displaced-icosahedron shader field that
  pulses and shades gold → violet → teal across the frequency bands. Custom
  GLSL (simplex-noise displacement + view-space fresnel), not a bar-graph EQ.
- **Idle vs. live is one code path**: when nothing plays, uniforms are fed by
  `sin(time)` synthesis so the form breathes on its own; the first "Listen"
  gesture builds the `AudioContext` lazily and swaps in real `AnalyserNode`
  data. The shader is agnostic to the source.
- **The AnalyserNode is read outside the Canvas** and passed in as a prop —
  R3F runs its own reconciler, so React context does not cross the `<Canvas>`
  boundary.
- **Performance**: the whole WebGL module is `dynamic(..., { ssr:false })`, so
  three.js sits in a lazy chunk (verified: excluded from the home First Load
  JS). DPR is capped (1.5 on coarse pointers / <768px, else 2) and mesh detail
  drops on low-power devices. The Canvas mounts only while the hero is
  on-screen and the tab is visible, freeing the GPU entirely otherwise.
- **Accessibility**: `prefers-reduced-motion` renders a static gold/violet
  gradient and never loads WebGL. Nothing plays with sound on load.

## Consequences

- The reactive visual is honest and self-contained; swapping the approved loop
  is a one-line change in `lib/links.ts`.
- Until the client supplies the loop, the hosted file 404s, the audio status
  becomes `unavailable`, and the "Listen" / mini-player controls deep-link to
  Spotify instead — a graceful, honest fallback.
- A hard vs. hidden gotcha we hit and fixed: the WebGL layer must not use a
  negative z-index over an opaque page background; the hero `section` uses
  `isolate` so the `-z-10` background layer is scoped correctly.
