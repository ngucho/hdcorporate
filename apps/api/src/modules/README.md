# Modules API (composition horizontale)

Chaque **domaine métier** vit dans son propre dossier avec un routeur Hono (`create*Router()`). La **gateway publique** (`public-gateway.ts`) ne fait qu’assembler ces routeurs sous `/api` sans logique métier.

## Ajouter un nouveau service HTTP

1. Créer `src/modules/<domaine>/routes.ts` exportant `create<Domaine>Router(): Hono`.
2. Enregistrer le montage dans `public-gateway.ts` : `api.route('/<chemin>', create<Domaine>Router())`.
3. Réutiliser `src/core/middleware/` (CORS déjà global sur la gateway ; rate limit via `rateLimitPublicForm` sur les POST sensibles).

Les intégrations **webhooks** passent par `webhooks/hub.ts` (pas de CORS, secrets isolés).

## API interne (`/internal`)

- Montée dans `app.ts` via `internal-gateway.ts` : JWT Auth0 (`requireBearerAuth`) + RBAC par permissions (`core/middleware/require-permissions.ts`).
- Permissions et slugs de rôles documentés : `docs/security/auth0-rbac.md` ; constantes partagées : `@hd-corporate/contracts` (`HD_PERMISSIONS`, `HD_ROLE_SLUGS`).

## Logging

- Contexte requête : `core/middleware/request-context.ts` (`x-request-id`, logger enfant Pino).
- Ligne HTTP : `request-logging.ts` (statut, durée). Erreurs non gérées : `app.onError`.

## Évolution vers plusieurs processus / instances

- Aujourd’hui : **monolithe modulaire** stateless (Redis/Postgres externes) → réplication horizontale derrière un load balancer sans changer cette structure.
- Demain : extraire un module en microservice = déplacer son `create*Router` + `lib` associé vers un autre dépôt, garder le même contrat HTTP sous le même path ou via reverse proxy.
