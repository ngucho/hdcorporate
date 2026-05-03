'use client'

import { useCallback, useState } from 'react'
import type { ContactRequest } from '@/lib/api/types'
import { useSubmitContact } from '@/hooks/use-contact'

const emptyForm: ContactRequest = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

export function ContactSection() {
  const { submitContact, isSubmitting, error, success, reset } = useSubmitContact()
  const [form, setForm] = useState<ContactRequest>(emptyForm)

  const onChange = useCallback(
    (field: keyof ContactRequest) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
    },
    []
  )

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      const payload: ContactRequest = {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        ...(form.phone?.trim() ? { phone: form.phone.trim() } : {}),
      }
      const ok = await submitContact(payload)
      if (ok) {
        setForm(emptyForm)
      }
    },
    [form, submitContact]
  )

  return (
    <section id="contact" className="border-t border-hd-green/10 bg-hd-cream py-20 lg:py-28">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-light text-hd-green md:text-4xl">Nous écrire</h2>
        <p className="mt-3 text-sm text-hd-green/70">
          Une question sur nos services ou votre dossier ? Envoyez-nous un message, nous vous répondons dans les
          meilleurs délais.
        </p>

        {success ? (
          <div className="mt-8 rounded-lg border border-hd-green/20 bg-white/80 p-6 text-hd-green">
            <p className="font-medium">Message envoyé</p>
            <p className="mt-2 text-sm text-hd-green/70">Merci. Nous avons bien reçu votre demande.</p>
            <button
              type="button"
              onClick={() => reset()}
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded border border-hd-green/30 px-4 py-2 text-sm font-medium text-hd-green transition-colors hover:bg-hd-green/5"
            >
              Envoyer un autre message
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-10 space-y-5">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-hd-green">
                Nom <span className="text-red-600">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                required
                autoComplete="name"
                value={form.name}
                onChange={onChange('name')}
                className="mt-1.5 block w-full min-h-11 rounded-md border border-hd-green/20 bg-white px-3 py-2 text-hd-green shadow-sm focus:border-hd-green focus:outline-none focus:ring-1 focus:ring-hd-green"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-hd-green">
                E-mail <span className="text-red-600">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={onChange('email')}
                className="mt-1.5 block w-full min-h-11 rounded-md border border-hd-green/20 bg-white px-3 py-2 text-hd-green shadow-sm focus:border-hd-green focus:outline-none focus:ring-1 focus:ring-hd-green"
              />
            </div>
            <div>
              <label htmlFor="contact-phone" className="block text-sm font-medium text-hd-green">
                Téléphone <span className="text-hd-green/50">(optionnel)</span>
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone ?? ''}
                onChange={onChange('phone')}
                className="mt-1.5 block w-full min-h-11 rounded-md border border-hd-green/20 bg-white px-3 py-2 text-hd-green shadow-sm focus:border-hd-green focus:outline-none focus:ring-1 focus:ring-hd-green"
              />
            </div>
            <div>
              <label htmlFor="contact-subject" className="block text-sm font-medium text-hd-green">
                Sujet <span className="text-red-600">*</span>
              </label>
              <input
                id="contact-subject"
                name="subject"
                required
                value={form.subject}
                onChange={onChange('subject')}
                className="mt-1.5 block w-full min-h-11 rounded-md border border-hd-green/20 bg-white px-3 py-2 text-hd-green shadow-sm focus:border-hd-green focus:outline-none focus:ring-1 focus:ring-hd-green"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-hd-green">
                Message <span className="text-red-600">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={onChange('message')}
                className="mt-1.5 block w-full rounded-md border border-hd-green/20 bg-white px-3 py-2 text-hd-green shadow-sm focus:border-hd-green focus:outline-none focus:ring-1 focus:ring-hd-green"
              />
            </div>

            {error ? (
              <p className="text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-11 w-full items-center justify-center rounded bg-hd-green px-6 py-3 font-medium text-white transition-colors hover:bg-hd-green/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? 'Envoi…' : 'Envoyer'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
