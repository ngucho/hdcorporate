/**
 * Local / Node: HTTP server via @hono/node-server (loads .env then .env.local).
 */
import { config as loadEnv } from 'dotenv'
import { serve } from '@hono/node-server'
import { app } from './app.js'

loadEnv({ path: '.env' })
loadEnv({ path: '.env.local', override: true })

const port = Number(process.env.PORT ?? process.env.API_DEV_PORT ?? 3002)
if (!Number.isFinite(port)) {
  console.error('Invalid PORT / API_DEV_PORT')
  process.exit(1)
}

console.log(`[api] listening on http://localhost:${port}`)
serve({
  fetch: app.fetch,
  port,
  hostname: '0.0.0.0',
})
