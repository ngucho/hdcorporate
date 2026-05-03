const DEFAULT_TZ = 'Europe/Paris'

function displayTimezone(): string {
  return process.env.CALCOM_BOOKING_TIMEZONE?.trim() || DEFAULT_TZ
}

function readResponseString(responses: unknown, key: string): string | undefined {
  if (!responses || typeof responses !== 'object') return undefined
  const block = (responses as Record<string, unknown>)[key]
  if (!block || typeof block !== 'object') return undefined
  const value = (block as { value?: unknown }).value
  if (typeof value === 'string') return value
  return undefined
}

/**
 * Cal.com envoie les champs du formulaire dans `responses.{clé}.value`.
 * Ordre pour la société (première valeur non vide) : `company` → `organisation` → `organization`.
 */
function extractCompanyFromResponses(responses: unknown): string | null {
  if (!responses || typeof responses !== 'object') return null
  const rec = responses as Record<string, unknown>
  for (const key of ['company', 'organisation', 'organization'] as const) {
    const s = readResponseString(rec, key)?.trim()
    if (s) return s
  }
  return null
}

/** Date locale `YYYY-MM-DD` et heure `HH:mm` pour affichage / grille interne. */
export function splitBookingStartInTimezone(
  isoStart: string,
  timeZone: string = displayTimezone()
): { bookingDate: string; slotTime: string } {
  const d = new Date(isoStart)
  const dateFmt = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  const timeFmt = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const dateParts = dateFmt.formatToParts(d)
  const y = dateParts.find((p) => p.type === 'year')?.value
  const mo = dateParts.find((p) => p.type === 'month')?.value
  const da = dateParts.find((p) => p.type === 'day')?.value
  const bookingDate = `${y}-${mo}-${da}`
  const timeParts = timeFmt.formatToParts(d)
  const hour = timeParts.find((p) => p.type === 'hour')?.value ?? '00'
  const minute = timeParts.find((p) => p.type === 'minute')?.value ?? '00'
  const slotTime = `${hour}:${minute}`
  return { bookingDate, slotTime }
}

export function extractVideoCallUrl(payload: Record<string, unknown>): string {
  const meta = payload.metadata
  if (meta && typeof meta === 'object' && meta !== null) {
    const url = (meta as Record<string, unknown>).videoCallUrl
    if (typeof url === 'string' && url.length > 0) return url
  }
  const vcd = payload.videoCallData
  if (vcd && typeof vcd === 'object' && vcd !== null) {
    const u = (vcd as Record<string, unknown>).url
    if (typeof u === 'string' && u.length > 0) return u
  }
  return ''
}

export type CalcomBookingPayload = {
  uid?: string
  rescheduleUid?: string
  startTime?: string
  endTime?: string
  title?: string
  eventTitle?: string
  type?: string
  additionalNotes?: string
  description?: string
  attendees?: Array<{
    name?: string
    email?: string
    phoneNumber?: string | null
  }>
  responses?: Record<string, unknown>
  metadata?: Record<string, unknown>
}

export function mapCalcomPayloadToBookingInput(payload: CalcomBookingPayload): {
  providerBookingUid: string
  bookingDate: string
  slotTime: string
  name: string
  email: string
  phone: string | null
  company: string | null
  service: string
  message: string | null
  calendarLink: string
  metadata: Record<string, unknown>
} | null {
  const uid = typeof payload.uid === 'string' ? payload.uid : undefined
  const startTime = typeof payload.startTime === 'string' ? payload.startTime : undefined
  if (!uid || !startTime) return null

  const { bookingDate, slotTime } = splitBookingStartInTimezone(startTime)
  const attendee = Array.isArray(payload.attendees) ? payload.attendees[0] : undefined
  const name =
    (typeof attendee?.name === 'string' && attendee.name) ||
    readResponseString(payload.responses, 'name') ||
    'Invité'
  const email =
    (typeof attendee?.email === 'string' && attendee.email) ||
    readResponseString(payload.responses, 'email') ||
    ''
  if (!email) return null

  const phone =
    (typeof attendee?.phoneNumber === 'string' && attendee.phoneNumber) ||
    readResponseString(payload.responses, 'attendeePhoneNumber') ||
    null

  const service =
    (typeof payload.eventTitle === 'string' && payload.eventTitle) ||
    (typeof payload.title === 'string' && payload.title) ||
    (typeof payload.type === 'string' && payload.type) ||
    'Cal.com'

  const notesFromResponses = readResponseString(payload.responses, 'notes')
  const message =
    [typeof payload.additionalNotes === 'string' ? payload.additionalNotes : '', notesFromResponses || '']
      .filter(Boolean)
      .join('\n')
      .trim() || null

  const calendarLink = extractVideoCallUrl(payload as Record<string, unknown>) || 'https://cal.com'

  const company = extractCompanyFromResponses(payload.responses)

  const metadata: Record<string, unknown> = {
    calcomUid: uid,
    endTime: payload.endTime,
    rawType: payload.type,
  }

  return {
    providerBookingUid: uid,
    bookingDate,
    slotTime,
    name,
    email,
    phone,
    company,
    service,
    message,
    calendarLink,
    metadata,
  }
}
