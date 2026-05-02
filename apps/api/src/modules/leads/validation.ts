import type { LeadRequest } from '@hd-corporate/contracts'

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validateLeadRequest(data: unknown): data is LeadRequest {
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
