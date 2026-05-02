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

export function CalcomEmbed({ calLink }: Props) {
  return (
    <div className="w-full overflow-x-auto overflow-y-visible [-webkit-overflow-scrolling:touch]">
      <Cal
        calLink={calLink}
        className="main cal-booking-embed w-full min-w-[min(100%,620px)] rounded-xl bg-white p-1 shadow-lg ring-1 ring-hd-green/10 sm:min-w-[680px] lg:min-w-[800px]"
        config={{
          theme: 'light',
          layout: 'column_view',
        }}
        style={{
          width: '100%',
          minHeight: 'clamp(580px, 70vh, 920px)',
        }}
      />
    </div>
  )
}
