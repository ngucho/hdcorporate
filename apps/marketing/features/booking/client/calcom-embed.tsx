'use client'

import dynamic from 'next/dynamic'

const Cal = dynamic(() => import('@calcom/embed-react').then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[min(72vh,720px)] items-center justify-center rounded-xl bg-white text-hd-green/50 text-sm shadow-lg ring-1 ring-hd-green/10">
      Chargement du calendrier…
    </div>
  ),
})

type Props = {
  calLink: string
}

/**
 * Largeur plafonnée pour limiter la double colonne « jour » côté Cal ; 720px reste en général
 * raisonnable avant ce basculement (à ajuster si besoin).
 */
const BOOKER_MAX_CLASS = 'max-w-[min(100%,720px)]'

export function CalcomEmbed({ calLink }: Props) {
  return (
    <div className="w-full overflow-x-auto overflow-y-visible [-webkit-overflow-scrolling:touch]">
      <div className={`mx-auto w-full min-w-0 ${BOOKER_MAX_CLASS}`}>
        <Cal
          calLink={calLink}
          className="main cal-booking-embed w-full min-w-0 rounded-xl bg-white p-1 shadow-lg ring-1 ring-hd-green/10"
          config={{
            theme: 'light',
            layout: 'column_view',
          }}
          style={{
            width: '100%',
            minHeight: 'clamp(520px, 62vh, 860px)',
          }}
        />
      </div>
    </div>
  )
}
