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
  ChevronDown,
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
      question: "How does ClipShrink compress video without uploading it?",
      answer:
        "Unlike legacy cloud compressors that force you to upload 100MB+ files to remote server queues, ClipShrink compiles FFmpeg into client-side WebAssembly (WASM). Your local computer CPU processes the video directly in browser memory with zero upload latency.",
    },
    {
      question: "Does Gmail compress videos automatically when sending?",
      answer:
        "No. Unlike social messaging apps, Gmail does not compress videos. If your video file exceeds 25MB, Gmail rejects the inline attachment and forces it into an external Google Drive link. Compressing your video below 25MB with ClipShrink keeps the file attached directly inside the email body.",
    },
    {
      question: "How long can a 25MB video clip be?",
      answer:
        "At standard 720p HD resolution with optimized 30fps H.264 video and stereo AAC audio, a 25MB video file can comfortably hold between 3 to 7 minutes of crisp video with completely legible text and slides.",
    },
    {
      question: "Can I compress a video for Discord?",
      answer:
        "Yes. Discord raised its free upload limit to 20MB in August 2026 (it was 10MB from late 2024 and 8MB before 2023). Nitro Basic allows 50MB and full Nitro 500MB. Pick the Discord preset, which targets about 18MB, or choose Custom for any other size such as 8MB or 10MB.",
    },
    {
      question: "How do I compress a video online for free with no watermark?",
      answer:
        "Select your target size limit (Discord 20MB, WhatsApp 16MB, Gmail 25MB, or custom), drag and drop your MP4, MOV, or WebM video into the compressor, and download your optimized video instantly. ClipShrink is 100% free, runs locally on your machine, and never adds watermarks.",
    },
    {
      question:
        "Will compressing my video reduce audio quality or voice tracks?",
      answer:
        "ClipShrink keeps stereo AAC audio at 96 kbps for normal size targets and only lowers it when the target is very tight. Any compression trades some quality for size, so the tool keeps voices and effects as clear as the budget allows and gives the rest to the video.",
    },
    {
      question: "How does ClipShrink hit the target size?",
      answer:
        "The engine reads your video's length and calculates a bitrate: Bitrate = (Target MB × 8192) / Duration, aiming slightly under your limit. If the first pass lands over it, the tool retries once at a lower bitrate, and it tells you clearly if the result still doesn't fit.",
    },
  ],
  "discord-8mb": [
    {
      question: "What is Discord's upload limit for free users?",
      answer:
        "Discord raised the free per-file limit to 20MB in August 2026. Before that it was 10MB (from late 2024) and 8MB (before 2023), so older guides quoting 8MB or 10MB are out of date. Nitro Basic allows 50MB and Nitro 500MB. The Discord preset here targets about 18MB to leave headroom.",
    },
    {
      question: "Can I still target 8MB or 10MB for Discord?",
      answer:
        "Yes. Pick the Custom tab and enter 8 or 10. That is useful if you want a smaller file that uploads faster, even though Discord's free limit is now 20MB.",
    },
    {
      question: "Can I use this tool as a GIF compressor for Discord?",
      answer:
        "Not directly: the compressor accepts video files (MP4, MOV, WebM, MKV), not .gif files. Convert the GIF to MP4 with the GIF to MP4 converter first, then compress it here. MP4 is also much smaller than GIF and plays inline on Discord.",
    },
    {
      question: "What is the best video compressor for Discord gaming clips?",
      answer:
        "For fast-paced gameplay clips (Valorant, Fortnite, Call of Duty), 30 to 60 seconds at 720p 30fps compress with great visual clarity. For talking-head or screen recordings, clips of a few minutes fit comfortably under 20MB.",
    },
    {
      question: "Can I compress iPhone .MOV gaming clips to send on Discord?",
      answer:
        "Yes. ClipShrink converts Apple QuickTime MOV and HEVC container files into Discord-safe H.264 MP4 format with web-optimized faststart headers.",
    },
  ],
  "gmail-25mb": [
    {
      question: "Does Gmail compress videos automatically when sending?",
      answer:
        "No. Gmail does not compress or optimize attachments. Any file over 25MB is automatically converted into an external Google Drive link. Compressing your video to ~22.0MB with ClipShrink ensures it attaches directly inline.",
    },
    {
      question: "How long can a 25MB video clip be?",
      answer:
        "With ClipShrink's bitrate calculation, a 25MB file can hold up to 5–8 minutes of clear screen recording or 3–5 minutes of standard camera video at 720p HD resolution.",
    },
    {
      question: "Why does Gmail force videos into Google Drive links?",
      answer:
        "Gmail enforces a hard 25MB attachment limit. When a video exceeds 25MB, Google forces recipient permissions and cloud drive links. ClipShrink reduces the video so recipients can download or view it immediately.",
    },
    {
      question:
        "Does this 25MB compression work for Outlook and Apple Mail as well?",
      answer:
        "Usually. Outlook and Apple Mail typically enforce 20MB–25MB limits. The 25MB preset targets about 22MB, which suits Gmail; for Outlook, use the Outlook compressor, which targets about 18MB.",
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
      question:
        "How do I compress a video for WhatsApp with the least quality loss?",
      answer:
        "Select the WhatsApp 16MB preset on ClipShrink. Our engine downscales your video to 720p HD at 30 FPS while maintaining stereo AAC audio, keeping dialogue clear. WhatsApp may still re-encode videos sent as media, but starting from a clean H.264 file under the limit gives it less to throw away.",
    },
    {
      question: "Why does WhatsApp Web fail to send certain MP4 files?",
      answer:
        "WhatsApp Web requires videos to be encoded with the H.264 video codec and AAC audio in an MP4 container with faststart metadata. ClipShrink automatically applies these exact compatibility standards.",
    },
    {
      question: "Can I compress videos for WhatsApp status updates?",
      answer:
        "Yes. Compressing your video under 16MB first lets it upload quickly, and a clean H.264 file gives WhatsApp's own re-encoding less to degrade. WhatsApp may still re-compress status videos.",
    },
  ],
  "10mb": [
    {
      question: "Why compress a video to exactly 10MB?",
      answer:
        "10MB is a common upload threshold for job application forms, support-ticket systems, and many government and university portals. (For reference, Discord's free limit is now 20MB and Slack allows up to 1GB per file.)",
    },
    {
      question: "How does the 10MB bitrate calculation work?",
      answer:
        "ClipShrink calculates: Total Bitrate = (9.0MB × 8192) / Duration, aiming for about 9MB so there is headroom under 10MB. If the first pass lands over, it retries once at a lower bitrate and tells you if it still can't fit.",
    },
  ],
  "email-20mb": [
    {
      question: "How to compress MP4 files for email?",
      answer:
        "Drop your MP4 file into ClipShrink and select our email preset. The compressor calculates the exact bitrate needed to bring the file under 20MB so it fits typical Outlook, Apple Mail, and Yahoo Mail attachment ceilings.",
    },
    {
      question: "What is the standard video attachment limit for email?",
      answer:
        "Most mainstream email providers (Outlook, Apple Mail, Yahoo) cap direct attachments between 20MB and 25MB. Email encoding makes a file about a third larger in transit, so ClipShrink's email setting targets about 18MB to leave headroom.",
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
        "The Outlook desktop app defaults to a 20MB attachment limit for internet email accounts, while Outlook on the web and Microsoft 365 are typically closer to 25MB and an admin can change it. Encoding adds about a third to the size in transit, so ClipShrink's Outlook setting targets about 18MB.",
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
      question: "What is Slack's file size limit for videos?",
      answer:
        "Slack accepts files up to 1GB on every plan, so 10MB is not a hard limit. A small file uploads faster, starts playing sooner in the channel, and uses less workspace storage, which is why ClipShrink offers a ~10MB target for bug demos and recordings.",
    },
  ],
  "nitro-50mb": [
    {
      question: "What is the upload limit for Discord Nitro Basic?",
      answer:
        "Discord Nitro Basic offers a 50MB upload limit. This preset allows you to retain higher bitrates (1080p 60fps gaming clips) targeting about 46.5MB so it fits under the 50MB limit.",
    },
  ],
  "25mb-custom": [
    {
      question: "Why compress a video to exactly 25MB?",
      answer:
        "25MB is a common ceiling for web email services, job board application forms, and customer support ticket systems.",
    },
  ],
  "mov-to-discord": [
    {
      question: "Why won't Discord play my iPhone MOV video inline?",
      answer:
        "Apple QuickTime (.MOV) files recorded with HEVC/H.265 often download as an attachment on Discord rather than playing directly in chat. ClipShrink re-encodes MOV videos into web-friendly H.264 MP4 with faststart headers, under Discord's 20MB free limit.",
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
        "Why do iPhone videos appear blurry when sent via text to Android?",
      answer:
        "When sending video between iPhone and Android over SMS/MMS, cellular carriers automatically downsample and crush the video to under 3MB. Compressing your video to 16MB on ClipShrink and sending it via WhatsApp, Telegram, or email preserves crisp visual quality.",
    },
    {
      question: "How to send large video from iPhone without iCloud link?",
      answer:
        "Compress the video file below 25MB using ClipShrink directly in mobile Safari. Once shrunk below 25MB, you can attach it directly to Mail, WhatsApp, or Slack without generating an iCloud Drive share link.",
    },
  ],
  twitter: [
    {
      question: "What are the video upload requirements for Twitter / X?",
      answer:
        "Twitter / X supports MP4 and MOV formats up to 512MB for regular users, but large uploads can fail or stall during processing. A smaller file (ClipShrink's X preset targets about 22MB) uploads faster and is less likely to stall.",
    },
    {
      question: "Why does Twitter compress my uploaded video into low quality?",
      answer:
        "Twitter's server-side encoder aggressively recompresses high-bitrate files. Uploading a video already optimized at 720p 30fps H.264 with AAC audio gives the encoder less to throw away, which can reduce visible artifacts.",
    },
  ],
  "100mb": [
    {
      question: "Why compress a video to under 100MB?",
      answer:
        "100MB is a common upload limit for corporate intranets, learning management portals (Canvas, Blackboard), and job application portals.",
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
    clipshrink: "Bitrate calculated from your target size (e.g. 20MB, 25MB)",
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
              Pick Discord 20MB, WhatsApp 16MB, Gmail 25MB, or a custom size.
              Our engine works out the video bitrate from your clip&apos;s
              length.
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
                servers. Only anonymous site analytics are collected, and
                cookies are used only if you accept.
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
                  TARGETED
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                We compute a bitrate from your clip&apos;s length with a safety
                margin. If the first pass runs over, we retry once at a lower
                bitrate and tell you if it still can&apos;t fit.
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

      {/* Frequently Asked Questions - Expandable Modern Accordion */}
      <section aria-labelledby="faq-heading">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Everything You Need to Know
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Answers to common questions about platform limits, audio quality,
            and browser-side encoding.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-xl transition-all hover:border-slate-700/80 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none text-white font-medium text-sm sm:text-base hover:text-indigo-300 transition-colors">
                <span className="pr-4">{faq.question}</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-200 shrink-0" />
              </summary>
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/40">
                {faq.answer}
              </div>
            </details>
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
            Discord 20MB Compressor →
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
