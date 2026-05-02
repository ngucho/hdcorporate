'use client'

import { useEffect, useRef } from 'react'

const skills = [
  'M&A',
  'Due Diligence',
  'Corporate',
  'LBO',
  'Private Equity',
  'SPA',
  'Droit des sociétés',
]

const education = [
  {
    years: '2022-2023',
    title: 'Master Fusions & Acquisitions',
    institution: 'Université Paris-Saclay',
  },
  {
    years: '2017-2020',
    title: 'Licence de Droit',
    institution: 'Université Paris-Saclay',
  },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-hd-cream-dark py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Portrait */}
          <div className="reveal-left relative" style={{ transitionDelay: '0.2s' }}>
            <div className="relative aspect-[3/4] bg-hd-green rounded-lg overflow-hidden">
              {/* Initials */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-[12rem] lg:text-[16rem] text-hd-gold/10 font-bold select-none">
                  HD
                </span>
              </div>

              {/* Name plate */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-hd-green/90 backdrop-blur-sm border border-hd-gold/20 rounded px-4 py-3">
                  <p className="text-white text-sm font-medium">Hamidou Diallo</p>
                  <p className="text-white/60 text-xs">Fondateur · Juriste</p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 lg:bottom-8 lg:-right-6">
                <div className="bg-hd-gold rounded-lg px-4 py-3 text-center shadow-lg">
                  <span className="font-serif text-2xl text-hd-green font-bold block">2026</span>
                  <span className="text-xs text-hd-green/80">Fondateur</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="reveal-right" style={{ transitionDelay: '0.3s' }}>
            <span className="text-sm text-hd-green/60 tracking-wide">
              — Le fondateur
            </span>

            <h2 className="font-serif text-3xl md:text-4xl font-light text-hd-green mt-4 mb-6">
              Hamidou Diallo, juriste en droit des affaires
            </h2>

            <p className="text-hd-green/80 leading-relaxed mb-6">
              {"Diplômé d'un Master Fusions & Acquisitions à l'Université Paris-Saclay, j'ai travaillé sur des opérations de M&A et du secrétariat juridique avant de fonder HD Corporate."}
            </p>
            <p className="text-hd-green/80 leading-relaxed mb-6">
              {"Ma conviction ? Que vous soyez dirigeant d'une PME française, fondateur de startup, freelance en plein essor, ou entrepreneur bâtissant entre plusieurs pays — vous méritez un accompagnement juridique rigoureux, à un tarif juste et transparent."}
            </p>
            <p className="text-hd-green/80 leading-relaxed mb-8">
              {"Issu de la diaspora sénégalaise, j'ai fondé HD Corporate pour tous ceux que le marché du conseil juridique traditionnel laisse de côté. Un cabinet accessible, humain, et tourné vers votre réussite — en France comme à l'international."}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs border border-hd-green/30 text-hd-green px-3 py-1.5 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-4">
              {education.map((item) => (
                <div
                  key={item.title}
                  className="border-l-2 border-hd-gold pl-4"
                >
                  <p className="text-xs text-hd-green/50 mb-1">{item.years}</p>
                  <p className="text-sm font-medium text-hd-green">{item.title}</p>
                  <p className="text-xs text-hd-green/60">{item.institution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
