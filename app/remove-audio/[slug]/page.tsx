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
    <main className="min-h-screen px-4 py-8 sm:py-16">
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

      <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
        {/* Clean Light Breadcrumbs */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-6">
          <Link
            href="/"
            className="hover:text-slate-900 transition-colors px-3 py-1 rounded-full bg-white border border-slate-200 shadow-xs">
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <Link
            href="/remove-audio"
            className="hover:text-slate-900 transition-colors px-3 py-1 rounded-full bg-white border border-slate-200 shadow-xs">
            Remove Audio
          </Link>
          <span className="text-slate-400">/</span>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
            {spoke.h1}
          </span>
        </nav>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600 mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>0.1s Stream-Copy &middot; Zero Server Upload</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            {spoke.h1}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
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
