'use server'

import { insertClient } from '@hd-corporate/db'
import { auth0 } from '@/lib/auth0'
import { assertStaffEmail } from '@/lib/access'
import { revalidatePath } from 'next/cache'

export type CreateClientState = { ok: boolean; error?: string }

export async function createClientAction(
  _prev: CreateClientState,
  formData: FormData
): Promise<CreateClientState> {
  const session = await auth0.getSession()
  if (!session || !assertStaffEmail(session)) {
    return { ok: false, error: 'Non autorisé' }
  }

  const displayName = String(formData.get('displayName') ?? '').trim()
  if (!displayName) {
    return { ok: false, error: 'Le nom est requis.' }
  }

  try {
    await insertClient({
      displayName,
      email: String(formData.get('email') ?? '').trim() || null,
      company: String(formData.get('company') ?? '').trim() || null,
      siren: String(formData.get('siren') ?? '').trim() || null,
      notes: String(formData.get('notes') ?? '').trim() || null,
    })
    revalidatePath('/clients')
    return { ok: true }
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Erreur serveur'
    return { ok: false, error: message }
  }
}
