'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

const STORAGE_KEY = 'hd-booking-context'

type Props = {
  serviceSlug: string
  serviceTitle: string
  children: ReactNode
  className?: string
}

/**
 * Lien vers l’accueil + section réservation. Enregistre le contexte offre pour affichage côté booking.
 */
export function BookingCtaLink({ serviceSlug, serviceTitle, children, className }: Props) {
  return (
    <Link
      href="/#booking"
      className={className}
      onClick={() => {
        try {
          sessionStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ slug: serviceSlug, title: serviceTitle, ts: Date.now() })
          )
        } catch {
          /* quota / private mode */
        }
      }}
    >
      {children}
    </Link>
  )
}
