import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/seo/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  const lastModified = new Date()

  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${base}/services/creation-france`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/services/llc-delaware`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/services/secretariat-juridique`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/services/corporate-ma`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/mentions-legales`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.35,
    },
  ]

  return entries
}
