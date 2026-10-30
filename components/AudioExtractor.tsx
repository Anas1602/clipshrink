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
  RefreshCw,
  ShieldCheck,
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

      setStatusMessage("Extracting audio stream...");
      setProgress(50);

      if (selectedFormat === "wav") {
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
      {/* Format & Quality Selector */}
      <div className="mb-4">
        <div className="flex items-center justify-between px-1 mb-2">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5 text-indigo-600" />
            Output Audio Format
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {selectedFormat === "mp3-320" && "320 kbps Studio MP3"}
            {selectedFormat === "mp3-192" && "192 kbps Standard MP3"}
            {selectedFormat === "wav" && "16-Bit Lossless PCM WAV"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <button
            type="button"
            onClick={() => setSelectedFormat("mp3-320")}
            className={`py-2.5 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
              selectedFormat === "mp3-320"
                ? "bg-indigo-600 text-white font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}>
            <div>MP3 &middot; 320 kbps</div>
            <div className="text-[10px] opacity-80">
              High Bitrate (Music & Podcasts)
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedFormat("mp3-192")}
            className={`py-2.5 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
              selectedFormat === "mp3-192"
                ? "bg-indigo-600 text-white font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}>
            <div>MP3 &middot; 192 kbps</div>
            <div className="text-[10px] opacity-80">
              Standard (Smaller File Size)
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedFormat("wav")}
            className={`py-2.5 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
              selectedFormat === "wav"
                ? "bg-indigo-600 text-white font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}>
            <div>WAV &middot; Lossless</div>
            <div className="text-[10px] opacity-80">
              Uncompressed PCM (Video Editing)
            </div>
          </button>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        {!file ? (
          <div className="p-3 sm:p-4">
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
              className="border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/20 rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center focus:outline-hidden">
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*,audio/*,.mp4,.mov,.webm,.mkv,.avi,.m4v,.ogg,.opus"
                className="hidden"
                onChange={(e) =>
                  e.target.files?.[0] && handleFileSelected(e.target.files[0])
                }
              />

              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4 text-indigo-600 shadow-xs">
                <Headphones className="w-6 h-6" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-1.5">
                Drop your {sourceContext ? sourceContext : "video"} here, or
                select a file
              </h3>

              <p className="text-xs text-slate-500 font-mono mb-4">
                Supports MP4, MOV, MKV, WebM, OGG &middot; Up to 500MB Desktop /
                150MB Mobile
              </p>

              <p className="text-xs text-slate-500 max-w-md leading-relaxed mb-5">
                Extracts the audio track directly in browser RAM with zero
                server uploads and no watermarks.
              </p>

              <span className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-colors mb-5">
                <Upload className="w-4 h-4" />
                Choose File to Extract Audio
              </span>

              <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  100% In-Browser RAM &middot; 320kbps MP3 or Lossless WAV
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
                  <FileAudio className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 truncate max-w-xs sm:max-w-md text-sm sm:text-base">
                    {file.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-mono">
                    <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                    <span>•</span>
                    <span className="text-indigo-600 font-semibold uppercase">
                      Output:{" "}
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
                  <span>Local WebAssembly Audio Demuxer</span>
                  <span>Zero Server Uploads</span>
                </div>
              </div>
            )}

            {/* Completion View */}
            {extractedAudioUrl && outputFileSize && (
              <div className="py-8 space-y-6 text-center">
                <div className="inline-flex items-center justify-center p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-600 shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium mb-2">
                    {selectedFormat === "wav"
                      ? "16-Bit Uncompressed PCM WAV Track"
                      : `${selectedFormat.split("-")[1]} kbps MP3 Audio Track`}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Audio Track Extracted
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 font-mono">
                    Audio Size: {(outputFileSize / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>

                {/* Inline Live Audio Player */}
                <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-xs">
                  <div className="flex items-center justify-center gap-2 mb-2 text-xs text-slate-600 font-medium">
                    <Headphones className="w-4 h-4 text-indigo-600" />
                    <span>Preview Extracted Audio</span>
                  </div>
                  <audio controls className="w-full" src={extractedAudioUrl} />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <a
                    href={extractedAudioUrl}
                    download={`${file.name.replace(/\.[^/.]+$/, "")}.${selectedFormat === "wav" ? "wav" : "mp3"}`}
                    className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-xs transition-colors text-sm cursor-pointer">
                    <Download className="w-4 h-4" /> Download{" "}
                    {selectedFormat === "wav" ? "WAV" : "MP3"} Audio
                  </a>
                  <button
                    onClick={resetAll}
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 px-6 rounded-xl border border-slate-200 transition-colors text-sm cursor-pointer">
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
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer">
                  <Headphones className="w-4 h-4" />
                  Extract{" "}
                  {selectedFormat === "wav"
                    ? "Lossless WAV"
                    : `${selectedFormat.split("-")[1]}kbps MP3`}{" "}
                  Track
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
