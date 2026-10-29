import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ClipShrink",
  description:
    "ClipShrink privacy policy: we do not upload, collect, or store your video files. All processing happens locally on your device. Analytics only use cookies if you accept.",
  alternates: {
    canonical: "https://clipshrink.com/privacy-policy",
  },
};

const LAST_UPDATED = "October 30, 2026";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-slate-700 space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
        Privacy Policy
      </h1>
      <p className="text-xs text-slate-500">Last updated: {LAST_UPDATED}</p>

      <h2 className="text-xl font-bold text-slate-900 pt-2">
        1. Zero File Collection
      </h2>
      <p className="text-sm leading-relaxed text-slate-600">
        ClipShrink operates strictly as a client-side web application. When you
        drop a video or audio file onto ClipShrink, the file is loaded into your
        browser memory sandbox and processed locally via WebAssembly. We never
        transmit, upload, inspect, or store your media files on any remote
        server.
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-2">
        2. Analytics & Cookies
      </h2>
      <p className="text-sm leading-relaxed text-slate-600">
        We use Google Analytics 4 to understand general traffic: aggregate
        pageviews, approximate geographic region, and device/browser types. It
        never has access to the videos or audio tracks you process.
      </p>
      <p className="text-sm leading-relaxed text-slate-600">
        Analytics cookies are only set after you click &ldquo;Accept All&rdquo;
        on our consent banner. If you decline or have not chosen yet, Google
        Analytics operates in a restricted mode without cookies.
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-2">3. Your Choices</h2>
      <p className="text-sm leading-relaxed text-slate-600">
        You can change your analytics preferences at any time by clicking the
        &ldquo;Cookie settings&rdquo; link in the site footer. If you have any
        questions regarding our local-first privacy architecture, please reach
        out via our contact page.
      </p>
    </div>
  );
}
