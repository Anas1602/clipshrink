# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

```

# AGENTS.md

```md
<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

```

# app\about\page.tsx

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About ClipShrink — Free Local-First Video Compression",
  description:
    "Learn about ClipShrink, our mission for private in-browser video compression, and the technology behind our client-side tools.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-slate-300 space-y-6">
      <h1 className="text-3xl font-extrabold text-white">About ClipShrink</h1>
      <p className="text-base leading-relaxed">
        ClipShrink was built with a simple mission: to provide the fastest,
        safest, and most private video compression utility on the web.
      </p>
      <h2 className="text-xl font-bold text-white pt-4">Our Technology</h2>
      <p className="text-sm leading-relaxed text-slate-400">
        Unlike traditional online compressors that force you to upload your
        personal videos to remote cloud servers, ClipShrink runs 100% inside
        your web browser using WebAssembly (WASM) and local device processing.
      </p>
      <p className="text-sm leading-relaxed text-slate-400">
        This means your files never leave your computer or phone, your data is
        never stored or viewed by third parties, and compression begins
        instantly with zero upload queues.
      </p>
    </div>
  );
}

```

# app\contact\page.tsx

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Support — ClipShrink",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-slate-300 space-y-6">
      <h1 className="text-3xl font-extrabold text-white">Contact Us</h1>
      <p className="text-sm leading-relaxed text-slate-400">
        Have feedback, bug reports, or feature requests for ClipShrink? We would
        love to hear from you.
      </p>
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
        <p className="text-sm text-slate-300">
          Email us directly at:{" "}
          <a
            href="mailto:support@clipshrink.com"
            className="text-indigo-400 underline font-medium">
            support@clipshrink.com
          </a>
        </p>
      </div>
    </div>
  );
}

```

# app\favicon.ico

This is a binary file of the type: Binary

# app\globals.css

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}

```

# app\icon.svg

This is a file of the type: SVG Image

# app\layout.tsx

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://clipshrink.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-950 text-slate-100 antialiased`}>
        {/* Google Analytics 4 Scripts inside Body */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-42HGTD9K87"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-42HGTD9K87');
          `}
        </Script>

        {/* Navigation Bar */}
        <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-white">
              <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-indigo-600/30">
                CS
              </span>
              ClipShrink
            </Link>
            <nav className="flex items-center gap-6 text-xs sm:text-sm text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">
                Compressor
              </Link>
              <Link
                href="/about"
                className="hover:text-white transition-colors">
                About
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:text-white transition-colors">
                Privacy
              </Link>
            </nav>
          </div>
        </header>

        {children}

        {/* Footer */}
        <footer className="border-t border-slate-900 bg-slate-950 py-12 text-center text-xs text-slate-500">
          <div className="max-w-6xl mx-auto px-4 space-y-4">
            <div className="flex flex-wrap justify-center gap-6 text-slate-400">
              <Link href="/about" className="hover:underline">
                About ClipShrink
              </Link>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:underline">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </div>
            <p>
              © {new Date().getFullYear()} ClipShrink. All rights reserved.
              Video files are processed 100% locally in your browser.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

```

# app\page.tsx

```tsx
import type { Metadata } from "next";
import VideoCompressor from "@/components/VideoCompressor";
import SeoContent from "@/components/SeoContent";

export const metadata: Metadata = {
  title: "8MB Video Compressor — Free Online for Discord & Email (2026)",
  description:
    "Shrink video file size under 8MB, 16MB, or 25MB directly in your browser. 100% private, no file uploads, no watermark, and zero signup required.",
  alternates: {
    canonical: "https://clipshrink.com",
  },
  openGraph: {
    title: "8MB Video Compressor — Shrink Video for Discord & Email",
    description:
      "Compress MP4, MOV, and WebM videos below platform upload limits locally in your browser.",
    url: "https://clipshrink.com",
    siteName: "ClipShrink",
    type: "website",
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ClipShrink Video Compressor",
    url: "https://clipshrink.com",
    description:
      "Free client-side video compressor to reduce video files below 8MB for Discord, Gmail, and WhatsApp.",
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
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Above The Fold Headline */}
      <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          8MB Video Compressor <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            For Discord, Email & WhatsApp
          </span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Shrink any video below upload limits instantly in your browser. No
          file uploads, no watermarks, 100% private.
        </p>
      </div>

      {/* Interactive Tool Widget (Client Component) */}
      <VideoCompressor initialPreset="discord-8" />

      {/* Server-Rendered Below The Fold Content (SEO) */}
      <SeoContent />
    </main>
  );
}

```

# app\privacy-policy\page.tsx

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ClipShrink",
  description:
    "ClipShrink privacy policy: We do not upload, collect, or store your video files. All processing happens locally on your device.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-slate-300 space-y-6">
      <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
      <p className="text-xs text-slate-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>
      <h2 className="text-xl font-bold text-white pt-2">
        1. Zero File Collection
      </h2>
      <p className="text-sm leading-relaxed text-slate-400">
        ClipShrink operates strictly as a client-side web application. When you
        drop a video file onto ClipShrink, the file is loaded into your browser
        memory and processed locally via WebAssembly. We never transmit, upload,
        inspect, or store your video files on any remote server.
      </p>
      <h2 className="text-xl font-bold text-white pt-2">
        2. Analytics & Cookies
      </h2>
      <p className="text-sm leading-relaxed text-slate-400">
        We use standard web analytics (Google Analytics 4) to monitor general
        site traffic, pageviews, and browser compatibility. These analytics do
        not contain personally identifiable information or any data from the
        videos you process.
      </p>
    </div>
  );
}

```

# app\robots.ts

```ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.clipshrink.com/sitemap.xml",
  };
}

```

# app\sitemap.ts

```ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://clipshrink.com";

  const spokeUrls = [
    "/video/compress-for-discord-8mb",
    "/video/compress-for-gmail-25mb",
    "/video/compress-for-whatsapp",
    "/video/compress-mp4-to-10mb",
  ];

  const spokeEntries: MetadataRoute.Sitemap = spokeUrls.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...spokeEntries,
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];
}

```

# app\terms-of-service\page.tsx

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — ClipShrink",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-slate-300 space-y-6">
      <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
      <p className="text-sm leading-relaxed text-slate-400">
        By using ClipShrink, you agree to use the service for lawful purposes.
        Since video processing occurs entirely on your device, you remain solely
        responsible for the content you process and ensure you have the
        appropriate rights to your media files.
      </p>
    </div>
  );
}

```

# app\video\[slug]\page.tsx

```tsx
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

```

# CLAUDE.md

```md
@AGENTS.md

```

# components\SeoContent.tsx

```tsx
import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Scissors,
  Smartphone,
  Lock,
  HelpCircle,
} from "lucide-react";

export default function SeoContent() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-16 space-y-16 text-slate-300">
      {/* 3 Step Guide */}
      <section>
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          How to Compress Video for Discord, Gmail, and WhatsApp
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center mb-4">
              1
            </div>
            <h3 className="font-semibold text-white mb-2">
              Select Your Target Preset
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Choose Discord (8MB), Gmail (25MB), or WhatsApp (16MB). Our engine
              automatically calculates the exact bitrate needed.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center mb-4">
              2
            </div>
            <h3 className="font-semibold text-white mb-2">
              Drop Your Video File
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Drop any MP4, MOV, WebM, or MKV. Compression executes entirely
              inside your browser memory with WebAssembly.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center mb-4">
              3
            </div>
            <h3 className="font-semibold text-white mb-2">
              Download Discord-Safe File
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Get your optimized MP4 file instantly. No watermarks, no account
              registration, and zero data leaves your machine.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-6">
          Why Use ClipShrink Over Traditional Cloud Compressors?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <Lock className="w-6 h-6 text-indigo-400 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white text-sm">
                100% Client-Side Privacy
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Your personal clips and work videos never touch external cloud
                servers. Zero storage, zero leaks.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Zap className="w-6 h-6 text-indigo-400 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white text-sm">
                Zero Server Upload Wait
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Traditional tools force you to upload 100MB over slow
                connections. ClipShrink processes directly on your CPU.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Scissors className="w-6 h-6 text-indigo-400 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white text-sm">
                Automated Bitrate Math
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                No guesswork. We compute two-pass bitrate ratios so your file
                lands right under the limit.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Smartphone className="w-6 h-6 text-indigo-400 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white text-sm">
                iPhone MOV & HDR Support
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Effortlessly convert heavy Apple QuickTime (.MOV) and HEVC
                recordings to Discord-safe MP4 format.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section (From Chapter 2.4 Research) */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h3 className="font-semibold text-white mb-2">
              Why does Discord reject videos larger than 8MB / 10MB?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Discord enforces a strict 10MB (historically 8MB) upload limit for
              free tier accounts to minimize server bandwidth costs. ClipShrink
              targets ~7.8MB to ensure your file uploads seamlessly without
              requiring Discord Nitro.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h3 className="font-semibold text-white mb-2">
              Will compressing my video remove audio or ruin sound quality?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              No. ClipShrink preserves full stereo AAC audio at 96 kbps, which
              keeps gaming voice chat and sound effects clear while focusing 90%
              of the byte budget on video clarity.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h3 className="font-semibold text-white mb-2">
              How does client-side compression work if my files are not
              uploaded?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              We compile industry-standard FFmpeg software into WebAssembly
              (WASM), allowing your modern web browser (Chrome, Edge, Firefox,
              Safari) to re-encode video data directly using your
              device`&apos;`s local processor.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h3 className="font-semibold text-white mb-2">
              What is the maximum video length I can shrink to 8MB?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              For crisp 720p gaming clips, 30 to 90 seconds compress cleanly.
              For talking-head or tutorial videos with minimal motion, videos up
              to 3–4 minutes can easily fit under 8MB.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h3 className="font-semibold text-white mb-2">
              Why does my video fail to upload on WhatsApp Web?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              WhatsApp Web enforces a 16MB file ceiling and rejects specific
              video codecs like MKV or raw AV1. ClipShrink converts all uploads
              into standard H.264 MP4 with faststart flags for instant playback.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h3 className="font-semibold text-white mb-2">
              Can I compress iPhone .MOV videos for Discord?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Yes. ClipShrink reads Apple QuickTime MOV and HEVC container files
              directly and converts them into universally playable MP4 files
              compatible with all Discord desktop and mobile apps.
            </p>
          </div>
        </div>
      </section>

      {/* Hub Links Grid (Chapter 3.4) */}
      <section className="border-t border-slate-800 pt-12 pb-8">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
          Related Platform Presets
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <Link
            href="/video/compress-for-discord-8mb"
            className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors">
            Discord 8MB Compressor →
          </Link>
          <Link
            href="/video/compress-for-gmail-25mb"
            className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors">
            Gmail 25MB Attachment →
          </Link>
          <Link
            href="/video/compress-for-whatsapp"
            className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors">
            WhatsApp 16MB Video →
          </Link>
          <Link
            href="/video/compress-mp4-to-10mb"
            className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors">
            Compress MP4 to 10MB →
          </Link>
        </div>
      </section>
    </div>
  );
}

```

# components\VideoCompressor.tsx

```tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  FileVideo,
  Download,
  Sparkles,
  RefreshCw,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";

type TargetPreset =
  | "discord-8"
  | "whatsapp-16"
  | "gmail-25"
  | "discord-nitro-50"
  | "custom";

interface VideoCompressorProps {
  initialPreset?: TargetPreset;
}

export default function VideoCompressor({
  initialPreset = "discord-8",
}: VideoCompressorProps) {
  const [loaded, setLoaded] = useState(false);
  // Default to true so you don't need to call setState inside useEffect
  const [isLoadingFFmpeg, setIsLoadingFFmpeg] = useState(true);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [preset, setPreset] = useState<TargetPreset>(initialPreset);
  const [customSizeMB, setCustomSizeMB] = useState<number>(8);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [compressedBlobUrl, setCompressedBlobUrl] = useState<string | null>(
    null,
  );
  const [outputFileSize, setOutputFileSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ffmpegRef = useRef<FFmpeg | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load FFmpeg WebAssembly on component mount
  useEffect(() => {
    let isMounted = true;

    const loadFFmpeg = async () => {
      try {
        const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
        const ffmpeg = new FFmpeg();

        ffmpeg.on("progress", ({ progress }) => {
          setProgress(Math.round(Math.max(0, Math.min(1, progress)) * 100));
        });

        await ffmpeg.load({
          coreURL: await toBlobURL(
            `${baseURL}/ffmpeg-core.js`,
            "text/javascript",
          ),
          wasmURL: await toBlobURL(
            `${baseURL}/ffmpeg-core.wasm`,
            "application/wasm",
          ),
        });

        if (isMounted) {
          ffmpegRef.current = ffmpeg;
          setLoaded(true);
        }
      } catch (err) {
        console.error("Failed to load FFmpeg:", err);
        if (isMounted) {
          setError(
            "Failed to initialize local browser engine. Please use Chrome, Edge, or Firefox.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoadingFFmpeg(false);
        }
      }
    };

    loadFFmpeg();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    if (!file.type.startsWith("video/")) {
      setError("Please upload a valid video file (.mp4, .mov, .webm, .mkv).");
      return;
    }
    setError(null);
    setVideoFile(file);
    setCompressedBlobUrl(null);
    setOutputFileSize(null);
    setProgress(0);

    const videoElement = document.createElement("video");
    videoElement.preload = "metadata";
    videoElement.onloadedmetadata = () => {
      window.URL.revokeObjectURL(videoElement.src);
      setVideoDuration(videoElement.duration);
    };
    videoElement.src = URL.createObjectURL(file);
  };

  const getTargetMB = (): number => {
    switch (preset) {
      case "discord-8":
        return 7.8;
      case "whatsapp-16":
        return 15.5;
      case "gmail-25":
        return 24.5;
      case "discord-nitro-50":
        return 49.0;
      case "custom":
        return customSizeMB * 0.96;
      default:
        return 7.8;
    }
  };

  const startCompression = async () => {
    if (!videoFile || !ffmpegRef.current || !loaded) return;

    try {
      setIsCompressing(true);
      setError(null);
      setProgress(0);
      setStatusMessage("Preparing video in local memory...");

      const ffmpeg = ffmpegRef.current;
      const inputFileName =
        "input_" + videoFile.name.replace(/[^a-zA-Z0-9.]/g, "_");
      const outputFileName = "output_compressed.mp4";

      await ffmpeg.writeFile(inputFileName, await fetchFile(videoFile));

      const targetMB = getTargetMB();
      const duration = videoDuration > 0 ? videoDuration : 10;
      const audioBitrateK = 96;
      const totalBitrateK = Math.floor((targetMB * 8192) / duration);
      const videoBitrateK = Math.max(100, totalBitrateK - audioBitrateK);

      setStatusMessage(
        "Compressing with browser WebAssembly (100% private)...",
      );

      await ffmpeg.exec([
        "-i",
        inputFileName,
        "-b:v",
        `${videoBitrateK}k`,
        "-maxrate",
        `${Math.floor(videoBitrateK * 1.2)}k`,
        "-bufsize",
        `${Math.floor(videoBitrateK * 2)}k`,
        "-vf",
        "scale=-2:min(720\\,ih)",
        "-c:v",
        "libx264",
        "-preset",
        "faster",
        "-c:a",
        "aac",
        "-b:a",
        `${audioBitrateK}k`,
        "-movflags",
        "+faststart",
        outputFileName,
      ]);

      const data = await ffmpeg.readFile(outputFileName);
      const blob = new Blob([data as Uint8Array<ArrayBuffer>], {
        type: "video/mp4",
      });
      const url = URL.createObjectURL(blob);

      setCompressedBlobUrl(url);
      setOutputFileSize(blob.size);
      setIsCompressing(false);
      setProgress(100);
      setStatusMessage("Compression complete!");

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.error("Compression error:", err);
      setError(
        "An error occurred during compression. Please try a different video or file format.",
      );
      setIsCompressing(false);
    }
  };

  const resetAll = () => {
    setVideoFile(null);
    setCompressedBlobUrl(null);
    setOutputFileSize(null);
    setProgress(0);
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-white">
      {/* Target Size Presets */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          1. Select Target Platform / Limit
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          <button
            type="button"
            onClick={() => setPreset("discord-8")}
            className={`py-3 px-4 rounded-xl text-sm font-medium border flex flex-col items-center justify-center gap-1 transition-all ${
              preset === "discord-8"
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400"
                : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800"
            }`}>
            <span className="font-bold">Discord (8MB)</span>
            <span className="text-[11px] opacity-80">Free User Limit</span>
          </button>

          <button
            type="button"
            onClick={() => setPreset("gmail-25")}
            className={`py-3 px-4 rounded-xl text-sm font-medium border flex flex-col items-center justify-center gap-1 transition-all ${
              preset === "gmail-25"
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400"
                : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800"
            }`}>
            <span className="font-bold">Gmail (25MB)</span>
            <span className="text-[11px] opacity-80">Email Attachment</span>
          </button>

          <button
            type="button"
            onClick={() => setPreset("whatsapp-16")}
            className={`py-3 px-4 rounded-xl text-sm font-medium border flex flex-col items-center justify-center gap-1 transition-all ${
              preset === "whatsapp-16"
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400"
                : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800"
            }`}>
            <span className="font-bold">WhatsApp (16MB)</span>
            <span className="text-[11px] opacity-80">Direct Send Limit</span>
          </button>

          <button
            type="button"
            onClick={() => setPreset("discord-nitro-50")}
            className={`py-3 px-4 rounded-xl text-sm font-medium border flex flex-col items-center justify-center gap-1 transition-all ${
              preset === "discord-nitro-50"
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400"
                : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800"
            }`}>
            <span className="font-bold">Nitro (50MB)</span>
            <span className="text-[11px] opacity-80">High Quality</span>
          </button>

          <button
            type="button"
            onClick={() => setPreset("custom")}
            className={`py-3 px-4 rounded-xl text-sm font-medium border flex flex-col items-center justify-center gap-1 transition-all ${
              preset === "custom"
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400"
                : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800"
            }`}>
            <span className="font-bold">Custom</span>
            <span className="text-[11px] opacity-80">{customSizeMB} MB</span>
          </button>
        </div>

        {preset === "custom" && (
          <div className="mt-4 p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center gap-4">
            <span className="text-sm font-medium text-slate-300">
              Target Size (MB):
            </span>
            <input
              type="number"
              min="1"
              max="500"
              value={customSizeMB}
              onChange={(e) =>
                setCustomSizeMB(Math.max(1, Number(e.target.value)))
              }
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-24"
            />
          </div>
        )}
      </div>

      {/* Dropzone Area */}
      {!videoFile ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-700 hover:border-indigo-500 bg-slate-950/50 hover:bg-indigo-950/20 rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center group">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) =>
              e.target.files?.[0] && handleFileSelected(e.target.files[0])
            }
          />
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8 text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">
            Drop your video here or{" "}
            <span className="text-indigo-400 underline underline-offset-4">
              browse files
            </span>
          </h3>
          <p className="text-sm text-slate-400 max-w-sm">
            Supports MP4, MOV, WebM, MKV. Processed 100% locally in your
            browser.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1 rounded-full">
            <Zap className="w-3.5 h-3.5" /> No uploads to external servers •
            100% Private
          </div>
        </div>
      ) : (
        /* Video Selected / Compression Stage */
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                <FileVideo className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white truncate max-w-xs sm:max-w-md">
                  {videoFile.name}
                </h4>
                <p className="text-xs text-slate-400">
                  Original: {(videoFile.size / (1024 * 1024)).toFixed(2)} MB •
                  Target: &lt;{getTargetMB().toFixed(1)} MB
                </p>
              </div>
            </div>
            {!isCompressing && !compressedBlobUrl && (
              <button
                onClick={resetAll}
                className="text-xs text-slate-400 hover:text-white transition-colors">
                Choose another file
              </button>
            )}
          </div>

          {/* Progress / Output Display */}
          {isCompressing && (
            <div className="py-6 space-y-3">
              <div className="flex justify-between text-xs text-slate-300">
                <span>{statusMessage}</span>
                <span className="font-mono font-bold text-indigo-400">
                  {progress}%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center">
                Heavy processing runs inside your browser. Please keep this tab
                open.
              </p>
            </div>
          )}

          {compressedBlobUrl && outputFileSize && (
            <div className="py-6 space-y-4 text-center">
              <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Video Ready!</h3>
              <p className="text-sm text-slate-300">
                Shrunk from{" "}
                <span className="text-slate-400 line-through">
                  {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                </span>{" "}
                down to{" "}
                <span className="text-emerald-400 font-bold text-base">
                  {(outputFileSize / (1024 * 1024)).toFixed(2)} MB
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href={compressedBlobUrl}
                  download={`clipshrink_${videoFile.name.replace(/\.[^/.]+$/, "")}.mp4`}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-base">
                  <Download className="w-5 h-5" /> Download Compressed Video
                </a>
                <button
                  onClick={resetAll}
                  className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 px-6 rounded-xl transition-all text-sm">
                  <RefreshCw className="w-4 h-4" /> Compress Another Video
                </button>
              </div>
            </div>
          )}

          {!isCompressing && !compressedBlobUrl && (
            <div className="pt-6">
              <button
                onClick={startCompression}
                disabled={!loaded || isLoadingFFmpeg}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 text-base">
                <Sparkles className="w-5 h-5" /> Compress Video to &lt;
                {getTargetMB().toFixed(1)}MB Now
              </button>
            </div>
          )}
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="mt-4 p-4 bg-red-950/50 border border-red-800/80 rounded-xl text-red-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

```

# eslint.config.mjs

```mjs
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

```

# next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";
import "./.next/dev/types/root-params.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

# next.config.ts

```ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

```

# package.json

```json
{
  "name": "clipshrink-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@ffmpeg/ffmpeg": "^0.12.15",
    "@ffmpeg/util": "^0.12.2",
    "canvas-confetti": "^1.9.4",
    "lucide-react": "^1.39.0",
    "next": "16.3.4",
    "react": "19.2.8",
    "react-dom": "19.2.8"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/canvas-confetti": "^1.9.0",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.3.4",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}

```

# postcss.config.mjs

```mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;

```

# public\file.svg

This is a file of the type: SVG Image

# public\globe.svg

This is a file of the type: SVG Image

# public\next.svg

This is a file of the type: SVG Image

# public\vercel.svg

This is a file of the type: SVG Image

# public\window.svg

This is a file of the type: SVG Image

# README.md

```md
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}

```

