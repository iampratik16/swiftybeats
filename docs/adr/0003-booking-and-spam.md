# ADR 0003: Booking / enquiry submission and spam strategy

## Status

Accepted. Newsletter capture implemented in this slice; the full booking form
lands in a follow-up slice against the same contract.

## Context

The primary conversion goal is a booking enquiry from promoters and brands
(brief §2, §6.6). Submissions must validate cleanly, resist spam, and deliver
reliably without standing up a database prematurely. Secrets must stay in env.

## Decision

- **Validation contract in one place**: `lib/schemas.ts` holds Zod schemas for
  the newsletter and the booking enquiry (name, email, phone, organisation,
  event type, date, venue/city, attendance, budget, message). The client
  validates for instant inline errors; the Route Handler re-validates as the
  trust boundary. The booking schema is unit-testable in isolation.
- **Delivery via Resend** from a typed Route Handler (`app/api/*`). No database
  in this phase — email is the delivery path. `RESEND_API_KEY`, `MAIL_FROM`,
  `MAIL_TO` come from env, never the repo.
- **Honest degradation**: if `RESEND_API_KEY` is absent, the endpoint still
  validates and returns `200` (the capture is real) but does not pretend to
  deliver. When the key is set, it emails.
- **Spam strategy**:
  - A **honeypot** field on every form (`company` / `website`) that must stay
    empty; a filled honeypot returns a success-looking response and does
    nothing.
  - Server-side Zod validation rejects malformed payloads with `422`.
  - Rate limiting to be added with the full booking form (per-IP token bucket,
    or Vercel/Upstash if available). Documented here as the known next step so
    it is not silently skipped.

## Consequences

- Zero infrastructure to run today; a store can slot in behind the same Route
  Handler later without touching the form.
- Provider is swappable: the handler is thin, so Resend could be replaced.
- The honeypot stops the bulk of bot spam cheaply; rate limiting closes the
  remaining gap when the booking form ships.
