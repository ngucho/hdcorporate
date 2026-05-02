import {
  findBookingByProviderUid,
  insertCalcomBooking,
  updateCalcomBookingByProviderUid,
} from '@hd-corporate/db'
import {
  notifyCalBookingCancelled,
  notifyCalBookingConfirmed,
  notifyCalBookingRescheduled,
} from '../email/calcom-booking-notifications.js'
import { mapCalcomPayloadToBookingInput, type CalcomBookingPayload } from './map-payload.js'

type CalcomEnvelope = {
  triggerEvent?: string
  payload?: CalcomBookingPayload
}

export async function applyCalcomWebhookEvent(
  envelope: CalcomEnvelope
): Promise<{ ok: true; action: string } | { ok: false; error: string }> {
  const trigger = envelope.triggerEvent
  const payload = envelope.payload

  if (!trigger || !payload || typeof payload !== 'object') {
    return { ok: false, error: 'missing_trigger_or_payload' }
  }

  switch (trigger) {
    case 'BOOKING_CREATED':
      return handleCreated(payload)
    case 'BOOKING_RESCHEDULED':
      return handleRescheduled(payload)
    case 'BOOKING_CANCELLED':
      return handleCancelled(payload)
    default:
      return { ok: true, action: `ignored:${trigger}` }
  }
}

async function handleCreated(
  payload: CalcomBookingPayload
): Promise<{ ok: true; action: string } | { ok: false; error: string }> {
  const mapped = mapCalcomPayloadToBookingInput(payload)
  if (!mapped) return { ok: false, error: 'map_failed_created' }

  const existing = await findBookingByProviderUid(mapped.providerBookingUid)
  if (existing) {
    await updateCalcomBookingByProviderUid(mapped.providerBookingUid, {
      bookingDate: mapped.bookingDate,
      slotTime: mapped.slotTime,
      name: mapped.name,
      email: mapped.email,
      phone: mapped.phone,
      service: mapped.service,
      message: mapped.message,
      calendarLink: mapped.calendarLink,
      metadata: mapped.metadata,
      status: 'confirmed',
    })
    return { ok: true, action: 'updated:booking_created_retry' }
  }

  await insertCalcomBooking({
    externalId: `CAL-${mapped.providerBookingUid}`,
    bookingDate: mapped.bookingDate,
    slotTime: mapped.slotTime,
    name: mapped.name,
    email: mapped.email,
    phone: mapped.phone,
    company: null,
    service: mapped.service,
    message: mapped.message,
    calendarLink: mapped.calendarLink,
    providerBookingUid: mapped.providerBookingUid,
    metadata: mapped.metadata,
  })

  try {
    await notifyCalBookingConfirmed({ payload, mapped })
  } catch {
    /* email non bloquant */
  }

  return { ok: true, action: 'inserted:booking_created' }
}

async function handleRescheduled(
  payload: CalcomBookingPayload
): Promise<{ ok: true; action: string } | { ok: false; error: string }> {
  const previousUid =
    typeof payload.rescheduleUid === 'string' && payload.rescheduleUid.length > 0
      ? payload.rescheduleUid
      : undefined

  const mapped = mapCalcomPayloadToBookingInput(payload)
  if (!mapped) return { ok: false, error: 'map_failed_rescheduled' }

  if (previousUid) {
    const prevRow = await findBookingByProviderUid(previousUid)
    if (prevRow) {
      await updateCalcomBookingByProviderUid(previousUid, {
        providerBookingUid: mapped.providerBookingUid,
        bookingDate: mapped.bookingDate,
        slotTime: mapped.slotTime,
        name: mapped.name,
        email: mapped.email,
        phone: mapped.phone,
        service: mapped.service,
        message: mapped.message,
        calendarLink: mapped.calendarLink,
        metadata: { ...mapped.metadata, previousUid },
        status: 'confirmed',
      })
      try {
        await notifyCalBookingRescheduled({ payload, mapped })
      } catch {
        /* email non bloquant */
      }
      return { ok: true, action: 'updated:booking_rescheduled' }
    }
  }

  const existingNew = await findBookingByProviderUid(mapped.providerBookingUid)
  if (existingNew) {
    await updateCalcomBookingByProviderUid(mapped.providerBookingUid, {
      bookingDate: mapped.bookingDate,
      slotTime: mapped.slotTime,
      calendarLink: mapped.calendarLink,
      metadata: mapped.metadata,
    })
    try {
      await notifyCalBookingRescheduled({ payload, mapped })
    } catch {
      /* email non bloquant */
    }
    return { ok: true, action: 'updated:booking_rescheduled_by_uid' }
  }

  await insertCalcomBooking({
    externalId: `CAL-${mapped.providerBookingUid}`,
    bookingDate: mapped.bookingDate,
    slotTime: mapped.slotTime,
    name: mapped.name,
    email: mapped.email,
    phone: mapped.phone,
    company: null,
    service: mapped.service,
    message: mapped.message,
    calendarLink: mapped.calendarLink,
    providerBookingUid: mapped.providerBookingUid,
    metadata: { ...mapped.metadata, fallback: 'rescheduled_without_previous_row' },
  })
  try {
    await notifyCalBookingRescheduled({ payload, mapped })
  } catch {
    /* email non bloquant */
  }
  return { ok: true, action: 'inserted:booking_rescheduled_fallback' }
}

async function handleCancelled(
  payload: CalcomBookingPayload
): Promise<{ ok: true; action: string } | { ok: false; error: string }> {
  const uid = typeof payload.uid === 'string' ? payload.uid : undefined
  if (!uid) return { ok: false, error: 'missing_uid_cancel' }

  const row = await findBookingByProviderUid(uid)
  if (!row) {
    return { ok: true, action: 'noop:cancel_unknown_uid' }
  }

  await updateCalcomBookingByProviderUid(uid, {
    status: 'cancelled',
    metadata: {
      ...(typeof row.metadata === 'object' && row.metadata !== null ? row.metadata : {}),
      cancelledAt: new Date().toISOString(),
    },
  })

  try {
    await notifyCalBookingCancelled({
      payload,
      email: row.email,
      name: row.name,
      bookingDate: row.bookingDate,
      slotTime: row.slotTime,
    })
  } catch {
    /* email non bloquant */
  }

  return { ok: true, action: 'updated:booking_cancelled' }
}
