'use client'

import { Button, Input, Label } from '@fondatis/design-system'
import { useActionState } from 'react'
import { createClientAction, type CreateClientState } from '../actions'

const initial: CreateClientState = { ok: false }

export function CreateClientForm() {
  const [state, formAction, pending] = useActionState(createClientAction, initial)

  return (
    <form
      action={formAction}
      className="rounded-lg border border-border bg-card p-4 space-y-4 max-w-xl text-card-foreground"
    >
      <h2 className="font-medium text-lg">Nouveau client</h2>
      <div className="grid gap-2">
        <Label htmlFor="displayName">Nom affiché</Label>
        <Input id="displayName" name="displayName" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="company">Société</Label>
        <Input id="company" name="company" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="siren">SIREN</Label>
        <Input id="siren" name="siren" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="notes">Notes</Label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? 'Enregistrement…' : 'Créer le client'}
      </Button>
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      {state.ok && <p className="text-sm text-green-500">Client créé.</p>}
    </form>
  )
}
