# ClipShrink — Local In-Browser Media Suite (Next.js & FFmpeg.wasm)

ClipShrink is a client-side video and audio processing web application built with **Next.js**, **React 19**, **Tailwind CSS**, and **FFmpeg WebAssembly**. It compresses, remuxes, trims, mutes, and extracts audio from MP4, QuickTime MOV, Matroska MKV, and WebM files directly in browser RAM with zero server uploads and zero watermarks.

**Live Application:** [https://clipshrink.com](https://clipshrink.com)

---

## Core Utilities

All tools run locally inside the browser's WebAssembly memory sandbox:

* **[Video Compressor](https://clipshrink.com)** — Target-size video compression for [Discord (8MB, 10MB & 20MB)](https://clipshrink.com/video/compress-for-discord-8mb), [WhatsApp (16MB)](https://clipshrink.com/video/compress-for-whatsapp), [Gmail (25MB)](https://clipshrink.com/video/compress-for-gmail-25mb), [Microsoft Outlook (20MB)](https://clipshrink.com/video/compress-video-for-outlook), [Slack (10MB)](https://clipshrink.com/video/compress-video-for-slack), and [iPhone Safari](https://clipshrink.com/video/compress-video-on-iphone).
* **[Instant Video Converter](https://clipshrink.com/convert)** — Container remuxing and codec conversion including [OBS MKV to MP4](https://clipshrink.com/convert/mkv-to-mp4), [iPhone HEVC to MP4](https://clipshrink.com/convert/hevc-to-mp4), [QuickTime MOV to MP4](https://clipshrink.com/convert/mov-to-mp4), [WebM to MP4](https://clipshrink.com/convert/webm-to-mp4), and [TS to MP4](https://clipshrink.com/convert/ts-to-mp4).
* **[Lossless Video Trimmer](https://clipshrink.com/trim-video)** — Stream-copy video cutting (`-c copy`) for [MP4](https://clipshrink.com/trim-video/trim-mp4), [OBS MKV](https://clipshrink.com/trim-video/cut-mkv), [QuickTime MOV](https://clipshrink.com/trim-video/trim-mov), and [Discord clips](https://clipshrink.com/trim-video/cut-video-for-discord).
* **[Remove Audio from Video](https://clipshrink.com/remove-audio)** — Lossless audio track stripping (`-an -c:v copy`) for [iPhone videos](https://clipshrink.com/remove-audio/iphone-video), [MP4](https://clipshrink.com/remove-audio/mp4), [MOV](https://clipshrink.com/remove-audio/mov), and [Instagram Reels](https://clipshrink.com/remove-audio/instagram-reels).
* **[Audio Extractor](https://clipshrink.com/extract-audio)** — Demuxes and encodes 320kbps / 192kbps MP3 or 16-bit lossless PCM WAV from [MP4](https://clipshrink.com/extract-audio/mp4-to-mp3), [MOV](https://clipshrink.com/extract-audio/mov-to-mp3), [OGG](https://clipshrink.com/extract-audio/ogg-to-mp3), and [WebM](https://clipshrink.com/extract-audio/webm-to-mp3).
* **[Video File Size & Bitrate Calculator](https://clipshrink.com/video-size-calculator)** — Interactive bitrate and duration calculator for 8MB, 10MB, 16MB, 20MB, 25MB, and 50MB upload limits.

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
