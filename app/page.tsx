import type { Metadata } from "next";
import VideoCompressor from "@/components/VideoCompressor";
import SeoContent from "@/components/SeoContent";

export const metadata: Metadata = {
  title: "Video File Compressor — Compress Video Online Free (2026)",
  description:
    "Fast in-browser video file compressor. Shrink MP4, MOV, and WebM video size under 8MB, 16MB, or 25MB with zero server uploads, no watermarks, and no signup.",
  alternates: {
    canonical: "https://clipshrink.com",
  },
  openGraph: {
    title: "Video File Compressor — Compress Video Online Free (2026)",
    description:
      "Compress MP4, MOV, and WebM videos below platform upload limits locally in your browser. 100% private WebAssembly processing.",
    url: "https://clipshrink.com",
    siteName: "ClipShrink",
    type: "website",
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "ClipShrink",
        url: "https://clipshrink.com",
        logo: "https://clipshrink.com/icon.svg",
        sameAs: [
          "https://github.com/AnasLaribi95/in-browser-video-compressor-wasm",
        ],
      },
      {
        "@type": "WebApplication",
        name: "ClipShrink Video File Compressor",
        url: "https://clipshrink.com",
        description:
          "Free client-side video file compressor to reduce video files below 8MB, 16MB, and 25MB for Discord, Gmail, and WhatsApp with zero server uploads.",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 sm:py-16">
      {/* Structured Data for SEO & Entity Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Above The Fold Headline Targeting High-Volume KD 9% & 10% Keywords */}
      <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Video File Compressor <br className="hidden sm:inline" />
          <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Compress Video Online for Free
          </span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          Fast in-browser video file compressor. Shrink any MP4, MOV, or WebM
          below upload ceilings instantly with zero server queues and 100%
          privacy.
        </p>
      </div>

      {/* Interactive Tool Widget */}
      <VideoCompressor initialPreset="discord-8" />

      {/* Server-Rendered Below The Fold Content */}
      <SeoContent type="home" />
    </main>
  );
}
