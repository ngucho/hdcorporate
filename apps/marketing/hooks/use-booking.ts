// ============================================
// HD Corporate - Booking Hooks (Client)
// ============================================

'use client'

import useSWR from 'swr'
import { useState, useCallback } from 'react'
import { apiClient } from '@/lib/api/client'
import type { BookingRequest, TimeSlot } from '@/lib/api/types'

// Fetcher for SWR
const slotsFetcher = async (date: string): Promise<TimeSlot[]> => {
  const response = await apiClient.getAvailableSlots(date)
  if (response.error) {
    throw new Error(response.error.message)
  }
  return response.data?.slots || []
}

// Hook for fetching available slots
export function useAvailableSlots(date: string | null) {
  const { data, error, isLoading, mutate } = useSWR(
    date ? `slots-${date}` : null,
    () => (date ? slotsFetcher(date) : null),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
    }
  )

  return {
    slots: data || [],
    isLoading,
    error: error?.message,
    refresh: mutate,
  }
}

// Hook for creating a booking
export function useCreateBooking() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createBooking = useCallback(async (booking: BookingRequest) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await apiClient.createBooking(booking)

      if (response.error) {
        setError(response.error.message)
        return null
      }

      // Invalidate slots cache for this date
      apiClient.invalidateSlotsCache(booking.date)

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
  }, [])

  return {
    createBooking,
    isSubmitting,
    error,
    reset,
  }
}
