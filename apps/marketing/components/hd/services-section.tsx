'use client'

import type { PublicService } from '@hd-corporate/db'
import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { STATIC_SERVICES_FALLBACK } from '@/lib/server/services-fallback'

type ServiceCard = {
  key: string
  title: string
  price: string
  badge?: string
  delay?: string
  features: string[]
}

function fromPublic(rows: PublicService[]): ServiceCard[] {
  return rows.map((s) => ({
    key: s.slug,
    title: s.title,
    price: s.price,
    badge: s.badge,
    delay: s.delay,
    features: s.features,
  }))
}

function fromFallback(): ServiceCard[] {
  return STATIC_SERVICES_FALLBACK.map((s) => ({
    key: s.id,
    title: s.title,
    price: s.price,
    badge: s.badge,
    delay: s.delay,
    features: s.features,
  }))
}

export function ServicesSection({ services }: { services: PublicService[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const cards: ServiceCard[] =
    services.length > 0 ? fromPublic(services) : fromFallback()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal')
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

  const scrollToBooking = () => {
    const element = document.getElementById('booking')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-hd-green pattern-lines py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <h2
            className="reveal font-serif text-3xl md:text-4xl lg:text-5xl font-light text-white"
            style={{ transitionDelay: '0.1s' }}
          >
            Nos <em className="italic text-hd-gold">offres</em>
          </h2>
          <p
            className="reveal text-sm text-white/50 mt-4 lg:mt-0"
            style={{ transitionDelay: '0.2s' }}
          >
            Transparence totale sur nos tarifs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((service, index) => (
            <div
              key={service.key}
              className="reveal group relative bg-white/[0.04] p-8 rounded-lg hover:bg-hd-gold/10 transition-all duration-500"
              style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
            >
              {service.badge && (
                <span className="absolute top-6 right-6 bg-hd-gold text-hd-green text-xs font-medium px-3 py-1 rounded">
                  {service.badge}
                </span>
              )}

              <div className="font-serif text-3xl lg:text-4xl text-white mb-2">
                {service.price}
              </div>

              <h3 className="font-serif text-xl text-white/90 mb-2">{service.title}</h3>

              {service.delay ? (
                <p className="text-xs text-hd-gold/80 mb-6">Délai : {service.delay}</p>
              ) : (
                <div className="mb-6" />
              )}

              <ul className="space-y-2 mb-8">
                {service.features.map((feature) => (
                  <li key={feature} className="text-sm text-white/60 font-light">
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={scrollToBooking}
                className="absolute bottom-6 right-6 text-white/40 group-hover:text-hd-gold transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
