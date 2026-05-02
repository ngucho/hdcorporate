/**
 * Calendrier public : uniquement Cal.com (embed).
 * Format : `username/slug` la partie après `https://cal.com/`.
 */
export function getPublicCalcomCalLink(): string | null {
  const link = process.env.NEXT_PUBLIC_CALCOM_CAL_LINK?.trim()
  return link || null
}
