import React from "react";
import Link from "next/link";
import {
  HelpCircle,
  Check,
  X,
  Sparkles,
  Layers,
  ChevronDown,
} from "lucide-react";

export type ConverterSlug =
  | "mkv-to-mp4"
  | "hevc-to-mp4"
  | "mov-to-mp4"
  | "webm-to-mp4"
  | "quicktime-to-mp3"
  | "opus-to-mp3"
  | "m4v-to-mp4"
  | "mpeg-to-mp4"
  | "ts-to-mp4"
  | "gif-to-mp4"
  | "default";

interface ConverterSeoContentProps {
  slug?: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_DATA: Record<string, FaqItem[]> = {
  "mkv-to-mp4": [
    {
      question: "How does ClipShrink convert MKV to MP4 in under 1 second?",
      answer:
        "OBS Studio and gaming capture software record in MKV to prevent file corruption. When converting to MP4, ClipShrink uses stream-copying (-c copy), which simply swaps the container without re-encoding video frames. It executes directly in browser RAM with 0% quality loss.",
    },
    {
      question: "Why won't Premiere Pro or CapCut import my MKV file?",
      answer:
        "Many video editors do not support the MKV container. Converting to MP4 with ClipShrink gives you universal compatibility with Adobe Premiere Pro, DaVinci Resolve, Final Cut Pro, and CapCut.",
    },
    {
      question: "Does converting MKV to MP4 reduce video or audio quality?",
      answer:
        "No. Our primary pipeline uses lossless stream-copying. Every single pixel and audio sample remains bit-for-bit identical to your original recording.",
    },
  ],
  "hevc-to-mp4": [
    {
      question:
        "Why does Windows Media Player say 'HEVC Video Extension required'?",
      answer:
        "Modern iPhones record in High Efficiency Video Coding (H.265 / HEVC) by default. Microsoft charges $0.99 for the HEVC codec on Windows. ClipShrink converts your HEVC files into universally supported H.264 MP4 format for free.",
    },
    {
      question: "Can I convert iPhone 4K HEVC video to standard MP4?",
      answer:
        "Yes. ClipShrink transcodes HEVC video into web-standard H.264 with AAC stereo audio and faststart metadata directly on your device CPU.",
    },
  ],
  "mov-to-mp4": [
    {
      question: "Why do Apple QuickTime MOV files fail on Android and Windows?",
      answer:
        "Apple QuickTime (.MOV) files use proprietary metadata and audio tracks that many non-Apple platforms cannot parse. ClipShrink extracts the streams and packages them into standard MP4 with yuv420p pixel format.",
    },
    {
      question:
        "Will converting MOV to MP4 fix the black screen bug on web uploads?",
      answer:
        "Yes! Many web platforms show a black screen when uploading QuickTime clips. ClipShrink applies web-optimized faststart headers and standardized color spaces to ensure instant inline playback.",
    },
  ],
  "quicktime-to-mp3": [
    {
      question: "How do I extract audio from a QuickTime video on PC or Mac?",
      answer:
        "Drop your .mov file into ClipShrink and click convert. The WebAssembly engine strips the video stream and encodes the audio track into a pristine 192kbps MP3 file in seconds.",
    },
    {
      question: "Is there a limit on audio file length?",
      answer:
        "No. You can extract audio from lectures, interviews, and long meetings up to 500MB directly in your browser without cloud upload limits.",
    },
  ],
  "opus-to-mp3": [
    {
      question: "What is an .opus file and why can't I play it?",
      answer:
        "Opus is the low-latency audio codec used by Discord voice messages and WhatsApp voice notes. Most standard media players cannot open raw .opus files. ClipShrink converts them to universal MP3 instantly.",
    },
  ],
  default: [
    {
      question:
        "How is ClipShrink different from cloud converters like CloudConvert or FreeConvert?",
      answer:
        "Traditional cloud converters force you to upload your files to remote cloud servers, wait in queue, and pay after 25MB. ClipShrink runs 100% locally in your browser memory using WebAssembly. Your files never leave your device, and processing starts instantly with zero queues.",
    },
    {
      question: "What is the maximum file size I can convert for free?",
      answer:
        "ClipShrink supports files up to 500MB on desktop browsers and up to 150MB on mobile devices. There are no daily quotas or hidden subscription paywalls.",
    },
    {
      question: "Does ClipShrink add watermarks to converted videos?",
      answer:
        "Never. All conversions are 100% free, watermark-free, and anonymous with no account registration required.",
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Conversion Speed",
    cloud: "30–90s (Upload + Queue + Encode)",
    clipshrink: "0.5–2.0s (Local RAM Stream-Copy)",
  },
  {
    feature: "File Privacy",
    cloud: "Uploaded & stored on remote servers",
    clipshrink: "100% In-Browser RAM (Never leaves device)",
  },
  {
    feature: "Video Quality",
    cloud: "Often compressed or re-encoded",
    clipshrink: "Lossless (Bit-for-bit identical stream copy)",
  },
  {
    feature: "Free File Limits",
    cloud: "Capped at 25MB–100MB on free tiers",
    clipshrink: "Generous 500MB browser capacity",
  },
  {
    feature: "Watermarks & Ads",
    cloud: "Aggressive ads, watermarks, paywalls",
    clipshrink: "Zero watermarks, zero accounts, 100% free",
  },
];

export default function ConverterSeoContent({
  slug = "default",
}: ConverterSeoContentProps) {
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

      {/* 3-Step Guided Workflow */}
      <section aria-labelledby="how-it-works-heading">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Instant In-Browser Pipeline
          </div>
          <h2
            id="how-it-works-heading"
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            How In-Browser Stream Remuxing Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="relative bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl hover:border-slate-700/80 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 font-mono font-bold flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              01
            </div>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-indigo-400 bg-indigo-950/60 border border-indigo-800/40 px-2 py-0.5 rounded-md">
              Zero Upload
            </span>
            <h3 className="font-bold text-white text-base mt-2 mb-2">
              Drop Your File
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Drop your MKV, HEVC, MOV, WebM, or audio file. The file is read
              directly into your browser&apos;s private memory.
            </p>
          </div>

          <div className="relative bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl hover:border-slate-700/80 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 font-mono font-bold flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              02
            </div>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-md">
              0.5s Execution
            </span>
            <h3 className="font-bold text-white text-base mt-2 mb-2">
              Stream-Copy Remux
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our WebAssembly engine rewrites the container headers instantly
              without re-encoding video frames.
            </p>
          </div>

          <div className="relative bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl hover:border-slate-700/80 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 font-mono font-bold flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              03
            </div>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-purple-400 bg-purple-950/60 border border-purple-800/40 px-2 py-0.5 rounded-md">
              Verified Output
            </span>
            <h3 className="font-bold text-white text-base mt-2 mb-2">
              Preview & Download
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Play your converted video right in the browser to verify quality,
              then download immediately with zero watermarks.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section aria-labelledby="comparison-heading">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            Performance Breakdown
          </div>
          <h2
            id="comparison-heading"
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ClipShrink In-Browser vs. Cloud Converters
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Why stream-copying in browser RAM outperforms remote server
            conversions on every metric.
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
                    Traditional Cloud Converters
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

      {/* Internal Links to other converters */}
      <section className="border-t border-slate-800/80 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            More Instant Format Converters
          </h3>
          <span className="text-[11px] text-slate-600 font-mono">
            100% In-Browser RAM
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <Link
            href="/convert/mkv-to-mp4"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            MKV to MP4 (OBS) →
          </Link>
          <Link
            href="/convert/hevc-to-mp4"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            HEVC to MP4 (iPhone) →
          </Link>
          <Link
            href="/convert/mov-to-mp4"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            MOV to MP4 (QuickTime) →
          </Link>
          <Link
            href="/convert/webm-to-mp4"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            WebM to MP4 (Screen) →
          </Link>
          <Link
            href="/convert/quicktime-to-mp3"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            QuickTime to MP3 →
          </Link>
          <Link
            href="/convert/opus-to-mp3"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Opus to MP3 (Discord) →
          </Link>
          <Link
            href="/convert/m4v-to-mp4"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            M4V to MP4 →
          </Link>
          <Link
            href="/convert/gif-to-mp4"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            GIF to MP4 (Meme) →
          </Link>
        </div>
      </section>
    </div>
  );
}
