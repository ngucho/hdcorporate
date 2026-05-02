'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

const COLLAGE = [
  {
    src: '/images/hero-collage-dirigeante.png',
    alt: 'Dirigeante concentrée sur son projet — vous visés par HD Corporate',
    className:
      'absolute top-[22%] left-0 w-[58%] max-w-[280px] sm:max-w-[320px] lg:max-w-[340px] -rotate-[2.5deg] z-10 shadow-2xl ring-2 ring-white/20',
  },
  {
    src: '/images/hero-entrepreneur.jpg',
    alt: 'Entrepreneur confiant — création et structuration sans frontières',
    className:
      'absolute top-[36%] right-0 w-[62%] max-w-[300px] sm:max-w-[340px] lg:max-w-[380px] rotate-[1.5deg] z-20 shadow-2xl ring-2 ring-hd-gold/30',
  },
  {
    src: '/images/hero-collage-freelance.png',
    alt: 'Freelance au travail — le juriste au service de votre autonomie',
    className:
      'absolute bottom-[-2%] left-[8%] w-[56%] max-w-[260px] sm:max-w-[300px] lg:max-w-[320px] -rotate-[1deg] z-30 shadow-2xl ring-2 ring-white/25',
  },
] as const

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
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-28 pb-24 lg:pt-32 lg:pb-10 min-h-screen flex flex-col lg:grid lg:grid-cols-12 lg:min-h-[100svh] lg:items-stretch lg:gap-x-10 xl:gap-x-14">
        {/* Colonne texte */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center z-40 lg:pt-6 xl:pt-10">
          <div className="reveal flex items-center gap-2 mb-8" style={{ transitionDelay: '0.3s' }}>
            <span className="w-2 h-2 bg-hd-gold rounded-full pulse-dot" />
            <span className="text-xs text-white/70 tracking-wide">
              Juriste certifié · SIREN 887 630 069
            </span>
          </div>

          <h1
            className="reveal font-serif text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light text-white leading-tight mb-8"
            style={{ transitionDelay: '0.5s' }}
          >
            Lancez votre entreprise{' '}
            <em className="text-hd-gold italic">sans frontières</em>.
          </h1>

          <p
            className="reveal font-sans text-base lg:text-lg font-light text-white/65 max-w-xl mb-12"
            style={{ transitionDelay: '0.75s' }}
          >
            Freelance, startup, PME ou entrepreneur à l&apos;international : créez votre société (SAS, SASU,
            LLC Delaware) et sécurisez vos opérations avec un juriste dédié à votre réussite.
          </p>

          <div className="reveal flex flex-col sm:flex-row gap-4 mb-14 lg:mb-16" style={{ transitionDelay: '1s' }}>
            <button
              type="button"
              onClick={() => scrollToSection('services')}
              className="bg-hd-gold text-hd-green px-8 py-4 text-sm font-medium rounded hover:bg-hd-gold/90 transition-colors w-fit"
            >
              Créer ma société dès 299€
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('booking')}
              className="flex items-center gap-2 text-white text-sm font-medium hover:text-hd-gold transition-colors group w-fit"
            >
              Appel découverte gratuit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="reveal flex flex-wrap gap-8 lg:gap-12 mb-10 lg:mb-0" style={{ transitionDelay: '1.2s' }}>
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

          <div className="hidden lg:flex items-center gap-4 mt-12 text-white/50">
            <div className="w-10 h-px bg-white/30" />
            <span className="text-[10px] uppercase tracking-[0.2em]">Défiler</span>
          </div>
        </div>

        {/* Collage photo — droite, ancré vers le bas de la section */}
        <div
          className="reveal relative mt-14 lg:mt-0 lg:col-span-7 xl:col-span-7 w-full min-h-[380px] sm:min-h-[440px] lg:flex lg:min-h-0 lg:flex-col lg:justify-end lg:pb-6 xl:pb-10"
          style={{ transitionDelay: '0.45s' }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-hd-gold/5 via-transparent to-hd-green/40 pointer-events-none" />
          <div className="relative h-full min-h-[380px] sm:min-h-[420px] lg:min-h-[min(72vh,720px)] w-full max-w-lg lg:max-w-none mx-auto lg:mx-0 lg:ml-auto">
            {COLLAGE.map((item, i) => (
              <div
                key={item.src}
                className={`${item.className} rounded-lg overflow-hidden bg-hd-green/20`}
              >
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 45vw, 33vw"
                    priority={i <= 1}
                  />
                  <div
                    className={`pointer-events-none absolute inset-0 ${
                      i === 1
                        ? 'bg-gradient-to-t from-hd-green/55 via-hd-green/10 to-transparent'
                        : 'bg-gradient-to-t from-hd-green/45 to-transparent'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:hidden absolute bottom-10 left-6 flex items-center gap-4 text-white/50">
          <div className="w-10 h-px bg-white/30" />
          <span className="text-[10px] uppercase tracking-[0.2em]">Défiler</span>
        </div>
      </div>
    </section>
  )
}
