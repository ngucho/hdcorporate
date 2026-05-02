import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { BookingCtaLink } from '@/components/hd/booking-cta-link'

export const metadata: Metadata = {
  title: 'LLC Delaware Créez votre société US depuis la France | HD Corporate',
  description: 'Créez votre LLC aux États-Unis depuis la France ou l\'Afrique. EIN, Registered Agent 1 an, compte bancaire US (Mercury/Relay), accompagnement Stripe. 599€ tout inclus.',
}

const includes = [
  'Dépôt des Articles of Organization (État du Delaware)',
  'EIN Employer Identification Number (numéro fiscal US)',
  'Registered Agent pendant 12 mois',
  'Assistance ouverture compte bancaire US (Relay ou Mercury)',
  'Accompagnement Stripe / Stripe Atlas alternatif',
  'Operating Agreement (accord de fonctionnement)',
  'Suivi complet jusqu\'à finalisation',
]

const forWho = [
  { title: 'Fondateurs SaaS & tech', desc: 'Accédez à Stripe, l\'App Store, et l\'écosystème startup américain.' },
  { title: 'Consultants avec clients US', desc: 'Facturer en dollars et être perçu comme un interlocuteur professionnel.' },
  { title: 'Entrepreneurs francophones', desc: 'Depuis la France, l\'Afrique ou n\'importe où dans le monde.' },
  { title: 'Porteurs de projets internationaux', desc: 'Accédez aux investisseurs, outils, et marchés nord-américains.' },
]

const steps = [
  { n: '1', title: 'Brief initial', time: '15-30 min', desc: 'Appel pour cadrer vos besoins : structure, utilisation, associés.' },
  { n: '2', title: 'Dépôt Delaware', time: '1-2 semaines', desc: 'Dépôt des Articles of Organization auprès du Secrétariat d\'État du Delaware.' },
  { n: '3', title: 'EIN obtenu', time: '1-3 semaines', desc: 'Numéro fiscal américain délivré par l\'IRS. Indispensable pour tout le reste.' },
  { n: '4', title: 'Compte & paiements', time: 'Quelques jours', desc: 'Ouverture Mercury/Relay, configuration Stripe pour accepter les paiements.' },
]

const keyInfo = [
  {
    title: 'Pas besoin d\'être américain',
    desc: 'Toute personne physique, quelle que soit sa nationalité ou son pays de résidence, peut créer et détenir une LLC américaine.',
  },
  {
    title: 'Delaware, la juridiction de référence',
    desc: 'Plus de 60% des entreprises du Fortune 500 sont constituées au Delaware. Droit flexible, tribunaux spécialisés, fiscalité favorable.',
  },
  {
    title: 'Fiscalité transparente pour les non-résidents',
    desc: 'Une LLC est par défaut une entité "transparente" fiscalement. Les non-résidents US qui n\'ont pas d\'activité commerciale aux USA ne sont généralement pas imposés aux États-Unis (à confirmer avec votre comptable).',
  },
  {
    title: 'Ouvrir Stripe depuis la France',
    desc: 'Stripe exige une entité US (LLC ou Corp) pour accéder à certaines fonctionnalités. Avec votre LLC, EIN et compte US, vous débloquez l\'écosystème de paiement américain.',
  },
]

const faqs = [
  {
    q: 'Faut-il être américain pour créer une LLC ?',
    a: 'Non. Toute personne, quelle que soit sa nationalité ou son pays de résidence, peut créer une LLC aux États-Unis. C\'est l\'un des attraits majeurs de cette structure.',
  },
  {
    q: 'Serai-je imposé aux États-Unis ?',
    a: 'La LLC est une entité "pass-through" (transparente) fiscalement. Pour un non-résident sans activité commerciale directe aux USA, il n\'y a généralement pas d\'imposition fédérale américaine. Cela dit, chaque situation est différente nous vous recommandons de consulter un comptable pour votre cas spécifique.',
  },
  {
    q: 'Dois-je me déplacer aux États-Unis ?',
    a: 'Non, tout le processus se fait en ligne. Vous n\'avez pas besoin de vous rendre aux États-Unis pour créer votre LLC, obtenir votre EIN, ou ouvrir un compte bancaire.',
  },
  {
    q: 'Qu\'est-ce qu\'un Registered Agent ?',
    a: 'C\'est une entité légalement désignée pour recevoir en votre nom les documents officiels (courrier de l\'IRS, assignations judiciaires). Son adresse physique dans le Delaware est obligatoire pour toute LLC. Nous incluons 12 mois de registered agent dans notre pack.',
  },
  {
    q: 'Quelle différence entre Mercury, Relay et Stripe Atlas ?',
    a: 'Mercury et Relay sont des néobanques américaines accessibles aux non-résidents avec une LLC. Stripe Atlas est un service tout-en-un qui crée la LLC et le compte Stripe mais plus coûteux et moins flexible. Nous vous accompagnons sur la meilleure option selon votre usage.',
  },
  {
    q: 'Dois-je déposer une déclaration fiscale aux USA chaque année ?',
    a: 'Oui, même une LLC sans activité doit déposer un Form 5472 (pour les LLC détenues par des non-résidents). C\'est une obligation annuelle. Nous pouvons vous orienter vers un comptable américain partenaire.',
  },
]

export default function LlcDelawarePage() {
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
            <span className="inline-block bg-hd-gold text-hd-green text-xs font-medium px-3 py-1 rounded mb-6">
              International
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6">
              Créez votre LLC aux États-Unis{' '}
              <em className="italic text-hd-gold">depuis la France</em>
            </h1>
            <p className="text-white/70 text-lg mb-10 max-w-2xl">
              Accédez à Stripe, Mercury et l'écosystème startup américain. EIN, Registered Agent 12 mois, et compte bancaire US inclus. Aucun déplacement nécessaire.
            </p>
            <div className="flex flex-wrap gap-8 mb-10">
              <div>
                <p className="text-hd-gold font-serif text-3xl">599€</p>
                <p className="text-white/50 text-sm">tout inclus</p>
              </div>
              <div>
                <p className="text-hd-gold font-serif text-3xl">3-4 sem.</p>
                <p className="text-white/50 text-sm">délai moyen</p>
              </div>
              <div>
                <p className="text-hd-gold font-serif text-3xl">0</p>
                <p className="text-white/50 text-sm">déplacement requis</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <BookingCtaLink
                serviceSlug="llc-delaware"
                serviceTitle="LLC Delaware"
                className="inline-flex items-center justify-center gap-2 bg-hd-gold text-hd-green px-8 py-4 text-sm font-medium rounded hover:bg-hd-gold/90 transition-colors"
              >
                Réserver mon appel gratuit
                <ArrowRight className="w-4 h-4" />
              </BookingCtaLink>
              <BookingCtaLink
                serviceSlug="llc-delaware"
                serviceTitle="LLC Delaware"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 text-sm font-medium rounded hover:border-hd-gold hover:text-hd-gold transition-colors"
              >
                Commencer 599€
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
                Tout ce qu'il faut pour opérer sur le marché américain.
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

      {/* Key info */}
      <section className="py-20 lg:py-28 bg-hd-cream-dark">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="text-sm text-hd-green/60 tracking-wide">— Points clés</span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-hd-green mt-4 mb-12 max-w-2xl">
            Ce que vous devez savoir sur la LLC Delaware
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {keyInfo.map((item) => (
              <div key={item.title} className="bg-hd-cream rounded-lg p-7 border border-hd-green/10">
                <h3 className="font-medium text-hd-green mb-3">{item.title}</h3>
                <p className="text-hd-green/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 lg:py-28 bg-hd-green pattern-lines">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-4">
              Comment ça se passe ?
            </h2>
            <p className="text-white/50 text-sm">4 étapes, 100% en ligne</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.n} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 border-2 border-hd-gold rounded-full mb-5">
                  <span className="font-serif text-xl text-hd-gold">{step.n}</span>
                </div>
                <h3 className="font-serif text-lg text-white mb-1">{step.title}</h3>
                <span className="inline-block border border-hd-gold/40 rounded-full px-3 py-1 text-xs text-hd-gold mb-3">
                  {step.time}
                </span>
                <p className="text-sm text-white/60">{step.desc}</p>
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
            Prêt à vous lancer sur le marché américain ?
          </h2>
          <p className="text-hd-green/70 mb-8">
            Réservez un appel gratuit de 30 minutes. Nous analysons votre projet et vous confirmons que la LLC est la bonne structure avant tout paiement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <BookingCtaLink
              serviceSlug="llc-delaware"
              serviceTitle="LLC Delaware"
              className="w-full sm:w-auto bg-hd-green text-white px-8 py-4 rounded font-medium hover:bg-hd-green/90 transition-colors text-center"
            >
              Réserver mon appel gratuit
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
