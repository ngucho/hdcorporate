import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation } from '@/components/hd/navigation'
import { Footer } from '@/components/hd/footer'
import { HomeChrome } from '@/components/hd/home-chrome'

export const metadata: Metadata = {
  title: 'Mentions légales | HD Corporate',
  description: 'Informations légales relatives au site HD Corporate (à compléter).',
}

/** Contenu placeholder : à adapter avec vos données réelles (pas de conseil juridique automatisé). */
export default function MentionsLegalesPage() {
  return (
    <>
      <HomeChrome />
      <Navigation />
      <main className="min-w-0 bg-hd-cream pb-24 pt-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 text-sm text-hd-green/60">
            <Link href="/" className="hover:text-hd-green">
              Accueil
            </Link>
            <span className="mx-2">/</span>
            <span className="text-hd-green">Mentions légales</span>
          </nav>

          <h1 className="font-serif text-3xl font-light text-hd-green md:text-4xl">Mentions légales</h1>
          <p className="mt-4 text-sm text-hd-green/70">
            Les blocs ci-dessous sont des emplacements à compléter par l’éditeur du site (identité, hébergeur,
            propriété intellectuelle, etc.).
          </p>

          <div className="mt-12 space-y-10 text-hd-green/90">
            <section>
              <h2 className="font-medium text-hd-green">1. Éditeur du site</h2>
              <ul className="mt-3 list-inside list-disc space-y-1 text-sm">
                <li>Dénomination / statut : <em className="not-italic text-hd-green/60">[à compléter]</em></li>
                <li>Adresse : 303 Quai aux Fleurs, 91000 Évry-Courcouronnes</li>
                <li>Contact : contact.hdcorporate@gmail.com — (+33) 07 67 37 66 22</li>
                <li>SIREN : 887 630 069</li>
                <li>Directeur de la publication : <em className="not-italic text-hd-green/60">[à compléter]</em></li>
              </ul>
            </section>

            <section>
              <h2 className="font-medium text-hd-green">2. Hébergement</h2>
              <p className="mt-3 text-sm">
                Hébergeur : <em className="not-italic text-hd-green/60">[nom et adresse — ex. Vercel Inc., …]</em>
              </p>
            </section>

            <section>
              <h2 className="font-medium text-hd-green">3. Propriété intellectuelle</h2>
              <p className="mt-3 text-sm">
                <em className="not-italic text-hd-green/60">[Texte sur les droits d’auteur, marques, reproduction.]</em>
              </p>
            </section>

            <section>
              <h2 className="font-medium text-hd-green">4. Données personnelles</h2>
              <p className="mt-3 text-sm">
                <em className="not-italic text-hd-green/60">
                  [Référence vers une politique de confidentialité / traitements / droits RGPD si applicable.]
                </em>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
