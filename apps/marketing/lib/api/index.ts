// ============================================
// HD Corporate - API Module Barrel Export
// ============================================

// Types
export type {
  ContactRequest,
  ContactResponse,
  Service,
  ServicesResponse,
  LeadRequest,
  LeadResponse,
  ApiError,
  ApiResponse,
} from './types'

// Client
export { apiClient, fetchers } from './client'
