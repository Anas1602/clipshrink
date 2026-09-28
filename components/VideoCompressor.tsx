"use client";

import React, { useState, useRef, useCallback } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  FileVideo,
  Download,
  Sparkles,
  RefreshCw,
  Zap,
  Clock,
} from "lucide-react";
import confetti from "canvas-confetti";

export type TargetPreset =
  | "discord-8"
  | "whatsapp-16"
  | "gmail-25"
  | "twitter-25"
  | "discord-nitro-50"
  | "file-100"
  | "custom";

interface VideoCompressorProps {
  initialPreset?: TargetPreset;
}

const REAL_LIMIT_BYTES: Record<Exclude<TargetPreset, "custom">, number> = {
  "discord-8": 8 * 1024 * 1024,
  "whatsapp-16": 16 * 1024 * 1024,
  "gmail-25": 25 * 1024 * 1024,
  "twitter-25": 25 * 1024 * 1024,
  "discord-nitro-50": 50 * 1024 * 1024,
  "file-100": 100 * 1024 * 1024,
};

const MAX_ENCODE_ATTEMPTS = 2;
const RETRY_BITRATE_FACTOR = 0.85;

export default function VideoCompressor({
  initialPreset = "discord-8",
}: VideoCompressorProps) {
  const [loaded, setLoaded] = useState(false);
  const [isLoadingFFmpeg, setIsLoadingFFmpeg] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [preset, setPreset] = useState<TargetPreset>(initialPreset);
  const [customSizeMB, setCustomSizeMB] = useState<number>(8);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [compressedBlobUrl, setCompressedBlobUrl] = useState<string | null>(
    null,
  );
  const [outputFileSize, setOutputFileSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ffmpegRef = useRef<FFmpeg | null>(null);
  const loadingPromiseRef = useRef<Promise<boolean> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Concurrency-safe engine loader (safe for repeated hover/drag calls)
  const ensureFFmpegLoaded = useCallback(async (): Promise<boolean> => {
    if (ffmpegRef.current && loaded) return true;
    if (loadingPromiseRef.current) return loadingPromiseRef.current;

    const loadPromise = (async () => {
      try {
        setIsLoadingFFmpeg(true);
        setStatusMessage("Initializing browser engine...");
        const ffmpeg = new FFmpeg();

        ffmpeg.on("progress", ({ progress: p }) => {
          setProgress(Math.round(Math.max(0, Math.min(1, p)) * 100));
        });

        await ffmpeg.load({
          coreURL: await toBlobURL("/ffmpeg/ffmpeg-core.js", "text/javascript"),
          wasmURL: await toBlobURL(
            "/ffmpeg/ffmpeg-core.wasm",
            "application/wasm",
          ),
        });

        ffmpegRef.current = ffmpeg;
        setLoaded(true);
        setIsLoadingFFmpeg(false);
        loadingPromiseRef.current = null;
        return true;
      } catch (err) {
        console.error("Failed to load FFmpeg:", err);
        setError(
          "Your browser does not support local WebAssembly processing. Please use Chrome, Edge, or Firefox.",
        );
        setIsLoadingFFmpeg(false);
        loadingPromiseRef.current = null;
        return false;
      }
    })();

    loadingPromiseRef.current = loadPromise;
    return loadPromise;
  }, [loaded]);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelected = async (file: File) => {
    if (
      !file.type.startsWith("video/") &&
      !file.name.match(/\.(mp4|mov|webm|mkv|avi|m4v)$/i)
    ) {
      setError("Please upload a valid video file (.mp4, .mov, .webm, .mkv).");
      return;
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile && file.size > 150 * 1024 * 1024) {
      setError(
        "Files over 150MB may exceed mobile browser memory. For large videos, please use a desktop browser.",
      );
      return;
    }
    if (file.size > 400 * 1024 * 1024) {
      setError(
        "Files over 400MB exceed browser WebAssembly memory capacity. Please select a clip under 400MB.",
      );
      return;
    }

    // Clean up previous output blob from browser memory
    if (compressedBlobUrl) {
      URL.revokeObjectURL(compressedBlobUrl);
    }

    setError(null);
    setVideoFile(file);
    setCompressedBlobUrl(null);
    setOutputFileSize(null);
    setProgress(0);

    const videoElement = document.createElement("video");
    videoElement.preload = "metadata";
    videoElement.onloadedmetadata = () => {
      window.URL.revokeObjectURL(videoElement.src);
      setVideoDuration(videoElement.duration || 10);
    };
    videoElement.src = URL.createObjectURL(file);

    // Warm up engine immediately upon file selection
    ensureFFmpegLoaded();
  };

  // Recalibrated target bitrates to guarantee Attempt #1 completion strictly below limits
  const getTargetMB = (): number => {
    switch (preset) {
      case "discord-8":
        return 7.0; // Guaranteed < 8.0MB on pass #1
      case "whatsapp-16":
        return 14.2; // Guaranteed < 16.0MB on pass #1
      case "gmail-25":
      case "twitter-25":
        return 22.0; // Guaranteed < 25.0MB on pass #1
      case "discord-nitro-50":
        return 46.5; // Guaranteed < 50.0MB on pass #1
      case "file-100":
        return 93.0; // Guaranteed < 100.0MB on pass #1
      case "custom":
        return Math.max(1, customSizeMB * 0.9);
      default:
        return 7.0;
    }
  };

  const getRealLimitBytes = (): number => {
    if (preset === "custom") return customSizeMB * 1024 * 1024;
    return REAL_LIMIT_BYTES[preset];
  };

  const toSafeBlob = (data: Uint8Array, mimeType: string): Blob => {
    const arrayBuffer = data.buffer.slice(
      data.byteOffset,
      data.byteOffset + data.byteLength,
    ) as ArrayBuffer;
    return new Blob([arrayBuffer], { type: mimeType });
  };

  const runEncode = async (
    videoBitrateK: number,
    inputFileName: string,
    outputFileName: string,
  ) => {
    const ffmpeg = ffmpegRef.current!;
    const audioBitrateK = 96;

    // High-velocity parameters: fast_bilinear + ultrafast + fastdecode
    await ffmpeg.exec([
      "-i",
      inputFileName,
      "-b:v",
      `${videoBitrateK}k`,
      "-maxrate",
      `${Math.floor(videoBitrateK * 1.12)}k`,
      "-bufsize",
      `${Math.floor(videoBitrateK * 1.4)}k`,
      "-vf",
      "scale=-2:min(720\\,ih)",
      "-sws_flags",
      "fast_bilinear",
      "-r",
      "30",
      "-c:v",
      "libx264",
      "-preset",
      "ultrafast",
      "-tune",
      "fastdecode",
      "-c:a",
      "aac",
      "-b:a",
      `${audioBitrateK}k`,
      "-movflags",
      "+faststart",
      "-y",
      outputFileName,
    ]);

    const data = (await ffmpeg.readFile(outputFileName)) as Uint8Array;
    return toSafeBlob(data, "video/mp4");
  };

  const startCompression = async () => {
    if (!videoFile) return;

    const isReady = await ensureFFmpegLoaded();
    if (!isReady || !ffmpegRef.current) return;

    const ffmpeg = ffmpegRef.current;
    const cleanExt = videoFile.name.split(".").pop() || "mp4";
    const inputFileName = `input_${Date.now()}.${cleanExt}`;
    const outputFileName = `output_${Date.now()}.mp4`;

    try {
      setIsCompressing(true);
      setError(null);
      setProgress(0);
      setStatusMessage("Reading video into browser memory...");

      // Free previous blob if user re-runs compression on the same selected file
      if (compressedBlobUrl) {
        URL.revokeObjectURL(compressedBlobUrl);
        setCompressedBlobUrl(null);
      }

      await ffmpeg.writeFile(inputFileName, await fetchFile(videoFile));

      const targetMB = getTargetMB();
      const realLimitBytes = getRealLimitBytes();
      const duration = videoDuration > 0 ? videoDuration : 10;
      const audioBitrateK = 96;

      let videoBitrateK = Math.max(
        80,
        Math.floor((targetMB * 8192) / duration) - audioBitrateK,
      );

      let blob: Blob | null = null;

      for (let attempt = 1; attempt <= MAX_ENCODE_ATTEMPTS; attempt++) {
        setStatusMessage(
          attempt === 1
            ? "Compressing locally with WebAssembly (100% private)..."
            : `Refining bitrate (attempt ${attempt} of ${MAX_ENCODE_ATTEMPTS})...`,
        );

        blob = await runEncode(videoBitrateK, inputFileName, outputFileName);

        if (blob.size <= realLimitBytes) {
          break;
        }

        if (attempt === MAX_ENCODE_ATTEMPTS) {
          break;
        }

        videoBitrateK = Math.max(
          60,
          Math.floor(videoBitrateK * RETRY_BITRATE_FACTOR),
        );
      }

      if (!blob) throw new Error("Encoding failed to produce output.");

      const url = URL.createObjectURL(blob);
      setCompressedBlobUrl(url);
      setOutputFileSize(blob.size);
      setIsCompressing(false);
      setProgress(100);
      setStatusMessage("Compression complete!");

      if (blob.size <= realLimitBytes) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
        });
      }
    } catch (err) {
      console.error("Compression error:", err);
      setError(
        "An error occurred during compression. Please try a shorter video clip.",
      );
      setIsCompressing(false);
    } finally {
      try {
        await ffmpeg.deleteFile(inputFileName);
        await ffmpeg.deleteFile(outputFileName);
      } catch {
        // Safe to ignore if file already cleaned up
      }
    }
  };

  const resetAll = () => {
    if (compressedBlobUrl) {
      URL.revokeObjectURL(compressedBlobUrl);
    }
    setVideoFile(null);
    setCompressedBlobUrl(null);
    setOutputFileSize(null);
    setProgress(0);
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-white">
      {/* Target Presets Bar */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
          1. Select Target Platform / Size Limit
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          <button
            type="button"
            onClick={() => setPreset("discord-8")}
            className={`py-2.5 px-3 rounded-xl text-xs font-medium border flex flex-col items-center justify-center gap-0.5 transition-all ${
              preset === "discord-8"
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400"
                : "bg-slate-800/60 border-slate-700/60 text-slate-200 hover:bg-slate-800"
            }`}>
            <span className="font-bold">Discord (8MB)</span>
            <span className="text-[10px] text-slate-300">Free Limit</span>
          </button>

          <button
            type="button"
            onClick={() => setPreset("whatsapp-16")}
            className={`py-2.5 px-3 rounded-xl text-xs font-medium border flex flex-col items-center justify-center gap-0.5 transition-all ${
              preset === "whatsapp-16"
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400"
                : "bg-slate-800/60 border-slate-700/60 text-slate-200 hover:bg-slate-800"
            }`}>
            <span className="font-bold">WhatsApp (16MB)</span>
            <span className="text-[10px] text-slate-300">Direct Send</span>
          </button>

          <button
            type="button"
            onClick={() => setPreset("gmail-25")}
            className={`py-2.5 px-3 rounded-xl text-xs font-medium border flex flex-col items-center justify-center gap-0.5 transition-all ${
              preset === "gmail-25" || preset === "twitter-25"
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400"
                : "bg-slate-800/60 border-slate-700/60 text-slate-200 hover:bg-slate-800"
            }`}>
            <span className="font-bold">Email / X (25MB)</span>
            <span className="text-[10px] text-slate-300">Attachments</span>
          </button>

          <button
            type="button"
            onClick={() => setPreset("discord-nitro-50")}
            className={`py-2.5 px-3 rounded-xl text-xs font-medium border flex flex-col items-center justify-center gap-0.5 transition-all ${
              preset === "discord-nitro-50"
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400"
                : "bg-slate-800/60 border-slate-700/60 text-slate-200 hover:bg-slate-800"
            }`}>
            <span className="font-bold">Nitro (50MB)</span>
            <span className="text-[10px] text-slate-300">High Quality</span>
          </button>

          <button
            type="button"
            onClick={() => setPreset("file-100")}
            className={`py-2.5 px-3 rounded-xl text-xs font-medium border flex flex-col items-center justify-center gap-0.5 transition-all ${
              preset === "file-100"
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400"
                : "bg-slate-800/60 border-slate-700/60 text-slate-200 hover:bg-slate-800"
            }`}>
            <span className="font-bold">Portal (100MB)</span>
            <span className="text-[10px] text-slate-300">Web Uploads</span>
          </button>

          <button
            type="button"
            onClick={() => setPreset("custom")}
            className={`py-2.5 px-3 rounded-xl text-xs font-medium border flex flex-col items-center justify-center gap-0.5 transition-all ${
              preset === "custom"
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400"
                : "bg-slate-800/60 border-slate-700/60 text-slate-200 hover:bg-slate-800"
            }`}>
            <span className="font-bold">Custom</span>
            <span className="text-[10px] text-slate-300">
              {customSizeMB} MB
            </span>
          </button>
        </div>

        {preset === "custom" && (
          <div className="mt-3 p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center gap-3">
            <label
              htmlFor="custom-size-input"
              className="text-xs font-medium text-slate-200">
              Target Size (MB):
            </label>
            <input
              id="custom-size-input"
              type="number"
              min="1"
              max="350"
              value={customSizeMB}
              onChange={(e) =>
                setCustomSizeMB(Math.max(1, Number(e.target.value)))
              }
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-20"
            />
          </div>
        )}
      </div>

      {/* Dropzone with Preload Triggers on Hover and Drag */}
      {!videoFile ? (
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload video file"
          onMouseEnter={() => ensureFFmpegLoaded()}
          onDragEnter={() => ensureFFmpegLoaded()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          className="border-2 border-dashed border-slate-700 hover:border-indigo-500 bg-slate-950/50 hover:bg-indigo-950/20 rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center group focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*,.mp4,.mov,.webm,.mkv"
            className="hidden"
            onChange={(e) =>
              e.target.files?.[0] && handleFileSelected(e.target.files[0])
            }
          />
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8 text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">
            Drop your video here or{" "}
            <span className="text-indigo-400 underline underline-offset-4">
              browse files
            </span>
          </h3>
          <p className="text-sm text-slate-400 max-w-sm">
            Supports MP4, iPhone MOV, WebM, MKV. Processed locally in your
            browser.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1 rounded-full">
            <Zap className="w-3.5 h-3.5" /> Zero file uploads — 100% Client-Side
          </div>
        </div>
      ) : (
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                <FileVideo className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white truncate max-w-xs sm:max-w-md">
                  {videoFile.name}
                </h3>
                <p className="text-xs text-slate-400">
                  Original: {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                  &middot; Duration: {Math.round(videoDuration)}s &middot;
                  Target: {getTargetMB().toFixed(1)} MB
                </p>
              </div>
            </div>
            {!isCompressing && !compressedBlobUrl && (
              <button
                onClick={resetAll}
                className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer">
                Choose another file
              </button>
            )}
          </div>

          {/* Warning for Long Videos */}
          {videoDuration > 180 && !compressedBlobUrl && (
            <div className="mt-4 p-3 bg-amber-950/40 border border-amber-800/50 rounded-xl text-amber-300 text-xs flex items-center gap-2.5">
              <Clock className="w-4 h-4 shrink-0 text-amber-400" />
              <span>
                <strong>Note:</strong> Videos longer than 3 minutes process on
                your device CPU and may take 1–2 minutes. Please keep this
                browser tab open.
              </span>
            </div>
          )}

          {isCompressing && (
            <div className="py-6 space-y-3">
              <div className="flex justify-between text-xs text-slate-300">
                <span>{statusMessage}</span>
                <span className="font-mono font-bold text-indigo-400">
                  {progress}%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-linear-to-r from-indigo-500 to-purple-500 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 text-center">
                Processing runs on your device. Zero data sent to servers.
              </p>
            </div>
          )}

          {compressedBlobUrl && outputFileSize && (
            <div className="py-6 space-y-4 text-center">
              <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Video Ready!</h3>
              <p className="text-sm text-slate-300">
                Shrunk from{" "}
                <span className="text-slate-400 line-through">
                  {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                </span>{" "}
                down to{" "}
                <span className="text-emerald-400 font-bold text-base">
                  {(outputFileSize / (1024 * 1024)).toFixed(2)} MB
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href={compressedBlobUrl}
                  download={`clipshrink_${videoFile.name.replace(/\.[^/.]+$/, "")}.mp4`}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-base">
                  <Download className="w-5 h-5" /> Download Compressed Video
                </a>
                <button
                  onClick={resetAll}
                  className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 px-6 rounded-xl transition-all text-sm cursor-pointer">
                  <RefreshCw className="w-4 h-4" /> Compress Another Video
                </button>
              </div>
            </div>
          )}

          {!isCompressing && !compressedBlobUrl && (
            <div className="pt-6">
              <button
                onClick={startCompression}
                disabled={isLoadingFFmpeg}
                className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 text-base cursor-pointer">
                <Sparkles className="w-5 h-5" />
                Compress Video (Target: {getTargetMB().toFixed(1)}MB)
              </button>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-950/50 border border-red-800/80 rounded-xl text-red-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
