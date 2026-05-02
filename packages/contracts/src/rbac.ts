/**
 * Permissions Auth0 (Resource Server API) — mêmes chaînes que dans le dashboard.
 * Assignées aux rôles dans Auth0 ; incluses dans l’access token si RBAC API activé.
 */
export const HD_PERMISSIONS = [
  /** Accès aux routes internes métier (au-delà de /internal/v1/me de diagnostic). */
  'internal:use',
  /** Inviter / provisionner un utilisateur backoffice (Management API côté serveur). */
  'users:invite',
  'users:read',
  'users:write',
  'users:delete',
  'clients:read',
  'clients:write',
  'clients:delete',
  'bookings:read',
  'bookings:write',
  'bookings:admin',
  'leads:read',
  'leads:write',
  'documents:read',
  'documents:write',
  'billing:read',
  'billing:write',
  'settings:read',
  'settings:write',
  'webhooks:read',
  'webhooks:write',
  'audit:read',
] as const

export type HdPermission = (typeof HD_PERMISSIONS)[number]

/** Slugs de rôles Auth0 (noms alignés dashboard — le token porte surtout `permissions`). */
export const HD_ROLE_SLUGS = [
  'super_admin',
  'admin',
  'operations',
  'legal_counsel',
  'finance',
  'support',
  'read_only',
] as const

export type HdRoleSlug = (typeof HD_ROLE_SLUGS)[number]
