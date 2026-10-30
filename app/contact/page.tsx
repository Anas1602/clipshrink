import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Support & Feedback — ClipShrink",
  description:
    "Contact the ClipShrink support team for technical help, bug reports, feature suggestions, or business inquiries.",
  alternates: {
    canonical: "https://clipshrink.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-slate-700 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Contact Us
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Have feedback, a feature suggestion, or an issue with a specific video
          file? Reach out below.
        </p>
      </div>

      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-3">
        <h2 className="text-base font-bold text-slate-900">
          Direct Email Support
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          For general inquiries, partnership opportunities, or technical help,
          email us directly at:
        </p>
        <p className="text-sm font-medium">
          <a
            href="mailto:support@clipshrink.com"
            className="text-indigo-600 hover:text-indigo-700 underline underline-offset-4 font-mono text-base">
            support@clipshrink.com
          </a>
        </p>
        <p className="text-xs text-slate-500 pt-1">
          We typically review and respond to emails within 24 to 48 business
          hours.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Reporting a Bug or Conversion Issue
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          Because ClipShrink runs locally inside your browser via WebAssembly,
          processing behavior depends on your browser version and available
          device memory. When reporting an issue, please include:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-600 ml-1">
          <li>
            Your operating system (e.g., macOS Sequoia, Windows 11, iOS 18,
            Android 15)
          </li>
          <li>
            Your browser name and version (e.g., Chrome 130, Safari 18, Firefox
            132)
          </li>
          <li>
            The source file format and approximate size (e.g., 85MB 4K 60fps
            iPhone MOV)
          </li>
          <li>The error message displayed on screen, if any</li>
        </ul>
      </div>

      <div className="space-y-4 border-t border-slate-200 pt-6">
        <h2 className="text-xl font-bold text-slate-900">Helpful Resources</h2>
        <p className="text-sm text-slate-600">
          Learn more about how our client-side tools handle your files:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <Link
            href="/about"
            className="p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 shadow-xs transition-colors">
            <span className="font-semibold text-slate-900 block mb-1">
              About ClipShrink →
            </span>
            <span className="text-slate-500">
              How local in-browser video encoding works.
            </span>
          </Link>
          <Link
            href="/privacy-policy"
            className="p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 shadow-xs transition-colors">
            <span className="font-semibold text-slate-900 block mb-1">
              Privacy Policy →
            </span>
            <span className="text-slate-500">
              Read our zero-upload, local-first privacy policy.
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
