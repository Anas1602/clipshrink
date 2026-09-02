import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VideoCompressor from "@/components/VideoCompressor";
import SeoContent from "@/components/SeoContent";

interface SpokeData {
  slug: string;
  preset:
    | "discord-8"
    | "whatsapp-16"
    | "gmail-25"
    | "discord-nitro-50"
    | "custom";
  title: string;
  h1: string;
  subtitle: string;
  description: string;
  targetSizeMB: string;
}

const SPOKES: Record<string, SpokeData> = {
  "compress-for-discord-8mb": {
    slug: "compress-for-discord-8mb",
    preset: "discord-8",
    title: "8MB Video Compressor for Discord — Free & No Upload (2026)",
    h1: "8MB Video Compressor for Discord",
    subtitle:
      "Shrink your gaming clips and videos below Discord’s 8MB/10MB free limit instantly in your browser. 100% private, no watermarks.",
    description:
      "Compress MP4, MOV, and WebM videos below Discord’s 8MB upload limit. Fast client-side WebAssembly compression with no file size limits.",
    targetSizeMB: "8MB",
  },
  "compress-for-gmail-25mb": {
    slug: "compress-for-gmail-25mb",
    preset: "gmail-25",
    title: "Compress Video for Gmail Attachment (25MB Limit) — ClipShrink",
    h1: "Compress Video for Gmail (25MB Limit)",
    subtitle:
      "Reduce video file size under Gmail’s 25MB attachment limit. Send work clips directly in email without Google Drive links.",
    description:
      "Easily shrink video files under 25MB for Gmail, Outlook, and Apple Mail attachments. 100% private browser processing.",
    targetSizeMB: "25MB",
  },
  "compress-for-whatsapp": {
    slug: "compress-for-whatsapp",
    preset: "whatsapp-16",
    title: "Video Size Reducer for WhatsApp (16MB Limit) — ClipShrink",
    h1: "Video Size Reducer for WhatsApp (16MB)",
    subtitle:
      "Compress video clips below WhatsApp’s 16MB file ceiling for instant sending on WhatsApp Web and mobile without quality loss.",
    description:
      "Reduce video size for WhatsApp attachments. Converts to standard H.264 MP4 with optimal 16MB bitrate limits.",
    targetSizeMB: "16MB",
  },
  "compress-mp4-to-10mb": {
    slug: "compress-mp4-to-10mb",
    preset: "custom",
    title: "Compress MP4 to 10MB Online Free — ClipShrink",
    h1: "Compress MP4 Video to 10MB",
    subtitle:
      "Shrink any large MP4, MOV, or MKV file down to exactly 10MB with automated two-pass bitrate optimization.",
    description:
      "Compress MP4 files to under 10MB online for free. Fast WebAssembly processing with zero server uploads.",
    targetSizeMB: "10MB",
  },
};

// Generate static HTML pages at build time for 100/100 SEO speed
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

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Target-Specific Header */}
      <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {spoke.h1}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          {spoke.subtitle}
        </p>
      </div>

      {/* Interactive Tool auto-loaded with this Spoke's Preset! */}
      <VideoCompressor initialPreset={spoke.preset} />

      {/* Server-Rendered SEO Content */}
      <SeoContent />
    </main>
  );
}
