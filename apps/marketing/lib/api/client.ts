// ============================================
// HD Corporate - API Client (Frontend)
// Optimized client with caching, deduplication, and error handling
// ============================================

import type {
  ContactRequest,
  ContactResponse,
  ServicesResponse,
  LeadRequest,
  LeadResponse,
  ApiResponse,
  ApiError,
} from './types'

/**
 * Public HTTP API: production `https://api.hdcorporate.com/api/...`.
 * Local: `NEXT_PUBLIC_API_URL=http://localhost:3002` (see apps/api dev port).
 */
function getPublicApiPrefix(): string {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')
  if (base) return `${base}/api`
  return '/api'
}

// Request deduplication cache
const pendingRequests = new Map<string, Promise<unknown>>()

// Simple in-memory cache for GET requests
const cache = new Map<string, { data: unknown; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    cacheKey?: string
  ): Promise<ApiResponse<T>> {
    const url = `${getPublicApiPrefix()}${endpoint}`
    const method = options.method || 'GET'

    // Check cache for GET requests
    if (method === 'GET' && cacheKey) {
      const cached = cache.get(cacheKey)
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return { data: cached.data as T, timestamp: new Date().toISOString() }
      }
    }

    // Deduplicate identical in-flight requests
    const requestKey = `${method}:${url}:${JSON.stringify(options.body)}`
    const pending = pendingRequests.get(requestKey)
    if (pending) {
      return pending as Promise<ApiResponse<T>>
    }

    const requestPromise = (async () => {
      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        })

        const data = await response.json()

        if (!response.ok) {
          const error: ApiError = {
            code: data.code || 'UNKNOWN_ERROR',
            message: data.message || 'Une erreur est survenue',
            details: data.details,
          }
          return { error, timestamp: new Date().toISOString() }
        }

        // Cache successful GET responses
        if (method === 'GET' && cacheKey) {
          cache.set(cacheKey, { data, timestamp: Date.now() })
        }

        return { data: data as T, timestamp: new Date().toISOString() }
      } catch (error) {
        const apiError: ApiError = {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Erreur réseau',
        }
        return { error: apiError, timestamp: new Date().toISOString() }
      } finally {
        pendingRequests.delete(requestKey)
      }
    })()

    pendingRequests.set(requestKey, requestPromise)
    return requestPromise
  }

  // ---- Contact Endpoints ----
  async submitContact(contact: ContactRequest): Promise<ApiResponse<ContactResponse>> {
    return this.request<ContactResponse>('/contact', {
      method: 'POST',
      body: JSON.stringify(contact),
    })
  }

  // ---- Services Endpoints ----
  async getServices(): Promise<ApiResponse<ServicesResponse>> {
    return this.request<ServicesResponse>('/services', { method: 'GET' }, 'services')
  }

  // ---- Lead Capture ----
  async captureLead(lead: LeadRequest): Promise<ApiResponse<LeadResponse>> {
    return this.request<LeadResponse>('/leads', {
      method: 'POST',
      body: JSON.stringify(lead),
    })
  }

  // ---- Cache Management ----
  clearCache(key?: string) {
    if (key) {
      cache.delete(key)
    } else {
      cache.clear()
    }
  }
}

// Singleton instance
export const apiClient = new ApiClient()

// Hooks helpers for SWR
export const fetchers = {
  services: () => apiClient.getServices().then((r) => r.data),
}
