"use client";

import React, { useState, useRef, useEffect } from "react";
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
} from "lucide-react";
import confetti from "canvas-confetti";

type TargetPreset =
  | "discord-8"
  | "whatsapp-16"
  | "gmail-25"
  | "discord-nitro-50"
  | "custom";

interface VideoCompressorProps {
  initialPreset?: TargetPreset;
}

export default function VideoCompressor({
  initialPreset = "discord-8",
}: VideoCompressorProps) {
  const [loaded, setLoaded] = useState(false);
  // Default to true so you don't need to call setState inside useEffect
  const [isLoadingFFmpeg, setIsLoadingFFmpeg] = useState(true);
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load FFmpeg WebAssembly on component mount
  useEffect(() => {
    let isMounted = true;

    const loadFFmpeg = async () => {
      try {
        const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
        const ffmpeg = new FFmpeg();

        ffmpeg.on("progress", ({ progress }) => {
          setProgress(Math.round(Math.max(0, Math.min(1, progress)) * 100));
        });

        await ffmpeg.load({
          coreURL: await toBlobURL(
            `${baseURL}/ffmpeg-core.js`,
            "text/javascript",
          ),
          wasmURL: await toBlobURL(
            `${baseURL}/ffmpeg-core.wasm`,
            "application/wasm",
          ),
        });

        if (isMounted) {
          ffmpegRef.current = ffmpeg;
          setLoaded(true);
        }
      } catch (err) {
        console.error("Failed to load FFmpeg:", err);
        if (isMounted) {
          setError(
            "Failed to initialize local browser engine. Please use Chrome, Edge, or Firefox.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoadingFFmpeg(false);
        }
      }
    };

    loadFFmpeg();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    if (!file.type.startsWith("video/")) {
      setError("Please upload a valid video file (.mp4, .mov, .webm, .mkv).");
      return;
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
      setVideoDuration(videoElement.duration);
    };
    videoElement.src = URL.createObjectURL(file);
  };

  const getTargetMB = (): number => {
    switch (preset) {
      case "discord-8":
        return 7.8;
      case "whatsapp-16":
        return 15.5;
      case "gmail-25":
        return 24.5;
      case "discord-nitro-50":
        return 49.0;
      case "custom":
        return customSizeMB * 0.96;
      default:
        return 7.8;
    }
  };

  const startCompression = async () => {
    if (!videoFile || !ffmpegRef.current || !loaded) return;

    try {
      setIsCompressing(true);
      setError(null);
      setProgress(0);
      setStatusMessage("Preparing video in local memory...");

      const ffmpeg = ffmpegRef.current;
      const inputFileName =
        "input_" + videoFile.name.replace(/[^a-zA-Z0-9.]/g, "_");
      const outputFileName = "output_compressed.mp4";

      await ffmpeg.writeFile(inputFileName, await fetchFile(videoFile));

      const targetMB = getTargetMB();
      const duration = videoDuration > 0 ? videoDuration : 10;
      const audioBitrateK = 96;
      const totalBitrateK = Math.floor((targetMB * 8192) / duration);
      const videoBitrateK = Math.max(100, totalBitrateK - audioBitrateK);

      setStatusMessage(
        "Compressing with browser WebAssembly (100% private)...",
      );

      await ffmpeg.exec([
        "-i",
        inputFileName,
        "-b:v",
        `${videoBitrateK}k`,
        "-maxrate",
        `${Math.floor(videoBitrateK * 1.2)}k`,
        "-bufsize",
        `${Math.floor(videoBitrateK * 2)}k`,
        "-vf",
        "scale=-2:min(720\\,ih)",
        "-c:v",
        "libx264",
        "-preset",
        "faster",
        "-c:a",
        "aac",
        "-b:a",
        `${audioBitrateK}k`,
        "-movflags",
        "+faststart",
        outputFileName,
      ]);

      const data = await ffmpeg.readFile(outputFileName);
      const blob = new Blob([data as Uint8Array<ArrayBuffer>], {
        type: "video/mp4",
      });
      const url = URL.createObjectURL(blob);

      setCompressedBlobUrl(url);
      setOutputFileSize(blob.size);
      setIsCompressing(false);
      setProgress(100);
      setStatusMessage("Compression complete!");

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.error("Compression error:", err);
      setError(
        "An error occurred during compression. Please try a different video or file format.",
      );
      setIsCompressing(false);
    }
  };

  const resetAll = () => {
    setVideoFile(null);
    setCompressedBlobUrl(null);
    setOutputFileSize(null);
    setProgress(0);
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-white">
      {/* Target Size Presets */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          1. Select Target Platform / Limit
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          <button
            type="button"
            onClick={() => setPreset("discord-8")}
            className={`py-3 px-4 rounded-xl text-sm font-medium border flex flex-col items-center justify-center gap-1 transition-all ${
              preset === "discord-8"
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400"
                : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800"
            }`}>
            <span className="font-bold">Discord (8MB)</span>
            <span className="text-[11px] opacity-80">Free User Limit</span>
          </button>

          <button
            type="button"
            onClick={() => setPreset("gmail-25")}
            className={`py-3 px-4 rounded-xl text-sm font-medium border flex flex-col items-center justify-center gap-1 transition-all ${
              preset === "gmail-25"
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400"
                : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800"
            }`}>
            <span className="font-bold">Gmail (25MB)</span>
            <span className="text-[11px] opacity-80">Email Attachment</span>
          </button>

          <button
            type="button"
            onClick={() => setPreset("whatsapp-16")}
            className={`py-3 px-4 rounded-xl text-sm font-medium border flex flex-col items-center justify-center gap-1 transition-all ${
              preset === "whatsapp-16"
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400"
                : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800"
            }`}>
            <span className="font-bold">WhatsApp (16MB)</span>
            <span className="text-[11px] opacity-80">Direct Send Limit</span>
          </button>

          <button
            type="button"
            onClick={() => setPreset("discord-nitro-50")}
            className={`py-3 px-4 rounded-xl text-sm font-medium border flex flex-col items-center justify-center gap-1 transition-all ${
              preset === "discord-nitro-50"
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400"
                : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800"
            }`}>
            <span className="font-bold">Nitro (50MB)</span>
            <span className="text-[11px] opacity-80">High Quality</span>
          </button>

          <button
            type="button"
            onClick={() => setPreset("custom")}
            className={`py-3 px-4 rounded-xl text-sm font-medium border flex flex-col items-center justify-center gap-1 transition-all ${
              preset === "custom"
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400"
                : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800"
            }`}>
            <span className="font-bold">Custom</span>
            <span className="text-[11px] opacity-80">{customSizeMB} MB</span>
          </button>
        </div>

        {preset === "custom" && (
          <div className="mt-4 p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center gap-4">
            <span className="text-sm font-medium text-slate-300">
              Target Size (MB):
            </span>
            <input
              type="number"
              min="1"
              max="500"
              value={customSizeMB}
              onChange={(e) =>
                setCustomSizeMB(Math.max(1, Number(e.target.value)))
              }
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-24"
            />
          </div>
        )}
      </div>

      {/* Dropzone Area */}
      {!videoFile ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-700 hover:border-indigo-500 bg-slate-950/50 hover:bg-indigo-950/20 rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center group">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
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
            Supports MP4, MOV, WebM, MKV. Processed 100% locally in your
            browser.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1 rounded-full">
            <Zap className="w-3.5 h-3.5" /> No uploads to external servers •
            100% Private
          </div>
        </div>
      ) : (
        /* Video Selected / Compression Stage */
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                <FileVideo className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white truncate max-w-xs sm:max-w-md">
                  {videoFile.name}
                </h4>
                <p className="text-xs text-slate-400">
                  Original: {(videoFile.size / (1024 * 1024)).toFixed(2)} MB •
                  Target: &lt;{getTargetMB().toFixed(1)} MB
                </p>
              </div>
            </div>
            {!isCompressing && !compressedBlobUrl && (
              <button
                onClick={resetAll}
                className="text-xs text-slate-400 hover:text-white transition-colors">
                Choose another file
              </button>
            )}
          </div>

          {/* Progress / Output Display */}
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
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center">
                Heavy processing runs inside your browser. Please keep this tab
                open.
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
                  className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 px-6 rounded-xl transition-all text-sm">
                  <RefreshCw className="w-4 h-4" /> Compress Another Video
                </button>
              </div>
            </div>
          )}

          {!isCompressing && !compressedBlobUrl && (
            <div className="pt-6">
              <button
                onClick={startCompression}
                disabled={!loaded || isLoadingFFmpeg}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 text-base">
                <Sparkles className="w-5 h-5" /> Compress Video to &lt;
                {getTargetMB().toFixed(1)}MB Now
              </button>
            </div>
          )}
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="mt-4 p-4 bg-red-950/50 border border-red-800/80 rounded-xl text-red-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
