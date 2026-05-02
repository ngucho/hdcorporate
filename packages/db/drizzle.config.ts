import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'
import { dirname, resolve } from 'path'
import { existsSync } from 'fs'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '../..')

/** drizzle-kit runs outside Next.js — load the same secrets as typical local dev. */
const envPaths = [
  resolve(repoRoot, '.env'),
  resolve(repoRoot, '.env.local'),
  resolve(__dirname, '.env'),
  resolve(repoRoot, 'apps/marketing/.env.local'),
  resolve(repoRoot, 'apps/api/.env.local'),
  resolve(repoRoot, 'apps/backoffice/.env.local'),
] as const

for (const p of envPaths) {
  if (existsSync(p)) {
    config({ path: p, override: true, quiet: true })
  }
}

const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? ''
if (!url) {
  throw new Error(
    '[@hd-corporate/db] Missing DATABASE_URL (or DIRECT_URL).\n' +
      'drizzle-kit does not inherit Next.js env automatically.\n' +
      'Use one of:\n' +
      '  - repo root `.env` or `.env.local`\n' +
      '  - `packages/db/.env` (see packages/db/.env.example)\n' +
      '  - `apps/{marketing,api,backoffice}/.env.local` with DATABASE_URL set\n' +
      'See docs/setup/supabase.md',
  )
}

export default defineConfig({
  schema: './src/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url,
  },
})
