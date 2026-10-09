import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import VideoTrimmer from "@/components/VideoTrimmer";
import TrimmerSeoContent, { TrimmerSlug } from "@/components/TrimmerSeoContent";

interface TrimmerSpokeData {
  slug: TrimmerSlug;
  sourceExt: string;
  sourceContext: string;
  title: string;
  h1: string;
  subtitle: string;
  description: string;
}

const TRIMMER_SPOKES: Record<string, TrimmerSpokeData> = {
  "trim-mp4": {
    slug: "trim-mp4",
    sourceExt: "mp4",
    sourceContext: "MP4",
    title: "Trim MP4 Video Online Free (0.1s Lossless) — ClipShrink",
    h1: "Trim MP4 Video Online",
    subtitle:
      "Slice intro and outro dead air from MP4 videos in 0.1s with zero re-encoding artifacts. 100% private in-browser RAM.",
    description:
      "Trim MP4 video online for free with instant client-side WebAssembly stream copy. Zero quality loss, zero server uploads.",
  },
  "cut-mkv": {
    slug: "cut-mkv",
    sourceExt: "mkv",
    sourceContext: "OBS MKV",
    title: "Cut MKV Video Online — Stream-Copy Trimmer for OBS Studio",
    h1: "Cut MKV Video Online",
    subtitle:
      "Cut OBS Studio and gaming captures without corrupting timestamps or waiting through long video re-renders.",
    description:
      "Cut MKV files online for free. Instant in-browser stream copy specifically engineered for OBS Studio captures.",
  },
  "trim-mov": {
    slug: "trim-mov",
    sourceExt: "mov",
    sourceContext: "QuickTime MOV",
    title: "Trim QuickTime MOV Video Online Free — ClipShrink",
    h1: "Trim Apple MOV Video",
    subtitle:
      "Cut heavy Apple QuickTime recordings in mobile Safari or desktop browsers without installing third-party apps.",
    description:
      "Trim Apple QuickTime MOV video online for free. In-browser client-side WebAssembly trimming with zero watermarks.",
  },
  "cut-video-for-discord": {
    slug: "cut-video-for-discord",
    sourceExt: "mp4",
    sourceContext: "Discord",
    title: "Cut Video for Discord Free (Fit 8MB/10MB Limits) — ClipShrink",
    h1: "Cut Video for Discord",
    subtitle:
      "Trim highlight moments to shrink clips under Discord's 8MB and 10MB limits without degrading 60fps smoothness.",
    description:
      "Cut videos for Discord online for free. Trim gaming clips in under 0.1 seconds to easily bypass chat upload limits.",
  },
  "trim-webm": {
    slug: "trim-webm",
    sourceExt: "webm",
    sourceContext: "WebM",
    title: "Trim WebM Video Online Free — Screen Recording Cutter",
    h1: "Trim WebM Video Online",
    subtitle:
      "Cut browser screen recordings and HTML5 WebM files cleanly with instant stream-copy container repairs.",
    description:
      "Trim WebM video online for free. Safe in-browser WebAssembly processing with zero server queues.",
  },
  "cut-gif": {
    slug: "cut-gif",
    sourceExt: "gif",
    sourceContext: "GIF",
    title: "Cut Animated GIF Online Free — Reduce GIF Size up to 80%",
    h1: "Cut Animated GIF Online",
    subtitle:
      "Trim unnecessary frames and shorten bloated GIF memes in browser memory with zero watermarks.",
    description:
      "Cut animated GIFs online for free. Slice GIF loops in seconds and reduce file size by up to 80% locally.",
  },
  "lossless-video-cutter": {
    slug: "lossless-video-cutter",
    sourceExt: "mp4",
    sourceContext: "Video",
    title: "Lossless Video Cutter Online — Cut Without Re-Encoding",
    h1: "Lossless Video Cutter",
    subtitle:
      "Pure bit-for-bit stream-copying that cuts container timestamps without re-encoding frames or losing visual fidelity.",
    description:
      "Lossless video cutter online for free. Cut video without re-encoding via client-side WebAssembly stream copying.",
  },
  "trim-video-no-watermark": {
    slug: "trim-video-no-watermark",
    sourceExt: "mp4",
    sourceContext: "Video",
    title: "Trim Video Online No Watermark Free (0.1s) — ClipShrink",
    h1: "Trim Video Without Watermark",
    subtitle:
      "Escape Clideo and Kapwing watermark traps. Free in-browser stream cutting with 100% clean, unbranded exports.",
    description:
      "Trim video online without watermark for free. 100% private in-browser WebAssembly processing with zero paywalls.",
  },
};

export async function generateStaticParams() {
  return Object.keys(TRIMMER_SPOKES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const spoke = TRIMMER_SPOKES[slug];
  if (!spoke) return {};

  return {
    title: spoke.title,
    description: spoke.description,
    alternates: {
      canonical: `https://clipshrink.com/trim-video/${spoke.slug}`,
    },
    openGraph: {
      title: spoke.title,
      description: spoke.description,
      url: `https://clipshrink.com/trim-video/${spoke.slug}`,
      siteName: "ClipShrink",
      type: "website",
    },
  };
}

export default async function TrimmerSpokePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spoke = TRIMMER_SPOKES[slug];

  if (!spoke) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: spoke.h1,
    url: `https://clipshrink.com/trim-video/${spoke.slug}`,
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
        name: "Trim Video",
        item: "https://clipshrink.com/trim-video",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: spoke.h1,
        item: `https://clipshrink.com/trim-video/${spoke.slug}`,
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
            href="/trim-video"
            className="hover:text-white transition-colors px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
            Trim Video
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
              0.1s Keyframe Stream-Copy
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
        <VideoTrimmer
          defaultSourceExt={spoke.sourceExt}
          sourceContext={spoke.sourceContext}
          title={spoke.h1}
          subtitle={spoke.subtitle}
        />
      </div>

      <div className="relative z-10">
        <TrimmerSeoContent slug={spoke.slug} />
      </div>
    </main>
  );
}
