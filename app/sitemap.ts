import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://clipshrink.com";

  // Fixed group update dates. Update a group only when its pages actually change.
  const MODIFIED = {
    hubs: new Date("2026-10-17"),
    compress: new Date("2026-10-17"),
    convert: new Date("2026-10-17"),
    extract: new Date("2026-10-17"),
    trim: new Date("2026-10-13"),
    mute: new Date("2026-10-13"),
    legal: new Date("2026-10-17"),
  };

  // Tool #1: Video Compressor Spokes (14 routes)
  const compressorSpokes = [
    "/video/compress-for-discord-8mb",
    "/video/compress-for-gmail-25mb",
    "/video/compress-for-whatsapp",
    "/video/compress-video-on-iphone",
    "/video/how-to-send-large-video-from-iphone",
    "/video/compress-video-for-twitter",
    "/video/compress-mp4-to-100mb",
    "/video/compress-mp4-to-10mb",
    "/video/compress-video-for-email",
    "/video/compress-video-for-outlook",
    "/video/compress-video-for-slack",
    "/video/compress-mp4-to-50mb",
    "/video/compress-mp4-to-25mb",
    "/video/compress-mov-for-discord",
  ];

  // Tool #2: Instant Video Converter Spokes (10 routes)
  const converterSpokes = [
    "/convert/mkv-to-mp4",
    "/convert/hevc-to-mp4",
    "/convert/mov-to-mp4",
    "/convert/webm-to-mp4",
    "/convert/quicktime-to-mp3",
    "/convert/opus-to-mp3",
    "/convert/m4v-to-mp4",
    "/convert/mpeg-to-mp4",
    "/convert/ts-to-mp4",
    "/convert/gif-to-mp4",
  ];

  // Tool #3: Remove Audio / Video Muter Spokes (6 routes)
  const muterSpokes = [
    "/remove-audio/iphone-video",
    "/remove-audio/mp4",
    "/remove-audio/mov",
    "/remove-audio/instagram-reels",
    "/remove-audio/send-without-sound",
    "/remove-audio/mkv",
  ];

  // Tool #4: Audio Extractor Spokes (6 routes)
  // Note: /extract-audio/quicktime-to-mp3 was removed (301 redirects to /convert/quicktime-to-mp3)
  const extractorSpokes = [
    "/extract-audio/mov-to-mp3",
    "/extract-audio/mp4-to-mp3",
    "/extract-audio/ogg-to-mp3",
    "/extract-audio/webm-to-mp3",
    "/extract-audio/mp4-to-wav",
    "/extract-audio/video-to-wav",
  ];

  // Tool #5: Lossless Video Trimmer Spokes (8 routes)
  const trimmerSpokes = [
    "/trim-video/trim-mp4",
    "/trim-video/cut-mkv",
    "/trim-video/trim-mov",
    "/trim-video/cut-video-for-discord",
    "/trim-video/trim-webm",
    "/trim-video/cut-gif",
    "/trim-video/lossless-video-cutter",
    "/trim-video/trim-video-no-watermark",
  ];

  const compressorEntries: MetadataRoute.Sitemap = compressorSpokes.map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: MODIFIED.compress,
    }),
  );

  const converterEntries: MetadataRoute.Sitemap = converterSpokes.map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: MODIFIED.convert,
    }),
  );

  const muterEntries: MetadataRoute.Sitemap = muterSpokes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: MODIFIED.mute,
  }));

  const extractorEntries: MetadataRoute.Sitemap = extractorSpokes.map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: MODIFIED.extract,
    }),
  );

  const trimmerEntries: MetadataRoute.Sitemap = trimmerSpokes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: MODIFIED.trim,
  }));

  return [
    {
      url: baseUrl,
      lastModified: MODIFIED.hubs,
    },
    {
      url: `${baseUrl}/convert`,
      lastModified: MODIFIED.hubs,
    },
    {
      url: `${baseUrl}/trim-video`,
      lastModified: MODIFIED.hubs,
    },
    {
      url: `${baseUrl}/remove-audio`,
      lastModified: MODIFIED.hubs,
    },
    {
      url: `${baseUrl}/extract-audio`,
      lastModified: MODIFIED.hubs,
    },
    ...compressorEntries,
    ...converterEntries,
    ...trimmerEntries,
    ...muterEntries,
    ...extractorEntries,
    {
      url: `${baseUrl}/about`,
      lastModified: MODIFIED.legal,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: MODIFIED.legal,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: MODIFIED.legal,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: MODIFIED.legal,
    },
  ];
}
