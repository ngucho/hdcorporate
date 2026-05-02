# Auth0 — RBAC, rôles et API interne

Ce document décrit la configuration Auth0 alignée sur le code (`@hd-corporate/contracts` : `HD_PERMISSIONS`, `HD_ROLE_SLUGS`) et l’API Hono (`/internal/v1/*`).

## 1. Resource Server (API)

1. Auth0 Dashboard → **Applications** → **APIs** → **Create API**.
2. **Identifier** = valeur de `AUTH0_AUDIENCE` (ex. `https://api.hdcorporate.com`).
3. Activer **Enable RBAC** et **Add Permissions in the Access Token**.

Créer chaque permission listée dans `packages/contracts/src/rbac.ts` (onglet **Permissions** de l’API), avec les mêmes chaînes exactes (ex. `clients:read`, `users:invite`).

## 2. Rôles métier (scalables à une équipe)

Les slugs ci-dessous sont des **noms de rôles Auth0** ; l’API ne contrôle que les **permissions** présentes sur l’access token.

| Rôle | Usage |
|------|--------|
| **super_admin** | Fondateurs / propriétaires : tout accorder en phase bootstrap ; à restreindre ensuite si besoin. |
| **admin** | Administration quotidienne : utilisateurs, paramètres, facturation. Seul profil qui doit pouvoir **inviter** de nouveaux comptes « inside » (via Management API côté backoffice). |
| **operations** | Opérations : dossiers clients, rendez-vous, traitement des demandes. |
| **legal_counsel** | Profil juridique : mêmes périmètres métier qu’operations avec focus livrables / relecture (même matrice de permissions ou affinée plus tard). |
| **finance** | Facturation, paiements, exports comptables (lecture ou écriture selon permissions). |
| **support** | Support client : lecture large, peu ou pas d’écriture sensible. |
| **read_only** | Audit, associé, reporting : lecture seule. |

### Matrice recommandée (à ajuster dans Auth0)

- **super_admin** / **admin** : toutes les permissions (ou admin sans `settings:write` / `webhooks:write` si vous voulez séparer).
- **operations** : `internal:use`, `clients:read`, `clients:write`, `bookings:read`, `bookings:write`, `leads:read`, `leads:write`, `documents:read`, `documents:write`.
- **legal_counsel** : comme operations + éventuellement `bookings:admin`, `clients:delete` selon gouvernance.
- **finance** : `internal:use`, `clients:read`, `billing:read`, `billing:write`, `documents:read`.
- **support** : `internal:use`, `clients:read`, `bookings:read`, `leads:read`, `documents:read`.
- **read_only** : `internal:use`, `audit:read`, `clients:read`, `bookings:read`, `leads:read`, `billing:read`, `documents:read`.

**Invitation utilisateurs** : accorder `users:invite` uniquement aux rôles **admin** (et éventuellement **super_admin**). L’inscription / invitation se fait via **Auth0 Management API** (machine-to-machine + scope `create:users`, `update:users`, etc.) depuis une **Server Action** ou route **backoffice** qui vérifie la session + permission.

## 3. Claims sur l’access token

- **Permissions** : fourni par Auth0 lorsque RBAC + « Add Permissions in the Access Token » sont activés (claim `permissions` : tableau de chaînes).
- **Rôles** (optionnel, pour l’UI backoffice) : Auth0 ne met pas les rôles dans l’access token par défaut. Ajouter une **Action** (login / credentials) qui copie les rôles dans un claim namespaced, par ex. `https://hd-corporate.com/roles`, et définir `AUTH0_CLAIM_NAMESPACE` côté API à la même URL de namespace (sans suffixe `/roles` dans la variable : le code ajoute `/roles`).

## 4. Variables d’environnement (API)

Voir `apps/api/.env.example` : `AUTH0_DOMAIN`, `AUTH0_AUDIENCE`, optionnel `AUTH0_ISSUER`, `AUTH0_CLAIM_NAMESPACE`, `AUTH0_CLOCK_TOLERANCE_SECONDS`.

## 5. Application SPA / backoffice

- **Application** type SPA ou Regular Web (Next.js) : audience = même `AUTH0_AUDIENCE`, scopes `openid profile email` + **API permissions** demandées pour le flux qui appelle l’API.
- Pour les appels **serveur à serveur** (cron, workers), utiliser une **M2M** avec permissions dédiées (ne pas réutiliser le token utilisateur).

## 6. Routes API internes

- `GET /internal/health` — santé, sans JWT.
- `GET /internal/v1/me` — Bearer obligatoire ; renvoie `sub`, `permissions`, `roles` (diagnostic).

Les routes métier à venir (`/internal/v1/clients`, …) doivent enchaîner `requireBearerAuth` puis `requireAllPermissions(...)` ou `requireAnyPermission(...)` depuis `apps/api/src/core/middleware/require-permissions.ts`.

## 7. Actions Post Login (IAM : email, permissions, profil, `app_metadata`)

Scripts versionnés dans le dépôt :

- `auth0/actions/post-login-hd-corporate-iam.js` — enrichit **access token** et **ID token** avec des claims namespaced (`email`, `given_name`, `family_name`, `photo_url`, `roles`, `permissions`, `app_metadata` JSON, champs métier optionnels `job_title`, `department`, `org_unit`, etc.) et tente une **mise à jour** d’`app_metadata` via **Management API** (secrets M2M).

Installation : voir `auth0/actions/README.md`.

Constantes de clés partagées : `packages/contracts/src/auth0-claims.ts` (`HD_AUTH0_CLAIM_NAMESPACE`, `hdAuth0ClaimKey`, …). L’API lit ces claims dans `verify-access-token.ts` et les expose sur `GET /internal/v1/me`.
