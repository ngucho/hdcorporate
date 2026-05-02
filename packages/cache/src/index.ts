import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  return new Redis({ url, token })
}

export function createPublicFormRatelimit(redis: Redis) {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 m'),
    analytics: true,
    prefix: 'hd:public-form',
  })
}

export async function rateLimitOrThrow(
  ratelimit: Ratelimit | null,
  identifier: string
): Promise<void> {
  if (!ratelimit) return
  const { success } = await ratelimit.limit(identifier)
  if (!success) {
    const err = new Error('RATE_LIMITED')
    ;(err as Error & { status: number }).status = 429
    throw err
  }
}

export async function getJsonCache<T>(redis: Redis | null, key: string): Promise<T | null> {
  if (!redis) return null
  const raw = await redis.get<string>(key)
  if (raw == null || raw === '') return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export async function setJsonCache(
  redis: Redis | null,
  key: string,
  value: unknown,
  ttlSeconds: number
): Promise<void> {
  if (!redis) return
  await redis.set(key, JSON.stringify(value), { ex: ttlSeconds })
}
