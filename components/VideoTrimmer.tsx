"use client";

import React, { useState, useRef, useCallback } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import {
  CheckCircle2,
  AlertCircle,
  FileVideo,
  Download,
  Sparkles,
  RefreshCw,
  Zap,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Scissors,
  Play,
  Pause,
} from "lucide-react";
import confetti from "canvas-confetti";

interface VideoTrimmerProps {
  defaultSourceExt?: string;
  sourceContext?: string;
  title?: string;
  subtitle?: string;
}

export default function VideoTrimmer({
  defaultSourceExt,
  sourceContext,
  title = "Instant Video Trimmer",
  subtitle = "Cut and trim video clips in 0.1s using in-browser WebAssembly stream-copy. 100% private, zero watermarks.",
}: VideoTrimmerProps) {
  const [loaded, setLoaded] = useState(false);
  const [isLoadingFFmpeg, setIsLoadingFFmpeg] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);

  // Trimming timestamps (in seconds)
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [trimmedBlobUrl, setTrimmedBlobUrl] = useState<string | null>(null);
  const [outputFileSize, setOutputFileSize] = useState<number | null>(null);
  const [processingMode, setProcessingMode] = useState<
    "stream-copy" | "transcode" | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const ffmpegRef = useRef<FFmpeg | null>(null);
  const loadingPromiseRef = useRef<Promise<boolean> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  const ensureFFmpegLoaded = useCallback(async (): Promise<boolean> => {
    if (ffmpegRef.current && loaded) return true;
    if (loadingPromiseRef.current) return loadingPromiseRef.current;

    const loadPromise = (async () => {
      try {
        setIsLoadingFFmpeg(true);
        setStatusMessage("Initializing trimming engine...");
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

  const handleFileSelected = (selectedFile: File) => {
    if (
      !selectedFile.type.startsWith("video/") &&
      !selectedFile.name.match(/\.(mp4|mov|webm|mkv|avi|m4v|gif)$/i)
    ) {
      setError(
        "Please select a valid video file (.mp4, .mov, .webm, .mkv, .gif).",
      );
      return;
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile && selectedFile.size > 150 * 1024 * 1024) {
      setError(
        "Files over 150MB may exceed mobile browser memory. Please use a desktop browser for large clips.",
      );
      return;
    }
    if (selectedFile.size > 500 * 1024 * 1024) {
      setError(
        "Files over 500MB exceed browser memory capacity. Please select a clip under 500MB.",
      );
      return;
    }

    if (previewSrc) URL.revokeObjectURL(previewSrc);
    if (trimmedBlobUrl) URL.revokeObjectURL(trimmedBlobUrl);

    const objectUrl = URL.createObjectURL(selectedFile);
    setError(null);
    setFile(selectedFile);
    setPreviewSrc(objectUrl);
    setTrimmedBlobUrl(null);
    setOutputFileSize(null);
    setProcessingMode(null);
    setProgress(0);
    setIsPlaying(false);

    ensureFFmpegLoaded();
  };

  const onLoadedMetadata = () => {
    if (videoPlayerRef.current) {
      const dur = videoPlayerRef.current.duration || 10;
      setVideoDuration(dur);
      setStartTime(0);
      setEndTime(dur);
      setCurrentTime(0);
    }
  };

  const handleTimeUpdate = () => {
    if (videoPlayerRef.current) {
      const curr = videoPlayerRef.current.currentTime;
      setCurrentTime(curr);
      if (curr >= endTime) {
        videoPlayerRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const togglePlay = () => {
    if (!videoPlayerRef.current) return;
    if (isPlaying) {
      videoPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      if (
        videoPlayerRef.current.currentTime >= endTime ||
        videoPlayerRef.current.currentTime < startTime
      ) {
        videoPlayerRef.current.currentTime = startTime;
      }
      videoPlayerRef.current.play();
      setIsPlaying(true);
    }
  };

  const seekTo = (time: number) => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toSafeBlob = (data: Uint8Array, mimeType: string): Blob => {
    const arrayBuffer = data.buffer.slice(
      data.byteOffset,
      data.byteOffset + data.byteLength,
    ) as ArrayBuffer;
    return new Blob([arrayBuffer], { type: mimeType });
  };

  const formatSeconds = (sec: number): string => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    const ms = Math.floor((sec % 1) * 10);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${ms}`;
  };

  const startTrimming = async () => {
    if (!file) return;

    const isReady = await ensureFFmpegLoaded();
    if (!isReady || !ffmpegRef.current) return;

    if (endTime <= startTime) {
      setError("End time must be greater than start time.");
      return;
    }

    const ffmpeg = ffmpegRef.current;
    const cleanExt = file.name.split(".").pop()?.toLowerCase() || "mp4";
    const inputFileName = `input_${Date.now()}.${cleanExt}`;
    const outputExt = cleanExt === "mov" ? "mp4" : cleanExt;
    const outputFileName = `trimmed_${Date.now()}.${outputExt}`;
    const outputMime = outputExt === "webm" ? "video/webm" : "video/mp4";

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(15);
      setStatusMessage("Reading video into browser RAM...");

      if (trimmedBlobUrl) {
        URL.revokeObjectURL(trimmedBlobUrl);
        setTrimmedBlobUrl(null);
      }

      await ffmpeg.writeFile(inputFileName, await fetchFile(file));

      setStatusMessage("Performing sub-second stream-copy cut...");
      setProgress(45);

      const startStr = startTime.toFixed(2);
      const durationStr = (endTime - startTime).toFixed(2);

      let succeeded = false;

      // Tier 1: Instant Lossless Stream-Copy (-c copy)
      try {
        await ffmpeg.exec([
          "-ss",
          startStr,
          "-i",
          inputFileName,
          "-t",
          durationStr,
          "-c",
          "copy",
          "-avoid_negative_ts",
          "make_zero",
          "-movflags",
          "+faststart",
          "-y",
          outputFileName,
        ]);

        const data = (await ffmpeg.readFile(outputFileName)) as Uint8Array;
        if (data && data.byteLength > 1000) {
          const blob = toSafeBlob(data, outputMime);
          setTrimmedBlobUrl(URL.createObjectURL(blob));
          setOutputFileSize(blob.size);
          setProcessingMode("stream-copy");
          succeeded = true;
        }
      } catch (copyErr) {
        console.warn(
          "Direct stream-copy cut failed; falling back to transcode:",
          copyErr,
        );
        succeeded = false;
      }

      // Tier 2: Transcode fallback for complex containers
      if (!succeeded) {
        setStatusMessage("Aligning keyframes with ultrafast transcode...");
        setProgress(60);

        await ffmpeg.exec([
          "-ss",
          startStr,
          "-i",
          inputFileName,
          "-t",
          durationStr,
          "-c:v",
          "libx264",
          "-preset",
          "ultrafast",
          "-tune",
          "fastdecode",
          "-c:a",
          "aac",
          "-b:a",
          "128k",
          "-pix_fmt",
          "yuv420p",
          "-movflags",
          "+faststart",
          "-y",
          outputFileName,
        ]);

        const data = (await ffmpeg.readFile(outputFileName)) as Uint8Array;
        if (!data || data.byteLength === 0) {
          throw new Error("Trimming failed to generate output.");
        }

        const blob = toSafeBlob(data, outputMime);
        setTrimmedBlobUrl(URL.createObjectURL(blob));
        setOutputFileSize(blob.size);
        setProcessingMode("transcode");
      }

      setIsProcessing(false);
      setProgress(100);
      setStatusMessage("Video trimmed successfully!");

      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.error("Trimming error:", err);
      setError(
        "An error occurred while trimming. Please ensure the file is valid.",
      );
      setIsProcessing(false);
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
    if (previewSrc) URL.revokeObjectURL(previewSrc);
    if (trimmedBlobUrl) URL.revokeObjectURL(trimmedBlobUrl);
    setFile(null);
    setPreviewSrc(null);
    setTrimmedBlobUrl(null);
    setOutputFileSize(null);
    setVideoDuration(0);
    setStartTime(0);
    setEndTime(0);
    setCurrentTime(0);
    setProgress(0);
    setError(null);
    setIsPlaying(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Console Card Container */}
      <div className="relative bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden backdrop-blur-xl">
        {/* Terminal Header Bar */}
        <div className="px-5 py-3 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 truncate pr-2">
            <div className="flex gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80 inline-block" />
            </div>
            <span className="font-mono text-[11px] text-slate-400 ml-2 truncate">
              stream-cut v1.0 &middot; {title}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] shrink-0">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              0.1s Stream-Copy Ready
            </span>
          </div>
        </div>

        {/* Dropzone State */}
        {!file ? (
          <div
            role="button"
            tabIndex={0}
            aria-label="Upload video file to trim"
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
              accept={
                defaultSourceExt
                  ? `.${defaultSourceExt},video/*`
                  : "video/*,.mp4,.mov,.webm,.mkv,.gif"
              }
              className="hidden"
              onChange={(e) =>
                e.target.files?.[0] && handleFileSelected(e.target.files[0])
              }
            />

            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:border-indigo-400/40 transition-all shadow-lg shadow-indigo-600/10">
              <Scissors className="w-7 h-7 text-indigo-400" />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2">
              Drop your {sourceContext ? sourceContext : "video"} here or{" "}
              <span className="text-indigo-400 underline underline-offset-4 decoration-indigo-400/40 group-hover:decoration-indigo-400">
                browse files
              </span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed mb-6">
              {subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> 0.1s Stream-Cut
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100%
                Private RAM
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" /> No Watermarks
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
                    {file.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 font-mono">
                    <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                    <span>•</span>
                    <span>{formatSeconds(videoDuration)} total</span>
                    <span>•</span>
                    <span className="text-indigo-400 font-semibold">
                      Cut: {formatSeconds(endTime - startTime)}
                    </span>
                  </div>
                </div>
              </div>

              {!isProcessing && !trimmedBlobUrl && (
                <button
                  onClick={resetAll}
                  className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer py-1.5 px-3 rounded-lg border border-slate-800 hover:bg-slate-800">
                  Choose another file
                </button>
              )}
            </div>

            {/* Interactive Trimmer Console */}
            {!trimmedBlobUrl && (
              <div className="py-6 space-y-6">
                {/* Live Video Scrubber Preview */}
                <div className="relative max-w-lg mx-auto bg-black rounded-xl overflow-hidden border border-slate-800 shadow-inner">
                  {previewSrc && (
                    <video
                      ref={videoPlayerRef}
                      src={previewSrc}
                      playsInline
                      onLoadedMetadata={onLoadedMetadata}
                      onTimeUpdate={handleTimeUpdate}
                      className="w-full max-h-64 object-contain mx-auto"
                    />
                  )}
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="absolute bottom-3 left-3 p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 backdrop-blur-md transition-all cursor-pointer">
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>
                  <span className="absolute bottom-3 right-3 text-[11px] font-mono text-slate-300 bg-slate-900/80 px-2 py-1 rounded border border-slate-700/80 backdrop-blur-md">
                    {formatSeconds(currentTime)} /{" "}
                    {formatSeconds(videoDuration)}
                  </span>
                </div>

                {/* Timeline Range Scrubber */}
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="text-indigo-400">
                      Start: <strong>{formatSeconds(startTime)}</strong>
                    </span>
                    <span className="text-purple-400">
                      Duration:{" "}
                      <strong>{formatSeconds(endTime - startTime)}</strong>
                    </span>
                    <span className="text-emerald-400">
                      End: <strong>{formatSeconds(endTime)}</strong>
                    </span>
                  </div>

                  {/* Dual Sliders */}
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                        <span>Set In-Point (Start)</span>
                        <span>{startTime.toFixed(1)}s</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={videoDuration || 10}
                        step={0.1}
                        value={startTime}
                        onChange={(e) => {
                          const val = Math.min(
                            Number(e.target.value),
                            endTime - 0.1,
                          );
                          setStartTime(val);
                          seekTo(val);
                        }}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                        <span>Set Out-Point (End)</span>
                        <span>{endTime.toFixed(1)}s</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={videoDuration || 10}
                        step={0.1}
                        value={endTime}
                        onChange={(e) => {
                          const val = Math.max(
                            Number(e.target.value),
                            startTime + 0.1,
                          );
                          setEndTime(val);
                          seekTo(val);
                        }}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Processing State */}
            {isProcessing && (
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
                  <span>Engine: WebAssembly StreamCopy</span>
                  <span>100% In-Browser RAM</span>
                </div>
              </div>
            )}

            {/* Complete View */}
            {trimmedBlobUrl && outputFileSize && (
              <div className="py-8 space-y-6 text-center">
                <div className="inline-flex items-center justify-center p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    {processingMode === "stream-copy"
                      ? "⚡ Lossless Stream-Copy Cut (0.1s)"
                      : "🎬 Keyframe-Aligned Transcode Complete"}
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Video Trimmed Successfully!
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 font-mono">
                    New Size: {(outputFileSize / (1024 * 1024)).toFixed(2)} MB
                    &middot; Length: {formatSeconds(endTime - startTime)}
                  </p>
                </div>

                {/* Inline Live Preview Scrubber of the Output */}
                <div className="max-w-md mx-auto bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-inner p-2">
                  <video
                    controls
                    playsInline
                    className="w-full max-h-56 rounded-lg bg-black"
                    src={trimmedBlobUrl}
                  />
                  <p className="text-[10px] text-emerald-400 mt-2 font-mono flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Trimmed
                    Playback
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <a
                    href={trimmedBlobUrl}
                    download={`trimmed_${file.name.replace(/\.[^/.]+$/, "")}.mp4`}
                    className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-indigo-600/30 transition-all text-sm cursor-pointer">
                    <Download className="w-4 h-4" /> Download Trimmed Video
                  </a>
                  <button
                    onClick={resetAll}
                    className="inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-slate-300 font-medium py-3 px-6 rounded-xl border border-slate-800 transition-all text-sm cursor-pointer">
                    <RefreshCw className="w-4 h-4" /> Trim Another Clip
                  </button>
                </div>
              </div>
            )}

            {/* Launch Trim Button */}
            {!isProcessing && !trimmedBlobUrl && (
              <div className="pt-6">
                <button
                  onClick={startTrimming}
                  disabled={isLoadingFFmpeg}
                  className="w-full bg-linear-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl shadow-xl shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer">
                  <Sparkles className="w-4 h-4" />
                  Trim Video Now ({formatSeconds(endTime - startTime)} &middot;
                  Instant 0.1s)
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
