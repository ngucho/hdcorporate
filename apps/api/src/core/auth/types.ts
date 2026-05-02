/** Contexte d’authentification après validation JWT Auth0 (access token). */
export type AuthContext = {
  sub: string
  email?: string
  emailVerified?: boolean
  permissions: string[]
  /** Rôles (claim namespaced écrit par l’Action Post Login). */
  roles: string[]
  givenName?: string
  familyName?: string
  fullName?: string
  nickname?: string
  photoUrl?: string
  locale?: string
  jobTitle?: string
  department?: string
  orgUnit?: string
  /** Copie JWT du snapshot IAM (JSON parsé depuis le claim namespaced `app_metadata`). */
  appMetadata?: Record<string, unknown>
}
