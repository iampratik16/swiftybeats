# Swifty Beats — Foundation + Home slice (design)

Date: 2026-07-01

## Scope of this slice

The first vertical slice of the Awwwards-grade Swifty Beats site (full brief in
`docs/build-brief.md`). Delivered to a high standard:

- Production scaffold: Next.js 15 (App Router, TS strict), Tailwind v4 token
  system, self-hosted Clash Display + Satoshi, Lenis smooth scroll, film-grain +
  vignette, glassmorphism utilities.
- App shell: glass nav (scroll hide/show + mobile drawer), kinetic footer with
  newsletter capture, custom cursor, preloader, page transition, persistent
  glass mini-player.
- Ultra-fast media layer: `SmartImage` (AVIF/WebP + blur), `SmartVideo`
  (poster-first facade, loads on view, pauses off-screen/hidden), `YouTubeFacade`.
- Flagship Home: audio-reactive WebGL hero (R3F, dynamic, `AnalyserNode`), Veo
  loop behind it, origin-story scroll (GSAP scrubbed spine + parallax markers),
  featured release (styled Spotify embed), music platform cards, credentials
  marquee, booking CTA band.
- 8 remaining routes stubbed on-brand (real bio facts, "enquire to book" tour
  state, launch-ready Shop capture) and wired into nav/footer.
- Vertex AI assets: Imagen textures/backdrops/OG + Veo hero loop, optimised and
  committed under `public/assets/`.
- SEO (metadata, OG, JSON-LD, sitemap, robots), a11y baseline, 3 ADRs.

## Key architecture decisions

- **Tokens** in Tailwind v4 `@theme` (declared once, utilities generated). Note
  the `--color-ink` token exists so `text-base` stays a font-size (avoids the v4
  size/colour name clash).
- **Audio graph** built lazily on first gesture; analyser read outside `<Canvas>`
  and passed as a prop (React context does not cross the R3F boundary). See
  ADR 0001.
- **Content** is typed TS validated with Zod at import (ADR 0002). External URLs
  isolated in `lib/links.ts` (single swap point).
- **Forms**: shared Zod schemas, honeypot, Resend delivery, honest no-key
  degradation (ADR 0003).
- **Hero stacking**: the `-z-10` WebGL layer must be scoped with `isolate` on the
  section, or it paints behind the opaque body background.

## Known follow-ups (next slices)

Full Music/Releases grid, Tour with Event JSON-LD, Gallery + lightbox, the full
booking form (schema already in `lib/schemas.ts`), Press EPK downloads, Shop
integration, News/MDX. Rate limiting to land with the booking form. Real artist
media and live links swap into `lib/links.ts` + `public/assets/`.

## Running

```
npm run dev              # local
npm run build            # production build (Core Web Vitals target)
npm run typecheck        # tsc --noEmit
npm run lint             # eslint
npm run generate:assets  # Vertex Imagen (add --veo for the hero loop)
```

Env for delivery: `RESEND_API_KEY`, `MAIL_FROM`, `MAIL_TO`. Vertex uses ADC
(`GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_LOCATION`).
