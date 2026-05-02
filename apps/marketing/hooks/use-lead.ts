// ============================================
// HD Corporate - Lead Capture Hook (Client)
// ============================================

'use client'

import { useState, useCallback } from 'react'
import { apiClient } from '@/lib/api/client'
import type { LeadRequest } from '@/lib/api/types'

export function useCaptureLead() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const captureLead = useCallback(async (lead: LeadRequest) => {
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await apiClient.captureLead(lead)

      if (response.error) {
        setError(response.error.message)
        return false
      }

      setSuccess(true)
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue'
      setError(message)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const reset = useCallback(() => {
    setError(null)
    setSuccess(false)
  }, [])

  return {
    captureLead,
    isSubmitting,
    error,
    success,
    reset,
  }
}
