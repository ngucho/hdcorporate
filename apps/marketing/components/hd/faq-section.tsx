'use client'

import { useEffect, useRef, useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'Êtes-vous avocat ?',
    answer: "Non, je suis juriste indépendant. Mon activité relève du secrétariat juridique, de la rédaction de statuts et des formalités administratives elle est hors monopole du barreau et parfaitement encadrée par la loi.",
  },
  {
    question: 'Intervenez-vous pour les non-résidents ?',
    answer: "Oui, nos services sont 100% digitaux. Nous accompagnons des entrepreneurs depuis toute la France et depuis l'étranger, avec une expertise particulière pour les projets transfrontaliers.",
  },
  {
    question: 'Quel délai pour créer ma société ?',
    answer: "En général, 3 à 5 jours ouvrés après validation de votre dossier complet. Ce délai inclut la rédaction des statuts, les formalités d'immatriculation et l'obtention de votre Kbis.",
  },
  {
    question: 'Puis-je payer en plusieurs fois ?',
    answer: "Oui, nous proposons un règlement en 2 ou 3 fois sans frais pour les forfaits annuels de secrétariat juridique et les missions corporate importantes.",
  },
  {
    question: 'Accompagnez-vous les entreprises françaises établies ?',
    answer: "Oui, absolument. Nous intervenons aussi bien pour la création que pour le suivi juridique d'entreprises déjà actives : secrétariat annuel, rédaction d'actes courants, restructuration ou accompagnement sur des opérations de croissance. Nos services s'adressent à toutes les TPE et PME françaises souhaitant externaliser leur gestion juridique à un tarif transparent.",
  },
  {
    question: 'Que couvre votre secrétariat juridique mensuel ?',
    answer: "Notre forfait à 49€/mois comprend les PV d'assemblées générales, l'approbation annuelle des comptes, le suivi de vos obligations légales et la rédaction d'actes courants (décisions de gérant, modifications statutaires mineures). Un tableau de bord digital vous donne une visibilité en temps réel sur la conformité de votre société.",
  },
]

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="bg-hd-cream py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Sticky Title */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h2 className="reveal font-serif text-3xl md:text-4xl lg:text-5xl font-light text-hd-green" style={{ transitionDelay: '0.1s' }}>
                Questions fréquentes
              </h2>
              <p className="reveal text-sm text-hd-green/50 mt-4" style={{ transitionDelay: '0.2s' }}>
                {"Vous avez d'autres questions ? N'hésitez pas à nous contacter."}
              </p>
            </div>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-8 space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="reveal border border-hd-green/10 rounded-lg overflow-hidden"
                style={{ transitionDelay: `${0.3 + index * 0.05}s` }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex min-h-12 w-full items-start justify-between gap-3 p-5 text-left transition-colors hover:bg-hd-green/[0.02] sm:items-center"
                >
                  <span className="font-serif text-lg text-hd-green pr-4">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 text-hd-gold">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </span>
                </button>
                <div
                  className={`accordion-content ${openIndex === index ? 'open' : ''}`}
                >
                  <div className="px-5 pb-5">
                    <p className="text-sm text-hd-green/70 leading-relaxed">
                      {faq.answer}
                    </p>
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
