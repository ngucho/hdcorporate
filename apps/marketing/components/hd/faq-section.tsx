'use client'

import { useEffect, useRef, useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { homeFaqs } from '@/lib/content/home-faqs'

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
            {homeFaqs.map((faq, index) => (
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
