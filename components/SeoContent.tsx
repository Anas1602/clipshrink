import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Scissors,
  Smartphone,
  Lock,
  HelpCircle,
} from "lucide-react";

export default function SeoContent() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-16 space-y-16 text-slate-300">
      {/* 3 Step Guide */}
      <section>
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          How to Compress Video for Discord, Gmail, and WhatsApp
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center mb-4">
              1
            </div>
            <h3 className="font-semibold text-white mb-2">
              Select Your Target Preset
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Choose Discord (8MB), Gmail (25MB), or WhatsApp (16MB). Our engine
              automatically calculates the exact bitrate needed.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center mb-4">
              2
            </div>
            <h3 className="font-semibold text-white mb-2">
              Drop Your Video File
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Drop any MP4, MOV, WebM, or MKV. Compression executes entirely
              inside your browser memory with WebAssembly.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center mb-4">
              3
            </div>
            <h3 className="font-semibold text-white mb-2">
              Download Discord-Safe File
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Get your optimized MP4 file instantly. No watermarks, no account
              registration, and zero data leaves your machine.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-6">
          Why Use ClipShrink Over Traditional Cloud Compressors?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <Lock className="w-6 h-6 text-indigo-400 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white text-sm">
                100% Client-Side Privacy
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Your personal clips and work videos never touch external cloud
                servers. Zero storage, zero leaks.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Zap className="w-6 h-6 text-indigo-400 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white text-sm">
                Zero Server Upload Wait
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Traditional tools force you to upload 100MB over slow
                connections. ClipShrink processes directly on your CPU.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Scissors className="w-6 h-6 text-indigo-400 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white text-sm">
                Automated Bitrate Math
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                No guesswork. We compute two-pass bitrate ratios so your file
                lands right under the limit.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Smartphone className="w-6 h-6 text-indigo-400 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white text-sm">
                iPhone MOV & HDR Support
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Effortlessly convert heavy Apple QuickTime (.MOV) and HEVC
                recordings to Discord-safe MP4 format.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section (From Chapter 2.4 Research) */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h3 className="font-semibold text-white mb-2">
              Why does Discord reject videos larger than 8MB / 10MB?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Discord enforces a strict 10MB (historically 8MB) upload limit for
              free tier accounts to minimize server bandwidth costs. ClipShrink
              targets ~7.8MB to ensure your file uploads seamlessly without
              requiring Discord Nitro.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h3 className="font-semibold text-white mb-2">
              Will compressing my video remove audio or ruin sound quality?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              No. ClipShrink preserves full stereo AAC audio at 96 kbps, which
              keeps gaming voice chat and sound effects clear while focusing 90%
              of the byte budget on video clarity.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h3 className="font-semibold text-white mb-2">
              How does client-side compression work if my files are not
              uploaded?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              We compile industry-standard FFmpeg software into WebAssembly
              (WASM), allowing your modern web browser (Chrome, Edge, Firefox,
              Safari) to re-encode video data directly using your
              device`&apos;`s local processor.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h3 className="font-semibold text-white mb-2">
              What is the maximum video length I can shrink to 8MB?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              For crisp 720p gaming clips, 30 to 90 seconds compress cleanly.
              For talking-head or tutorial videos with minimal motion, videos up
              to 3–4 minutes can easily fit under 8MB.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h3 className="font-semibold text-white mb-2">
              Why does my video fail to upload on WhatsApp Web?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              WhatsApp Web enforces a 16MB file ceiling and rejects specific
              video codecs like MKV or raw AV1. ClipShrink converts all uploads
              into standard H.264 MP4 with faststart flags for instant playback.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h3 className="font-semibold text-white mb-2">
              Can I compress iPhone .MOV videos for Discord?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Yes. ClipShrink reads Apple QuickTime MOV and HEVC container files
              directly and converts them into universally playable MP4 files
              compatible with all Discord desktop and mobile apps.
            </p>
          </div>
        </div>
      </section>

      {/* Hub Links Grid (Chapter 3.4) */}
      <section className="border-t border-slate-800 pt-12 pb-8">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
          Related Platform Presets
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <Link
            href="/video/compress-for-discord-8mb"
            className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors">
            Discord 8MB Compressor →
          </Link>
          <Link
            href="/video/compress-for-gmail-25mb"
            className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors">
            Gmail 25MB Attachment →
          </Link>
          <Link
            href="/video/compress-for-whatsapp"
            className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors">
            WhatsApp 16MB Video →
          </Link>
          <Link
            href="/video/compress-mp4-to-10mb"
            className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors">
            Compress MP4 to 10MB →
          </Link>
        </div>
      </section>
    </div>
  );
}
