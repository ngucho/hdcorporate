import type { Service } from '@hd-corporate/contracts'

export function mapRowToService(row: {
  id: string
  title: string
  price: string
  badge?: string
  delay?: string
  features: string[]
  category: string
}): Service {
  const category = row.category as Service['category']
  return {
    id: row.id,
    title: row.title,
    price: row.price,
    badge: row.badge,
    delay: row.delay,
    features: row.features,
    category,
  }
}
