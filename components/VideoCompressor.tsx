"use client";

import React, { useState, useRef, useCallback } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { loadProgressiveFFmpeg } from "@/lib/ffmpegLoader";
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
  ShieldCheck,
  Cpu,
  Sliders,
  ArrowRight,
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
  const [isMultiThreaded, setIsMultiThreaded] = useState(false);
  const [threadCount, setThreadCount] = useState(1);

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

  // Progressive Engine Loader (Loads once and only once)
  const ensureFFmpegLoaded = useCallback(async (): Promise<boolean> => {
    if (ffmpegRef.current && loaded) return true;
    if (loadingPromiseRef.current) return loadingPromiseRef.current;

    const loadPromise = (async () => {
      try {
        setIsLoadingFFmpeg(true);
        setStatusMessage("Initializing browser engine...");

        const result = await loadProgressiveFFmpeg((p) => {
          setProgress(p);
        });

        ffmpegRef.current = result.ffmpeg;
        setIsMultiThreaded(result.isMultiThreaded);
        setThreadCount(result.threadCount);
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

    ensureFFmpegLoaded();
  };

  const getTargetMB = (): number => {
    switch (preset) {
      case "discord-8":
        return 7.0;
      case "whatsapp-16":
        return 14.2;
      case "gmail-25":
      case "twitter-25":
        return 22.0;
      case "discord-nitro-50":
        return 46.5;
      case "file-100":
        return 93.0;
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
    audioBitrateK: number,
    inputFileName: string,
    outputFileName: string,
  ) => {
    const ffmpeg = ffmpegRef.current!;

    // Clean resolution scaling
    let scaleFilter = "scale=-2:720";
    let targetFps = "30";

    if (videoBitrateK < 100) {
      scaleFilter = "scale=-2:360";
      targetFps = "20";
    } else if (videoBitrateK < 250) {
      scaleFilter = "scale=-2:480";
      targetFps = "24";
    }

    // Buffer must NEVER drop below 500k so initial Keyframes don't choke the encoder
    const safeBufSize = Math.max(500, Math.floor(videoBitrateK * 2));
    const safeMaxRate = Math.max(
      videoBitrateK + 50,
      Math.floor(videoBitrateK * 1.3),
    );

    const ffmpegArgs: string[] = [
      "-i",
      inputFileName,
      "-b:v",
      `${videoBitrateK}k`,
      "-maxrate",
      `${safeMaxRate}k`,
      "-bufsize",
      `${safeBufSize}k`,
      "-vf",
      scaleFilter,
      "-sws_flags",
      "fast_bilinear",
      "-r",
      targetFps,
      "-c:v",
      "libx264",
      "-preset",
      "ultrafast",
      "-tune",
      "fastdecode",
    ];

    // In WebAssembly, cap threads to 4 so threads + lookahead never exceeds the 8-worker limit
    if (isMultiThreaded) {
      const safeThreads = Math.min(threadCount, 4);
      ffmpegArgs.push("-threads", `${safeThreads}`);
    }

    ffmpegArgs.push("-c:a", "aac", "-b:a", `${audioBitrateK}k`);

    if (audioBitrateK <= 48) {
      ffmpegArgs.push("-ac", "1");
    }

    ffmpegArgs.push("-movflags", "+faststart", "-y", outputFileName);

    await ffmpeg.exec(ffmpegArgs);

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

      if (compressedBlobUrl) {
        URL.revokeObjectURL(compressedBlobUrl);
        setCompressedBlobUrl(null);
      }

      await ffmpeg.writeFile(inputFileName, await fetchFile(videoFile));

      const targetMB = getTargetMB();
      const realLimitBytes = getRealLimitBytes();
      const duration = videoDuration > 0 ? videoDuration : 10;

      const totalBudgetK = Math.floor((targetMB * 8192) / duration);

      let audioBitrateK = 96;
      if (totalBudgetK < 110) {
        audioBitrateK = 48;
      } else if (totalBudgetK < 200) {
        audioBitrateK = 64;
      }

      let videoBitrateK = Math.max(45, totalBudgetK - audioBitrateK);

      let blob: Blob | null = null;

      for (let attempt = 1; attempt <= MAX_ENCODE_ATTEMPTS; attempt++) {
        setStatusMessage(
          attempt === 1
            ? isMultiThreaded
              ? `Compressing locally (${threadCount} CPU cores active)...`
              : "Compressing locally with WebAssembly..."
            : `Refining bitrate (attempt ${attempt} of ${MAX_ENCODE_ATTEMPTS})...`,
        );

        blob = await runEncode(
          videoBitrateK,
          audioBitrateK,
          inputFileName,
          outputFileName,
        );

        if (blob.size <= realLimitBytes) break;
        if (attempt === MAX_ENCODE_ATTEMPTS) break;

        videoBitrateK = Math.max(
          40,
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
        // Safe to ignore
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
    <div className="w-full max-w-4xl mx-auto">
      {/* Platform Preset Selector - Segmented Tab Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between px-1 mb-2.5">
          <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            Target Platform & Ceiling
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            {preset === "custom"
              ? `${customSizeMB} MB Limit`
              : `< ${REAL_LIMIT_BYTES[preset] / (1024 * 1024)}MB Safe Target`}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-1.5 p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl backdrop-blur-xl shadow-inner">
          <button
            type="button"
            onClick={() => setPreset("discord-8")}
            className={`py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
              preset === "discord-8"
                ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}>
            <div>Discord</div>
            <div className="text-[10px] opacity-75">8MB Free</div>
          </button>

          <button
            type="button"
            onClick={() => setPreset("whatsapp-16")}
            className={`py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
              preset === "whatsapp-16"
                ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}>
            <div>WhatsApp</div>
            <div className="text-[10px] opacity-75">16MB Limit</div>
          </button>

          <button
            type="button"
            onClick={() => setPreset("gmail-25")}
            className={`py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
              preset === "gmail-25" || preset === "twitter-25"
                ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}>
            <div>Email / X</div>
            <div className="text-[10px] opacity-75">25MB Attach</div>
          </button>

          <button
            type="button"
            onClick={() => setPreset("discord-nitro-50")}
            className={`py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
              preset === "discord-nitro-50"
                ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}>
            <div>Nitro Basic</div>
            <div className="text-[10px] opacity-75">50MB HQ</div>
          </button>

          <button
            type="button"
            onClick={() => setPreset("file-100")}
            className={`py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
              preset === "file-100"
                ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}>
            <div>Web Portal</div>
            <div className="text-[10px] opacity-75">100MB Cap</div>
          </button>

          <button
            type="button"
            onClick={() => setPreset("custom")}
            className={`py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
              preset === "custom"
                ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}>
            <div>Custom</div>
            <div className="text-[10px] opacity-75">{customSizeMB}MB Size</div>
          </button>
        </div>

        {preset === "custom" && (
          <div className="mt-2.5 p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl flex items-center justify-between">
            <span className="text-xs text-slate-300">
              Specify your exact maximum target file ceiling:
            </span>
            <div className="flex items-center gap-2">
              <input
                id="custom-size-input"
                type="number"
                min="1"
                max="350"
                value={customSizeMB}
                onChange={(e) =>
                  setCustomSizeMB(Math.max(1, Number(e.target.value)))
                }
                className="bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-lg px-3 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 w-24 text-right font-mono"
              />
              <span className="text-xs text-slate-400 font-medium">MB</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Console Container */}
      <div className="relative bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden backdrop-blur-xl">
        {/* Console Header Bar */}
        <div className="px-5 py-3 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80 inline-block" />
            </div>
            <span className="font-mono text-[11px] text-slate-400 ml-2">
              clipshrink-core v0.12.15 [WASM]
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {isMultiThreaded
                ? `⚡ ${threadCount}x CPU Cores Active`
                : "Client Memory Ready"}
            </span>
          </div>
        </div>

        {/* Dropzone / Upload State */}
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
            className="p-8 sm:p-14 text-center cursor-pointer transition-all flex flex-col items-center justify-center group hover:bg-indigo-950/10 focus:outline-none">
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*,.mp4,.mov,.webm,.mkv"
              className="hidden"
              onChange={(e) =>
                e.target.files?.[0] && handleFileSelected(e.target.files[0])
              }
            />

            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:border-indigo-400/40 transition-all shadow-lg shadow-indigo-600/10">
              <Upload className="w-7 h-7 text-indigo-400" />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2">
              Drop your video here or{" "}
              <span className="text-indigo-400 underline underline-offset-4 decoration-indigo-400/40 group-hover:decoration-indigo-400">
                browse files
              </span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed mb-6">
              Supports MP4, Apple MOV, WebM, and MKV. Runs locally in your
              browser memory with zero server uploads.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100%
                Private
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Local CPU WASM
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> No Watermarks
              </span>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            {/* File Info Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                  <FileVideo className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white truncate max-w-xs sm:max-w-md text-sm sm:text-base">
                    {videoFile.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 font-mono">
                    <span>
                      {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                    <span>•</span>
                    <span>{Math.round(videoDuration)}s duration</span>
                    <span>•</span>
                    <span className="text-indigo-400 font-semibold">
                      Target: {getTargetMB().toFixed(1)} MB
                    </span>
                  </div>
                </div>
              </div>

              {!isCompressing && !compressedBlobUrl && (
                <button
                  onClick={resetAll}
                  className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer py-1.5 px-3 rounded-lg border border-slate-800 hover:bg-slate-800">
                  Choose another file
                </button>
              )}
            </div>

            {/* Long Video Warning */}
            {videoDuration > 180 && !compressedBlobUrl && (
              <div className="mt-4 p-3.5 bg-amber-950/30 border border-amber-800/40 rounded-xl text-amber-300 text-xs flex items-center gap-2.5">
                <Clock className="w-4 h-4 shrink-0 text-amber-400" />
                <span>
                  <strong>Notice:</strong> Videos over 3 minutes run directly on
                  your device CPU and may take 1–2 minutes. Please keep this
                  browser tab open.
                </span>
              </div>
            )}

            {/* Compression Progress */}
            {isCompressing && (
              <div className="py-8 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                    {statusMessage}
                  </span>
                  <span className="font-mono font-bold text-indigo-400 text-sm">
                    {progress}%
                  </span>
                </div>

                <div className="w-full bg-slate-950 border border-slate-800 h-3 rounded-full overflow-hidden p-0.5">
                  <div
                    className="bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-400 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>
                    Engine: WebAssembly H.264 ultrafast{" "}
                    {isMultiThreaded && `(${threadCount} Cores)`}
                  </span>
                  <span>100% In-Browser RAM</span>
                </div>
              </div>
            )}

            {/* Completion View */}
            {compressedBlobUrl && outputFileSize && (
              <div className="py-8 space-y-6 text-center">
                <div className="inline-flex items-center justify-center p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Video Successfully Shrunk
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Compressed from{" "}
                    <span className="text-slate-400 line-through font-mono">
                      {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                    </span>{" "}
                    down to{" "}
                    <span className="text-emerald-400 font-bold text-lg font-mono">
                      {(outputFileSize / (1024 * 1024)).toFixed(2)} MB
                    </span>{" "}
                    <span className="text-xs text-emerald-500 font-medium">
                      (
                      {((1 - outputFileSize / videoFile.size) * 100).toFixed(0)}
                      % smaller)
                    </span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <a
                    href={compressedBlobUrl}
                    download={`clipshrink_${videoFile.name.replace(/\.[^/.]+$/, "")}.mp4`}
                    className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-indigo-600/30 transition-all text-sm cursor-pointer">
                    <Download className="w-4 h-4" /> Download Compressed MP4
                  </a>
                  <button
                    onClick={resetAll}
                    className="inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-slate-300 font-medium py-3 px-6 rounded-xl border border-slate-800 transition-all text-sm cursor-pointer">
                    <RefreshCw className="w-4 h-4" /> Compress Another File
                  </button>
                </div>
              </div>
            )}

            {/* Launch Compression Button */}
            {!isCompressing && !compressedBlobUrl && (
              <div className="pt-6">
                <button
                  onClick={startCompression}
                  disabled={isLoadingFFmpeg}
                  className="w-full bg-linear-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl shadow-xl shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer">
                  <Sparkles className="w-4 h-4" />
                  Compress Video to &lt; {getTargetMB().toFixed(1)}MB Limit
                  <ArrowRight className="w-4 h-4 opacity-75" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-950/40 border border-red-800/60 rounded-xl text-red-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
