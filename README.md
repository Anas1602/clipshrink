# ⚡ In-Browser Video Compressor (Next.js & WebAssembly)

> A production-grade, 100% private client-side video compressor built with **Next.js**, **React 19**, **Tailwind CSS**, and **FFmpeg WebAssembly**. Shrinks MP4, Apple QuickTime MOV, and WebM files directly in the browser with zero server uploads and zero watermarks.

[![Live Production Tool](https://img.shields.io/badge/Live%20Production%20App-ClipShrink.com-6366f1?style=for-the-badge&logo=googlechrome&logoColor=white)](https://clipshrink.com)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![WebAssembly](https://img.shields.io/badge/WebAssembly-FFmpeg-654FF0?style=for-the-badge&logo=webassembly&logoColor=white)](https://ffmpegwasm.netlify.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge)](LICENSE)

---

## 🌐 Live Production Application

The live production utility is freely available with zero signup or queues:  
👉 **[https://clipshrink.com](https://clipshrink.com)**

### Specialized Platform Tools:
* 🎮 **[8MB Video Compressor for Discord](https://clipshrink.com/video/compress-for-discord-8mb)** — Automatic dynamic VBR calculation targeting ~7.2MB to guarantee successful uploads on free Discord accounts.
* 💬 **[WhatsApp 16MB Video Reducer](https://clipshrink.com/video/compress-for-whatsapp)** — Re-encodes clips with web-optimized faststart metadata for direct sending on WhatsApp Web and mobile.
* 📧 **[Gmail 25MB Attachment Compressor](https://clipshrink.com/video/compress-for-gmail-25mb)** — Shrinks presentation clips under 25MB to bypass Google Drive link conversions.
* 💼 **[Compress Video for Outlook (20MB Limit)](https://clipshrink.com/video/compress-video-for-outlook)** — Tailored for Microsoft Exchange attachment constraints with legible text rendering.
* 📱 **[Compress Video on iPhone Free](https://clipshrink.com/video/compress-video-on-iphone)** — In-browser Safari compression for heavy iOS camera roll recordings without installing apps.
* 🐦 **[Compress Video for Twitter / X](https://clipshrink.com/video/compress-video-for-twitter)** — Web-streaming optimization under 25MB and 512MB limits.
* 🍎 **[Convert & Compress iPhone MOV for Discord](https://clipshrink.com/video/compress-mov-for-discord)** — Converts Apple QuickTime HEVC files into web-friendly H.264 MP4 format.

---

## 🏗️ Architecture: Zero-Server Processing

Traditional cloud compressors force users to upload 100MB+ personal video files to remote servers, wait in processing queues, and download watermarked results. 

**ClipShrink operates 100% inside the client's web browser memory sandbox:**

```text
[User Selects Video (.mp4, .mov, .webm)]
                  │
                  ▼
   [Local Browser RAM Memory Sandbox]  ◄─── (0 bytes sent to external cloud servers)
                  │
                  ▼
 [Dynamic Target Bitrate Calculation]  ◄─── Bitrate = (Target MB × 8192) / Duration
                  │
                  ▼
 [FFmpeg WebAssembly Virtual Pipeline] ◄─── Multi-thread CPU re-encoding
                  │
                  ▼
     [Local MP4 Blob Generation]       ◄─── Instant download with '+faststart' atom
```

---

## ✨ Technical Highlights

* **100% Client-Side Privacy:** Video frames are decoded and re-encoded locally in browser memory. Personal gaming clips and work recordings never touch third-party servers.
* **Self-Hosted WASM Core:** Bypasses third-party CDN rate-limiting (`unpkg.com`) by serving WebAssembly binaries directly from local edge-cached storage (`/public/ffmpeg/`).
* **Hardware Heap Safeguards:** Early memory checks prevent WebAssembly heap exhaustion (`Out of Memory`) crashes on iOS Safari and mobile devices.
* **Dynamic VBR Bitrate Calculation:** Automatically calculates the exact video bitrate based on media duration:
  `Video Bitrate (kbps) = ((Target MB × 8192) / Duration) - 96`
* **High-Velocity Encoding Pipeline:** Uses `-preset ultrafast`, `-sws_flags fast_bilinear`, 720p resolution clamping, and 30 FPS frame-rate caps to achieve maximum in-browser performance.

---

## 🛠️ Core FFmpeg WASM Execution Pipeline

```typescript
// Optimized WebAssembly command parameters
await ffmpeg.exec([
  "-i", inputFileName,
  "-b:v", `${videoBitrateK}k`,
  "-maxrate", `${Math.floor(videoBitrateK * 1.12)}k`,
  "-bufsize", `${Math.floor(videoBitrateK * 1.4)}k`,
  "-vf", "scale=-2:min(720\\,ih)", // Clamp resolution to 720p HD max
  "-sws_flags", "fast_bilinear",   // Fast bilinear scaling for 4K downsampling
  "-r", "30",                      // Cap at 30 FPS
  "-c:v", "libx264",
  "-preset", "ultrafast",          // Velocity-tuned software encoder
  "-tune", "fastdecode",
  "-c:a", "aac",
  "-b:a", "96k",                   // Clean stereo audio bandwidth
  "-movflags", "+faststart",       // Streamable MP4 header placement
  "-y", outputFileName,
]);
```

---

## 💻 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/in-browser-video-compressor-wasm.git
cd in-browser-video-compressor-wasm
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup self-hosted WASM binaries
```bash
mkdir -p public/ffmpeg
cp node_modules/@ffmpeg/core/dist/umd/ffmpeg-core.js public/ffmpeg/
cp node_modules/@ffmpeg/core/dist/umd/ffmpeg-core.wasm public/ffmpeg/
```

### 4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🌐 Browser Compatibility

| Browser | Supported | Engine |
| :--- | :---: | :--- |
| **Google Chrome** | ✅ Yes | V8 WebAssembly |
| **Microsoft Edge** | ✅ Yes | Chromium WebAssembly |
| **Mozilla Firefox** | ✅ Yes | SpiderMonkey WASM |
| **Apple Safari (macOS)**| ✅ Yes | JavaScriptCore WASM |
| **Mobile Safari (iOS)** | ✅ Yes | Optimized with 150MB heap limit |

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

Maintained and operated by the **[ClipShrink](https://clipshrink.com)** team.
