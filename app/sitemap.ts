import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://clipshrink.com";

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

  const compressorEntries: MetadataRoute.Sitemap = compressorSpokes.map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }),
  );

  const converterEntries: MetadataRoute.Sitemap = converterSpokes.map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }),
  );

  const muterEntries: MetadataRoute.Sitemap = muterSpokes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/convert`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/remove-audio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...compressorEntries,
    ...converterEntries,
    ...muterEntries,
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];
}
