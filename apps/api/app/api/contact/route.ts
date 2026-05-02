import { insertContactTicket } from '@hd-corporate/db'
import type { NextRequest } from 'next/server'
import type { ApiError, ContactRequest, ContactResponse } from '@hd-corporate/contracts'
import { json, options } from '@/lib/cors'
import { isRateLimitError, enforcePublicFormRateLimit } from '@/lib/server/public-rate-limit'
import { generateId } from '@/lib/server/validation'

export const runtime = 'nodejs'

export function OPTIONS(request: NextRequest) {
  return options(request)
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validateContactRequest(data: unknown): data is ContactRequest {
  if (typeof data !== 'object' || data === null) return false
  const contact = data as Record<string, unknown>

  return (
    typeof contact.name === 'string' &&
    typeof contact.email === 'string' &&
    typeof contact.subject === 'string' &&
    typeof contact.message === 'string' &&
    contact.name.length >= 2 &&
    validateEmail(contact.email as string) &&
    (contact.message as string).length >= 10
  )
}

export async function POST(request: NextRequest) {
  try {
    await enforcePublicFormRateLimit(request)
  } catch (err) {
    if (isRateLimitError(err)) {
      const error: ApiError = {
        code: 'RATE_LIMITED',
        message: 'Trop de demandes. Réessayez dans une minute.',
      }
      return json(request, error, { status: 429 })
    }
    throw err
  }

  try {
    const body = await request.json()

    if (!validateContactRequest(body)) {
      const error: ApiError = {
        code: 'VALIDATION_ERROR',
        message: 'Données de contact invalides',
        details: {
          hint: 'Vérifiez que tous les champs requis sont remplis (nom, email, sujet, message)',
        },
      }
      return json(request, error, { status: 400 })
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
    } catch {
      // continue with synthetic ticket id if DB unavailable
    }

    const response: ContactResponse = {
      success: true,
      ticketId,
    }

    return json(request, response, { status: 201 })
  } catch {
    const error: ApiError = {
      code: 'SERVER_ERROR',
      message: "Erreur lors de l'envoi du message",
    }
    return json(request, error, { status: 500 })
  }
}
