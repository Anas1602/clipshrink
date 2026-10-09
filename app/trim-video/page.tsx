import type { Metadata } from "next";
import Link from "next/link";
import VideoTrimmer from "@/components/VideoTrimmer";
import TrimmerSeoContent from "@/components/TrimmerSeoContent";
import { Layers, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Trim Video Online Free (0.1s Lossless Cutter) — ClipShrink",
  description:
    "Cut and trim MP4, MOV, WebM, and MKV videos in 0.1 seconds. 100% private in-browser WebAssembly stream-copying with zero uploads, zero watermarks, and zero quality loss.",
  alternates: {
    canonical: "https://clipshrink.com/trim-video",
  },
  openGraph: {
    title: "Trim Video Online Free (0.1s Lossless Cutter) — ClipShrink",
    description:
      "Cut and trim videos instantly in your browser RAM without re-encoding. 100% watermark-free, zero cloud uploads.",
    url: "https://clipshrink.com/trim-video",
    siteName: "ClipShrink",
    type: "website",
  },
};

const TRIMMER_CARDS = [
  {
    title: "Trim MP4 Video",
    badge: "4.4K/MO SEARCHES",
    desc: "Slice intro and outro dead air from universal MP4 clips in 0.1s with zero quality loss.",
    href: "/trim-video/trim-mp4",
  },
  {
    title: "Cut MKV Video",
    badge: "OBS RECORDINGS",
    desc: "Instant keyframe stream-copy cutter for OBS Studio gaming captures and stream highlights.",
    href: "/trim-video/cut-mkv",
  },
  {
    title: "Trim QuickTime MOV",
    badge: "IPHONE & MAC",
    desc: "Cut heavy Apple QuickTime recordings in browser RAM without installing third-party apps.",
    href: "/trim-video/trim-mov",
  },
  {
    title: "Cut Video for Discord",
    badge: "8MB CHAT PREP",
    desc: "Slice clips down to highlight moments to fit easily within Discord free upload limits.",
    href: "/trim-video/cut-video-for-discord",
  },
  {
    title: "Trim WebM Video",
    badge: "SCREEN CAPTURES",
    desc: "Cut meeting captures and browser recordings cleanly with automatic header rebuilding.",
    href: "/trim-video/trim-webm",
  },
  {
    title: "Cut Animated GIF",
    badge: "MEME SHORTENER",
    desc: "Trim heavy GIF animations down to size, reducing file weight by up to 80% with zero watermark.",
    href: "/trim-video/cut-gif",
  },
  {
    title: "Lossless Video Cutter",
    badge: "NO RE-ENCODING",
    desc: "Pure bit-for-bit stream-copying that slices container timestamps with 0% re-encoding artifacts.",
    href: "/trim-video/lossless-video-cutter",
  },
  {
    title: "Trim No Watermark",
    badge: "100% CLEAN EXPORT",
    desc: "Say goodbye to forced Clideo/Kapwing watermarks. Unlimited free exports directly on your device CPU.",
    href: "/trim-video/trim-video-no-watermark",
  },
];

export default function TrimVideoHubPage() {
  return (
    <main className="relative min-h-screen bg-slate-950 px-4 py-8 sm:py-16 overflow-hidden">
      {/* Background Ambient Grid & Radial Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2xl h-88 bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 mb-6 backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-slate-200">
            0.1s In-Browser Stream-Copy
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">Zero Server Uploads</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
          Lossless Video Trimmer <br />
          <span className="bg-linear-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            Cut Video Online Without Re-Encoding
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          Cut and trim MP4, MOV, WebM, and MKV clips in under 0.1 seconds. 100%
          private WebAssembly processing with zero watermarks and zero quality
          loss.
        </p>
      </div>

      {/* Main Tool Widget */}
      <div className="relative z-10 mb-16">
        <VideoTrimmer />
      </div>

      {/* 8 Spoke Cards Grid Directory */}
      <div className="relative z-10 max-w-4xl mx-auto mb-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              Dedicated Trimming Tools
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            8 Specialized Cutters
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {TRIMMER_CARDS.map((card, i) => (
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
                <span>Open Trimmer</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Semantic Content Below the Fold */}
      <div className="relative z-10">
        <TrimmerSeoContent slug="default" />
      </div>
    </main>
  );
}
