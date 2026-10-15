import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Support — ClipShrink",
  description:
    "Contact the ClipShrink team for support, feature requests, or bug reports.",
  alternates: {
    canonical: "https://clipshrink.com/contact",
  },
};
export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-slate-300 space-y-6">
      <h1 className="text-3xl font-extrabold text-white">Contact Us</h1>
      <p className="text-sm leading-relaxed text-slate-400">
        Have feedback, bug reports, or feature requests for ClipShrink? We would
        love to hear from you.
      </p>
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
        <p className="text-sm text-slate-300">
          Email us directly at:{" "}
          <a
            href="mailto:support@clipshrink.com"
            className="text-indigo-400 underline font-medium">
            support@clipshrink.com
          </a>
        </p>
      </div>
    </div>
  );
}
