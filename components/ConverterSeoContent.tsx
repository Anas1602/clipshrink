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
        "Not when the MKV already contains H.264 video: ClipShrink copies the streams without re-encoding, so every pixel stays identical. If the recording uses another codec such as HEVC or AV1, it has to be re-encoded to H.264 to play everywhere, which changes the file size and can very slightly affect quality.",
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
    {
      question: "How to extract audio from Mac QuickTime screen recordings?",
      answer:
        "QuickTime Player saves screen recordings as .mov files with AAC or PCM audio. Drop the file here and ClipShrink pulls the audio track out as an MP3 in your browser, with no Mac app to install.",
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
    clipshrink:
      "Seconds for H.264 files (local stream-copy); longer when re-encoding is needed",
  },
  {
    feature: "File Privacy",
    cloud: "Uploaded & stored on remote servers",
    clipshrink: "100% In-Browser RAM (Never leaves device)",
  },
  {
    feature: "Video Quality",
    cloud: "Often compressed or re-encoded",
    clipshrink: "Lossless when the video is already H.264 (stream copy)",
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
    <div className="w-full max-w-4xl mx-auto mt-20 space-y-20 text-slate-700">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 3-Step Guided Workflow */}
      <section aria-labelledby="how-it-works-heading">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Instant In-Browser Pipeline
          </div>
          <h2
            id="how-it-works-heading"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How In-Browser Stream Remuxing Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-mono font-bold flex items-center justify-center mb-4">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Drop Your File
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Drop your MKV, HEVC, MOV, WebM, or audio file. The file is read
              directly into your browser&apos;s private memory.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-mono font-bold flex items-center justify-center mb-4">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Stream-Copy Remux
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our WebAssembly engine rewrites the container headers instantly
              without re-encoding video frames.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-mono font-bold flex items-center justify-center mb-4">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Preview & Download
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Play your converted video right in the browser to verify quality,
              then download immediately with zero watermarks.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section aria-labelledby="comparison-heading">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            Performance Breakdown
          </div>
          <h2
            id="comparison-heading"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            ClipShrink In-Browser vs. Cloud Converters
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Why stream-copying in browser RAM outperforms remote server
            conversions on every metric.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-4 px-5 text-slate-600 font-semibold uppercase tracking-wider text-[11px] w-1/3">
                    Feature
                  </th>
                  <th className="py-4 px-5 text-slate-600 font-semibold uppercase tracking-wider text-[11px] w-1/3">
                    Traditional Cloud Converters
                  </th>
                  <th className="py-4 px-5 text-indigo-700 font-bold uppercase tracking-wider text-[11px] w-1/3 bg-indigo-50/50 border-l border-r border-indigo-100">
                    ClipShrink Local WASM
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-5 font-medium text-slate-900">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-5 text-slate-500 flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>{row.cloud}</span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-900 font-medium bg-indigo-50/20 border-l border-r border-indigo-100">
                      <div className="flex items-center gap-2 text-indigo-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
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

      {/* Frequently Asked Questions */}
      <section aria-labelledby="faq-heading">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:border-slate-300 transition-colors [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none text-slate-900 font-medium text-sm sm:text-base hover:text-indigo-600 transition-colors">
                <span className="pr-4">{faq.question}</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-200 shrink-0" />
              </summary>
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Internal Links to other converters */}
      <section className="border-t border-slate-200 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            More Instant Format Converters
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            100% In-Browser RAM
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <Link
            href="/convert/mkv-to-mp4"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            MKV to MP4 (OBS) →
          </Link>
          <Link
            href="/convert/hevc-to-mp4"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            HEVC to MP4 (iPhone) →
          </Link>
          <Link
            href="/convert/mov-to-mp4"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            MOV to MP4 (QuickTime) →
          </Link>
          <Link
            href="/convert/webm-to-mp4"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            WebM to MP4 (Screen) →
          </Link>
          <Link
            href="/convert/quicktime-to-mp3"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            QuickTime to MP3 →
          </Link>
          <Link
            href="/convert/opus-to-mp3"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Opus to MP3 (Discord) →
          </Link>
          <Link
            href="/convert/m4v-to-mp4"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            M4V to MP4 →
          </Link>
          <Link
            href="/convert/gif-to-mp4"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            GIF to MP4 (Meme) →
          </Link>
        </div>
      </section>
    </div>
  );
}
