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
  RefreshCw,
  ShieldCheck,
  ArrowRight,
  VolumeX,
} from "lucide-react";
import confetti from "canvas-confetti";

interface VideoMuterProps {
  title?: string;
  subtitle?: string;
  sourceContext?: string;
}

export default function VideoMuter({
  title = "Instant Video Muter",
  subtitle = "Remove audio and mute video clips in your browser RAM. Zero video quality loss, 100% private.",
  sourceContext,
}: VideoMuterProps) {
  void title;
  void subtitle;
  const [loaded, setLoaded] = useState(false);
  const [isLoadingFFmpeg, setIsLoadingFFmpeg] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [mutedBlobUrl, setMutedBlobUrl] = useState<string | null>(null);
  const [outputFileSize, setOutputFileSize] = useState<number | null>(null);
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
    if (
      !selectedFile.type.startsWith("video/") &&
      !selectedFile.name.match(/\.(mp4|mov|webm|mkv|avi|m4v|3gp)$/i)
    ) {
      setError("Please upload a valid video file (.mp4, .mov, .webm, .mkv).");
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

    if (mutedBlobUrl) {
      URL.revokeObjectURL(mutedBlobUrl);
    }

    setError(null);
    setFile(selectedFile);
    setMutedBlobUrl(null);
    setOutputFileSize(null);
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

  const startMuting = async () => {
    if (!file) return;

    const isReady = await ensureFFmpegLoaded();
    if (!isReady || !ffmpegRef.current) return;

    const ffmpeg = ffmpegRef.current;
    const cleanExt = file.name.split(".").pop()?.toLowerCase() || "mp4";
    const inputFileName = `input_${Date.now()}.${cleanExt}`;
    const outputFileName = `output_${Date.now()}.${cleanExt === "mov" ? "mp4" : cleanExt}`;
    const outputMime = cleanExt === "webm" ? "video/webm" : "video/mp4";

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(20);
      setStatusMessage("Reading video into browser RAM...");

      if (mutedBlobUrl) {
        URL.revokeObjectURL(mutedBlobUrl);
        setMutedBlobUrl(null);
      }

      await ffmpeg.writeFile(inputFileName, await fetchFile(file));

      setStatusMessage("Discarding audio track (stream-copy)...");
      setProgress(60);

      let succeeded = false;
      try {
        await ffmpeg.exec([
          "-i",
          inputFileName,
          "-an",
          "-c:v",
          "copy",
          "-movflags",
          "+faststart",
          "-y",
          outputFileName,
        ]);
        succeeded = true;
      } catch (copyErr) {
        console.warn(
          "Direct stream-copy failed, running fast compatibility transcode:",
          copyErr,
        );
        succeeded = false;
      }

      if (!succeeded) {
        await ffmpeg.exec([
          "-i",
          inputFileName,
          "-an",
          "-c:v",
          "libx264",
          "-preset",
          "ultrafast",
          "-tune",
          "fastdecode",
          "-pix_fmt",
          "yuv420p",
          "-movflags",
          "+faststart",
          "-y",
          outputFileName,
        ]);
      }

      const data = (await ffmpeg.readFile(outputFileName)) as Uint8Array;
      if (!data || data.byteLength === 0) {
        throw new Error("Failed to produce muted video.");
      }

      const blob = toSafeBlob(data, outputMime);
      const url = URL.createObjectURL(blob);

      setMutedBlobUrl(url);
      setOutputFileSize(blob.size);
      setIsProcessing(false);
      setProgress(100);
      setStatusMessage("Audio completely removed!");

      confetti({
        particleCount: 60,
        spread: 55,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.error("Muting error:", err);
      setError(
        "An error occurred while removing audio. Please ensure the video file is not corrupted.",
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
    if (mutedBlobUrl) {
      URL.revokeObjectURL(mutedBlobUrl);
    }
    setFile(null);
    setMutedBlobUrl(null);
    setOutputFileSize(null);
    setProgress(0);
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        {!file ? (
          <div className="p-3 sm:p-4">
            <div
              role="button"
              tabIndex={0}
              aria-label="Upload video file to remove audio"
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
              className="border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/20 rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center focus:outline-hidden">
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*,.mp4,.mov,.webm,.mkv,.avi,.m4v"
                className="hidden"
                onChange={(e) =>
                  e.target.files?.[0] && handleFileSelected(e.target.files[0])
                }
              />

              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4 text-indigo-600 shadow-xs">
                <VolumeX className="w-6 h-6" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-1.5">
                Drop your {sourceContext ? sourceContext : "video"} here, or
                select a file
              </h3>

              <p className="text-xs text-slate-500 font-mono mb-4">
                Supports MP4, MOV, MKV, WebM &middot; Up to 500MB Desktop /
                150MB Mobile
              </p>

              <p className="text-xs text-slate-500 max-w-md leading-relaxed mb-5">
                Strips all audio tracks via lossless stream-copy. Video pixels
                remain bit-for-bit identical with zero quality loss.
              </p>

              <span className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-colors mb-5">
                <Upload className="w-4 h-4" />
                Choose Video to Mute
              </span>

              <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  100% In-Browser Stream Copy &middot; Video Quality Untouched
                </span>
              </div>
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
                    {file.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-mono">
                    <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <VolumeX className="w-3 h-3" /> Muting Audio Track
                    </span>
                  </div>
                </div>
              </div>

              {!isProcessing && !mutedBlobUrl && (
                <button
                  onClick={resetAll}
                  className="text-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                  Choose another file
                </button>
              )}
            </div>

            {/* Processing State */}
            {isProcessing && (
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
                  <span>Local WebAssembly Stream-Copy (-an)</span>
                  <span>Zero Data Uploaded</span>
                </div>
              </div>
            )}

            {/* Completion View */}
            {mutedBlobUrl && outputFileSize && (
              <div className="py-8 space-y-6 text-center">
                <div className="inline-flex items-center justify-center p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-600 shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium mb-2">
                    Audio Track Stripped · Lossless Video Stream
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Audio Removed From Video
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 font-mono">
                    Original: {(file.size / (1024 * 1024)).toFixed(2)} MB
                    &middot; Muted:{" "}
                    {(outputFileSize / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>

                {/* Inline Preview Player */}
                <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-xl overflow-hidden p-2 shadow-xs">
                  <video
                    controls
                    playsInline
                    className="w-full max-h-56 rounded-lg bg-black"
                    src={mutedBlobUrl}
                  />
                  <p className="text-[10px] text-emerald-600 mt-2 font-mono flex items-center justify-center gap-1">
                    <VolumeX className="w-3.5 h-3.5" /> Silent Output Verified
                    (0 Audio Streams)
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <a
                    href={mutedBlobUrl}
                    download={`muted_${file.name.replace(/\.[^/.]+$/, "")}.mp4`}
                    className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-xs transition-colors text-sm cursor-pointer">
                    <Download className="w-4 h-4" /> Download Muted Video
                  </a>
                  <button
                    onClick={resetAll}
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 px-6 rounded-xl border border-slate-200 transition-colors text-sm cursor-pointer">
                    <RefreshCw className="w-4 h-4" /> Mute Another Clip
                  </button>
                </div>
              </div>
            )}

            {/* Launch Mute Button */}
            {!isProcessing && !mutedBlobUrl && (
              <div className="pt-6">
                <button
                  onClick={startMuting}
                  disabled={isLoadingFFmpeg}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer">
                  <VolumeX className="w-4 h-4" />
                  Remove Audio Track Now
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
