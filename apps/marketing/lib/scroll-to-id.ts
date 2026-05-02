/** Scroll programmatique : `smooth` sauf si l’utilisateur demande moins de mouvement. */
export function scrollToId(id: string, block: ScrollLogicalPosition = 'start') {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (!el) return
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block })
}
