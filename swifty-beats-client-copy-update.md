# Swifty Beats — Client Copy Update (July 2026)

**Project:** swiftybeats.com (staged at https://swiftybeats.vercel.app)
**Stack:** Next.js (App Router) · TypeScript · Tailwind · Framer Motion · Lenis
**Source of truth:** Supreme Music Group copy sign-off dated 15 July 2026

This is a **content update pass**, not a redesign. The client has signed off final copy for Homepage, About, Music, Shows, Press and Booking. Two bugs are included. One item is intentionally held for a 31 July release date.

---

## 0. Work rules

1. Read the codebase first. Confirm the pages `app/page.tsx`, `app/about`, `app/music`, `app/shows` (or `app/tour` if the rename hasn't shipped yet), `app/press`, `app/booking`, and any shared components before editing.
2. Branch: `feat/client-copy-july-2026`.
3. TypeScript strict, no `any`. Do not break the build (`npm run build`).
4. Do NOT touch design tokens, layout, animation timing, or Lenis config in this pass. Content only, plus the two bugs listed in §7.
5. Commit in small logical chunks per page. Do not squash.
6. If any string you're asked to replace does not exist verbatim in the codebase, stop and report it — do not guess.

---

## 1. Feature flag for the 31 July release

Before any content edits, add a single feature flag that controls whether the "Let Me Go" release content is visible. This lets the client flip the switch on 31 July without a code deploy.

Create `lib/features.ts`:

```ts
// Server-side feature flags. All read from env at build/request time.
// To flip on release day, set NEXT_PUBLIC_LET_ME_GO_LIVE=true on Vercel and redeploy
// (or trigger an on-demand revalidation).

export const features = {
  /** 'Let Me Go' single — goes live 31 July 2026. */
  letMeGoLive: process.env.NEXT_PUBLIC_LET_ME_GO_LIVE === 'true',
} as const;
```

Add to `.env.example`:

```
# Set to 'true' on 31 July 2026 to flip the 'Let Me Go' release copy live.
NEXT_PUBLIC_LET_ME_GO_LIVE=false
```

Every "Let Me Go" content block in §2 and §4 is gated on `features.letMeGoLive`. When false, the existing "Freedom" content stays visible. When true, the new content renders.

---

## 2. Homepage (`app/page.tsx` and children)

### 2.1 Hero subhead

**Find (verbatim):**
> Asian House Production, built for the dancefloor. Dhol heritage fused with house and electronic production.

**Replace with:**
> Asian House music built for the dancefloor. South Asian percussion and dhol heritage fused with house and electronic production.

### 2.2 Origin timeline — existing "Dhol" card copy

**Find:**
> Rhythm before melody, discipline before everything. Loud, heavy, built for the crowd, the drum sets a lifelong pull between the intimate and the enormous.

**Replace with:**
> Rhythm before melody, discipline before everything else. Loud, heavy, built for the crowd — the instrument that shapes everything he makes.

### 2.3 Origin timeline — new "Now" card (add as 6th card)

The timeline currently ends on "Five million and counting." Add a new card immediately after it, matching the existing card component/pattern exactly.

- **Card title:** `Now`
- **Card subtitle:** `Asian House Volume 1`
- **Card body:**
  > The next chapter: an EP built the same way it started — dhol and South Asian rhythm at the centre, house production doing the rest. Lead single 'Let Me Go' out 31 July.

Look for the timeline data source (likely an array in `lib/`, `data/`, or inline in the timeline component). Add the card there so it renders in the same style — don't hand-code a one-off variant.

Keep the "'Let Me Go' out 31 July" line in place regardless of the feature flag — the announcement is fine to run pre-release.

### 2.4 Latest release section — feature-flagged

Wrap the existing "Freedom" latest-release block with the flag:

```tsx
{features.letMeGoLive ? (
  <LatestRelease
    title="Let Me Go"
    body="Asian House heartbreak, straight from the source. Full-track listening, out now on Spotify. Press play and let it run."
    spotifyUrl={process.env.NEXT_PUBLIC_LET_ME_GO_SPOTIFY_URL}
    // TODO(client-asset:let-me-go-artwork): swap Freedom artwork for Let Me Go artwork on release day
  />
) : (
  <LatestRelease {/* existing Freedom props, unchanged */} />
)}
```

Add to `.env.example`:

```
# Populated on 31 July 2026 with the released Spotify track URL.
NEXT_PUBLIC_LET_ME_GO_SPOTIFY_URL=
```

Leave a `TODO(client-asset:let-me-go-artwork)` comment on the artwork field so it's obvious what to swap on release day.

### 2.5 Booking CTA

**Find:**
> Tell us the date and the room, and we will take it from there.

**Replace with:**
> Tell us the date and the room — we'll take it from there.

---

## 3. About page (`app/about`)

### 3.1 Opening paragraph

**Find:**
> The story starts young, on the dhol at seven. Loud, heavy, built for the crowd, and a lifelong obsession with rhythm that runs under everything Swifty makes.

**Replace with:**
> It started as a dream — dhol in hand at a school assembly, seven years old. That same instrument would go on to carry him to stages worldwide. Loud, heavy, built for the crowd: the beginning of a lifelong obsession with rhythm that runs through everything he makes.

### 3.2 Middle paragraphs

No change. Confirm the following paragraph exists and leave it exactly as-is:

> At fifteen he co-founded Pure Divine Sounds, turning a bedroom setup into a collective and a name that travels. By the time he turned twenty he had played Wireless and Glastonbury, carrying dhol and South Asian percussion into main-stage electronic sets.

### 3.3 New closing paragraph

Add **immediately after** the "five million streams" paragraph, in the same paragraph style:

> That heritage is the foundation for what comes next. Asian House Volume 1 — the debut EP — keeps dhol and South Asian rhythm at the centre while pushing the production further than ever. Lead single 'Let Me Go' lands 31 July.

This paragraph is **not** feature-flagged. It runs from now through and beyond the release — the announcement is the point.

### 3.4 Pull quote — restyle and attribute

The pull quote currently renders as an unattributed blockquote. Update **both** the copy and the styling:

- Change the quote copy from `own the space` to `occupy the space`, and from `does.` to `built a career there.`
- Add an attribution line below the quote reading `— SUPREME MUSIC GROUP` in a smaller, all-caps, letter-spaced style. Use the existing eyebrow/small-caps class if one exists — do not introduce a new style.

**Final quote:**
> "Very few artists occupy the space where dhol and South Asian percussion meet contemporary house and electronic production. Swifty Beats built a career there."
>
> — SUPREME MUSIC GROUP

---

## 4. Music page (`app/music`)

### 4.1 Subhead

**Find:**
> Full-track listening through Spotify, remixes and bootlegs through SoundCloud, videos through YouTube. All under @swiftybeats.

**Replace with:**
> Full-length streaming on Spotify, remixes and bootlegs on SoundCloud, videos on YouTube — all under @swiftybeats.

### 4.2 "Watch" section — add caption

The Watch section currently has no supporting copy. Add a single caption line under the section heading (same style as other section subheads on this page):

> The visual side of the sound — live sets, behind the scenes, and music videos.

### 4.3 "Let Me Go" release entry — feature-flagged

Do **not** add "Let Me Go" to the visible Releases list yet. Add it as a data entry gated on the flag, so on release day it appears in the same styling as the rest:

```ts
// lib/releases.ts (or wherever release data lives)
const releases = [
  // ...existing entries
  ...(features.letMeGoLive
    ? [{
        id: 'let-me-go',
        title: 'Let Me Go',
        type: 'Single',
        releaseDate: '2026-07-31',
        spotifyUrl: process.env.NEXT_PUBLIC_LET_ME_GO_SPOTIFY_URL,
        // TODO(client-asset:let-me-go-artwork): add release artwork
      }]
    : []),
];
```

If the "Everywhere else" Spotify/SoundCloud/YouTube block exists, leave it untouched — the client confirmed no changes.

---

## 5. Shows page (`app/shows`)

**Find (Coming Soon supporting line):**
> No live dates are on sale right now. New shows, festivals and club nights land here first. For availability and holds, get in touch.

**Replace with:**
> No live dates on sale right now — new shows, festivals and club nights land here first. For availability and holds, get in touch.

If the route rename to `/shows` from `/tour` has not shipped yet, do it as part of this pass (rename directory, add 301 redirect in `next.config.*`, update nav label, sitemap and all internal links).

---

## 6. Press page (`app/press`)

**Find:**
> The full press kit and EPK are on the way. For interviews, hi-res assets and press enquiries, reach management directly.

**Replace with:**
> The full press kit and EPK are on the way — for interviews, hi-res assets and press enquiries, reach management directly.

Confirm the `Press enquiries` CTA still points to `mailto:info@suprememusic.group`.

---

## 7. Booking page (`app/booking`)

**Find:**
> Clubs, festivals, private, corporate, wedding and brand collaborations. The full enquiry form, with dates, budget and event detail, lands here in the next release. Until then, email direct and we will reply fast.

**Replace with:**
> Clubs, festivals, private, corporate, wedding and brand collaborations — the full enquiry form, with dates, budget and event detail, is coming soon. Until then, email direct and we'll reply fast.

Leave this comment above the copy block:

```tsx
{/* TODO(scope:booking-form): the actual enquiry form is out of scope for this copy pass.
    Confirm build slot with Radlabs — bookings are on the revenue path to the £10k/month target. */}
```

Do NOT build the form in this pass. Just flag it.

Contact page: no changes. Confirm and move on.

---

## 8. Bug fixes (Music page)

### 8.1 'Ma Penzi' link

**Bug:** The 'Ma Penzi' release card links to Swifty's Spotify artist profile, not to the 'Ma Penzi' track.

**Fix:** Locate the release data entry for 'Ma Penzi' (likely in `lib/releases.ts`, `data/releases.ts`, or inline in the Music page). Replace the `spotifyUrl` (or equivalent) with the correct **track** URL.

Do **not** hardcode a URL you can't verify. Instead:

1. Do a web search for `"Swifty Beats" "Ma Penzi" site:open.spotify.com/track` to find the correct track URL.
2. If found, update the data entry.
3. If not found within one attempt, leave the following in place of the current URL:

   ```ts
   spotifyUrl: '', // TODO(client-verify:ma-penzi-url): confirmed track URL needed from Supreme Music Group
   ```

   Then hide the link if the URL is empty (`if (!spotifyUrl) return null` on the wrapper), rather than shipping a broken link.

Report which path you took in the PR description.

### 8.2 YouTube thumbnail in "Watch" section

The client asked to confirm the YouTube thumbnail is wired to a real video or channel.

Check the "Watch" section in `app/music/page.tsx` (or its component). If the thumbnail's link is missing, points to `#`, or points to a placeholder, replace it with:

- `TODO(client-verify:youtube-target): confirm intended video or channel URL with Supreme Music Group`

and disable the click behaviour (`aria-disabled`, no `href`) until verified. Do not ship a dead link.

Report the finding in the PR description regardless.

---

## 9. Global SEO refresh (small)

While you're in there:

- Update the `metadata.description` on `app/page.tsx` if it still references "tabla to techno" only — add "Asian House" as the lead. Keep it under 160 chars.
- Add `"Let Me Go"`, `"Asian House Volume 1"`, and `"Asian House"` to the `keywords` array.

Do not touch the OG image in this pass.

---

## 10. Final checklist

1. `npm run build` passes.
2. `npm run lint` and `tsc --noEmit` pass.
3. All copy replacements applied verbatim.
4. Feature flag defaults to `false` — the site behaves identically to before for public visitors until the flag is flipped.
5. Both bugs fixed or safely disabled with a `TODO(client-verify:*)` marker.
6. PR description includes:
   - Every file touched.
   - Every string replaced (find → replace), with count.
   - Status of both bug fixes (fixed / disabled pending client input).
   - Instructions for flipping the release-day flag: "Set `NEXT_PUBLIC_LET_ME_GO_LIVE=true` and populate `NEXT_PUBLIC_LET_ME_GO_SPOTIFY_URL` on Vercel, then trigger a redeploy."
   - Confirmation that the Booking form remains out of scope and is flagged in code.

---

## Appendix — Release-day runbook (for handover, not this pass)

On 31 July 2026, the client (or Radlabs) needs to:

1. Upload `Let Me Go` cover art to `public/assets/releases/let-me-go.jpg` (or the pattern the codebase uses).
2. Grab the Spotify track URL for 'Let Me Go' once it's live.
3. On Vercel → Project → Environment Variables:
   - Set `NEXT_PUBLIC_LET_ME_GO_LIVE=true`.
   - Set `NEXT_PUBLIC_LET_ME_GO_SPOTIFY_URL` to the track URL.
4. Redeploy (or trigger on-demand revalidation).
5. Verify: homepage Latest Release now shows Let Me Go, Music page Releases list shows Let Me Go at the top, and the timeline "Now" card is unchanged (it already mentions the release).

No code deploy required.
