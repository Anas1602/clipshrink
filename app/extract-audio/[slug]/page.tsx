import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import AudioExtractor, { AudioTargetFormat } from "@/components/AudioExtractor";
import AudioExtractorSeoContent from "@/components/AudioExtractorSeoContent";

interface ExtractorSpokeData {
  slug: string;
  defaultFormat: AudioTargetFormat;
  sourceContext: string;
  title: string;
  h1: string;
  subtitle: string;
  description: string;
}

const EXTRACTOR_SPOKES: Record<string, ExtractorSpokeData> = {
  "mov-to-mp3": {
    slug: "mov-to-mp3",
    defaultFormat: "mp3-320",
    sourceContext: "QuickTime MOV",
    title: "MOV to MP3 Converter — Convert Apple MOV to 320kbps MP3 Free",
    h1: "Convert MOV to MP3 Online",
    subtitle:
      "Extract crystal-clear 320kbps MP3 audio tracks from Apple QuickTime MOV recordings in under 1 second.",
    description:
      "Convert MOV to MP3 online for free. Fast in-browser WebAssembly audio extraction with zero cloud uploads and no watermarks.",
  },
  "mp4-to-mp3": {
    slug: "mp4-to-mp3",
    defaultFormat: "mp3-320",
    sourceContext: "MP4",
    title: "MP4 to MP3 Converter — Extract Audio from MP4 Online Free",
    h1: "Convert MP4 to MP3 Online",
    subtitle:
      "Rip high-quality 320kbps or 192kbps MP3 audio tracks from MP4 video in seconds with zero quality loss.",
    description:
      "Convert MP4 to MP3 online for free. In-browser client-side WebAssembly audio extraction with instant live preview.",
  },
  "ogg-to-mp3": {
    slug: "ogg-to-mp3",
    defaultFormat: "mp3-320",
    sourceContext: "OGG Audio",
    title: "OGG to MP3 Converter — Convert Discord & Game Audio Online Free",
    h1: "Convert OGG to MP3 Online",
    subtitle:
      "Turn Discord, Spotify, and gaming OGG Vorbis audio files into universally playable MP3 files in browser RAM.",
    description:
      "Convert OGG to MP3 online for free. Fast, private client-side audio conversion with zero server queues.",
  },
  "webm-to-mp3": {
    slug: "webm-to-mp3",
    defaultFormat: "mp3-320",
    sourceContext: "WebM",
    title: "WebM to MP3 Converter — Extract Audio from WebM Online Free",
    h1: "Convert WebM to MP3 Online",
    subtitle:
      "Extract voice memos and audio streams from browser screen recordings and HTML5 WebM clips.",
    description:
      "Convert WebM to MP3 online for free. Safe in-browser WebAssembly processing with zero server queues.",
  },
  "mp4-to-wav": {
    slug: "mp4-to-wav",
    defaultFormat: "wav",
    sourceContext: "MP4",
    title: "MP4 to WAV Converter — Extract Lossless Studio WAV Audio Free",
    h1: "Convert MP4 to WAV Online",
    subtitle:
      "Extract 16-bit uncompressed PCM WAV audio tracks from MP4 videos for video editors and music producers.",
    description:
      "Convert MP4 to lossless WAV online for free. Uncompressed 16-bit audio extraction with zero quality loss.",
  },
  "video-to-wav": {
    slug: "video-to-wav",
    defaultFormat: "wav",
    sourceContext: "Video",
    title: "Video to WAV Converter — Extract Uncompressed Audio Free",
    h1: "Convert Video to WAV Online",
    subtitle:
      "Rip master-quality uncompressed WAV audio from any video file in under 1 second in browser RAM.",
    description:
      "Convert video to WAV online for free. Instant in-browser stream demuxing with zero cloud uploads.",
  },
  "quicktime-to-mp3": {
    slug: "quicktime-to-mp3",
    defaultFormat: "mp3-320",
    sourceContext: "QuickTime",
    title: "QuickTime to MP3 Converter — Extract Audio from Mac Videos Free",
    h1: "Extract MP3 from QuickTime MOV",
    subtitle:
      "Extract voice memos, lectures, and podcasts from Mac QuickTime screen recordings in seconds.",
    description:
      "Extract MP3 audio from QuickTime MOV videos online for free. Fast WebAssembly processing with zero data uploads.",
  },
};

export async function generateStaticParams() {
  return Object.keys(EXTRACTOR_SPOKES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const spoke = EXTRACTOR_SPOKES[slug];
  if (!spoke) return {};

  return {
    title: spoke.title,
    description: spoke.description,
    alternates: {
      canonical: `https://clipshrink.com/extract-audio/${spoke.slug}`,
    },
    openGraph: {
      title: spoke.title,
      description: spoke.description,
      url: `https://clipshrink.com/extract-audio/${spoke.slug}`,
      siteName: "ClipShrink",
      type: "website",
    },
  };
}

export default async function AudioExtractorSpokePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spoke = EXTRACTOR_SPOKES[slug];

  if (!spoke) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: spoke.h1,
    url: `https://clipshrink.com/extract-audio/${spoke.slug}`,
    description: spoke.description,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://clipshrink.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Extract Audio",
        item: "https://clipshrink.com/extract-audio",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: spoke.h1,
        item: `https://clipshrink.com/extract-audio/${spoke.slug}`,
      },
    ],
  };

  return (
    <main className="relative min-h-screen bg-slate-950 px-4 py-8 sm:py-16 overflow-hidden">
      {/* Background Ambient Grid & Radial Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2xl h-88 bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* App Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="relative max-w-4xl mx-auto mb-8 sm:mb-12">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-6">
          <Link
            href="/"
            className="hover:text-white transition-colors px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
            Home
          </Link>
          <span className="text-slate-600">/</span>
          <Link
            href="/extract-audio"
            className="hover:text-white transition-colors px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
            Extract Audio
          </Link>
          <span className="text-slate-600">/</span>
          <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            {spoke.h1}
          </span>
        </nav>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 mb-4 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-slate-200">
              1-Second Audio Demuxer
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Zero Server Upload</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            {spoke.h1}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            {spoke.subtitle}
          </p>
        </div>
      </div>

      <div className="relative z-10">
        <AudioExtractor
          defaultFormat={spoke.defaultFormat}
          sourceContext={spoke.sourceContext}
        />
      </div>

      <div className="relative z-10">
        <AudioExtractorSeoContent slug={spoke.slug} />
      </div>
    </main>
  );
}
