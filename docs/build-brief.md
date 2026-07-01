# Claude Code Build Prompt: Swifty Beats Official Website

> Paste everything below this line into Claude Code as your build brief. It is written to be executed top to bottom. Work in vertical slices, write the ADRs and design tokens first, then build page by page.

---

## 0. Role and mission

You are a senior creative front-end engineer with a background in award-winning studios (Hello Monday, Active Theory, Locomotive calibre). You are building the official website for **Swifty Beats**, a UK DJ, producer and multi-instrumentalist. The bar is an **Awwwards Site of the Day**: exceptional motion design, immersive but purposeful interaction, premium dark aesthetics, and flawless technical execution. This is not a template build. Every interaction should feel intentional and crafted.

Build a **production-grade, bespoke Next.js 15 site** that is fast, accessible and genuinely beautiful. Treat performance and usability as part of the craft, not an afterthought. Core Web Vitals must pass.

---

## 1. Who Swifty Beats is (context)

- UK-based DJ, producer and multi-instrumentalist. Began on tabla at age 6, dhol at 7. Co-founded P.D.S (Pure Divine Sounds) at 15.
- Toured the UK and played landmark festivals including Wireless and Glastonbury, all before turning 20.
- Catalogue spans remixes, bootlegs and original music. Tracks charted on BBC Radio. 5 million plus streams.
- Signature: South Asian percussion heritage (tabla, dhol) fused with contemporary electronic production. Very few artists own this intersection globally.
- Current presence is a Komi.io link-in-bio page with zero brand differentiation. The domain **swiftybeats.com** (registrar: GoDaddy) currently points there and will move to this new site.

The origin story (tabla, dhol, P.D.S, festivals, BBC Radio, 5M streams) is the narrative spine of the site. Use it.

---

## 2. Audience and priorities (decisive)

The client ranked their audiences. Build to this order, not the other way around:

1. **Event promoters and bookers, plus brands looking to collaborate** (priority 1). These are the commercial audience. The site must read as professional, credible and bookable within seconds.
2. **Press and media** (priority 2). A clean EPK and press-ready assets matter.
3. **Fans** (priority 3). Important, but not the primary commercial driver.

**Primary conversion goal: a booking enquiry.** Secondary actions: listen on Spotify, follow on socials, join the mailing list. The client said all actions matter and the overriding word they used was "professional". So: striking, but never style over credibility.

---

## 3. Design direction (this is the creative contract)

### 3.1 The core resolution (read this first)

The client picked **"sleek artist portfolio"** over a full immersive ride, wants South Asian heritage woven in **subtly, not heavily**, and updates the site only every few months. They also want **audio-reactive visuals** and glassmorphism, and the wider goal is an Awwwards-level creative masterpiece.

Resolve this as follows, and do not over-engineer past it:

- The **backbone is a sleek, fast, premium portfolio**. Clean information architecture, quick for a busy promoter to scan, professional throughout.
- **Elevate it with restrained but world-class motion**: custom cursor, smooth scroll, scroll-driven reveals, kinetic type, glassmorphic surfaces, page transitions.
- Deliver **one genuine audio-reactive hero moment** (a WebGL visualiser that truly responds to sound), not a whole-site 3D experience that would slow the booking audience down.
- Heritage is **texture and accent**, not pastiche: subtle tabla-skin grain, a warm gold accent, faint geometric motifs. No literal instruments-as-wallpaper, no Devanagari decoration as costume.

### 3.2 Mood

Dark and moody. Premium, club-at-midnight atmosphere. Cinematic, confident, a little underground. Glassmorphism throughout for a high-end feel suited to a DJ.

### 3.3 Colour system (use these exact tokens)

Define these as CSS variables and Tailwind theme tokens. Dark-first.

```
--bg-base:        #0A0A0B   /* near-black canvas, faint warmth */
--bg-raised:      #141416   /* elevated sections */
--bg-elevated:    #1B1B1E
--glass-bg:       rgba(20, 20, 22, 0.55)   /* frosted panels */
--glass-border:   rgba(255, 255, 255, 0.08)
--glass-blur:     20px
--text-primary:   #F4F2EC   /* warm off-white */
--text-muted:     #9A968C
--text-faint:     #5A574F
--accent-gold:        #E6B45A   /* signature accent: heritage + premium */
--accent-gold-bright: #F6CE7B
--accent-reactive:    #6E56F6   /* electric violet, audio-reactive glow + interactive states */
--accent-reactive-2:  #2BD9C6   /* teal, secondary in visualiser gradient only */
--danger:         #E5484D
```

Rules: gold is the one signature accent, used sparingly for emphasis, CTAs and the wordmark glow. Violet and teal appear only inside the audio-reactive visualiser gradient and on a few interactive states. Everything else is the dark neutral scale plus glass. Add a subtle film-grain and vignette overlay site-wide to hold the moody tone. Keep contrast ratios accessible (text on glass must still pass AA).

### 3.4 Typography

- **Display / wordmark / headings:** Clash Display (Variable) from Fontshare. Big, tight tracking, confident.
- **Body / UI:** Satoshi (Variable) from Fontshare. Clean grotesque, excellent at small sizes.
- Self-host both via `next/font/local` or Fontshare. Do not load from a slow third party at runtime.
- Use a strong type scale with large editorial headings. Lean into kinetic and clip-reveal text for hero and section intros.

### 3.5 Logo

The client is happy with their existing logo. Keep it. Build around it. Use it in the nav, preloader and footer. Generate a clean SVG version if only a raster exists, and a monochrome variant for the nav over video.

---

## 4. Reference sites (study these, steal the right things)

These are the agreed references. Pull specific patterns, not whole designs. Adapt, do not clone.

**Audio-reactive and immersive (for the hero visualiser and atmosphere):**
- Silent House (silent-house.com): audio-reactive WebGL, dark fluid transitions. The model for the hero visualiser.
- EARV3RSE (earv3rse.com): 3D audio visualisation tied to an artist identity.
- Mola Zone for Yamê (molazone.com): immersive album world. Reference for ambition, not for full adoption.
- Gigantic Media (giganticmedia.net): synesthesia-driven motion, cinematic scroll.

**Sleek artist portfolio and narrative scroll (the backbone):**
- NaughtyDuk (naughtyduk.com): music-producer portfolio, bold type, dark palette, scroll animation. Closest spiritual match.
- DJ KOVA (kova.masalto.studio): purpose-built DJ portfolio, React + Tailwind, experimental type and transitions.
- LO2S (lo2s.com): cinematic scroll storytelling with video, moody album-like atmosphere.
- Radical Face (radicalface.com): site as a visual album sleeve, atmospheric type and imagery.

**Commercial DJ benchmarks (tour, booking, releases done credibly):**
- Afrojack, Martin Garrix, Deadmau5, DJ Snake, Don Diablo, Carl Cox. Reference how they integrate tour dates, streaming links, press and booking without clutter. Swifty's site should feel as authoritative as these, with far more craft than most.

Design patterns to adopt across the build: dark-first aesthetic, cinematic hero, scroll-driven storytelling, an integrated persistent player, subtle cultural design language, performance-first engineering.

---

## 5. Tech stack and architecture (decisive, use this)

- **Framework:** Next.js 15, App Router, TypeScript (strict), React Server Components where sensible, client components for anything interactive.
- **Styling:** Tailwind CSS with the token system above. CSS variables for theming. A small set of glass and grain utility classes.
- **Smooth scroll:** Lenis.
- **Motion:** Framer Motion for component and layout motion. GSAP with ScrollTrigger for pinned, scrubbed and timeline-based scroll sequences. Do not duplicate the same effect in both; pick the right tool per case and document it.
- **3D / WebGL:** Three.js via React Three Fiber and drei, scoped to the hero audio-reactive visualiser and any small accents. Dynamic-import it, never block first paint.
- **Audio analysis:** native Web Audio API (AnalyserNode) feeding the visualiser. See section 8.
- **Forms and validation:** Zod schemas. If you want a typed client-server contract for the booking endpoint, use ts-rest. Otherwise a typed Route Handler is fine.
- **Email delivery:** Resend for booking and newsletter notifications.
- **Content layer:** typed local content (MDX or TS data files) validated with Zod, since the site changes only every few months. Use a light content collection approach (velite or contentlayer-style). Do not stand up a heavy CMS. Leave a clean seam so it can graduate to Sanity later if the client wants self-editing.
- **Deployment target:** Vercel. Edge-friendly. Ensure the build is clean and typed end to end.
- **Package manager:** pnpm.

Engineering discipline (follow the AI Hero method):
- Before building, write three short ADRs: (1) audio-reactive visualiser approach and the Spotify data constraint, (2) content layer choice, (3) booking submission and spam strategy.
- Build in vertical slices. Each slice should be runnable and reviewable.
- Co-locate components. Keep a clear `components/`, `lib/`, `content/`, `app/` structure.
- Write tests for the booking schema, the content loaders and any non-trivial utility. TDD where it pays off.
- No em-dashes in any user-facing copy. British English throughout the site.

---

## 6. Information architecture and pages

Build these pages. Highlighted by the client as required: Home, About/Bio, Music/Releases, Gallery, Booking/Contact, Shop/Merch. The rest are in scope and should be built unless noted.

### 6.1 Home
The flagship. Sections in order:
1. **Preloader:** Swifty Beats wordmark assembling, with a thin gold progress line. Quick (under 1.5s on a warm cache). Optional muted-by-default ambient toggle, never auto-sound.
2. **Hero:** full-bleed. Default to a Veo-generated cinematic loop (see section 9), with the audio-reactive WebGL visualiser available as the signature moment once the user presses play or interacts. Kinetic wordmark, a one-line strapline, and two CTAs: "Book Swifty" (primary, gold) and "Listen" (secondary, glass). Custom cursor active.
3. **Origin-story scroll:** a pinned, scrubbed timeline. Tabla at 6, dhol at 7, P.D.S at 15, festivals (Wireless, Glastonbury), BBC Radio, 5M streams. Clip-reveal text, parallax imagery, a thin progress spine in gold. This is the emotional core.
4. **Featured release:** large artwork, glass panel, embedded play and stream-out links.
5. **Music strip:** a few key tracks and remixes with a quick-play affordance and links to Spotify, SoundCloud and YouTube.
6. **Festival and platform marquee:** infinite-scroll wordmark band of festivals played and platforms.
7. **Booking CTA band:** a confident glass section that drives promoters to the booking form. This is the commercial pivot, give it weight.
8. **Footer:** giant kinetic wordmark, socials, newsletter signup, contact.

### 6.2 About / Bio
The full story told well. Long-form but cinematic. Pull quotes, BBC Radio and streaming credentials, a portrait gallery, and the heritage-to-electronic narrative. End with a booking and press CTA.

### 6.3 Music / Releases
- Grid or bento of releases with artwork. Hover reveals title, year, type (single, remix, bootleg, collab).
- Each release links out to Spotify (main songs), SoundCloud (remixes) and YouTube (videos), under the handle @swiftybeats. See section 7 for exact integration.
- A featured track drives the audio-reactive visualiser (section 8).
- "Full tracks" on-site listening is via embedded Spotify. Do not host a pirate-style full-catalogue player.

### 6.4 Tour & Events
- Upcoming dates as the priority, with venue, city, date and a ticket or enquiry link per row. Hover-expand rows.
- Past highlights with photos and video where available.
- Emit **Event JSON-LD** for every date. This directly serves the promoter and search audience.
- If there are no live dates, show a graceful "Enquire to book" state that routes to the booking form.

### 6.5 Gallery (photo and video)
- Masonry or bento layout. Mix of press shots, live performance and studio.
- Video tiles play a muted preview on hover, full playback in a glass lightbox.
- Lazy-load everything. Use `next/image` with AVIF and WebP. Keep it fast.

### 6.6 Booking / Contact (commercial priority, build it well)
- A real booking enquiry form, since the top audience is promoters and bookers. Fields: name, email, phone (optional), organisation or promoter, event type (club, festival, private, corporate, wedding, brand collaboration), event date, venue or city, expected attendance, budget range, message.
- Zod validation, inline errors, accessible labels, a clear success state.
- Submit via a Route Handler to Resend. Add a honeypot field and basic rate limiting for spam. Store submissions if a lightweight store is available, otherwise email is sufficient.
- Also surface a direct contact email and the social handles.

### 6.7 Press / EPK
- A clean, screenshot-worthy press kit. Short and long bio, hi-res press shots (downloadable as a zip), logo pack, key facts (festivals, BBC Radio, streams), and contact for press. The client said there is no notable press coverage to display yet, so do not fabricate quotes. Leave a tidy, empty-ready slot for future coverage.

### 6.8 Shop / Merch (Phase 2 placeholder)
- The client will sell merch later. Build a polished "Merch dropping soon" page with an email-capture so it is launch-ready. Do not build a full store now. Architect the route so a Shopify or Stripe integration can slot in cleanly later.

### 6.9 News / Blog (light, optional)
- A simple MDX-driven news list for occasional announcements, since updates are infrequent. Keep it minimal. Ship it only after the core pages are solid.

---

## 7. Music integration (exact behaviour)

The client wants on-site full-track listening, with discovery routed to the right platform per content type.

- **Spotify** for main songs. Use the official Spotify embed (`open.spotify.com/embed`) for full-track listening on the Music page and featured release. Style the surrounding container in glass so it does not look like a bare embed. Set the embed theme to dark.
- **SoundCloud** for remixes. Use the SoundCloud embed for remix content.
- **YouTube** for videos. Use a lite, facade-style YouTube embed (load the iframe only on click, with a generated thumbnail) so it does not tank performance. Videos live in the Gallery and on relevant release entries.
- Handle: **@swiftybeats** across platforms. Wire the real profile URLs when provided; until then use clearly-named placeholders in a single config file (`lib/links.ts`) so they are trivial to swap.
- **Persistent mini-player:** a glassmorphic player docked bottom that follows the user as they scroll. For full tracks it controls the Spotify embed where the API allows, otherwise it deep-links into Spotify. Keep it non-intrusive and dismissable.

**Autoplay and "via Spotify" note (important, handle honestly):** the client asked whether music can autoplay via Spotify on landing. Two hard constraints apply, design around both:
1. Browsers block audio autoplay with sound until the user interacts. So nothing plays with sound on first load. The hero can animate silently and bind audio on the first user gesture or play press.
2. The Spotify embed and Web Playback SDK do not expose raw audio frequency data to the page, so you cannot build a true audio-reactive visualiser from a Spotify stream. See section 8 for the resolution. Full listening still happens through Spotify, just not the reactive analysis.

---

## 8. The audio-reactive hero visualiser (signature moment)

This is the standout interaction. Make it genuinely react to sound, not fake it.

- Because Spotify will not give you frequency data, drive the visualiser from a **short hosted audio loop or the featured-track preview** (a 20 to 40 second high-energy clip Swifty approves), served from the site. Pipe it through the Web Audio API `AnalyserNode` to get real-time frequency and amplitude data.
- Render with React Three Fiber: a dark, fluid, particle or displaced-mesh field that pulses, distorts and glows with the gold, violet and teal gradient on the beat and across the frequency bands. Reference Silent House and EARV3RSE for the feel: restrained, premium, fluid, never a cliche bar-graph EQ.
- Behaviour: on idle it animates gently on simulated data. On first user gesture or the hero "Listen" press, it binds to the real audio analyser and comes alive. A clear control to mute and to jump to the full track on Spotify.
- Performance: dynamic-import the whole WebGL bundle, cap the device pixel ratio, pause when offscreen or when the tab is hidden, and respect `prefers-reduced-motion` with a static gradient fallback. Provide a low-power path for mobile.

---

## 9. Asset generation with Vertex AI (Imagen and Veo)

Vertex AI is already linked to this environment via ADC. Project `radlabs-497004`. Use the `@google/genai` Node SDK in Vertex mode (`vertexai: true`, project and location from env). Put generation behind a script at `scripts/generate-assets.ts` so it is repeatable, and keep a prompt library at `scripts/asset-prompts.ts`. Generate once, commit the optimised outputs, do not regenerate on every build.

The client has real photos, video and a bio. Use those as the primary assets. Use Vertex generation for **atmosphere, textures, backdrops, the hero loop and any future release artwork** the client asked us to help with. Never fabricate a fake photo of the artist. Generated imagery is abstract, textural or environmental only.

### 9.1 Imagen (use a current Imagen model on Vertex, for example imagen-4.0)
Generate, then optimise to AVIF/WebP:
- Film-grain and noise overlay tiles.
- Macro tabla-skin and drum-membrane textures, dark and tonal, for subtle section backgrounds.
- Abstract gold-dust and dark-haze backdrops for glass panels.
- A moody, abstract Open Graph and Twitter card image carrying the wordmark.
- Optional placeholder release artwork in the dark-premium style, clearly swappable.

Example Imagen prompt (adapt per asset):
> "Extreme macro photograph of a tabla drum skin, deep shadow, single warm gold rim light, fine dust particles in the air, near-black background, cinematic, high detail, moody, premium, no text."

### 9.2 Veo (use a current Veo model on Vertex, for example veo-3)
Generate one primary hero loop plus one or two ambient section clips. Keep them short, loopable and dark. Compress hard with ffmpeg to web-friendly MP4 (H.264) and WebM, generate a poster frame, and provide a reduced-motion static fallback. Lazy-load and never autoplay with sound.

Example Veo prompt for the hero:
> "Slow cinematic loop, dark club atmosphere, abstract close-ups: hands moving over DJ decks dissolving into a tabla being played, drifting gold particles and soft volumetric haze, deep blacks with warm gold and faint violet light, shallow depth of field, no faces in focus, premium, moody, seamless loop, no text."

Document the chosen models and regions in the asset ADR, since Veo and Imagen availability varies by region.

---

## 10. 21st.dev components (linked, use it)

The 21st.dev API/MCP is connected. Use it to source high-quality interaction components, then **adapt every one to the token system above**. Do not ship 21st.dev defaults or their stock colours. Pull and tailor:

- Magnetic and animated buttons for the primary CTAs.
- Infinite marquee for the festival and platform band.
- Scroll-reveal and split or clip text for section intros.
- Hover-tilt and spotlight cards for releases and gallery tiles.
- Animated aurora or gradient background blobs, restrained, behind glass.
- Bento grid for Music and Gallery.
- A custom cursor and cursor-trail effect.
- Sticky and pinned scroll sections for the origin story.

Treat 21st.dev as a high-quality starting point, not the final look. The final look is dark, glassmorphic, gold-accented and bespoke.

---

## 11. Cross-cutting requirements

### Motion and feel
- Lenis smooth scroll site-wide. Custom cursor that grows and labels on interactive elements (play, view, drag). Page transitions via a clip-path or curtain wipe in dark and gold (View Transitions API where supported, Framer Motion fallback). Consistent easing and timing tokens. Motion should feel expensive and calm, never busy.

### Glassmorphism
- A reusable glass surface: `--glass-bg`, 1px `--glass-border`, `backdrop-blur(var(--glass-blur))`, a faint inner highlight, soft shadow. Use it for the nav, player, cards, the booking panel and CTA bands. Keep text on glass at AA contrast.

### Accessibility (non-negotiable)
- Full keyboard navigation, visible focus states, semantic landmarks, alt text, captions or transcripts for video where there is meaningful audio, respects `prefers-reduced-motion` everywhere (no motion sickness traps), and no autoplaying sound. Target WCAG 2.1 AA.

### Performance
- Lighthouse 90 plus on performance, accessibility, best practices and SEO. Dynamic-import WebGL and heavy motion. Facade-load YouTube. `next/image` with modern formats and correct sizing. Preconnect to Spotify, SoundCloud and YouTube. Pass Core Web Vitals on mid-range mobile, not just desktop.

### SEO
- Per-page metadata, Open Graph and Twitter cards, canonical URLs, sitemap and robots. JSON-LD: `MusicGroup` or `Person` and `MusicRecording` for releases, `Event` for tour dates. Clean, semantic HTML. This directly serves the booking and press audience.

### Responsive
- Mobile-first. The hero, origin scroll and player must feel premium on a phone. Provide the low-power visualiser path on mobile. Test small and large viewports.

---

## 12. Build order (vertical slices)

0. Scaffold: Next.js 15, TS strict, Tailwind, tokens, fonts, grain and vignette, Lenis, base layout. Write the three ADRs.
1. Shell: nav, footer, custom cursor, preloader, page-transition system.
2. Home: hero (Veo loop), origin-story scroll, featured release, music strip, marquee, booking CTA band.
3. Music / Releases: Spotify, SoundCloud and YouTube integration, featured-track audio-reactive visualiser.
4. About / Bio.
5. Tour & Events with Event JSON-LD.
6. Gallery with lightbox.
7. Booking / Contact: form, Zod, Resend, spam protection.
8. Press / EPK with downloadable asset pack.
9. Shop placeholder with email capture.
10. News / Blog (MDX), optional, last.
11. Asset generation pass (Imagen and Veo), integrate and optimise.
12. Polish: motion timing, performance, accessibility, SEO, cross-browser, mobile.

After each slice, run the build, run tests, and confirm it is clean before moving on.

---

## 13. Definition of done

- Every page above is built, responsive, accessible and fast.
- The hero genuinely reacts to audio on interaction, with a graceful reduced-motion fallback.
- The booking form sends a real email and validates properly.
- Spotify, SoundCloud and YouTube are integrated and styled, not bare embeds.
- Lighthouse 90 plus across the board, Core Web Vitals passing on mobile.
- All copy is British English with no em-dashes. Real links live in one config file for easy swapping.
- The site looks like it belongs on the Awwwards front page, while a busy promoter can find "book Swifty" in two seconds.

---

## 14. Guardrails

- Do not build a slow, whole-site 3D ride. The commercial audience needs speed and clarity. One reactive hero moment, not five.
- Do not fabricate press quotes, fake photos of the artist, or invented stats. Use only the real story in section 1 until the client supplies more.
- Do not over-apply the heritage motif. Subtle texture and gold only.
- Do not autoplay sound. Do not ship un-optimised video or images.
- Do not leave placeholder lorem ipsum in shipped pages. Use the real bio and story, and clearly-marked TODO config for links and assets the client still owes.
- Keep secrets (Resend key, GCP creds) in env, never in the repo.

Start by confirming the stack, scaffolding the project, and writing the three ADRs. Then build slice by slice.
