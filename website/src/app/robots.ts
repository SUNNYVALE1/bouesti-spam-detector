import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Custom domain confirmed live in Google Search Console
  const baseUrl = 'https://bouestispamdetector.com.ng';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
