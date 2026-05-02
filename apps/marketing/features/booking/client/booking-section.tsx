'use client'

import { useEffect, useRef, useState } from 'react'
import { BookingMarketingAside } from './components/booking-marketing-aside'
import { CalcomEmbed } from './calcom-embed'
import { getPublicCalcomCalLink } from '@/lib/calcom-public-config'

const BOOKING_CONTEXT_KEY = 'hd-booking-context'

export function BookingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const calLink = getPublicCalcomCalLink()
  const [bookingIntentLabel, setBookingIntentLabel] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right')
            elements.forEach((el) => el.classList.add('visible'))
          }
        })
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(BOOKING_CONTEXT_KEY)
      if (!raw) return
      const data = JSON.parse(raw) as { title?: string }
      if (data.title && typeof data.title === 'string') {
        setBookingIntentLabel(data.title)
      }
      sessionStorage.removeItem(BOOKING_CONTEXT_KEY)
    } catch {
      /* ignore */
    }
  }, [])

  return (
    <section id="booking" ref={sectionRef} className="bg-hd-cream py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[min(100%,1680px)] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
          <BookingMarketingAside intentLabel={bookingIntentLabel} />

          {/* Pas de classe reveal sur l’embed : opacity 0 jusqu’à l’IO peut empêcher le booker Cal de se dimensionner / s’afficher. */}
          <div
            className={calLink ? 'min-w-0 w-full max-w-[min(100%,980px)]' : 'reveal-right min-w-0'}
            style={calLink ? undefined : { transitionDelay: '0.3s' }}
          >
            {calLink ? (
              <div className="-mx-4 w-[calc(100%+2rem)] min-w-0 sm:-mx-6 sm:w-[calc(100%+3rem)] lg:mx-0 lg:w-full">
                <CalcomEmbed calLink={calLink} />
              </div>
            ) : (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
                <p className="font-medium">Cal.com non configuré</p>
                <p className="mt-2 text-amber-800">
                  Définissez <code className="rounded bg-amber-100 px-1">NEXT_PUBLIC_CALCOM_CAL_LINK</code> dans{' '}
                  <code className="rounded bg-amber-100 px-1">apps/marketing/.env.local</code> (format{' '}
                  <code className="rounded bg-amber-100 px-1">username/slug</code>). Voir{' '}
                  <code className="rounded bg-amber-100 px-1">docs/setup/calcom.md</code>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
