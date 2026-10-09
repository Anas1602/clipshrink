import React from "react";
import Link from "next/link";
import {
  Zap,
  HelpCircle,
  Check,
  X,
  Sparkles,
  Layers,
  ChevronDown,
  Scissors,
  Shield,
  Laptop,
} from "lucide-react";

export type TrimmerSlug =
  | "trim-mp4"
  | "cut-mkv"
  | "trim-mov"
  | "cut-video-for-discord"
  | "trim-webm"
  | "cut-gif"
  | "lossless-video-cutter"
  | "trim-video-no-watermark"
  | "default";

interface TrimmerSeoContentProps {
  slug?: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_DATA: Record<string, FaqItem[]> = {
  "trim-mp4": [
    {
      question: "How do I trim an MP4 video online without losing quality?",
      answer:
        "Drop your MP4 into ClipShrink, drag the start and end handles, and click 'Trim Video Now'. Our WebAssembly engine performs an instant stream-copy cut (-c copy) directly in browser RAM. It rewrites container timestamps without re-encoding frames, giving you bit-for-bit identical video quality in 0.1 seconds.",
    },
    {
      question: "Does trimming an MP4 file reduce its file size?",
      answer:
        "Yes. Removing unwanted intro or outro segments physically discards those frames from the file container, proportionally reducing file size without any compression degradation.",
    },
    {
      question: "Is there a file size limit for trimming MP4 videos?",
      answer:
        "ClipShrink supports MP4 files up to 500MB on desktop browsers and up to 150MB on mobile Safari and Chrome. Because stream-copying does not re-encode, multi-minute files process almost instantly.",
    },
  ],
  "cut-mkv": [
    {
      question:
        "How do I cut an MKV file from OBS Studio without converting it?",
      answer:
        "OBS Studio records directly in MKV format to prevent corruption if a stream crashes. Traditional cloud cutters cannot open MKV files without long transcoding queues. ClipShrink reads MKV container keyframes locally in browser RAM and cuts highlights in under 1 second.",
    },
    {
      question:
        "Why won't Premiere Pro or DaVinci Resolve import my MKV recording?",
      answer:
        "Many video editors lack native support for MKV containers. When you trim with ClipShrink, the engine can output an instant web-friendly MP4 container while keeping your video and audio streams completely untouched.",
    },
  ],
  "trim-mov": [
    {
      question:
        "How do I trim Apple QuickTime MOV videos without downloading software?",
      answer:
        "Open ClipShrink in Safari on your Mac or iPhone, drop your .mov file, and set your in/out points. The trimming executes locally inside Safari memory using WebAssembly, with zero file uploads and no third-party app installations.",
    },
    {
      question:
        "Why do trimmed iPhone MOV files fail when sent to Windows or Android?",
      answer:
        "Trimming inside the native iOS Photos app only adds non-destructive metadata markers that non-Apple devices often ignore. ClipShrink physically cuts the underlying stream and applies web-optimized faststart headers for universal playback.",
    },
  ],
  "cut-video-for-discord": [
    {
      question: "How do I trim a video to fit Discord’s 8MB or 10MB limit?",
      answer:
        "Slice off dead air at the beginning or end of your gaming clip using ClipShrink’s range slider. By cutting a 60-second clip down to 20 seconds, the file size drops immediately, allowing you to share high-definition 60fps clips directly in Discord chat without hitting the upload ceiling.",
    },
    {
      question: "Does ClipShrink add watermarks to Discord clips?",
      answer:
        "Never. ClipShrink is 100% watermark-free, requires no account registration, and exports clean MP4 files ready to drag into Discord channels.",
    },
  ],
  "trim-webm": [
    {
      question: "How to trim a WebM screen recording online?",
      answer:
        "Browser-based screen recorders and meeting capture extensions save in WebM format. ClipShrink allows you to trim out prep time and confidential screens in under 0.1 seconds directly in your browser without cloud uploads.",
    },
  ],
  "cut-gif": [
    {
      question: "How do I cut and trim an animated GIF?",
      answer:
        "Drop your animated GIF into ClipShrink, select your desired start and end timestamps, and click Trim. Our engine slices the frame sequence in memory, reducing heavy GIF sizes by up to 80% without watermarks.",
    },
  ],
  "lossless-video-cutter": [
    {
      question: "What is lossless video cutting and how does it work?",
      answer:
        "Traditional cloud editors decode every video frame and re-encode them (lossy encoding), which causes compression artifacts and takes several minutes. Lossless cutting uses FFmpeg stream-copying (-c copy), which simply slices between keyframes and updates timestamps in 0.1 seconds with 0% quality loss.",
    },
    {
      question:
        "Why is ClipShrink faster than VLC Media Player for cutting videos?",
      answer:
        "While VLC can record clips locally, its cutting controls are hidden, counterintuitive, and require manual start/stop playback. ClipShrink provides modern dual-handle visual scrubbers and millisecond precision inputs, running locally in your browser with zero setup.",
    },
  ],
  "trim-video-no-watermark": [
    {
      question:
        "Why does Clideo and Kapwing put a watermark on trimmed videos?",
      answer:
        "Legacy cloud video tools use expensive remote server farms to render videos, forcing them to watermark free exports to push users into monthly subscriptions. ClipShrink runs 100% locally on your computer CPU via WebAssembly, meaning our server costs are $0 and our exports are 100% watermark-free forever.",
    },
    {
      question: "Is ClipShrink completely free to use without an account?",
      answer:
        "Yes. There are no signups, no subscriptions, no credit card forms, and zero watermarks.",
    },
  ],
  default: [
    {
      question: "How does ClipShrink trim videos in under 0.1 seconds?",
      answer:
        "Unlike cloud editors that make you upload a 200MB file to a remote server and wait in a processing queue, ClipShrink compiles FFmpeg into WebAssembly. It executes directly on your device CPU in browser RAM, using stream-copying (-c copy) to slice container timestamps instantly without re-encoding.",
    },
    {
      question:
        "How is ClipShrink better than 123apps (online-video-cutter.com)?",
      answer:
        "123apps forces you to upload your personal video to their remote servers, stating in their terms that files are stored for 'a few hours.' ClipShrink operates with 100% privacy: your files never leave your device memory, processing is instantaneous, and there are zero intrusive banner ads.",
    },
    {
      question: "Do my video files ever get uploaded to an external server?",
      answer:
        "Never. Video files are loaded into your browser's private memory sandbox and processed locally. Zero bytes are transmitted to any cloud server.",
    },
  ],
};

const COMMON_USE_CASES = [
  {
    title: "Cut Dead Air from Gaming Clips",
    desc: "Slice off the first 30 seconds of waiting in lobby queues before sharing your clutch highlights on Discord or Reddit.",
  },
  {
    title: "Clean Up Meeting & Screen Recordings",
    desc: "Trim out awkward pre-meeting banter or sensitive browser tabs from Loom and Zoom captures in under 1 second.",
  },
  {
    title: "Prep Footage for Social Media",
    desc: "Cut videos down to the exact 15, 30, or 60-second limit required for Instagram Reels, YouTube Shorts, and TikTok.",
  },
  {
    title: "Instant Video Shortening for Email",
    desc: "Quickly reduce presentation clips to just the relevant 20 seconds to stay safely under Gmail’s 25MB attachment limit.",
  },
];

const COMPARISON_ROWS = [
  {
    feature: "Trimming Speed",
    cloud: "45–90s (Slow network upload + server queue)",
    clipshrink: "0.1–0.5s (Instant in-memory stream copy)",
  },
  {
    feature: "Watermark Policy",
    cloud: "Prominent branding watermark unless paid (Clideo)",
    clipshrink: "100% Clean & Watermark-Free Always",
  },
  {
    feature: "File Privacy & Storage",
    cloud: "Stored on remote servers for several hours",
    clipshrink: "100% In-Browser RAM (Never leaves your device)",
  },
  {
    feature: "Video Quality",
    cloud: "Re-encoded / compressed on free tiers",
    clipshrink: "100% Lossless (Bit-for-bit stream copy)",
  },
  {
    feature: "Account Requirement",
    cloud: "Email signup or Google login required to export",
    clipshrink: "Zero signups, no accounts, unlimited use",
  },
];

export default function TrimmerSeoContent({
  slug = "default",
}: TrimmerSeoContentProps) {
  const faqs = FAQ_DATA[slug] || FAQ_DATA.default;

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
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* End-to-End Privacy Flow Diagram */}
      <section aria-labelledby="privacy-flow-heading" className="text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Shield className="w-3.5 h-3.5" />
          End-to-End Local Architecture
        </div>
        <h2
          id="privacy-flow-heading"
          className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          Trimmed on Your Device, End to End
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-10">
          Your video never uploads to an external server. Browser RAM cuts the
          stream in 0.1 seconds.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-3">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">Your Device</h3>
            <p className="text-xs text-slate-400 font-mono">
              Original Video File
            </p>
          </div>

          <div className="bg-indigo-950/30 border border-indigo-500/30 p-6 rounded-2xl backdrop-blur-xl relative">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">
              In-Browser RAM
            </h3>
            <p className="text-xs text-indigo-300 font-mono">
              WASM Stream-Cut (0.1s)
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <Scissors className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">
              Instant Download
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              100% Watermark-Free
            </p>
          </div>
        </div>
      </section>

      {/* Common Everyday Use Cases */}
      <section aria-labelledby="use-cases-heading">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Everyday Applications
          </div>
          <h2
            id="use-cases-heading"
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Why Use In-Browser Stream Trimming?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {COMMON_USE_CASES.map((uc, i) => (
            <div
              key={i}
              className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl backdrop-blur-xl hover:border-slate-700/80 transition-all">
              <div className="w-2 h-2 rounded-full bg-indigo-400 mb-3" />
              <h3 className="font-semibold text-white text-sm mb-1.5">
                {uc.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {uc.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Matrix: ClipShrink vs Clideo & 123apps */}
      <section aria-labelledby="comparison-heading">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            Architectural Comparison
          </div>
          <h2
            id="comparison-heading"
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ClipShrink vs. Cloud Cutters (Clideo & 123apps)
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Why stream-cutting inside local browser memory is faster, cleaner,
            and strictly safer.
          </p>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80">
                  <th className="py-4 px-5 text-slate-400 font-semibold uppercase tracking-wider text-[11px] w-1/3">
                    Feature
                  </th>
                  <th className="py-4 px-5 text-slate-400 font-semibold uppercase tracking-wider text-[11px] w-1/3">
                    Legacy Cloud Editors (Clideo / 123apps)
                  </th>
                  <th className="py-4 px-5 text-indigo-400 font-bold uppercase tracking-wider text-[11px] w-1/3 bg-indigo-950/20 border-l border-r border-indigo-500/20">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      ClipShrink In-Browser RAM
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

      {/* Accordion FAQs */}
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

      {/* Spokes Navigation */}
      <section className="border-t border-slate-800/80 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Dedicated Video Trimming Tools
          </h3>
          <span className="text-[11px] text-slate-600 font-mono">
            0.1s Stream-Copy
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <Link
            href="/trim-video/trim-mp4"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Trim MP4 Video (4.4K) →
          </Link>
          <Link
            href="/trim-video/cut-mkv"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Cut MKV Video (OBS) →
          </Link>
          <Link
            href="/trim-video/trim-mov"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Trim MOV Video (iPhone) →
          </Link>
          <Link
            href="/trim-video/cut-video-for-discord"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Cut Video for Discord →
          </Link>
          <Link
            href="/trim-video/trim-webm"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Trim WebM (Screens) →
          </Link>
          <Link
            href="/trim-video/cut-gif"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Cut GIF (Memes) →
          </Link>
          <Link
            href="/trim-video/lossless-video-cutter"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Lossless Stream Cutter →
          </Link>
          <Link
            href="/trim-video/trim-video-no-watermark"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Trim No Watermark →
          </Link>
        </div>
      </section>
    </div>
  );
}
