import React from "react";
import Link from "next/link";
import {
  Check,
  X,
  ChevronDown,
  RefreshCw,
  Scissors,
  VolumeX,
  Headphones,
  ArrowRight,
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
        text: "WhatsApp Web requires videos to have an H.264 video stream, AAC stereo audio, and a yuv420p color space. Videos recorded in newer HEVC (H.265) or AV1 codecs frequently fail to upload on web sessions. ClipShrink standardizes the container so it plays on every recipient's phone.",
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
      "Modern iPhones record in High Efficiency Video Coding (HEVC / H.265) at high bitrates, causing short clips to rapidly exceed messaging limits.",
    sections: [
      {
        heading: "The iPhone HEVC & 4K Dilemma",
        text: "A 30-second 4K 60fps video recorded on an iPhone 14, 15, or 16 easily exceeds 100MB. When shared to Windows, Android, or web forms, non-Apple devices frequently fail to decode the HEVC codec or reject the file due to size.",
      },
      {
        heading: "Mobile Safari In-Browser WebAssembly",
        text: "Unlike App Store compression apps that demand subscriptions or display full-screen ads, ClipShrink runs entirely inside mobile Safari RAM. The video is transcoded on your iPhone's Apple Silicon chip without uploading a single byte to external servers.",
      },
      {
        heading: "Preventing iOS Memory Crashes",
        text: "iOS Safari enforces strict memory caps on individual browser tabs. ClipShrink includes built-in heap safeguards that prevent tab crashes by capping mobile inputs at 150MB and cleaning virtual filesystem buffers after every run.",
      },
    ],
  },
  "iphone-large-video": {
    title:
      "How to Send Large Videos from iPhone Without Blurry Carrier Compression",
    summary:
      "Cellular carriers heavily compress videos sent over standard SMS/MMS. Shrinking the file locally allows direct sharing over email and messaging apps.",
    sections: [
      {
        heading: "The Carrier SMS Compression Trap",
        text: "When sending videos between iPhone and Android via SMS/MMS, cellular providers crush files down to under 3.5MB, resulting in pixelated, unwatchable clips. Pre-compressing your file under 16MB or 25MB preserves sharp 720p resolution.",
      },
      {
        heading: "Avoiding iCloud Shared Link Friction",
        text: "By default, iOS suggests generating an iCloud link for videos over 25MB. Recipients often wait hours for iCloud links to sync or lack permissions. Compressing the file under 25MB lets you attach the MP4 directly inside Mail or WhatsApp.",
      },
      {
        heading: "Preserving Audio and Frame Rates",
        text: "ClipShrink preserves smooth 30 FPS playback and clear AAC stereo dialogue so your personal clips look and sound clean when received.",
      },
    ],
  },
  "nitro-50mb": {
    title: "Maximizing Quality for Discord Nitro Basic & 50MB Portals",
    summary:
      "A 50MB file budget lets you retain high-bitrate gaming clips, 60fps highlights, and multi-minute screen recordings.",
    sections: [
      {
        heading: "50MB Bitrate Allocation Strategy",
        text: "With a 50MB ceiling, clips under 60 seconds retain high video bitrates with zero macroblocking during fast camera motion. Longer recordings (2 to 5 minutes) stay sharp at 720p HD with clear UI text.",
      },
      {
        heading: "The faststart Header Requirement",
        text: "Discord and web players stream videos inline using HTML5 video tags. Without the faststart flag, viewers must download the entire 50MB file before playback starts. ClipShrink moves the moov atom to the front of the file automatically.",
      },
      {
        heading: "OBS and ShadowPlay Clip Optimization",
        text: "Raw clips exported from OBS Studio or Nvidia ShadowPlay often carry bitrates above 25,000 kbps. ClipShrink re-encodes the stream to ~46.5MB so it never bounces against a strict 50MB limit.",
      },
    ],
  },
  "discord-8mb": {
    title: "Discord Video Upload Limits: 8MB, 10MB, and 20MB Explained",
    summary:
      "Discord raised its free upload limit to 20MB in August 2026, though many servers and mobile users still target classic 8MB or 10MB sizes for instant loading.",
    sections: [
      {
        heading: "8MB vs. 10MB vs. 20MB Free Limits",
        text: "Discord enforced an 8MB limit for years, moved to 10MB in 2024, and raised the free limit to 20MB in August 2026. Our default Discord preset targets ~18MB for maximum quality under the 20MB cap, or you can click 8MB Classic or 10MB above for smaller files.",
      },
      {
        heading: "Exact Duration-Based Bitrate Math",
        text: "To guarantee your video never fails at 99% upload, ClipShrink calculates the exact bitrate from your clip's duration: Bitrate = (Target MB × 8192) / Duration, leaving a safety margin for MP4 container overhead.",
      },
      {
        heading: "Gaming Highlight Compression",
        text: "For fast-paced games (Valorant, CS2, Fortnite, Apex Legends), keeping clips between 20 and 60 seconds allows for clean 720p HD output with stereo game audio.",
      },
    ],
  },
  "gmail-25mb": {
    title: "Sending Video Attachments in Gmail (25MB Hard Limit)",
    summary:
      "Gmail strictly caps email attachments at 25MB. Files exceeding this limit are automatically converted into external Google Drive links.",
    sections: [
      {
        heading: "The Base64 MIME Encoding Overhead",
        text: "Email protocols encode binary attachments into Base64 text during transit, adding overhead to the message envelope. A 24.8MB raw file can trip the ceiling when combined with email headers. ClipShrink targets ~22MB so your attachment always stays inline.",
      },
      {
        heading: "Direct Inline Attachments vs. Drive Links",
        text: "Sending video via Google Drive links introduces permission headaches—recipients often click the link only to see 'Request Access'. Compressing the file under 25MB keeps the MP4 attached directly inside the email.",
      },
      {
        heading: "Business Presentations & Screen Recordings",
        text: "Loom exports, Zoom clips, and slide walkthroughs up to 5–7 minutes compress cleanly below 25MB while keeping spreadsheet numbers, code, and voiceovers sharp.",
      },
    ],
  },
  "email-20mb": {
    title:
      "Standard Email Video Attachment Limits (Apple Mail, Yahoo, Webmail)",
    summary:
      "While Gmail allows 25MB, most standard email providers and corporate servers reject attachments larger than 20MB.",
    sections: [
      {
        heading: "Why 18MB Is the Safe Universal Email Target",
        text: "When you email a video between different providers (for example, from Gmail to Yahoo or iCloud Mail), the receiving server's 20MB cap dictates whether the email bounces. Targeting ~18MB ensures delivery across every inbox.",
      },
      {
        heading: "Private Client-Side Processing for Work Clips",
        text: "Client walkthroughs, bug reports, and personal videos shouldn't be uploaded to third-party cloud servers just to shrink them for email. ClipShrink compresses the file locally in your browser RAM.",
      },
      {
        heading: "Universal H.264 MP4 Output",
        text: "Every compressed file is saved as a standard H.264 MP4 with AAC audio, so recipients can preview the video directly inside Apple Mail, Gmail, and mobile email apps.",
      },
    ],
  },
  "outlook-20mb": {
    title: "Optimizing Video Files for Microsoft Outlook & Exchange (20MB Cap)",
    summary:
      "Microsoft Outlook desktop and Exchange servers enforce a strict 20MB default attachment limit.",
    sections: [
      {
        heading: "Why Outlook Rejects Files Over 20MB",
        text: "Microsoft Exchange and Office 365 environments default to a 20MB message size limit (including MIME overhead). Compressing your video to ~18MB prevents 'Attachment size exceeds the allowable limit' errors.",
      },
      {
        heading: "Maintaining Legible Text in Screen Recordings",
        text: "Workplace videos usually feature PowerPoint slides, Excel sheets, or Teams recordings. ClipShrink maintains 720p resolution so small UI text and numbers remain easy to read.",
      },
      {
        heading: "Zero Software Installation on Work Laptops",
        text: "Because ClipShrink runs inside Chrome, Edge, or Firefox via WebAssembly, employees on locked-down corporate laptops can compress videos without needing IT admin rights to install desktop apps.",
      },
    ],
  },
  "slack-10mb": {
    title: "Optimizing Video for Slack Channels and Direct Messages",
    summary:
      "Keeping bug demos and screen recordings under 10MB ensures instant upload and zero buffering for teammates in Slack.",
    sections: [
      {
        heading: "Instant Inline Playback in Channels",
        text: "Large 100MB screen recordings take ages to transcode on Slack's servers and stall on mobile connections. A compact 10MB MP4 uploads in seconds and plays immediately in the thread.",
      },
      {
        heading: "Saving Workspace Storage Quotas",
        text: "Free and Pro Slack workspaces enforce storage limits across the team. Shrinking daily standup clips and QA recordings to 10MB keeps older files from being auto-deleted.",
      },
      {
        heading: "Ideal for QA Bug Reports & PR Previews",
        text: "10MB comfortably holds 45 to 90 seconds of 720p screen capture—plenty of time to demonstrate a UI feature for a GitHub pull request or Jira ticket.",
      },
    ],
  },
  "10mb": {
    title: "Compressing Video to Under 10MB",
    summary:
      "10MB is one of the most common upload limits across job portals, support ticket forms, and chat platforms.",
    sections: [
      {
        heading: "Exact Bitrate Calculation Under 10MB",
        text: "To keep your output safely below 10.0MB, ClipShrink targets ~9.0MB using the formula (9.0 × 8192) / Duration, leaving a 10% buffer for audio and container metadata.",
      },
      {
        heading: "Automatic Second-Pass Refinement",
        text: "If a high-motion clip slightly overshoots 10MB on the first encode, ClipShrink automatically steps down the video bitrate by 15% and re-encodes so the final file lands under the cap.",
      },
      {
        heading: "Portals, Support Tickets & Forums",
        text: "Customer support widgets (Zendesk, Intercom), gaming forums, and application portals frequently reject videos over 10MB. Pre-compressing guarantees a clean upload on the first try.",
      },
    ],
  },
  "25mb-custom": {
    title: "Compressing Video Under 25MB for Web Portals & Email",
    summary:
      "25MB is the standard upload ceiling for Gmail, Zendesk support tickets, and online submission forms.",
    sections: [
      {
        heading: "Universal Web Form Compatibility",
        text: "Most web servers and cloud form builders cap file uploads at 25MB. Shrinking your MP4 or MOV to ~22MB ensures your video passes server validation without timing out.",
      },
      {
        heading: "How Much Video Fits in 25MB?",
        text: "At 720p HD (30 FPS), 25MB holds roughly 2 to 3 minutes of high-motion camera footage, or 5 to 8 minutes of screen recording and presentation slides.",
      },
      {
        heading: "Local CPU Encoding",
        text: "Instead of waiting to upload a 200MB source file to a remote cloud server, your browser processes the video directly in local RAM and outputs a ready-to-upload MP4.",
      },
    ],
  },
  "mov-to-discord": {
    title: "Converting and Compressing iPhone MOV Files for Discord",
    summary:
      "Fix the bug where iPhone .MOV files appear as downloadable attachments instead of playing inline in Discord chat.",
    sections: [
      {
        heading: "Why Discord Won't Embed iPhone MOV Videos",
        text: "iPhones record .MOV files using the HEVC (H.265) codec and 10-bit HDR color. Discord's web and desktop clients often fail to embed these containers, forcing friends to download the file externally. ClipShrink converts them to standard H.264 MP4.",
      },
      {
        heading: "Faststart Metadata for Instant Chat Playback",
        text: "ClipShrink writes the MP4 moov atom at the start of the file (+faststart) so your video plays inline in Discord the moment you press Enter.",
      },
      {
        heading: "8-Bit Color Space Normalization",
        text: "Apple Dolby Vision and wide-gamut P3 recordings often look washed out or overexposed on Windows monitors. We convert the pixel format to standard yuv420p for consistent colors.",
      },
    ],
  },
  twitter: {
    title: "Optimizing Video for Twitter / X Uploads",
    summary:
      "Avoid upload stalls and aggressive server-side pixelation by pre-formatting your video to clean 720p H.264 MP4.",
    sections: [
      {
        heading: "Preventing Twitter's Blurry Re-Compression",
        text: "When you upload an oversized 4K or high-bitrate MOV file to X, their backend encoder crushes the bitrate aggressively, causing blocky artifacts in the first few seconds. Uploading a clean 720p 30fps H.264 file produces a noticeably sharper post.",
      },
      {
        heading: "Eliminating Upload Processing Stalls",
        text: "Videos stuck at 'Processing 99%' on Twitter Web are usually caused by non-standard audio sample rates or HEVC containers. ClipShrink outputs compliant H.264 + AAC stereo MP4.",
      },
      {
        heading: "Fast Mobile Feed Playback",
        text: "Keeping clips around 22MB with faststart headers ensures smooth autoplay as users scroll through their timeline on iOS and Android.",
      },
    ],
  },
  "100mb": {
    title: "Compressing Large Video Files Under 100MB",
    summary:
      "Shrink long-form lectures, raw camera clips, and webinar recordings under 100MB for LMS portals and cloud forms.",
    sections: [
      {
        heading: "High Bitrate Retention for Long Videos",
        text: "A 100MB budget easily accommodates 10 to 20 minutes of 720p HD video, making it ideal for university assignments, training modules, and interview recordings.",
      },
      {
        heading: "Canvas, Blackboard, and Moodle Submissions",
        text: "University learning management systems and government portals frequently enforce a strict 100MB upload limit for student and applicant video submissions.",
      },
      {
        heading: "Clear Stereo Audio Preservation",
        text: "At 100MB, ClipShrink allocates full stereo AAC audio bandwidth so spoken lectures, interviews, and music remain crisp.",
      },
    ],
  },
  home: {
    title: "How In-Browser WebAssembly Video Compression Works",
    summary:
      "ClipShrink runs FFmpeg directly inside your web browser, so you never have to upload personal or work videos to third-party cloud servers.",
    sections: [
      {
        heading: "Local CPU Processing (Zero Uploads)",
        text: "Traditional online compressors upload your video to remote servers, wait in a queue, and make you download the result. ClipShrink loads a compiled WebAssembly engine into your browser tab and compresses the file directly on your device.",
      },
      {
        heading: "Exact Target-Size Bitrate Math",
        text: "Instead of guessing with vague 'Low / Medium / High' quality sliders, ClipShrink reads your video's exact duration in seconds and calculates the precise video and audio bitrate needed to land safely below your chosen MB limit.",
      },
      {
        heading: "Universal H.264 MP4 Output",
        text: "Whether you drop an iPhone .MOV, an OBS Studio .MKV, or a screen-recorded .WebM, the compressor outputs a universally compatible H.264 MP4 with faststart headers that plays inline everywhere.",
      },
    ],
  },
};

const FAQ_DATA: Record<SpokeType, FaqItem[]> = {
  home: [
    {
      question: "How does ClipShrink compress video without uploading it?",
      answer:
        "ClipShrink runs a WebAssembly (WASM) build of FFmpeg directly inside your web browser. When you select a video, it stays in your device's local RAM, is encoded by your own CPU, and is saved back to your device—zero bytes are ever sent to an external server.",
    },
    {
      question: "Does Gmail compress videos automatically when sending?",
      answer:
        "No. Gmail does not compress video attachments. If your file exceeds 25MB, Gmail refuses to attach it inline and forces you to upload it to Google Drive instead. Compressing your video under 25MB (~22MB safe target) lets you attach the MP4 directly inside the email.",
    },
    {
      question: "How long can a 10MB, 25MB, or 50MB video clip be?",
      answer:
        "At 720p HD (30fps), a 10MB file holds about 45–90 seconds of video, a 25MB file holds 2–5 minutes of video, and a 50MB file holds 5–10 minutes. Screen recordings with static slides can be even longer because they require less bitrate than fast camera motion.",
    },
    {
      question: "What is Discord's video upload limit in 2026?",
      answer:
        "Discord raised its free file upload limit to 20MB in August 2026 (up from the older 10MB and classic 8MB limits). Nitro Basic allows 50MB, and full Nitro allows 500MB. You can use our 20MB Discord preset or click '8MB Classic' / '10MB' for smaller files.",
    },
    {
      question: "Does ClipShrink add a watermark or require an account?",
      answer:
        "Never. Because your own device does the processing, we have no cloud GPU server bills to pay. All exports are 100% free, have zero watermarks, and require no signup.",
    },
  ],
  "discord-8mb": [
    {
      question: "Is Discord's free upload limit 8MB, 10MB, or 20MB?",
      answer:
        "Discord raised the free upload limit to 20MB in August 2026 (it was 8MB until 2023, and 10MB until mid-2026). However, many users still prefer compressing clips to 8MB or 10MB so they upload faster and buffer instantly on mobile data. Our tool supports 20MB, 10MB, and 8MB with one click.",
    },
    {
      question:
        "Why does Discord say 'Your files are too powerful' when my file is 20.0MB?",
      answer:
        "Operating systems often display file sizes in decimal megabytes (1 MB = 1,000,000 bytes) rather than binary mebibytes (1 MiB = 1,048,576 bytes). ClipShrink targets ~18MB on the 20MB preset (and ~7.2MB on the 8MB target) so your upload never gets rejected at the boundary.",
    },
    {
      question: "Can I compress iPhone .MOV or OBS .MKV clips for Discord?",
      answer:
        "Yes. Drop any .MOV, .MKV, or .WebM file into the compressor and it will automatically convert and shrink the clip into a Discord-compatible H.264 .MP4 file that embeds inline in chat.",
    },
  ],
  "gmail-25mb": [
    {
      question: "Does Gmail compress videos automatically when sending?",
      answer:
        "No. Gmail rejects direct attachments over 25MB and forces them into Google Drive links. Compressing your video to ~22MB with ClipShrink keeps the video attached directly inside the email message.",
    },
    {
      question: "Why did Gmail reject my 24MB video attachment?",
      answer:
        "Email attachments are converted into Base64 text (MIME encoding) when sent, which adds roughly 33% overhead to the raw file size. A 24MB video can exceed 25MB once encoded into the email body. Our Gmail preset targets ~22MB to leave safe headroom.",
    },
    {
      question: "How long can a 25MB video be for Gmail?",
      answer:
        "At 720p HD resolution, a 25MB MP4 comfortably holds 2 to 4 minutes of standard camera footage, or 5 to 8 minutes of screen recording and presentation slides.",
    },
  ],
  whatsapp: [
    {
      question: "What is WhatsApp's video file size limit?",
      answer:
        "WhatsApp enforces a 16MB limit for videos sent as standard media attachments on WhatsApp Web and mobile. Our WhatsApp preset targets ~14.2MB so your clip sends cleanly every time.",
    },
    {
      question:
        "Why does WhatsApp Web say '1 video you tried adding is not supported'?",
      answer:
        "WhatsApp Web strictly requires an MP4 container with H.264 video (yuv420p) and AAC audio. Videos recorded in HEVC (H.265), MKV, or WebM are rejected. ClipShrink converts and compresses your file into the exact H.264 MP4 format WhatsApp expects.",
    },
    {
      question: "How long of a video can I send in 16MB on WhatsApp?",
      answer:
        "At 720p HD, 16MB holds roughly 60 to 120 seconds of clear video with stereo audio.",
    },
  ],
  "10mb": [
    {
      question: "How do I compress an MP4 video to under 10MB?",
      answer:
        "Drop your video into the box above with the 10MB target selected. ClipShrink reads the video duration and encodes it to ~9.0MB in your browser so it stays safely under the 10MB cap.",
    },
    {
      question: "How long can a 10MB video clip be?",
      answer:
        "At 720p HD (30fps), a 10MB video can be 45 to 90 seconds long for regular camera footage, or up to 3 minutes for a low-motion screen recording.",
    },
    {
      question: "Will compressing a 100MB video to 10MB make it blurry?",
      answer:
        "For clips under 90 seconds, 10MB provides plenty of bitrate (~900 to 1,500 kbps) for sharp 720p HD video. For very long videos (5+ minutes), ClipShrink automatically steps down resolution to 480p so frames stay smooth instead of pixelated.",
    },
  ],
  "email-20mb": [
    {
      question: "What is the maximum video size I can send in an email?",
      answer:
        "Most email providers (Apple Mail, Yahoo, Outlook, and corporate webmail) cap attachments at 20MB, while Gmail allows 25MB. Compressing your video under 20MB (~18MB target) guarantees it can be sent and received across any email service.",
    },
    {
      question:
        "How do I email a video from my phone or computer without a cloud link?",
      answer:
        "Select your video above, click 'Compress Video Under 20MB', and download the resulting MP4. Because the file is under 20MB, your email app will attach it directly instead of prompting for iCloud, OneDrive, or Google Drive.",
    },
    {
      question: "What video format is best for email attachments?",
      answer:
        "H.264 MP4 is the only video format supported natively by Windows, Mac, iPhone, and Android email clients. ClipShrink automatically outputs standard H.264 MP4.",
    },
  ],
  "outlook-20mb": [
    {
      question: "What is Microsoft Outlook's attachment size limit?",
      answer:
        "Microsoft Outlook desktop and Exchange servers enforce a 20MB default limit for email attachments. Our Outlook preset targets ~18MB to account for MIME transport overhead.",
    },
    {
      question:
        "Is it safe to compress confidential work videos on ClipShrink?",
      answer:
        "Yes. Unlike cloud compressors that upload your files to external servers, ClipShrink runs 100% locally inside your browser tab using WebAssembly. Your work recordings never leave your computer.",
    },
    {
      question:
        "Why won't my .MOV or .WebM recording play for Outlook recipients?",
      answer:
        "Windows colleagues using Outlook often cannot open Apple QuickTime (.MOV) or browser .WebM files without extra codecs. ClipShrink converts the file into a universal H.264 .MP4 while shrinking it under 20MB.",
    },
  ],
  "slack-10mb": [
    {
      question: "Why compress videos to 10MB before posting in Slack?",
      answer:
        "While Slack allows large file uploads, heavy 100MB+ screen recordings take a long time to upload, stall on Slack's server transcoder, and eat into workspace storage quotas. A 10MB MP4 uploads in 2 seconds and plays immediately.",
    },
    {
      question: "Does Slack compress videos or images automatically?",
      answer:
        "Slack re-encodes uploaded videos on its servers for inline previewing, which often causes a long delay before teammates can watch the clip. Uploading an already-optimized 720p H.264 MP4 under 10MB makes playback nearly instant.",
    },
    {
      question: "Are internal bug demos kept private when using ClipShrink?",
      answer:
        "Yes. All video compression happens locally in your browser's memory sandbox. Nothing is uploaded to any external server.",
    },
  ],
  "nitro-50mb": [
    {
      question: "What is the file upload limit for Discord Nitro Basic?",
      answer:
        "Discord Nitro Basic provides a 50MB file upload limit (compared to 20MB on free accounts and 500MB on full Nitro). Our 50MB preset targets ~46.5MB so your clip uploads reliably.",
    },
    {
      question: "How long is a 50MB video at 720p HD?",
      answer:
        "A 50MB MP4 holds 4 to 8 minutes of high-quality 720p camera or gameplay footage, or up to 15 minutes of screen recordings and slides.",
    },
    {
      question:
        "Can I use the 50MB preset for job portals and university forms?",
      answer:
        "Yes. Many online application systems, portfolio submission forms, and government portals enforce a 50MB file limit. The output is a standard, watermark-free MP4.",
    },
  ],
  "25mb-custom": [
    {
      question: "How long is a 25MB video file?",
      answer:
        "At 720p HD (30fps), a 25MB MP4 video can be 2 to 4 minutes long for regular camera video, or 5 to 8 minutes long for screen recordings and presentations.",
    },
    {
      question: "Why does my 25MB compressor target ~22MB?",
      answer:
        "Many platforms (like Gmail, Zendesk, and web portals) reject files that are 24.9MB due to binary vs. decimal megabyte differences or Base64 upload overhead. Targeting ~22MB guarantees your file passes every 25MB check.",
    },
    {
      question: "Can I shrink a 200MB or 300MB video down to 25MB?",
      answer:
        "Yes. ClipShrink accepts source files up to 400MB on desktop browsers and calculates the exact bitrate reduction needed to bring the file under 25MB.",
    },
  ],
  "mov-to-discord": [
    {
      question: "Why won't Discord play my iPhone MOV video in chat?",
      answer:
        "iPhones record .MOV videos using the HEVC (H.265) codec. Discord often fails to embed HEVC .MOV files, showing them as a downloadable file link instead. ClipShrink converts your .MOV into a standard H.264 .MP4 so it plays inline in chat.",
    },
    {
      question: "Can I choose between 20MB and 8MB for my MOV file?",
      answer:
        "Yes. The default Discord preset targets ~18MB (for Discord's 20MB free limit), or you can click '8MB Classic' or '10MB' right above the dropzone for a smaller file.",
    },
    {
      question: "Why do my iPhone HDR videos look washed out on Discord PC?",
      answer:
        "iPhone Dolby Vision / 10-bit HDR videos look overexposed on non-HDR monitors. ClipShrink converts the pixel format to standard 8-bit yuv420p so colors look normal on every screen.",
    },
  ],
  "iphone-compress": [
    {
      question:
        "How do I compress a video on iPhone without downloading an app?",
      answer:
        "Open this page in Safari on your iPhone, tap 'Choose Video File', select the clip from your Photos library, and tap Compress. The video is shrunk directly inside Safari memory—no App Store download or subscription needed.",
    },
    {
      question: "Where does the compressed video save on my iPhone?",
      answer:
        "When you tap 'Download Video', Safari saves the MP4 to your iPhone Downloads folder (accessible via the blue arrow icon in Safari's address bar or the Files app), where you can save it to Photos or share it directly.",
    },
    {
      question: "Does compressing on iPhone convert MOV to MP4?",
      answer:
        "Yes. ClipShrink converts Apple's .MOV container into a universally compatible H.264 .MP4 file while reducing its file size.",
    },
  ],
  "iphone-large-video": [
    {
      question:
        "Why do iPhone videos look blurry when sent to Android via text?",
      answer:
        "Standard SMS/MMS text messages crush video attachments down to under 3.5MB, turning HD clips into tiny, pixelated squares. Compressing your video to 16MB or 25MB here and sending it via WhatsApp, email, or RCS keeps it in crisp 720p HD.",
    },
    {
      question: "How do I send a 20-minute or large video from iPhone?",
      answer:
        "For clips up to 150MB on mobile Safari, select the 16MB (WhatsApp) or 25MB (Gmail/Email) preset above to shrink the file so it attaches directly without waiting for an iCloud Drive link to sync.",
    },
    {
      question: "Do my personal iPhone videos get uploaded to a server?",
      answer:
        "Never. Your video stays 100% inside your iPhone's Safari memory and is processed locally by your phone's processor.",
    },
  ],
  twitter: [
    {
      question: "Why does Twitter / X make my uploaded video look blurry?",
      answer:
        "When you upload a massive 4K or high-bitrate file, X's backend encoder aggressively crushes the bitrate and uses slow multi-bitrate adaptive streaming, causing blurry playback for the first several seconds. Uploading a clean 720p 30fps H.264 MP4 avoids heavy re-compression.",
    },
    {
      question: "Why is my video upload stuck at 99% on Twitter / X?",
      answer:
        "Twitter's web uploader frequently stalls on Apple HEVC (.MOV) files, variable frame rate recordings, or non-AAC audio tracks. ClipShrink converts your video to a compliant 30fps H.264 MP4 with stereo AAC audio.",
    },
    {
      question: "Is there a watermark on videos compressed for Twitter?",
      answer:
        "No. ClipShrink never adds watermarks or branding overlays to your videos.",
    },
  ],
  "100mb": [
    {
      question: "Why compress a video to under 100MB?",
      answer:
        "100MB is the standard upload ceiling for university portals (Canvas, Blackboard, Moodle), corporate intranets, and free cloud hosting tiers.",
    },
    {
      question: "How long of a video fits in 100MB?",
      answer:
        "At 720p HD, 100MB holds 10 to 20 minutes of camera footage, or 25+ minutes of lecture slides and screen recordings.",
    },
    {
      question: "What is the maximum source file size ClipShrink accepts?",
      answer:
        "Desktop browsers (Chrome, Edge, Firefox) support source files up to 400MB in local WebAssembly memory, while mobile browsers support up to 150MB.",
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
    clipshrink: "0 Seconds (Local CPU processing starts immediately)",
  },
  {
    feature: "Watermarks & Overlays",
    cloud: "Logos or paywalls on free tiers",
    clipshrink: "100% Clean (Zero watermarks or overlays)",
  },
  {
    feature: "Target Size Precision",
    cloud: "Generic 'Low / Medium / High' sliders",
    clipshrink: "Exact bitrate calculated from target MB & duration",
  },
  {
    feature: "Account Registration",
    cloud: "Email signup or daily file count limits",
    clipshrink: "No signup, no accounts, unlimited free use",
  },
];

const SUITE_TOOLS = [
  {
    title: "Instant Video Converter",
    desc: "Remux OBS MKV, iPhone HEVC, MOV, and WebM to universal H.264 MP4 in browser RAM.",
    href: "/convert",
    cta: "Open Video Converter",
    icon: RefreshCw,
  },
  {
    title: "Lossless Video Trimmer",
    desc: "Cut intro and outro dead air from MP4, MOV, and MKV clips without re-encoding or watermarks.",
    href: "/trim-video",
    cta: "Open Video Trimmer",
    icon: Scissors,
  },
  {
    title: "Remove Audio from Video",
    desc: "Strip audio tracks and background noise from iPhone MOV and MP4 clips in 0.1 seconds.",
    href: "/remove-audio",
    cta: "Open Video Muter",
    icon: VolumeX,
  },
  {
    title: "Extract Audio (MP3 / WAV)",
    desc: "Rip 320kbps MP3 or uncompressed 16-bit PCM WAV audio tracks from any video file.",
    href: "/extract-audio",
    cta: "Open Audio Extractor",
    icon: Headphones,
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

      {/* Dynamic Platform-Specific Guide */}
      <section aria-labelledby="platform-guide-heading" className="space-y-6">
        <div className="text-center mb-8">
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

      {/* 3-Step Workflow (Unified Horizontal Strip for Visual Variety) */}
      <section aria-labelledby="how-it-works-heading">
        <div className="text-center mb-8">
          <h2
            id="how-it-works-heading"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Compress a Video Online for Free
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Three steps from raw recording to a ready-to-share MP4.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 overflow-hidden">
          <div className="p-6">
            <div className="text-xs font-mono font-bold text-indigo-600 mb-2">
              STEP 01
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">
              Pick Your Size Limit
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Select Discord (20MB or 8MB), WhatsApp (16MB), Gmail (25MB), or
              enter any custom MB target.
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
              Choose any MP4, MOV, MKV, or WebM clip. Our local WebAssembly
              engine calculates the exact bitrate and encodes in browser RAM.
            </p>
          </div>

          <div className="p-6">
            <div className="text-xs font-mono font-bold text-indigo-600 mb-2">
              STEP 03
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">
              Download Clean MP4
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Save your compressed H.264 MP4 immediately with zero watermarks
              and zero server file retention.
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
            ClipShrink vs. Cloud Video Compressors
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Why compressing videos locally in your browser beats uploading files
            to remote server queues.
          </p>
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
                    Cloud Upload Compressors
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

      {/* Cross-Hub Internal Link Suite */}
      <section aria-labelledby="suite-heading">
        <div className="text-center mb-8">
          <h2
            id="suite-heading"
            className="text-2xl font-bold text-slate-900 tracking-tight">
            More Local Video & Audio Utilities
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Every tool runs 100% locally in your browser with zero server
            uploads.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SUITE_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-indigo-300 p-5 rounded-2xl shadow-xs transition-all group flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors mb-1">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">
                    {tool.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600">
                    {tool.cta}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
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

      {/* Internal Links Navigation */}
      <section className="border-t border-slate-200 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Platform Presets & Compression Guides
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            14 Specialized Presets
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <Link
            href="/video/compress-for-discord-8mb"
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors shadow-xs">
            Discord 8MB / 20MB →
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
