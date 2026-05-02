'use client'

import { useEffect } from 'react'
import { scrollToId as scrollToIdSmooth } from '@/lib/scroll-to-id'

function scrollToHashTarget(id: string) {
  if (!id) return
  scrollToIdSmooth(id, 'start')
}

/** Après navigation vers `/#booking` ou `/#services`, assure le scroll (contenu dynamique / Cal). */
export function HomeHashScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const id = window.location.hash.replace(/^#/, '')
    if (!id || (id !== 'booking' && id !== 'services')) return

    scrollToHashTarget(id)
    const a = window.setTimeout(() => scrollToHashTarget(id), 150)
    const b = window.setTimeout(() => scrollToHashTarget(id), 500)
    const c = window.setTimeout(() => scrollToHashTarget(id), 1200)

    return () => {
      window.clearTimeout(a)
      window.clearTimeout(b)
      window.clearTimeout(c)
    }
  }, [])

  return null
}
