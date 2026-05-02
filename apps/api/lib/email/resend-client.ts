/**
 * Client minimal [Resend](https://resend.com) tous les mails transactionnels passent par ici.
 *
 * Variables : `RESEND_API_KEY`, `RESEND_FROM` (ex. `HD Corporate <bookings@votredomaine.com>`).
 */
export function getResendConfig(): { apiKey: string; from: string } | null {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const from =
    process.env.RESEND_FROM?.trim() ||
    process.env.BOOKING_EMAIL_FROM?.trim() /** @deprecated utiliser RESEND_FROM */
  if (!apiKey || !from) return null
  return { apiKey, from }
}

export type ResendAttachment = {
  filename: string
  /** Contenu encodé base64 */
  content: string
}

export async function sendResendEmail(params: {
  to: string
  subject: string
  html: string
  attachments?: ResendAttachment[]
}): Promise<boolean> {
  const cfg = getResendConfig()
  if (!cfg) return false

  const body: Record<string, unknown> = {
    from: cfg.from,
    to: [params.to],
    subject: params.subject,
    html: params.html,
  }
  if (params.attachments?.length) {
    body.attachments = params.attachments
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cfg.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return res.ok
}
