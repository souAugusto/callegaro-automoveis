import type { MetadataRoute } from 'next'
import { SITE_STATIC } from '@/lib/site-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin',
    },
    sitemap: `${SITE_STATIC.url}/sitemap.xml`,
  }
}
