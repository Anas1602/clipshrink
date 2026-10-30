import type { Metadata } from "next";
import Link from "next/link";
import VideoSizeCalculator from "@/components/VideoSizeCalculator";
import { ChevronDown, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Video File Size Calculator — How Long is a 10MB, 25MB or 50MB Video?",
  description:
    "Calculate how long a 8MB, 10MB, 16MB, 20MB, 25MB, or 50MB video can be at 720p, 1080p, and 4K. Interactive video bitrate calculator and platform upload limit cheat sheet.",
  alternates: {
    canonical: "https://clipshrink.com/video-size-calculator",
  },
  openGraph: {
    title:
      "Video File Size Calculator — How Long is a 10MB, 25MB or 50MB Video?",
    description:
      "Find out exactly how many minutes of 720p, 1080p, or 4K video fit inside 10MB, 25MB (Gmail), 20MB (Discord), and 50MB limits.",
    url: "https://clipshrink.com/video-size-calculator",
    siteName: "ClipShrink",
    type: "website",
  },
};

const DURATION_CHEAT_SHEET = [
  {
    size: "8 MB",
    platform: "Discord Classic Limit",
    raw4k: "3 seconds",
    hd1080p: "24 seconds",
    hd720p: "50 seconds",
    screen720p: "1 min 35 sec",
    href: "/video/compress-for-discord-8mb",
  },
  {
    size: "10 MB",
    platform: "Slack / Job Portals",
    raw4k: "3.7 seconds",
    hd1080p: "31 seconds",
    hd720p: "1 min 03 sec",
    screen720p: "1 min 58 sec",
    href: "/video/compress-mp4-to-10mb",
  },
  {
    size: "16 MB",
    platform: "WhatsApp Media Limit",
    raw4k: "6 seconds",
    hd1080p: "50 seconds",
    hd720p: "1 min 41 sec",
    screen720p: "3 min 08 sec",
    href: "/video/compress-for-whatsapp",
  },
  {
    size: "20 MB",
    platform: "Discord Free / Outlook",
    raw4k: "7.4 seconds",
    hd1080p: "1 min 02 sec",
    hd720p: "2 min 06 sec",
    screen720p: "3 min 55 sec",
    href: "/video/compress-video-for-outlook",
  },
  {
    size: "25 MB",
    platform: "Gmail Attachment Limit",
    raw4k: "9.2 seconds",
    hd1080p: "1 min 18 sec",
    hd720p: "2 min 38 sec",
    screen720p: "4 min 54 sec",
    href: "/video/compress-for-gmail-25mb",
  },
  {
    size: "50 MB",
    platform: "Discord Nitro Basic / Forms",
    raw4k: "18.5 seconds",
    hd1080p: "2 min 36 sec",
    hd720p: "5 min 16 sec",
    screen720p: "9 min 48 sec",
    href: "/video/compress-mp4-to-50mb",
  },
  {
    size: "100 MB",
    platform: "Canvas / Blackboard LMS",
    raw4k: "37 seconds",
    hd1080p: "5 min 12 sec",
    hd720p: "10 min 32 sec",
    screen720p: "19 min 36 sec",
    href: "/video/compress-mp4-to-100mb",
  },
];

const FAQS = [
  {
    question: "How long is a 25MB video?",
    answer:
      "On an uncompressed iPhone 4K camera (~22 Mbps), 25MB is only 9 seconds of video. However, when compressed to standard 720p HD (1.2 Mbps H.264), a 25MB MP4 holds about 2 minutes and 38 seconds of regular camera footage, or nearly 5 minutes of low-motion screen recording and slides.",
  },
  {
    question: "How long is a 10MB video?",
    answer:
      "At raw 4K smartphone settings, a 10MB video is less than 4 seconds long. Once compressed to 720p HD using H.264, a 10MB file holds approximately 60 to 65 seconds of standard video, or up to 2 minutes of screen capture.",
  },
  {
    question: "How long is a 50MB video?",
    answer:
      "A 50MB MP4 file holds roughly 2 minutes and 36 seconds of 1080p Full HD video (2.5 Mbps), 5 minutes and 15 seconds of 720p HD video (1.2 Mbps), or nearly 10 minutes of 720p presentation and screen recording footage.",
  },
  {
    question: "How is video file size calculated from duration and bitrate?",
    answer:
      "Video file size depends strictly on two numbers: Duration (in seconds) and Total Bitrate (video + audio in kilobits per second), divided by 8,192 (since 8,192 kilobits = 1 Megabyte). The formula is: File Size (MB) = (Total Bitrate kbps × Duration seconds) / 8192. Resolution and frame rate only affect how sharp the video looks at that bitrate.",
  },
  {
    question:
      "What are the video attachment size limits for Gmail, Outlook, WhatsApp, and Discord?",
    answer:
      "Gmail allows up to 25MB per email. Microsoft Outlook and Exchange default to 20MB. WhatsApp caps standard video media attachments at 16MB. Discord's free upload limit is 20MB (raised from 10MB in August 2026, and 8MB prior to 2023), while Discord Nitro Basic allows 50MB.",
  },
];

export default function VideoSizeCalculatorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Video File Size & Duration Calculator",
    url: "https://clipshrink.com/video-size-calculator",
    description:
      "Calculate how many minutes or seconds of video fit in 8MB, 10MB, 16MB, 20MB, 25MB, and 50MB across 720p, 1080p, and 4K resolutions.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600 mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Bitrate, Duration & Platform Limit Reference</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Video File Size & Duration Calculator
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Find out how long a 10MB, 16MB, 20MB, 25MB, or 50MB video can be at
          720p, 1080p, and 4K—and calculate the exact bitrate needed to fit your
          clip under any upload limit.
        </p>
      </div>

      {/* Interactive Calculator */}
      <VideoSizeCalculator />

      <div className="max-w-4xl mx-auto mt-16 space-y-16 text-slate-700">
        {/* Reference Cheat Sheet Table */}
        <section aria-labelledby="cheat-sheet-heading">
          <div className="text-center mb-8">
            <h2
              id="cheat-sheet-heading"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How Long is a 10MB, 25MB, or 50MB Video? (Cheat Sheet)
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Compare how much video duration fits inside common file size
              limits before and after H.264 compression.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="py-3.5 px-4 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                      File Size
                    </th>
                    <th className="py-3.5 px-4 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                      Raw 4K Camera
                    </th>
                    <th className="py-3.5 px-4 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                      1080p Full HD
                    </th>
                    <th className="py-3.5 px-4 text-indigo-700 font-bold uppercase tracking-wider text-[11px] bg-indigo-50/50">
                      720p HD (Standard)
                    </th>
                    <th className="py-3.5 px-4 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                      720p Screen / Slides
                    </th>
                    <th className="py-3.5 px-4 text-right text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                      Compressor
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {DURATION_CHEAT_SHEET.map((row) => (
                    <tr
                      key={row.size}
                      className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-slate-900 text-sm">
                          {row.size}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {row.platform}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-500">
                        {row.raw4k}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-700">
                        {row.hd1080p}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-indigo-700 bg-indigo-50/20">
                        {row.hd720p}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-700">
                        {row.screen720p}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={row.href}
                          className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-semibold">
                          <span>Shrink</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Formula Explanation Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-2">
            <h3 className="font-bold text-slate-900 text-base">
              Why Raw Phone Videos Are Huge
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              iPhones and Android phones record at 15,000 to 35,000 kbps so the
              camera sensor can write frames in real time without overheating.
              Re-encoding in H.264 at 1,200 kbps shrinks the file by ~90% while
              keeping 720p HD clarity.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-2">
            <h3 className="font-bold text-slate-900 text-base">
              The Exact Bitrate Formula
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              File size is determined by{" "}
              <code className="font-mono text-slate-700 bg-slate-100 px-1 py-0.5 rounded">
                (Bitrate kbps × Seconds) / 8192
              </code>
              . Changing resolution (e.g., 1080p to 720p) only reduces file size
              if the encoder also lowers the target bitrate.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-2">
            <h3 className="font-bold text-slate-900 text-base">
              Why Email Needs a 10% Buffer
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Gmail (25MB) and Outlook (20MB) encode binary attachments into
              Base64 text during transit, adding overhead. Always target ~22MB
              for Gmail and ~18MB for Outlook so your email doesn&apos;t bounce.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section aria-labelledby="calc-faq-heading">
          <div className="text-center mb-8">
            <h2
              id="calc-faq-heading"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => (
              <details
                key={index}
                className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:border-slate-300 transition-colors [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none text-slate-900 font-medium text-sm sm:text-base hover:text-indigo-600 transition-colors">
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-200 shrink-0" />
                </summary>
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
