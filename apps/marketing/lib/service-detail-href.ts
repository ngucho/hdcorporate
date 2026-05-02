/**
 * Slug catalogue (DB / fallback) → chemin page détail marketing.
 */
const SLUG_TO_PATH: Record<string, string> = {
  'secretariat-annuel': '/services/secretariat-juridique',
}

export function getServiceDetailHref(slug: string): string {
  return SLUG_TO_PATH[slug] ?? `/services/${slug}`
}
