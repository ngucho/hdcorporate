import { listPublishedServices } from '@hd-corporate/db'
import { getJsonCache, getRedis, setJsonCache } from '@hd-corporate/cache'
import type { ServicesResponse } from '@hd-corporate/contracts'
import { Hono } from 'hono'
import type { AppEnv } from '../../core/hono-env.js'
import { STATIC_SERVICES_FALLBACK } from '../../../lib/server/services-fallback.js'
import { REDIS_SERVICES_KEY, REDIS_SERVICES_TTL_SECONDS } from './constants.js'
import { mapRowToService } from './mappers.js'

/**
 * Catalogue public des offres monté sous `/api` → `GET /api/services`.
 * Évolue indépendamment (cache, fallback, mapping).
 */
export function createCatalogRouter(): Hono<AppEnv> {
  const r = new Hono<AppEnv>()

  r.get('/', async (c) => {
    const redis = getRedis()
    const cached = await getJsonCache<ServicesResponse>(redis, REDIS_SERVICES_KEY)
    if (cached?.services?.length) {
      c.header('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=600')
      c.header('X-Data-Source', 'redis')
      return c.json(cached, 200)
    }

    try {
      const rows = await listPublishedServices()
      const services = rows.map(mapRowToService)
      const body: ServicesResponse = { services }
      await setJsonCache(redis, REDIS_SERVICES_KEY, body, REDIS_SERVICES_TTL_SECONDS)
      c.header('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=600')
      c.header('X-Data-Source', 'postgres')
      return c.json(body, 200)
    } catch (err) {
      c.get('log').warn({ err }, 'services_db_unavailable_using_fallback')
      const body: ServicesResponse = { services: STATIC_SERVICES_FALLBACK }
      c.header('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60')
      c.header('X-Data-Source', 'fallback')
      return c.json(body, 200)
    }
  })

  return r
}
