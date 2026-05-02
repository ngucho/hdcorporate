import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose'
import { hdAuth0ClaimKey } from '@hd-corporate/contracts'
import type { AuthContext } from './types.js'

function readStringClaim(payload: JWTPayload, key: string): string | undefined {
  const v = payload[key]
  return typeof v === 'string' ? v : undefined
}

function readBooleanClaim(payload: JWTPayload, key: string): boolean | undefined {
  const v = payload[key]
  return typeof v === 'boolean' ? v : undefined
}

function readStringArrayClaim(payload: JWTPayload, key: string): string[] {
  const raw = payload[key]
  if (!Array.isArray(raw)) return []
  return raw.filter((p): p is string => typeof p === 'string')
}

function readPermissions(payload: JWTPayload, ns: string): string[] {
  const standard = readStringArrayClaim(payload, 'permissions')
  if (standard.length) return standard
  return readStringArrayClaim(payload, hdAuth0ClaimKey(ns, 'permissions'))
}

function readRoles(payload: JWTPayload, ns: string): string[] {
  const fromNs = readStringArrayClaim(payload, hdAuth0ClaimKey(ns, 'roles'))
  if (fromNs.length) return fromNs
  return readStringArrayClaim(payload, `${ns.replace(/\/$/, '')}/roles`)
}

function readAppMetadataJson(payload: JWTPayload, ns: string): Record<string, unknown> | undefined {
  const raw = readStringClaim(payload, hdAuth0ClaimKey(ns, 'app_metadata'))
  if (!raw) return undefined
  try {
    const parsed = JSON.parse(raw) as unknown
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>
    }
  } catch {
    return undefined
  }
  return undefined
}

let jwks: ReturnType<typeof createRemoteJWKSet> | undefined

function getJwks(domain: string) {
  if (!jwks) {
    jwks = createRemoteJWKSet(new URL(`https://${domain}/.well-known/jwks.json`))
  }
  return jwks
}

/**
 * Vérifie un access token Auth0 (RS256) pour l’API configurée (`AUTH0_AUDIENCE`).
 * Permissions : claim RBAC `permissions` ou `${namespace}/permissions` (Action).
 * Profil / IAM : claims namespaced (voir `auth0/actions/post-login-hd-corporate-iam.js`).
 */
export async function verifyAuth0AccessToken(token: string): Promise<AuthContext | null> {
  const domain = process.env.AUTH0_DOMAIN?.trim()
  const audience = process.env.AUTH0_AUDIENCE?.trim()
  if (!domain || !audience) {
    return null
  }

  const issuerOverride = process.env.AUTH0_ISSUER?.trim()
  const issuer = issuerOverride ?? `https://${domain}/`
  const claimNs = process.env.AUTH0_CLAIM_NAMESPACE?.trim() ?? 'https://hd-corporate.com'

  const clockTolerance = Number(process.env.AUTH0_CLOCK_TOLERANCE_SECONDS ?? '30')

  try {
    const { payload } = await jwtVerify(token, getJwks(domain), {
      issuer,
      audience,
      clockTolerance: Number.isFinite(clockTolerance) ? clockTolerance : 30,
    })

    const sub = readStringClaim(payload, 'sub')
    if (!sub) return null

    const email =
      readStringClaim(payload, hdAuth0ClaimKey(claimNs, 'email')) ?? readStringClaim(payload, 'email')

    const emailVerified =
      readBooleanClaim(payload, hdAuth0ClaimKey(claimNs, 'email_verified')) ??
      (payload.email_verified === true ? true : undefined)

    return {
      sub,
      email,
      emailVerified,
      permissions: readPermissions(payload, claimNs),
      roles: readRoles(payload, claimNs),
      givenName: readStringClaim(payload, hdAuth0ClaimKey(claimNs, 'given_name')),
      familyName: readStringClaim(payload, hdAuth0ClaimKey(claimNs, 'family_name')),
      fullName: readStringClaim(payload, hdAuth0ClaimKey(claimNs, 'full_name')),
      nickname: readStringClaim(payload, hdAuth0ClaimKey(claimNs, 'nickname')),
      photoUrl: readStringClaim(payload, hdAuth0ClaimKey(claimNs, 'photo_url')),
      locale: readStringClaim(payload, hdAuth0ClaimKey(claimNs, 'locale')),
      jobTitle: readStringClaim(payload, hdAuth0ClaimKey(claimNs, 'job_title')),
      department: readStringClaim(payload, hdAuth0ClaimKey(claimNs, 'department')),
      orgUnit: readStringClaim(payload, hdAuth0ClaimKey(claimNs, 'org_unit')),
      appMetadata: readAppMetadataJson(payload, claimNs),
    }
  } catch {
    return null
  }
}
