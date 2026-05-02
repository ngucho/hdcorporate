import type { MiddlewareHandler } from 'hono'
import { cors } from 'hono/cors'
import { allowedOrigins } from '../../../lib/cors.js'
import type { AppEnv } from '../hono-env.js'

/**
 * CORS pour les clients navigateur (marketing, etc.). Aligné sur `API_ALLOWED_ORIGINS`.
 */
export function publicCors(): MiddlewareHandler<AppEnv> {
  return cors({
    origin: (origin) => {
      const list = allowedOrigins()
      if (!origin) return list[0] ?? ''
      return list.includes(origin) ? origin : undefined
    },
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
  })
}
