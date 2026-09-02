import type { Metadata } from "next";
import VideoCompressor from "@/components/VideoCompressor";
import SeoContent from "@/components/SeoContent";

export const metadata: Metadata = {
  title: "8MB Video Compressor — Free Online for Discord & Email (2026)",
  description:
    "Shrink video file size under 8MB, 16MB, or 25MB directly in your browser. 100% private, no file uploads, no watermark, and zero signup required.",
  alternates: {
    canonical: "https://clipshrink.com",
  },
  openGraph: {
    title: "8MB Video Compressor — Shrink Video for Discord & Email",
    description:
      "Compress MP4, MOV, and WebM videos below platform upload limits locally in your browser.",
    url: "https://clipshrink.com",
    siteName: "ClipShrink",
    type: "website",
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ClipShrink Video Compressor",
    url: "https://clipshrink.com",
    description:
      "Free client-side video compressor to reduce video files below 8MB for Discord, Gmail, and WhatsApp.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 sm:py-16">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Above The Fold Headline */}
      <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          8MB Video Compressor <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            For Discord, Email & WhatsApp
          </span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Shrink any video below upload limits instantly in your browser. No
          file uploads, no watermarks, 100% private.
        </p>
      </div>

      {/* Interactive Tool Widget (Client Component) */}
      <VideoCompressor initialPreset="discord-8" />

      {/* Server-Rendered Below The Fold Content (SEO) */}
      <SeoContent />
    </main>
  );
}
