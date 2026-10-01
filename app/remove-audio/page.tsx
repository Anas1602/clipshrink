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
    badge: "12K/MO SEARCHES",
    desc: "Remove background voices, wind, and noise from iPhone camera clips directly in mobile Safari.",
    href: "/remove-audio/iphone-video",
  },
  {
    title: "Strip Audio from MP4",
    badge: "LOSSLESS STREAM",
    desc: "Discard AAC/MP3 audio tracks from MP4 videos in 0.1s with bit-for-bit video fidelity.",
    href: "/remove-audio/mp4",
  },
  {
    title: "Mute QuickTime MOV",
    badge: "APPLE QUICKTIME",
    desc: "Strip heavy PCM audio from Apple QuickTime MOV recordings in browser RAM.",
    href: "/remove-audio/mov",
  },
  {
    title: "Mute for Reels / TikTok",
    badge: "COPYRIGHT SHIELD",
    desc: "Strip background music and store audio before publishing to avoid copyright strikes.",
    href: "/remove-audio/instagram-reels",
  },
  {
    title: "Send Without Sound",
    badge: "PRIVACY FIRST",
    desc: "Mute private conversations before sharing clips over WhatsApp, SMS, or Slack.",
    href: "/remove-audio/send-without-sound",
  },
  {
    title: "Remove Audio from MKV",
    badge: "OBS RECORDINGS",
    desc: "Lossless container stream-copy to strip audio tracks from OBS Studio captures.",
    href: "/remove-audio/mkv",
  },
];

export default function RemoveAudioHubPage() {
  return (
    <main className="relative min-h-screen bg-slate-950 px-4 py-8 sm:py-16 overflow-hidden">
      {/* Background Ambient Grid & Radial Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2xl h-88 bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 mb-6 backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-slate-200">
            0.1s In-Browser Stream Copy
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">Zero Server Uploads</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
          Remove Audio from Video <br />
          <span className="bg-linear-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            Mute Video Online for Free
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          Strip sound from MP4, iPhone MOV, and WebM in under 0.1 seconds. 100%
          private WebAssembly processing with zero watermarks.
        </p>
      </div>

      {/* Main Tool Widget */}
      <div className="relative z-10 mb-16">
        <VideoMuter />
      </div>

      {/* Spoke Cards Grid */}
      <div className="relative z-10 max-w-4xl mx-auto mb-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
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
              className="bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/50 p-5 rounded-2xl backdrop-blur-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors">
                    {card.title}
                  </h3>
                </div>
                <span className="inline-block text-[10px] font-mono font-semibold tracking-wider uppercase text-indigo-400 bg-indigo-950/60 border border-indigo-800/40 px-2 py-0.5 rounded-md mb-2">
                  {card.badge}
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-indigo-400 font-medium">
                <span>Open Muter</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Semantic Content Below the Fold */}
      <div className="relative z-10">
        <MuterSeoContent />
      </div>
    </main>
  );
}
