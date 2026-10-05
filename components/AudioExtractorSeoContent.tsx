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
  Headphones,
  Shield,
  Laptop,
} from "lucide-react";

export type ExtractorSlug =
  | "mov-to-mp3"
  | "mp4-to-mp3"
  | "ogg-to-mp3"
  | "webm-to-mp3"
  | "mp4-to-wav"
  | "video-to-wav"
  | "quicktime-to-mp3"
  | "default";

interface AudioExtractorSeoContentProps {
  slug?: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_DATA: Record<string, FaqItem[]> = {
  "mov-to-mp3": [
    {
      question: "How do I convert Apple QuickTime MOV to MP3 online?",
      answer:
        "Drop your .mov video into ClipShrink, select 320kbps Studio Quality or 192kbps Standard, and click Extract. WebAssembly strips the video track and saves a pristine MP3 directly in your browser memory in under 1 second.",
    },
    {
      question: "Will extracting MP3 from MOV degrade audio quality?",
      answer:
        "No. ClipShrink encodes with libmp3lame at up to 320kbps, preserving all high-frequency vocal details, music acoustics, and voice clarity.",
    },
  ],
  "mp4-to-mp3": [
    {
      question: "How to extract audio from an MP4 video file?",
      answer:
        "Drop your MP4 into ClipShrink and click 'Extract Audio'. The client-side engine drops the video stream (-vn) and extracts the audio track in 1 second with zero server uploads.",
    },
    {
      question:
        "Is there a file size limit for extracting audio from long MP4 videos?",
      answer:
        "ClipShrink supports files up to 500MB on desktop and 150MB on mobile. You can extract audio from multi-hour lectures, webinars, and podcasts without hitting paywalls.",
    },
  ],
  "ogg-to-mp3": [
    {
      question: "What is OGG audio and how do I convert it to MP3?",
      answer:
        "OGG Vorbis is the open-source audio container used by Discord, Spotify, and gaming voice systems. Many car stereos and media players cannot open OGG. ClipShrink converts OGG to universal MP3 in browser RAM instantly.",
    },
  ],
  "webm-to-mp3": [
    {
      question: "How to convert WebM screen recording audio to MP3?",
      answer:
        "Browser screen recordings and HTML5 videos are typically saved in WebM with Opus audio. ClipShrink extracts and transcodes the Opus audio into a universally compatible MP3 file in seconds.",
    },
  ],
  "mp4-to-wav": [
    {
      question: "Why convert MP4 to WAV instead of MP3?",
      answer:
        "WAV is uncompressed, lossless PCM audio. Professional music producers and video editors (DaVinci Resolve, Premiere Pro, Pro Tools) prefer WAV because it avoids compression artifacts during mixing and mastering.",
    },
  ],
  "video-to-wav": [
    {
      question: "How do I extract studio-quality uncompressed WAV from video?",
      answer:
        "Select the 'WAV Lossless' preset on ClipShrink and drop your video. The engine exports a 16-bit 44.1kHz uncompressed PCM WAV track identical to the source audio.",
    },
  ],
  "quicktime-to-mp3": [
    {
      question: "How to extract audio from Mac QuickTime screen recordings?",
      answer:
        "Apple QuickTime saves screen recordings as .mov with linear PCM or AAC audio. ClipShrink extracts the audio track into a compact, shareable MP3 file directly in Safari or Chrome without installing third-party Mac apps.",
    },
  ],
  default: [
    {
      question: "How does ClipShrink extract audio in under 1 second?",
      answer:
        "Unlike cloud converters that make you upload a 200MB video over slow Wi-Fi to a remote server, ClipShrink compiles FFmpeg into WebAssembly. It runs locally on your computer CPU and discards the video stream (-vn) in browser RAM without upload wait times.",
    },
    {
      question: "How is ClipShrink better than 123apps (audio-extractor.net)?",
      answer:
        "123apps forces you to upload your personal video to their remote servers and covers the screen with 4–6 banner ads. ClipShrink is 100% ad-free, processes your files locally in RAM with complete privacy, and includes a live inline player to verify audio before downloading.",
    },
    {
      question: "Do my video or audio files ever touch an external server?",
      answer:
        "Never. Video files are loaded into your browser's private memory and processed locally. Zero data is transmitted, stored, or inspected by third parties.",
    },
  ],
};

const COMMON_USE_CASES = [
  {
    title: "Podcasts & Lectures",
    desc: "Rip clean MP3 audio tracks from recorded webinars, lectures, and interviews to listen on the go.",
  },
  {
    title: "Video Editor Workflows",
    desc: "Extract lossless uncompressed 16-bit WAV audio for editing in Premiere Pro, DaVinci, or FL Studio.",
  },
  {
    title: "Music & Beat Sample Ripping",
    desc: "Pull high-fidelity 320kbps audio samples from video clips without background compression artifacts.",
  },
  {
    title: "Voice Memo Conversion",
    desc: "Convert voice memos and phone recordings into universal MP3 format compatible with every device.",
  },
];

const COMPARISON_ROWS = [
  {
    feature: "Extraction Speed",
    cloud: "45–90s (Slow upload + server queue)",
    clipshrink: "0.8–1.5s (Instant in-memory stream demuxing)",
  },
  {
    feature: "Ad Experience",
    cloud: "4–6 intrusive display ads & fake download buttons",
    clipshrink: "100% Clean, fast, and ad-free interface",
  },
  {
    feature: "File Privacy",
    cloud: "Uploaded & stored on remote servers",
    clipshrink: "100% In-Browser RAM (Files never leave device)",
  },
  {
    feature: "Audio Verification",
    cloud: "Blind download (Must open in VLC to check)",
    clipshrink: "Live inline audio player to verify quality before download",
  },
  {
    feature: "Studio Quality (320k / WAV)",
    cloud: "Often paywalled or capped at 128kbps",
    clipshrink: "Full 320kbps MP3 and uncompressed WAV included free",
  },
];

export default function AudioExtractorSeoContent({
  slug = "default",
}: AudioExtractorSeoContentProps) {
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

      {/* Privacy Architecture Diagram */}
      <section aria-labelledby="privacy-flow-heading" className="text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Shield className="w-3.5 h-3.5" />
          End-to-End Local Architecture
        </div>
        <h2
          id="privacy-flow-heading"
          className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          Extracted on Your Device, End to End
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-10">
          Your video never uploads to an external server. Browser RAM extracts
          the audio track instantly.
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
              WASM Audio Demuxer (1s)
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">
              Instant Download
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              320k MP3 or Lossless WAV
            </p>
          </div>
        </div>
      </section>

      {/* Common Use Cases */}
      <section aria-labelledby="use-cases-heading">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Everyday Applications
          </div>
          <h2
            id="use-cases-heading"
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Why Extract Audio from Video?
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

      {/* Comparison Matrix: ClipShrink vs 123apps */}
      <section aria-labelledby="comparison-heading">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            Architectural Comparison
          </div>
          <h2
            id="comparison-heading"
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ClipShrink vs. Legacy Cloud Extractors (123apps)
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Why client-side in-browser audio extraction is faster, cleaner, and
            strictly safer.
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
                    Traditional Cloud Extractors (123apps)
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
            Dedicated Audio Extraction Tools
          </h3>
          <span className="text-[11px] text-slate-600 font-mono">
            Up to 320kbps Studio MP3
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <Link
            href="/extract-audio/mov-to-mp3"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            MOV to MP3 (18K Vol) →
          </Link>
          <Link
            href="/extract-audio/mp4-to-mp3"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            MP4 to MP3 (22K Vol) →
          </Link>
          <Link
            href="/extract-audio/ogg-to-mp3"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            OGG to MP3 (Discord) →
          </Link>
          <Link
            href="/extract-audio/webm-to-mp3"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            WebM to MP3 (Screen) →
          </Link>
          <Link
            href="/extract-audio/mp4-to-wav"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            MP4 to Lossless WAV →
          </Link>
          <Link
            href="/extract-audio/video-to-wav"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Video to WAV Studio →
          </Link>
          <Link
            href="/extract-audio/quicktime-to-mp3"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            QuickTime to MP3 →
          </Link>
        </div>
      </section>
    </div>
  );
}
