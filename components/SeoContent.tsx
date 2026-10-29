import React from "react";
import Link from "next/link";
import {
  Zap,
  Scissors,
  Smartphone,
  Lock,
  HelpCircle,
  Check,
  X,
  Sparkles,
  Layers,
  ChevronDown,
  BookOpen,
} from "lucide-react";

export type SpokeType =
  | "home"
  | "discord-8mb"
  | "gmail-25mb"
  | "whatsapp"
  | "10mb"
  | "email-20mb"
  | "outlook-20mb"
  | "slack-10mb"
  | "nitro-50mb"
  | "25mb-custom"
  | "mov-to-discord"
  | "iphone-compress"
  | "iphone-large-video"
  | "twitter"
  | "100mb";

interface SeoContentProps {
  type?: SpokeType;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface PlatformGuide {
  title: string;
  summary: string;
  sections: { heading: string; text: string }[];
}

const PLATFORM_GUIDES: Record<SpokeType, PlatformGuide> = {
  whatsapp: {
    title: "Understanding WhatsApp's 16MB Video Attachment Limit",
    summary:
      "WhatsApp enforces a strict 16MB file size ceiling for videos sent as media attachments on iOS, Android, and WhatsApp Web.",
    sections: [
      {
        heading: "Media Attachment vs. Document Sharing",
        text: "When you send a video as standard media, WhatsApp automatically recompresses the file and caps it at 16MB. If your video is already compressed under 16MB using clean H.264 encoding and faststart headers, WhatsApp's server passes it through without aggressive artifacting.",
      },
      {
        heading: "Why WhatsApp Web Rejects Certain MP4s",
        text: "WhatsApp Web requires videos to have an H.264 video stream, AAC stereo audio, and a yuv420p color space. Videos recorded in newer HEVC (H.265) or AV1 codecs frequently fail to upload on web sessions. ClipShrink standardizes the container so it plays seamlessly on every recipient's device.",
      },
      {
        heading: "Optimal Resolution for 16MB Files",
        text: "For clips between 30 and 90 seconds, downscaling to 720p HD at 30 FPS provides the ideal balance of crisp visual clarity and audio fidelity while staying safely under the 16MB threshold.",
      },
    ],
  },
  "iphone-compress": {
    title: "Why iPhone Videos Are So Large (And How to Shrink Them)",
    summary:
      "Modern iPhones record in High Efficiency Video Coding (HEVC / H.265) at very high bitrates, causing short clips to rapidly exceed messaging limits.",
    sections: [
      {
        heading: "The iPhone HEVC & 4K Dilemma",
        text: "A 30-second 4K 60fps video recorded on an iPhone 14, 15, or 16 can easily exceed 100MB. When shared to Windows, Android, or web forms, non-Apple devices frequently fail to decode the HEVC codec or reject the file due to size.",
      },
      {
        heading: "Mobile Safari In-Browser WebAssembly",
        text: "Unlike App Store compression apps that demand subscriptions or display full-screen ads, ClipShrink runs entirely inside mobile Safari RAM. The video is transcoded on your iPhone's Bionic or Apple Silicon chip without uploading a single byte to external servers.",
      },
      {
        heading: "Preventing iOS Memory Crashes",
        text: "iOS Safari enforces strict memory caps on individual browser tabs (typically 1.5GB). ClipShrink includes built-in heap safeguards that prevent tab crashes by streaming memory chunks directly during encoding.",
      },
    ],
  },
  "iphone-large-video": {
    title:
      "How to Send Large Videos from iPhone Without Blurry Carrier Compression",
    summary:
      "Cellular carriers heavily compress videos sent over standard SMS/MMS. Shrinking the file locally allows direct sharing over messaging platforms.",
    sections: [
      {
        heading: "The Carrier SMS Compression Trap",
        text: "When sending videos between iPhone and Android via SMS/MMS, cellular providers automatically crush files down to under 3.5MB, resulting in unreadable, pixelated videos. Pre-compressing your file under 16MB or 25MB preserves sharp 720p resolution.",
      },
      {
        heading: "Avoiding iCloud Shared Link Frustrations",
        text: "By default, iOS suggests generating an iCloud Drive link for videos over 25MB. Recipients often have trouble downloading these links or lack sufficient iCloud storage. Compressing the file under 25MB allows you to attach the native MP4 directly into email or messaging apps.",
      },
      {
        heading: "Preserving Audio and Frame Rates",
        text: "ClipShrink preserves clear 30 FPS playback and crisp AAC stereo dialogue, ensuring your personal and family videos look professional when received.",
      },
    ],
  },
  "nitro-50mb": {
    title: "Maximizing Quality for Discord Nitro Basic (50MB Limit)",
    summary:
      "Discord Nitro Basic provides a 50MB file upload limit, allowing you to retain high-bitrate gaming clips and 1080p highlights.",
    sections: [
      {
        heading: "50MB Bitrate Allocation Strategy",
        text: "With a 50MB budget, you can comfortably retain 1080p Full HD resolution at 60 FPS for clips up to 60 seconds. For longer clips (2 to 5 minutes), 720p HD with an elevated video bitrate ensures crystal-clear text readability in gaming UI.",
      },
      {
        heading: "The faststart Header Requirement",
        text: "Discord streams videos inline using HTML5 players. Without the faststart flag, Discord forces users to download the full 50MB file before playing. ClipShrink automatically injects faststart headers so your clip plays instantly in chat.",
      },
      {
        heading: "OBS and ShadowPlay Clip Optimization",
        text: "Raw clips exported from OBS Studio or Nvidia ShadowPlay often carry excessive bitrates (20,000+ kbps). ClipShrink recompresses the stream to hit the exact 50MB target while maintaining fluid frame pacing.",
      },
    ],
  },
  "discord-8mb": {
    title: "Discord Free Upload Limit Guide (Now 20MB in 2026)",
    summary:
      "Discord raised its free file upload ceiling to 20MB in August 2026, though many users still aim for smaller 8MB or 10MB sizes for fast mobile delivery.",
    sections: [
      {
        heading: "The Evolution of Discord's Free Limit",
        text: "Discord originally enforced an 8MB limit for free accounts, briefly tested 10MB, and officially raised the cap to 20MB in August 2026. While the 20MB limit is now standard, targeting 8MB or 10MB remains useful for users on slower mobile connections.",
      },
      {
        heading: "Dynamic Bitrate Formula",
        text: "To ensure your video never bounces with an 'upload failed' error, ClipShrink uses the formula: Bitrate = (Target MB × 8192) / Duration. This calculates the precise maximum bandwidth your clip can consume.",
      },
      {
        heading: "Gaming Highlight Compression",
        text: "For fast-paced gameplay (Valorant, Fortnite, Apex Legends), keeping clip length between 30 and 45 seconds allows for crisp 720p 30fps output with clear game audio.",
      },
    ],
  },
  "gmail-25mb": {
    title: "Sending Video Attachments in Gmail (25MB Hard Limit)",
    summary:
      "Gmail strictly caps email attachments at 25MB. Files exceeding this limit are automatically converted into Google Drive links.",
    sections: [
      {
        heading: "The 33% Base64 Encoding Overhead",
        text: "Email protocols encode binary files into MIME Base64 text during transit, which increases file size by approximately 33%. A 24MB raw file can easily exceed 30MB during transmission. ClipShrink safely targets ~22MB to ensure your attachment never trips the 25MB ceiling.",
      },
      {
        heading: "Direct Inline Attachments vs. Cloud Links",
        text: "Sending video via Google Drive links often introduces permission friction, requiring recipients to request access. Compressing the file under 25MB keeps the video directly attached inside the email body.",
      },
      {
        heading: "Business Presentations & Screen Recordings",
        text: "Presentation decks and screen demos up to 8 minutes compress cleanly below 25MB while preserving 100% legible text, code snippets, and voiceover audio.",
      },
    ],
  },
  "email-20mb": {
    title:
      "Standard Email Video Attachment Limits (Outlook, Yahoo, Apple Mail)",
    summary:
      "While Gmail allows 25MB, most enterprise email servers and providers enforce a strict 20MB attachment limit.",
    sections: [
      {
        heading: "Corporate Exchange and Outlook Caps",
        text: "Microsoft Exchange and Outlook desktop applications default to a 20MB file cap. ClipShrink's email preset targets ~18MB, leaving sufficient room for Base64 transport encoding without bouncing your email.",
      },
      {
        heading: "Clean Client-Side Compression for Workplace Privacy",
        text: "Confidential company presentations, client bug demonstrations, and internal recordings should never be uploaded to third-party cloud compressors. ClipShrink processes everything locally in browser memory.",
      },
      {
        heading: "Universal MP4 Compatibility",
        text: "All output files use standardized H.264 video with AAC audio, ensuring your attachments open instantly in Outlook, Apple Mail, Thunderbird, and mobile mail clients.",
      },
    ],
  },
  "outlook-20mb": {
    title: "Optimizing Video Files for Microsoft Outlook (20MB Cap)",
    summary:
      "Learn how to compress workplace clips and presentations to fit Outlook's 20MB limit without losing slide readability.",
    sections: [
      {
        heading: "Why Outlook Rejects Files Over 20MB",
        text: "Microsoft Outlook desktop defaults to a 20MB limit on Internet email accounts (POP3/IMAP). Compressing to ~18MB guarantees your email delivers without bounce-back notifications.",
      },
      {
        heading: "Maintaining Clear Text in Slides and Demos",
        text: "ClipShrink prioritizes sharp contrast for typography and UI elements, ensuring your PowerPoint recordings, Excel walkthroughs, and software bug demos remain sharp.",
      },
      {
        heading: "Zero IT Installation Required",
        text: "Because ClipShrink operates purely in your web browser via WebAssembly, you don't need administrative permissions to install third-party software on managed work laptops.",
      },
    ],
  },
  "slack-10mb": {
    title: "Optimizing Video for Slack Channels and Direct Messages",
    summary:
      "While Slack supports large file uploads, keeping clips under 10MB ensures instant playback and faster workspace loading.",
    sections: [
      {
        heading: "Upload Speed and Channel Playback",
        text: "Large video uploads in Slack can stall or fail on unstable connections. A streamlined 10MB clip uploads in seconds and buffers immediately for coworkers.",
      },
      {
        heading: "Conserving Workspace Storage",
        text: "Free and standard Slack workspaces have team storage quotas. Sending compact 10MB videos prevents channels from hitting storage ceilings prematurely.",
      },
      {
        heading: "Ideal for Bug Reports and Design Reviews",
        text: "10MB is the sweet spot for 1- to 2-minute screen captures showing software bugs, UI animations, and design feedback.",
      },
    ],
  },
  "10mb": {
    title: "Compressing Video to Exactly 10MB",
    summary:
      "10MB is a common upload threshold for job portals, university systems, and support ticketing platforms.",
    sections: [
      {
        heading: "Precise Bitrate Calculation",
        text: "Hitting a 10MB target requires exact mathematical calculation: (9.0MB × 8192) / Duration. ClipShrink leaves an intentional safety margin so the final file never exceeds 9.8MB.",
      },
      {
        heading: "Multi-Pass Bitrate Verification",
        text: "If an initial pass exceeds the 10MB limit due to complex motion, ClipShrink automatically adjusts the bitrate down by 15% and refines the encoding to guarantee compliance.",
      },
      {
        heading: "Job Applications and Portals",
        text: "Applicant tracking systems (Workday, Taleo, Greenhouse) often enforce a 10MB maximum for video introductions and portfolio reels.",
      },
    ],
  },
  "25mb-custom": {
    title: "Compressing Video Under 25MB for Universal Web Use",
    summary:
      "A 25MB file size is the universal standard for web forms, customer support desks, and online LMS platforms.",
    sections: [
      {
        heading: "Universal Portal Compatibility",
        text: "Platforms like Zendesk, Freshdesk, Canvas, and Blackboard universally accept files up to 25MB. Pre-compressing ensures your submissions never fail.",
      },
      {
        heading: "Balanced Duration and Clarity",
        text: "At 25MB, you can easily maintain 720p HD resolution for 5 to 8 minutes of presentation or educational footage.",
      },
      {
        heading: "Instant Local Processing",
        text: "With WebAssembly, compressing a 25MB file takes just seconds on modern desktop hardware without consuming cloud queue times.",
      },
    ],
  },
  "mov-to-discord": {
    title: "Converting and Compressing iPhone MOV Files for Discord",
    summary:
      "Fix black screen errors and download-only attachments by converting Apple MOV files to Discord-compatible MP4.",
    sections: [
      {
        heading: "Why Discord Won't Play iPhone MOV Files",
        text: "Apple QuickTime (.MOV) files recorded with HEVC/H.265 are treated as file downloads by Discord rather than playing directly in chat. ClipShrink converts the container and video stream to universal H.264 MP4.",
      },
      {
        heading: "Instant In-Chat Streaming",
        text: "We apply faststart metadata to the start of the file, allowing Discord's desktop and mobile apps to stream the clip immediately as soon as you press send.",
      },
      {
        heading: "Color Space Normalization",
        text: "iPhone videos often use wide-gamut P3 color profiles that appear washed out on Windows. ClipShrink normalizes color to standard yuv420p for consistent colors everywhere.",
      },
    ],
  },
  twitter: {
    title: "Optimizing Video for Twitter / X Web Uploads",
    summary:
      "Prevent upload stalls and avoid severe server-side recompression by preparing your clip to Twitter's exact specifications.",
    sections: [
      {
        heading: "Avoiding Twitter's Aggressive Re-Encoding",
        text: "When you upload high-bitrate video, Twitter's server encoder aggressively compresses it, creating noticeable pixelation. Pre-optimizing to 720p 30fps H.264 ensures a much cleaner final presentation.",
      },
      {
        heading: "Eliminating Upload Processing Timeouts",
        text: "Large video files frequently stall or time out during Twitter's processing step. Keeping the file around 22MB ensures rapid, dependable publishing.",
      },
      {
        heading: "Mobile Feed Fluidity",
        text: "Standardized frame pacing ensures your clip plays smoothly in Twitter feeds across iOS, Android, and desktop browsers.",
      },
    ],
  },
  "100mb": {
    title: "Compressing Video Files Under 100MB",
    summary:
      "Shrink large presentation recordings and webinar replays under 100MB for enterprise intranets and LMS portals.",
    sections: [
      {
        heading: "Generous Bandwidth for Long-Form Video",
        text: "A 100MB limit easily accommodates 10 to 15 minutes of crisp 720p video, making it ideal for lectures, workshops, and product walkthroughs.",
      },
      {
        heading: "LMS and Corporate Portal Compliance",
        text: "Corporate intranets and university systems (Moodle, Blackboard, Canvas) typically cap student and employee video submissions at 100MB.",
      },
      {
        heading: "Lossless Audio Retention",
        text: "With a 100MB data budget, ClipShrink preserves full 96kbps or 128kbps stereo AAC audio, keeping background music and speech perfectly clear.",
      },
    ],
  },
  home: {
    title: "How In-Browser WebAssembly Video Compression Works",
    summary:
      "ClipShrink brings the power of FFmpeg directly into your web browser, eliminating the need to upload personal videos to third-party cloud servers.",
    sections: [
      {
        heading: "Client-Side Processing Architecture",
        text: "Traditional online compressors upload your video to remote server queues, raising privacy concerns and consuming significant upload bandwidth. ClipShrink runs a compiled WebAssembly binary directly on your computer's CPU.",
      },
      {
        heading: "Dynamic Bitrate Calculation",
        text: "Our engine inspects your video's duration and mathematically derives the exact bitrate needed to hit your target limit (Discord, WhatsApp, Gmail, or custom sizes) without guessing.",
      },
      {
        heading: "Privacy by Design",
        text: "Your video files are loaded into browser RAM and decoded locally. Zero bytes of video data are transmitted over the internet, guaranteeing complete confidentiality.",
      },
    ],
  },
};

const FAQ_DATA: Record<SpokeType, FaqItem[]> = {
  home: [
    {
      question: "How does ClipShrink compress video without uploading it?",
      answer:
        "Unlike legacy cloud compressors that force you to upload 100MB+ files to remote server queues, ClipShrink compiles FFmpeg into client-side WebAssembly (WASM). Your local computer CPU processes the video directly in browser memory with zero upload latency.",
    },
    {
      question: "Does Gmail compress videos automatically when sending?",
      answer:
        "No. Unlike social messaging apps, Gmail does not compress videos. If your video file exceeds 25MB, Gmail rejects the inline attachment and forces it into an external Google Drive link. Compressing your video below 25MB with ClipShrink keeps the file attached directly inside the email body.",
    },
    {
      question: "How long can a 25MB video clip be?",
      answer:
        "At standard 720p HD resolution with optimized 30fps H.264 video and stereo AAC audio, a 25MB video file can comfortably hold between 3 to 7 minutes of crisp video with completely legible text and slides.",
    },
    {
      question: "Can I compress a video for Discord?",
      answer:
        "Yes. Discord raised its free upload limit to 20MB in August 2026. Nitro Basic allows 50MB and full Nitro 500MB. Pick the Discord preset (targets ~18MB) or choose Custom for 8MB or 10MB.",
    },
    {
      question: "How do I compress a video online for free with no watermark?",
      answer:
        "Select your target size limit, drop your MP4, MOV, or WebM video, and download your optimized clip instantly. ClipShrink is 100% free, runs locally on your machine, and never adds watermarks.",
    },
  ],
  "discord-8mb": [
    {
      question: "What is Discord's upload limit for free users?",
      answer:
        "Discord raised the free per-file limit to 20MB in August 2026 (up from 10MB, and 8MB before 2023). Older guides quoting 8MB are out of date. Nitro Basic allows 50MB. Our Discord preset targets ~18MB for safety.",
    },
    {
      question: "Can I still target 8MB or 10MB for Discord?",
      answer:
        "Yes. Choose the Custom tab and enter 8 or 10. This is useful if you want a smaller file that uploads faster on mobile networks.",
    },
    {
      question: "Can I compress iPhone .MOV gaming clips to send on Discord?",
      answer:
        "Yes. ClipShrink converts Apple QuickTime MOV and HEVC container files into Discord-safe H.264 MP4 format with web-optimized faststart headers.",
    },
  ],
  "gmail-25mb": [
    {
      question: "Does Gmail compress videos automatically when sending?",
      answer:
        "No. Gmail rejects files over 25MB and converts them into Google Drive links. Compressing your video to ~22MB with ClipShrink ensures it attaches directly inline.",
    },
    {
      question: "Why does Base64 encoding affect email attachments?",
      answer:
        "Email systems use Base64 encoding, which expands binary files by about 33% in transit. A 24MB raw file can exceed 30MB during sending. ClipShrink targets ~22MB to ensure safe delivery.",
    },
  ],
  whatsapp: [
    {
      question: "What is WhatsApp's video file size limit?",
      answer:
        "WhatsApp enforces a strict 16MB file size ceiling for videos sent as standard media attachments across mobile and WhatsApp Web.",
    },
    {
      question: "Why does WhatsApp Web fail to send certain MP4 files?",
      answer:
        "WhatsApp Web requires videos to use the H.264 codec and AAC audio in an MP4 container. Videos in HEVC or AV1 format fail. ClipShrink standardizes the file so it plays everywhere.",
    },
  ],
  "10mb": [
    {
      question: "Why compress a video to exactly 10MB?",
      answer:
        "10MB is a common upload threshold for job applications, support tickets, and university submission portals.",
    },
  ],
  "email-20mb": [
    {
      question: "What is the standard video attachment limit for email?",
      answer:
        "Mainstream email providers (Outlook, Apple Mail, Yahoo) typically cap attachments between 20MB and 25MB. ClipShrink's email setting targets ~18MB to account for transport encoding.",
    },
  ],
  "outlook-20mb": [
    {
      question: "What is Outlook's maximum file attachment size?",
      answer:
        "Outlook desktop defaults to a 20MB limit for standard email accounts. Compressing to ~18MB guarantees your email sends without bouncing.",
    },
  ],
  "slack-10mb": [
    {
      question: "What is Slack's file size limit for videos?",
      answer:
        "Slack allows files up to 1GB, but keeping clips under 10MB ensures instant buffer-free playback and conserves workspace storage quotas.",
    },
  ],
  "nitro-50mb": [
    {
      question: "What is the upload limit for Discord Nitro Basic?",
      answer:
        "Discord Nitro Basic offers a 50MB upload limit. This preset allows you to retain higher bitrates (1080p 60fps) targeting ~46.5MB.",
    },
  ],
  "25mb-custom": [
    {
      question: "Why compress a video to exactly 25MB?",
      answer:
        "25MB is the universal standard limit for customer support portals (Zendesk) and web contact forms.",
    },
  ],
  "mov-to-discord": [
    {
      question: "Why won't Discord play my iPhone MOV video inline?",
      answer:
        "Apple MOV files recorded with HEVC/H.265 often download as an attachment on Discord rather than playing directly in chat. ClipShrink converts them to universal H.264 MP4 with faststart headers.",
    },
  ],
  "iphone-compress": [
    {
      question:
        "How do I compress a video on iPhone without downloading an app?",
      answer:
        "Open ClipShrink in Safari on iOS, choose your video from Photos, and compress it directly in browser memory without App Store downloads.",
    },
  ],
  "iphone-large-video": [
    {
      question:
        "Why do iPhone videos appear blurry when sent to Android via text?",
      answer:
        "Cellular carriers aggressively compress videos sent over SMS/MMS to under 3.5MB. Compressing to 16MB locally and sending via WhatsApp or email maintains sharp HD quality.",
    },
  ],
  twitter: [
    {
      question: "Why does Twitter compress my uploaded video into low quality?",
      answer:
        "Twitter's server encoder aggressively recompresses high-bitrate files. Pre-optimizing to 720p 30fps H.264 gives the encoder less data to throw away.",
    },
  ],
  "100mb": [
    {
      question: "Why compress a video to under 100MB?",
      answer:
        "100MB is the standard maximum upload limit for corporate intranets and learning management systems like Canvas and Blackboard.",
    },
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Data Privacy & Storage",
    cloud: "Uploaded & stored on remote cloud servers",
    clipshrink: "100% In-Browser RAM (Files never leave device)",
  },
  {
    feature: "Upload Queue Wait Time",
    cloud: "Slow (Must upload 50MB–200MB over network)",
    clipshrink: "0 Seconds (Local CPU processing starts instantly)",
  },
  {
    feature: "Watermarks & Overlays",
    cloud: "Frequent logos or branding on free tiers",
    clipshrink: "100% Clean (Zero watermarks or overlays)",
  },
  {
    feature: "Target Size Precision",
    cloud: "Generic 'low/medium/high' presets",
    clipshrink: "Bitrate calculated from exact target size",
  },
  {
    feature: "Account Registration",
    cloud: "Email signup or daily quota restrictions",
    clipshrink: "Zero signups, no accounts, unlimited free use",
  },
];

export default function SeoContent({ type = "home" }: SeoContentProps) {
  const faqs = FAQ_DATA[type] || FAQ_DATA.home;
  const guide = PLATFORM_GUIDES[type] || PLATFORM_GUIDES.home;

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

      {/* DYNAMIC PLATFORM-SPECIFIC GUIDE */}
      <section aria-labelledby="platform-guide-heading" className="space-y-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Platform Guide & Best Practices
          </div>
          <h2
            id="platform-guide-heading"
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

      {/* 3-Step Guided Workflow */}
      <section aria-labelledby="how-it-works-heading">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Simple 3-Step Workflow
          </div>
          <h2
            id="how-it-works-heading"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Compress a Video Online for Free
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-mono font-bold flex items-center justify-center mb-4">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Select Target Size
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Choose Discord 20MB, WhatsApp 16MB, Gmail 25MB, or enter a custom
              limit. The engine automatically calculates the target bitrate.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-mono font-bold flex items-center justify-center mb-4">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Drop Your File
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Select any MP4, MOV, WebM, or MKV. Processing executes entirely
              inside your browser memory using your local CPU.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-mono font-bold flex items-center justify-center mb-4">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Download Result
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Save your compressed video immediately. 100% free, zero
              watermarks, and zero file retention.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section aria-labelledby="comparison-heading">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            Architectural Comparison
          </div>
          <h2
            id="comparison-heading"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            ClipShrink vs. Cloud Compressors
          </h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-4 px-5 text-slate-600 font-semibold uppercase tracking-wider text-[11px] w-1/3">
                    Capability
                  </th>
                  <th className="py-4 px-5 text-slate-600 font-semibold uppercase tracking-wider text-[11px] w-1/3">
                    Legacy Cloud Compressors
                  </th>
                  <th className="py-4 px-5 text-indigo-700 font-bold uppercase tracking-wider text-[11px] w-1/3 bg-indigo-50/50 border-l border-r border-indigo-100">
                    ClipShrink Local WASM
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

      {/* Feature Highlights Grid */}
      <section aria-labelledby="features-heading">
        <div className="text-center mb-8">
          <h2
            id="features-heading"
            className="text-2xl font-bold text-slate-900 tracking-tight">
            Engineered for Velocity, Privacy, and Precision
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Powered by WebAssembly compiled FFmpeg with H.264 ultrafast
            encoding.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm mb-1">
                100% Client-Side Privacy
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your personal videos never touch remote servers. Everything runs
                strictly in device RAM.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm mb-1">
                Zero Upload Queues
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Start compressing immediately without waiting to upload 100MB+
                over slow connections.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 shrink-0">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm mb-1">
                Dynamic Bitrate Precision
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Bitrates are dynamically calculated from clip duration with
                automatic multi-pass refinement.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm mb-1">
                Universal Device Playback
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Outputs standard H.264 MP4 clips with faststart headers for
                smooth inline chat playback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section aria-labelledby="faq-heading">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to Know
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

      {/* Internal Links Navigation */}
      <section className="border-t border-slate-200 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Platform Presets & Compression Guides
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            14 Specialized Tools
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <Link
            href="/video/compress-for-discord-8mb"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Discord 20MB Compressor →
          </Link>
          <Link
            href="/video/compress-for-gmail-25mb"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Gmail 25MB Attachment →
          </Link>
          <Link
            href="/video/compress-for-whatsapp"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            WhatsApp 16MB Video →
          </Link>
          <Link
            href="/video/compress-video-on-iphone"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Compress Video on iPhone →
          </Link>
          <Link
            href="/video/how-to-send-large-video-from-iphone"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Send Large Video iPhone →
          </Link>
          <Link
            href="/video/compress-video-for-twitter"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Compress for Twitter / X →
          </Link>
          <Link
            href="/video/compress-mp4-to-100mb"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Compress Video to 100MB →
          </Link>
          <Link
            href="/video/compress-mp4-to-10mb"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Compress MP4 to 10MB →
          </Link>
          <Link
            href="/video/compress-video-for-email"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Email Video (20MB) →
          </Link>
          <Link
            href="/video/compress-video-for-outlook"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Outlook 20MB Reducer →
          </Link>
          <Link
            href="/video/compress-video-for-slack"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Slack 10MB Compressor →
          </Link>
          <Link
            href="/video/compress-mov-for-discord"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            iPhone MOV for Discord →
          </Link>
          <Link
            href="/video/compress-mp4-to-50mb"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Compress Video to 50MB →
          </Link>
          <Link
            href="/video/compress-mp4-to-25mb"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Compress Video to 25MB →
          </Link>
        </div>
      </section>
    </div>
  );
}
