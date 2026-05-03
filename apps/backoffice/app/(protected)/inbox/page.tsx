import { listBookings, listContactTickets, listLeads } from '@hd-corporate/db'
import { CopyTextButton } from './copy-text-button'

export const runtime = 'nodejs'

function mailtoHref(email: string, subject?: string): string {
  const base = `mailto:${encodeURIComponent(email)}`
  if (!subject?.trim()) return base
  return `${base}?subject=${encodeURIComponent(subject)}`
}

export default async function InboxPage() {
  let leads: Awaited<ReturnType<typeof listLeads>> = []
  let bookings: Awaited<ReturnType<typeof listBookings>> = []
  let tickets: Awaited<ReturnType<typeof listContactTickets>> = []
  try {
    ;[leads, bookings, tickets] = await Promise.all([
      listLeads(200),
      listBookings(200),
      listContactTickets(200),
    ])
  } catch {
    // DB unavailable
  }

  return (
    <div className="space-y-12">
      <h1 className="text-2xl font-semibold">Boîte de réception</h1>

      <section id="leads">
        <h2 className="text-lg font-medium mb-3">Leads</h2>
        <div className="overflow-x-auto rounded-lg border" style={{ borderColor: 'var(--border)' }}>
          <table className="w-full text-sm">
            <thead style={{ background: 'var(--panel)' }}>
              <tr className="text-left text-[var(--muted)]">
                <th className="p-3">Email</th>
                <th className="p-3">Source</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                  <td className="p-3">
                    <a href={mailtoHref(l.email)} className="text-[var(--accent)] underline-offset-2 hover:underline">
                      {l.email}
                    </a>
                  </td>
                  <td className="p-3">{l.source}</td>
                  <td className="p-3 text-[var(--muted)]">
                    {l.createdAt ? new Date(l.createdAt).toLocaleString('fr-FR') : ''}
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      <CopyTextButton text={l.email} label="Copier e-mail" />
                    </div>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td className="p-4 text-[var(--muted)]" colSpan={4}>
                    Aucun lead pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section id="bookings">
        <h2 className="text-lg font-medium mb-3">Réservations</h2>
        <div className="overflow-x-auto rounded-lg border" style={{ borderColor: 'var(--border)' }}>
          <table className="w-full text-sm">
            <thead style={{ background: 'var(--panel)' }}>
              <tr className="text-left text-[var(--muted)]">
                <th className="p-3">Réf.</th>
                <th className="p-3">Source</th>
                <th className="p-3">Date / heure</th>
                <th className="p-3">Client</th>
                <th className="p-3">Service</th>
                <th className="p-3">Visio / cal.</th>
                <th className="p-3">Statut</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                  <td className="p-3 font-mono text-xs">{b.externalId}</td>
                  <td className="p-3 text-xs uppercase tracking-wide">{b.source ?? 'internal'}</td>
                  <td className="p-3">
                    {b.bookingDate} {b.slotTime}
                  </td>
                  <td className="p-3">
                    {b.name}
                    <div className="text-xs text-[var(--muted)]">
                      <a
                        href={mailtoHref(b.email, `Réservation ${b.externalId}`)}
                        className="text-[var(--accent)] underline-offset-2 hover:underline"
                      >
                        {b.email}
                      </a>
                    </div>
                  </td>
                  <td className="p-3">{b.service}</td>
                  <td className="p-3">
                    {b.calendarLink && /^https?:\/\//i.test(b.calendarLink) ? (
                      <a
                        href={b.calendarLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent)] underline-offset-2 hover:underline text-xs"
                      >
                        Ouvrir visio / cal.
                      </a>
                    ) : (
                      <span className="text-[var(--muted)] text-xs">—</span>
                    )}
                  </td>
                  <td className="p-3">{b.status}</td>
                  <td className="p-3">
                    <div className="flex flex-col gap-2">
                      <CopyTextButton text={b.externalId} label="Copier réf." />
                      {b.providerBookingUid ? (
                        <CopyTextButton text={b.providerBookingUid} label="Copier UID Cal" />
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td className="p-4 text-[var(--muted)]" colSpan={8}>
                    Aucune réservation.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section id="tickets">
        <h2 className="text-lg font-medium mb-3">Messages contact</h2>
        <div className="overflow-x-auto rounded-lg border" style={{ borderColor: 'var(--border)' }}>
          <table className="w-full text-sm">
            <thead style={{ background: 'var(--panel)' }}>
              <tr className="text-left text-[var(--muted)]">
                <th className="p-3">Ticket</th>
                <th className="p-3">Sujet</th>
                <th className="p-3">Email</th>
                <th className="p-3">Statut</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                  <td className="p-3 font-mono text-xs">{t.externalId}</td>
                  <td className="p-3">{t.subject}</td>
                  <td className="p-3">
                    <a
                      href={mailtoHref(t.email, `Re: ${t.subject}`)}
                      className="text-[var(--accent)] underline-offset-2 hover:underline"
                    >
                      {t.email}
                    </a>
                  </td>
                  <td className="p-3">{t.status}</td>
                  <td className="p-3">
                    <div className="flex flex-col gap-2">
                      <CopyTextButton text={t.externalId} label="Copier ticket" />
                      <CopyTextButton text={t.id} label="Copier ID" />
                    </div>
                  </td>
                </tr>
              ))}
              {tickets.length === 0 && (
                <tr>
                  <td className="p-4 text-[var(--muted)]" colSpan={5}>
                    Aucun message.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
