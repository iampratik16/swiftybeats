import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Serve modern formats first — the media-speed priority (brief §11)
    formats: ["image/avif", "image/webp"],
    qualities: [75, 82, 90],
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.scdn.co" },
      // Instagram media (Graph API gallery) is served from the Meta CDNs
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
    ],
  },
  async redirects() {
    // "Tour" is now "Shows" — keep old links and bookmarks working
    return [{ source: "/tour", destination: "/shows", permanent: true }];
  },
  async headers() {
    return [
      {
        // Long-cache the generated/immutable assets
        source: "/assets/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
