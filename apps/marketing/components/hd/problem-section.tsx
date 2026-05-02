'use client'

import { useEffect, useRef } from 'react'

const problems = [
  {
    number: '01',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v18M3 12l4.5 4.5L12 12l4.5 4.5L21 12" />
        <circle cx="12" cy="3" r="2" />
      </svg>
    ),
    title: 'Les LegalTech sont froides',
    description: 'Formulaires automatisés, aucun conseiller dédié. Vous avez une question spécifique ? Débrouillez-vous.',
  },
  {
    number: '02',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5h3" />
        <path d="M8 12h1M15 12h1" />
      </svg>
    ),
    title: 'Les cabinets sont inaccessibles',
    description: '900€ à 3000€ pour des statuts, tarifs opaques. Quand on démarre avec peu de moyens, chaque euro compte.',
  },
  {
    number: '03',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <ellipse cx="12" cy="12" rx="4" ry="10" />
      </svg>
    ),
    title: 'Personne ne comprend votre réalité',
    description: "Jeune fondateur, dirigeant de PME ou entrepreneur à l'international : le marché vous propose soit du tout-automatisé sans conseil, soit des honoraires inabordables. Il existe mieux.",
  },
]

export function ProblemSection() {
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
      className="bg-hd-cream py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <span className="reveal text-sm text-hd-green/60 tracking-wide" style={{ transitionDelay: '0.1s' }}>
            Le problème que nous résolvons
          </span>
          <h2 className="reveal font-serif text-3xl md:text-4xl lg:text-5xl font-light text-hd-green mt-4 max-w-3xl" style={{ transitionDelay: '0.2s' }}>
            Entreprendre ne devrait jamais être un privilège.
          </h2>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-hd-green/10">
          {problems.map((problem, index) => (
            <div
              key={problem.number}
              className="reveal group relative bg-hd-cream p-8 lg:p-10 hover:bg-hd-green transition-all duration-500"
              style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
            >
              {/* Background number */}
              <span className="absolute top-4 right-4 font-serif text-6xl lg:text-7xl text-hd-green/5 group-hover:text-white/5 transition-colors duration-500">
                {problem.number}
              </span>

              {/* Content */}
              <div className="relative z-10">
                <div className="text-hd-green group-hover:text-hd-gold transition-colors duration-500 mb-6">
                  {problem.icon}
                </div>
                <h3 className="font-serif text-xl lg:text-2xl text-hd-green group-hover:text-white transition-colors duration-500 mb-4">
                  {problem.title}
                </h3>
                <p className="font-sans text-sm text-hd-green/70 group-hover:text-white/70 transition-colors duration-500 leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
