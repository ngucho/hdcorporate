'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { scrollToId } from '@/lib/scroll-to-id'
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
      scrollToId(id)
    } else {
      router.push(`/#${id}`)
    }
    setIsMobileMenuOpen(false)
    setIsServicesOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-300 ${
          isScrolled
            ? 'bg-hd-green/96 backdrop-blur-xl shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 min-h-[5rem] items-center justify-between gap-3">
            {/* Logo */}
            <Link href="/" className="group flex shrink-0 items-center gap-2.5">
              <Image
                src="/icon/splash-mark.png"
                alt=""
                width={40}
                height={40}
                className="h-9 w-9 shrink-0 rounded-sm object-contain"
              />
              <span className="flex items-baseline gap-1">
                <span className="font-serif text-2xl font-bold text-hd-gold">HD</span>
                <span className="font-sans text-lg font-light text-white">Corporate</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {/* Services dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  onBlur={() => setTimeout(() => setIsServicesOpen(false), 150)}
                  className="inline-flex min-h-11 items-center gap-1 rounded-sm px-1 text-xs uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-hd-gold"
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
                        type="button"
                        onClick={() => handleSectionClick('services')}
                        className="min-h-10 w-full px-4 py-2.5 text-left text-xs text-white/50 transition-colors hover:text-hd-gold"
                      >
                        Voir tous les tarifs →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleSectionClick('about')}
                className="inline-flex min-h-11 items-center rounded-sm px-1 text-xs uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-hd-gold"
              >
                À propos
              </button>
              <button
                type="button"
                onClick={() => handleSectionClick('process')}
                className="inline-flex min-h-11 items-center rounded-sm px-1 text-xs uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-hd-gold"
              >
                Processus
              </button>
              <button
                type="button"
                onClick={() => handleSectionClick('faq')}
                className="inline-flex min-h-11 items-center rounded-sm px-1 text-xs uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-hd-gold"
              >
                FAQ
              </button>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button
                type="button"
                onClick={() => handleSectionClick('booking')}
                className="inline-flex min-h-11 items-center justify-center rounded bg-hd-gold px-6 py-2.5 text-sm font-medium text-hd-green transition-colors hover:bg-hd-gold/90"
              >
                Réserver un appel gratuit
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-white lg:hidden"
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-hd-green mobile-menu-open overflow-y-auto overscroll-y-contain pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
          <div className="flex min-h-full flex-col px-4 pb-4 pt-2 sm:px-6">
            <div className="flex justify-between items-center mb-12">
              <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsMobileMenuOpen(false)}>
                <Image
                  src="/icon/splash-mark.png"
                  alt=""
                  width={40}
                  height={40}
                  className="h-9 w-9 shrink-0 rounded-sm object-contain"
                />
                <span className="flex items-baseline gap-1">
                  <span className="font-serif text-2xl font-bold text-hd-gold">HD</span>
                  <span className="font-sans text-lg font-light text-white">Corporate</span>
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-white"
                aria-label="Fermer le menu"
              >
                <X className="h-6 w-6" />
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
                      className="flex min-h-11 items-center font-serif text-xl text-white/80 transition-colors hover:text-hd-gold"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 flex flex-col gap-5">
                <button
                  type="button"
                  onClick={() => handleSectionClick('about')}
                  className="min-h-12 w-full py-2 text-left font-serif text-3xl text-white transition-colors hover:text-hd-gold"
                >
                  À propos
                </button>
                <button
                  type="button"
                  onClick={() => handleSectionClick('process')}
                  className="min-h-12 w-full py-2 text-left font-serif text-3xl text-white transition-colors hover:text-hd-gold"
                >
                  Processus
                </button>
                <button
                  type="button"
                  onClick={() => handleSectionClick('faq')}
                  className="min-h-12 w-full py-2 text-left font-serif text-3xl text-white transition-colors hover:text-hd-gold"
                >
                  FAQ
                </button>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <button
                type="button"
                onClick={() => handleSectionClick('booking')}
                className="min-h-12 w-full rounded bg-hd-gold py-4 text-lg font-medium text-hd-green transition-colors hover:bg-hd-gold/90"
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
