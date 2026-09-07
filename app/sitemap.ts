import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://clipshrink.com";

  const spokeUrls = [
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

  const spokeEntries: MetadataRoute.Sitemap = spokeUrls.map((path) => ({
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
    ...spokeEntries,
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
