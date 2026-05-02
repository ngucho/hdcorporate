'use client'

import { useActionState } from 'react'
import { createReceiptAction, type ReceiptState } from '../../receipt-actions'

const initial: ReceiptState = { ok: false }

export function AddReceiptForm({ clientId }: { clientId: string }) {
  const [state, formAction, pending] = useActionState(createReceiptAction, initial)

  return (
    <form
      action={formAction}
      className="rounded-lg border p-4 space-y-3 max-w-xl"
      style={{ borderColor: 'var(--border)', background: 'var(--panel)' }}
    >
      <input type="hidden" name="clientId" value={clientId} />
      <h2 className="font-medium">Ajouter un reçu</h2>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-xs text-[var(--muted)]">Montant (ex. 1200.00)</label>
          <input
            name="amount"
            required
            className="rounded border bg-[var(--bg)] px-3 py-2 text-sm"
            style={{ borderColor: 'var(--border)' }}
          />
        </div>
        <div className="grid gap-2">
          <label className="text-xs text-[var(--muted)]">Devise</label>
          <input
            name="currency"
            defaultValue="EUR"
            className="rounded border bg-[var(--bg)] px-3 py-2 text-sm"
            style={{ borderColor: 'var(--border)' }}
          />
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-xs text-[var(--muted)]">TVA % (optionnel)</label>
          <input
            name="vatRate"
            className="rounded border bg-[var(--bg)] px-3 py-2 text-sm"
            style={{ borderColor: 'var(--border)' }}
          />
        </div>
        <div className="grid gap-2">
          <label className="text-xs text-[var(--muted)]">Date d’émission</label>
          <input
            name="issuedAt"
            type="date"
            required
            className="rounded border bg-[var(--bg)] px-3 py-2 text-sm"
            style={{ borderColor: 'var(--border)' }}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <label className="text-xs text-[var(--muted)]">Statut</label>
        <select
          name="status"
          defaultValue="draft"
          className="rounded border bg-[var(--bg)] px-3 py-2 text-sm"
          style={{ borderColor: 'var(--border)' }}
        >
          <option value="draft">Brouillon</option>
          <option value="sent">Envoyé</option>
          <option value="paid">Payé</option>
        </select>
      </div>
      <div className="grid gap-2">
        <label className="text-xs text-[var(--muted)]">Notes</label>
        <textarea
          name="notes"
          rows={2}
          className="rounded border bg-[var(--bg)] px-3 py-2 text-sm"
          style={{ borderColor: 'var(--border)' }}
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        style={{ background: 'var(--accent)' }}
      >
        {pending ? 'Enregistrement…' : 'Enregistrer'}
      </button>
      {state.error && <p className="text-sm text-red-400">{state.error}</p>}
      {state.ok && <p className="text-sm text-green-400">Reçu enregistré.</p>}
    </form>
  )
}
