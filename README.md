This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment

Copy these into `.env.local` (all optional — the site runs and degrades
gracefully without them).

```bash
# --- Email delivery (Contact + Newsletter forms) ---
# Without these, forms still validate and accept; they just don't send email.
RESEND_API_KEY=
MAIL_FROM="Swifty Beats <noreply@swiftybeats.com>"
MAIL_TO=info@suprememusic.group

# --- Instagram gallery (Meta Graph API) ---
# /gallery syncs posts + reels from Instagram (revalidates hourly). Without
# these it falls back to curated tiles.
#   1. Instagram must be a Business/Creator account linked to a Facebook Page.
#   2. Create a Meta app (developers.facebook.com) with the Instagram Graph API.
#   3. Generate a long-lived token (instagram_basic + pages_show_list).
#   4. IG_USER_ID = the Instagram Business Account ID (Graph API Explorer).
IG_GRAPH_TOKEN=
IG_USER_ID=
# Optional — set only if you use Instagram Login instead of the Facebook host:
# IG_GRAPH_BASE=https://graph.instagram.com

# --- Vertex AI asset generation (npm run generate:assets [-- --veo]) ---
# Auth via Application Default Credentials: gcloud auth application-default login
GOOGLE_CLOUD_PROJECT=radlabs-497004
GOOGLE_CLOUD_LOCATION=us-central1
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
