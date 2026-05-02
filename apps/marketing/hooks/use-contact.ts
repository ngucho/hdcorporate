// ============================================
// HD Corporate - Contact Hook (Client)
// ============================================

'use client'

import { useState, useCallback } from 'react'
import { apiClient } from '@/lib/api/client'
import type { ContactRequest } from '@/lib/api/types'

export function useSubmitContact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submitContact = useCallback(async (contact: ContactRequest) => {
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await apiClient.submitContact(contact)

      if (response.error) {
        setError(response.error.message)
        return null
      }

      setSuccess(true)
      return response.data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue'
      setError(message)
      return null
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const reset = useCallback(() => {
    setError(null)
    setSuccess(false)
  }, [])

  return {
    submitContact,
    isSubmitting,
    error,
    success,
    reset,
  }
}
