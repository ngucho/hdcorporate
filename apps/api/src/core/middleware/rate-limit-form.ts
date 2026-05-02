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

/** Rate limit par IP sur les POST « formulaires » publics (contact, leads). */
export const rateLimitPublicForm: MiddlewareHandler<AppEnv> = async (c, next) => {
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
