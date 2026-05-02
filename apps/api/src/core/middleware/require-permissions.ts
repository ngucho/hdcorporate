import type { HdPermission } from '@hd-corporate/contracts'
import { createMiddleware } from 'hono/factory'
import type { AppEnv } from '../hono-env.js'

/** Toutes les permissions listées sont requises. */
export function requireAllPermissions(...required: HdPermission[]) {
  return createMiddleware<AppEnv>(async (c, next) => {
    const auth = c.get('auth')
    if (!auth) {
      return c.json({ error: 'unauthorized' }, 401)
    }
    const ok = required.every((p) => auth.permissions.includes(p))
    if (!ok) {
      c.get('log').warn({ required, permissions: auth.permissions }, 'rbac_forbidden')
      return c.json({ error: 'forbidden', required }, 403)
    }
    await next()
  })
}

/** Au moins une des permissions listées. */
export function requireAnyPermission(...required: HdPermission[]) {
  return createMiddleware<AppEnv>(async (c, next) => {
    const auth = c.get('auth')
    if (!auth) {
      return c.json({ error: 'unauthorized' }, 401)
    }
    const ok = required.some((p) => auth.permissions.includes(p))
    if (!ok) {
      c.get('log').warn({ required, permissions: auth.permissions }, 'rbac_forbidden')
      return c.json({ error: 'forbidden', required }, 403)
    }
    await next()
  })
}
