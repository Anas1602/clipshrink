import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import VideoMuter from "@/components/VideoMuter";
import MuterSeoContent from "@/components/MuterSeoContent";

interface MuterSpokeData {
  slug: string;
  sourceContext: string;
  title: string;
  h1: string;
  subtitle: string;
  description: string;
}

const MUTER_SPOKES: Record<string, MuterSpokeData> = {
  "iphone-video": {
    slug: "iphone-video",
    sourceContext: "iPhone",
    title: "How to Remove Sound from iPhone Video Free (0.1s Online)",
    h1: "Remove Sound from iPhone Video",
    subtitle:
      "Mute background noise, talking, and wind from iPhone camera roll videos directly in mobile Safari. Zero app downloads.",
    description:
      "Remove sound from iPhone video online for free without installing apps. 100% private in-browser WebAssembly processing.",
  },
  mp4: {
    slug: "mp4",
    sourceContext: "MP4",
    title: "Remove Audio from MP4 Online Free (0.1s Stream-Copy)",
    h1: "Remove Audio from MP4 Video",
    subtitle:
      "Strip audio tracks from MP4 video in 0.1 seconds. 100% bit-for-bit video quality retention with zero cloud uploads.",
    description:
      "Remove audio from MP4 video online for free. Instant client-side stream copy with zero quality loss and no watermarks.",
  },
  mov: {
    slug: "mov",
    sourceContext: "QuickTime MOV",
    title: "Mute QuickTime MOV Video Online Free — ClipShrink",
    h1: "Mute Apple QuickTime MOV Video",
    subtitle:
      "Strip PCM and AAC audio tracks from Apple QuickTime MOV videos in browser RAM with zero compression artifacts.",
    description:
      "Mute MOV video online for free. In-browser client-side WebAssembly processing with zero server queues.",
  },
  "instagram-reels": {
    slug: "instagram-reels",
    sourceContext: "Instagram",
    title: "Mute Video for Instagram Reels & Stories Online Free",
    h1: "Mute Video for Instagram Reels",
    subtitle:
      "Remove camera noise and copyrighted background music from video clips before posting to Instagram Reels or TikTok.",
    description:
      "Mute videos for Instagram Reels and Stories online for free. Avoid audio copyright strikes with instant in-browser muting.",
  },
  "send-without-sound": {
    slug: "send-without-sound",
    sourceContext: "Video",
    title: "How to Send a Video Without Sound (Under 0.1s) — ClipShrink",
    h1: "Send a Video Without Sound",
    subtitle:
      "Mute private background conversations and accidental noise before sending clips over WhatsApp, iMessage, or Slack.",
    description:
      "Learn how to send a video without sound by stripping audio tracks instantly in your browser before sharing.",
  },
  mkv: {
    slug: "mkv",
    sourceContext: "MKV",
    title: "Remove Audio Track from MKV File Online Free — ClipShrink",
    h1: "Remove Audio from MKV Video",
    subtitle:
      "Lossless stream-copying to strip audio tracks from OBS Studio MKV recordings in under 1 second.",
    description:
      "Remove audio tracks from MKV video files online for free. Instant WebAssembly container stream copy.",
  },
};

export async function generateStaticParams() {
  return Object.keys(MUTER_SPOKES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const spoke = MUTER_SPOKES[slug];
  if (!spoke) return {};

  return {
    title: spoke.title,
    description: spoke.description,
    alternates: {
      canonical: `https://clipshrink.com/remove-audio/${spoke.slug}`,
    },
    openGraph: {
      title: spoke.title,
      description: spoke.description,
      url: `https://clipshrink.com/remove-audio/${spoke.slug}`,
      siteName: "ClipShrink",
      type: "website",
    },
  };
}

export default async function MuterSpokePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spoke = MUTER_SPOKES[slug];

  if (!spoke) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: spoke.h1,
    url: `https://clipshrink.com/remove-audio/${spoke.slug}`,
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
        name: "Remove Audio",
        item: "https://clipshrink.com/remove-audio",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: spoke.h1,
        item: `https://clipshrink.com/remove-audio/${spoke.slug}`,
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
            href="/remove-audio"
            className="hover:text-white transition-colors px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
            Remove Audio
          </Link>
          <span className="text-slate-600">/</span>
          <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            {spoke.h1}
          </span>
        </nav>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 mb-4 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-slate-200">0.1s Stream-Copy</span>
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
        <VideoMuter sourceContext={spoke.sourceContext} />
      </div>

      <div className="relative z-10">
        <MuterSeoContent slug={spoke.slug} />
      </div>
    </main>
  );
}
