# ADR 0002: Content layer

## Status

Accepted.

## Context

The site changes only every few months (brief §5). Content is small and
structured: an origin-story timeline, a credentials band, release/music
pointers, tour dates. We want type safety and validation without standing up a
heavy CMS, and a clean seam to graduate to a hosted CMS later if the client
wants self-editing.

## Decision

Use **typed local content in TypeScript, validated with Zod at module load**
(`lib/content.ts`). Each dataset is defined as a Zod schema and `.parse()`d on
import, so a malformed entry throws at build/boot rather than rendering wrong.
That parse doubles as the content-loader test the brief asks for.

Rejected alternatives:

- **A hosted CMS (Sanity, etc.) now** — over-engineered for content that
  changes quarterly and is edited by developers for the foreseeable future.
- **MDX for structured data** — MDX is right for prose (the future News/Blog),
  but the timeline/releases are records, better modelled as typed data.
- **Contentlayer/Velite build step** — unnecessary indirection for this volume;
  a typed module with Zod gives the same guarantees with zero build tooling.

## Consequences

- Editing content means a code change and redeploy. Acceptable at this cadence.
- The seam to a CMS is clean: replace the exported arrays in `lib/content.ts`
  with a typed fetch behind the same Zod schemas; nothing downstream changes.
- All copy lives in one reviewable place, which keeps the "British English, no
  em-dashes, real facts only" rules (brief §14) easy to enforce.
- External URLs and handles are deliberately kept separate in `lib/links.ts` so
  the client's real links swap in one file.
