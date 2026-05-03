import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { BookingCtaLink } from '@/components/hd/booking-cta-link'
import { JsonLd } from '@/components/seo/json-ld'
import { buildPageMetadata } from '@/lib/seo/build-metadata'
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo/schema'

const PAGE_DESC =
  "NDA, LOI, SPA, due diligence, pacte d'associés, augmentation de capital. Accompagnement juridique sur-mesure pour vos opérations de croissance et de cession. Sur devis."

export const metadata = buildPageMetadata({
  path: '/services/corporate-ma',
  title: 'Corporate & M&A — accompagnement juridique stratégique',
  description: PAGE_DESC,
  keywords: [
    'corporate',
    'M&A',
    'due diligence',
    'NDA',
    'LOI',
    'SPA',
    'pacte associés',
    'augmentation de capital',
    'cession société',
    'juriste M&A',
  ],
})

const services = [
  {
    category: 'Protection & confidentialité',
    items: [
      { name: 'NDA / Accord de confidentialité', desc: 'Protégez vos informations sensibles lors de discussions avec partenaires, investisseurs ou acquéreurs potentiels.' },
      { name: 'Lettre d\'intention (LOI)', desc: 'Cadrez les termes d\'un accord préliminaire termes financiers, exclusivité, conditions suspensives.' },
    ],
  },
  {
    category: 'Cession & acquisition',
    items: [
      { name: 'Protocole de cession / SPA', desc: 'Rédigez le contrat de vente définitif des titres ou actifs, incluant les représentations et garanties.' },
      { name: 'Due diligence juridique', desc: 'Audit complet des risques juridiques d\'une cible avant acquisition : contrats, litiges, conformité, propriété intellectuelle.' },
      { name: 'Garantie d\'actif et de passif (GAP)', desc: 'Protection post-cession contre les passifs cachés découverts après le closing.' },
    ],
  },
  {
    category: 'Gouvernance & financement',
    items: [
      { name: 'Pacte d\'associés', desc: 'Encadrez les droits et obligations entre actionnaires : droit de préemption, clause de sortie, gouvernance, non-concurrence.' },
      { name: 'Augmentation de capital', desc: 'Structuration juridique d\'un tour de financement : valorisation, entrée de nouveaux actionnaires, pacte BSPCE.' },
      { name: 'LBO & Holding', desc: 'Structuration d\'une acquisition à effet de levier, mise en place d\'une holding et montage juridique associé.' },
    ],
  },
]

const forWho = [
  { title: 'Dirigeants en croissance externe', desc: 'Vous rachetez une entreprise ou un fonds de commerce ? Nous structurons l\'opération de A à Z.' },
  { title: 'Cédants & actionnaires sortants', desc: 'Vous souhaitez vendre tout ou partie de votre entreprise dans les meilleures conditions.' },
  { title: 'Investisseurs & fonds', desc: 'Prise de participation, structuration d\'un véhicule d\'investissement, due diligence cible.' },
  { title: 'Fondateurs en levée de fonds', desc: 'Love money, business angels, VC accompagnement sur les aspects juridiques du tour.' },
  { title: 'PME en restructuration', desc: 'Réorganisation d\'un groupe, création de holding, fusion de filiales, scission d\'activité.' },
]

const steps = [
  { n: '1', title: 'Brief confidentiel', time: '30 min', desc: 'Compréhension de votre opération, objectifs, contraintes, et niveau de sensibilité.' },
  { n: '2', title: 'Analyse documentaire', time: 'Variable', desc: 'Examen des documents existants (statuts, contrats, comptes, registre des actes).' },
  { n: '3', title: 'Rédaction des actes', time: 'Sur-mesure', desc: 'Rédaction de chaque acte adapté à la complexité et aux enjeux de votre opération.' },
  { n: '4', title: 'Accompagnement jusqu\'au closing', time: 'Jusqu\'à signature', desc: 'Suivi des négociations, levées de conditions, et finalisation de l\'opération.' },
]

const credentials = [
  'Master Fusions & Acquisitions Université Paris-Saclay (2022-2023)',
  'Expérience sur des opérations de rachat, due diligence et structuration de holding',
  'Maîtrise du droit des sociétés français et des structures cross-border Franco-Africaines',
  'Rédaction de SPA, LOI, NDA, pactes d\'associés et documents de gouvernance',
]

const faqs = [
  {
    q: 'Pouvez-vous remplacer un avocat en M&A ?',
    a: 'Hamidou Diallo est juriste indépendant, non avocat. Nos services couvrent la rédaction d\'actes, la structuration juridique et la due diligence documentaire. Pour les opérations nécessitant une représentation en justice ou relevant du monopole du barreau, nous vous orientons vers un avocat partenaire. La plupart des missions M&A ne requièrent pas d\'avocat inscrit au barreau.',
  },
  {
    q: 'Quel budget prévoir pour une mission Corporate & M&A ?',
    a: 'Chaque opération est unique. Nous établissons un devis après le brief initial, en fonction de la complexité, du volume documentaire et des délais. Un NDA simple peut représenter quelques centaines d\'euros ; une due diligence complète ou un SPA complexe sont facturés en fonction du temps passé et des enjeux.',
  },
  {
    q: 'Intervenez-vous sur des opérations internationales ?',
    a: 'Oui. Nous avons une expertise particulière sur les opérations impliquant des structures franco-africaines (holding en France + filiale en Afrique subsaharienne, par exemple), ainsi que les opérations France-Delaware. Pour des jurisdictions plus complexes, nous collaborons avec des correspondants locaux.',
  },
  {
    q: 'Qu\'est-ce qu\'une due diligence juridique ?',
    a: 'C\'est un audit approfondi de la situation juridique d\'une entreprise avant son acquisition. Il couvre les contrats commerciaux, les baux, les litiges en cours ou latents, la conformité réglementaire, la propriété intellectuelle, le droit du travail et la gouvernance. L\'objectif est d\'identifier les risques avant closing et de les couvrir dans le SPA.',
  },
  {
    q: 'À quel moment faire intervenir HD Corporate dans une opération ?',
    a: 'Le plus tôt possible. Nous intervenons idéalement dès la phase de réflexion stratégique, avant la signature d\'une LOI. Une intervention précoce permet d\'éviter des engagements mal structurés et de mieux protéger vos intérêts tout au long du processus.',
  },
]

export default function CorporateMaPage() {
  return (
    <div className="pt-[calc(5rem+env(safe-area-inset-top))]">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'Corporate & M&A', path: '/services/corporate-ma' },
        ])}
      />
      <JsonLd
        data={serviceJsonLd({
          name: 'Corporate & M&A — missions juridiques sur devis',
          description: PAGE_DESC,
          path: '/services/corporate-ma',
          offerDescription: 'Devis sur brief — NDA, LOI, due diligence, SPA, pacte d’associés',
        })}
      />
      {/* Breadcrumb */}
      <div className="bg-hd-green/5 border-b border-hd-green/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-hd-green/60 hover:text-hd-green transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-hd-green pattern-lines py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6">
              Structurez vos opérations{' '}
              <em className="italic text-hd-gold">avec expertise</em>
            </h1>
            <p className="text-white/70 text-lg mb-10 max-w-2xl">
              NDA, LOI, SPA, due diligence, pactes d'associés un accompagnement juridique sur-mesure pour vos projets de cession, d'acquisition ou de croissance. Hamidou Diallo est titulaire d'un Master M&A (Paris-Saclay).
            </p>
            <div className="flex flex-wrap gap-8 mb-10">
              <div>
                <p className="text-hd-gold font-serif text-3xl">Sur devis</p>
                <p className="text-white/50 text-sm">tarif transparent</p>
              </div>
              <div>
                <p className="text-hd-gold font-serif text-3xl">M&A</p>
                <p className="text-white/50 text-sm">Master Paris-Saclay</p>
              </div>
              <div>
                <p className="text-hd-gold font-serif text-3xl">100%</p>
                <p className="text-white/50 text-sm">confidentiel</p>
              </div>
            </div>
            <BookingCtaLink
              serviceSlug="corporate-ma"
              serviceTitle="Corporate & M&A"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded bg-hd-gold px-8 py-3 text-sm font-medium text-hd-green transition-colors hover:bg-hd-gold/90 sm:w-auto"
            >
              Demander un devis confidentiel
              <ArrowRight className="w-4 h-4" />
            </BookingCtaLink>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28 bg-hd-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-sm text-hd-green/60 tracking-wide">— Nos interventions</span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-hd-green mt-4 mb-12 max-w-2xl">
            Un spectre complet d'actes Corporate & M&A
          </h2>
          <div className="space-y-12">
            {services.map((cat) => (
              <div key={cat.category}>
                <h3 className="text-xs uppercase tracking-widest text-hd-gold mb-5">{cat.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {cat.items.map((item) => (
                    <div key={item.name} className="bg-hd-cream-dark rounded-lg p-6 border border-hd-green/10">
                      <h4 className="font-serif text-lg text-hd-green mb-2">{item.name}</h4>
                      <p className="text-hd-green/65 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 lg:py-28 bg-hd-green pattern-lines">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm text-white/50 tracking-wide">— Pourquoi HD Corporate</span>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-white mt-4 mb-8">
                Une expertise M&A rigoureuse, à un tarif accessible.
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Les opérations Corporate & M&A sont souvent réservées aux grandes structures cabinets d'affaires à 400€/heure, processes longs et opaques.
              </p>
              <p className="text-white/70 leading-relaxed">
                HD Corporate offre le même niveau d'expertise académique et pratique, avec la réactivité et la transparence d'une structure indépendante.
              </p>
            </div>
            <div className="space-y-4">
              {credentials.map((c) => (
                <div key={c} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-hd-gold/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-hd-gold" />
                  </div>
                  <span className="text-white/80 text-sm">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For who */}
      <section className="py-20 lg:py-28 bg-hd-cream-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-sm text-hd-green/60 tracking-wide">— Pour qui</span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-hd-green mt-4 mb-12 max-w-2xl">
            Des accompagnements sur mesure pour chaque profil
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forWho.map((item) => (
              <div key={item.title} className="bg-hd-cream rounded-xl p-7 border border-hd-green/10">
                <h3 className="font-serif text-lg text-hd-green mb-2">{item.title}</h3>
                <p className="text-hd-green/65 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 lg:py-28 bg-hd-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-hd-green mb-4">
              Comment travaillons-nous ?
            </h2>
            <p className="text-hd-green/50 text-sm">Un process clair, confidentiel et adapté à votre calendrier</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.n} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 border-2 border-hd-gold rounded-full mb-5">
                  <span className="font-serif text-xl text-hd-gold">{step.n}</span>
                </div>
                <h3 className="font-serif text-lg text-hd-green mb-1">{step.title}</h3>
                <span className="inline-block border border-hd-gold/40 rounded-full px-3 py-1 text-xs text-hd-gold mb-3">
                  {step.time}
                </span>
                <p className="text-sm text-hd-green/60">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-hd-cream-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
      <section className="py-20 bg-hd-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-light text-hd-green mb-4">
            Parlons de votre opération
          </h2>
          <p className="text-hd-green/70 mb-8">
            Un brief confidentiel de 30 minutes suffit pour comprendre vos enjeux, vous expliquer notre approche, et vous faire une proposition tarifaire transparente.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <BookingCtaLink
              serviceSlug="corporate-ma"
              serviceTitle="Corporate & M&A"
              className="inline-flex min-h-11 w-full items-center justify-center rounded bg-hd-green px-8 py-3 text-center font-medium text-white transition-colors hover:bg-hd-green/90 sm:w-auto"
            >
              Demander un brief confidentiel
            </BookingCtaLink>
            <Link
              href="/#services"
              className="inline-flex min-h-11 w-full items-center justify-center rounded border-2 border-hd-green px-8 py-3 text-center font-medium text-hd-green transition-colors hover:bg-hd-green hover:text-white sm:w-auto"
            >
              Voir toutes les offres
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
