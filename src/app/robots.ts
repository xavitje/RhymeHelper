import type { MetadataRoute } from 'next';
import { SITE } from '../config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/account', '/dashboard', '/reset-password', '/thank-you'] },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
