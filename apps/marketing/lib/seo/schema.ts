import { homeFaqs } from '@/lib/content/home-faqs'
import { ORG, absoluteUrl, getSiteUrl, sameAsUrls } from './site-config'

/** Graph JSON-LD page d'accueil : organisation, site, activité juridique, personne référente. */
export function homeWebGraphJsonLd() {
  const site = getSiteUrl()
  const sameAs = sameAsUrls()

  const organization: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': `${site}/#organization`,
    name: ORG.name,
    legalName: ORG.legalName,
    description: ORG.description,
    url: site,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/og-image.png'),
      width: 1200,
      height: 630,
    },
    email: ORG.email,
    telephone: ORG.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ORG.streetAddress,
      addressLocality: ORG.addressLocality,
      postalCode: ORG.postalCode,
      addressCountry: ORG.addressCountry,
    },
    identifier: {
      '@type': 'PropertyValue',
      name: 'SIREN',
      value: ORG.siren,
    },
  }
  if (sameAs.length) {
    organization.sameAs = sameAs
  }

  const website = {
    '@type': 'WebSite',
    '@id': `${site}/#website`,
    url: site,
    name: ORG.name,
    description: ORG.description,
    inLanguage: 'fr-FR',
    publisher: { '@id': `${site}/#organization` },
  }

  const legalService = {
    '@type': 'LegalService',
    '@id': `${site}/#legalservice`,
    name: 'HD Corporate — Services juridiques pour entreprises',
    url: site,
    image: absoluteUrl('/og-image.png'),
    provider: { '@id': `${site}/#organization` },
    areaServed: { '@type': 'Country', name: 'France' },
    priceRange: '€€',
  }

  const person = {
    '@type': 'Person',
    '@id': `${site}/#person-hamidou`,
    name: 'Hamidou Diallo',
    jobTitle: 'Juriste indépendant',
    worksFor: { '@id': `${site}/#organization` },
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, website, legalService, person],
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function serviceJsonLd(opts: {
  name: string
  description: string
  path: string
  offerDescription?: string
}) {
  const site = getSiteUrl()
  const service: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: { '@id': `${site}/#organization` },
    areaServed: { '@type': 'Country', name: 'France' },
    availableLanguage: 'French',
  }
  if (opts.offerDescription) {
    service.offers = {
      '@type': 'Offer',
      description: opts.offerDescription,
      priceCurrency: 'EUR',
    }
  }
  return service
}

/** FAQ page d’accueil (rich results Google). */
export function homeFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function webPageJsonLd(opts: { name: string; description: string; path: string }) {
  const site = getSiteUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    isPartOf: { '@id': `${site}/#website` },
    inLanguage: 'fr-FR',
  }
}
