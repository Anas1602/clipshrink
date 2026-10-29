import type { Metadata } from "next";
import Link from "next/link";
import VideoMuter from "@/components/VideoMuter";
import MuterSeoContent from "@/components/MuterSeoContent";
import { Layers, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Remove Audio from Video Online Free — Runs Locally (0.1s)",
  description:
    "Mute video clips and strip audio tracks in under 0.1 seconds in your browser. 100% private in-browser WebAssembly processing with zero server uploads.",
  alternates: {
    canonical: "https://clipshrink.com/remove-audio",
  },
};

const SPOKE_CARDS = [
  {
    title: "Mute iPhone Video",
    desc: "Remove background voices, wind, and noise from iPhone camera clips directly in mobile Safari.",
    href: "/remove-audio/iphone-video",
  },
  {
    title: "Strip Audio from MP4",
    desc: "Discard AAC/MP3 audio tracks from MP4 videos in 0.1s with bit-for-bit video fidelity.",
    href: "/remove-audio/mp4",
  },
  {
    title: "Mute QuickTime MOV",
    desc: "Strip heavy PCM audio from Apple QuickTime MOV recordings in browser RAM.",
    href: "/remove-audio/mov",
  },
  {
    title: "Mute for Reels / TikTok",
    desc: "Strip background music and store audio before publishing to avoid copyright strikes.",
    href: "/remove-audio/instagram-reels",
  },
  {
    title: "Send Without Sound",
    desc: "Mute private conversations before sharing clips over WhatsApp, SMS, or Slack.",
    href: "/remove-audio/send-without-sound",
  },
  {
    title: "Remove Audio from MKV",
    desc: "Lossless container stream-copy to strip audio tracks from OBS Studio captures.",
    href: "/remove-audio/mkv",
  },
];

export default function RemoveAudioHubPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:py-16">
      <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
        {/* Subtle Trust Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600 mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>0.1s Stream Copy &middot; Zero Server Uploads</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Remove Audio from Video
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          Strip sound from MP4, iPhone MOV, and WebM in under 0.1 seconds. 100%
          private WebAssembly processing with zero watermarks.
        </p>
      </div>

      {/* Main Tool Widget */}
      <div className="relative z-10 mb-16">
        <VideoMuter />
      </div>

      {/* Clean 6 Spoke Grid (No Badges) */}
      <div className="relative z-10 max-w-4xl mx-auto mb-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Dedicated Muting Tools
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            6 Specialized Tools
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
                <span>Open Muter</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Structured SEO Content Below the Fold */}
      <div className="relative z-10">
        <MuterSeoContent />
      </div>
    </main>
  );
}
