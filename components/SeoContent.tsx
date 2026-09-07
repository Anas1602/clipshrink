import React from "react";
import Link from "next/link";
import { Zap, Scissors, Smartphone, Lock, HelpCircle } from "lucide-react";

export type SpokeType =
  | "home"
  | "discord-8mb"
  | "gmail-25mb"
  | "whatsapp"
  | "10mb"
  | "email-20mb"
  | "outlook-20mb"
  | "slack-10mb"
  | "nitro-50mb"
  | "25mb-custom"
  | "mov-to-discord"
  | "iphone-compress"
  | "iphone-large-video"
  | "twitter"
  | "100mb";

interface SeoContentProps {
  type?: SpokeType;
}

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_DATA: Record<SpokeType, FaqItem[]> = {
  home: [
    {
      question:
        "How does client-side video compression work without uploading files?",
      answer:
        "ClipShrink compiles industry-standard FFmpeg software into WebAssembly (WASM), allowing your web browser to re-encode video data directly using your device's local processor. Your files never touch an external server.",
    },
    {
      question:
        "Will compressing my video reduce audio quality or remove sound tracks?",
      answer:
        "No. ClipShrink preserves stereo AAC audio at 96 kbps, keeping voice chat and sound effects clear while dedicating 90% of the byte budget to video clarity.",
    },
    {
      question: "What video formats are supported for compression?",
      answer:
        "ClipShrink accepts MP4, Apple QuickTime MOV, WebM, and MKV files, outputting a universally playable H.264 MP4 file.",
    },
    {
      question:
        "How does ClipShrink guarantee the video stays below the target size?",
      answer:
        "Our engine calculates the exact target bitrate based on the duration of your video and applies a safety buffer to ensure high-motion scenes do not exceed your selected megabyte limit.",
    },
  ],
  "discord-8mb": [
    {
      question: "Why does Discord reject videos larger than 8MB or 10MB?",
      answer:
        "Discord enforces a strict upload ceiling for non-Nitro users to control server bandwidth. ClipShrink targets ~7.2MB to guarantee successful uploads on any Discord client.",
    },
    {
      question: "What is the longest video clip I can fit into 8MB on Discord?",
      answer:
        "For gaming clips, 30 to 60 seconds at 720p compress with great clarity. For screen recordings or low-motion clips, up to 2–3 minutes fit cleanly under 8MB.",
    },
    {
      question: "Can I compress iPhone .MOV gaming clips to send on Discord?",
      answer:
        "Yes. ClipShrink converts Apple QuickTime MOV and HEVC container files into Discord-safe H.264 MP4 format with web-optimized faststart headers.",
    },
    {
      question: "Do I need Discord Nitro to share compressed videos?",
      answer:
        "No. ClipShrink is designed specifically so free Discord users can share clips without paying for Nitro subscriptions.",
    },
  ],
  "gmail-25mb": [
    {
      question: "Why does Gmail force videos into Google Drive links?",
      answer:
        "Gmail has a hard 25MB attachment limit. Any file over 25MB is automatically converted into a Google Drive link. ClipShrink reduces your video to ~22.8MB so it attaches directly as an inline file.",
    },
    {
      question:
        "Does this 25MB compression work for Outlook and Apple Mail as well?",
      answer:
        "Yes. Outlook and Apple Mail enforce 20MB–25MB limits. Our 25MB preset ensures seamless direct emailing across all standard email clients.",
    },
    {
      question:
        "Will work presentations and screen recordings remain readable at 25MB?",
      answer:
        "Yes. 25MB provides ample data budget. Screen recordings and presentation videos up to 10 minutes remain crisp and text stays completely legible.",
    },
  ],
  whatsapp: [
    {
      question: "What is WhatsApp's video file size limit?",
      answer:
        "WhatsApp enforces a strict 16MB file size ceiling for videos sent as media attachments on both mobile and WhatsApp Web.",
    },
    {
      question: "Why does WhatsApp Web fail to send certain MP4 files?",
      answer:
        "WhatsApp Web requires videos to be encoded with the H.264 video codec and AAC audio in an MP4 container with faststart metadata. ClipShrink automatically applies these exact compatibility standards.",
    },
    {
      question: "Can I compress videos for WhatsApp status updates?",
      answer:
        "Yes. Compressing your video under 16MB prevents WhatsApp from aggressively re-compressing and blurring your status videos on their servers.",
    },
  ],
  "10mb": [
    {
      question: "Why compress a video to exactly 10MB?",
      answer:
        "10MB is the standard file upload threshold for Discord, Slack free workspaces, various government portal submissions, and job application forms.",
    },
    {
      question: "How does the 10MB bitrate calculation work?",
      answer:
        "ClipShrink calculates: Total Bitrate = (9.4MB × 8192) / Duration. This guarantees the file finishes safely under 10.0MB.",
    },
  ],
  "email-20mb": [
    {
      question: "What is the standard video attachment limit for email?",
      answer:
        "Most mainstream email providers (Outlook, Apple Mail, Yahoo) cap direct attachments between 20MB and 25MB. ClipShrink targets 19MB to ensure delivery without attachment bounces.",
    },
    {
      question: "How do I avoid Google Drive or OneDrive cloud upload links?",
      answer:
        "Compressing your video under 20MB allows your email software to attach the raw MP4 file directly into the email body rather than forcing an external cloud storage link.",
    },
  ],
  "outlook-20mb": [
    {
      question: "What is Outlook's maximum file attachment size?",
      answer:
        "Microsoft Outlook and Exchange servers enforce a default attachment limit of 20MB for external recipients. ClipShrink safely compresses videos to ~19MB to guarantee delivery.",
    },
    {
      question:
        "Will screen recordings and presentation slides stay clear at 20MB?",
      answer:
        "Yes. We use standard H.264 video compression capped at 720p HD, which keeps text, slides, and code demos crisp and legible.",
    },
  ],
  "slack-10mb": [
    {
      question: "Can I send videos on Slack without upgrading to a paid tier?",
      answer:
        "Free Slack workspaces quickly fill up file limits and struggle with large uploads. Compressing video recordings to 10MB ensures instant inline playback inside Slack channels.",
    },
  ],
  "nitro-50mb": [
    {
      question: "What is the upload limit for Discord Nitro Basic?",
      answer:
        "Discord Nitro Basic offers a 50MB upload limit. This preset allows you to retain higher bitrates (1080p 60fps gaming clips) while guaranteeing the file stays strictly under 50MB.",
    },
  ],
  "25mb-custom": [
    {
      question: "Why compress a video to exactly 25MB?",
      answer:
        "25MB is the universal ceiling across major web portals, including web email services, job board application forms, and customer support ticket systems.",
    },
  ],
  "mov-to-discord": [
    {
      question: "Why won't Discord play my iPhone MOV video inline?",
      answer:
        "Apple QuickTime (.MOV) files recorded with HEVC/H.265 often download as an attachment on Discord rather than playing directly in chat. ClipShrink re-encodes MOV videos into web-friendly H.264 MP4 with faststart headers under 8MB.",
    },
  ],
  "iphone-compress": [
    {
      question:
        "How do I compress a video on iPhone without downloading an app from the App Store?",
      answer:
        "Open ClipShrink in Safari on your iPhone, select your file directly from the Photos app or Files, and choose your target size. WebAssembly compresses the video directly in Safari memory without installing third-party apps.",
    },
    {
      question:
        "Why are iPhone videos recorded in MOV and HEVC format so large?",
      answer:
        "iOS records at high bitrates using 4K 60fps or HEVC containers. A 30-second clip can easily exceed 80MB. ClipShrink transcodes and downscales it to web-optimized 720p H.264 MP4.",
    },
    {
      question: "Is it safe to compress personal iPhone videos on ClipShrink?",
      answer:
        "Yes. Unlike cloud conversion apps that upload your family clips to unknown servers, ClipShrink processes 100% on your device. Your video never leaves your iPhone.",
    },
  ],
  "iphone-large-video": [
    {
      question: "How do I send a large video from an iPhone via text or email?",
      answer:
        "Carrier SMS/MMS limits video to 3.5MB, and email limits attachments to 20MB–25MB. By using ClipShrink directly in Safari, you can shrink your iPhone video down under 16MB or 25MB and share it immediately.",
    },
    {
      question:
        "Will compressing prevent iPhone videos from appearing blurry in text messages?",
      answer:
        "Yes! When cellular carriers auto-compress your video over SMS/MMS, they destroy visual quality. Pre-compressing with ClipShrink gives you fine-tuned H.264 bitrate control so your video stays sharp.",
    },
  ],
  twitter: [
    {
      question: "What are the video upload requirements for Twitter / X?",
      answer:
        "Twitter / X supports MP4 and MOV formats up to 512MB for regular users, but large uploads often fail or stall during processing. Compressing to 25MB ensures instantaneous upload and fast transcoding on Twitter servers.",
    },
    {
      question: "Why does Twitter compress my uploaded video into low quality?",
      answer:
        "Twitter's server-side encoder aggressively recompresses high-bitrate files. Uploading a video pre-optimized at 720p 30fps H.264 with AAC audio bypasses severe server re-encoding artifacts.",
    },
  ],
  "100mb": [
    {
      question: "Why compress a video to under 100MB?",
      answer:
        "100MB is the maximum upload limit for many corporate intranets, Discord Nitro standard tiers, learning management portals (Canvas, Blackboard), and job application portals.",
    },
    {
      question: "Can long-form videos fit under 100MB?",
      answer:
        "Yes. 100MB allows up to 15–20 minutes of 720p presentation or webcam recordings to maintain sharp text and clear audio without exceeding portal upload limits.",
    },
  ],
};

export default function SeoContent({ type = "home" }: SeoContentProps) {
  const faqs = FAQ_DATA[type] || FAQ_DATA.home;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 space-y-16 text-slate-300">
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 3 Step Guide */}
      <section aria-labelledby="how-it-works-heading">
        <h2
          id="how-it-works-heading"
          className="text-2xl font-bold text-white text-center mb-8">
          How to Compress Video Online for Free
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center mb-4">
              1
            </div>
            <h3 className="font-semibold text-white mb-2 text-base">
              Select Target Limit
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Choose your target limit (Discord 8MB, WhatsApp 16MB, Gmail 25MB,
              100MB, or Custom). Our engine calculates the exact bitrate needed.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center mb-4">
              2
            </div>
            <h3 className="font-semibold text-white mb-2 text-base">
              Drop Video File
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Drop any MP4, MOV, WebM, or MKV. Compression executes entirely
              inside your browser memory using WebAssembly.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center mb-4">
              3
            </div>
            <h3 className="font-semibold text-white mb-2 text-base">
              Download Output
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Get your optimized MP4 file instantly. No watermarks, no account
              registration, and zero data transmitted to servers.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section
        aria-labelledby="features-heading"
        className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
        <h2 id="features-heading" className="text-xl font-bold text-white mb-6">
          Why Choose ClipShrink Over Cloud Compressors?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <Lock className="w-6 h-6 text-indigo-400 shrink-0" />
            <div>
              <h3 className="font-semibold text-white text-sm">
                100% Client-Side Privacy
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Your personal clips and work videos never touch external cloud
                servers. Zero storage, zero leaks.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Zap className="w-6 h-6 text-indigo-400 shrink-0" />
            <div>
              <h3 className="font-semibold text-white text-sm">
                Zero Server Upload Queue
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Traditional tools force you to upload 100MB over slow
                connections. ClipShrink processes directly on your device CPU.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Scissors className="w-6 h-6 text-indigo-400 shrink-0" />
            <div>
              <h3 className="font-semibold text-white text-sm">
                Dynamic Bitrate Capping
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                We calculate custom VBR bitrates with safety margins so your
                video finishes right below the target size.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Smartphone className="w-6 h-6 text-indigo-400 shrink-0" />
            <div>
              <h3 className="font-semibold text-white text-sm">
                Apple MOV & WebM Support
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Effortlessly convert heavy Apple QuickTime (.MOV) and WebM
                recordings to universally compatible MP4 files.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section aria-labelledby="faq-heading">
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle className="w-6 h-6 text-indigo-400" />
          <h2 id="faq-heading" className="text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <h3 className="font-semibold text-white mb-2 text-base">
                {faq.question}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Hub & Spoke Internal Link Fortress (All 14 Spokes) */}
      <section className="border-t border-slate-800 pt-12 pb-8">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
          Popular Platform Presets & Guides
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <Link
            href="/video/compress-for-discord-8mb"
            className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 hover:text-white transition-colors">
            Discord 8MB Compressor →
          </Link>
          <Link
            href="/video/compress-for-gmail-25mb"
            className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 hover:text-white transition-colors">
            Gmail 25MB Attachment →
          </Link>
          <Link
            href="/video/compress-for-whatsapp"
            className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 hover:text-white transition-colors">
            WhatsApp 16MB Video →
          </Link>
          <Link
            href="/video/compress-video-on-iphone"
            className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 hover:text-white transition-colors">
            Compress Video on iPhone →
          </Link>
          <Link
            href="/video/how-to-send-large-video-from-iphone"
            className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 hover:text-white transition-colors">
            Send Large Video iPhone →
          </Link>
          <Link
            href="/video/compress-video-for-twitter"
            className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 hover:text-white transition-colors">
            Compress for Twitter / X →
          </Link>
          <Link
            href="/video/compress-mp4-to-100mb"
            className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 hover:text-white transition-colors">
            Compress Video to 100MB →
          </Link>
          <Link
            href="/video/compress-mp4-to-10mb"
            className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 hover:text-white transition-colors">
            Compress MP4 to 10MB →
          </Link>
          <Link
            href="/video/compress-video-for-email"
            className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 hover:text-white transition-colors">
            Email Video (20MB) →
          </Link>
          <Link
            href="/video/compress-video-for-outlook"
            className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 hover:text-white transition-colors">
            Outlook 20MB Reducer →
          </Link>
          <Link
            href="/video/compress-video-for-slack"
            className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 hover:text-white transition-colors">
            Slack 10MB Compressor →
          </Link>
          <Link
            href="/video/compress-mov-for-discord"
            className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 hover:text-white transition-colors">
            iPhone MOV for Discord →
          </Link>
          <Link
            href="/video/compress-mp4-to-50mb"
            className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 hover:text-white transition-colors">
            Compress Video to 50MB →
          </Link>
          <Link
            href="/video/compress-mp4-to-25mb"
            className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 hover:text-white transition-colors">
            Compress Video to 25MB →
          </Link>
        </div>
      </section>
    </div>
  );
}
