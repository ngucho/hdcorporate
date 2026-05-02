'use client'

import { useEffect, useRef } from 'react'
import { Star } from 'lucide-react'

const badges = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: "Formalités prêtes pour l'administration",
    subtitle: 'Cabinet enregistré INPI : dossiers et immatriculations rédigés pour limiter les allers-retours.',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    title: "Structuration à la hauteur de l'enjeu",
    subtitle: 'Formation Master M&A (Paris-Saclay) : pièces et montages pensés comme en société de droit.',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'France, international, à distance',
    subtitle: 'Français et anglais, comptes rendus clairs pour vos partenaires, banques ou investisseurs.',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Une pratique connectée aux dirigeants',
    subtitle:
      "Membre du Comité d'affaires CACULF : veille et échanges utiles face aux formalités et aux arbitrages.",
  },
]

const testimonials = [
  {
    quote: "Zéro connaissance juridique au départ. Hamidou m'a tout expliqué clairement structure adaptée, statuts soignés. Ma SASU était opérationnelle en 5 jours.",
    name: 'Thomas L.',
    role: 'Développeur freelance, Paris',
    initials: 'TL',
  },
  {
    quote: "HD Corporate gère notre secrétariat juridique depuis plusieurs mois. PV d'assemblées, approbation des comptes… tout est traité rapidement et sans prise de tête.",
    name: 'Marie C.',
    role: 'Dirigeante, Cabinet de consulting RH',
    initials: 'MC',
  },
  {
    quote: "Le secrétariat juridique mensuel me libère d'un poids énorme. Je me concentre sur mon business, HD Corporate gère le reste.",
    name: 'Antoine R.',
    role: 'CEO, Agence digitale',
    initials: 'AR',
  },
]

export function TrustSection() {
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
      className="bg-hd-green pattern-lines py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2 className="reveal font-serif text-3xl md:text-4xl lg:text-5xl font-light text-white mb-16" style={{ transitionDelay: '0.1s' }}>
          Ils nous font <em className="italic text-hd-gold">confiance</em>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Badges */}
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ transitionDelay: '0.2s' }}>
            {badges.map((badge) => (
              <div
                key={badge.title}
                className="bg-white/[0.04] rounded-lg p-5 flex items-start gap-4"
              >
                <div className="text-hd-gold flex-shrink-0">
                  {badge.icon}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{badge.title}</p>
                  <p className="text-white/50 text-xs mt-0.5">{badge.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="reveal bg-white/[0.05] rounded-lg p-6"
                style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-hd-gold fill-hd-gold" />
                  ))}
                </div>
                <p className="font-serif text-white/90 italic text-sm leading-relaxed mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-hd-gold/20 rounded-full flex items-center justify-center">
                    <span className="text-hd-gold text-xs font-medium">{testimonial.initials}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{testimonial.name}</p>
                    <p className="text-white/50 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </div>
    </section>
  )
}
