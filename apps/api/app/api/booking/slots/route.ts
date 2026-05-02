import { getJsonCache, getRedis, setJsonCache } from '@hd-corporate/cache'
import { listBookedSlotTimesForDate, listSlotBlocksForDate } from '@hd-corporate/db'
import type { NextRequest } from 'next/server'
import type { ApiError, AvailableSlotsResponse } from '@hd-corporate/contracts'
import { json, options } from '@/lib/cors'
import { buildSlotGrid } from '@/lib/server/slot-grid'

export const runtime = 'nodejs'

export function OPTIONS(request: NextRequest) {
  return options(request)
}

function cacheKey(date: string) {
  return `hd:api:slots:v1:${date}`
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')

    if (!date) {
      const error: ApiError = {
        code: 'VALIDATION_ERROR',
        message: 'Le paramètre date est requis',
      }
      return json(request, error, { status: 400 })
    }

    const dateObj = new Date(date)
    if (Number.isNaN(dateObj.getTime())) {
      const error: ApiError = {
        code: 'VALIDATION_ERROR',
        message: 'Format de date invalide',
      }
      return json(request, error, { status: 400 })
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (dateObj < today) {
      const error: ApiError = {
        code: 'VALIDATION_ERROR',
        message: 'Impossible de réserver dans le passé',
      }
      return json(request, error, { status: 400 })
    }

    const redis = getRedis()
    const ck = cacheKey(date)
    const cached = await getJsonCache<AvailableSlotsResponse>(redis, ck)
    if (cached?.slots) {
      return json(request, cached, {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
          'X-Data-Source': 'redis',
        },
      })
    }

    let bookedTimes: string[] = []
    let blockedTimes: string[] = []
    let wholeDayBlocked = false

    try {
      bookedTimes = await listBookedSlotTimesForDate(date)
      const blocks = await listSlotBlocksForDate(date)
      for (const b of blocks) {
        if (!b.slotTime) {
          wholeDayBlocked = true
        } else if (b.slotTime) {
          blockedTimes.push(b.slotTime)
        }
      }
    } catch {
      bookedTimes = []
      blockedTimes = []
      wholeDayBlocked = false
    }

    const slots = buildSlotGrid(date, bookedTimes, blockedTimes, wholeDayBlocked)
    const response: AvailableSlotsResponse = { slots, date }

    await setJsonCache(redis, ck, response, 60)

    return json(request, response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
        'X-Data-Source': 'postgres',
      },
    })
  } catch {
    const error: ApiError = {
      code: 'SERVER_ERROR',
      message: 'Erreur lors de la récupération des créneaux',
    }
    return json(request, error, { status: 500 })
  }
}
