import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

export interface LoadedFFmpegResult {
  ffmpeg: FFmpeg;
  isMultiThreaded: boolean;
  threadCount: number;
}

export async function loadProgressiveFFmpeg(
  onProgress?: (progress: number) => void,
): Promise<LoadedFFmpegResult> {
  const isBrowser = typeof window !== "undefined";
  const isIOS =
    isBrowser &&
    /iPad|iPhone|iPod/.test(navigator.userAgent || "") &&
    !(window as unknown as { MSStream?: unknown }).MSStream;

  const isIsolated = isBrowser && window.crossOriginIsolated;
  const hardwareCores =
    isBrowser && navigator.hardwareConcurrency
      ? navigator.hardwareConcurrency
      : 1;

  const shouldAttemptMultiThread = isIsolated && hardwareCores > 1 && !isIOS;

  if (shouldAttemptMultiThread) {
    try {
      console.log(
        `[ClipShrink] Initializing Multi-Threaded WASM engine with ${hardwareCores} cores...`,
      );
      const ffmpeg = new FFmpeg();

      // Log internal FFmpeg messages directly to F12 Console
      ffmpeg.on("log", ({ message }) => {
        console.log("[FFmpeg]", message);
      });

      if (onProgress) {
        ffmpeg.on("progress", ({ progress: p }) => {
          onProgress(Math.round(Math.max(0, Math.min(1, p)) * 100));
        });
      }

      await ffmpeg.load({
        coreURL: await toBlobURL(
          "/ffmpeg-mt/ffmpeg-core.js",
          "text/javascript",
        ),
        wasmURL: await toBlobURL(
          "/ffmpeg-mt/ffmpeg-core.wasm",
          "application/wasm",
        ),
        workerURL: await toBlobURL(
          "/ffmpeg-mt/ffmpeg-core.worker.js",
          "text/javascript",
        ),
      });

      console.log("[ClipShrink] Multi-Threaded engine loaded successfully.");
      return {
        ffmpeg,
        isMultiThreaded: true,
        threadCount: Math.min(hardwareCores, 8),
      };
    } catch (mtErr) {
      console.warn(
        "[ClipShrink] Multi-threading failed or was blocked. Falling back to single-threaded core:",
        mtErr,
      );
    }
  }

  // Fallback: Single-Threaded Core
  console.log("[ClipShrink] Loading single-threaded WASM engine...");
  const ffmpegFallback = new FFmpeg();

  ffmpegFallback.on("log", ({ message }) => {
    console.log("[FFmpeg]", message);
  });

  if (onProgress) {
    ffmpegFallback.on("progress", ({ progress: p }) => {
      onProgress(Math.round(Math.max(0, Math.min(1, p)) * 100));
    });
  }

  await ffmpegFallback.load({
    coreURL: await toBlobURL("/ffmpeg/ffmpeg-core.js", "text/javascript"),
    wasmURL: await toBlobURL("/ffmpeg/ffmpeg-core.wasm", "application/wasm"),
  });

  console.log("[ClipShrink] Single-threaded engine ready.");
  return {
    ffmpeg: ffmpegFallback,
    isMultiThreaded: false,
    threadCount: 1,
  };
}
