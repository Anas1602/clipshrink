import type { Metadata } from "next";
import Link from "next/link";
import VideoConverter from "@/components/VideoConverter";
import ConverterSeoContent from "@/components/ConverterSeoContent";
import { Layers, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Instant Video Converter — Free In-Browser Remuxing (2026)",
  description:
    "Convert MKV, HEVC, MOV, WebM, and MP4 videos in under 1 second using WebAssembly stream-copying. 100% private in-browser processing with zero server queues.",
  alternates: {
    canonical: "https://clipshrink.com/convert",
  },
};

const CONVERTER_CARDS = [
  {
    title: "MKV to MP4",
    badge: "OBS STREAMERS",
    desc: "Remux OBS Studio and gaming clips to universal MP4 in 0.5s with zero quality loss.",
    href: "/convert/mkv-to-mp4",
  },
  {
    title: "HEVC to MP4",
    badge: "IPHONE H.265",
    desc: "Convert Apple High Efficiency recordings to standard H.264 MP4 for Windows & Discord.",
    href: "/convert/hevc-to-mp4",
  },
  {
    title: "MOV to MP4",
    badge: "QUICKTIME FIX",
    desc: "Transform heavy Apple QuickTime videos into web-friendly MP4 with faststart headers.",
    href: "/convert/mov-to-mp4",
  },
  {
    title: "WebM to MP4",
    badge: "SCREEN CLIPS",
    desc: "Convert browser screen recordings to standard MP4 with zero upload queues.",
    href: "/convert/webm-to-mp4",
  },
  {
    title: "QuickTime to MP3",
    badge: "AUDIO STRIPPER",
    desc: "Extract pristine MP3 audio tracks and voice memos from QuickTime MOV videos.",
    href: "/convert/quicktime-to-mp3",
  },
  {
    title: "Opus to MP3",
    badge: "DISCORD VOICE",
    desc: "Convert Discord and WhatsApp voice notes into universally playable MP3 files.",
    href: "/convert/opus-to-mp3",
  },
  {
    title: "M4V to MP4",
    badge: "APPLE VIDEO",
    desc: "Instant container remuxing for Apple video files and iTunes recordings.",
    href: "/convert/m4v-to-mp4",
  },
  {
    title: "MPEG to MP4",
    badge: "CAMERAS",
    desc: "Convert legacy broadcast MPEG camera recordings to modern H.264 MP4.",
    href: "/convert/mpeg-to-mp4",
  },
  {
    title: "TS to MP4",
    badge: "STREAM CAPTURE",
    desc: "Lossless container swap for broadcast transport streams and capture cards.",
    href: "/convert/ts-to-mp4",
  },
  {
    title: "GIF to MP4",
    badge: "90% SMALLER",
    desc: "Convert heavy animated GIFs into lightweight 60fps MP4 video loops.",
    href: "/convert/gif-to-mp4",
  },
];

export default function ConvertHubPage() {
  return (
    <main className="relative min-h-screen bg-slate-950 px-4 py-8 sm:py-16 overflow-hidden">
      {/* Background Ambient Grid & Radial Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2xl h-88 bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 mb-6 backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-slate-200">
            Local WebAssembly Stream-Copy
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">0.5s In-Browser Processing</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
          Instant Video Converter <br />
          <span className="bg-linear-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            Sub-Second In-Browser Remuxing
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          Convert MKV, HEVC, MOV, and WebM video formats in under 1 second. Zero
          server uploads, zero watermarks, and 100% device privacy.
        </p>
      </div>

      {/* Universal Converter Tool */}
      <div className="relative z-10 mb-16">
        <VideoConverter targetFormat="mp4" />
      </div>

      {/* 10 Spoke Grid Directory */}
      <div className="relative z-10 max-w-4xl mx-auto mb-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              Dedicated Format Converters
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            10 Specialized Tools
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CONVERTER_CARDS.map((card, i) => (
            <Link
              key={i}
              href={card.href}
              className="bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/50 p-5 rounded-2xl backdrop-blur-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors">
                    {card.title}
                  </h3>
                  <span className="text-[10px] font-mono font-semibold tracking-wider uppercase text-indigo-400 bg-indigo-950/60 border border-indigo-800/40 px-2 py-0.5 rounded-md">
                    {card.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-indigo-400 font-medium">
                <span>Launch Converter</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Content Below the Fold */}
      <div className="relative z-10">
        <ConverterSeoContent />
      </div>
    </main>
  );
}
