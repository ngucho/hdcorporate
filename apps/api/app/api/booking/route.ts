import { insertBooking } from '@hd-corporate/db'
import { getRedis } from '@hd-corporate/cache'
import type { NextRequest } from 'next/server'
import type { ApiError, BookingRequest, BookingResponse } from '@hd-corporate/contracts'
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

function validateBookingRequest(data: unknown): data is BookingRequest {
  if (typeof data !== 'object' || data === null) return false
  const booking = data as Record<string, unknown>

  return (
    typeof booking.date === 'string' &&
    typeof booking.time === 'string' &&
    typeof booking.name === 'string' &&
    typeof booking.email === 'string' &&
    typeof booking.service === 'string' &&
    booking.name.length >= 2 &&
    validateEmail(booking.email as string)
  )
}

function generateCalendarLink(booking: BookingRequest): string {
  const startDate = new Date(`${booking.date}T${booking.time}:00`)
  const endDate = new Date(startDate.getTime() + 30 * 60 * 1000)

  const formatDate = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `HD Corporate - Consultation ${booking.service}`,
    dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
    details: `Rendez-vous avec HD Corporate\n\nClient: ${booking.name}\nService: ${booking.service}${booking.message ? `\n\nMessage: ${booking.message}` : ''}`,
    location: 'Visioconférence (lien envoyé par email)',
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
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

    if (!validateBookingRequest(body)) {
      const error: ApiError = {
        code: 'VALIDATION_ERROR',
        message: 'Données de réservation invalides',
        details: {
          hint: 'Vérifiez que tous les champs requis sont remplis correctement',
        },
      }
      return json(request, error, { status: 400 })
    }

    const bookingId = generateId('HD')
    const calendarLink = generateCalendarLink(body)

    try {
      await insertBooking({
        externalId: bookingId,
        bookingDate: body.date,
        slotTime: body.time,
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        service: body.service,
        message: body.message,
        calendarLink,
      })
    } catch {
      // DB unavailable: still return calendar link for UX
    }

    const redis = getRedis()
    if (redis) {
      await redis.del(`hd:api:slots:v1:${body.date}`)
    }

    const response: BookingResponse = {
      success: true,
      bookingId,
      calendarLink,
    }

    return json(request, response, { status: 201 })
  } catch {
    const error: ApiError = {
      code: 'SERVER_ERROR',
      message: 'Erreur lors de la création de la réservation',
    }
    return json(request, error, { status: 500 })
  }
}
