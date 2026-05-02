import { insertLead } from '@hd-corporate/db'
import type { ApiError, LeadResponse } from '@hd-corporate/contracts'
import { Hono } from 'hono'
import type { AppEnv } from '../../core/hono-env.js'
import { rateLimitPublicForm } from '../../core/middleware/rate-limit-form.js'
import { isUniqueViolation } from '../../../lib/server/db-errors.js'
import { validateLeadRequest } from './validation.js'

/**
 * Capture leads `POST /api/leads`.
 */
export function createLeadsRouter(): Hono<AppEnv> {
  const r = new Hono<AppEnv>()

  r.post('/', rateLimitPublicForm, async (c) => {
    try {
      const body = await c.req.json()

      if (!validateLeadRequest(body)) {
        const error: ApiError = {
          code: 'VALIDATION_ERROR',
          message: 'Email invalide',
        }
        return c.json(error, 400)
      }

      try {
        await insertLead({
          email: body.email,
          source: body.source,
          metadata: body.metadata ?? null,
        })
      } catch (err) {
        if (!isUniqueViolation(err)) {
          throw err
        }
      }

      const response: LeadResponse = {
        success: true,
      }

      return c.json(response, 201)
    } catch (err) {
      c.get('log').error({ err }, 'leads_post_failed')
      const error: ApiError = {
        code: 'SERVER_ERROR',
        message: "Erreur lors de l'inscription",
      }
      return c.json(error, 500)
    }
  })

  return r
}
