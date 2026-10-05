import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.crypto-coins.org'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE_URL}/buy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/legal-notice`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.2 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.2 },
    { url: `${BASE_URL}/impressum`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.2 },
    { url: `${BASE_URL}/datenschutz`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.2 },
  ]
}
