import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import VideoConverter, { ConversionFormat } from "@/components/VideoConverter";
import ConverterSeoContent from "@/components/ConverterSeoContent";

interface ConverterSpokeData {
  slug: string;
  sourceExt: string;
  targetFormat: ConversionFormat;
  title: string;
  h1: string;
  subtitle: string;
  description: string;
}

const CONVERTER_SPOKES: Record<string, ConverterSpokeData> = {
  "mkv-to-mp4": {
    slug: "mkv-to-mp4",
    sourceExt: "mkv",
    targetFormat: "mp4",
    title: "MKV to MP4 Converter — Convert OBS MKV Online Free (0.5s)",
    h1: "Convert MKV to MP4 Online",
    subtitle:
      "Lossless stream-copy remuxing for OBS Studio and gaming clips. Convert to MP4 in under 1 second with zero quality loss.",
    description:
      "Convert MKV to MP4 online for free with instant client-side WebAssembly stream copy. Zero server uploads, zero quality loss.",
  },
  "hevc-to-mp4": {
    slug: "hevc-to-mp4",
    sourceExt: "mp4",
    targetFormat: "mp4",
    title: "HEVC to MP4 Converter — Convert iPhone H.265 to H.264 Free",
    h1: "Convert HEVC / H.265 to MP4",
    subtitle:
      "Convert Apple High Efficiency HEVC recordings into universal H.264 MP4 clips playable on Windows PC, Android, and Discord.",
    description:
      "Convert HEVC H.265 videos to standard H.264 MP4 online for free. Fix Windows Media Player codec errors with 100% private in-browser encoding.",
  },
  "mov-to-mp4": {
    slug: "mov-to-mp4",
    sourceExt: "mov",
    targetFormat: "mp4",
    title: "MOV to MP4 Converter — Convert QuickTime MOV Online Free",
    h1: "Convert MOV to MP4 Online",
    subtitle:
      "Turn Apple QuickTime MOV videos into universally compatible MP4 files with web-optimized faststart metadata.",
    description:
      "Convert Apple QuickTime MOV to MP4 online for free. In-browser client-side WebAssembly conversion with zero watermarks.",
  },
  "webm-to-mp4": {
    slug: "webm-to-mp4",
    sourceExt: "webm",
    targetFormat: "mp4",
    title: "WebM to MP4 Converter — Fast In-Browser Conversion Free",
    h1: "Convert WebM to MP4 Online",
    subtitle:
      "Convert browser screen recordings and HTML5 WebM clips to standard MP4 with zero upload queues.",
    description:
      "Convert WebM video to MP4 online for free. Instant client-side stream copy with zero server queues.",
  },
  "quicktime-to-mp3": {
    slug: "quicktime-to-mp3",
    sourceExt: "mov",
    targetFormat: "mp3",
    title: "QuickTime to MP3 Converter — Extract Audio from MOV Online",
    h1: "Extract MP3 from QuickTime MOV",
    subtitle:
      "Instantly extract voice memos, podcasts, and audio tracks from Apple QuickTime files in browser RAM.",
    description:
      "Extract MP3 audio from QuickTime MOV videos online for free. Fast WebAssembly processing with zero data uploads.",
  },
  "opus-to-mp3": {
    slug: "opus-to-mp3",
    sourceExt: "opus",
    targetFormat: "mp3",
    title: "Opus to MP3 Converter — Convert Discord & WhatsApp Audio Free",
    h1: "Convert Opus Audio to MP3",
    subtitle:
      "Turn raw Discord and WhatsApp Opus voice notes into universal MP3 files playable anywhere.",
    description:
      "Convert Opus voice notes to MP3 online for free. Private client-side audio conversion with instant download.",
  },
  "m4v-to-mp4": {
    slug: "m4v-to-mp4",
    sourceExt: "m4v",
    targetFormat: "mp4",
    title: "M4V to MP4 Converter — Convert Apple M4V Online Free",
    h1: "Convert M4V to MP4 Online",
    subtitle:
      "Remux Apple iTunes and Mac screen recordings into standard MP4 format in under 1 second.",
    description:
      "Convert M4V files to MP4 online for free with instant WebAssembly stream copying. 100% private.",
  },
  "mpeg-to-mp4": {
    slug: "mpeg-to-mp4",
    sourceExt: "mpeg",
    targetFormat: "mp4",
    title: "MPEG to MP4 Converter — Convert MPEG-1/2 Video Online Free",
    h1: "Convert MPEG to MP4 Online",
    subtitle:
      "Convert legacy MPEG camera recordings to modern web-friendly H.264 MP4 format with crisp audio.",
    description:
      "Convert MPEG video to MP4 online for free. Safe in-browser processing with zero server queues.",
  },
  "ts-to-mp4": {
    slug: "ts-to-mp4",
    sourceExt: "ts",
    targetFormat: "mp4",
    title: "TS to MP4 Converter — Convert Transport Stream Online Free",
    h1: "Convert TS to MP4 Online",
    subtitle:
      "Lossless stream-copy converter for broadcast TS captures and live stream recordings.",
    description:
      "Convert TS files to MP4 online for free. Instant WebAssembly container remuxing with zero quality loss.",
  },
  "gif-to-mp4": {
    slug: "gif-to-mp4",
    sourceExt: "gif",
    targetFormat: "mp4",
    title: "GIF to MP4 Converter — Reduce GIF Size up to 90% Free",
    h1: "Convert GIF to MP4 Online",
    subtitle:
      "Turn bulky animated GIFs into ultra-lightweight MP4 video loops with smooth 60fps playback.",
    description:
      "Convert animated GIF to MP4 online for free. Shrink GIF file sizes by up to 90% with instant in-browser encoding.",
  },
};

export async function generateStaticParams() {
  return Object.keys(CONVERTER_SPOKES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const spoke = CONVERTER_SPOKES[slug];
  if (!spoke) return {};

  return {
    title: spoke.title,
    description: spoke.description,
    alternates: {
      canonical: `https://clipshrink.com/convert/${spoke.slug}`,
    },
    openGraph: {
      title: spoke.title,
      description: spoke.description,
      url: `https://clipshrink.com/convert/${spoke.slug}`,
      siteName: "ClipShrink",
      type: "website",
    },
  };
}

export default async function ConverterSpokePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spoke = CONVERTER_SPOKES[slug];

  if (!spoke) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: spoke.h1,
    url: `https://clipshrink.com/convert/${spoke.slug}`,
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
        name: "Converters",
        item: "https://clipshrink.com/convert",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: spoke.h1,
        item: `https://clipshrink.com/convert/${spoke.slug}`,
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
            href="/convert"
            className="hover:text-white transition-colors px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
            Converters
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
              0.5s Stream-Copy Remux
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
        <VideoConverter
          defaultSourceExt={spoke.sourceExt}
          targetFormat={spoke.targetFormat}
          title={spoke.h1}
          description={spoke.subtitle}
        />
      </div>

      <div className="relative z-10">
        <ConverterSeoContent slug={spoke.slug} />
      </div>
    </main>
  );
}
