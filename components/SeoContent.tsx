import React from "react";
import Link from "next/link";
import {
  Zap,
  Scissors,
  Smartphone,
  Lock,
  HelpCircle,
  Check,
  X,
  Sparkles,
  Layers,
} from "lucide-react";

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
        "What makes ClipShrink the fastest video file compressor online?",
      answer:
        "Unlike legacy cloud compressors that force you to upload 100MB+ files to remote server queues, ClipShrink compiles FFmpeg into client-side WebAssembly (WASM). Your local computer CPU processes the video directly in browser memory with zero upload latency.",
    },
    {
      question: "How do I compress a video online for free with no watermark?",
      answer:
        "Select your target size limit (8MB, 16MB, 25MB, or custom), drag and drop your MP4, MOV, or WebM video into the compressor, and download your optimized video instantly. ClipShrink is 100% free and never adds watermarks.",
    },
    {
      question:
        "Will compressing my video reduce audio quality or voice tracks?",
      answer:
        "No. ClipShrink preserves stereo AAC audio at 96 kbps, keeping voice chat, sound effects, and music clear while dedicating 90% of the byte budget to visual sharpness.",
    },
    {
      question:
        "How does the video file compressor guarantee the exact target size?",
      answer:
        "Our engine calculates the exact target bitrate based on your video's duration: Bitrate = (Target MB × 8192) / Duration. It applies a safety buffer to ensure high-motion scenes never exceed your selected ceiling.",
    },
  ],
  "discord-8mb": [
    {
      question: "Why does Discord reject videos larger than 8MB or 10MB?",
      answer:
        "Discord enforces a strict upload ceiling for free users to manage server bandwidth. ClipShrink's video compressor for Discord targets ~7.0MB to guarantee successful uploads across all desktop and mobile Discord apps.",
    },
    {
      question: "Can I use this tool as a GIF compressor for Discord?",
      answer:
        "Yes! Heavy animated GIFs often exceed Discord's 8MB limit. You can drop animated GIFs or short video loops into ClipShrink to reduce their file size safely below 8MB.",
    },
    {
      question: "What is the best video compressor for Discord gaming clips?",
      answer:
        "For fast-paced gameplay clips (Valorant, Fortnite, Call of Duty), 30 to 60 seconds at 720p 30fps compress with great visual clarity. For talking-head or screen recordings, clips up to 2–3 minutes fit cleanly under 8MB.",
    },
    {
      question: "Can I compress iPhone .MOV gaming clips to send on Discord?",
      answer:
        "Yes. ClipShrink converts Apple QuickTime MOV and HEVC container files into Discord-safe H.264 MP4 format with web-optimized faststart headers.",
    },
  ],
  "gmail-25mb": [
    {
      question: "Why does Gmail force videos into Google Drive links?",
      answer:
        "Gmail has a hard 25MB attachment limit. Any file over 25MB is automatically converted into a Google Drive link. ClipShrink reduces your video to ~22.0MB so it attaches directly as an inline file.",
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
        "ClipShrink calculates: Total Bitrate = (9.0MB × 8192) / Duration. This guarantees the file finishes safely under 10.0MB.",
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
      question: "Does Slack compress videos and images uploaded to channels?",
      answer:
        "Yes, Slack heavily compresses media uploads and caps free workspace storage. Pre-compressing video recordings to under 10MB with ClipShrink preserves quality and ensures instant playback directly inside Slack channels.",
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
        "Yes. 100MB allows up to 10–15 minutes of 720p presentation or webcam recordings to maintain sharp text and clear audio without exceeding portal upload limits.",
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Data Privacy & Storage",
    cloud: "Uploaded & stored on remote cloud servers",
    clipshrink: "100% In-Browser RAM (Files never leave device)",
    better: true,
  },
  {
    feature: "Upload Queue Wait Time",
    cloud: "Slow (Must upload 50MB–200MB over network)",
    clipshrink: "0 Seconds (Local CPU processing starts instantly)",
    better: true,
  },
  {
    feature: "Watermarks & Overlays",
    cloud: "Frequent logos or branding on free tiers",
    clipshrink: "100% Clean (Zero watermarks or overlays)",
    better: true,
  },
  {
    feature: "Target Size Precision",
    cloud: "Generic 'low/medium/high' presets",
    clipshrink: "Calculated VBR bitrate guarantee (< 8MB, < 25MB)",
    better: true,
  },
  {
    feature: "Account Registration",
    cloud: "Email signup or daily quota restrictions",
    clipshrink: "Zero signups, no accounts, unlimited free use",
    better: true,
  },
  {
    feature: "Mobile Compatibility",
    cloud: "Forces users to download third-party iOS/Android apps",
    clipshrink: "Runs directly in mobile Safari & Chrome",
    better: true,
  },
];

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
    <div className="w-full max-w-4xl mx-auto mt-20 space-y-20 text-slate-300">
      {/* FAQ Structured Data for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 3-Step Guided Workflow - Modern Architecture Cards */}
      <section aria-labelledby="how-it-works-heading">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Simple 3-Step Workflow
          </div>
          <h2
            id="how-it-works-heading"
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            How to Compress a Video Online for Free
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="relative bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl hover:border-slate-700/80 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 font-mono font-bold flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              01
            </div>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-indigo-400 bg-indigo-950/60 border border-indigo-800/40 px-2 py-0.5 rounded-md">
              Target Selection
            </span>
            <h3 className="font-bold text-white text-base mt-2 mb-2">
              Select Size Limit
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pick Discord 8MB, WhatsApp 16MB, Gmail 25MB, or custom size. Our
              engine computes exact video bitrates automatically.
            </p>
          </div>

          <div className="relative bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl hover:border-slate-700/80 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 font-mono font-bold flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              02
            </div>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-md">
              Client-Side WASM
            </span>
            <h3 className="font-bold text-white text-base mt-2 mb-2">
              Drop Your Video
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Drop any MP4, MOV, WebM, or MKV. Video processing runs 100% inside
              browser RAM using your device CPU.
            </p>
          </div>

          <div className="relative bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl hover:border-slate-700/80 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 font-mono font-bold flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              03
            </div>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-purple-400 bg-purple-950/60 border border-purple-800/40 px-2 py-0.5 rounded-md">
              Instant Output
            </span>
            <h3 className="font-bold text-white text-base mt-2 mb-2">
              Instant Download
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Download your optimized MP4 directly to your device. No
              watermarks, no account signups, and zero data uploads.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Matrix: ClipShrink vs Traditional Cloud Compressors */}
      <section aria-labelledby="comparison-heading">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            Architectural Comparison
          </div>
          <h2
            id="comparison-heading"
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Escape Cloud Compressor Limitations
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Compare client-side in-browser WebAssembly against traditional
            remote server conversion tools.
          </p>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80">
                  <th className="py-4 px-5 text-slate-400 font-semibold uppercase tracking-wider text-[11px] w-1/3">
                    Capability
                  </th>
                  <th className="py-4 px-5 text-slate-400 font-semibold uppercase tracking-wider text-[11px] w-1/3">
                    Legacy Cloud Compressors
                  </th>
                  <th className="py-4 px-5 text-indigo-400 font-bold uppercase tracking-wider text-[11px] w-1/3 bg-indigo-950/20 border-l border-r border-indigo-500/20">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      ClipShrink Dedicated
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-5 font-medium text-white">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-5 text-slate-400 flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-500/80 shrink-0" />
                      <span>{row.cloud}</span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-200 font-medium bg-indigo-950/10 border-l border-r border-indigo-500/20">
                      <div className="flex items-center gap-2 text-indigo-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{row.clipshrink}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section aria-labelledby="features-heading">
        <div className="text-center mb-8">
          <h2
            id="features-heading"
            className="text-2xl font-bold text-white tracking-tight">
            Engineered for Velocity, Privacy, and Precision
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Powered by WebAssembly compiled FFmpeg with H.264 ultrafast
            encoding.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-white text-sm">
                  100% Client-Side Privacy
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.2 rounded">
                  LOCAL RAM
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your personal videos and work recordings never touch external
                servers. Zero data collection, zero leaks, zero logs.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-white text-sm">
                  Zero Server Upload Queue
                </h3>
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/60 border border-indigo-800/40 px-1.5 py-0.2 rounded">
                  INSTANT
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Traditional tools make you upload 100MB+ over slow connections.
                ClipShrink executes directly on your local device CPU.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-white text-sm">
                  Dynamic Bitrate Capping
                </h3>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 border border-purple-800/40 px-1.5 py-0.2 rounded">
                  GUARANTEED
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                We compute custom VBR bitrates with safety margins so your video
                finishes strictly below your selected ceiling on Attempt #1.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-white text-sm">
                  MOV, WebM & MKV Support
                </h3>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-1.5 py-0.2 rounded">
                  UNIVERSAL
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Effortlessly convert Apple QuickTime (.MOV), WebM screen
                recordings, and OBS MKVs into universally compatible H.264 MP4.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section aria-labelledby="faq-heading">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl backdrop-blur-xl">
              <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">
                {faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Hub & Spoke Internal Link Fortress */}
      <section className="border-t border-slate-800/80 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Platform Presets & Compression Guides
          </h3>
          <span className="text-[11px] text-slate-600 font-mono">
            14 Dedicated Tools
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <Link
            href="/video/compress-for-discord-8mb"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Discord 8MB Compressor →
          </Link>
          <Link
            href="/video/compress-for-gmail-25mb"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Gmail 25MB Attachment →
          </Link>
          <Link
            href="/video/compress-for-whatsapp"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            WhatsApp 16MB Video →
          </Link>
          <Link
            href="/video/compress-video-on-iphone"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Compress Video on iPhone →
          </Link>
          <Link
            href="/video/how-to-send-large-video-from-iphone"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Send Large Video iPhone →
          </Link>
          <Link
            href="/video/compress-video-for-twitter"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Compress for Twitter / X →
          </Link>
          <Link
            href="/video/compress-mp4-to-100mb"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Compress Video to 100MB →
          </Link>
          <Link
            href="/video/compress-mp4-to-10mb"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Compress MP4 to 10MB →
          </Link>
          <Link
            href="/video/compress-video-for-email"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Email Video (20MB) →
          </Link>
          <Link
            href="/video/compress-video-for-outlook"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Outlook 20MB Reducer →
          </Link>
          <Link
            href="/video/compress-video-for-slack"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Slack 10MB Compressor →
          </Link>
          <Link
            href="/video/compress-mov-for-discord"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            iPhone MOV for Discord →
          </Link>
          <Link
            href="/video/compress-mp4-to-50mb"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Compress Video to 50MB →
          </Link>
          <Link
            href="/video/compress-mp4-to-25mb"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Compress Video to 25MB →
          </Link>
        </div>
      </section>
    </div>
  );
}
