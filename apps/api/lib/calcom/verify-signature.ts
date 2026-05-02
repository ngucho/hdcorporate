import { createHmac, timingSafeEqual } from 'node:crypto'

/**
 * Vérifie l’en-tête `x-cal-signature-256` (HMAC-SHA256 du corps brut) voir
 * https://cal.com/docs/developing/guides/automation/webhooks
 */
export function verifyCalcomWebhookSignature(
  rawBody: string,
  signatureHeader: string | null | undefined,
  secret: string
): boolean {
  if (!secret || !signatureHeader) return false
  const expected = createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex')
  try {
    const a = Buffer.from(expected, 'utf8')
    const b = Buffer.from(signatureHeader.trim(), 'utf8')
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}
