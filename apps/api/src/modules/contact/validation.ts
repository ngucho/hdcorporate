import type { ContactRequest } from '@hd-corporate/contracts'

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validateContactRequest(data: unknown): data is ContactRequest {
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
