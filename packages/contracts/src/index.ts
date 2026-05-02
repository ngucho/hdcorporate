/** Shared API contracts (marketing client + public API). */

export * from './auth0-claims.js'
export * from './rbac.js'

export interface ContactRequest {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface ContactResponse {
  success: boolean
  ticketId?: string
  error?: string
}

export interface Service {
  id: string
  title: string
  price: string
  badge?: string
  delay?: string
  features: string[]
  category: 'creation' | 'international' | 'secretariat' | 'corporate'
}

export interface ServicesResponse {
  services: Service[]
}

export interface LeadRequest {
  email: string
  source: 'newsletter' | 'booking' | 'contact' | 'download'
  metadata?: Record<string, string>
}

export interface LeadResponse {
  success: boolean
  error?: string
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, string>
}

export interface ApiResponse<T> {
  data?: T
  error?: ApiError
  timestamp: string
}
