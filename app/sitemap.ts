import { MetadataRoute } from 'next'

const BASE_URL = 'https://crypto-coins.org'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE_URL}/buy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
  ]
}
