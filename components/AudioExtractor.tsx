"use client";

import React, { useState, useRef, useCallback } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  FileAudio,
  Download,
  Sparkles,
  RefreshCw,
  Zap,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Headphones,
  Music,
} from "lucide-react";
import confetti from "canvas-confetti";

export type AudioTargetFormat = "mp3-320" | "mp3-192" | "wav";

interface AudioExtractorProps {
  defaultFormat?: AudioTargetFormat;
  sourceContext?: string;
}

export default function AudioExtractor({
  defaultFormat = "mp3-320",
  sourceContext,
}: AudioExtractorProps) {
  const [loaded, setLoaded] = useState(false);
  const [isLoadingFFmpeg, setIsLoadingFFmpeg] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [selectedFormat, setSelectedFormat] =
    useState<AudioTargetFormat>(defaultFormat);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [extractedAudioUrl, setExtractedAudioUrl] = useState<string | null>(
    null,
  );
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
        setStatusMessage("Initializing audio engine...");
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

    if (extractedAudioUrl) {
      URL.revokeObjectURL(extractedAudioUrl);
    }

    setError(null);
    setFile(selectedFile);
    setExtractedAudioUrl(null);
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

  const startExtraction = async () => {
    if (!file) return;

    const isReady = await ensureFFmpegLoaded();
    if (!isReady || !ffmpegRef.current) return;

    const ffmpeg = ffmpegRef.current;
    const cleanExt = file.name.split(".").pop()?.toLowerCase() || "mp4";
    const inputFileName = `input_${Date.now()}.${cleanExt}`;
    const isWav = selectedFormat === "wav";
    const outputExt = isWav ? "wav" : "mp3";
    const outputFileName = `output_${Date.now()}.${outputExt}`;
    const outputMime = isWav ? "audio/wav" : "audio/mp3";

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(15);
      setStatusMessage("Loading file into browser RAM...");

      if (extractedAudioUrl) {
        URL.revokeObjectURL(extractedAudioUrl);
        setExtractedAudioUrl(null);
      }

      await ffmpeg.writeFile(inputFileName, await fetchFile(file));

      setStatusMessage("Extracting and encoding audio stream...");
      setProgress(50);

      // FFmpeg audio extraction arguments
      if (selectedFormat === "wav") {
        // Lossless 16-bit uncompressed PCM WAV
        await ffmpeg.exec([
          "-i",
          inputFileName,
          "-vn",
          "-c:a",
          "pcm_s16le",
          "-y",
          outputFileName,
        ]);
      } else if (selectedFormat === "mp3-320") {
        // Studio HQ 320kbps MP3
        await ffmpeg.exec([
          "-i",
          inputFileName,
          "-vn",
          "-c:a",
          "libmp3lame",
          "-b:a",
          "320k",
          "-y",
          outputFileName,
        ]);
      } else {
        // Standard 192kbps MP3
        await ffmpeg.exec([
          "-i",
          inputFileName,
          "-vn",
          "-c:a",
          "libmp3lame",
          "-b:a",
          "192k",
          "-y",
          outputFileName,
        ]);
      }

      const data = (await ffmpeg.readFile(outputFileName)) as Uint8Array;
      if (!data || data.byteLength === 0) {
        throw new Error("Failed to extract audio track.");
      }

      const blob = toSafeBlob(data, outputMime);
      const url = URL.createObjectURL(blob);

      setExtractedAudioUrl(url);
      setOutputFileSize(blob.size);
      setIsProcessing(false);
      setProgress(100);
      setStatusMessage("Audio extracted successfully!");

      confetti({
        particleCount: 60,
        spread: 55,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.error("Extraction error:", err);
      setError(
        "An error occurred while extracting audio. Please ensure the file has a valid audio track.",
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
    if (extractedAudioUrl) {
      URL.revokeObjectURL(extractedAudioUrl);
    }
    setFile(null);
    setExtractedAudioUrl(null);
    setOutputFileSize(null);
    setProgress(0);
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Step 2: Quality & Format Selector */}
      <div className="mb-4">
        <div className="flex items-center justify-between px-1 mb-2.5">
          <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5 text-indigo-400" />
            Select Output Audio Quality
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            {selectedFormat === "mp3-320" && "320 kbps Studio HQ"}
            {selectedFormat === "mp3-192" && "192 kbps Standard"}
            {selectedFormat === "wav" && "Uncompressed PCM WAV"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl backdrop-blur-xl shadow-inner">
          <button
            type="button"
            onClick={() => setSelectedFormat("mp3-320")}
            className={`py-2.5 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
              selectedFormat === "mp3-320"
                ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}>
            <div>MP3 &middot; 320 kbps</div>
            <div className="text-[10px] opacity-75">
              Studio Quality (Best for Music & Podcasts)
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedFormat("mp3-192")}
            className={`py-2.5 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
              selectedFormat === "mp3-192"
                ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}>
            <div>MP3 &middot; 192 kbps</div>
            <div className="text-[10px] opacity-75">
              Standard Quality (Compact File Size)
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedFormat("wav")}
            className={`py-2.5 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
              selectedFormat === "wav"
                ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}>
            <div>WAV &middot; Lossless</div>
            <div className="text-[10px] opacity-75">
              Uncompressed (Best for Video Editors)
            </div>
          </button>
        </div>
      </div>

      {/* Main Console Container */}
      <div className="relative bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden backdrop-blur-xl">
        {/* Terminal Header Bar */}
        <div className="px-5 py-3 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80 inline-block" />
            </div>
            <span className="font-mono text-[11px] text-slate-400 ml-2">
              audio-extract v1.0 [libmp3lame + pcm_s16le]
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Instant RAM Extraction
            </span>
          </div>
        </div>

        {/* Dropzone State */}
        {!file ? (
          <div
            role="button"
            tabIndex={0}
            aria-label="Upload video file to extract audio"
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
              accept="video/*,audio/*,.mp4,.mov,.webm,.mkv,.avi,.m4v,.ogg"
              className="hidden"
              onChange={(e) =>
                e.target.files?.[0] && handleFileSelected(e.target.files[0])
              }
            />

            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:border-indigo-400/40 transition-all shadow-lg shadow-indigo-600/10">
              <Upload className="w-7 h-7 text-indigo-400" />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2">
              Drop your {sourceContext ? sourceContext : "video"} here or{" "}
              <span className="text-indigo-400 underline underline-offset-4 decoration-indigo-400/40 group-hover:decoration-indigo-400">
                browse files
              </span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed mb-6">
              Rips audio in 1 second. Zero server uploads, zero ads, and 100%
              private in-browser memory.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> 1-Second
                Extraction
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100%
                In-Browser RAM
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Up to 320k
                Studio MP3
              </span>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            {/* File Info Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                  <FileAudio className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white truncate max-w-xs sm:max-w-md text-sm sm:text-base">
                    {file.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 font-mono">
                    <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                    <span>•</span>
                    <span className="text-indigo-400 font-semibold uppercase">
                      Extracting to:{" "}
                      {selectedFormat === "wav"
                        ? "WAV Lossless"
                        : `MP3 (${selectedFormat.split("-")[1]}k)`}
                    </span>
                  </div>
                </div>
              </div>

              {!isProcessing && !extractedAudioUrl && (
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
                  <span>Engine: WebAssembly Audio Demuxer</span>
                  <span>Zero Server Uploads</span>
                </div>
              </div>
            )}

            {/* Completed State with Live Inline Audio Player */}
            {extractedAudioUrl && outputFileSize && (
              <div className="py-8 space-y-6 text-center">
                <div className="inline-flex items-center justify-center p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    ⚡{" "}
                    {selectedFormat === "wav"
                      ? "Uncompressed WAV Track"
                      : `Pristine ${selectedFormat.split("-")[1]}k MP3 Track`}
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Audio Extracted Successfully!
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 font-mono">
                    Audio Size: {(outputFileSize / (1024 * 1024)).toFixed(2)} MB
                    &middot; Extracted in &lt; 1 Second
                  </p>
                </div>

                {/* Inline Live Audio Player */}
                <div className="max-w-md mx-auto bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-inner">
                  <div className="flex items-center justify-center gap-2 mb-2 text-xs text-slate-400">
                    <Headphones className="w-4 h-4 text-indigo-400" />
                    <span>Verify Audio Output</span>
                  </div>
                  <audio controls className="w-full" src={extractedAudioUrl} />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <a
                    href={extractedAudioUrl}
                    download={`${file.name.replace(/\.[^/.]+$/, "")}.${selectedFormat === "wav" ? "wav" : "mp3"}`}
                    className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-indigo-600/30 transition-all text-sm cursor-pointer">
                    <Download className="w-4 h-4" /> Download Extracted Audio
                  </a>
                  <button
                    onClick={resetAll}
                    className="inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-slate-300 font-medium py-3 px-6 rounded-xl border border-slate-800 transition-all text-sm cursor-pointer">
                    <RefreshCw className="w-4 h-4" /> Extract Another File
                  </button>
                </div>
              </div>
            )}

            {/* Launch Button */}
            {!isProcessing && !extractedAudioUrl && (
              <div className="pt-6">
                <button
                  onClick={startExtraction}
                  disabled={isLoadingFFmpeg}
                  className="w-full bg-linear-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl shadow-xl shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer">
                  <Sparkles className="w-4 h-4" />
                  Extract Audio Track Now (Instant 1s)
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
