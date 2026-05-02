import { randomUUID } from 'node:crypto'
import { createMiddleware } from 'hono/factory'
import type { AppEnv } from '../hono-env.js'
import { getRootLogger } from '../logger.js'

/**
 * Correlation id + logger enfant par requête (W3C Trace / observabilité).
 */
export const requestContext = createMiddleware<AppEnv>(async (c, next) => {
  const requestId =
    c.req.header('x-request-id')?.trim() ||
    c.req.header('x-correlation-id')?.trim() ||
    randomUUID()

  c.set('requestId', requestId)
  const log = getRootLogger().child({
    requestId,
    method: c.req.method,
    path: c.req.path,
  })
  c.set('log', log)
  c.header('x-request-id', requestId)

  await next()
})
