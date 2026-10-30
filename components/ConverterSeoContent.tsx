import React from "react";
import Link from "next/link";
import { Check, X, ChevronDown } from "lucide-react";

export type ConverterSlug =
  | "mkv-to-mp4"
  | "hevc-to-mp4"
  | "mov-to-mp4"
  | "webm-to-mp4"
  | "quicktime-to-mp3"
  | "opus-to-mp3"
  | "m4v-to-mp4"
  | "mpeg-to-mp4"
  | "ts-to-mp4"
  | "gif-to-mp4"
  | "default";

interface ConverterSeoContentProps {
  slug?: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface ConverterGuide {
  title: string;
  summary: string;
  sections: { heading: string; text: string }[];
}

const CONVERTER_GUIDES: Record<ConverterSlug, ConverterGuide> = {
  "mkv-to-mp4": {
    title: "Why OBS Studio Records in MKV (And How Remuxing to MP4 Works)",
    summary:
      "Matroska (.MKV) prevents corrupted recordings if your PC crashes mid-stream, but editing suites and chat apps require standard .MP4 containers.",
    sections: [
      {
        heading: "Crash-Safe MKV vs. Edit-Ready MP4",
        text: "MP4 files store their index table (the moov atom) at the very end of a recording session—if OBS crashes or power is lost, the entire MP4 becomes unreadable. MKV writes frame headers continuously, making it safe for recording, while remuxing to MP4 afterward makes it compatible with Premiere Pro and DaVinci Resolve.",
      },
      {
        heading: "Lossless Stream-Copy for H.264 Streams",
        text: "When your MKV already contains an H.264 video stream, ClipShrink uses FFmpeg stream-copying (-c copy) to unpack the video and place it into an MP4 container without re-encoding a single pixel.",
      },
      {
        heading: "Automatic Audio & HEVC Compatibility",
        text: "If your MKV uses desktop audio formats that MP4 players reject (such as Opus or Vorbis) or non-H.264 video codecs, ClipShrink automatically transcodes only the incompatible stream so the output MP4 plays everywhere.",
      },
    ],
  },
  "hevc-to-mp4": {
    title: "Fixing iPhone HEVC (H.265) Playback Errors on Windows & Web",
    summary:
      "Apple devices default to High Efficiency Video Coding (HEVC / H.265), which causes codec errors in Windows Media Player, older browsers, and web uploaders.",
    sections: [
      {
        heading: "Bypassing the Windows HEVC Codec Paywall",
        text: "Windows 10 and 11 do not include the H.265 decoder out of the box, prompting users to buy the HEVC Video Extensions from the Microsoft Store. Converting the stream to H.264 MP4 makes the video play natively on any PC.",
      },
      {
        heading: "10-Bit HDR to 8-Bit Color Normalization",
        text: "iPhone Pro and Cinematic recordings often combine HEVC with 10-bit Dolby Vision color profiles (yuv420p10le) that look washed out or fail to decode in web players. ClipShrink normalizes the pixel format to universally supported 8-bit yuv420p.",
      },
      {
        heading: "In-Browser CPU Transcoding",
        text: "Instead of uploading heavy 4K iPhone clips to a slow cloud converter, ClipShrink decodes the HEVC stream and encodes clean H.264 video directly in your browser's local memory.",
      },
    ],
  },
  "mov-to-mp4": {
    title: "Converting Apple QuickTime (.MOV) to Universal .MP4",
    summary:
      "QuickTime MOV is built for macOS and iOS ecosystems, whereas MP4 is the universal standard for Windows, Android, Discord, and HTML5 web video.",
    sections: [
      {
        heading: "When MOV to MP4 Is a 1-Second Container Swap",
        text: "MOV and MP4 share the same ISO base media file architecture. If your Mac screen recording or camera clip is already encoded in H.264 with AAC audio, ClipShrink copies the streams directly into an MP4 wrapper without re-encoding.",
      },
      {
        heading: "Fixing Uncompressed PCM Audio Tracks",
        text: "DSLRs, mirrorless cameras, and QuickTime Player often record uncompressed Linear PCM audio inside .MOV files, which cannot be stored inside standard web MP4s. ClipShrink detects this and converts the audio to stereo AAC automatically.",
      },
      {
        heading: "Faststart Headers for Web Streaming",
        text: "Every converted MP4 is written with the +faststart flag so browsers, Discord, and Slack can begin playing the video immediately without downloading the entire file first.",
      },
    ],
  },
  "webm-to-mp4": {
    title: "Converting Browser & HTML5 WebM Videos to Standard MP4",
    summary:
      "WebM is Google's open-source format used by Chrome screen recorders, MediaRecorder APIs, and webboards, but it fails on iPhones and video editors.",
    sections: [
      {
        heading: "VP8 / VP9 to H.264 Conversion",
        text: "WebM files contain VP8, VP9, or AV1 video paired with Opus audio. Because Apple QuickTime, iOS Mail, and older editing timelines reject VP9/Opus inside MP4, ClipShrink transcodes WebM into standard H.264 + AAC MP4.",
      },
      {
        heading: "Fixing Missing Duration Headers in Screen Recordings",
        text: "Chrome extensions and MediaRecorder WebM files frequently lack a duration header (reporting 'Infinity' length), which breaks scrubbing in video players. Converting to MP4 rebuilds a complete seek table and timestamp index.",
      },
      {
        heading: "Private Conversion for Meeting Captures",
        text: "Browser-recorded meetings, product demos, and coding sessions stay 100% inside your local browser memory during conversion.",
      },
    ],
  },
  "quicktime-to-mp3": {
    title: "Extracting MP3 Audio From QuickTime (.MOV) Recordings",
    summary:
      "Turn large QuickTime screen captures, lectures, and iPhone videos into compact MP3 audio files that play on any device.",
    sections: [
      {
        heading: "Discarding the Video Track (-vn)",
        text: "A 300MB QuickTime .MOV video is 95% video data. ClipShrink strips the video stream immediately in memory and encodes only the audio track using the LAME MP3 encoder.",
      },
      {
        heading: "Variable Bitrate (VBR) Quality Preservation",
        text: "Our converter uses LAME's high-fidelity VBR preset (-q:a 2), preserving crisp vocal frequencies for interviews, podcasts, and voice memos while keeping file sizes small.",
      },
      {
        heading: "Works on Mac, Windows, and iPhone",
        text: "Whether someone sent you a QuickTime .MOV voice recording on Windows or you recorded a lecture on macOS, you can convert it to MP3 right in your browser tab.",
      },
    ],
  },
  "opus-to-mp3": {
    title: "Converting Discord, WhatsApp & Telegram Opus Audio to MP3",
    summary:
      "Opus is the modern codec powering voice notes and VoIP bots, but DAWs, car stereos, and standard media players still require MP3.",
    sections: [
      {
        heading: "Why Raw .Opus Files Won't Open in Editors",
        text: "WhatsApp voice notes, Discord Craig bot recordings, and Telegram audio messages save as .opus or .ogg (Opus) files. Adobe Premiere, Audacity (without FFmpeg plugins), and Windows Media Player often refuse to import them until converted to MP3.",
      },
      {
        heading: "Clean Sample Rate Resampling",
        text: "Opus always operates at an internal 48kHz sample rate. ClipShrink decodes the Opus packets in browser RAM and outputs a standard MP3 that plays cleanly on every hardware player.",
      },
      {
        heading: "100% Private Voice Note Processing",
        text: "Personal voice messages and recorded calls never leave your device—conversion runs locally in WebAssembly.",
      },
    ],
  },
  "m4v-to-mp4": {
    title: "Remuxing Apple .M4V Video Files to Standard .MP4",
    summary:
      "M4V is Apple's MPEG-4 container used by HandBrake defaults, iTunes, and macOS apps. Converting non-DRM M4V to MP4 takes less than a second.",
    sections: [
      {
        heading: "Why HandBrake Exports .M4V by Default",
        text: "HandBrake and Apple tools often save H.264 video with AC3 surround audio or chapter markers using the .m4v extension. Many web uploaders and Android apps block .m4v files based on the file extension alone.",
      },
      {
        heading: "Zero-Re-encode Stream Copy",
        text: "Because M4V already uses H.264 video, ClipShrink copies the video stream directly into a standard .mp4 container with zero generation loss.",
      },
      {
        heading: "Note on DRM-Protected iTunes Purchases",
        text: "Unprotected M4V recordings, HandBrake rips, and home videos convert instantly. Movies purchased from the iTunes Store with Apple FairPlay DRM encryption cannot be decoded outside of Apple's authorized player.",
      },
    ],
  },
  "mpeg-to-mp4": {
    title: "Converting Legacy MPEG-1 and MPEG-2 Videos to Modern H.264 MP4",
    summary:
      "Upgrade older camcorder recordings, DVD .MPG clips, and broadcast MPEG files into web-ready H.264 MP4.",
    sections: [
      {
        heading: "MPEG-1 / MPEG-2 to H.264 Compression",
        text: "Legacy .mpg and .mpeg files use 1990s intra/inter-frame compression that produces huge files and won't play inside modern HTML5 browsers or mobile phones. Transcoding to H.264 MP4 shrinks the file dramatically while restoring universal playback.",
      },
      {
        heading: "MP2 Audio to AAC Stereo Conversion",
        text: "Old MPEG files typically carry MPEG-1 Audio Layer II (MP2) audio tracks. ClipShrink converts the audio to standard AAC stereo so sound plays properly on iOS, Android, and web browsers.",
      },
      {
        heading: "Deinterlacing & Progressive Playback",
        text: "Converting legacy camera clips to yuv420p H.264 ensures smooth progressive playback on modern computer and phone screens.",
      },
    ],
  },
  "ts-to-mp4": {
    title: "Converting Broadcast Transport Streams (.TS) to MP4",
    summary:
      "Video capture cards, IPTV recorders, and HLS web streams save video as MPEG Transport Stream (.TS) packets rather than indexed MP4 files.",
    sections: [
      {
        heading: "Packet Streams vs. Indexed MP4 Containers",
        text: "A .TS file is a raw sequence of 188-byte broadcast packets designed for live transmission—it has no global seek table, which is why scrubbing a .TS file in VLC or importing it into an editor stutters or fails. Wrapping the stream into MP4 builds a proper frame index.",
      },
      {
        heading: "Lossless Remuxing for H.264 TS Captures",
        text: "Most Twitch/HLS stream downloads and Elgato capture files already contain H.264 video and AAC audio inside the .TS wrapper. ClipShrink copies the streams directly into an MP4 container in seconds without re-encoding.",
      },
      {
        heading: "Timestamp Zeroing & Faststart",
        text: "Live broadcast .TS files often start with arbitrary clock timestamps (e.g., 04:12:55 instead of 00:00:00). Remuxing to MP4 normalizes the timeline so it starts cleanly at 00:00.",
      },
    ],
  },
  "gif-to-mp4": {
    title: "Why Converting Animated GIF to MP4 Reduces File Size by 80–95%",
    summary:
      "The 1987 GIF format stores every frame as an uncompressed 256-color palette image. Converting to H.264 MP4 unlocks modern inter-frame video compression.",
    sections: [
      {
        heading: "256 Colors vs. 16.7 Million Colors",
        text: "GIFs are limited to 256 colors per frame, causing grainy dithering dots on gradients and real-life footage. Converting a GIF to yuv420p H.264 MP4 supports full 8-bit color while using a fraction of the bytes.",
      },
      {
        heading: "80% to 95% Smaller File Weight",
        text: "A 15MB animated GIF typically shrinks to a 600KB–1.2MB MP4 file because H.264 only encodes the pixels that change between frames rather than redrawing the entire image 30 times a second.",
      },
      {
        heading: "Required by Instagram, Twitter/X & Modern Web",
        text: "Platforms like Instagram, TikTok, and modern websites don't actually play .gif files—they use silent auto-looping MP4 videos (<video autoplay loop muted playsinline>). Converting your GIF to MP4 makes it ready to post everywhere.",
      },
    ],
  },
  default: {
    title: "How In-Browser Container Remuxing & Conversion Works",
    summary:
      "ClipShrink inspects your file's internal video and audio streams in browser RAM, copying compatible H.264 streams losslessly and transcoding incompatible codecs automatically.",
    sections: [
      {
        heading: "Smart Stream Probing (Copy vs. Transcode)",
        text: "Before converting, ClipShrink runs a header probe in WebAssembly. If your MKV, MOV, M4V, or TS file already contains 8-bit H.264 video, it copies the video stream directly into MP4 without re-encoding—preserving 100% of the original quality in seconds.",
      },
      {
        heading: "Automatic Codec Fallback",
        text: "Simply renaming or stream-copying an HEVC, VP9, AV1, or MPEG-2 stream into .mp4 produces a broken file that still won't play in Windows Media Player or Discord. When ClipShrink detects non-H.264 video, it automatically transcodes it to universal H.264.",
      },
      {
        heading: "100% Local RAM Privacy",
        text: "Unlike cloud converters that cap free uploads at 25MB and store your files on remote servers, ClipShrink processes files up to 500MB locally on your own CPU.",
      },
    ],
  },
};

const FAQ_DATA: Record<string, FaqItem[]> = {
  "mkv-to-mp4": [
    {
      question: "How does ClipShrink convert OBS MKV to MP4 so fast?",
      answer:
        "OBS Studio records H.264 video inside an MKV container to prevent file corruption if your system crashes. When you drop an H.264 MKV here, ClipShrink uses FFmpeg stream-copying (-c copy) to swap the MKV container for an MP4 container in browser RAM without re-encoding the video frames.",
    },
    {
      question: "Why won't Premiere Pro or DaVinci Resolve import my MKV file?",
      answer:
        "Adobe Premiere Pro and several other editors do not support the Matroska (.mkv) container format. Converting your MKV to MP4 gives you immediate timeline compatibility with Premiere Pro, Final Cut Pro, DaVinci Resolve, and CapCut.",
    },
    {
      question: "Does converting MKV to MP4 reduce video quality?",
      answer:
        "Not when the MKV contains standard H.264 video—the video stream is copied bit-for-bit with zero quality loss. If the MKV was recorded using HEVC or AV1, ClipShrink converts it to H.264 so it can play on all devices.",
    },
  ],
  "hevc-to-mp4": [
    {
      question:
        "Why does Windows Media Player say 'HEVC Video Extensions required'?",
      answer:
        "Modern iPhones, GoPros, and drones record in HEVC (H.265) by default, and Microsoft charges for the HEVC codec in the Microsoft Store. Converting your HEVC clip to standard H.264 MP4 here makes it play natively on any Windows PC for free.",
    },
    {
      question: "How do I stop my iPhone from recording in HEVC in the future?",
      answer:
        "On your iPhone, open Settings > Camera > Formats and switch from 'High Efficiency' to 'Most Compatible'. For any videos you have already recorded, drop them here to convert them to standard H.264 MP4.",
    },
    {
      question: "Will converting iPhone HEVC to MP4 fix washed-out HDR colors?",
      answer:
        "Yes. ClipShrink converts 10-bit HEVC recordings into standard 8-bit yuv420p H.264 MP4, fixing the overexposed or washed-out look on non-HDR monitors and web players.",
    },
  ],
  "mov-to-mp4": [
    {
      question:
        "Why do Apple QuickTime MOV files fail on Windows, Android, and Discord?",
      answer:
        "QuickTime (.MOV) files often contain Apple-specific metadata atoms, HEVC video, or uncompressed PCM audio that non-Apple apps cannot parse. ClipShrink converts your MOV into a standard H.264 + AAC MP4 file with faststart headers.",
    },
    {
      question: "Is MOV to MP4 conversion lossless?",
      answer:
        "If your MOV file is already encoded with 8-bit H.264 video (such as many macOS screen recordings), ClipShrink copies the video stream directly into MP4 without re-encoding. If it contains HEVC or ProRes, it transcodes the video to universal H.264.",
    },
    {
      question: "Can I convert large iPhone MOV files without uploading them?",
      answer:
        "Yes. Files up to 500MB on desktop (150MB on mobile) are converted directly inside your browser's local RAM—nothing is uploaded to any cloud server.",
    },
  ],
  "webm-to-mp4": [
    {
      question:
        "Why won't my WebM video play on iPhone or import into video editors?",
      answer:
        "WebM files use Google's VP8 or VP9 video codec and Opus audio, which Apple QuickTime, iOS Mail, and many traditional video editors do not support inside MP4 workflows. ClipShrink converts WebM into universally supported H.264 + AAC MP4.",
    },
    {
      question:
        "Why does my Chrome screen recording WebM have no duration bar?",
      answer:
        "Browser MediaRecorder streams write WebM files on the fly without seeking back to write the total duration at the start of the file. Converting the WebM to MP4 with ClipShrink calculates the exact length and writes a complete seek index.",
    },
    {
      question:
        "Are my screen recordings uploaded to a server during conversion?",
      answer:
        "No. All WebM to MP4 conversion happens locally on your own computer's CPU via WebAssembly.",
    },
  ],
  "quicktime-to-mp3": [
    {
      question: "How do I extract MP3 audio from a QuickTime MOV file?",
      answer:
        "Drop your .mov file into the converter above and click Convert. ClipShrink discards the video track and encodes the audio stream into a universally playable MP3 file directly in your browser.",
    },
    {
      question: "Can I convert Mac QuickTime screen recordings to MP3?",
      answer:
        "Yes. QuickTime Player saves screen and audio recordings as .mov files. Dropping the file here extracts a clean MP3 audio file in seconds without installing any Mac software.",
    },
    {
      question: "Is there a limit on the length of the QuickTime recording?",
      answer:
        "You can extract MP3 audio from lectures, interviews, and voice recordings of any duration as long as the source .mov file is under 500MB on desktop (150MB on mobile).",
    },
  ],
  "opus-to-mp3": [
    {
      question: "What is an .opus file and why won't my media player open it?",
      answer:
        "Opus is a low-latency audio codec used by Discord voice bots (like Craig), WhatsApp voice notes, and Telegram audio messages. Many car stereos, DAWs, and older media players do not recognize .opus files. Converting to MP3 makes the audio playable everywhere.",
    },
    {
      question:
        "How do I convert a WhatsApp or Discord Opus voice note to MP3?",
      answer:
        "Save the .opus or .ogg voice note to your device, drop it into the converter above, and download the resulting MP3 file immediately.",
    },
    {
      question: "Are private voice notes uploaded to the cloud?",
      answer:
        "Never. Your Opus audio files are decoded and converted to MP3 entirely inside your local browser memory.",
    },
  ],
  "m4v-to-mp4": [
    {
      question: "What is the difference between M4V and MP4?",
      answer:
        "M4V is Apple's file extension for MPEG-4 video files, commonly produced by HandBrake, iTunes, and macOS video tools. While structurally almost identical to MP4, many web upload forms and non-Apple players reject the .m4v file extension.",
    },
    {
      question: "Does converting M4V to MP4 re-encode the video?",
      answer:
        "For standard H.264 M4V files, ClipShrink performs a lossless stream-copy (-c copy) into an MP4 container in under a second with zero quality loss.",
    },
    {
      question: "Can this convert DRM-protected iTunes movies?",
      answer:
        "No. Movies purchased or rented from the iTunes Store that are encrypted with Apple FairPlay DRM cannot be converted by any third-party tool. All unprotected M4V files (HandBrake exports, screen recordings, home videos) convert cleanly.",
    },
  ],
  "mpeg-to-mp4": [
    {
      question: "How do I convert old .MPG or .MPEG videos to MP4?",
      answer:
        "Drop your .mpg or .mpeg file into the converter above. ClipShrink decodes the legacy MPEG-1 or MPEG-2 video and MP2 audio streams in your browser and encodes a modern H.264 + AAC MP4 file.",
    },
    {
      question:
        "Why won't my .MPG video play in Chrome, Safari, or on my phone?",
      answer:
        "Modern web browsers and smartphones dropped native support for legacy MPEG-1 and MPEG-2 program streams years ago. Converting to H.264 MP4 makes the video playable across all modern browsers, iPhones, and Android devices.",
    },
    {
      question: "Will converting MPEG to MP4 make the file size smaller?",
      answer:
        "Usually yes—H.264 compression is significantly more efficient than 1990s MPEG-1 and MPEG-2 encoding, resulting in a smaller file at the same visual quality.",
    },
  ],
  "ts-to-mp4": [
    {
      question: "What is a .TS video file and why should I convert it to MP4?",
      answer:
        "A .TS (MPEG Transport Stream) file is a broadcast stream format used by Elgato capture cards, IPTV recorders, and HLS video downloaders. Because .TS files lack a standard file index, video editors and chat apps cannot open or scrub them properly until they are wrapped into an MP4 container.",
    },
    {
      question: "Does converting TS to MP4 lose quality?",
      answer:
        "When the .TS file contains standard H.264 video (which 95% of HLS streams and capture cards use), ClipShrink copies the video stream directly into MP4 with zero re-encoding and zero quality loss.",
    },
    {
      question:
        "Why does my .TS file show the wrong duration in media players?",
      answer:
        "Transport streams only store local packet timestamps rather than a global file header. Remuxing to MP4 builds a complete moov index so the exact duration and timeline scrubbing work properly.",
    },
  ],
  "gif-to-mp4": [
    {
      question: "How much smaller is an MP4 compared to an animated GIF?",
      answer:
        "Converting an animated GIF to an H.264 MP4 typically reduces the file size by 80% to 95%. A 20MB GIF often becomes a 1MB MP4 while looking smoother and sharper.",
    },
    {
      question: "Why can't I upload an animated GIF to Instagram or TikTok?",
      answer:
        "Instagram, TikTok, and YouTube do not accept the .gif image format for feed or story posts. Converting your GIF to an MP4 video file lets you upload it to any social platform.",
    },
    {
      question: "Does ClipShrink add a watermark when converting GIF to MP4?",
      answer: "Never. Your converted MP4 is 100% clean and watermark-free.",
    },
  ],
  default: [
    {
      question:
        "How is ClipShrink different from cloud converters like CloudConvert or FreeConvert?",
      answer:
        "Cloud converters make you upload your files to remote servers, wait in a queue, and cap free users at 25MB or a few files per day. ClipShrink runs 100% locally in your browser memory using WebAssembly—your files never leave your device, and there are no daily quotas.",
    },
    {
      question:
        "When does ClipShrink use lossless stream-copy vs. re-encoding?",
      answer:
        "ClipShrink probes your file header first. If the video stream is already 8-bit H.264 (common in OBS .mkv, .ts, .m4v, and many .mov files), it copies the video stream directly into MP4 without re-encoding. If the video uses HEVC, VP9, MPEG-2, or GIF frames, it transcodes the stream to H.264 so the resulting MP4 is guaranteed to play everywhere.",
    },
    {
      question: "Does ClipShrink add watermarks to converted files?",
      answer:
        "Never. All conversions are free, watermark-free, and require no account registration.",
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Conversion Speed",
    cloud: "30–90s (Upload + Server Queue + Download)",
    clipshrink: "1–3s for H.264 stream-copy; local CPU speed when re-encoding",
  },
  {
    feature: "File Privacy",
    cloud: "Uploaded & stored on remote third-party servers",
    clipshrink: "100% In-Browser RAM (Files never leave your device)",
  },
  {
    feature: "H.264 Stream Quality",
    cloud: "Often re-encoded with lossy presets",
    clipshrink: "100% Lossless bit-for-bit stream copy (-c copy)",
  },
  {
    feature: "Codec Verification",
    cloud: "Blind download (Must test in external player)",
    clipshrink: "Built-in browser video/audio preview before saving",
  },
  {
    feature: "Watermarks & Quotas",
    cloud: "25MB free limits, daily caps, or watermarks",
    clipshrink: "Up to 500MB per file, zero watermarks, unlimited use",
  },
];

export default function ConverterSeoContent({
  slug = "default",
}: ConverterSeoContentProps) {
  const safeSlug = (
    slug in CONVERTER_GUIDES ? slug : "default"
  ) as ConverterSlug;
  const guide = CONVERTER_GUIDES[safeSlug];
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

      {/* Dynamic Format-Specific Technical Guide */}
      <section aria-labelledby="format-guide-heading" className="space-y-6">
        <div className="text-center mb-8">
          <h2
            id="format-guide-heading"
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
      <section aria-labelledby="how-it-works-heading">
        <div className="text-center mb-8">
          <h2
            id="how-it-works-heading"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How In-Browser Format Conversion Works
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Fast local processing with automatic codec inspection.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 overflow-hidden">
          <div className="p-6">
            <div className="text-xs font-mono font-bold text-indigo-600 mb-2">
              STEP 01
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">
              Select Your Source File
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Drop your MKV, HEVC, MOV, WebM, TS, M4V, GIF, or Opus file. It
              loads directly into your browser&apos;s private memory sandbox.
            </p>
          </div>

          <div className="p-6">
            <div className="text-xs font-mono font-bold text-indigo-600 mb-2">
              STEP 02
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">
              Stream-Copy or Transcode
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Compatible H.264 streams are remuxed without re-encoding; other
              codecs are automatically converted to universal H.264 / MP3.
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
              Verify playback in the built-in browser player and save your
              converted file immediately with no watermarks.
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
            ClipShrink vs. Cloud File Converters
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Why converting containers in local browser RAM is faster and safer
            than uploading videos to remote servers.
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
                    Cloud Upload Converters
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

      {/* Frequently Asked Questions */}
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

      {/* Complete 10-Spoke Converter Directory */}
      <section className="border-t border-slate-200 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            All Format Converters
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            10 Dedicated Tools
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
          <Link
            href="/convert/mkv-to-mp4"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            MKV to MP4 (OBS) →
          </Link>
          <Link
            href="/convert/hevc-to-mp4"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            HEVC to MP4 (iPhone) →
          </Link>
          <Link
            href="/convert/mov-to-mp4"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            MOV to MP4 (QuickTime) →
          </Link>
          <Link
            href="/convert/webm-to-mp4"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            WebM to MP4 →
          </Link>
          <Link
            href="/convert/quicktime-to-mp3"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            QuickTime to MP3 →
          </Link>
          <Link
            href="/convert/opus-to-mp3"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Opus to MP3 (Discord) →
          </Link>
          <Link
            href="/convert/m4v-to-mp4"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            M4V to MP4 →
          </Link>
          <Link
            href="/convert/mpeg-to-mp4"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            MPEG to MP4 →
          </Link>
          <Link
            href="/convert/ts-to-mp4"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            TS to MP4 →
          </Link>
          <Link
            href="/convert/gif-to-mp4"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            GIF to MP4 →
          </Link>
        </div>
      </section>
    </div>
  );
}
