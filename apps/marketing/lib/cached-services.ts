import { unstable_cache } from 'next/cache'
import { listPublishedServices } from '@hd-corporate/db'

/**
 * Liste des offres publiées mise en cache côté serveur (Next Data Cache).
 * `revalidate` : secondes entre deux lectures DB en prod / ISR.
 * Tag `published-services` : pour invalider via `revalidateTag` (route admin ou webhook) si besoin.
 */
export const getPublishedServicesForHome = unstable_cache(
  async () => {
    try {
      return await listPublishedServices()
    } catch {
      return []
    }
  },
  ['marketing-home-published-services'],
  { revalidate: 300, tags: ['published-services'] }
)
