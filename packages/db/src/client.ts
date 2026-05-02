import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema.js'

type Sql = ReturnType<typeof postgres>

const globalForDb = globalThis as unknown as {
  sql?: Sql
}

function createSql(): Sql {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL is not set')
  }
  return postgres(url, {
    max: 1,
    prepare: false,
    idle_timeout: 20,
    connect_timeout: 10,
  })
}

export function getSql(): Sql {
  if (!globalForDb.sql) {
    globalForDb.sql = createSql()
  }
  return globalForDb.sql
}

export function getDb() {
  return drizzle(getSql(), { schema })
}
