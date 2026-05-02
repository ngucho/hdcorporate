'use client'

import dynamic from 'next/dynamic'

const Cal = dynamic(() => import('@calcom/embed-react').then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[min(72vh,720px)] min-w-[800px] items-center justify-center rounded-xl bg-white text-hd-green/50 text-sm shadow-lg ring-1 ring-hd-green/10">
      Chargement du calendrier…
    </div>
  ),
})

type Props = {
  calLink: string
}

/**
 * Sous ~800px de largeur utile, Cal.com empile souvent calendrier puis créneaux (vue « mobile »).
 * On impose donc une largeur minimale pour garder calendrier à gauche / horaires à droite ; le
 * conteneur extérieur défile horizontalement sur téléphone. `max-w` limite encore la double
 * colonne « jour » dans le panneau créneaux (voir docs/setup/calcom.md).
 */
const BOOKER_SHELL_CLASS =
  'mx-auto w-full min-w-[800px] max-w-[min(100%,880px)] overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-hd-green/10'

export function CalcomEmbed({ calLink }: Props) {
  return (
    <div className="w-full overflow-x-auto overflow-y-visible overscroll-x-contain [-webkit-overflow-scrolling:touch]">
      <div className={BOOKER_SHELL_CLASS}>
        <Cal
          calLink={calLink}
          className="main cal-booking-embed w-full min-w-0 rounded-xl bg-white p-1"
          config={{
            theme: 'light',
            layout: 'column_view',
            /** Désactive la vue créneaux « petit écran » (pile sous le calendrier) quand c’est supporté. */
            useSlotsViewOnSmallScreen: 'false',
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
