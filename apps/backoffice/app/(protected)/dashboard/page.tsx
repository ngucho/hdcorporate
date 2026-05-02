import {
  listBookings,
  listClients,
  listContactTickets,
  listLeads,
} from '@hd-corporate/db'

export const runtime = 'nodejs'

async function safeCount(fn: () => Promise<unknown[]>) {
  try {
    const rows = await fn()
    return rows.length
  } catch {
    return 0
  }
}

export default async function DashboardPage() {
  const [clients, leads, bookings, tickets] = await Promise.all([
    safeCount(() => listClients()),
    safeCount(() => listLeads(500)),
    safeCount(() => listBookings(500)),
    safeCount(() => listContactTickets(500)),
  ])

  const cards = [
    { label: 'Clients', value: clients, href: '/clients' },
    { label: 'Leads', value: leads, href: '/inbox#leads' },
    { label: 'Réservations', value: bookings, href: '/inbox#bookings' },
    { label: 'Messages contact', value: tickets, href: '/inbox#tickets' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Tableau de bord</h1>
      <p className="text-[var(--muted)] text-sm mb-8">
        Vue d’ensemble des données issues du site marketing.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <a
            key={c.label}
            href={c.href}
            className="rounded-lg border p-5 hover:border-[var(--accent)] transition-colors"
            style={{ borderColor: 'var(--border)', background: 'var(--panel)' }}
          >
            <p className="text-[var(--muted)] text-sm">{c.label}</p>
            <p className="text-3xl font-semibold mt-2">{c.value}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
