import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, AlertCircle } from 'lucide-react'
import { BookingCtaLink } from '@/components/hd/booking-cta-link'

export const metadata: Metadata = {
  title: 'Secrétariat Juridique Gestion continue de votre société | HD Corporate',
  description: 'Externalisez le suivi juridique de votre SAS, SASU ou SARL. PV d\'assemblées, approbation des comptes, conformité légale. 49€/mois, sans engagement.',
}

const includes = [
  'PV d\'assemblées générales ordinaires (AGO annuelle)',
  'Approbation et dépôt des comptes annuels',
  'Suivi de toutes vos obligations légales avec alertes',
  'Rédaction des décisions de gérant ou décisions de président',
  'Modifications statutaires mineures (siège, objet…)',
  'Tableau de bord digital de conformité en temps réel',
  'Conseil juridique mensuel illimité sur questions courantes',
]

const obligations = [
  {
    title: 'Assemblée Générale Ordinaire',
    desc: 'Toute société (SAS, SARL, SA…) doit tenir une AGO chaque année pour approuver les comptes de l\'exercice écoulé. Délai légal : 6 mois après la clôture de l\'exercice.',
    risk: 'Sanction possible en cas d\'inexécution : amende, responsabilité du dirigeant',
  },
  {
    title: 'Approbation et dépôt des comptes',
    desc: 'Les comptes annuels doivent être approuvés en AGO puis déposés au greffe du tribunal de commerce dans un délai légal. Ce dépôt rend votre entreprise visible et crédible.',
    risk: 'Injonction de dépôt possible, image dégradée auprès des partenaires',
  },
  {
    title: 'Registre des décisions',
    desc: 'Chaque décision importante (nomination de dirigeant, modification de capital, changement d\'objet…) doit être formalisée par un acte écrit et conservée dans le registre des délibérations.',
    risk: 'Actes inopposables aux tiers, risque en cas de contrôle ou de cession',
  },
]

const forWho = [
  { title: 'SAS & SASU', desc: 'Obligations de PV et d\'approbation des comptes, même pour les structures unipersonnelles.' },
  { title: 'SARL & EURL', desc: 'AGO, dépôt des comptes, rapport de gestion nous gérons tout le formalisme.' },
  { title: 'Holding & groupes', desc: 'Gestion multi-entités avec coordination des assemblées et des obligations.' },
  { title: 'Entreprises sans RH juridique', desc: 'Externalisez sans recruter. Vous gardez la flexibilité, nous apportons l\'expertise.' },
]

const faqs = [
  {
    q: 'Puis-je résilier à tout moment ?',
    a: 'Oui. Notre forfait est sans engagement de durée. Vous pouvez résilier à tout moment, avec un préavis d\'un mois. Aucune pénalité.',
  },
  {
    q: 'Un forfait couvre-t-il plusieurs sociétés ?',
    a: 'Le forfait à 49€/mois couvre une entité juridique. Pour plusieurs sociétés (holding + filiales, par exemple), chaque entité fait l\'objet d\'un forfait distinct, avec une remise possible selon le volume.',
  },
  {
    q: 'Les modifications statutaires importantes sont-elles incluses ?',
    a: 'Les modifications mineures (changement de siège, ajustement de l\'objet social) sont incluses. Les opérations plus importantes (augmentation de capital, cession de parts, restructuration) relèvent de notre offre Corporate & M&A et font l\'objet d\'un devis séparé.',
  },
  {
    q: 'Remplacez-vous un expert-comptable ?',
    a: 'Non. Nous gérons le formalisme juridique rédaction des actes, PV, convocations. L\'établissement des comptes annuels reste du ressort de votre expert-comptable. Nous collaborons étroitement avec lui pour la partie dépôt des comptes.',
  },
  {
    q: 'Que se passe-t-il si je n\'ai pas d\'expert-comptable ?',
    a: 'Nous pouvons vous orienter vers des partenaires comptables. Pour approuver et déposer les comptes, vous aurez besoin de les faire établir au préalable.',
  },
  {
    q: 'Est-ce adapté à une société sans salarié ?',
    a: 'Absolument. Même une SASU sans salarié (le dirigeant est seul) doit remplir ses obligations juridiques annuelles. C\'est d\'ailleurs pour ce type de structure que notre forfait est le plus utile : personne en interne pour s\'en occuper.',
  },
]

export default function SecretariatJuridiqueePage() {
  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="bg-hd-green/5 border-b border-hd-green/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-hd-green/60 hover:text-hd-green transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-hd-green pattern-lines py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6">
              La gestion juridique continue{' '}
              <em className="italic text-hd-gold">de votre société</em>
            </h1>
            <p className="text-white/70 text-lg mb-10 max-w-2xl">
              PV d'assemblées, approbation des comptes, suivi des obligations légales nous gérons tout le formalisme juridique de votre entreprise. Vous vous concentrez sur votre activité.
            </p>
            <div className="flex flex-wrap gap-8 mb-10">
              <div>
                <p className="text-hd-gold font-serif text-3xl">49€</p>
                <p className="text-white/50 text-sm">par mois, sans engagement</p>
              </div>
              <div>
                <p className="text-hd-gold font-serif text-3xl">∞</p>
                <p className="text-white/50 text-sm">questions répondues</p>
              </div>
              <div>
                <p className="text-hd-gold font-serif text-3xl">0</p>
                <p className="text-white/50 text-sm">pénalité de résiliation</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <BookingCtaLink
                serviceSlug="secretariat-annuel"
                serviceTitle="Secrétariat annuel"
                className="inline-flex items-center justify-center gap-2 bg-hd-gold text-hd-green px-8 py-4 text-sm font-medium rounded hover:bg-hd-gold/90 transition-colors"
              >
                Réserver un appel découverte
                <ArrowRight className="w-4 h-4" />
              </BookingCtaLink>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 lg:py-28 bg-hd-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-sm text-hd-green/60 tracking-wide">— Ce qui est inclus</span>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-hd-green mt-4 mb-8">
                Tout le formalisme juridique, sans exception.
              </h2>
              <ul className="space-y-4">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-hd-gold/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-hd-gold" />
                    </div>
                    <span className="text-hd-green/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-hd-green rounded-xl p-8 lg:p-10">
              <h3 className="font-serif text-2xl text-white mb-6">Pour qui ?</h3>
              <div className="space-y-5">
                {forWho.map((item) => (
                  <div key={item.title} className="border-l-2 border-hd-gold/40 pl-4">
                    <p className="text-white font-medium text-sm mb-1">{item.title}</p>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-20 lg:py-28 bg-hd-cream-dark">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="text-sm text-hd-green/60 tracking-wide">— Pourquoi c'est important</span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-hd-green mt-4 mb-4 max-w-2xl">
            Des obligations légales que vous ne pouvez pas ignorer
          </h2>
          <p className="text-hd-green/60 text-sm mb-12 max-w-2xl">
            Toute société commerciale française est soumise à des obligations juridiques annuelles. Leur non-respect expose le dirigeant à des sanctions et fragilise la structure en cas de contrôle ou de cession.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {obligations.map((item) => (
              <div key={item.title} className="bg-hd-cream rounded-xl p-7 border border-hd-green/10">
                <h3 className="font-serif text-lg text-hd-green mb-3">{item.title}</h3>
                <p className="text-hd-green/70 text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-700 text-xs">{item.risk}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-hd-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-hd-green mb-12 text-center">
              Questions fréquentes
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="group border border-hd-green/10 rounded-lg">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="font-serif text-lg text-hd-green pr-4">{faq.q}</span>
                    <span className="text-hd-gold text-xl group-open:rotate-45 transition-transform flex-shrink-0">+</span>
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-sm text-hd-green/70 leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-hd-cream-dark">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-light text-hd-green mb-4">
            Déléguez votre formalisme juridique
          </h2>
          <p className="text-hd-green/70 mb-8">
            Un appel de 20 minutes suffit pour faire le point sur vos obligations actuelles et voir comment nous pouvons vous soulager.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <BookingCtaLink
              serviceSlug="secretariat-annuel"
              serviceTitle="Secrétariat annuel"
              className="w-full sm:w-auto bg-hd-green text-white px-8 py-4 rounded font-medium hover:bg-hd-green/90 transition-colors text-center"
            >
              Réserver un appel gratuit
            </BookingCtaLink>
            <Link
              href="/#services"
              className="w-full sm:w-auto border-2 border-hd-green text-hd-green px-8 py-4 rounded font-medium hover:bg-hd-green hover:text-white transition-colors text-center"
            >
              Voir toutes les offres
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
