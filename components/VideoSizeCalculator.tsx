"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, Film, HardDrive } from "lucide-react";

interface SizePreset {
  label: string;
  sizeMB: number;
  safeMB: number;
  compressorHref: string;
  compressorLabel: string;
}

const SIZE_PRESETS: SizePreset[] = [
  {
    label: "8 MB (Discord Classic)",
    sizeMB: 8,
    safeMB: 7.2,
    compressorHref: "/video/compress-for-discord-8mb",
    compressorLabel: "Compress Video to 8MB",
  },
  {
    label: "10 MB (Slack / Portals)",
    sizeMB: 10,
    safeMB: 9.0,
    compressorHref: "/video/compress-mp4-to-10mb",
    compressorLabel: "Compress Video to 10MB",
  },
  {
    label: "16 MB (WhatsApp)",
    sizeMB: 16,
    safeMB: 14.2,
    compressorHref: "/video/compress-for-whatsapp",
    compressorLabel: "Compress for WhatsApp (16MB)",
  },
  {
    label: "20 MB (Discord Free / Outlook)",
    sizeMB: 20,
    safeMB: 18.0,
    compressorHref: "/video/compress-video-for-email",
    compressorLabel: "Compress Video to 20MB",
  },
  {
    label: "25 MB (Gmail / Twitter)",
    sizeMB: 25,
    safeMB: 22.0,
    compressorHref: "/video/compress-for-gmail-25mb",
    compressorLabel: "Compress for Gmail (25MB)",
  },
  {
    label: "50 MB (Nitro Basic / Forms)",
    sizeMB: 50,
    safeMB: 46.5,
    compressorHref: "/video/compress-mp4-to-50mb",
    compressorLabel: "Compress Video to 50MB",
  },
  {
    label: "100 MB (Web Portals / LMS)",
    sizeMB: 100,
    safeMB: 93.0,
    compressorHref: "/video/compress-mp4-to-100mb",
    compressorLabel: "Compress Video to 100MB",
  },
];

interface QualityProfile {
  id: string;
  name: string;
  desc: string;
  videoKbps: number;
  audioKbps: number;
}

const QUALITY_PROFILES: QualityProfile[] = [
  {
    id: "720p-screen",
    name: "720p Screen Recording / Slides (30fps)",
    desc: "Low motion: Loom, Zoom, PowerPoint, code walkthroughs",
    videoKbps: 600,
    audioKbps: 96,
  },
  {
    id: "720p-standard",
    name: "720p HD Standard Video (30fps)",
    desc: "Balanced: Phone clips, talking-head videos, general web sharing",
    videoKbps: 1200,
    audioKbps: 96,
  },
  {
    id: "1080p-hd",
    name: "1080p Full HD Video (30fps)",
    desc: "High detail: Camera recordings, product demos, YouTube clips",
    videoKbps: 2500,
    audioKbps: 128,
  },
  {
    id: "1080p-60",
    name: "1080p Gaming / High Motion (60fps)",
    desc: "Fast motion: OBS, ShadowPlay, sports, action camera footage",
    videoKbps: 4500,
    audioKbps: 128,
  },
  {
    id: "4k-iphone",
    name: "Raw iPhone / 4K Camera (Uncompressed Default)",
    desc: "Factory camera bitrate before compression (~22 Mbps)",
    videoKbps: 22000,
    audioKbps: 192,
  },
];

function formatDuration(totalSeconds: number): string {
  if (totalSeconds < 60) {
    return `${Math.round(totalSeconds)} seconds`;
  }
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.round(totalSeconds % 60);
  if (secs === 0) return `${mins} min`;
  return `${mins} min ${secs} sec`;
}

export default function VideoSizeCalculator() {
  const [selectedPresetIdx, setSelectedPresetIdx] = useState<number>(4); // Default 25MB
  const [selectedProfileId, setSelectedProfileId] =
    useState<string>("720p-standard");
  const [customDurationSec, setCustomDurationSec] = useState<number>(60);

  const activePreset = SIZE_PRESETS[selectedPresetIdx];
  const activeProfile =
    QUALITY_PROFILES.find((p) => p.id === selectedProfileId) ||
    QUALITY_PROFILES[1];

  const totalKbps = activeProfile.videoKbps + activeProfile.audioKbps;

  // How long can a video of activePreset.sizeMB be at activeProfile bitrate?
  const maxDurationSeconds = (activePreset.sizeMB * 8192) / totalKbps;

  // For a given customDurationSec, what bitrate does ClipShrink use to fit activePreset.safeMB?
  const requiredTotalKbps = Math.max(
    96,
    Math.floor((activePreset.safeMB * 8192) / Math.max(1, customDurationSec)),
  );
  const requiredVideoKbps = Math.max(45, requiredTotalKbps - 96);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
        {/* Step 1: Select Target File Size */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-3">
            1. Select Target File Size Limit
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SIZE_PRESETS.map((preset, idx) => (
              <button
                key={preset.sizeMB}
                type="button"
                onClick={() => setSelectedPresetIdx(idx)}
                className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all text-left border cursor-pointer ${
                  selectedPresetIdx === idx
                    ? "bg-indigo-600 text-white border-indigo-600 font-semibold shadow-xs"
                    : "bg-slate-50/70 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70"
                }`}>
                <div className="font-mono text-sm font-bold">
                  {preset.sizeMB} MB
                </div>
                <div
                  className={`text-[11px] truncate ${
                    selectedPresetIdx === idx
                      ? "text-indigo-100"
                      : "text-slate-500"
                  }`}>
                  {preset.label.split("(")[1]?.replace(")", "") || preset.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Select Video Resolution & Motion Type */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-3">
            2. Select Video Resolution & Content Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {QUALITY_PROFILES.map((profile) => {
              const isSelected = profile.id === selectedProfileId;
              return (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => setSelectedProfileId(profile.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-indigo-50/60 border-indigo-600 ring-1 ring-indigo-600"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      {profile.name}
                    </span>
                    <span className="text-[11px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-semibold shrink-0">
                      {(profile.videoKbps / 1000).toFixed(1)} Mbps
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{profile.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Result Output Panel */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-indigo-600 uppercase">
              <Film className="w-3.5 h-3.5" />
              Estimated Video Length in {activePreset.sizeMB} MB
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
              {formatDuration(maxDurationSeconds)}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              At{" "}
              <strong className="text-slate-700">
                {activeProfile.videoKbps} kbps
              </strong>{" "}
              video +{" "}
              <strong className="text-slate-700">
                {activeProfile.audioKbps} kbps
              </strong>{" "}
              AAC audio ({activeProfile.name}), a{" "}
              <strong className="text-slate-700">
                {activePreset.sizeMB} MB
              </strong>{" "}
              file holds approximately{" "}
              <strong className="text-slate-700">
                {formatDuration(maxDurationSeconds)}
              </strong>{" "}
              of footage.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-indigo-600" />
                Bitrate for Your Clip Length:
              </span>
              <span className="font-mono font-bold text-indigo-600">
                {customDurationSec}s ({formatDuration(customDurationSec)})
              </span>
            </div>

            <input
              type="range"
              min={5}
              max={600}
              step={5}
              value={customDurationSec}
              onChange={(e) => setCustomDurationSec(Number(e.target.value))}
              aria-label="Clip duration in seconds"
              className="w-full accent-indigo-600 cursor-pointer"
            />

            <p className="text-[11px] text-slate-500 leading-relaxed font-mono">
              To fit a <strong>{customDurationSec}s</strong> video under{" "}
              <strong>{activePreset.sizeMB}MB</strong>, ClipShrink encodes at{" "}
              <strong className="text-slate-900">
                {requiredVideoKbps} kbps
              </strong>{" "}
              video + 96 kbps audio (~{activePreset.safeMB}MB output).
            </p>

            <Link
              href={activePreset.compressorHref}
              className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition-colors shadow-xs">
              <HardDrive className="w-3.5 h-3.5" />
              {activePreset.compressorLabel} Now
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
