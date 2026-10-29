import type { Metadata } from "next";
import VideoCompressor from "@/components/VideoCompressor";
import SeoContent from "@/components/SeoContent";

export const metadata: Metadata = {
  title: "Video File Compressor — Compress Video Online Free (2026)",
  description:
    "Fast in-browser video file compressor. Shrink MP4, MOV, and WebM videos to fit Discord (20MB), WhatsApp (16MB), or Gmail (25MB) with zero server uploads, no watermarks, and no signup.",
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
        sameAs: ["https://github.com/Anas1602/clipshrink"],
      },
      {
        "@type": "WebApplication",
        name: "ClipShrink Video File Compressor",
        url: "https://clipshrink.com",
        description:
          "Free client-side video file compressor to fit Discord (20MB), WhatsApp (16MB), and Gmail (25MB) limits with zero server uploads.",
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
    <main className="min-h-screen px-4 py-8 sm:py-16">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
        {/* Clean, Subtle Trust Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600 mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Local WebAssembly &middot; Zero Server Uploads</span>
        </div>

        {/* Crisp Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Video File Compressor
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          Compress MP4, MOV, and WebM videos below Discord, WhatsApp, and Gmail
          upload limits directly in your browser with complete privacy.
        </p>
      </div>

      {/* Interactive Tool Widget */}
      <div className="relative z-10">
        <VideoCompressor initialPreset="discord-20" />
      </div>

      {/* Structured Content Below the Fold */}
      <div className="relative z-10">
        <SeoContent type="home" />
      </div>
    </main>
  );
}
