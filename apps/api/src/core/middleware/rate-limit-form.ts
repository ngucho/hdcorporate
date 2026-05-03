import { getRedis } from '@hd-corporate/cache'
import type { ApiError } from '@hd-corporate/contracts'
import type { MiddlewareHandler } from 'hono'
import type { AppEnv } from '../hono-env.js'
import {
  enforcePublicFormRateLimitFromHeaders,
  isRateLimitError,
} from '../../../lib/server/public-rate-limit.js'

const RATE_LIMIT_BODY: ApiError = {
  code: 'RATE_LIMITED',
  message: 'Trop de demandes. Réessayez dans une minute.',
}

const REDIS_MISSING_BODY: ApiError = {
  code: 'rate_limit_misconfigured',
  message: 'Service temporairement indisponible. Réessayez plus tard.',
}

/** Vercel prod, ou Node prod hors Vercel (ex. conteneur) : Redis obligatoire pour limiter les formulaires publics. */
function redisRequiredForPublicFormRateLimit(): boolean {
  if (process.env.VERCEL_ENV === 'production') return true
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL !== '1') return true
  return false
}

/** Rate limit par IP sur les POST « formulaires » publics (contact, leads). */
export const rateLimitPublicForm: MiddlewareHandler<AppEnv> = async (c, next) => {
  if (redisRequiredForPublicFormRateLimit() && getRedis() === null) {
    c.get('log').error('rate_limit_redis_missing')
    return c.json(REDIS_MISSING_BODY, 503)
  }

  try {
    await enforcePublicFormRateLimitFromHeaders((name) => c.req.header(name))
  } catch (err) {
    if (isRateLimitError(err)) {
      return c.json(RATE_LIMIT_BODY, 429)
    }
    c.get('log').error({ err }, 'rate_limit_middleware_unexpected')
    throw err
  }
  await next()
}
