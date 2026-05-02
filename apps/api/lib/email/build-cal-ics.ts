function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
}

function toIcsUtcCompact(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z/, 'Z')
}

/** ICS minimal pour pièce jointe Resend (UTC). */
export function buildCalcomBookingIcs(input: {
  uid: string
  startIso: string
  endIso: string
  summary: string
  description: string
  location: string
}): string {
  const dtstamp = toIcsUtcCompact(new Date().toISOString())
  const dtstart = toIcsUtcCompact(input.startIso)
  const dtend = toIcsUtcCompact(input.endIso || input.startIso)
  const uid = `${input.uid}@calcom-hd-corporate`
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//HD Corporate//Cal.com//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${escapeIcsText(input.summary)}`,
    `DESCRIPTION:${escapeIcsText(input.description)}`,
    `LOCATION:${escapeIcsText(input.location || 'Visioconférence')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n')
}
