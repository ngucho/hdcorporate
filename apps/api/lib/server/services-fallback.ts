import type { Service } from '@hd-corporate/contracts'

export const STATIC_SERVICES_FALLBACK: Service[] = [
  {
    id: 'creation-france',
    title: 'Pack Création France',
    price: '299€',
    badge: 'Le plus populaire',
    delay: '7-10 jours ouvrés',
    features: [
      'SAS / SASU / EURL',
      'Statuts sur-mesure',
      'Immatriculation INPI',
      'Annonce légale incluse',
      '30 min conseil offerts',
    ],
    category: 'creation',
  },
  {
    id: 'llc-delaware',
    title: 'LLC Delaware',
    price: '599€',
    badge: 'International',
    delay: '3-4 semaines',
    features: [
      'Certificate of Formation',
      'EIN (Tax ID américain)',
      'Registered Agent 1 an',
      'Compte bancaire US (Relay/Mercury)',
      'Accompagnement Stripe',
    ],
    category: 'international',
  },
  {
    id: 'secretariat-annuel',
    title: 'Secrétariat Annuel',
    price: '49€/mois',
    features: [
      "PV d'assemblées",
      'Approbation des comptes',
      'Suivi obligations légales',
      'Tableau de bord digital',
    ],
    category: 'secretariat',
  },
  {
    id: 'corporate-ma',
    title: 'Corporate & M&A',
    price: 'Sur devis',
    features: [
      'NDA · LOI · SPA',
      "Pactes d'associés",
      'Due Diligence juridique',
      "Garantie d'actif et passif",
    ],
    category: 'corporate',
  },
]
