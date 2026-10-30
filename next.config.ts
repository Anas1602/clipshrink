import type { NextConfig } from "next";

const adsenseEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Duplicate of /convert/quicktime-to-mp3 (same query, cannibalized).
      {
        source: "/extract-audio/quicktime-to-mp3",
        destination: "/convert/quicktime-to-mp3",
        permanent: true,
      },
    ];
  },
  async headers() {
    // Google AdSense & programmatic ad iframes are blocked by COEP headers.
    // When NEXT_PUBLIC_ADSENSE_ENABLED="true", skip COOP/COEP so ads render
    // and loadProgressiveFFmpeg() cleanly falls back to single-threaded WASM.
    if (adsenseEnabled) {
      return [];
    }

    const isolationHeaders = [
      {
        key: "Cross-Origin-Opener-Policy",
        value: "same-origin",
      },
      {
        key: "Cross-Origin-Embedder-Policy",
        value: "credentialless",
      },
    ];

    return [
      {
        source: "/",
        headers: isolationHeaders,
      },
      {
        source: "/video/:path*",
        headers: isolationHeaders,
      },
    ];
  },
};

export default nextConfig;
