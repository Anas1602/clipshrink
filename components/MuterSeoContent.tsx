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
  VolumeX,
  Shield,
  Laptop,
} from "lucide-react";

export type MuterSlug =
  | "iphone-video"
  | "mp4"
  | "mov"
  | "instagram-reels"
  | "send-without-sound"
  | "mkv"
  | "default";

interface MuterSeoContentProps {
  slug?: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_DATA: Record<string, FaqItem[]> = {
  "iphone-video": [
    {
      question:
        "How do I remove sound from an iPhone video without downloading an app?",
      answer:
        "Open ClipShrink in Safari on your iPhone, select your video from Photos, and click 'Remove Audio'. The audio track is stripped directly in your iPhone's Safari memory in 0.1 seconds without installing third-party apps or uploading personal clips to cloud servers.",
    },
    {
      question: "Why do iPhone videos have unwanted background noise?",
      answer:
        "iPhones record with multiple sensitive stereo microphones that pick up wind, ambient room hum, and camera handling noise. Muting the video with ClipShrink gives you a clean silent video ready for TikTok, Instagram Reels, or messaging.",
    },
    {
      question: "Will muting my iPhone video reduce 4K or 60fps quality?",
      answer:
        "No. ClipShrink uses stream-copying (-c:v copy). The video stream is not re-encoded, meaning 4K resolution, 60fps frame rate, and HDR color profiles remain bit-for-bit identical.",
    },
  ],
  mp4: [
    {
      question: "How do I remove the audio track from an MP4 video online?",
      answer:
        "Drop your MP4 file into ClipShrink. Our client-side WebAssembly engine strips the AAC or MP3 audio track and saves a silent MP4 in under 0.1 seconds with zero cloud uploads.",
    },
    {
      question: "Does removing audio make the MP4 file size smaller?",
      answer:
        "Yes! Discarding the audio stream reduces the file size by the weight of the audio track (typically 1MB to 10MB depending on audio bitrate and length).",
    },
  ],
  mov: [
    {
      question: "How do I mute an Apple QuickTime MOV video?",
      answer:
        "Apple QuickTime (.MOV) files frequently contain heavy linear PCM audio. ClipShrink strips the audio stream and repacks the video into a universally compatible silent MP4 or MOV file instantly.",
    },
  ],
  "send-without-sound": [
    {
      question:
        "How to send a video without sound via text, WhatsApp, or email?",
      answer:
        "Drop your video into ClipShrink on your phone or computer, click 'Remove Audio', and save the muted file. You can now send the video over WhatsApp, SMS, or Slack without accidental background voices or private noise.",
    },
  ],
  default: [
    {
      question: "How is ClipShrink able to mute videos in 0.1 seconds?",
      answer:
        "Traditional cloud editors decode every video frame and re-encode the entire file. ClipShrink executes directly on your device CPU via WebAssembly. It simply discards the audio packets while copying the video stream directly (-an -c:v copy), completing in less than a second.",
    },
    {
      question: "Do my video files ever get uploaded to a server?",
      answer:
        "Never. Video files are processed 100% locally in your web browser memory. ClipShrink operates with zero cloud storage, zero logs, and zero tracking.",
    },
    {
      question: "Can I mute videos longer than 10 minutes?",
      answer:
        "Yes! Because stream-copying does not consume heavy CPU power, clips up to 500MB process almost instantaneously regardless of video length.",
    },
  ],
};

const COMMON_USE_CASES = [
  {
    title: "Remove Accidental Background Noise",
    desc: "Strip wind roar, breathing, camera handling clicks, or background chatter from public clips.",
  },
  {
    title: "Social Autoplay Feeds",
    desc: "Create silent, attention-grabbing video loops optimized for Instagram, Reddit, and Pinterest feeds.",
  },
  {
    title: "Avoid Copyright Audio Strikes",
    desc: "Mute background radio or store music before publishing footage to YouTube Shorts, TikTok, or Reels.",
  },
  {
    title: "Prep Footage for Voiceovers",
    desc: "Clear native audio tracks to cleanly overlay voiceover tracks, background beats, or sound effects.",
  },
  {
    title: "Privacy & Client Confidentiality",
    desc: "Mute sensitive conversations, classroom chatter, or client meetings before sharing screen recordings.",
  },
  {
    title: "Clean B-Roll Video Libraries",
    desc: "Prepare silent B-roll footage for video editors without cluttering audio timelines with empty mic tracks.",
  },
];

const COMPARISON_ROWS = [
  {
    feature: "Muting Speed",
    cloud: "30–90 seconds (Upload + Cloud Queue)",
    clipshrink: "0.1–0.5 seconds (Instant in-memory stream copy)",
  },
  {
    feature: "Video Pixel Quality",
    cloud: "Re-encoded / blurred on free tiers",
    clipshrink: "100% Bit-for-bit lossless (-c:v copy)",
  },
  {
    feature: "File Privacy",
    cloud: "Stored on remote AWS/GCP servers",
    clipshrink: "100% In-Browser RAM (Files never leave device)",
  },
  {
    feature: "Watermarks & Logos",
    cloud: "Frequent branding watermarks on free accounts",
    clipshrink: "Zero watermarks or branding, 100% clean",
  },
  {
    feature: "Free Usage Quota",
    cloud: "Capped at 5–10 minutes per day",
    clipshrink: "Unlimited free conversions, no accounts needed",
  },
];

export default function MuterSeoContent({
  slug = "default",
}: MuterSeoContentProps) {
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
          Processed on Your Device, End to End
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-10">
          The file never leaves your device. Your browser handles all media
          processing.
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
              FFmpeg WASM (0.1s)
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <VolumeX className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">
              Instant Download
            </h3>
            <p className="text-xs text-slate-400 font-mono">100% Silent MP4</p>
          </div>
        </div>
      </section>

      {/* Common Use Cases Grid */}
      <section aria-labelledby="use-cases-heading">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Built for Content Creators
          </div>
          <h2
            id="use-cases-heading"
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Everyday Reasons to Mute Video Clips
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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

      {/* Comparison Matrix: ClipShrink vs Cloud Converters */}
      <section aria-labelledby="comparison-heading">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            Performance Breakdown
          </div>
          <h2
            id="comparison-heading"
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ClipShrink vs. Cloud Video Muting
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Why dropping audio in local browser RAM outperforms cloud video
            editors on every metric.
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
                    Cloud Video Editors
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
            Dedicated Video Muting Tools
          </h3>
          <span className="text-[11px] text-slate-600 font-mono">
            0.1s Stream-Copy
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
          <Link
            href="/remove-audio/iphone-video"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Mute iPhone Video →
          </Link>
          <Link
            href="/remove-audio/mp4"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Strip Audio from MP4 →
          </Link>
          <Link
            href="/remove-audio/mov"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Mute QuickTime MOV →
          </Link>
          <Link
            href="/remove-audio/instagram-reels"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Mute for Reels / TikTok →
          </Link>
          <Link
            href="/remove-audio/send-without-sound"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Send Video Without Sound →
          </Link>
          <Link
            href="/remove-audio/mkv"
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all">
            Remove Audio from MKV →
          </Link>
        </div>
      </section>
    </div>
  );
}
