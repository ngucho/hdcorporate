import { insertContactTicket } from '@hd-corporate/db'
import type { ApiError, ContactResponse } from '@hd-corporate/contracts'
import { Hono } from 'hono'
import type { AppEnv } from '../../core/hono-env.js'
import { rateLimitPublicForm } from '../../core/middleware/rate-limit-form.js'
import { generateId } from '../../../lib/server/validation.js'
import { validateContactRequest } from './validation.js'

/**
 * Formulaire contact `POST /api/contact`.
 */
export function createContactRouter(): Hono<AppEnv> {
  const r = new Hono<AppEnv>()

  r.post('/', rateLimitPublicForm, async (c) => {
    try {
      const body = await c.req.json()

      if (!validateContactRequest(body)) {
        const error: ApiError = {
          code: 'VALIDATION_ERROR',
          message: 'Données de contact invalides',
          details: {
            hint: 'Vérifiez que tous les champs requis sont remplis (nom, email, sujet, message)',
          },
        }
        return c.json(error, 400)
      }

      const ticketId = generateId('TKT')

      try {
        await insertContactTicket({
          externalId: ticketId,
          name: body.name,
          email: body.email,
          phone: body.phone,
          subject: body.subject,
          message: body.message,
        })
      } catch (err) {
        c.get('log').error({ err, ticketId }, 'contact_insert_failed')
        const error: ApiError = {
          code: 'storage_unavailable',
          message:
            'Impossible d’enregistrer votre message pour le moment. Réessayez plus tard ou écrivez-nous par email.',
        }
        return c.json(error, 503)
      }

      const response: ContactResponse = {
        success: true,
        ticketId,
      }

      return c.json(response, 201)
    } catch (err) {
      c.get('log').error({ err }, 'contact_post_failed')
      const error: ApiError = {
        code: 'SERVER_ERROR',
        message: "Erreur lors de l'envoi du message",
      }
      return c.json(error, 500)
    }
  })

  return r
}
