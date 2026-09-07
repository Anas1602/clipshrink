import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import VideoCompressor, { TargetPreset } from "@/components/VideoCompressor";
import SeoContent, { SpokeType } from "@/components/SeoContent";

interface SpokeData {
  slug: string;
  preset: TargetPreset;
  spokeType: SpokeType;
  title: string;
  h1: string;
  subtitle: string;
  description: string;
}

const SPOKES: Record<string, SpokeData> = {
  "compress-for-discord-8mb": {
    slug: "compress-for-discord-8mb",
    preset: "discord-8",
    spokeType: "discord-8mb",
    title: "8MB Video Compressor for Discord — Free & No Upload (2026)",
    h1: "8MB Video Compressor for Discord",
    subtitle:
      "Shrink your gaming clips and videos below Discord’s 8MB limit instantly in your browser. 100% private, no watermarks.",
    description:
      "Compress MP4, MOV, and WebM videos below Discord’s 8MB upload limit. Fast client-side WebAssembly compression with no file size limits.",
  },
  "compress-for-gmail-25mb": {
    slug: "compress-for-gmail-25mb",
    preset: "gmail-25",
    spokeType: "gmail-25mb",
    title: "Compress Video for Gmail Attachment (25MB Limit) — ClipShrink",
    h1: "Compress Video for Gmail (25MB Limit)",
    subtitle:
      "Reduce video file size under Gmail’s 25MB attachment limit. Send work clips directly in email without Google Drive links.",
    description:
      "Easily shrink video files under 25MB for Gmail, Outlook, and Apple Mail attachments. 100% private browser processing.",
  },
  "compress-for-whatsapp": {
    slug: "compress-for-whatsapp",
    preset: "whatsapp-16",
    spokeType: "whatsapp",
    title: "Video Size Reducer for WhatsApp (16MB Limit) — ClipShrink",
    h1: "Video Size Reducer for WhatsApp (16MB)",
    subtitle:
      "Compress video clips below WhatsApp’s 16MB file ceiling for instant sending on WhatsApp Web and mobile without quality loss.",
    description:
      "Reduce video size for WhatsApp attachments. Converts to standard H.264 MP4 with optimal 16MB bitrate limits.",
  },
  "compress-video-on-iphone": {
    slug: "compress-video-on-iphone",
    preset: "whatsapp-16",
    spokeType: "iphone-compress",
    title: "Compress Video on iPhone Free (No App Required) — ClipShrink",
    h1: "Compress Video on iPhone (No App Needed)",
    subtitle:
      "Reduce large iPhone camera roll videos and MOV files directly in mobile Safari. Fast, private, zero third-party app installations.",
    description:
      "Compress video on iPhone for free without installing apps. In-browser client-side WebAssembly compressor for iOS Safari.",
  },
  "how-to-send-large-video-from-iphone": {
    slug: "how-to-send-large-video-from-iphone",
    preset: "whatsapp-16",
    spokeType: "iphone-large-video",
    title:
      "How to Send Large Video from iPhone (Under 16MB & 25MB) — ClipShrink",
    h1: "How to Send Large Videos from iPhone",
    subtitle:
      "Shrink iPhone videos under email, SMS, and messaging limits directly in your browser without blurry carrier compression.",
    description:
      "Learn how to send large videos from iPhone by compressing them below SMS, WhatsApp, and Gmail attachment limits locally.",
  },
  "compress-video-for-twitter": {
    slug: "compress-video-for-twitter",
    preset: "twitter-25",
    spokeType: "twitter",
    title: "Compress Video for Twitter / X Online Free — ClipShrink",
    h1: "Compress Video for Twitter / X",
    subtitle:
      "Optimize video files for Twitter/X. Bypass server upload errors and maintain sharp 720p HD clarity with automated bitrate scaling.",
    description:
      "Compress video for Twitter / X under upload thresholds online for free. Fast WebAssembly processing with zero server uploads.",
  },
  "compress-mp4-to-100mb": {
    slug: "compress-mp4-to-100mb",
    preset: "file-100",
    spokeType: "100mb",
    title: "Compress Video to 100MB Free Online — ClipShrink",
    h1: "Compress Video to 100MB",
    subtitle:
      "Shrink large MP4 and MOV videos under 100MB for portal uploads, university LMS platforms, and Discord Nitro.",
    description:
      "Compress MP4 and MOV videos under 100MB online for free. WebAssembly browser encoding with zero watermarks.",
  },
  "compress-mp4-to-10mb": {
    slug: "compress-mp4-to-10mb",
    preset: "custom",
    spokeType: "10mb",
    title: "Compress MP4 to 10MB Online Free — ClipShrink",
    h1: "Compress MP4 Video to 10MB",
    subtitle:
      "Shrink any large MP4, MOV, or MKV file down to exactly 10MB with automated bitrate optimization.",
    description:
      "Compress MP4 files to under 10MB online for free. Fast WebAssembly processing with zero server uploads.",
  },
  "compress-video-for-email": {
    slug: "compress-video-for-email",
    preset: "gmail-25",
    spokeType: "email-20mb",
    title: "Compress Video for Email (Under 20MB) — Free Online",
    h1: "Compress Video for Email Attachments",
    subtitle:
      "Shrink video file sizes below 20MB for Outlook, Apple Mail, and Yahoo. Attach videos directly without cloud drive links.",
    description:
      "Compress MP4 and MOV videos under 20MB for email attachments. Fast in-browser processing with no file uploads or watermarks.",
  },
  "compress-video-for-outlook": {
    slug: "compress-video-for-outlook",
    preset: "gmail-25",
    spokeType: "outlook-20mb",
    title: "Compress Video for Outlook (20MB Limit) — ClipShrink",
    h1: "Compress Video for Outlook Attachments",
    subtitle:
      "Reduce video file sizes to under Outlook's 20MB limit. Perfect for workplace screen recordings and presentation decks.",
    description:
      "Reduce MP4 and MOV video size under 20MB for Microsoft Outlook attachments directly in your browser without quality loss.",
  },
  "compress-video-for-slack": {
    slug: "compress-video-for-slack",
    preset: "custom",
    spokeType: "slack-10mb",
    title: "Compress Video for Slack (Under 10MB) — ClipShrink",
    h1: "Compress Video for Slack",
    subtitle:
      "Shrink bug demos and video recordings under 10MB for instant playback in Slack messages without clogging storage.",
    description:
      "Compress videos for Slack under 10MB. 100% private browser processing with zero upload queues.",
  },
  "compress-mp4-to-50mb": {
    slug: "compress-mp4-to-50mb",
    preset: "discord-nitro-50",
    spokeType: "nitro-50mb",
    title: "Compress MP4 to 50MB Online Free — ClipShrink",
    h1: "Compress Video to 50MB",
    subtitle:
      "Shrink large video files down to 50MB for Discord Nitro Basic, web forms, and online portals.",
    description:
      "Compress MP4 files to under 50MB online for free. In-browser WebAssembly encoding with no watermarks.",
  },
  "compress-mp4-to-25mb": {
    slug: "compress-mp4-to-25mb",
    preset: "gmail-25",
    spokeType: "25mb-custom",
    title: "Compress MP4 to 25MB Free Online — ClipShrink",
    h1: "Compress MP4 Video to 25MB",
    subtitle:
      "Automated bitrate scaling to shrink any MP4 video under 25MB without audio degradation.",
    description:
      "Reduce MP4 files to under 25MB online. Safe, client-side WebAssembly video compressor with instant download.",
  },
  "compress-mov-for-discord": {
    slug: "compress-mov-for-discord",
    preset: "discord-8",
    spokeType: "mov-to-discord",
    title: "Compress & Convert iPhone MOV for Discord (8MB) — ClipShrink",
    h1: "Compress iPhone MOV for Discord",
    subtitle:
      "Convert heavy Apple QuickTime MOV clips into Discord-compatible 8MB MP4 files that play directly in chat.",
    description:
      "Convert and compress iPhone MOV videos to Discord-friendly 8MB MP4 format directly in your browser. 100% private.",
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
        name: "Video Compressors",
        item: "https://clipshrink.com",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: spoke.h1,
        item: `https://clipshrink.com/video/${spoke.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 sm:py-16">
      {/* App Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb Hierarchy Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-4">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-200">{spoke.h1}</span>
        </nav>

        <div className="text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {spoke.h1}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            {spoke.subtitle}
          </p>
        </div>
      </div>

      <VideoCompressor initialPreset={spoke.preset} />
      <SeoContent type={spoke.spokeType} />
    </main>
  );
}
