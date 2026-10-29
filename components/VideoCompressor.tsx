"use client";

import React, { useState, useRef, useCallback } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { loadProgressiveFFmpeg } from "@/lib/ffmpegLoader";
import { probeMedia, isAlreadyShareable } from "@/lib/probeMedia";
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  FileVideo,
  Download,
  Sparkles,
  RefreshCw,
  Clock,
  ShieldCheck,
  Sliders,
  ArrowRight,
} from "lucide-react";
import confetti from "canvas-confetti";

export type TargetPreset =
  | "discord-20"
  | "whatsapp-16"
  | "gmail-25"
  | "twitter-25"
  | "discord-nitro-50"
  | "file-100"
  | "custom";

interface VideoCompressorProps {
  initialPreset?: TargetPreset;
  /** Size (MB) the Custom tab starts at. Spokes like "to 10MB" or "Outlook 20MB" set this. */
  initialCustomMB?: number;
}

const REAL_LIMIT_BYTES: Record<Exclude<TargetPreset, "custom">, number> = {
  "discord-20": 20 * 1024 * 1024,
  "whatsapp-16": 16 * 1024 * 1024,
  "gmail-25": 25 * 1024 * 1024,
  "twitter-25": 25 * 1024 * 1024,
  "discord-nitro-50": 50 * 1024 * 1024,
  "file-100": 100 * 1024 * 1024,
};

const MAX_ENCODE_ATTEMPTS = 2;
const RETRY_BITRATE_FACTOR = 0.85;

export default function VideoCompressor({
  initialPreset = "discord-20",
  initialCustomMB = 8,
}: VideoCompressorProps) {
  const [loaded, setLoaded] = useState(false);
  const [isLoadingFFmpeg, setIsLoadingFFmpeg] = useState(false);
  const [isMultiThreaded, setIsMultiThreaded] = useState(false);
  const [threadCount, setThreadCount] = useState(1);

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [preset, setPreset] = useState<TargetPreset>(initialPreset);
  const [customSizeMB, setCustomSizeMB] = useState<number>(initialCustomMB);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [compressedBlobUrl, setCompressedBlobUrl] = useState<string | null>(
    null,
  );
  const [outputFileSize, setOutputFileSize] = useState<number | null>(null);
  const [alreadyUnderLimit, setAlreadyUnderLimit] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ffmpegRef = useRef<FFmpeg | null>(null);
  const loadingPromiseRef = useRef<Promise<boolean> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Progressive Engine Loader
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
    setAlreadyUnderLimit(false);
    setProgress(0);
    setVideoDuration(0);

    const videoElement = document.createElement("video");
    videoElement.preload = "metadata";
    const probeUrl = URL.createObjectURL(file);
    videoElement.onloadedmetadata = () => {
      URL.revokeObjectURL(probeUrl);
      const d = videoElement.duration;
      setVideoDuration(Number.isFinite(d) && d > 0 ? d : 0);
    };
    videoElement.onerror = () => {
      URL.revokeObjectURL(probeUrl);
      setVideoDuration(0);
    };
    videoElement.src = probeUrl;

    ensureFFmpegLoaded();
  };

  const getTargetMB = (): number => {
    switch (preset) {
      case "discord-20":
        return 18.0;
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

    const scaleTo = (h: number) => `scale=-2:trunc(min(${h}\\,ih)/2)*2`;
    let scaleFilter = scaleTo(720);
    let targetFps = "30";

    if (videoBitrateK < 100) {
      scaleFilter = scaleTo(360);
      targetFps = "20";
    } else if (videoBitrateK < 250) {
      scaleFilter = scaleTo(480);
      targetFps = "24";
    }

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
      setStatusMessage("Loading video into browser memory...");

      if (compressedBlobUrl) {
        URL.revokeObjectURL(compressedBlobUrl);
        setCompressedBlobUrl(null);
      }

      await ffmpeg.writeFile(inputFileName, await fetchFile(videoFile));

      setStatusMessage("Reading video details...");
      const probe = await probeMedia(ffmpeg, inputFileName);
      const duration =
        probe.durationSec > 0 ? probe.durationSec : videoDuration;
      if (!(duration > 0)) {
        setError(
          "Could not read the video duration. Please try re-exporting the clip.",
        );
        setIsCompressing(false);
        return;
      }
      setVideoDuration(duration);

      const targetMB = getTargetMB();
      const realLimitBytes = getRealLimitBytes();

      if (
        isAlreadyShareable(
          videoFile.name,
          videoFile.size,
          realLimitBytes,
          probe,
        )
      ) {
        setCompressedBlobUrl(URL.createObjectURL(videoFile));
        setOutputFileSize(videoFile.size);
        setAlreadyUnderLimit(true);
        setProgress(100);
        setStatusMessage("Already under the limit");
        setIsCompressing(false);
        return;
      }
      setAlreadyUnderLimit(false);

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
              ? `Compressing locally (${threadCount} CPU cores)...`
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
          particleCount: 60,
          spread: 55,
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
    setAlreadyUnderLimit(false);
    setVideoDuration(0);
    setProgress(0);
    setError(null);
  };

  const limitMB = getRealLimitBytes() / (1024 * 1024);
  const overLimit =
    outputFileSize !== null && outputFileSize > getRealLimitBytes();

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Preset Selector */}
      <div className="mb-4">
        <div className="flex items-center justify-between px-1 mb-2">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-indigo-600" />
            Target Size Limit
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {preset === "custom"
              ? `${customSizeMB} MB Limit`
              : `< ${REAL_LIMIT_BYTES[preset] / (1024 * 1024)}MB Safe Target`}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 p-1.5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <button
            type="button"
            onClick={() => setPreset("discord-20")}
            className={`py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
              preset === "discord-20"
                ? "bg-indigo-600 text-white font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}>
            <div>Discord</div>
            <div className="text-[10px] opacity-80">20MB Free</div>
          </button>

          <button
            type="button"
            onClick={() => setPreset("whatsapp-16")}
            className={`py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
              preset === "whatsapp-16"
                ? "bg-indigo-600 text-white font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}>
            <div>WhatsApp</div>
            <div className="text-[10px] opacity-80">16MB Limit</div>
          </button>

          <button
            type="button"
            onClick={() => setPreset("gmail-25")}
            className={`py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
              preset === "gmail-25" || preset === "twitter-25"
                ? "bg-indigo-600 text-white font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}>
            <div>Email / X</div>
            <div className="text-[10px] opacity-80">25MB Limit</div>
          </button>

          <button
            type="button"
            onClick={() => setPreset("discord-nitro-50")}
            className={`py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
              preset === "discord-nitro-50"
                ? "bg-indigo-600 text-white font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}>
            <div>Nitro Basic</div>
            <div className="text-[10px] opacity-80">50MB Limit</div>
          </button>

          <button
            type="button"
            onClick={() => setPreset("file-100")}
            className={`py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
              preset === "file-100"
                ? "bg-indigo-600 text-white font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}>
            <div>Web Portal</div>
            <div className="text-[10px] opacity-80">100MB Cap</div>
          </button>

          <button
            type="button"
            onClick={() => setPreset("custom")}
            className={`py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
              preset === "custom"
                ? "bg-indigo-600 text-white font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}>
            <div>Custom</div>
            <div className="text-[10px] opacity-80">{customSizeMB}MB</div>
          </button>
        </div>

        {preset === "custom" && (
          <div className="mt-2.5 p-3.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-xs">
            <span className="text-xs text-slate-700 font-medium">
              Specify your target file size ceiling:
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
                className="bg-slate-50 border border-slate-300 focus:border-indigo-600 rounded-lg px-3 py-1 text-xs text-slate-900 focus:outline-hidden w-24 text-right font-mono"
              />
              <span className="text-xs text-slate-500 font-semibold">MB</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Container Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Dropzone State */}
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
            className="p-8 sm:p-14 text-center cursor-pointer transition-all flex flex-col items-center justify-center hover:bg-slate-50/70 focus:outline-hidden">
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*,.mp4,.mov,.webm,.mkv"
              className="hidden"
              onChange={(e) =>
                e.target.files?.[0] && handleFileSelected(e.target.files[0])
              }
            />

            <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4 text-indigo-600 shadow-xs">
              <Upload className="w-7 h-7" />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
              Drop your video here or{" "}
              <span className="text-indigo-600 underline underline-offset-4 hover:text-indigo-700">
                browse files
              </span>
            </h3>

            <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Private in Browser &middot; No Watermarks</span>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            {/* File Info Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
                  <FileVideo className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 truncate max-w-xs sm:max-w-md text-sm sm:text-base">
                    {videoFile.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-mono">
                    <span>
                      {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                    <span>•</span>
                    <span>
                      {videoDuration > 0
                        ? `${Math.round(videoDuration)}s duration`
                        : "Reading length..."}
                    </span>
                    <span>•</span>
                    <span className="text-indigo-600 font-semibold">
                      Target: {getTargetMB().toFixed(1)} MB
                    </span>
                  </div>
                </div>
              </div>

              {!isCompressing && !compressedBlobUrl && (
                <button
                  onClick={resetAll}
                  className="text-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                  Choose another file
                </button>
              )}
            </div>

            {/* Long Video Warning */}
            {videoDuration > 180 && !compressedBlobUrl && (
              <div className="mt-4 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs flex items-center gap-2.5">
                <Clock className="w-4 h-4 shrink-0 text-amber-600" />
                <span>
                  <strong>Notice:</strong> Videos over 3 minutes encode directly
                  on your device CPU and may take 1–2 minutes. Please keep this
                  tab open.
                </span>
              </div>
            )}

            {/* Compression Progress */}
            {isCompressing && (
              <div className="py-8 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-700 font-medium">
                    {statusMessage}
                  </span>
                  <span className="font-mono font-bold text-indigo-600 text-sm">
                    {progress}%
                  </span>
                </div>

                <div className="w-full bg-slate-100 border border-slate-200 h-3 rounded-full overflow-hidden p-0.5">
                  <div
                    className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>WebAssembly Local H.264 Encoder</span>
                  <span>Zero Data Transmitted</span>
                </div>
              </div>
            )}

            {/* Completion View */}
            {compressedBlobUrl && outputFileSize && (
              <div className="py-8 space-y-6 text-center">
                <div
                  className={`inline-flex items-center justify-center p-3.5 border rounded-2xl shadow-xs ${
                    overLimit
                      ? "bg-amber-50 border-amber-200 text-amber-600"
                      : "bg-emerald-50 border-emerald-200 text-emerald-600"
                  }`}>
                  {overLimit ? (
                    <AlertCircle className="w-8 h-8" />
                  ) : (
                    <CheckCircle2 className="w-8 h-8" />
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {alreadyUnderLimit
                      ? "Already Under the Limit"
                      : overLimit
                        ? "Couldn't Reach Exact Size Limit"
                        : "Video Successfully Compressed"}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {alreadyUnderLimit ? (
                      <>
                        Your video is{" "}
                        <span className="text-emerald-600 font-bold text-lg font-mono">
                          {(outputFileSize / (1024 * 1024)).toFixed(2)} MB
                        </span>
                        , already under the {+limitMB.toFixed(1)} MB ceiling.
                      </>
                    ) : (
                      <>
                        Reduced from{" "}
                        <span className="text-slate-400 line-through font-mono">
                          {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                        </span>{" "}
                        to{" "}
                        <span
                          className={`font-bold text-lg font-mono ${overLimit ? "text-amber-600" : "text-emerald-600"}`}>
                          {(outputFileSize / (1024 * 1024)).toFixed(2)} MB
                        </span>{" "}
                        {outputFileSize < videoFile.size && (
                          <span className="text-xs text-emerald-600 font-semibold">
                            (
                            {(
                              (1 - outputFileSize / videoFile.size) *
                              100
                            ).toFixed(0)}
                            % smaller)
                          </span>
                        )}
                      </>
                    )}
                  </p>
                  {overLimit && (
                    <p className="mt-3 mx-auto max-w-md text-xs text-amber-700 leading-relaxed">
                      The file is still slightly above the {+limitMB.toFixed(1)}{" "}
                      MB target. Consider trimming a few seconds or picking a
                      lower Custom target.
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <a
                    href={compressedBlobUrl}
                    download={
                      alreadyUnderLimit
                        ? videoFile.name
                        : `clipshrink_${videoFile.name.replace(/\.[^/.]+$/, "")}.mp4`
                    }
                    className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-xs transition-colors text-sm cursor-pointer">
                    <Download className="w-4 h-4" /> Download Video
                  </a>
                  <button
                    onClick={resetAll}
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 px-6 rounded-xl border border-slate-200 transition-colors text-sm cursor-pointer">
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
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer">
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
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
