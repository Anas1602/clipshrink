import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ClipShrink",
  description:
    "ClipShrink privacy policy: We do not upload, collect, or store your video files. All processing happens locally on your device.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-slate-300 space-y-6">
      <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
      <p className="text-xs text-slate-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>
      <h2 className="text-xl font-bold text-white pt-2">
        1. Zero File Collection
      </h2>
      <p className="text-sm leading-relaxed text-slate-400">
        ClipShrink operates strictly as a client-side web application. When you
        drop a video file onto ClipShrink, the file is loaded into your browser
        memory and processed locally via WebAssembly. We never transmit, upload,
        inspect, or store your video files on any remote server.
      </p>
      <h2 className="text-xl font-bold text-white pt-2">
        2. Analytics & Cookies
      </h2>
      <p className="text-sm leading-relaxed text-slate-400">
        We use standard web analytics (Google Analytics 4) to monitor general
        site traffic, pageviews, and browser compatibility. These analytics do
        not contain personally identifiable information or any data from the
        videos you process.
      </p>
    </div>
  );
}
