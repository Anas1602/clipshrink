# ClipShrink — Local In-Browser Media Suite (Next.js & FFmpeg.wasm)

ClipShrink is a client-side video and audio processing web application built with **Next.js**, **React 19**, **Tailwind CSS**, and **FFmpeg WebAssembly**. It compresses, remuxes, trims, mutes, and extracts audio from MP4, QuickTime MOV, Matroska MKV, and WebM files directly in browser RAM with zero server uploads and zero watermarks.

**Live Application:** [https://clipshrink.com](https://clipshrink.com)

---

## Core Utilities

All tools run locally inside the browser's WebAssembly memory sandbox:

- **[Video Compressor](https://clipshrink.com)** — Target-size video compression for [Discord (8MB, 10MB & 20MB)](https://clipshrink.com/video/compress-for-discord-8mb), [WhatsApp (16MB)](https://clipshrink.com/video/compress-for-whatsapp), [Gmail (25MB)](https://clipshrink.com/video/compress-for-gmail-25mb), [Microsoft Outlook (20MB)](https://clipshrink.com/video/compress-video-for-outlook), [Slack (10MB)](https://clipshrink.com/video/compress-video-for-slack), and [iPhone Safari](https://clipshrink.com/video/compress-video-on-iphone).
- **[Instant Video Converter](https://clipshrink.com/convert)** — Container remuxing and codec conversion including [OBS MKV to MP4](https://clipshrink.com/convert/mkv-to-mp4), [iPhone HEVC to MP4](https://clipshrink.com/convert/hevc-to-mp4), [QuickTime MOV to MP4](https://clipshrink.com/convert/mov-to-mp4), [WebM to MP4](https://clipshrink.com/convert/webm-to-mp4), and [TS to MP4](https://clipshrink.com/convert/ts-to-mp4).
- **[Lossless Video Trimmer](https://clipshrink.com/trim-video)** — Stream-copy video cutting (`-c copy`) for [MP4](https://clipshrink.com/trim-video/trim-mp4), [OBS MKV](https://clipshrink.com/trim-video/cut-mkv), [QuickTime MOV](https://clipshrink.com/trim-video/trim-mov), and [Discord clips](https://clipshrink.com/trim-video/cut-video-for-discord).
- **[Remove Audio from Video](https://clipshrink.com/remove-audio)** — Lossless audio track stripping (`-an -c:v copy`) for [iPhone videos](https://clipshrink.com/remove-audio/iphone-video), [MP4](https://clipshrink.com/remove-audio/mp4), [MOV](https://clipshrink.com/remove-audio/mov), and [Instagram Reels](https://clipshrink.com/remove-audio/instagram-reels).
- **[Audio Extractor](https://clipshrink.com/extract-audio)** — Demuxes and encodes 320kbps / 192kbps MP3 or 16-bit lossless PCM WAV from [MP4](https://clipshrink.com/extract-audio/mp4-to-mp3), [MOV](https://clipshrink.com/extract-audio/mov-to-mp3), [OGG](https://clipshrink.com/extract-audio/ogg-to-mp3), and [WebM](https://clipshrink.com/extract-audio/webm-to-mp3).
- **[Video File Size & Bitrate Calculator](https://clipshrink.com/video-size-calculator)** — Interactive bitrate and duration calculator for 8MB, 10MB, 16MB, 20MB, 25MB, and 50MB upload limits.

---

## Architecture & Engineering Notes

```text
[Local File Input (.mp4, .mov, .mkv, .webm)]
                     │
                     ▼
   [Browser Memory Sandbox (Virtual FS)]  ──► 0 bytes sent over network
                     │
                     ▼
       [FFmpeg Header Probe (lib/probeMedia.ts)]
       ├── Reads true container duration (fixes WebM Infinity & HEVC probe failures)
       ├── Detects video codec & pixel format (8-bit yuv420p vs 10-bit HDR)
       └── Plans execution: Lossless Stream-Copy (-c copy) vs H.264 Transcode
                     │
                     ▼
      [WebAssembly Execution Pipeline]
       ├── Multi-Threaded Core (/ffmpeg-mt/) when crossOriginIsolated is available
       └── Single-Threaded Fallback (/ffmpeg/) on iOS Safari & restricted contexts
                     │
                     ▼
    [Local Blob URL + Inline Preview Player] ──► Instant download (+faststart)
```

### Key Technical Decisions

1. **Reliable Media Probing (`lib/probeMedia.ts`):** Relying on an HTML `<video>` element to read metadata fails on Windows Chrome when a user drops an iPhone HEVC `.mov` file, and reports `Infinity` duration on `MediaRecorder` `.webm` captures. ClipShrink probes the container header directly via FFmpeg's log output to extract exact duration, video codec, pixel format (`yuv420p` vs `yuv420p10le`), and audio codec before deciding whether to stream-copy or transcode.
2. **Smart Remux vs. Transcode Planning:** Copying an HEVC or VP9 stream into an `.mp4` wrapper (`-c copy`) succeeds at the container level but produces a file that still fails in Windows Media Player, Discord, or WhatsApp. ClipShrink only uses `-c copy` when the video stream is verified 8-bit `h264`, transcoding audio-only (`-c:v copy -c:a aac`) when PCM/Opus audio is detected, and falling back to `libx264` when video transcoding is required.
3. **Target-Size Bitrate Budgeting:** Rather than using arbitrary CRF values that can overshoot platform upload ceilings, the compressor calculates a target bitrate budget from the probed duration (`(targetMB * 8192) / durationSec`), reserves audio bandwidth, and automatically runs a second pass at `0.85x` bitrate if high-motion footage exceeds the byte ceiling.
4. **Self-Hosted WASM Cores:** Both single-threaded (`/public/ffmpeg/`) and multi-threaded (`/public/ffmpeg-mt/`) WebAssembly binaries are served from same-origin static storage to avoid third-party CDN failures and CORS worker restrictions.

---

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/Anas1602/clipshrink.git
cd clipshrink
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Browser Support

| Browser                  | Supported | Execution Mode                            |
| :----------------------- | :-------- | :---------------------------------------- |
| **Google Chrome / Edge** | Yes       | Multi-threaded / Single-threaded WASM     |
| **Mozilla Firefox**      | Yes       | Multi-threaded / Single-threaded WASM     |
| **Apple Safari (macOS)** | Yes       | JavaScriptCore WASM                       |
| **Mobile Safari (iOS)**  | Yes       | Single-threaded WASM (150MB memory guard) |

---

## License

Distributed under the MIT License.
