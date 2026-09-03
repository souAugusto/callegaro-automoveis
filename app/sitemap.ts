import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site-config'
import { getAllCars } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cars = await getAllCars()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/estoque`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE.url}/contato`, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const carRoutes: MetadataRoute.Sitemap = cars.map((car) => ({
    url: `${SITE.url}/estoque/${car.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...carRoutes]
}
