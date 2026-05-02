import { createMiddleware } from 'hono/factory'
import type { AppEnv } from '../hono-env.js'

/**
 * En-têtes de sécurité HTTP (complètent ceux posés par la plateforme, ex. Vercel).
 * HSTS uniquement en production Vercel pour ne pas polluer les domaines de preview.
 */
export const securityHeaders = createMiddleware<AppEnv>(async (c, next) => {
  c.header('X-Content-Type-Options', 'nosniff')
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
  c.header('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  c.header('X-Frame-Options', 'DENY')

  if (process.env.VERCEL_ENV === 'production') {
    c.header('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  }

  await next()
})
