'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

const serviceLinks = [
  { label: 'Pack Création France', href: '/services/creation-france' },
  { label: 'LLC Delaware', href: '/services/llc-delaware' },
  { label: 'Secrétariat Juridique', href: '/services/secretariat-juridique' },
  { label: 'Corporate & M&A', href: '/services/corporate-ma' },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSectionClick = (id: string) => {
    if (isHomePage) {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      router.push(`/#${id}`)
    }
    setIsMobileMenuOpen(false)
    setIsServicesOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-hd-green/96 backdrop-blur-xl shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-baseline gap-1 group">
              <span className="font-serif text-2xl font-bold text-hd-gold">HD</span>
              <span className="font-sans text-lg font-light text-white">Corporate</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {/* Services dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  onBlur={() => setTimeout(() => setIsServicesOpen(false), 150)}
                  className="flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-white/80 hover:text-hd-gold transition-colors"
                >
                  Services
                  <ChevronDown className={`w-3 h-3 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isServicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-hd-green border border-hd-gold/20 rounded-lg shadow-xl py-2">
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2.5 text-sm text-white/80 hover:text-hd-gold hover:bg-white/5 transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="border-t border-white/10 mt-2 pt-2">
                      <button
                        onClick={() => handleSectionClick('services')}
                        className="w-full text-left px-4 py-2 text-xs text-white/50 hover:text-hd-gold transition-colors"
                      >
                        Voir tous les tarifs →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleSectionClick('about')}
                className="text-xs uppercase tracking-[0.2em] text-white/80 hover:text-hd-gold transition-colors"
              >
                À propos
              </button>
              <button
                onClick={() => handleSectionClick('process')}
                className="text-xs uppercase tracking-[0.2em] text-white/80 hover:text-hd-gold transition-colors"
              >
                Processus
              </button>
              <button
                onClick={() => handleSectionClick('faq')}
                className="text-xs uppercase tracking-[0.2em] text-white/80 hover:text-hd-gold transition-colors"
              >
                FAQ
              </button>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button
                onClick={() => handleSectionClick('booking')}
                className="bg-hd-gold text-hd-green px-6 py-3 text-sm font-medium rounded hover:bg-hd-gold/90 transition-colors"
              >
                Réserver un appel gratuit
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-white p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-hd-green mobile-menu-open overflow-y-auto">
          <div className="flex flex-col min-h-full p-6">
            <div className="flex justify-between items-center mb-12">
              <Link href="/" className="flex items-baseline gap-1" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="font-serif text-2xl font-bold text-hd-gold">HD</span>
                <span className="font-sans text-lg font-light text-white">Corporate</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Nos services</p>
                <div className="flex flex-col gap-2 pl-2">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="font-serif text-xl text-white/80 hover:text-hd-gold transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 flex flex-col gap-5">
                <button
                  onClick={() => handleSectionClick('about')}
                  className="font-serif text-3xl text-white text-left hover:text-hd-gold transition-colors"
                >
                  À propos
                </button>
                <button
                  onClick={() => handleSectionClick('process')}
                  className="font-serif text-3xl text-white text-left hover:text-hd-gold transition-colors"
                >
                  Processus
                </button>
                <button
                  onClick={() => handleSectionClick('faq')}
                  className="font-serif text-3xl text-white text-left hover:text-hd-gold transition-colors"
                >
                  FAQ
                </button>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <button
                onClick={() => handleSectionClick('booking')}
                className="w-full bg-hd-gold text-hd-green py-4 text-lg font-medium rounded hover:bg-hd-gold/90 transition-colors"
              >
                Réserver un appel gratuit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
