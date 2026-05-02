import { listClients } from '@hd-corporate/db'
import Link from 'next/link'
import { CreateClientForm } from './ui/create-client-form'

export const runtime = 'nodejs'

export default async function ClientsPage() {
  let rows: Awaited<ReturnType<typeof listClients>> = []
  try {
    rows = await listClients()
  } catch {
    // empty
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Clients</h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            Dossiers et contacts pour la facturation et le suivi.
          </p>
        </div>
      </div>

      <CreateClientForm />

      <div className="overflow-x-auto rounded-lg border" style={{ borderColor: 'var(--border)' }}>
        <table className="w-full text-sm">
          <thead style={{ background: 'var(--panel)' }}>
            <tr className="text-left text-[var(--muted)]">
              <th className="p-3">Nom</th>
              <th className="p-3">Email</th>
              <th className="p-3">Société</th>
              <th className="p-3">Statut</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                <td className="p-3">{c.displayName}</td>
                <td className="p-3">{c.email ?? '—'}</td>
                <td className="p-3">{c.company ?? '—'}</td>
                <td className="p-3">{c.status}</td>
                <td className="p-3 text-right">
                  <Link href={`/clients/${c.id}`} className="text-[var(--accent)] hover:underline">
                    Détails
                  </Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className="p-4 text-[var(--muted)]" colSpan={5}>
                  Aucun client enregistré.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
