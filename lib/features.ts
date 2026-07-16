// Server-side feature flags. All read from env at build/request time.
// To flip on release day, set NEXT_PUBLIC_LET_ME_GO_LIVE=true on Vercel and redeploy
// (or trigger an on-demand revalidation).

export const features = {
  /** 'Let Me Go' single — goes live 31 July 2026. */
  letMeGoLive: process.env.NEXT_PUBLIC_LET_ME_GO_LIVE === "true",
} as const;
