import { getClientById, listReceiptsForClient } from '@hd-corporate/db'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AddReceiptForm } from './ui/add-receipt-form'

export const runtime = 'nodejs'

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  let client = null
  let receipts: Awaited<ReturnType<typeof listReceiptsForClient>> = []
  try {
    client = await getClientById(id)
    if (client) {
      receipts = await listReceiptsForClient(id)
    }
  } catch {
    client = null
  }

  if (!client) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <Link href="/clients" className="text-sm text-[var(--accent)] hover:underline">
        ← Retour aux clients
      </Link>
      <div>
        <h1 className="text-2xl font-semibold">{client.displayName}</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {client.email ?? '—'} · {client.company ?? '—'} · SIREN {client.siren ?? '—'}
        </p>
        {client.notes && (
          <p className="mt-4 text-sm border-l-2 pl-3" style={{ borderColor: 'var(--accent)' }}>
            {client.notes}
          </p>
        )}
      </div>

      <AddReceiptForm clientId={client.id} />

      <div>
        <h2 className="text-lg font-medium mb-3">Reçus / factures</h2>
        <div className="overflow-x-auto rounded-lg border" style={{ borderColor: 'var(--border)' }}>
          <table className="w-full text-sm">
            <thead style={{ background: 'var(--panel)' }}>
              <tr className="text-left text-[var(--muted)]">
                <th className="p-3">Montant</th>
                <th className="p-3">Devise</th>
                <th className="p-3">Émission</th>
                <th className="p-3">Statut</th>
                <th className="p-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map((r) => (
                <tr key={r.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                  <td className="p-3">{r.amount}</td>
                  <td className="p-3">{r.currency}</td>
                  <td className="p-3">
                    {r.issuedAt ? new Date(r.issuedAt).toLocaleDateString('fr-FR') : ''}
                  </td>
                  <td className="p-3">{r.status}</td>
                  <td className="p-3 text-[var(--muted)]">{r.notes ?? '—'}</td>
                </tr>
              ))}
              {receipts.length === 0 && (
                <tr>
                  <td className="p-4 text-[var(--muted)]" colSpan={5}>
                    Aucun reçu pour ce client.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
