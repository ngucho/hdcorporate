import { Mail, Phone } from 'lucide-react'
import { BOOKING_REASSURANCE_POINTS } from '../constants'

type Props = {
  /** Libellé offre (page détail) pour rappeler le contexte à l’arrivée sur #booking. */
  intentLabel?: string | null
}

export function BookingMarketingAside({ intentLabel }: Props) {
  return (
    <div className="reveal-left" style={{ transitionDelay: '0.2s' }}>
      <span className="text-sm text-hd-gold tracking-wide font-medium">
        Gratuit, sans engagement
      </span>

      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-hd-green mt-4 mb-6">
        Parlons de votre projet. <em className="italic">30 minutes offertes.</em>
      </h2>

      {intentLabel ? (
        <p className="mb-6 rounded-lg border border-hd-gold/30 bg-hd-gold/10 px-4 py-3 text-sm text-hd-green">
          <span className="font-medium">Votre demande :</span> {intentLabel}
        </p>
      ) : null}

      <p className="text-hd-green/80 leading-relaxed mb-8">
        {
          "Que vous soyez en création, en croissance ou à l'international, réservez un appel gratuit avec Hamidou. Nous passons en revue votre situation, nous répondons à vos questions sans pression commerciale."
        }
      </p>

      <ul className="space-y-3 mb-10">
        {BOOKING_REASSURANCE_POINTS.map((point) => (
          <li key={point} className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-hd-gold rounded-full" />
            <span className="text-sm text-hd-green/70">{point}</span>
          </li>
        ))}
      </ul>

      <div className="border-t border-hd-green/10 pt-8 mb-8">
        <div className="flex flex-col sm:flex-row gap-6">
          <a
            href="mailto:hamidoudiallo.fusac@gmail.com"
            className="flex items-center gap-3 text-sm text-hd-green/70 hover:text-hd-green transition-colors"
          >
            <Mail className="w-4 h-4" />
            hamidoudiallo.fusac@gmail.com
          </a>
          <a
            href="tel:+33767376622"
            className="flex items-center gap-3 text-sm text-hd-green/70 hover:text-hd-green transition-colors"
          >
            <Phone className="w-4 h-4" />
            (+33) 07 67 37 66 22
          </a>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex gap-2 mb-3">
          <span className="text-hd-gold text-2xl font-serif">{'"'}</span>
        </div>
        <p className="text-hd-green/80 italic text-sm leading-relaxed mb-4">
          {
            "J'ai lancé ma SAS à 24 ans grâce à Hamidou. Il a pris le temps de tout m'expliquer, même les trucs que je pensais trop techniques. Franchement, si t'hésites, fonce."
          }
        </p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-hd-green rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">MB</span>
          </div>
          <div>
            <p className="text-sm font-medium text-hd-green">Mariam B.</p>
            <p className="text-xs text-hd-green/50">Fondatrice, Studio Créatif</p>
          </div>
        </div>
      </div>
    </div>
  )
}
