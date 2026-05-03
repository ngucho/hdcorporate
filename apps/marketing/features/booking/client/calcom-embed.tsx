'use client'

import dynamic from 'next/dynamic'

const Cal = dynamic(() => import('@calcom/embed-react').then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[min(60vh,560px)] w-full min-w-0 items-center justify-center rounded-xl bg-white text-hd-green/50 text-sm shadow-lg ring-1 ring-hd-green/10">
      Chargement du calendrier…
    </div>
  ),
})

type Props = {
  calLink: string
}

/**
 * Mobile : largeur 100 %, pas de min-width — Cal.com peut placer les créneaux sous le calendrier
 * (`useSlotsViewOnSmallScreen: 'true'`). Desktop : `column_view` + largeur max pour rester lisible.
 */
const BOOKER_SHELL_CLASS =
  'mx-auto w-full min-w-0 max-w-[min(100%,920px)] overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-hd-green/10 [&_iframe]:h-auto [&_iframe]:w-full [&_iframe]:max-w-full'

export function CalcomEmbed({ calLink }: Props) {
  return (
    <div className="w-full min-w-0 overflow-x-clip overflow-y-visible">
      <div className={BOOKER_SHELL_CLASS}>
        <Cal
          calLink={calLink}
          className="main cal-booking-embed w-full min-w-0 rounded-xl bg-white p-1"
          config={{
            theme: 'light',
            layout: 'column_view',
            /** Vue « petit écran » : grille des horaires sous le calendrier (responsive). */
            useSlotsViewOnSmallScreen: 'true',
          }}
          style={{
            width: '100%',
            maxWidth: '100%',
            minHeight: 'clamp(420px, 58vh, 860px)',
          }}
        />
      </div>
    </div>
  )
}
