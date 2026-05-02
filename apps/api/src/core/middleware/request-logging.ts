import { createMiddleware } from 'hono/factory'
import type { AppEnv } from '../hono-env.js'

/**
 * Log ligne structurée après traitement (durée + statut). Niveau warn si 5xx.
 */
export const requestLogging = createMiddleware<AppEnv>(async (c, next) => {
  const log = c.get('log')
  const start = performance.now()
  await next()
  const durationMs = Math.round(performance.now() - start)
  const status = c.res.status
  const payload = { status, durationMs, route: c.req.path }

  if (status >= 500) {
    log.error(payload, 'http_request')
  } else if (status >= 400) {
    log.warn(payload, 'http_request')
  } else {
    log.info(payload, 'http_request')
  }
})
