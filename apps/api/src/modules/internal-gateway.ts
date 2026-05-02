import { Hono } from 'hono'
import type { AppEnv } from '../core/hono-env.js'
import { requireBearerAuth } from '../core/middleware/bearer-auth.js'

/**
 * API interne (backoffice / automations). Préfixe `/internal`.
 * - `GET /internal/health` : chargeur / LB, sans auth.
 * - `GET /internal/v1/me` : diagnostic JWT + permissions (Bearer requis).
 * Les routes métier futures : `requireAllPermissions(...)` après `requireBearerAuth`.
 */
export function createInternalGateway(): Hono<AppEnv> {
  const r = new Hono<AppEnv>()

  r.get('/health', (c) => c.json({ ok: true as const, ts: new Date().toISOString() }))

  const v1 = new Hono<AppEnv>()
  v1.use('*', requireBearerAuth)

  v1.get('/me', (c) => {
    const auth = c.get('auth')
    if (!auth) {
      return c.json({ error: 'unauthorized' }, 401)
    }
    return c.json({
      sub: auth.sub,
      email: auth.email,
      emailVerified: auth.emailVerified,
      permissions: auth.permissions,
      roles: auth.roles,
      givenName: auth.givenName,
      familyName: auth.familyName,
      fullName: auth.fullName,
      nickname: auth.nickname,
      photoUrl: auth.photoUrl,
      locale: auth.locale,
      jobTitle: auth.jobTitle,
      department: auth.department,
      orgUnit: auth.orgUnit,
      appMetadata: auth.appMetadata,
    })
  })

  r.route('/v1', v1)
  return r
}
