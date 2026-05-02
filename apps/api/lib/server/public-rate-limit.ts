import type { NextRequest } from 'next/server'
import { createPublicFormRatelimit, getRedis, rateLimitOrThrow } from '@hd-corporate/cache'

export async function enforcePublicFormRateLimit(request: NextRequest): Promise<void> {
  const redis = getRedis()
  if (!redis) return
  const forwarded = request.headers.get('x-forwarded-for')
  const ip =
    forwarded?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    request.headers.get('cf-connecting-ip') ??
    'anonymous'
  const ratelimit = createPublicFormRatelimit(redis)
  await rateLimitOrThrow(ratelimit, ip)
}

export function isRateLimitError(err: unknown): boolean {
  return err instanceof Error && err.message === 'RATE_LIMITED'
}
