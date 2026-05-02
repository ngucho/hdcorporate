'use client'

import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    number: '1',
    title: 'Formulaire en ligne',
    duration: '10 min',
    description: 'Vous décrivez votre projet via notre formulaire intelligent',
  },
  {
    number: '2',
    title: 'Statuts sur-mesure',
    duration: '48h',
    description: 'Nous rédigeons vos statuts adaptés à votre situation',
  },
  {
    number: '3',
    title: 'Signature électronique',
    duration: 'immédiat',
    description: 'Vous validez et signez depuis votre téléphone',
  },
  {
    number: '4',
    title: 'Kbis reçu',
    duration: 'J+5',
    description: 'Votre entreprise est immatriculée, vous recevez votre Kbis',
  },
]

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const [lineProgress, setLineProgress] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal')
            elements.forEach((el) => el.classList.add('visible'))
            
            // Animate line
            setTimeout(() => {
              setLineProgress(100)
            }, 500)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="process"
      ref={sectionRef}
      className="bg-hd-green pattern-lines py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="reveal font-serif text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4" style={{ transitionDelay: '0.1s' }}>
            {"De l'idée à l'entreprise en"} <em className="italic text-hd-gold">5 jours.</em>
          </h2>
          <p className="reveal text-sm text-white/50" style={{ transitionDelay: '0.2s' }}>
            Un processus 100% digital, sans rendez-vous physique obligatoire
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-8 left-[calc(12.5%+16px)] right-[calc(12.5%+16px)] h-px">
            <div className="w-full h-full border-t-2 border-dashed border-white/20" />
            <div
              ref={lineRef}
              className="absolute top-0 left-0 h-full bg-hd-gold transition-all duration-1500 ease-out"
              style={{ width: `${lineProgress}%`, height: '2px', marginTop: '-1px' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="reveal relative text-center"
                style={{ transitionDelay: `${0.3 + index * 0.15}s` }}
              >
                {/* Number circle */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 mb-6">
                  <div className="absolute inset-0 border-2 border-hd-gold rounded-full" />
                  <span className="font-serif text-2xl text-hd-gold">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl text-white mb-2">
                  {step.title}
                </h3>

                {/* Duration badge */}
                <div className="inline-block border border-hd-gold/50 rounded-full px-3 py-1 mb-4">
                  <span className="text-xs text-hd-gold">{step.duration}</span>
                </div>

                <p className="text-sm text-white/60 max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
