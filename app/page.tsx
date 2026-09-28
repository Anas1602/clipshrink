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
    <main className="relative min-h-screen bg-slate-950 px-4 py-8 sm:py-16 overflow-hidden">
      {/* Background Ambient Grid & Radial Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2xl h-88 bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Structured Data for SEO & Entity Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative max-w-4xl mx-auto text-center mb-8 sm:mb-12">
        {/* Top Status Pill - Reference Design Inspired */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 mb-6 backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-slate-200">
            Client-Side WebAssembly
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">Zero Server Uploads</span>
        </div>

        {/* High-Intent SEO Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
          Video File Compressor <br />
          <span className="bg-linear-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            Compress Video Online for Free
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          Fast in-browser video file compressor. Shrink MP4, MOV, or WebM below
          Discord, WhatsApp, and Gmail upload ceilings with 100% device privacy.
        </p>
      </div>

      {/* Interactive Tool Widget - Kept strictly Above the Fold */}
      <div className="relative z-10">
        <VideoCompressor initialPreset="discord-8" />
      </div>

      {/* Server-Rendered Content Below the Fold */}
      <div className="relative z-10">
        <SeoContent type="home" />
      </div>
    </main>
  );
}
