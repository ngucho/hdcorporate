'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export function HeroSection() {
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
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen bg-hd-green pattern-lines overflow-hidden"
    >
      {/* Hero illustration */}
      <div className="absolute top-20 right-8 lg:right-16 w-48 lg:w-80 h-60 lg:h-96">
        <div className="relative w-full h-full rounded-lg overflow-hidden border border-hd-gold/30">
          <Image
            src="/images/hero-entrepreneur.jpg"
            alt="Entrepreneur confiant dans un bureau moderne"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-hd-green/60 to-transparent" />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-16 min-h-screen flex flex-col justify-center">
        {/* Badge */}
        <div className="reveal flex items-center gap-2 mb-8" style={{ transitionDelay: '0.3s' }}>
          <span className="w-2 h-2 bg-hd-gold rounded-full pulse-dot" />
          <span className="text-xs text-white/70 tracking-wide">
            Juriste certifié · SIREN 887 630 069
          </span>
        </div>

        {/* Main Title */}
        <h1 className="reveal font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight max-w-4xl mb-8" style={{ transitionDelay: '0.5s' }}>
          Lancez votre entreprise{' '}
          <em className="text-hd-gold italic">sans frontières</em>.
        </h1>

        {/* Subtitle */}
        <p className="reveal font-sans text-base lg:text-lg font-light text-white/65 max-w-2xl mb-12" style={{ transitionDelay: '0.75s' }}>
          Freelance, startup, PME ou entrepreneur à l'international — créez votre société (SAS, SASU, LLC Delaware)
          et sécurisez vos opérations avec un juriste dédié à votre réussite.
        </p>

        {/* CTAs */}
        <div className="reveal flex flex-col sm:flex-row gap-4 mb-16" style={{ transitionDelay: '1s' }}>
          <button
            onClick={() => scrollToSection('services')}
            className="bg-hd-gold text-hd-green px-8 py-4 text-sm font-medium rounded hover:bg-hd-gold/90 transition-colors"
          >
            Créer ma société — dès 299€
          </button>
          <button
            onClick={() => scrollToSection('booking')}
            className="flex items-center gap-2 text-white text-sm font-medium hover:text-hd-gold transition-colors group"
          >
            Appel découverte gratuit
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Stats */}
        <div className="reveal flex flex-wrap gap-8 lg:gap-16" style={{ transitionDelay: '1.2s' }}>
          <div className="flex items-center gap-3">
            <span className="text-hd-gold text-xs uppercase tracking-wider">M&A</span>
            <span className="text-white/50 text-xs">· Spécialisation</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-hd-gold text-xs uppercase tracking-wider">3-5 jours</span>
            <span className="text-white/50 text-xs">· Création France</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-hd-gold text-xs uppercase tracking-wider">3-4 sem.</span>
            <span className="text-white/50 text-xs">· LLC Delaware</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-6 lg:left-8 flex items-center gap-4">
          <div className="w-10 h-px bg-white/30" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
            Défiler
          </span>
        </div>
      </div>
    </section>
  )
}
