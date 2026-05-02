'use client'

import { useEffect, useRef } from 'react'
import { scrollToId } from '@/lib/scroll-to-id'

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section
      ref={sectionRef}
      className="bg-hd-cream-dark py-24 lg:py-32"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative line */}
        <div className="reveal flex items-center justify-center gap-4 mb-8" style={{ transitionDelay: '0.1s' }}>
          <div className="w-12 h-px bg-hd-green/20" />
          <span className="text-sm text-hd-green/50">Prêt à vous lancer ?</span>
          <div className="w-12 h-px bg-hd-green/20" />
        </div>

        {/* Title */}
        <h2 className="reveal font-serif text-4xl md:text-5xl lg:text-6xl font-light text-hd-green mb-6" style={{ transitionDelay: '0.2s' }}>
          Votre entreprise commence ici.
        </h2>

        {/* Subtitle */}
        <p className="reveal text-hd-green/70 mb-10 max-w-xl mx-auto" style={{ transitionDelay: '0.3s' }}>
          {"Que vous créiez votre première société, structuriez une croissance ou sécurisiez une opération importante nous sommes là pour vous accompagner. Premier appel offert, zéro engagement."}
        </p>

        {/* CTAs */}
        <div className="reveal flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ transitionDelay: '0.4s' }}>
          <button
            type="button"
            onClick={() => scrollToId('booking')}
            className="inline-flex min-h-11 w-full items-center justify-center rounded bg-hd-green px-8 py-3 font-medium text-white transition-colors hover:bg-hd-green/90 sm:w-auto"
          >
            Réserver mon appel gratuit
          </button>
          <button
            type="button"
            onClick={() => scrollToId('services')}
            className="inline-flex min-h-11 w-full items-center justify-center rounded border-2 border-hd-green px-8 py-3 font-medium text-hd-green transition-colors hover:bg-hd-green hover:text-white sm:w-auto"
          >
            Créer ma société 299€
          </button>
        </div>
      </div>
    </section>
  )
}
