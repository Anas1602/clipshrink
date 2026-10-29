import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About ClipShrink — Free Local-First Video Compression",
  description:
    "Learn about ClipShrink, our mission for private in-browser video compression, and the technology behind our client-side tools.",
  alternates: {
    canonical: "https://clipshrink.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-slate-700 space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
        About ClipShrink
      </h1>
      <p className="text-base leading-relaxed text-slate-600">
        ClipShrink was built with a simple mission: to provide the fastest,
        safest, and most private video compression and media utility on the web.
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-4">Our Technology</h2>
      <p className="text-sm leading-relaxed text-slate-600">
        Unlike traditional online compressors that force you to upload your
        personal videos to remote cloud servers, ClipShrink runs 100% inside
        your web browser using WebAssembly (WASM) and local device processing.
      </p>
      <p className="text-sm leading-relaxed text-slate-600">
        This means your files never leave your computer or phone, your data is
        never stored or viewed by third parties, and processing begins instantly
        with zero upload queues or bandwidth delays.
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-4">
        No Accounts. No Watermarks.
      </h2>
      <p className="text-sm leading-relaxed text-slate-600">
        Because our server infrastructure costs are virtually zero (since your
        device does the computing), we never watermark your exports, require
        credit cards, or lock essential format features behind monthly
        subscription paywalls.
      </p>
    </div>
  );
}
