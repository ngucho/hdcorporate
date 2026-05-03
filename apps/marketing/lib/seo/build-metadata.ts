import type { Metadata } from 'next'
import { absoluteUrl } from './site-config'

const defaultOgImage = {
  url: '/og-image.png' as const,
  width: 1200,
  height: 630,
  alt: 'HD Corporate',
}

export type PageSeoInput = {
  /** Chemin absolu sur le site, ex. `/services/creation-france` */
  path: string
  /**
   * Titre court (suffixe `| HD Corporate` via le template racine), sauf si `absoluteTitle` est défini.
   */
  title: string
  description: string
  keywords?: string[]
  /** Titre `<title>` / OG / Twitter complets (ex. page d'accueil). */
  absoluteTitle?: string
}

function documentTitle(input: PageSeoInput): string {
  return input.absoluteTitle ?? `${input.title} | HD Corporate`
}

/**
 * Métadonnées complètes par URL : canonical, Open Graph, Twitter, robots.
 */
export function buildPageMetadata(input: PageSeoInput): Metadata {
  const { path, title, description, keywords, absoluteTitle } = input
  const canonical = absoluteUrl(path)
  const fullTitle = documentTitle(input)

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    ...(keywords?.length ? { keywords: keywords.join(', ') } : {}),
    alternates: {
      canonical,
      languages: {
        'fr-FR': canonical,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      siteName: 'HD Corporate',
      url: canonical,
      title: fullTitle,
      description,
      images: [{ ...defaultOgImage, url: absoluteUrl(defaultOgImage.url) }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [absoluteUrl(defaultOgImage.url)],
    },
    other: {
      'og:locale:alternate': 'fr_FR',
    },
  }
}

/** Pages légales / peu prioritaires : indexables mais signalées comme secondaires si besoin. */
export function buildLegalPageMetadata(input: PageSeoInput): Metadata {
  return {
    ...buildPageMetadata(input),
    robots: {
      index: true,
      follow: true,
    },
  }
}
