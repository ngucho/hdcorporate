import { insertLead } from '@hd-corporate/db'
import type { NextRequest } from 'next/server'
import type { ApiError, LeadRequest, LeadResponse } from '@hd-corporate/contracts'
import { json, options } from '@/lib/cors'
import { isRateLimitError, enforcePublicFormRateLimit } from '@/lib/server/public-rate-limit'
import { isUniqueViolation } from '@/lib/server/db-errors'

export const runtime = 'nodejs'

export function OPTIONS(request: NextRequest) {
  return options(request)
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validateLeadRequest(data: unknown): data is LeadRequest {
  if (typeof data !== 'object' || data === null) return false
  const lead = data as Record<string, unknown>

  const validSources = ['newsletter', 'booking', 'contact', 'download']

  return (
    typeof lead.email === 'string' &&
    validateEmail(lead.email as string) &&
    typeof lead.source === 'string' &&
    validSources.includes(lead.source as string)
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

    if (!validateLeadRequest(body)) {
      const error: ApiError = {
        code: 'VALIDATION_ERROR',
        message: 'Email invalide',
      }
      return json(request, error, { status: 400 })
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

    return json(request, response, { status: 201 })
  } catch {
    const error: ApiError = {
      code: 'SERVER_ERROR',
      message: "Erreur lors de l'inscription",
    }
    return json(request, error, { status: 500 })
  }
}
