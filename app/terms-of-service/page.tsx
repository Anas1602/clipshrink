import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — ClipShrink",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-slate-300 space-y-6">
      <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
      <p className="text-sm leading-relaxed text-slate-400">
        By using ClipShrink, you agree to use the service for lawful purposes.
        Since video processing occurs entirely on your device, you remain solely
        responsible for the content you process and ensure you have the
        appropriate rights to your media files.
      </p>
    </div>
  );
}
