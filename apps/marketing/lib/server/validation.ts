// ============================================
// HD Corporate - Server Validation Utilities
// ============================================

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Validate French phone number
 */
export function validateFrenchPhone(phone: string): boolean {
  const cleaned = phone.replace(/\s+/g, '').replace(/[-().]/g, '')
  return /^(\+33|0033|0)[1-9]\d{8}$/.test(cleaned)
}

/**
 * Sanitize string input (basic XSS prevention)
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .trim()
}

/**
 * Validate date is in the future
 */
export function isFutureDate(dateStr: string): boolean {
  const date = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date >= today
}

/**
 * Validate business hours (French timezone)
 */
export function isBusinessHours(time: string): boolean {
  const [hours] = time.split(':').map(Number)
  // 9h-12h and 14h-18h
  return (hours >= 9 && hours < 12) || (hours >= 14 && hours < 18)
}

/**
 * Generate a unique ID
 */
export function generateId(prefix: string = 'ID'): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `${prefix}-${timestamp}-${random}`.toUpperCase()
}
