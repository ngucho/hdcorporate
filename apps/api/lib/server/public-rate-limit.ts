import { createPublicFormRatelimit, getRedis, rateLimitOrThrow } from '@hd-corporate/cache'

function clientIpFromHeaders(getHeader: (name: string) => string | undefined): string {
  const forwarded = getHeader('x-forwarded-for')
  return (
    forwarded?.split(',')[0]?.trim() ??
    getHeader('x-real-ip') ??
    getHeader('cf-connecting-ip') ??
    'anonymous'
  )
}

export async function enforcePublicFormRateLimitFromHeaders(
  getHeader: (name: string) => string | undefined
): Promise<void> {
  const redis = getRedis()
  if (!redis) return
  const ip = clientIpFromHeaders(getHeader)
  const ratelimit = createPublicFormRatelimit(redis)
  await rateLimitOrThrow(ratelimit, ip)
}

export function isRateLimitError(err: unknown): boolean {
  return err instanceof Error && err.message === 'RATE_LIMITED'
}
