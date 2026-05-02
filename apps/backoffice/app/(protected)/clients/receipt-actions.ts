'use server'

import { insertReceipt } from '@hd-corporate/db'
import { auth0 } from '@/lib/auth0'
import { assertStaffEmail } from '@/lib/access'
import { revalidatePath } from 'next/cache'

export type ReceiptState = { ok: boolean; error?: string }

export async function createReceiptAction(
  _prev: ReceiptState,
  formData: FormData
): Promise<ReceiptState> {
  const session = await auth0.getSession()
  if (!session || !assertStaffEmail(session)) {
    return { ok: false, error: 'Non autorisé' }
  }

  const clientId = String(formData.get('clientId') ?? '').trim()
  const amount = String(formData.get('amount') ?? '').trim()
  const currency = String(formData.get('currency') ?? 'EUR').trim() || 'EUR'
  const vatRateRaw = String(formData.get('vatRate') ?? '').trim()
  const issuedAtRaw = String(formData.get('issuedAt') ?? '').trim()
  const status = String(formData.get('status') ?? 'draft').trim() || 'draft'
  const notes = String(formData.get('notes') ?? '').trim() || null

  if (!clientId || !amount || !issuedAtRaw) {
    return { ok: false, error: 'Champs requis manquants.' }
  }

  const issuedAt = new Date(issuedAtRaw)
  if (Number.isNaN(issuedAt.getTime())) {
    return { ok: false, error: 'Date invalide.' }
  }

  try {
    await insertReceipt({
      clientId,
      amount,
      currency,
      vatRate: vatRateRaw ? vatRateRaw : null,
      issuedAt,
      status,
      notes,
    })
    revalidatePath(`/clients/${clientId}`)
    revalidatePath('/clients')
    return { ok: true }
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Erreur serveur'
    return { ok: false, error: message }
  }
}
