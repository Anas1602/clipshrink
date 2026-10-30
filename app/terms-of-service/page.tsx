import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — ClipShrink",
  description:
    "Review the terms and conditions for using ClipShrink's free, local in-browser video compression and conversion utilities.",
  alternates: {
    canonical: "https://clipshrink.com/terms-of-service",
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-slate-700 space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
        Terms of Service
      </h1>
      <p className="text-xs text-slate-500">Last updated: October 30, 2026</p>

      <h2 className="text-xl font-bold text-slate-900 pt-2">
        1. Agreement to Terms
      </h2>
      <p className="text-sm leading-relaxed text-slate-600">
        By accessing or using ClipShrink (clipshrink.com), you agree to be bound
        by these Terms of Service. If you do not agree to these terms, please do
        not use our utilities.
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-2">
        2. Description of Service
      </h2>
      <p className="text-sm leading-relaxed text-slate-600">
        ClipShrink provides client-side media utilities, including video
        compression, format conversion, audio stripping, and trimming. All
        processing is executed locally on your device via WebAssembly (WASM).
        Your media files are never uploaded to, inspected by, or stored on any
        remote servers.
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-2">
        3. User Responsibility & Permitted Use
      </h2>
      <p className="text-sm leading-relaxed text-slate-600">
        You agree to use ClipShrink solely for lawful purposes. Because video
        processing occurs entirely in your local browser sandbox, you maintain
        exclusive custody of your content. You are solely responsible for
        ensuring that you possess all requisite legal rights, licenses, and
        permissions to process, alter, or convert the media files you select.
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-2">
        4. Intellectual Property
      </h2>
      <p className="text-sm leading-relaxed text-slate-600">
        ClipShrink and its underlying interface, styling, and branding are the
        property of ClipShrink. You retain full ownership and intellectual
        property rights over any videos, audio, or data you process using our
        utilities.
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-2">
        5. Disclaimer of Warranties
      </h2>
      <p className="text-sm leading-relaxed text-slate-600">
        ClipShrink is provided on an &ldquo;as is&rdquo; and &ldquo;as
        available&rdquo; basis without warranties of any kind, whether express
        or implied. While we strive to ensure reliable client-side execution
        across modern web browsers, we do not warrant that the service will be
        uninterrupted, error-free, or compatible with every video codec or
        device configuration.
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-2">
        6. Limitation of Liability
      </h2>
      <p className="text-sm leading-relaxed text-slate-600">
        To the maximum extent permitted by applicable law, ClipShrink shall not
        be liable for any indirect, incidental, special, consequential, or
        punitive damages resulting from your use of, or inability to use, the
        service.
      </p>
    </div>
  );
}
