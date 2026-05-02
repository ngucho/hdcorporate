ALTER TABLE "bookings" ADD COLUMN IF NOT EXISTS "source" text DEFAULT 'internal' NOT NULL;
ALTER TABLE "bookings" ADD COLUMN IF NOT EXISTS "provider_booking_uid" text;
ALTER TABLE "bookings" ADD COLUMN IF NOT EXISTS "metadata" jsonb;
CREATE UNIQUE INDEX IF NOT EXISTS "bookings_provider_booking_uid_unique" ON "bookings" ("provider_booking_uid") WHERE "provider_booking_uid" IS NOT NULL;
