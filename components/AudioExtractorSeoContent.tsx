import React from "react";
import Link from "next/link";
import { Check, X, ChevronDown } from "lucide-react";

export type ExtractorSlug =
  | "mov-to-mp3"
  | "mp4-to-mp3"
  | "ogg-to-mp3"
  | "webm-to-mp3"
  | "mp4-to-wav"
  | "video-to-wav"
  | "quicktime-to-mp3"
  | "default";

interface AudioExtractorSeoContentProps {
  slug?: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface ExtractorGuide {
  title: string;
  summary: string;
  sections: { heading: string; text: string }[];
}

const EXTRACTOR_GUIDES: Record<ExtractorSlug, ExtractorGuide> = {
  "mov-to-mp3": {
    title: "Extracting 320kbps MP3 Audio From Apple QuickTime (.MOV) Files",
    summary:
      "Turn iPhone recordings, macOS QuickTime screen captures, and camera .MOV clips into compact, high-bitrate MP3 audio files.",
    sections: [
      {
        heading: "Stripping the Heavy MOV Video Track (-vn)",
        text: "An iPhone or QuickTime .MOV file is over 95% video data. By passing the -vn flag in WebAssembly, ClipShrink immediately discards the video stream in browser RAM and processes only the audio track.",
      },
      {
        heading: "320kbps Studio MP3 vs. 192kbps Standard",
        text: "Choose 320kbps Constant Bitrate (libmp3lame) to preserve full acoustic range for music, interviews, and podcasts, or select 192kbps for smaller voice memo and lecture files.",
      },
      {
        heading: "Works on Windows, Mac, and iOS Safari",
        text: "You don't need Apple QuickTime Pro or third-party desktop converters. Drop any .MOV file right into your browser tab to save a universally playable MP3.",
      },
    ],
  },
  "mp4-to-mp3": {
    title: "How In-Browser MP4 to MP3 Audio Extraction Works",
    summary:
      "Rip voice tracks, webinars, lectures, and music from MP4 videos directly in your browser without uploading files to external servers.",
    sections: [
      {
        heading: "Demuxing AAC Audio to MP3",
        text: "Standard MP4 videos store audio in AAC format alongside an H.264 video stream. ClipShrink demuxes the container in local memory, drops the video packets, and encodes a universally compatible MP3 file using LAME.",
      },
      {
        heading: "Zero Upload Queue for Large Lectures",
        text: "Uploading a 350MB 1-hour webinar MP4 to a cloud converter takes minutes on standard Wi-Fi. Because ClipShrink reads the file directly from your local disk into browser RAM, audio extraction begins immediately.",
      },
      {
        heading: "Built-In Audio Player Verification",
        text: "Once extraction finishes, you can listen to the MP3 track directly inside the inline audio player to verify volume and clarity before downloading.",
      },
    ],
  },
  "ogg-to-mp3": {
    title: "Converting OGG Vorbis & Gaming Audio Files to Universal MP3",
    summary:
      "OGG is an open-source audio container used by Discord, video game engines, and Linux tools, but Apple devices and hardware players often reject it.",
    sections: [
      {
        heading: "Why iPhones, Car Stereos & Editors Reject .OGG",
        text: "Apple's native Files app, iTunes/Music, QuickTime, and many hardware MP3 players do not include a native OGG Vorbis decoder. Converting .ogg to .mp3 makes your audio playable on every phone, car stereo, and editing timeline.",
      },
      {
        heading: "Game Assets, Discord Bots & Soundboards",
        text: "PC games (Minecraft, RPG Maker, Unity, Unreal) and Discord recording bots store voice lines and music as .ogg files. ClipShrink converts them to 320kbps or 192kbps MP3 in under a second.",
      },
      {
        heading: "Lossless WAV Output Option Included",
        text: "If you are importing game audio or voice tracks into a DAW (FL Studio, Ableton, Logic Pro) for mixing, you can also switch the output selector above to Lossless WAV.",
      },
    ],
  },
  "webm-to-mp3": {
    title: "Extracting MP3 Audio From Browser WebM Recordings",
    summary:
      "Pull clean MP3 audio from Chrome screen captures, HTML5 WebM videos, and browser-based meeting recordings.",
    sections: [
      {
        heading: "Transcoding WebM Opus / Vorbis Audio to MP3",
        text: "WebM videos store audio using the Opus or Vorbis codec at 48kHz. Because many transcription tools, podcast hosts, and media players require standard MP3 files, ClipShrink extracts and converts the audio stream in one step.",
      },
      {
        heading: "Ideal for AI Transcription & Meeting Notes",
        text: "If you recorded a browser meeting or webinar as a 250MB .webm video, extracting a compact 192kbps MP3 shrinks the file by 90% so you can easily feed it into Whisper or transcription tools.",
      },
      {
        heading: "100% Private Local Processing",
        text: "Confidential internal meetings and voice recordings stay inside your browser's local memory sandbox and are never uploaded anywhere.",
      },
    ],
  },
  "mp4-to-wav": {
    title: "Extracting Uncompressed 16-Bit PCM WAV Audio From MP4 Videos",
    summary:
      "Professional video editors and DAWs work best with uncompressed WAV audio rather than lossy, frame-paketed MP3 files.",
    sections: [
      {
        heading: "Why Editors Prefer WAV Over MP3 (pcm_s16le)",
        text: "MP3 is a lossy format that adds tiny silence padding at the start of a track and forces NLEs (Premiere Pro, DaVinci Resolve, Final Cut) to decode compressed frames on the fly during timeline scrubbing. Uncompressed 16-bit Little-Endian PCM WAV aligns sample-accurately on every timeline.",
      },
      {
        heading: "Zero Additional Compression Artifacts",
        text: "When you plan to apply EQ, noise reduction, compression, or mastering in Audition, Pro Tools, or Logic Pro, exporting to lossless WAV prevents double-compression artifacts.",
      },
      {
        heading: "Fast Local RAM Demuxing",
        text: "Because PCM WAV requires no heavy psychoacoustic encoding math, extracting a WAV file from an MP4 in WebAssembly is nearly instantaneous.",
      },
    ],
  },
  "video-to-wav": {
    title: "Converting Any Video Format (MP4, MOV, MKV, WebM) to Studio WAV",
    summary:
      "Extract sample-accurate, uncompressed 16-bit PCM WAV audio from any video container directly in your browser.",
    sections: [
      {
        heading: "Universal Video Input Support",
        text: "Whether your footage is an OBS Studio .MKV, an iPhone .MOV, a browser .WebM, or a camera .MP4, ClipShrink strips the video stream and writes a standard RIFF WAVE (.wav) audio file.",
      },
      {
        heading: "Ready for DaVinci Resolve, Premiere & DAWs",
        text: "The exported 16-bit PCM WAV file imports cleanly into DaVinci Resolve, Adobe Premiere Pro, Audacity, Ableton Live, FL Studio, and Pro Tools with zero codec issues.",
      },
      {
        heading: "No Cloud Upload Wait for Uncompressed Audio",
        text: "Uncompressed WAV files are roughly 10MB per minute of stereo audio. Generating the WAV locally in browser RAM means you don't have to download huge uncompressed files from a slow remote server.",
      },
    ],
  },
  "quicktime-to-mp3": {
    title: "Extracting MP3 Audio From QuickTime (.MOV) Recordings",
    summary:
      "Turn QuickTime screen recordings and iPhone .MOV videos into compact, universally playable MP3 audio files.",
    sections: [
      {
        heading: "Instant Video Stream Removal",
        text: "ClipShrink drops the QuickTime video track in memory and encodes only the audio stream into a clean MP3 file.",
      },
      {
        heading: "Up to 320kbps Bitrate",
        text: "Choose between 320kbps studio MP3, 192kbps standard MP3, or uncompressed WAV right above the dropzone.",
      },
      {
        heading: "100% In-Browser Privacy",
        text: "Your QuickTime recordings are processed locally on your device with zero cloud uploads.",
      },
    ],
  },
  default: {
    title: "How In-Browser Audio Extraction (MP3 & Lossless WAV) Works",
    summary:
      "ClipShrink rips audio streams from MP4, MOV, MKV, WebM, and OGG files directly in your browser's local memory using FFmpeg WebAssembly.",
    sections: [
      {
        heading: "Direct Video Stream Stripping (-vn)",
        text: "Instead of uploading a 300MB video over the internet just to get a 5MB audio file, ClipShrink reads the file locally in your browser tab, discards the video packets, and extracts the audio stream in seconds.",
      },
      {
        heading: "320kbps MP3 or 16-Bit Lossless WAV",
        text: "Pick 320kbps MP3 for maximum compatibility and music fidelity, 192kbps MP3 for compact voice recordings, or uncompressed 16-bit PCM WAV for video editing and DAWs.",
      },
      {
        heading: "Live Inline Audio Verification",
        text: "Listen to your extracted audio track right on the page before downloading, with zero watermarks and zero file uploads.",
      },
    ],
  },
};

const FAQ_DATA: Record<string, FaqItem[]> = {
  "mov-to-mp3": [
    {
      question: "How do I convert an Apple QuickTime MOV video to MP3?",
      answer:
        "Select 320kbps or 192kbps MP3 above, drop your .mov file into the extractor, and click Extract. ClipShrink discards the video stream in browser RAM and saves a clean MP3 audio file in seconds.",
    },
    {
      question: "Will converting MOV to MP3 reduce audio quality?",
      answer:
        "At 320kbps (the maximum bitrate of the MP3 standard), the extracted audio is perceptually indistinguishable from the original QuickTime track. If you need bit-for-bit uncompressed audio for editing, you can also select the WAV Lossless tab above.",
    },
    {
      question:
        "Can I extract MP3 from iPhone MOV videos directly on my phone?",
      answer:
        "Yes. Open this page in Safari on your iPhone, choose a video up to 150MB from your Photos or Files app, and download the extracted MP3 directly to your device.",
    },
  ],
  "mp4-to-mp3": [
    {
      question: "How do I extract an MP3 audio track from an MP4 video?",
      answer:
        "Drop your MP4 file into the box above, choose 320kbps or 192kbps MP3, and click Extract. Our local WebAssembly engine strips the video track (-vn) and encodes the audio into an MP3 file without uploading your video.",
    },
    {
      question: "How big will the MP3 file be compared to the original MP4?",
      answer:
        "At 192kbps, an MP3 is about 1.4MB per minute; at 320kbps, it is about 2.4MB per minute. Extracting MP3 from a 200MB MP4 lecture or music video typically reduces the file size by 90% to 95%.",
    },
    {
      question:
        "Is there a limit on video duration when converting MP4 to MP3?",
      answer:
        "There is no duration cap—you can extract audio from 2-hour lectures, podcasts, and webinars as long as the source MP4 file is under 500MB on desktop (150MB on mobile).",
    },
  ],
  "ogg-to-mp3": [
    {
      question:
        "What is an OGG file and why won't it play on my iPhone or Mac?",
      answer:
        "OGG Vorbis is an open-source audio format heavily used by Discord, Spotify, and PC games. Apple devices (iOS and macOS QuickTime/Music) and many car stereos do not support .ogg natively. Converting to MP3 makes the file playable everywhere.",
    },
    {
      question: "How do I convert Discord or game .OGG audio files to MP3?",
      answer:
        "Drop your .ogg file into the extractor above, pick 320kbps or 192kbps MP3, and click Extract. The conversion finishes in under a second locally in your browser.",
    },
    {
      question: "Can I convert OGG to uncompressed WAV instead of MP3?",
      answer:
        "Yes—simply click the 'WAV · Lossless' tab right above the dropzone before converting.",
    },
  ],
  "webm-to-mp3": [
    {
      question:
        "How do I extract MP3 audio from a WebM video or screen recording?",
      answer:
        "Drop your .webm file into the box above and click Extract. ClipShrink strips the VP8/VP9 video stream and converts the internal Opus or Vorbis audio track into a standard MP3 file.",
    },
    {
      question: "Why convert a WebM meeting recording to MP3?",
      answer:
        "Converting a large browser screen recording (.webm) into an audio-only MP3 shrinks the file by ~90%, making it easy to archive, listen to on your phone, or upload to AI transcription tools.",
    },
    {
      question: "Are my WebM recordings uploaded to a cloud server?",
      answer:
        "Never. Your WebM file is processed 100% locally inside your browser's memory.",
    },
  ],
  "mp4-to-wav": [
    {
      question: "Why convert MP4 to WAV instead of MP3?",
      answer:
        "WAV (pcm_s16le) is uncompressed, lossless audio. Video editors (Premiere Pro, DaVinci Resolve, Final Cut) and DAWs (Logic, Pro Tools, Ableton, FL Studio) scrub faster with WAV and avoid the generation loss and frame-padding issues caused by lossy MP3 files.",
    },
    {
      question:
        "What bit depth and format does ClipShrink use for WAV exports?",
      answer:
        "ClipShrink exports standard 16-bit Little-Endian uncompressed PCM WAV audio, matching broadcast and studio timeline standards.",
    },
    {
      question: "How large is an extracted WAV audio file?",
      answer:
        "Uncompressed stereo 16-bit WAV audio is approximately 10MB per minute of audio.",
    },
  ],
  "video-to-wav": [
    {
      question: "Which video formats can I convert to WAV?",
      answer:
        "You can drop MP4, QuickTime MOV, OBS Studio MKV, WebM, AVI, or M4V files into the extractor to rip a lossless 16-bit PCM WAV audio track.",
    },
    {
      question: "How fast is in-browser Video to WAV extraction?",
      answer:
        "Because uncompressed PCM WAV does not require complex audio compression math, extracting a WAV track in local browser RAM usually takes less than 1 second.",
    },
    {
      question: "Does ClipShrink watermark or limit WAV exports?",
      answer:
        "No. All WAV and MP3 exports are 100% free, unbranded, and processed locally on your device.",
    },
  ],
  default: [
    {
      question:
        "How does ClipShrink extract audio from video without uploading the file?",
      answer:
        "ClipShrink runs a WebAssembly build of FFmpeg inside your browser tab. When you select a video, it loads into your computer's local RAM, strips the video stream (-vn), and encodes a 320kbps MP3 or 16-bit WAV file right on your device.",
    },
    {
      question: "Should I choose 320kbps MP3, 192kbps MP3, or Lossless WAV?",
      answer:
        "Choose 320kbps MP3 for music and high-quality podcasts, 192kbps MP3 for smaller voice memos and lectures, or Lossless WAV if you plan to edit or mix the audio in Premiere Pro, DaVinci Resolve, or a DAW.",
    },
    {
      question: "Do my video or audio files ever touch an external server?",
      answer:
        "Never. Zero bytes of your media files are uploaded, stored, or transmitted over the internet.",
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Extraction Speed",
    cloud: "45–90s (Slow video upload + server queue)",
    clipshrink: "1–2 seconds (Local RAM demuxing)",
  },
  {
    feature: "File Privacy",
    cloud: "Uploaded & stored on remote third-party servers",
    clipshrink: "100% In-Browser RAM (Files never leave your device)",
  },
  {
    feature: "Audio Bitrate Options",
    cloud: "Often capped at 128kbps on free tiers",
    clipshrink: "Full 320kbps MP3, 192kbps MP3 & 16-Bit Lossless WAV",
  },
  {
    feature: "Audio Verification",
    cloud: "Blind download",
    clipshrink: "Built-in audio player to preview before saving",
  },
  {
    feature: "Watermarks & Quotas",
    cloud: "Daily file limits or account walls",
    clipshrink: "No signup, zero watermarks, unlimited free use",
  },
];

export default function AudioExtractorSeoContent({
  slug = "default",
}: AudioExtractorSeoContentProps) {
  const safeSlug = (
    slug in EXTRACTOR_GUIDES ? slug : "default"
  ) as ExtractorSlug;
  const guide = EXTRACTOR_GUIDES[safeSlug];
  const faqs = FAQ_DATA[safeSlug] || FAQ_DATA.default;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-20 space-y-20 text-slate-700">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Dynamic Format-Specific Guide */}
      <section aria-labelledby="extractor-guide-heading" className="space-y-6">
        <div className="text-center mb-8">
          <h2
            id="extractor-guide-heading"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {guide.title}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            {guide.summary}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {guide.sections.map((section, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-2.5">
              <h3 className="font-bold text-slate-900 text-base tracking-tight">
                {section.heading}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {section.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3-Step Workflow (Unified Horizontal Strip) */}
      <section aria-labelledby="how-extract-works-heading">
        <div className="text-center mb-8">
          <h2
            id="how-extract-works-heading"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Extract Audio From Video Online
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Rip MP3 or lossless WAV audio in three steps directly in your
            browser.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 overflow-hidden">
          <div className="p-6">
            <div className="text-xs font-mono font-bold text-indigo-600 mb-2">
              STEP 01
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">
              Choose Audio Format
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Select 320kbps MP3, 192kbps MP3, or uncompressed 16-bit PCM WAV
              above the dropzone.
            </p>
          </div>

          <div className="p-6">
            <div className="text-xs font-mono font-bold text-indigo-600 mb-2">
              STEP 02
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">
              Drop Your Video File
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Select your MP4, MOV, MKV, WebM, or OGG file. Our WebAssembly
              engine strips the video track in local RAM.
            </p>
          </div>

          <div className="p-6">
            <div className="text-xs font-mono font-bold text-indigo-600 mb-2">
              STEP 03
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">
              Preview & Download
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Listen to the extracted track in the inline player and download
              your audio file immediately.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section aria-labelledby="comparison-heading">
        <div className="text-center mb-8">
          <h2
            id="comparison-heading"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            ClipShrink vs. Cloud Audio Extractors
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Why ripping audio tracks locally in browser RAM is faster and safer
            than uploading large video files to remote servers.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-4 px-5 text-slate-600 font-semibold uppercase tracking-wider text-[11px] w-1/3">
                    Feature
                  </th>
                  <th className="py-4 px-5 text-slate-600 font-semibold uppercase tracking-wider text-[11px] w-1/3">
                    Cloud Audio Extractors
                  </th>
                  <th className="py-4 px-5 text-indigo-700 font-bold uppercase tracking-wider text-[11px] w-1/3 bg-indigo-50/50 border-l border-r border-indigo-100">
                    ClipShrink (In-Browser)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-5 font-medium text-slate-900">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-5 text-slate-500 flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>{row.cloud}</span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-900 font-medium bg-indigo-50/20 border-l border-r border-indigo-100">
                      <div className="flex items-center gap-2 text-indigo-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{row.clipshrink}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Accordion FAQs */}
      <section aria-labelledby="faq-heading">
        <div className="text-center mb-8">
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
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

      {/* Spokes Navigation */}
      <section className="border-t border-slate-200 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Dedicated Audio Extraction Tools
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            320kbps MP3 & Lossless WAV
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <Link
            href="/extract-audio/mov-to-mp3"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            MOV to MP3 →
          </Link>
          <Link
            href="/extract-audio/mp4-to-mp3"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            MP4 to MP3 →
          </Link>
          <Link
            href="/extract-audio/ogg-to-mp3"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            OGG to MP3 →
          </Link>
          <Link
            href="/extract-audio/webm-to-mp3"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            WebM to MP3 →
          </Link>
          <Link
            href="/extract-audio/mp4-to-wav"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            MP4 to Lossless WAV →
          </Link>
          <Link
            href="/extract-audio/video-to-wav"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Video to WAV Studio →
          </Link>
          <Link
            href="/convert/quicktime-to-mp3"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            QuickTime to MP3 →
          </Link>
        </div>
      </section>
    </div>
  );
}
