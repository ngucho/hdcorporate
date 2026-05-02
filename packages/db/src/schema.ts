import { sql } from 'drizzle-orm'
import {
  boolean,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  integer,
} from 'drizzle-orm/pg-core'

export const clients = pgTable('clients', {
  id: uuid('id').defaultRandom().primaryKey(),
  displayName: text('display_name').notNull(),
  email: text('email'),
  company: text('company'),
  siren: text('siren'),
  notes: text('notes'),
  status: text('status').notNull().default('active'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const services = pgTable('services', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  price: text('price').notNull(),
  badge: text('badge'),
  delay: text('delay'),
  category: text('category').notNull(),
  features: jsonb('features').$type<string[]>().notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  published: boolean('published').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const leads = pgTable(
  'leads',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    email: text('email').notNull(),
    source: text('source').notNull(),
    metadata: jsonb('metadata').$type<Record<string, string> | null>(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    leadsEmailSourceUnique: uniqueIndex('leads_email_source_unique').on(
      table.email,
      table.source
    ),
  })
)

export const bookings = pgTable(
  'bookings',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    externalId: text('external_id').notNull().unique(),
    bookingDate: text('booking_date').notNull(),
    slotTime: text('slot_time').notNull(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    phone: text('phone'),
    company: text('company'),
    service: text('service').notNull(),
    message: text('message'),
    status: text('status').notNull().default('pending'),
    calendarLink: text('calendar_link'),
    /** Toujours alimenté via webhooks Cal.com (`calcom`). */
    source: text('source').notNull().default('calcom'),
    /** UID Cal.com (`payload.uid`) idempotence webhooks */
    providerBookingUid: text('provider_booking_uid'),
    metadata: jsonb('metadata').$type<Record<string, unknown> | null>(),
    clientId: uuid('client_id').references(() => clients.id),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    providerBookingUidUnique: uniqueIndex('bookings_provider_booking_uid_unique')
      .on(table.providerBookingUid)
      .where(sql`${table.providerBookingUid} IS NOT NULL`),
  })
)

export const contactTickets = pgTable('contact_tickets', {
  id: uuid('id').defaultRandom().primaryKey(),
  externalId: text('external_id').notNull().unique(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  status: text('status').notNull().default('open'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const receipts = pgTable('receipts', {
  id: uuid('id').defaultRandom().primaryKey(),
  clientId: uuid('client_id')
    .references(() => clients.id)
    .notNull(),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  currency: text('currency').notNull().default('EUR'),
  vatRate: numeric('vat_rate', { precision: 5, scale: 2 }),
  issuedAt: timestamp('issued_at', { withTimezone: true }).notNull(),
  status: text('status').notNull().default('draft'),
  fileKey: text('file_key'),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

