import React from "react";
import Link from "next/link";
import { Check, X, ChevronDown } from "lucide-react";

export type MuterSlug =
  | "iphone-video"
  | "mp4"
  | "mov"
  | "instagram-reels"
  | "send-without-sound"
  | "mkv"
  | "default";

interface MuterSeoContentProps {
  slug?: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface MuterGuide {
  title: string;
  summary: string;
  sections: { heading: string; text: string }[];
}

const MUTER_GUIDES: Record<MuterSlug, MuterGuide> = {
  "iphone-video": {
    title:
      "Why Muting in iPhone Photos Can Leak Audio (And How Stream Removal Works)",
    summary:
      "Tapping the speaker icon in the iOS Photos app often applies a reversible metadata flag rather than deleting the audio stream.",
    sections: [
      {
        heading: "Metadata Mute vs. Physical Track Removal (-an)",
        text: "When you mute a clip inside the Apple Photos app, iOS can keep the original audio track inside the .MOV container so you can 'Revert to Original' later. Some third-party uploaders and Windows players ignore that mute flag and play the sound anyway. ClipShrink physically deletes the audio track from the container.",
      },
      {
        heading: "Zero Loss in 4K / 60fps iPhone Quality",
        text: "Because ClipShrink uses FFmpeg stream-copying (-c:v copy) whenever compatible, the video bitstream is copied directly without re-encoding—keeping your 4K resolution and 60fps smoothness intact.",
      },
      {
        heading: "Runs Directly in Mobile Safari",
        text: "You don't need to install any App Store video editor or upload personal camera roll clips to a cloud server. Everything runs in your iPhone's local Safari memory.",
      },
    ],
  },
  mp4: {
    title: "How Lossless MP4 Audio Track Removal Works",
    summary:
      "An MP4 container holds separate video and audio tracks. Stripping the audio track takes less than a second because the video frames are never re-encoded.",
    sections: [
      {
        heading: "Demuxing With the -an Flag",
        text: "ClipShrink passes the -an (Audio No) and -c:v copy flags to FFmpeg in WebAssembly. The engine reads your MP4 packet table, copies every H.264 video packet into a new MP4 container, and drops all AAC or MP3 audio packets.",
      },
      {
        heading: "Smaller File Size With Identical Video",
        text: "Depending on the audio bitrate (128kbps to 320kbps) and clip duration, removing the audio stream reduces your MP4 file size by roughly 1MB to 2.5MB per minute without touching a single video pixel.",
      },
      {
        heading: "Ideal for HTML5 Autoplay Background Videos",
        text: "Modern browsers (Chrome, Safari, iOS) block <video autoplay> if an audio track is present or unmuted. Stripping the audio track completely guarantees smooth autoplay on landing pages and saving bandwidth.",
      },
    ],
  },
  mov: {
    title: "Stripping Heavy PCM & AAC Audio From QuickTime (.MOV) Files",
    summary:
      "Apple QuickTime .MOV recordings from Macs, iPhones, and mirrorless cameras often contain uncompressed audio tracks that bloat file sizes.",
    sections: [
      {
        heading: "Removing Uncompressed Linear PCM Audio",
        text: "Cameras and QuickTime screen recorders frequently store 16-bit or 24-bit uncompressed PCM audio inside .MOV files, adding over 10MB per minute of recording. Stripping the audio stream immediately slims down the file.",
      },
      {
        heading: "Universal Silent MP4 Output",
        text: "While removing the audio stream, ClipShrink outputs a standard MP4 container with faststart headers so your silent clip plays natively on Windows, Android, and web browsers.",
      },
      {
        heading: "Built-In Silent Playback Verification",
        text: "Before downloading, you can play the muted video right on the page and confirm that the audio icon is disabled (0 audio streams present).",
      },
    ],
  },
  "instagram-reels": {
    title: "Muting Clips Before Posting to Instagram Reels, TikTok & Shorts",
    summary:
      "Remove background chatter, wind noise, and copyrighted store radio before uploading clips to social video platforms.",
    sections: [
      {
        heading: "Preventing Automated Music Copyright Claims",
        text: "If you record a video in a gym, cafe, or car where copyrighted music is playing in the background, Instagram and YouTube's Content ID systems can mute your entire Reel or block it even if you lower the volume slider in-app. Stripping the original audio track before uploading prevents automated flags.",
      },
      {
        heading: "Clean Slate for Trending Audio & Voiceovers",
        text: "Uploading a clip with zero audio tracks makes it effortless to layer trending Reels audio, TikTok sounds, or a clean voiceover without camera handling noise bleeding through.",
      },
      {
        heading: "No Watermarks Added to Your Vertical Video",
        text: "Unlike mobile editing apps that stamp a logo onto the end of your 9:16 vertical clip, ClipShrink leaves your video 100% clean and unbranded.",
      },
    ],
  },
  "send-without-sound": {
    title: "Permanently Removing Sound Before Sharing a Video",
    summary:
      "Make sure private background conversations, wind roar, or accidental noise are permanently gone before sending a video on WhatsApp, iMessage, Email, or Slack.",
    sections: [
      {
        heading: "Why In-App Mute Buttons Are Risky",
        text: "Some messaging apps let you toggle a speaker icon when sending a video, while others (like email attachments, Slack, or Discord) send the raw file as-is. Stripping the audio stream in ClipShrink guarantees the recipient receives a file with zero audio data.",
      },
      {
        heading: "Private In-Browser Processing",
        text: "If a video has sensitive or embarrassing background conversation you want to remove, the last thing you want to do is upload it to a third-party cloud server. ClipShrink removes the audio locally inside your browser tab.",
      },
      {
        heading: "Faststart Headers for Instant Chat Preview",
        text: "The muted output file is saved as a standard MP4 with faststart metadata so it previews inline in WhatsApp, Discord, Slack, and iMessage.",
      },
    ],
  },
  mkv: {
    title: "Removing Audio Tracks From OBS Studio & Matroska (.MKV) Files",
    summary:
      "Strip desktop audio, Discord voice chat, or multi-track microphone streams from MKV recordings in under a second.",
    sections: [
      {
        heading: "Stripping All MKV Audio Streams at Once",
        text: "OBS Studio often records up to 6 separate audio tracks inside a single .MKV file (game audio, microphone, Discord voice chat, Spotify). Passing -an in ClipShrink strips every audio track cleanly while copying the video stream.",
      },
      {
        heading: "Lossless B-Roll Extraction for Editors",
        text: "When cutting silent gameplay B-roll or tutorial background footage, removing the multi-track audio streams keeps your editing timeline clean and uncluttered.",
      },
      {
        heading: "Zero Video Re-Encoding",
        text: "Your 1080p or 1440p 60fps MKV video stream is copied bit-for-bit without re-encoding or compression artifacts.",
      },
    ],
  },
  default: {
    title: "How In-Browser Lossless Audio Removal Works",
    summary:
      "ClipShrink strips audio streams from MP4, MOV, MKV, and WebM files directly inside your browser's local RAM without re-encoding the video.",
    sections: [
      {
        heading: "Stream-Copy Demuxing (-an -c:v copy)",
        text: "Traditional cloud video editors decode your video frames and re-render the entire file just to mute it. ClipShrink simply copies the existing video packets into a new container and discards the audio packets—finishing in less than a second.",
      },
      {
        heading: "Permanent Audio Track Deletion",
        text: "Instead of setting a volume metadata flag that can be reversed, the audio stream is physically omitted from the output file.",
      },
      {
        heading: "100% Local Device Privacy",
        text: "Your video files never leave your computer or phone. All processing runs locally in WebAssembly with zero server uploads and zero watermarks.",
      },
    ],
  },
};

const FAQ_DATA: Record<string, FaqItem[]> = {
  "iphone-video": [
    {
      question:
        "Why should I strip the audio track instead of muting in the iPhone Photos app?",
      answer:
        "Muting a video in the iOS Photos app uses non-destructive metadata so you can 'Revert to Original' later. When shared to certain Windows programs or web forms, that metadata flag can be ignored. ClipShrink physically removes the audio track from the file so the sound can never be played or recovered.",
    },
    {
      question:
        "How do I remove sound from an iPhone video without downloading an app?",
      answer:
        "Open this page in Safari on your iPhone, tap 'Choose Video to Mute', select your clip from Photos, and tap Remove Audio Track. The silent MP4 is created right in Safari memory in under a second.",
    },
    {
      question:
        "Will removing sound reduce my iPhone video's 4K or 60fps quality?",
      answer:
        "No. ClipShrink copies the video stream directly without re-encoding whenever compatible, preserving your exact resolution and frame rate.",
    },
  ],
  mp4: [
    {
      question: "How do I remove the audio track from an MP4 video online?",
      answer:
        "Drop your MP4 file into the box above and click Remove Audio Track. ClipShrink runs FFmpeg in your browser with the -an and -c:v copy flags, stripping the audio stream in under a second without re-encoding the video.",
    },
    {
      question: "Does removing audio from an MP4 make the file size smaller?",
      answer:
        "Yes. Deleting the AAC or MP3 audio stream reduces the MP4 file size by the exact weight of the audio track (typically 1MB to 2.5MB per minute of video).",
    },
    {
      question: "Why remove the audio track for website background videos?",
      answer:
        "Removing the audio stream completely saves bandwidth for visitors and ensures mobile and desktop browsers allow the <video> tag to autoplay smoothly.",
    },
  ],
  mov: [
    {
      question: "How do I mute an Apple QuickTime (.MOV) video?",
      answer:
        "Select your .mov file above and click Remove Audio Track. ClipShrink strips the PCM or AAC audio track in your browser RAM and saves a clean, silent .mp4 file.",
    },
    {
      question: "Why did my .MOV file shrink so much after removing audio?",
      answer:
        "Many cameras and QuickTime recordings store uncompressed Linear PCM audio inside .MOV files, which takes up ~10MB per minute. Stripping that uncompressed audio track significantly reduces the file size.",
    },
    {
      question: "Will my muted QuickTime video play on Windows and Android?",
      answer:
        "Yes. ClipShrink outputs the muted video in a standard MP4 container with faststart headers for universal compatibility.",
    },
  ],
  "instagram-reels": [
    {
      question:
        "Why mute a video before uploading to Instagram Reels or TikTok?",
      answer:
        "If your raw clip has copyrighted music playing in the background (at a gym, store, or event), social platforms can flag or mute your entire post—even if you add a voiceover. Stripping the original audio track before uploading eliminates background music completely.",
    },
    {
      question:
        "Does ClipShrink add a watermark or change my 9:16 vertical aspect ratio?",
      answer:
        "Never. Your vertical 9:16 resolution, frame rate, and image quality remain 100% untouched with zero watermarks.",
    },
    {
      question: "Can I mute Reels clips directly on my phone?",
      answer:
        "Yes. ClipShrink works directly inside mobile Safari on iPhone and Chrome on Android with no app installation required.",
    },
  ],
  "send-without-sound": [
    {
      question:
        "How do I send a video without sound on WhatsApp, Email, or Slack?",
      answer:
        "Drop your video into ClipShrink, click Remove Audio Track, and download the muted MP4. Because the audio stream has been physically removed from the file, you can attach it in Email, Slack, Discord, or iMessage knowing it is permanently silent.",
    },
    {
      question:
        "Can the person receiving the video unmute it or recover the audio?",
      answer:
        "No. Unlike a player mute button, ClipShrink completely omits the audio packets when writing the new file. There is zero audio data inside the downloaded MP4.",
    },
    {
      question:
        "Are my private videos uploaded to a server when I mute them here?",
      answer:
        "Never. Your video stays 100% inside your browser's local memory and is processed on your own device.",
    },
  ],
  mkv: [
    {
      question: "How do I remove audio tracks from an MKV file?",
      answer:
        "Drop your .mkv file into the muter above and click Remove Audio Track. ClipShrink copies the video stream and strips all embedded audio tracks in under a second.",
    },
    {
      question: "What if my OBS MKV recording has multiple audio tracks?",
      answer:
        "The -an flag removes all audio streams (Track 1, Track 2, Track 3, etc.) from the MKV container simultaneously, leaving a clean video-only file.",
    },
    {
      question: "Does removing audio from an MKV degrade video quality?",
      answer:
        "No. The video stream is copied bit-for-bit (-c:v copy) without re-encoding.",
    },
  ],
  default: [
    {
      question:
        "How is ClipShrink able to remove audio from a video in under a second?",
      answer:
        "Most online tools upload your file to a cloud server and re-encode the entire video. ClipShrink runs FFmpeg locally in your browser via WebAssembly and uses stream-copying (-an -c:v copy)—copying the video packets directly while dropping the audio packets.",
    },
    {
      question: "Can anyone recover the removed audio from the muted file?",
      answer:
        "No. The audio stream is physically omitted when the new container is written in browser RAM. The output file contains 0 audio tracks.",
    },
    {
      question: "Do my video files ever get uploaded to an external server?",
      answer:
        "Never. Video files are processed 100% locally in your web browser memory with zero server uploads and zero watermarks.",
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Muting Speed",
    cloud: "30–90 seconds (Slow network upload + server queue)",
    clipshrink: "Under 1 second (In-memory lossless stream-copy)",
  },
  {
    feature: "Server File Storage",
    cloud: "Uploaded & stored on remote servers for hours",
    clipshrink: "0 Seconds (Files never leave your local device RAM)",
  },
  {
    feature: "Video Pixel Quality",
    cloud: "Often re-encoded or compressed on free tiers",
    clipshrink: "100% Bit-for-bit lossless (-c:v copy)",
  },
  {
    feature: "Silence Verification",
    cloud: "Blind download",
    clipshrink: "Built-in preview player to verify 0 audio streams",
  },
  {
    feature: "Watermarks & Quotas",
    cloud: "Watermarks or daily file limits on free accounts",
    clipshrink: "Zero watermarks, no signup, unlimited free use",
  },
];

export default function MuterSeoContent({
  slug = "default",
}: MuterSeoContentProps) {
  const safeSlug = (slug in MUTER_GUIDES ? slug : "default") as MuterSlug;
  const guide = MUTER_GUIDES[safeSlug];
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
      <section aria-labelledby="muter-guide-heading" className="space-y-6">
        <div className="text-center mb-8">
          <h2
            id="muter-guide-heading"
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
      <section aria-labelledby="how-mute-works-heading">
        <div className="text-center mb-8">
          <h2
            id="how-mute-works-heading"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Remove Audio From a Video Online
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Permanently strip sound tracks in three steps without re-encoding.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 overflow-hidden">
          <div className="p-6">
            <div className="text-xs font-mono font-bold text-indigo-600 mb-2">
              STEP 01
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">
              Select Your Video
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Drop any MP4, iPhone MOV, MKV, or WebM clip. The file loads
              directly into your browser&apos;s private memory.
            </p>
          </div>

          <div className="p-6">
            <div className="text-xs font-mono font-bold text-indigo-600 mb-2">
              STEP 02
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">
              Strip the Audio Stream (-an)
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Click Remove Audio Track. Our WebAssembly engine copies the video
              packets and discards all audio streams in under a second.
            </p>
          </div>

          <div className="p-6">
            <div className="text-xs font-mono font-bold text-indigo-600 mb-2">
              STEP 03
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">
              Verify & Download
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Confirm silent playback in the preview player and download your
              watermark-free silent video.
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
            ClipShrink vs. Cloud Video Muters
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Why stripping audio tracks in local browser RAM beats uploading
            large video files to remote cloud servers.
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

      {/* Spokes Navigation */}
      <section className="border-t border-slate-200 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Dedicated Video Muting Tools
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            6 Lossless Audio Strippers
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
          <Link
            href="/remove-audio/iphone-video"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Mute iPhone Video →
          </Link>
          <Link
            href="/remove-audio/mp4"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Remove Audio from MP4 →
          </Link>
          <Link
            href="/remove-audio/mov"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Mute QuickTime MOV →
          </Link>
          <Link
            href="/remove-audio/instagram-reels"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Mute for Reels / TikTok →
          </Link>
          <Link
            href="/remove-audio/send-without-sound"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Send Video Without Sound →
          </Link>
          <Link
            href="/remove-audio/mkv"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Remove Audio from MKV →
          </Link>
        </div>
      </section>
    </div>
  );
}
