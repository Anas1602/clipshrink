import React from "react";
import Link from "next/link";
import { Check, X, ChevronDown } from "lucide-react";

export type TrimmerSlug =
  | "trim-mp4"
  | "cut-mkv"
  | "trim-mov"
  | "cut-video-for-discord"
  | "trim-webm"
  | "cut-gif"
  | "lossless-video-cutter"
  | "trim-video-no-watermark"
  | "default";

interface TrimmerSeoContentProps {
  slug?: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface TrimmerGuide {
  title: string;
  summary: string;
  sections: { heading: string; text: string }[];
}

const TRIMMER_GUIDES: Record<TrimmerSlug, TrimmerGuide> = {
  "trim-mp4": {
    title: "How Lossless MP4 Stream-Copy Trimming Works",
    summary:
      "Most online MP4 cutters decode and re-encode every frame, degrading quality. ClipShrink cuts directly on MP4 packet boundaries in browser RAM.",
    sections: [
      {
        heading: "Cutting Without Re-Encoding (-c copy)",
        text: "When you trim an MP4 in ClipShrink, our WebAssembly engine seeks to your start timestamp, copies the existing H.264 video and AAC audio packets up to your end point, and writes a new MP4 header—leaving pixel quality 100% untouched.",
      },
      {
        heading: "Zeroing Negative Timestamps",
        text: "Cutting a compressed MP4 stream mid-GOP can leave audio and video Presentation Timestamps (PTS) slightly offset. ClipShrink automatically applies -avoid_negative_ts make_zero so the trimmed clip starts cleanly at 00:00.0 without black frames.",
      },
      {
        heading: "Web-Ready Faststart Index",
        text: "Every trimmed MP4 is saved with the moov atom placed at the beginning of the file (+faststart) so it plays immediately when shared on Discord, Slack, or web portals.",
      },
    ],
  },
  "cut-mkv": {
    title: "Cutting OBS Studio & Gaming MKV Recordings in Your Browser",
    summary:
      "Extract 30-second gaming highlights from multi-hundred-megabyte OBS Studio .MKV files without waiting to transcode the whole recording.",
    sections: [
      {
        heading: "Why OBS Records in Matroska (.MKV)",
        text: "Streamers and gamers record in MKV so a game or PC crash doesn't corrupt the file. However, opening a 400MB MKV in Premiere Pro or Sony Vegas just to cut a 20-second clip is slow or unsupported. ClipShrink lets you slice the highlight directly in your browser.",
      },
      {
        heading: "Keyframe-Accurate Stream Slicing",
        text: "Because gameplay recordings are usually encoded at high bitrates (60fps H.264), re-encoding takes minutes and blurs fast motion. Stream-copying preserves your exact 60fps bitrate and sharpness.",
      },
      {
        heading: "Clean Audio Track Preservation",
        text: "Both game audio and microphone tracks inside your MKV container are cut in sync with the video timeline.",
      },
    ],
  },
  "trim-mov": {
    title: "Trimming Apple QuickTime (.MOV) Videos on Mac, iPhone & Windows",
    summary:
      "Cut iPhone camera roll clips and macOS QuickTime screen recordings cleanly into standard, universally playable video files.",
    sections: [
      {
        heading: "The iOS Photos 'Fake Trim' Problem",
        text: "When you trim a video inside the iPhone Photos app or QuickTime Player using Edit Lists, Apple sometimes keeps the trimmed-out footage hidden inside the .MOV container for 'Revert to Original'—which non-Apple apps can accidentally expose. ClipShrink physically discards the cut frames.",
      },
      {
        heading: "Automatic MOV to MP4 Container Output",
        text: "To ensure your trimmed clip plays on Windows PCs, Android phones, and Discord without codec errors, ClipShrink outputs trimmed .MOV files inside a universally compatible .MP4 container.",
      },
      {
        heading: "Works Directly in Mobile Safari",
        text: "You can trim iPhone recordings up to 150MB directly inside mobile Safari without installing subscription video editor apps from the App Store.",
      },
    ],
  },
  "cut-video-for-discord": {
    title: "Trimming Gaming Clips to Fit Discord Upload Limits",
    summary:
      "The fastest way to get a 60-second ShadowPlay, Medal, or OBS clip under Discord's 20MB (or 8MB) limit without losing 1080p 60fps quality is to trim the dead air.",
    sections: [
      {
        heading: "Trimming vs. Compressing for Discord",
        text: "Re-encoding a 60-second 1080p60 clip down to 8MB or 20MB forces a lower bitrate. If only 15 seconds of that clip is the actual highlight, trimming off the other 45 seconds cuts the file size by 75% while keeping 100% of the original 1080p60 bitrate.",
      },
      {
        heading: "Instant Inline Chat Playback",
        text: "ClipShrink writes web-optimized faststart headers to every trimmed clip so your friends in Discord can watch the highlight directly inside the text channel without downloading it.",
      },
      {
        heading: "Pair With the Discord Compressor",
        text: "If your trimmed highlight is still above 20MB (or 8MB), you can pass the trimmed MP4 straight into our Discord Video Compressor to hit the exact byte limit.",
      },
    ],
  },
  "trim-webm": {
    title: "Trimming Browser Screen Recordings & HTML5 WebM Clips",
    summary:
      "Clean up Chrome screen captures, Loom downloads, and WebRTC meeting recordings without uploading internal videos to the cloud.",
    sections: [
      {
        heading: "Repairing Broken WebM Seek Bars",
        text: "WebM files recorded via browser MediaRecorder APIs often lack Cues (seek points) and duration metadata, making them impossible to scrub in standard players. Trimming in ClipShrink rebuilds a valid container header with exact duration.",
      },
      {
        heading: "Cutting Pre-Meeting & Tab-Switching Dead Air",
        text: "Screen recordings almost always start with 5 seconds of switching browser tabs and end with clicking the 'Stop Sharing' button. Slice both ends off in seconds before sending the demo to your team.",
      },
      {
        heading: "Automatic VP8 / VP9 / Opus Handling",
        text: "If your WebM stream can be copied directly on keyframe boundaries, ClipShrink cuts it losslessly; if timestamps are corrupted, it automatically falls back to a clean transcode.",
      },
    ],
  },
  "cut-gif": {
    title: "Cutting Animated GIFs & Converting Loops in Browser RAM",
    summary:
      "Shorten long, bloated animated GIFs down to the exact reaction or loop moment without adding watermarks.",
    sections: [
      {
        heading: "Why Shortening a GIF Slashes File Weight",
        text: "Because animated GIFs store every single frame as a separate LZW-compressed image, every extra second adds dozens of full frames. Trimming 3 seconds of filler off a 6-second GIF cuts the file size in half immediately.",
      },
      {
        heading: "Clean Loop Timing",
        text: "Use the start and end sliders with 0.1-second precision while watching the live preview player to find the exact frame where your loop starts and ends.",
      },
      {
        heading: "Zero Watermarks on Reaction Clips",
        text: "Most online GIF editors stamp a corner logo onto free exports unless you create an account. ClipShrink runs locally on your CPU and never brands your files.",
      },
    ],
  },
  "lossless-video-cutter": {
    title: "What Makes a Video Cutter Truly Lossless?",
    summary:
      "Traditional video editors decode compressed video into raw uncompressed frames and re-compress them on export. A lossless stream cutter copies the encoded bitstream directly.",
    sections: [
      {
        heading: "Zero Generation Loss",
        text: "Every time a video is re-encoded with a lossy codec like H.264, macroblocking and quantization noise increase (generation loss). By copying the compressed packets directly (-c copy), the output video is mathematically identical to the source.",
      },
      {
        heading: "100x Faster Than Re-Rendering",
        text: "Because your CPU doesn't have to run motion estimation or entropy encoding on thousands of frames, cutting a 300MB video in browser RAM takes less than a second.",
      },
      {
        heading: "Automatic Keyframe Fallback",
        text: "If a source file has damaged container headers that prevent direct stream-copying, ClipShrink automatically falls back to an ultrafast H.264 encode so your cut never fails.",
      },
    ],
  },
  "trim-video-no-watermark": {
    title: "Why ClipShrink Never Adds a Watermark to Trimmed Videos",
    summary:
      "Cloud video editors watermark free exports because they pay for expensive cloud GPU servers. ClipShrink runs on your own device, so it costs $0 to run.",
    sections: [
      {
        heading: "No 'Surprise Watermark' at Download",
        text: "Many web video cutters let you upload a file, spend 5 minutes setting your trim points, and only reveal a giant corner watermark or $12/month paywall on the final download screen. ClipShrink exports clean, unbranded video every time.",
      },
      {
        heading: "Zero Account or Email Wall",
        text: "You never have to sign in with Google, verify an email address, or start a free trial just to download your trimmed clip.",
      },
      {
        heading: "Full Resolution & Frame Rate Retained",
        text: "Free tiers on cloud editors often downgrade your export to 480p or 720p at 30fps. Because ClipShrink uses lossless stream-copying, a 4K 60fps source video stays 4K 60fps.",
      },
    ],
  },
  default: {
    title: "How In-Browser Lossless Video Trimming Works",
    summary:
      "ClipShrink cuts MP4, MOV, MKV, and WebM files directly in your browser's local memory using FFmpeg WebAssembly stream-copying.",
    sections: [
      {
        heading: "Stream-Copy Cutting (-c copy)",
        text: "Instead of decoding and re-encoding every frame of your video, ClipShrink slices the container between keyframes and updates the timestamp headers—preserving 100% of your original video and audio quality.",
      },
      {
        heading: "0.1-Second Scrubber Precision",
        text: "Preview your video right on the page, drag the start and end sliders in 0.1-second increments, and verify the exact cut duration before exporting.",
      },
      {
        heading: "100% Local Privacy",
        text: "Your videos never leave your computer or phone. Everything happens inside your browser tab's memory sandbox with zero cloud uploads.",
      },
    ],
  },
};

const FAQ_DATA: Record<string, FaqItem[]> = {
  "trim-mp4": [
    {
      question: "How do I trim an MP4 video online without losing quality?",
      answer:
        "Drop your MP4 into ClipShrink, set your start and end times on the slider, and click Trim Video. Our WebAssembly engine performs a lossless stream-copy cut (-c copy) in browser RAM, slicing the container without re-encoding the video frames.",
    },
    {
      question: "Does trimming an MP4 reduce its file size?",
      answer:
        "Yes. Cutting unwanted intro or outro segments physically removes those video and audio packets from the MP4 file, reducing the file size proportionally to the time removed.",
    },
    {
      question: "What is the maximum MP4 file size I can trim?",
      answer:
        "ClipShrink supports MP4 files up to 500MB on desktop browsers (Chrome, Edge, Firefox, Safari) and up to 150MB on mobile browsers.",
    },
  ],
  "cut-mkv": [
    {
      question:
        "How do I cut an MKV file from OBS Studio without re-encoding it?",
      answer:
        "Drop your OBS .mkv recording into the trimmer above, drag the sliders to isolate your highlight, and click Trim. ClipShrink copies the video and audio streams directly into your trimmed clip in seconds without re-rendering.",
    },
    {
      question:
        "Can I import the trimmed MKV clip into Premiere Pro or DaVinci Resolve?",
      answer:
        "Yes. If your editing software doesn't accept .mkv files, you can also run the clip through our MKV to MP4 Converter to swap the container to .mp4 in 1 second.",
    },
    {
      question: "Will cutting an MKV file ruin 60fps gameplay smoothness?",
      answer:
        "No. Because stream-copying keeps the original encoded video frames untouched, your 60fps or 120fps frame rate and bitrate remain identical to the source recording.",
    },
  ],
  "trim-mov": [
    {
      question:
        "How do I trim an Apple QuickTime MOV video without installing software?",
      answer:
        "Open this page in Safari or Chrome, select your .mov file, set your start and end points, and click Trim. The cut happens locally in your browser memory and exports a clean, universally playable MP4 file.",
    },
    {
      question:
        "Why do videos trimmed on iPhone sometimes play the full un-trimmed clip on Windows?",
      answer:
        "Some iOS and QuickTime edits use non-destructive Edit Lists that hide trimmed frames via metadata rather than deleting them; players that ignore Edit Lists play the whole file. ClipShrink physically removes the cut segments so they can never be recovered or played.",
    },
    {
      question: "Does trimming a MOV file on ClipShrink work on Windows PCs?",
      answer:
        "Yes. Windows users who receive large .mov files from iPhone or Mac users can trim and convert them to .mp4 right in their browser.",
    },
  ],
  "cut-video-for-discord": [
    {
      question: "How does trimming help my video fit Discord's upload limit?",
      answer:
        "File size is directly proportional to duration. If you have a 60-second 50MB ShadowPlay clip, cutting it down to the 15-second highlight reduces the file size to ~12.5MB—fitting under Discord's 20MB free upload limit with zero loss in 1080p 60fps quality.",
    },
    {
      question: "What if my trimmed clip is still over 20MB (or 8MB)?",
      answer:
        "Once you trim out the dead air here, download the clip and drop it into our Discord Video Compressor to scale the bitrate down to exact 20MB, 10MB, or 8MB limits.",
    },
    {
      question: "Does ClipShrink put a watermark on Discord clips?",
      answer:
        "Never. Your trimmed gaming clips are 100% watermark-free and include faststart headers so they play inline in Discord chat.",
    },
  ],
  "trim-webm": [
    {
      question: "How do I trim a WebM screen recording online?",
      answer:
        "Drop your .webm file into the trimmer above, use the start and end sliders to cut out setup time at the beginning or end of the recording, and click Trim. Everything runs locally in your browser tab.",
    },
    {
      question: "Why couldn't I scrub my WebM file before trimming it?",
      answer:
        "Browser screen recorders (MediaRecorder) stream WebM data without writing a duration header at the start of the file. ClipShrink rewrites the container headers during trimming so the output file has a working timeline and seek bar.",
    },
    {
      question: "Are confidential work screen recordings kept private?",
      answer:
        "Yes. Your WebM file is never uploaded to any cloud server—all processing happens inside your local browser memory.",
    },
  ],
  "cut-gif": [
    {
      question: "How do I trim unwanted frames from an animated GIF?",
      answer:
        "Drop your .gif file into the trimmer above, adjust the start and end sliders while watching the preview player, and click Trim to export only the selected loop.",
    },
    {
      question: "Why does trimming a GIF reduce its file size so much?",
      answer:
        "Every second of an animated GIF contains 10 to 30 uncompressed palette images, and converting or trimming the loop removes redundant frames and compresses the output.",
    },
    {
      question: "Is there any watermark added to trimmed GIF clips?",
      answer:
        "No. ClipShrink is 100% free and never adds watermarks, logos, or branding to your exports.",
    },
  ],
  "lossless-video-cutter": [
    {
      question: "What is lossless video cutting and how does it work?",
      answer:
        "Standard video editors decode every video frame and re-compress them on export, which takes minutes and degrades image quality. Lossless cutting uses FFmpeg stream-copying (-c copy) to slice the existing video and audio packets between keyframes without re-encoding.",
    },
    {
      question:
        "Why is ClipShrink easier than using VLC Media Player to cut videos?",
      answer:
        "Cutting a video in VLC requires enabling Advanced Controls and pressing the red Record button in real time while the video plays. ClipShrink gives you visual start/end sliders and exports the entire cut in under a second.",
    },
    {
      question: "What happens if my video cannot be stream-copied?",
      answer:
        "If a file has corrupted timestamps or non-standard codecs that fail stream-copying, ClipShrink automatically falls back to a fast H.264 keyframe-aligned transcode so your cut still completes cleanly.",
    },
  ],
  "trim-video-no-watermark": [
    {
      question:
        "Why do most online video trimmers put a watermark on free exports?",
      answer:
        "Cloud video editors upload your file to remote AWS or Google Cloud servers to render the cut, which costs them money on every export. Because ClipShrink runs locally on your own device's CPU via WebAssembly, our server cost is $0—so we never charge or watermark your videos.",
    },
    {
      question: "Do I need to sign up or enter an email to download?",
      answer:
        "No. There are no accounts, no email walls, and no daily export limits.",
    },
    {
      question: "Does trimming without a watermark reduce my video resolution?",
      answer:
        "No. Stream-copy trimming preserves your exact original resolution (including 1080p and 4K) and frame rate.",
    },
  ],
  default: [
    {
      question: "How does ClipShrink trim videos in under a second?",
      answer:
        "Instead of uploading your video to a remote cloud server and re-encoding every frame, ClipShrink runs FFmpeg in WebAssembly inside your browser RAM. It uses stream-copying (-c copy) to slice container timestamps directly on your device.",
    },
    {
      question:
        "How is ClipShrink different from cloud cutters like 123apps or Clideo?",
      answer:
        "Cloud cutters require you to upload hundreds of megabytes over your internet connection and store your personal videos on remote servers. ClipShrink processes your files 100% locally in browser memory with zero upload wait time and zero watermarks.",
    },
    {
      question: "Do my video files ever leave my computer or phone?",
      answer:
        "Never. Your files stay inside your browser's local memory sandbox from start to finish.",
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Trimming Speed",
    cloud: "45–90s (Slow network upload + server render queue)",
    clipshrink: "Under 1 second (In-memory lossless stream-copy)",
  },
  {
    feature: "Watermark Policy",
    cloud: "Corner logo watermark or paywall on free tiers",
    clipshrink: "100% Clean & Watermark-Free Always",
  },
  {
    feature: "File Privacy & Storage",
    cloud: "Uploaded & stored on remote servers for hours",
    clipshrink: "100% In-Browser RAM (Never leaves your device)",
  },
  {
    feature: "Video Pixel Quality",
    cloud: "Re-encoded / capped at 720p on free accounts",
    clipshrink: "100% Lossless bit-for-bit stream copy (-c copy)",
  },
  {
    feature: "Account Requirement",
    cloud: "Email signup or login required to export",
    clipshrink: "No signup, no accounts, unlimited free use",
  },
];

export default function TrimmerSeoContent({
  slug = "default",
}: TrimmerSeoContentProps) {
  const safeSlug = (slug in TRIMMER_GUIDES ? slug : "default") as TrimmerSlug;
  const guide = TRIMMER_GUIDES[safeSlug];
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

      {/* Dynamic Format/Workflow Specific Guide */}
      <section aria-labelledby="trimmer-guide-heading" className="space-y-6">
        <div className="text-center mb-8">
          <h2
            id="trimmer-guide-heading"
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
      <section aria-labelledby="how-trim-works-heading">
        <div className="text-center mb-8">
          <h2
            id="how-trim-works-heading"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Cut a Video Online Without Losing Quality
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Trim any clip in three steps directly in your browser.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 overflow-hidden">
          <div className="p-6">
            <div className="text-xs font-mono font-bold text-indigo-600 mb-2">
              STEP 01
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">
              Load Your Video
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Select your MP4, MOV, MKV, WebM, or GIF file. It opens immediately
              in the local preview player with zero upload wait.
            </p>
          </div>

          <div className="p-6">
            <div className="text-xs font-mono font-bold text-indigo-600 mb-2">
              STEP 02
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">
              Set Start & End Points
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Drag the start and end sliders with 0.1-second precision while
              scrubbing the live video preview.
            </p>
          </div>

          <div className="p-6">
            <div className="text-xs font-mono font-bold text-indigo-600 mb-2">
              STEP 03
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">
              Lossless Stream Export
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Click Trim Video to slice the container in browser RAM and save
              your clip with zero watermarks.
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
            ClipShrink vs. Cloud Video Cutters
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Why stream-cutting inside local browser memory is faster, cleaner,
            and safer than remote cloud editors.
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
                    Cloud Video Editors
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

      {/* Internal Spokes Navigation */}
      <section className="border-t border-slate-200 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Dedicated Video Trimming Tools
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            8 Lossless Cutters
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <Link
            href="/trim-video/trim-mp4"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Trim MP4 Video →
          </Link>
          <Link
            href="/trim-video/cut-mkv"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Cut MKV Video (OBS) →
          </Link>
          <Link
            href="/trim-video/trim-mov"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Trim MOV Video (iPhone) →
          </Link>
          <Link
            href="/trim-video/cut-video-for-discord"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Cut Video for Discord →
          </Link>
          <Link
            href="/trim-video/trim-webm"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Trim WebM Video →
          </Link>
          <Link
            href="/trim-video/cut-gif"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Cut Animated GIF →
          </Link>
          <Link
            href="/trim-video/lossless-video-cutter"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Lossless Video Cutter →
          </Link>
          <Link
            href="/trim-video/trim-video-no-watermark"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Trim Without Watermark →
          </Link>
        </div>
      </section>
    </div>
  );
}
