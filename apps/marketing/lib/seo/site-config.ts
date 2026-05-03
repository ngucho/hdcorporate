/** Données publiques alignées sur le site (footer / contact). */

export const ORG = {
  name: 'HD Corporate',
  legalName: 'HD Corporate',
  description:
    'Secrétariat juridique, création de société (SAS, SASU, EURL), LLC Delaware, corporate et M&A. Accompagnement par Hamidou Diallo, juriste indépendant.',
  email: 'contact.hdcorporate@gmail.com',
  telephone: '+33767376622',
  streetAddress: '303 Quai aux Fleurs',
  addressLocality: 'Évry-Courcouronnes',
  postalCode: '91000',
  addressCountry: 'FR',
  siren: '887630069',
} as const

export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://www.hdcorporate.com')
  return raw
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl()
  const p = path.startsWith('/') ? path : `/${path}`
  return new URL(p, base).toString()
}

/** Profils sociaux (optionnel). Ex. `https://www.linkedin.com/company/...,https://twitter.com/...` */
export function sameAsUrls(): string[] {
  const raw = process.env.NEXT_PUBLIC_ORG_SAME_AS
  if (!raw?.trim()) return []
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}
