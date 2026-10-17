import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ClipShrink",
  description:
    "ClipShrink privacy policy: we do not upload, collect, or store your video files. All processing happens locally on your device. Analytics only use cookies if you accept.",
  alternates: {
    canonical: "https://clipshrink.com/privacy-policy",
  },
};

// Update this ONLY when the policy text actually changes.
const LAST_UPDATED = "October 17, 2026";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-slate-300 space-y-6">
      <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
      <p className="text-xs text-slate-500">Last updated: {LAST_UPDATED}</p>

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
        We use Google Analytics 4 to understand general traffic: pageviews,
        approximate region, and device and browser type. It never has access to
        the videos or audio you process.
      </p>
      <p className="text-sm leading-relaxed text-slate-400">
        Analytics cookies are only set after you click Accept All. If you
        decline, or have not chosen yet, Google Analytics runs in a restricted
        mode without cookies. Google may still receive limited signals such as
        the page address and basic browser details so that traffic can be
        counted in aggregate.
      </p>

      <h2 className="text-xl font-bold text-white pt-2">3. Your Choices</h2>
      <p className="text-sm leading-relaxed text-slate-400">
        You can change your analytics choice at any time with the &ldquo;Cookie
        settings&rdquo; link in the site footer. Questions about this policy can
        be sent through our contact page.
      </p>
    </div>
  );
}
