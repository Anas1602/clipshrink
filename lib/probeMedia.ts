import type { FFmpeg } from "@ffmpeg/ffmpeg";

/**
 * What ffmpeg itself reads from a file header.
 *
 * Why this exists: an HTML <video> element cannot be trusted for this. On
 * Windows Chrome without HEVC support it never loads metadata for iPhone
 * footage, and MediaRecorder .webm files report Infinity. ffmpeg reads the
 * container directly, so it works for every file we can actually process.
 */
export interface MediaProbe {
  /** Seconds. 0 means unknown (e.g. "Duration: N/A"); never guess a value. */
  durationSec: number;
  /** First real video stream codec as ffmpeg names it: "h264", "hevc", "vp9"... */
  videoCodec: string | null;
  /** True only for plain 8-bit 4:2:0, which every player and chat app decodes. */
  videoIs420_8bit: boolean;
  /** First audio stream codec: "aac", "mp3", "opus", "ac3"... */
  audioCodec: string | null;
}

/** Pure parser, so it can be tested against captured ffmpeg output. */
export function parseProbeLog(log: string): MediaProbe {
  let durationSec = 0;
  const d = log.match(/Duration:\s*(\d+):(\d{2}):(\d{2}(?:\.\d+)?)/);
  if (d) {
    durationSec = Number(d[1]) * 3600 + Number(d[2]) * 60 + Number(d[3]);
  }

  let videoCodec: string | null = null;
  let videoIs420_8bit = false;
  const videoRe = /Stream #\d+:\d+[^:\n]*: Video: (\w+)([^\n]*)/g;
  for (const m of log.matchAll(videoRe)) {
    // Skip cover art embedded in audio files (mp3/m4a "attached pic").
    if (m[2].includes("attached pic")) continue;
    videoCodec = m[1].toLowerCase();
    // "yuv420p10le" must NOT match, so require a word boundary after the "p".
    videoIs420_8bit = /\byuvj?420p\b/.test(m[2]);
    break;
  }

  const a = log.match(/Stream #\d+:\d+[^:\n]*: Audio: (\w+)/);
  const audioCodec = a ? a[1].toLowerCase() : null;

  return { durationSec, videoCodec, videoIs420_8bit, audioCodec };
}

/**
 * Runs `ffmpeg -i <file>` and parses the header dump it prints.
 * The file must already be written to ffmpeg's virtual FS.
 * ffmpeg exits non-zero ("At least one output file must be specified");
 * that is expected, we only want the log.
 */
export async function probeMedia(
  ffmpeg: FFmpeg,
  inputFileName: string,
): Promise<MediaProbe> {
  const lines: string[] = [];
  const onLog = ({ message }: { message: string }) => {
    lines.push(message);
  };
  ffmpeg.on("log", onLog);
  try {
    await ffmpeg.exec(["-hide_banner", "-i", inputFileName]);
  } catch {
    // Non-fatal: parse whatever was logged.
  } finally {
    ffmpeg.off("log", onLog);
  }
  return parseProbeLog(lines.join("\n"));
}

/* ------------------------------------------------------------------ */
/* Converter: when is `-c copy` into an MP4 actually safe?             */
/* ------------------------------------------------------------------ */

export type Mp4Plan =
  | "stream-copy" // video + audio both copied, instant and lossless
  | "audio-transcode" // video copied, audio re-encoded to AAC
  | "transcode" // video must be re-encoded to H.264
  | "try-copy"; // probe could not identify a video stream: old behaviour

// A different container is not a different codec. Copying HEVC, VP9, AV1 or
// MPEG-2 into .mp4 "succeeds" but yields a file that still won't play in
// Windows Media Player, QuickTime, Discord or WhatsApp. Only H.264 is safe.
const COPY_SAFE_VIDEO = new Set(["h264"]);
const COPY_SAFE_AUDIO = new Set(["aac", "mp3"]);

export function planMp4Conversion(p: MediaProbe): Mp4Plan {
  if (!p.videoCodec) return "try-copy";
  const videoOk = COPY_SAFE_VIDEO.has(p.videoCodec) && p.videoIs420_8bit;
  if (!videoOk) return "transcode";
  const audioOk = !p.audioCodec || COPY_SAFE_AUDIO.has(p.audioCodec);
  return audioOk ? "stream-copy" : "audio-transcode";
}

/* ------------------------------------------------------------------ */
/* Compressor: is re-encoding pointless?                               */
/* ------------------------------------------------------------------ */

/** Keep a little headroom: platform limits are fuzzy (MB vs MiB, overhead). */
export const FAST_PASS_MARGIN = 0.98;

/**
 * True when the file already fits and is already a universally playable
 * MP4 (H.264 8-bit 4:2:0, AAC or silent). A small HEVC .mov is under the
 * limit too but still would not play, so size alone is never enough.
 */
export function isAlreadyShareable(
  fileName: string,
  sizeBytes: number,
  limitBytes: number,
  p: MediaProbe,
): boolean {
  return (
    /\.(mp4|m4v)$/i.test(fileName) &&
    sizeBytes <= limitBytes * FAST_PASS_MARGIN &&
    p.videoCodec === "h264" &&
    p.videoIs420_8bit &&
    (!p.audioCodec || p.audioCodec === "aac")
  );
}
