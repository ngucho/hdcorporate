import type { MetadataRoute } from 'next'
import { ORG } from '@/lib/seo/site-config'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: ORG.name,
    short_name: 'HD Corporate',
    description: ORG.description,
    start_url: '/',
    display: 'browser',
    orientation: 'portrait-primary',
    background_color: '#FAF7F0',
    theme_color: '#0B3D2E',
    lang: 'fr',
    categories: ['business', 'finance', 'legal'],
    icons: [
      {
        src: '/icon/favicon-32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icon/splash-mark.png',
        sizes: '280x280',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
