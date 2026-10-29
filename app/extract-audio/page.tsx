import type { Metadata } from "next";
import Link from "next/link";
import AudioExtractor from "@/components/AudioExtractor";
import AudioExtractorSeoContent from "@/components/AudioExtractorSeoContent";
import { Layers, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title:
    "Extract Audio from Video Online Free (320kbps MP3 & WAV) — ClipShrink",
  description:
    "Extract audio from MP4, MOV, WebM, and MKV in 1 second. Save as 320kbps Studio MP3 or lossless uncompressed WAV with zero server uploads and 100% device privacy.",
  alternates: {
    canonical: "https://clipshrink.com/extract-audio",
  },
};

const SPOKE_CARDS = [
  {
    title: "MOV to MP3",
    desc: "Extract crystal-clear 320kbps MP3 audio tracks from Apple QuickTime MOV recordings.",
    href: "/extract-audio/mov-to-mp3",
  },
  {
    title: "MP4 to MP3",
    desc: "Rip standard or studio-quality MP3 audio from any MP4 video in under 1 second.",
    href: "/extract-audio/mp4-to-mp3",
  },
  {
    title: "OGG to MP3",
    desc: "Convert Discord voice recordings and gaming OGG audio tracks into universal MP3.",
    href: "/extract-audio/ogg-to-mp3",
  },
  {
    title: "WebM to MP3",
    desc: "Pull voice audio from browser screen captures and HTML5 WebM recordings.",
    href: "/extract-audio/webm-to-mp3",
  },
  {
    title: "MP4 to WAV",
    desc: "Extract uncompressed 16-bit PCM WAV tracks for DaVinci Resolve and Premiere Pro.",
    href: "/extract-audio/mp4-to-wav",
  },
  {
    title: "Video to WAV",
    desc: "Universal video to lossless studio WAV extractor with zero compression artifacts.",
    href: "/extract-audio/video-to-wav",
  },
  {
    title: "QuickTime to MP3",
    desc: "Extract podcasts and voice notes from Apple QuickTime files in browser RAM.",
    href: "/convert/quicktime-to-mp3",
  },
];

export default function AudioExtractorHubPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:py-16">
      <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
        {/* Subtle Trust Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600 mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>1-Second In-Browser Demuxer &middot; Zero Server Uploads</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Extract Audio from Video
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          Rip audio tracks from MP4, MOV, WebM, and MKV in 1 second. Save as
          320kbps MP3 or lossless uncompressed WAV locally in browser memory.
        </p>
      </div>

      {/* Main Tool Widget */}
      <div className="relative z-10 mb-16">
        <AudioExtractor />
      </div>

      {/* Clean 7 Spoke Grid (No Badges) */}
      <div className="relative z-10 max-w-4xl mx-auto mb-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Dedicated Audio Extractors
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            7 Specialized Tools
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {SPOKE_CARDS.map((card, i) => (
            <Link
              key={i}
              href={card.href}
              className="bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-indigo-300 p-5 rounded-2xl shadow-xs transition-all group flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 text-base group-hover:text-indigo-600 transition-colors mb-1.5">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-600 font-medium">
                <span>Open Extractor</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Structured SEO Content Below the Fold */}
      <div className="relative z-10">
        <AudioExtractorSeoContent />
      </div>
    </main>
  );
}
