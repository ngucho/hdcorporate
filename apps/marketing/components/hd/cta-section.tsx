'use client'

import { useEffect, useRef } from 'react'

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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={sectionRef}
      className="bg-hd-cream-dark py-24 lg:py-32"
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
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
        <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-4" style={{ transitionDelay: '0.4s' }}>
          <button
            onClick={() => scrollToSection('booking')}
            className="w-full sm:w-auto bg-hd-green text-white px-8 py-4 rounded font-medium hover:bg-hd-green/90 transition-colors"
          >
            Réserver mon appel gratuit
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="w-full sm:w-auto border-2 border-hd-green text-hd-green px-8 py-4 rounded font-medium hover:bg-hd-green hover:text-white transition-colors"
          >
            Créer ma société 299€
          </button>
        </div>
      </div>
    </section>
  )
}
