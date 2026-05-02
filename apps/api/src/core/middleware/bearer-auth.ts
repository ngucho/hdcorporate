import { createMiddleware } from 'hono/factory'
import type { AppEnv } from '../hono-env.js'
import { verifyAuth0AccessToken } from '../auth/verify-access-token.js'

/** JWT Auth0 (access token) obligatoire ; remplit `c.var.auth`. */
export const requireBearerAuth = createMiddleware<AppEnv>(async (c, next) => {
  if (!process.env.AUTH0_DOMAIN?.trim() || !process.env.AUTH0_AUDIENCE?.trim()) {
    c.get('log').error('auth0 env AUTH0_DOMAIN / AUTH0_AUDIENCE missing')
    return c.json({ error: 'auth_not_configured' }, 503)
  }

  const header = c.req.header('authorization')
  if (!header?.toLowerCase().startsWith('bearer ')) {
    return c.json({ error: 'missing_bearer_token' }, 401)
  }

  const token = header.slice(7).trim()
  if (!token) {
    return c.json({ error: 'missing_bearer_token' }, 401)
  }

  const auth = await verifyAuth0AccessToken(token)
  if (!auth) {
    c.get('log').warn('invalid_or_expired_bearer_token')
    return c.json({ error: 'invalid_token' }, 401)
  }

  c.set('auth', auth)
  await next()
})
