'use client'

import dynamic from 'next/dynamic'
import { HomeHashScroll } from './home-hash-scroll'

const CustomCursor = dynamic(
  () => import('./custom-cursor').then((m) => ({ default: m.CustomCursor })),
  { ssr: false }
)

const ScrollProgress = dynamic(
  () => import('./scroll-progress').then((m) => ({ default: m.ScrollProgress })),
  { ssr: false }
)

/** Curseur + barre de progression : chargés uniquement côté client pour alléger le HTML initial. */
export function HomeChrome() {
  return (
    <>
      <HomeHashScroll />
      <CustomCursor />
      <ScrollProgress />
    </>
  )
}
