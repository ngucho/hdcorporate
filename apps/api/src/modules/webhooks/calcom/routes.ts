import { Hono } from 'hono'
import type { AppEnv } from '../../../core/hono-env.js'
import { applyCalcomWebhookEvent } from '../../../../lib/calcom/apply-webhook.js'
import { verifyCalcomWebhookSignature } from '../../../../lib/calcom/verify-signature.js'

/**
 * Webhooks fournisseurs (sans CORS) `POST /api/webhooks/calcom`.
 * Isolé des routes navigateur pour limiter surface d’attaque et config (secrets).
 */
export function createCalcomWebhookRouter(): Hono<AppEnv> {
  const r = new Hono<AppEnv>()

  r.post('/', async (c) => {
    const log = c.get('log')
    const secret = process.env.CALCOM_WEBHOOK_SECRET?.trim()
    if (!secret) {
      log.warn('calcom_webhook_secret_missing')
      return c.json({ ok: false, error: 'webhook_not_configured' }, 503)
    }

    const rawBody = await c.req.text()
    const sig =
      c.req.header('x-cal-signature-256') || c.req.header('X-Cal-Signature-256')

    if (!verifyCalcomWebhookSignature(rawBody, sig, secret)) {
      log.warn('calcom_webhook_invalid_signature')
      return c.json({ ok: false, error: 'invalid_signature' }, 401)
    }

    let envelope: unknown
    try {
      envelope = JSON.parse(rawBody) as unknown
    } catch {
      log.warn('calcom_webhook_invalid_json')
      return c.json({ ok: false, error: 'invalid_json' }, 400)
    }

    const result = await applyCalcomWebhookEvent(
      envelope as { triggerEvent?: string; payload?: Record<string, unknown> }
    )

    if (!result.ok) {
      log.error({ error: result.error }, 'calcom_webhook_apply_failed')
      return c.json({ ok: false, error: result.error }, 500)
    }

    log.info({ action: result.action }, 'calcom_webhook_ok')
    return c.json({ ok: true, action: result.action }, 200)
  })

  return r
}
