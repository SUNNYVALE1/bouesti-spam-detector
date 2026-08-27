import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Custom domain confirmed live in Google Search Console
  const baseUrl = 'https://bouestispamdetector.com.ng';

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-08-27'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/classify`,
      lastModified: new Date('2026-08-27'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/results`,
      lastModified: new Date('2026-08-27'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date('2026-08-27'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2026-08-27'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2026-08-27'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}
