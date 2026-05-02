'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const PROFILE_IMAGE = '/images/hamidou-photo-profil.jpg'

const skills = [
  'M&A & opérations',
  'Due diligence',
  'Corporate & droit des sociétés',
  'LBO & private equity',
  'SPA & documentation transactionnelle',
  'Secrétariat juridique',
  'Création & structuration de sociétés',
  'Conseil contractuel',
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
          {/* Portrait : public/images/hamidou-photo-profil.jpg */}
          <div className="reveal-left mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none" style={{ transitionDelay: '0.2s' }}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-hd-green shadow-lg ring-1 ring-hd-gold/25">
              <Image
                src={PROFILE_IMAGE}
                alt="Hamidou Diallo, juriste en droit des affaires — fondateur HD Corporate"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 384px, 340px"
                priority={false}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-hd-green/90 via-hd-green/40 to-transparent pt-24 pb-5 px-5">
                <p className="text-white text-sm font-medium tracking-wide">Hamidou Diallo</p>
                <p className="text-white/75 text-xs mt-0.5">Fondateur · Juriste droit des affaires</p>
              </div>
            </div>
          </div>

          {/* Contenu */}
          <div className="reveal-right min-w-0" style={{ transitionDelay: '0.3s' }}>
            <span className="text-sm text-hd-green/60 tracking-wide">Votre interlocuteur</span>

            <h2 className="font-serif text-3xl md:text-4xl font-light text-hd-green mt-4 mb-6">
              Un juriste tourné vers votre opérationnel
            </h2>

            <p className="text-hd-green/80 leading-relaxed mb-6">
              {
                "Hamidou Diallo structure et sécurise vos dossiers sociétaires et transactionnels : formalités, documentation M&A, secrétariat juridique et accompagnement des dirigeants qui n'ont pas le temps d'apprendre le jargon."
              }
            </p>
            <p className="text-hd-green/80 leading-relaxed mb-6">
              {
                "Notre conviction : en tant que dirigeant de PME, fondateur, freelance ou entrepreneur à l'international, vous méritez un interlocuteur qui livre des pièces exploitables, des délais annoncés et des tarifs transparents — sans vous faire sentir « trop petit » pour un cabinet."
              }
            </p>
            <p className="text-hd-green/80 leading-relaxed mb-8">
              {
                "HD Corporate existe pour celles et ceux que le conseil traditionnel met trop cher ou trop loin : une pratique méthodique, humaine, orientée conformité et sérénité, en France comme à l'international."
              }
            </p>

            <h3 className="text-xs font-semibold uppercase tracking-widest text-hd-green/55 mb-3">
              Domaines d&apos;expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs border border-hd-green/30 bg-white/40 text-hd-green px-3 py-1.5 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
