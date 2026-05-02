'use client'

import { useEffect } from 'react'

function scrollToId(id: string) {
  if (!id) return
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Après navigation vers `/#booking` ou `/#services`, assure le scroll (contenu dynamique / Cal). */
export function HomeHashScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const id = window.location.hash.replace(/^#/, '')
    if (!id || (id !== 'booking' && id !== 'services')) return

    scrollToId(id)
    const a = window.setTimeout(() => scrollToId(id), 150)
    const b = window.setTimeout(() => scrollToId(id), 500)
    const c = window.setTimeout(() => scrollToId(id), 1200)

    return () => {
      window.clearTimeout(a)
      window.clearTimeout(b)
      window.clearTimeout(c)
    }
  }, [])

  return null
}
