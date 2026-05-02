import { listPublishedServices } from '@hd-corporate/db'
import { getJsonCache, getRedis, setJsonCache } from '@hd-corporate/cache'
import type { NextRequest } from 'next/server'
import type { Service, ServicesResponse } from '@hd-corporate/contracts'
import { json, options } from '@/lib/cors'
import { STATIC_SERVICES_FALLBACK } from '@/lib/server/services-fallback'

export const runtime = 'nodejs'

export function OPTIONS(request: NextRequest) {
  return options(request)
}

const REDIS_KEY = 'hd:api:services:v1'
const REDIS_TTL_SECONDS = 3600

function mapToService(row: {
  id: string
  title: string
  price: string
  badge?: string
  delay?: string
  features: string[]
  category: string
}): Service {
  const category = row.category as Service['category']
  return {
    id: row.id,
    title: row.title,
    price: row.price,
    badge: row.badge,
    delay: row.delay,
    features: row.features,
    category,
  }
}

export async function GET(request: NextRequest) {
  const redis = getRedis()
  const cached = await getJsonCache<ServicesResponse>(redis, REDIS_KEY)
  if (cached?.services?.length) {
    return json(request, cached, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
        'X-Data-Source': 'redis',
      },
    })
  }

  try {
    const rows = await listPublishedServices()
    const services = rows.map(mapToService)
    const body: ServicesResponse = { services }
    await setJsonCache(redis, REDIS_KEY, body, REDIS_TTL_SECONDS)
    return json(request, body, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
        'X-Data-Source': 'postgres',
      },
    })
  } catch {
    const body: ServicesResponse = { services: STATIC_SERVICES_FALLBACK }
    return json(request, body, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
        'X-Data-Source': 'fallback',
      },
    })
  }
}
