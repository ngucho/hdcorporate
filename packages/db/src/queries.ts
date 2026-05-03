import { asc, desc, eq } from 'drizzle-orm'
import { getDb } from './client.js'
import { bookings, clients, contactTickets, leads, receipts, services } from './schema.js'

export type PublicService = {
  id: string
  slug: string
  title: string
  price: string
  badge?: string
  delay?: string
  features: string[]
  category: string
}

export async function listPublishedServices(): Promise<PublicService[]> {
  const db = getDb()
  const rows = await db
    .select()
    .from(services)
    .where(eq(services.published, true))
    .orderBy(asc(services.sortOrder), asc(services.title))

  return rows.map((r) => ({
    id: r.slug,
    slug: r.slug,
    title: r.title,
    price: r.price,
    badge: r.badge ?? undefined,
    delay: r.delay ?? undefined,
    features: r.features,
    category: r.category,
  }))
}

export async function insertLead(input: {
  email: string
  source: string
  metadata?: Record<string, string> | null
}) {
  const db = getDb()
  await db.insert(leads).values({
    email: input.email,
    source: input.source,
    metadata: input.metadata ?? null,
  })
}

export async function insertContactTicket(input: {
  externalId: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  const db = getDb()
  await db.insert(contactTickets).values({
    externalId: input.externalId,
    name: input.name,
    email: input.email,
    phone: input.phone ?? null,
    subject: input.subject,
    message: input.message,
  })
}

export async function findBookingByProviderUid(providerBookingUid: string) {
  const db = getDb()
  const [row] = await db
    .select()
    .from(bookings)
    .where(eq(bookings.providerBookingUid, providerBookingUid))
    .limit(1)
  return row ?? null
}

export async function insertCalcomBooking(input: {
  externalId: string
  bookingDate: string
  slotTime: string
  name: string
  email: string
  phone?: string | null
  company?: string | null
  service: string
  message?: string | null
  calendarLink: string
  providerBookingUid: string
  metadata?: Record<string, unknown> | null
}) {
  const db = getDb()
  const [row] = await db
    .insert(bookings)
    .values({
      externalId: input.externalId,
      bookingDate: input.bookingDate,
      slotTime: input.slotTime,
      name: input.name,
      email: input.email,
      phone: input.phone ?? null,
      company: input.company ?? null,
      service: input.service,
      message: input.message ?? null,
      calendarLink: input.calendarLink,
      status: 'confirmed',
      source: 'calcom',
      providerBookingUid: input.providerBookingUid,
      metadata: input.metadata ?? null,
    })
    .returning()
  return row
}

export async function updateCalcomBookingByProviderUid(
  providerBookingUid: string,
  patch: {
    providerBookingUid?: string
    bookingDate?: string
    slotTime?: string
    name?: string
    email?: string
    phone?: string | null
    company?: string | null
    service?: string
    message?: string | null
    calendarLink?: string
    status?: string
    metadata?: Record<string, unknown> | null
  }
) {
  const db = getDb()
  const [row] = await db
    .update(bookings)
    .set(patch)
    .where(eq(bookings.providerBookingUid, providerBookingUid))
    .returning()
  return row ?? null
}

export async function listClients() {
  const db = getDb()
  return db.select().from(clients).orderBy(desc(clients.createdAt))
}

export async function getClientById(id: string) {
  const db = getDb()
  const [row] = await db.select().from(clients).where(eq(clients.id, id)).limit(1)
  return row ?? null
}

export async function insertClient(input: {
  displayName: string
  email?: string | null
  company?: string | null
  siren?: string | null
  notes?: string | null
}) {
  const db = getDb()
  const [row] = await db
    .insert(clients)
    .values({
      displayName: input.displayName,
      email: input.email ?? null,
      company: input.company ?? null,
      siren: input.siren ?? null,
      notes: input.notes ?? null,
    })
    .returning()
  return row
}

export async function updateClient(
  id: string,
  input: Partial<{
    displayName: string
    email: string | null
    company: string | null
    siren: string | null
    notes: string | null
    status: string
  }>
) {
  const db = getDb()
  const [row] = await db
    .update(clients)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(clients.id, id))
    .returning()
  return row ?? null
}

export async function listReceiptsForClient(clientId: string) {
  const db = getDb()
  return db.select().from(receipts).where(eq(receipts.clientId, clientId)).orderBy(desc(receipts.issuedAt))
}

export async function listAllReceipts() {
  const db = getDb()
  return db.select().from(receipts).orderBy(desc(receipts.issuedAt))
}

export async function insertReceipt(input: {
  clientId: string
  amount: string
  currency?: string
  vatRate?: string | null
  issuedAt: Date
  status?: string
  fileKey?: string | null
  notes?: string | null
}) {
  const db = getDb()
  const [row] = await db
    .insert(receipts)
    .values({
      clientId: input.clientId,
      amount: input.amount,
      currency: input.currency ?? 'EUR',
      vatRate: input.vatRate ?? null,
      issuedAt: input.issuedAt,
      status: input.status ?? 'draft',
      fileKey: input.fileKey ?? null,
      notes: input.notes ?? null,
    })
    .returning()
  return row
}

export async function listLeads(limit = 100) {
  const db = getDb()
  return db.select().from(leads).orderBy(desc(leads.createdAt)).limit(limit)
}

export async function listBookings(limit = 100) {
  const db = getDb()
  return db.select().from(bookings).orderBy(desc(bookings.createdAt)).limit(limit)
}

export async function listContactTickets(limit = 100) {
  const db = getDb()
  return db.select().from(contactTickets).orderBy(desc(contactTickets.createdAt)).limit(limit)
}

export async function updateContactTicketStatus(id: string, status: string) {
  const db = getDb()
  const [row] = await db
    .update(contactTickets)
    .set({ status })
    .where(eq(contactTickets.id, id))
    .returning()
  return row ?? null
}

export async function updateBookingStatus(id: string, status: string) {
  const db = getDb()
  const [row] = await db
    .update(bookings)
    .set({ status })
    .where(eq(bookings.id, id))
    .returning()
  return row ?? null
}
