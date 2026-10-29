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
    <div className="max-w-3xl mx-auto px-4 py-16 text-slate-300 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Contact Us
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          Have feedback, a feature suggestion, or experiencing an issue with
          video compression? We would love to hear from you.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
        <h2 className="text-base font-semibold text-white">
          Direct Email Support
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          For general inquiries, partnership opportunities, or technical help,
          email our team directly at:
        </p>
        <p className="text-sm font-medium">
          <a
            href="mailto:support@clipshrink.com"
            className="text-indigo-400 hover:text-indigo-300 underline font-mono text-base">
            support@clipshrink.com
          </a>
        </p>
        <p className="text-xs text-slate-500 pt-1">
          We typically review and respond to inquiries within 24 to 48 business
          hours.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">
          Reporting a Bug or Conversion Issue
        </h2>
        <p className="text-sm leading-relaxed text-slate-400">
          Because ClipShrink runs entirely inside your web browser via
          WebAssembly (WASM), processing behavior depends heavily on your
          browser version and device memory. When reporting an error, please
          consider including:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-400 ml-2">
          <li>
            Your operating system (e.g., macOS Sonoma, Windows 11, iOS 18,
            Android 14)
          </li>
          <li>
            Your browser name and version (e.g., Google Chrome 130, Safari 18,
            Firefox 131)
          </li>
          <li>
            The source file format and approximate size (e.g., 85MB 4K 60fps
            iPhone MOV)
          </li>
          <li>Any specific error message displayed in the console interface</li>
        </ul>
      </div>

      <div className="space-y-4 border-t border-slate-900 pt-6">
        <h2 className="text-xl font-bold text-white">
          Frequently Requested Resources
        </h2>
        <p className="text-sm text-slate-400">
          Looking for more information about how our client-side technology
          handles your files?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <Link
            href="/about"
            className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors">
            <span className="font-semibold text-white block mb-0.5">
              About Our WASM Engine →
            </span>
            <span className="text-slate-500">
              Learn how zero-server browser encoding works.
            </span>
          </Link>
          <Link
            href="/privacy-policy"
            className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors">
            <span className="font-semibold text-white block mb-0.5">
              Privacy Policy →
            </span>
            <span className="text-slate-500">
              Read our strict zero-file-retention policy.
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
