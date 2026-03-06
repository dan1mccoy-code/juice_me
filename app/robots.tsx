import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/results', // Prevent indexing of dynamic search results
    },
    sitemap: 'https://juiceme.app/sitemap.xml',
  };
}