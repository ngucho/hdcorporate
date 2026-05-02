import { buildCalcomBookingIcs } from './build-cal-ics.js'
import { sendResendEmail } from './resend-client.js'
import { extractVideoCallUrl, type CalcomBookingPayload } from '../calcom/map-payload.js'

function firstName(name: string): string {
  return name.split(/\s+/)[0] || name
}

function resolveTimes(payload: CalcomBookingPayload): { start: string; end: string } | null {
  const start = typeof payload.startTime === 'string' ? payload.startTime : null
  if (!start) return null
  const end =
    typeof payload.endTime === 'string' && payload.endTime.length > 0 ? payload.endTime : start
  return { start, end }
}

function humanWhen(bookingDate: string, slotTime: string): string {
  return `${bookingDate} à ${slotTime}`
}

export async function notifyCalBookingConfirmed(params: {
  payload: CalcomBookingPayload
  mapped: {
    name: string
    email: string
    service: string
    message: string | null
    bookingDate: string
    slotTime: string
    calendarLink: string
  }
}): Promise<boolean> {
  const times = resolveTimes(params.payload)
  if (!times) return false

  const meet = extractVideoCallUrl(params.payload as Record<string, unknown>)
  const loc = meet || params.mapped.calendarLink || 'Visioconférence'
  const ics = buildCalcomBookingIcs({
    uid: String(params.payload.uid),
    startIso: times.start,
    endIso: times.end,
    summary: `HD Corporate ${params.mapped.service}`,
    description: [params.mapped.message, meet ? `Visio : ${meet}` : ''].filter(Boolean).join('\n'),
    location: loc,
  })

  const when = humanWhen(params.mapped.bookingDate, params.mapped.slotTime)
  const meetBlock = meet
    ? `<p><strong>Lien visio :</strong> <a href="${meet}">${meet}</a></p>`
    : '<p>Le lien de visio figure dans votre invitation Cal.com.</p>'

  const html = `
    <p>Bonjour ${firstName(params.mapped.name)},</p>
    <p>Votre rendez-vous HD Corporate est <strong>confirmé</strong> pour le <strong>${when}</strong>.</p>
    ${meetBlock}
    <p>Vous pouvez enregistrer l’événement avec la pièce jointe .ics.</p>
    <p>À très bientôt,<br/>L’équipe HD Corporate</p>
  `.trim()

  return sendResendEmail({
    to: params.mapped.email,
    subject: `Confirmation de rendez-vous ${when}`,
    html,
    attachments: [
      {
        filename: `hd-corporate-${params.mapped.bookingDate}-${params.mapped.slotTime.replace(':', 'h')}.ics`,
        content: Buffer.from(ics, 'utf8').toString('base64'),
      },
    ],
  })
}

export async function notifyCalBookingRescheduled(params: {
  payload: CalcomBookingPayload
  mapped: {
    name: string
    email: string
    service: string
    message: string | null
    bookingDate: string
    slotTime: string
    calendarLink: string
  }
}): Promise<boolean> {
  const times = resolveTimes(params.payload)
  if (!times) return false

  const meet = extractVideoCallUrl(params.payload as Record<string, unknown>)
  const loc = meet || params.mapped.calendarLink || 'Visioconférence'
  const ics = buildCalcomBookingIcs({
    uid: String(params.payload.uid),
    startIso: times.start,
    endIso: times.end,
    summary: `HD Corporate ${params.mapped.service} (nouvel horaire)`,
    description: [params.mapped.message, meet ? `Visio : ${meet}` : ''].filter(Boolean).join('\n'),
    location: loc,
  })

  const when = humanWhen(params.mapped.bookingDate, params.mapped.slotTime)
  const html = `
    <p>Bonjour ${firstName(params.mapped.name)},</p>
    <p>Votre rendez-vous HD Corporate a été <strong>replanifié</strong> au <strong>${when}</strong>.</p>
    ${meet ? `<p><strong>Lien visio :</strong> <a href="${meet}">${meet}</a></p>` : ''}
    <p>Pièce jointe .ics mise à jour.</p>
    <p>À très bientôt,<br/>L’équipe HD Corporate</p>
  `.trim()

  return sendResendEmail({
    to: params.mapped.email,
    subject: `Rendez-vous replanifié ${when}`,
    html,
    attachments: [
      {
        filename: `hd-corporate-${params.mapped.bookingDate}-${params.mapped.slotTime.replace(':', 'h')}.ics`,
        content: Buffer.from(ics, 'utf8').toString('base64'),
      },
    ],
  })
}

export async function notifyCalBookingCancelled(params: {
  payload: CalcomBookingPayload
  email: string
  name: string
  bookingDate: string
  slotTime: string
}): Promise<boolean> {
  const when = humanWhen(params.bookingDate, params.slotTime)
  const html = `
    <p>Bonjour ${firstName(params.name)},</p>
    <p>Votre rendez-vous HD Corporate du <strong>${when}</strong> a été <strong>annulé</strong>.</p>
    <p>Pour reprendre un créneau, vous pouvez refaire une réservation sur notre site.</p>
    <p>Cordialement,<br/>L’équipe HD Corporate</p>
  `.trim()

  return sendResendEmail({
    to: params.email,
    subject: `Annulation ${when}`,
    html,
  })
}
