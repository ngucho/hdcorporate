'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSectionClick = (id: string) => {
    if (pathname === '/') {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      router.push(`/#${id}`)
    }
  }

  return (
    <footer className="bg-hd-green py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Logo & Tagline */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-baseline gap-1 mb-4 inline-flex">
              <span className="font-serif text-2xl font-bold text-hd-gold">HD</span>
              <span className="font-sans text-lg font-light text-white">Corporate</span>
            </Link>
            <p className="text-white/60 text-sm mt-1">
              Le droit des affaires, accessible à tous.
            </p>
            <p className="text-white/40 text-xs mt-3">
              SIREN 887 630 069
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-medium text-sm mb-4">Nos services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/creation-france" className="text-white/60 text-sm hover:text-hd-gold transition-colors">
                  Pack Création France
                </Link>
              </li>
              <li>
                <Link href="/services/llc-delaware" className="text-white/60 text-sm hover:text-hd-gold transition-colors">
                  LLC Delaware
                </Link>
              </li>
              <li>
                <Link href="/services/secretariat-juridique" className="text-white/60 text-sm hover:text-hd-gold transition-colors">
                  Secrétariat Juridique
                </Link>
              </li>
              <li>
                <Link href="/services/corporate-ma" className="text-white/60 text-sm hover:text-hd-gold transition-colors">
                  Corporate & M&A
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-medium text-sm mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleSectionClick('about')}
                  className="text-white/60 text-sm hover:text-hd-gold transition-colors"
                >
                  À propos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionClick('process')}
                  className="text-white/60 text-sm hover:text-hd-gold transition-colors"
                >
                  Processus
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionClick('faq')}
                  className="text-white/60 text-sm hover:text-hd-gold transition-colors"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionClick('booking')}
                  className="text-white/60 text-sm hover:text-hd-gold transition-colors"
                >
                  Réserver un appel
                </button>
              </li>
              <li>
                <span className="text-white/40 text-sm cursor-default">
                  Mentions légales
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-medium text-sm mb-4">Contact</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>303 Quai aux Fleurs</li>
              <li>91000 Évry-Courcouronnes</li>
              <li className="pt-2">
                <a
                  href="mailto: contact.hdcorporate@gmail.com"
                  className="hover:text-hd-gold transition-colors"
                >
                   contact.hdcorporate@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+33767376622"
                  className="hover:text-hd-gold transition-colors"
                >
                  (+33) 07 67 37 66 22
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-white/40 text-xs text-center">
            © 2026 HD Corporate. Tous droits réservés. · Juriste indépendant, non avocat.
          </p>
        </div>
      </div>
    </footer>
  )
}
