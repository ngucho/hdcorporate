/**
 * Namespace des claims custom (Post-Login Action).
 * Aligner avec `AUTH0_CLAIM_NAMESPACE` sur l’API et le secret `CLAIM_NAMESPACE` de l’Action Auth0.
 */
export const HD_AUTH0_CLAIM_NAMESPACE = 'https://hd-corporate.com' as const

/** Suffixes de claims après `${namespace}/` (access + ID token). */
export const HD_AUTH0_CLAIM_KEYS = [
  'email',
  'email_verified',
  'given_name',
  'family_name',
  'full_name',
  'nickname',
  'photo_url',
  'locale',
  'job_title',
  'department',
  'org_unit',
  'roles',
  'permissions',
  'app_metadata',
] as const

export type HdAuth0ClaimKey = (typeof HD_AUTH0_CLAIM_KEYS)[number]

export function hdAuth0ClaimKey(namespace: string, key: HdAuth0ClaimKey): string {
  const ns = namespace.replace(/\/$/, '')
  return `${ns}/${key}`
}
