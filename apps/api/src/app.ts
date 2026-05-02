import { Hono } from 'hono'
import { getRootLogger } from './core/logger.js'
import type { AppEnv } from './core/hono-env.js'
import { requestContext } from './core/middleware/request-context.js'
import { requestLogging } from './core/middleware/request-logging.js'
import { securityHeaders } from './core/middleware/security-headers.js'
import { createInternalGateway } from './modules/internal-gateway.js'
import { createPublicApiGateway } from './modules/public-gateway.js'
import { createWebhooksHub } from './modules/webhooks/hub.js'

const rootHtml = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"/><title>HD Corporate API</title></head><body style="font-family:system-ui;padding:24px"><h1>HD Corporate API</h1><p>Endpoints publics sous <code>/api/*</code> (ex. <code>/api/services</code>).</p></body></html>`

export const app = new Hono<AppEnv>()

app.use('*', requestContext)
app.use('*', securityHeaders)
app.use('*', requestLogging)

app.onError((err, c) => {
  const requestId = c.req.header('x-request-id')
  getRootLogger().error(
    { err, path: c.req.path, method: c.req.method, requestId },
    'unhandled_error'
  )

  const exposeMessage = process.env.NODE_ENV !== 'production'
  return c.json(
    {
      error: 'internal_error',
      requestId,
      ...(exposeMessage ? { message: err.message } : {}),
    },
    500
  )
})

app.get('/', (c) => c.html(rootHtml))

/** Webhooks en premier (chemins plus spécifiques sous `/api/...`). */
app.route('/api/webhooks', createWebhooksHub())
app.route('/api', createPublicApiGateway())
app.route('/internal', createInternalGateway())
