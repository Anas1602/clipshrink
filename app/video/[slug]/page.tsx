import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import VideoCompressor, { TargetPreset } from "@/components/VideoCompressor";
import SeoContent, { SpokeType } from "@/components/SeoContent";

interface SpokeData {
  slug: string;
  preset: TargetPreset;
  /** Starting size for the Custom tab (only used when preset is "custom"). */
  customMB?: number;
  spokeType: SpokeType;
  title: string;
  h1: string;
  subtitle: string;
  description: string;
}

const SPOKES: Record<string, SpokeData> = {
  "compress-for-discord-8mb": {
    slug: "compress-for-discord-8mb",
    preset: "discord-20",
    spokeType: "discord-8mb",
    title: "Discord Video Compressor — Shrink to 8MB, 10MB or 20MB Free",
    h1: "Video Compressor for Discord (8MB, 10MB & 20MB)",
    subtitle:
      "Shrink gaming clips and MP4/MOV videos under Discord’s 20MB free upload limit (or classic 8MB and 10MB targets). Runs locally in your browser with no watermarks.",
    description:
      "Compress MP4, MOV, and WebM videos to 8MB, 10MB, or 20MB for Discord. Free client-side WebAssembly video compressor with zero server uploads.",
  },
  "compress-for-gmail-25mb": {
    slug: "compress-for-gmail-25mb",
    preset: "gmail-25",
    spokeType: "gmail-25mb",
    title: "Compress Video for Gmail Attachment (25MB Limit) — ClipShrink",
    h1: "Compress Video for Gmail (25MB Limit)",
    subtitle:
      "Reduce video file size under Gmail’s 25MB attachment limit. Attach MP4 and MOV clips directly in your email without Google Drive links.",
    description:
      "Shrink video files under 25MB for direct Gmail attachments without Google Drive links. 100% private in-browser video compression.",
  },
  "compress-for-whatsapp": {
    slug: "compress-for-whatsapp",
    preset: "whatsapp-16",
    spokeType: "whatsapp",
    title: "Compress Video for WhatsApp (16MB Limit) — Free Online",
    h1: "Compress Video for WhatsApp (16MB)",
    subtitle:
      "Shrink video clips below WhatsApp’s 16MB media limit for direct sending on WhatsApp Web, iPhone, and Android without upload errors.",
    description:
      "Reduce video size under 16MB for WhatsApp attachments. Converts MP4 and MOV to WhatsApp-compatible H.264 locally in your browser.",
  },
  "compress-video-on-iphone": {
    slug: "compress-video-on-iphone",
    preset: "whatsapp-16",
    spokeType: "iphone-compress",
    title: "Compress Video on iPhone Free (No App Required) — ClipShrink",
    h1: "Compress Video on iPhone (No App Needed)",
    subtitle:
      "Reduce large iPhone camera roll videos and 4K MOV files directly in mobile Safari. No App Store downloads or cloud uploads.",
    description:
      "Compress video on iPhone for free in Safari without installing apps. Shrink large iOS camera roll MOV files locally on your device.",
  },
  "how-to-send-large-video-from-iphone": {
    slug: "how-to-send-large-video-from-iphone",
    preset: "whatsapp-16",
    spokeType: "iphone-large-video",
    title:
      "How to Send Large Video from iPhone (Under 16MB & 25MB) — ClipShrink",
    h1: "How to Send Large Videos from iPhone",
    subtitle:
      "Shrink iPhone videos under email, SMS, and WhatsApp limits directly in Safari without blurry carrier compression or iCloud links.",
    description:
      "Send large videos from iPhone by compressing them below 16MB and 25MB attachment limits directly in mobile Safari.",
  },
  "compress-video-for-twitter": {
    slug: "compress-video-for-twitter",
    preset: "twitter-25",
    spokeType: "twitter",
    title: "Twitter / X Video Compressor — Shrink & Optimize MP4 Free",
    h1: "Compress Video for Twitter / X",
    subtitle:
      "Optimize MP4 and MOV files for Twitter/X uploads. Avoid processing stalls and blurry server re-encoding with clean 720p H.264 output.",
    description:
      "Compress and optimize videos for Twitter / X online for free. Fast in-browser H.264 encoding with zero server uploads or watermarks.",
  },
  "compress-mp4-to-100mb": {
    slug: "compress-mp4-to-100mb",
    preset: "file-100",
    spokeType: "100mb",
    title: "Compress Video to 100MB Free Online — ClipShrink",
    h1: "Compress Video to 100MB",
    subtitle:
      "Shrink large MP4 and MOV recordings under 100MB for web portals, Canvas/Blackboard LMS submissions, and corporate intranets.",
    description:
      "Compress MP4 and MOV videos under 100MB online for free. Local in-browser encoding with zero server uploads and no watermarks.",
  },
  "compress-mp4-to-10mb": {
    slug: "compress-mp4-to-10mb",
    preset: "custom",
    customMB: 10,
    spokeType: "10mb",
    title: "10MB Video Compressor — Compress MP4 to 10MB Online Free",
    h1: "Compress Video to 10MB",
    subtitle:
      "Shrink any MP4, MOV, or MKV file to under 10MB for Discord, web forms, and job portals using exact bitrate calculation.",
    description:
      "Compress MP4 and MOV video files to under 10MB online for free. Fast local browser processing with zero uploads and no watermark.",
  },
  "compress-video-for-email": {
    slug: "compress-video-for-email",
    preset: "custom",
    customMB: 20,
    spokeType: "email-20mb",
    title: "Compress Video for Email — Shrink MP4 Under 20MB Free",
    h1: "Compress Video for Email Attachments",
    subtitle:
      "Shrink video files below 20MB to send directly via email on Apple Mail, Yahoo, and webmail without cloud drive links.",
    description:
      "Compress MP4 and MOV videos to send via email. Shrink video files under 20MB directly in your browser with no uploads or watermarks.",
  },
  "compress-video-for-outlook": {
    slug: "compress-video-for-outlook",
    preset: "custom",
    customMB: 20,
    spokeType: "outlook-20mb",
    title: "Compress Video for Outlook (20MB Exchange Limit) — ClipShrink",
    h1: "Compress Video for Microsoft Outlook",
    subtitle:
      "Reduce video file size to fit Microsoft Outlook and Exchange’s 20MB attachment limit. Ideal for work screen recordings and slide decks.",
    description:
      "Reduce MP4 and MOV video size under 20MB for Microsoft Outlook and Exchange email attachments. 100% private in-browser processing.",
  },
  "compress-video-for-slack": {
    slug: "compress-video-for-slack",
    preset: "custom",
    customMB: 10,
    spokeType: "slack-10mb",
    title: "Compress Video for Slack (Under 10MB) — ClipShrink",
    h1: "Compress Video for Slack",
    subtitle:
      "Shrink screen recordings and bug demos to a compact 10MB MP4 that uploads fast and plays without buffering in Slack channels.",
    description:
      "Compress screen recordings and videos under 10MB for fast uploads in Slack. 100% private browser processing—files never leave your device.",
  },
  "compress-mp4-to-50mb": {
    slug: "compress-mp4-to-50mb",
    preset: "discord-nitro-50",
    spokeType: "nitro-50mb",
    title: "50MB Video Compressor — Compress MP4 to 50MB Online Free",
    h1: "Compress Video to 50MB",
    subtitle:
      "Shrink large video files under 50MB for Discord Nitro Basic, web forms, and application portals with clean HD quality.",
    description:
      "Compress MP4 and MOV files to under 50MB online for free. In-browser WebAssembly video compressor with no watermarks.",
  },
  "compress-mp4-to-25mb": {
    slug: "compress-mp4-to-25mb",
    preset: "gmail-25",
    spokeType: "25mb-custom",
    title: "25MB Video Compressor — Compress MP4 to 25MB Online Free",
    h1: "Compress Video to 25MB",
    subtitle:
      "Shrink any MP4, MOV, or WebM video under 25MB for email attachments, support tickets, and online submission portals.",
    description:
      "Compress MP4 and MOV videos to under 25MB online for free. Private client-side video size reducer with instant download.",
  },
  "compress-mov-for-discord": {
    slug: "compress-mov-for-discord",
    preset: "discord-20",
    spokeType: "mov-to-discord",
    title: "Convert & Compress iPhone MOV for Discord (8MB & 20MB)",
    h1: "Compress iPhone MOV for Discord",
    subtitle:
      "Convert Apple QuickTime MOV clips into Discord-compatible H.264 MP4 files under the 20MB or 8MB limit so they play inline in chat.",
    description:
      "Convert and compress iPhone MOV videos to Discord-compatible MP4 under 20MB or 8MB directly in your browser. Fixes MOV download-only bugs.",
  },
};

export async function generateStaticParams() {
  return Object.keys(SPOKES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const spoke = SPOKES[slug];
  if (!spoke) return {};

  return {
    title: spoke.title,
    description: spoke.description,
    alternates: {
      canonical: `https://clipshrink.com/video/${spoke.slug}`,
    },
    openGraph: {
      title: spoke.title,
      description: spoke.description,
      url: `https://clipshrink.com/video/${spoke.slug}`,
      siteName: "ClipShrink",
      type: "website",
    },
  };
}

export default async function SpokePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spoke = SPOKES[slug];

  if (!spoke) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: spoke.h1,
    url: `https://clipshrink.com/video/${spoke.slug}`,
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
        name: spoke.h1,
        item: `https://clipshrink.com/video/${spoke.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-6">
          <Link
            href="/"
            className="hover:text-slate-900 transition-colors px-3 py-1 rounded-full bg-white border border-slate-200 shadow-xs">
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
            {spoke.h1}
          </span>
        </nav>

        <div className="text-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            {spoke.h1}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            {spoke.subtitle}
          </p>
        </div>
      </div>

      <div className="relative z-10">
        <VideoCompressor
          initialPreset={spoke.preset}
          initialCustomMB={spoke.customMB}
        />
      </div>

      <div className="relative z-10">
        <SeoContent type={spoke.spokeType} />
      </div>
    </main>
  );
}
