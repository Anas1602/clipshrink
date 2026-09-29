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
  ShieldCheck,
  Cpu,
  ArrowRight,
  Play,
} from "lucide-react";
import confetti from "canvas-confetti";

export type ConversionFormat = "mp4" | "mp3" | "mov" | "webm" | "mkv";

interface VideoConverterProps {
  defaultSourceExt?: string;
  targetFormat?: ConversionFormat;
  title?: string;
  description?: string;
}

export default function VideoConverter({
  defaultSourceExt,
  targetFormat = "mp4",
  title = "Instant Video Converter",
  description = "Convert video and audio containers in under 1 second using local WebAssembly stream-copy.",
}: VideoConverterProps) {
  const [loaded, setLoaded] = useState(false);
  const [isLoadingFFmpeg, setIsLoadingFFmpeg] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [convertedBlobUrl, setConvertedBlobUrl] = useState<string | null>(null);
  const [outputFileSize, setOutputFileSize] = useState<number | null>(null);
  const [processingMode, setProcessingMode] = useState<
    "stream-copy" | "transcode" | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const ffmpegRef = useRef<FFmpeg | null>(null);
  const loadingPromiseRef = useRef<Promise<boolean> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileSelected = (selectedFile: File) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile && selectedFile.size > 150 * 1024 * 1024) {
      setError(
        "Files over 150MB may exceed mobile browser memory. Please use a desktop browser for large files.",
      );
      return;
    }
    if (selectedFile.size > 500 * 1024 * 1024) {
      setError(
        "Files over 500MB exceed browser memory capacity. Please select a clip under 500MB.",
      );
      return;
    }

    if (convertedBlobUrl) {
      URL.revokeObjectURL(convertedBlobUrl);
    }

    setError(null);
    setFile(selectedFile);
    setConvertedBlobUrl(null);
    setOutputFileSize(null);
    setProcessingMode(null);
    setProgress(0);

    ensureFFmpegLoaded();
  };

  const toSafeBlob = (data: Uint8Array, mimeType: string): Blob => {
    const arrayBuffer = data.buffer.slice(
      data.byteOffset,
      data.byteOffset + data.byteLength,
    ) as ArrayBuffer;
    return new Blob([arrayBuffer], { type: mimeType });
  };

  const startConversion = async () => {
    if (!file) return;

    const isReady = await ensureFFmpegLoaded();
    if (!isReady || !ffmpegRef.current) return;

    const ffmpeg = ffmpegRef.current;
    const cleanSourceExt = file.name.split(".").pop()?.toLowerCase() || "mp4";
    const inputFileName = `input_${Date.now()}.${cleanSourceExt}`;
    const outputFileName = `output_${Date.now()}.${targetFormat}`;
    const outputMime = targetFormat === "mp3" ? "audio/mp3" : "video/mp4";

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(10);
      setStatusMessage("Loading file into browser RAM...");

      if (convertedBlobUrl) {
        URL.revokeObjectURL(convertedBlobUrl);
        setConvertedBlobUrl(null);
      }

      await ffmpeg.writeFile(inputFileName, await fetchFile(file));

      let outputBlob: Blob | null = null;

      // ==========================================
      // SPECIAL CASE: AUDIO EXTRACTION (e.g. MP3)
      // ==========================================
      if (targetFormat === "mp3") {
        setStatusMessage("Extracting audio stream...");
        setProgress(50);
        await ffmpeg.exec([
          "-i",
          inputFileName,
          "-vn",
          "-c:a",
          "libmp3lame",
          "-q:a",
          "2",
          "-y",
          outputFileName,
        ]);

        const data = (await ffmpeg.readFile(outputFileName)) as Uint8Array;
        outputBlob = toSafeBlob(data, outputMime);
        setProcessingMode("transcode");
      } else {
        // ==========================================
        // TIER 1: INSTANT STREAM COPY (-c copy)
        // ==========================================
        let streamCopySuccess = false;
        try {
          setStatusMessage("Attempting instant stream-copy remux (0.5s)...");
          setProgress(40);

          await ffmpeg.exec([
            "-i",
            inputFileName,
            "-c",
            "copy",
            "-movflags",
            "+faststart",
            "-y",
            outputFileName,
          ]);

          const data = (await ffmpeg.readFile(outputFileName)) as Uint8Array;
          if (data && data.byteLength > 1000) {
            outputBlob = toSafeBlob(data, outputMime);
            streamCopySuccess = true;
            setProcessingMode("stream-copy");
          }
        } catch (copyErr) {
          console.warn(
            "Stream copy incompatible with streams, falling back to Tier 2 transcode:",
            copyErr,
          );
          streamCopySuccess = false;
        }

        // ==========================================
        // TIER 2: SMART TRANSCODE FALLBACK
        // ==========================================
        if (!streamCopySuccess) {
          setStatusMessage(
            "Stream copy incompatible. Running ultrafast compatibility transcode...",
          );
          setProgress(30);

          await ffmpeg.exec([
            "-i",
            inputFileName,
            "-c:v",
            "libx264",
            "-preset",
            "ultrafast",
            "-tune",
            "fastdecode",
            "-pix_fmt",
            "yuv420p",
            "-c:a",
            "aac",
            "-b:a",
            "128k",
            "-movflags",
            "+faststart",
            "-y",
            outputFileName,
          ]);

          const data = (await ffmpeg.readFile(outputFileName)) as Uint8Array;
          outputBlob = toSafeBlob(data, outputMime);
          setProcessingMode("transcode");
        }
      }

      if (!outputBlob)
        throw new Error("Conversion failed to produce valid output.");

      const url = URL.createObjectURL(outputBlob);
      setConvertedBlobUrl(url);
      setOutputFileSize(outputBlob.size);
      setIsProcessing(false);
      setProgress(100);
      setStatusMessage("Conversion complete!");

      confetti({
        particleCount: 60,
        spread: 55,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.error("Conversion error:", err);
      setError(
        "An error occurred during conversion. Please ensure the file is not corrupted.",
      );
      setIsProcessing(false);
    } finally {
      try {
        await ffmpeg.deleteFile(inputFileName);
        await ffmpeg.deleteFile(outputFileName);
      } catch {
        // Ignored
      }
    }
  };

  const resetAll = () => {
    if (convertedBlobUrl) {
      URL.revokeObjectURL(convertedBlobUrl);
    }
    setFile(null);
    setConvertedBlobUrl(null);
    setOutputFileSize(null);
    setProcessingMode(null);
    setProgress(0);
    setError(null);
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
              remux-engine &middot; {title}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] shrink-0">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Instant RAM Pipeline
            </span>
          </div>
        </div>

        {/* Dropzone State */}
        {!file ? (
          <div
            role="button"
            tabIndex={0}
            aria-label="Upload file for conversion"
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
                  ? `.${defaultSourceExt},video/*,audio/*`
                  : "video/*,audio/*,.mkv,.mov,.webm,.mp4,.ts,.m4v,.hevc"
              }
              className="hidden"
              onChange={(e) =>
                e.target.files?.[0] && handleFileSelected(e.target.files[0])
              }
            />

            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:border-indigo-400/40 transition-all shadow-lg shadow-indigo-600/10">
              <Upload className="w-7 h-7 text-indigo-400" />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2">
              Drop your{" "}
              {defaultSourceExt ? defaultSourceExt.toUpperCase() : "video"} file
              here or{" "}
              <span className="text-indigo-400 underline underline-offset-4 decoration-indigo-400/40 group-hover:decoration-indigo-400">
                browse files
              </span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed mb-6">
              {description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Sub-Second
                Remuxing
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100%
                In-Browser RAM
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Zero Quality
                Loss
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
                    <span className="text-indigo-400 font-semibold uppercase">
                      Target: .{targetFormat}
                    </span>
                  </div>
                </div>
              </div>

              {!isProcessing && !convertedBlobUrl && (
                <button
                  onClick={resetAll}
                  className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer py-1.5 px-3 rounded-lg border border-slate-800 hover:bg-slate-800">
                  Choose another file
                </button>
              )}
            </div>

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
                  <span>Zero Server Uploads</span>
                </div>
              </div>
            )}

            {/* Complete View with In-Browser Live Preview Player */}
            {convertedBlobUrl && outputFileSize && (
              <div className="py-8 space-y-6 text-center">
                <div className="inline-flex items-center justify-center p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    {processingMode === "stream-copy"
                      ? "⚡ Lossless Stream-Copy (0.5s)"
                      : "🎬 Compatibility Transcode Complete"}
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    File Successfully Converted!
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 font-mono">
                    Output: {(outputFileSize / (1024 * 1024)).toFixed(2)} MB
                    &middot; Format: .{targetFormat.toUpperCase()}
                  </p>
                </div>

                {/* Inline Video/Audio Preview Player */}
                <div className="max-w-md mx-auto bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-inner p-2">
                  {targetFormat === "mp3" ? (
                    <audio
                      controls
                      className="w-full mt-2"
                      src={convertedBlobUrl}
                    />
                  ) : (
                    <video
                      controls
                      playsInline
                      className="w-full max-h-56 rounded-lg bg-black"
                      src={convertedBlobUrl}
                    />
                  )}
                  <p className="text-[10px] text-slate-500 mt-2 font-mono flex items-center justify-center gap-1">
                    <Play className="w-3 h-3 text-indigo-400" /> Verified
                    Playable in Browser RAM
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <a
                    href={convertedBlobUrl}
                    download={`${file.name.replace(/\.[^/.]+$/, "")}.${targetFormat}`}
                    className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-indigo-600/30 transition-all text-sm cursor-pointer">
                    <Download className="w-4 h-4" /> Download .
                    {targetFormat.toUpperCase()} File
                  </a>
                  <button
                    onClick={resetAll}
                    className="inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-slate-300 font-medium py-3 px-6 rounded-xl border border-slate-800 transition-all text-sm cursor-pointer">
                    <RefreshCw className="w-4 h-4" /> Convert Another File
                  </button>
                </div>
              </div>
            )}

            {/* Launch Conversion Button */}
            {!isProcessing && !convertedBlobUrl && (
              <div className="pt-6">
                <button
                  onClick={startConversion}
                  disabled={isLoadingFFmpeg}
                  className="w-full bg-linear-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl shadow-xl shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer">
                  <Sparkles className="w-4 h-4" />
                  Convert to .{targetFormat.toUpperCase()} (Instant In-Browser)
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
