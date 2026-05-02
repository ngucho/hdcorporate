import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pack Création France — SAS, SASU, EURL dès 299€ | HD Corporate',
  description: 'Créez votre SAS, SASU ou EURL en 3 à 5 jours ouvrés. Statuts sur-mesure, immatriculation INPI, annonce légale incluse. Accompagnement personnalisé par un juriste spécialisé.',
}

const includes = [
  'Rédaction des statuts sur-mesure (SAS, SASU, EURL ou SARL)',
  'Immatriculation auprès de l\'INPI (Guichet unique)',
  'Publication de l\'annonce légale incluse',
  'Dépôt du capital social (accompagnement)',
  '30 minutes de conseil juridique offertes',
  'Suivi de dossier en temps réel',
  'Kbis envoyé dès réception',
]

const forWho = [
  { title: 'Freelances & consultants', desc: 'Sécurisez votre activité indépendante sous la bonne forme juridique.' },
  { title: 'Fondateurs de startup', desc: 'Structure adaptée à l\'accueil d\'investisseurs et à la croissance rapide.' },
  { title: 'Salariés en reconversion', desc: 'Créez votre activité en parallèle ou préparez votre transition.' },
  { title: 'PME & dirigeants', desc: 'Créez une filiale ou une holding dans les règles de l\'art.' },
]

const structures = [
  {
    name: 'SAS',
    desc: 'Société par Actions Simplifiée. Souplesse maximale dans les statuts, idéale pour accueillir des investisseurs ou des associés. Dirigée par un Président.',
    best: 'Startups, projets en croissance avec plusieurs associés',
  },
  {
    name: 'SASU',
    desc: 'SAS à associé unique. Toutes les libertés de la SAS, pour un entrepreneur seul. Le dirigeant est assimilé-salarié.',
    best: 'Freelances, consultants, entrepreneurs solos',
  },
  {
    name: 'EURL',
    desc: 'SARL à associé unique. Régime fiscal potentiellement avantageux (IR possible), cotisations sociales du gérant différentes.',
    best: 'Artisans, commerçants, activités à faible risque',
  },
  {
    name: 'SARL',
    desc: 'Société à Responsabilité Limitée. Structure classique avec plusieurs associés, encadrée par la loi, rassurante pour les partenaires.',
    best: 'Commerces, restauration, professions réglementées',
  },
]

const steps = [
  { n: '1', title: 'Formulaire en ligne', time: '10 min', desc: 'Décrivez votre projet via notre questionnaire intelligent.' },
  { n: '2', title: 'Statuts sur-mesure', time: '48h', desc: 'Nous rédigeons vos statuts adaptés à votre situation.' },
  { n: '3', title: 'Signature électronique', time: 'Immédiat', desc: 'Vous validez et signez depuis votre téléphone ou ordinateur.' },
  { n: '4', title: 'Kbis reçu', time: 'J+3 à J+5', desc: 'Votre entreprise est immatriculée. Vous recevez votre Kbis.' },
]

const faqs = [
  {
    q: 'Quelle structure choisir pour mon projet ?',
    a: 'Lors de l\'appel gratuit de 30 minutes inclus dans le pack, nous analysons votre situation (associés, objectifs, revenus envisagés) et vous recommandons la structure optimale. Il n\'y a pas de réponse universelle.',
  },
  {
    q: 'Faut-il un capital minimum ?',
    a: 'Non. Depuis 2003, le capital minimum pour une SAS, SASU ou EURL est de 1€. Nous vous conseillons cependant un capital cohérent avec votre activité pour rassurer vos partenaires.',
  },
  {
    q: 'Dois-je avoir une adresse en France ?',
    a: 'Oui, une adresse de domiciliation est obligatoire pour l\'immatriculation. Nous vous conseillons sur les options disponibles : domicile du dirigeant, bail commercial, ou société de domiciliation.',
  },
  {
    q: 'Les statuts sont-ils vraiment sur-mesure ?',
    a: 'Oui. Contrairement aux LegalTech qui génèrent des statuts génériques, nous rédigeons chaque acte en tenant compte de votre situation spécifique : répartition du capital, clauses de gouvernance, droits des associés.',
  },
  {
    q: 'Que se passe-t-il si j\'ai des questions après la création ?',
    a: 'Nos clients bénéficient d\'un suivi post-création. Pour un accompagnement continu, notre forfait Secrétariat Juridique (49€/mois) couvre toutes vos obligations légales en cours.',
  },
]

export default function CreationFrancePage() {
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
              Le plus populaire
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6">
              Créez votre SAS, SASU ou EURL{' '}
              <em className="italic text-hd-gold">en 3 à 5 jours</em>
            </h1>
            <p className="text-white/70 text-lg mb-10 max-w-2xl">
              Un accompagnement sur-mesure de A à Z. Statuts rédigés pour votre situation, immatriculation INPI, annonce légale incluse — sans stress et sans mauvaise surprise.
            </p>
            <div className="flex flex-wrap gap-8 mb-10">
              <div>
                <p className="text-hd-gold font-serif text-3xl">299€</p>
                <p className="text-white/50 text-sm">tout inclus</p>
              </div>
              <div>
                <p className="text-hd-gold font-serif text-3xl">3-5 jours</p>
                <p className="text-white/50 text-sm">délai moyen</p>
              </div>
              <div>
                <p className="text-hd-gold font-serif text-3xl">100%</p>
                <p className="text-white/50 text-sm">digital</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/#booking"
                className="inline-flex items-center justify-center gap-2 bg-hd-gold text-hd-green px-8 py-4 text-sm font-medium rounded hover:bg-hd-gold/90 transition-colors"
              >
                Réserver mon appel gratuit
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/#booking"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 text-sm font-medium rounded hover:border-hd-gold hover:text-hd-gold transition-colors"
              >
                Commencer — 299€
              </a>
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
                Tout ce qu'il faut pour démarrer, sans rien oublier.
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

      {/* Structures explained */}
      <section className="py-20 lg:py-28 bg-hd-cream-dark">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="text-sm text-hd-green/60 tracking-wide">— Quelle structure choisir ?</span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-hd-green mt-4 mb-12 max-w-2xl">
            Comprendre les différentes formes juridiques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {structures.map((s) => (
              <div key={s.name} className="bg-hd-cream rounded-lg p-7 border border-hd-green/10">
                <span className="font-serif text-2xl text-hd-gold font-bold block mb-3">{s.name}</span>
                <p className="text-hd-green/80 text-sm leading-relaxed mb-4">{s.desc}</p>
                <p className="text-xs text-hd-green/50">
                  <span className="text-hd-gold">Idéal pour :</span> {s.best}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-hd-green/50">
            Vous n'êtes pas sûr de la structure adaptée à votre projet ? L'appel gratuit de 30 minutes inclus dans le pack est là pour ça.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 lg:py-28 bg-hd-green pattern-lines">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-4">
              De l'idée à l'entreprise en <em className="italic text-hd-gold">4 étapes</em>
            </h2>
            <p className="text-white/50 text-sm">100% digital, sans rendez-vous physique obligatoire</p>
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
            Prêt à lancer votre entreprise ?
          </h2>
          <p className="text-hd-green/70 mb-8">
            Réservez votre appel gratuit de 30 minutes. Nous analysons votre projet ensemble et vous confirmons la structure adaptée avant tout paiement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/#booking"
              className="w-full sm:w-auto bg-hd-green text-white px-8 py-4 rounded font-medium hover:bg-hd-green/90 transition-colors"
            >
              Réserver mon appel gratuit
            </a>
            <Link
              href="/"
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
