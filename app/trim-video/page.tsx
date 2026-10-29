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
    desc: "Slice intro and outro dead air from universal MP4 clips in 0.1s with zero quality loss.",
    href: "/trim-video/trim-mp4",
  },
  {
    title: "Cut MKV Video",
    desc: "Instant keyframe stream-copy cutter for OBS Studio gaming captures and stream highlights.",
    href: "/trim-video/cut-mkv",
  },
  {
    title: "Trim QuickTime MOV",
    desc: "Cut heavy Apple QuickTime recordings in browser RAM without installing third-party apps.",
    href: "/trim-video/trim-mov",
  },
  {
    title: "Cut Video for Discord",
    desc: "Slice clips down to highlight moments to fit easily within Discord upload limits.",
    href: "/trim-video/cut-video-for-discord",
  },
  {
    title: "Trim WebM Video",
    desc: "Cut meeting captures and browser recordings cleanly with automatic container rebuilding.",
    href: "/trim-video/trim-webm",
  },
  {
    title: "Cut Animated GIF",
    desc: "Trim heavy GIF animations down to size, reducing file weight by up to 80% with zero watermark.",
    href: "/trim-video/cut-gif",
  },
  {
    title: "Lossless Video Cutter",
    desc: "Pure bit-for-bit stream-copying that slices container timestamps without re-encoding artifacts.",
    href: "/trim-video/lossless-video-cutter",
  },
  {
    title: "Trim Without Watermark",
    desc: "Clean, unbranded exports processed directly on your device CPU with zero paywalls.",
    href: "/trim-video/trim-video-no-watermark",
  },
];

export default function TrimVideoHubPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:py-16">
      <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
        {/* Subtle Trust Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600 mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>0.1s Stream-Copy &middot; Zero Quality Loss</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Lossless Video Trimmer
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          Cut and trim MP4, MOV, WebM, and MKV clips in under 0.1 seconds. 100%
          private WebAssembly processing with zero watermarks.
        </p>
      </div>

      {/* Main Tool Widget */}
      <div className="relative z-10 mb-16">
        <VideoTrimmer />
      </div>

      {/* Clean 8 Spoke Grid (No Badges) */}
      <div className="relative z-10 max-w-4xl mx-auto mb-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
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
              className="bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-indigo-300 p-5 rounded-2xl shadow-xs transition-all group flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors mb-1.5">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-600 font-medium">
                <span>Open Trimmer</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Structured SEO Content Below the Fold */}
      <div className="relative z-10">
        <TrimmerSeoContent slug="default" />
      </div>
    </main>
  );
}
