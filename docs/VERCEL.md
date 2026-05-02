# Déploiement Vercel (HD Corporate)

Monorepo **Turborepo** : site public, API HTTP publique, backoffice interne, packages partagés (`db`, `cache`, `contracts`, **Fondatis**).

**Guides détaillés fournisseurs** (Supabase, Upstash, Auth0, matrice `.env`, onboarding) : [docs/setup/README.md](setup/README.md).

## Domaines recommandés

| Rôle | Domaine (exemple) | Projet Vercel `Root Directory` |
|------|-------------------|--------------------------------|
| Site marketing | `https://www.hdcorporate.com` | `apps/marketing` |
| API publique | `https://api.hdcorporate.com` | `apps/api` |
| Backoffice | `https://insite.hdcorporate.com` | `apps/backoffice` |

Trois **projets Vercel** distincts, même dépôt Git, racines différentes.

Le front marketing appelle l’API via **`NEXT_PUBLIC_API_URL`** (origine uniquement, sans `/api` final), ex. `https://api.hdcorporate.com`. Les chemins restent `/api/...` côté client (`/api/services`, etc.).

## Build & install

- **Install** : `pnpm install` (racine).
- **Build** (exemple ciblé) :  
  `pnpm exec turbo build --filter=@hd-corporate/marketing`  
  `pnpm exec turbo build --filter=@hd-corporate/api`  
  `pnpm exec turbo build --filter=@hd-corporate/backoffice`
- **Design system / Storybook** : `pnpm storybook` (package `@fondatis/design-system`).

## Variables d’environnement

### Postgres (`DATABASE_URL`)

| App | Usage |
|-----|--------|
| `apps/marketing` | SSR (ex. liste des services sur la page d’accueil). |
| `apps/api` | Routes `/api/*` (bookings, leads, contact, services). |
| `apps/backoffice` | Dashboard, clients, actions serveur. |

`DIRECT_URL` (optionnel) : connexion directe pour `pnpm db:migrate` depuis votre machine — voir [docs/setup/supabase.md](setup/supabase.md).

### Redis Upstash (uniquement `apps/api`)

| Variable | Usage |
|----------|--------|
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Cache + rate limiting côté API. Si absent, ces protections sont désactivées (l’API reste fonctionnelle). Le marketing **ne** lit pas ces variables. |

### `apps/api` uniquement

| Variable | Usage |
|----------|--------|
| `API_ALLOWED_ORIGINS` | Origines autorisées CORS, séparées par des virgules. Par défaut : `localhost:3000`, `www.hdcorporate.com`, `hdcorporate.com`. **À aligner** avec `https://www.hdcorporate.com` en production. |

### `apps/marketing` uniquement

| Variable | Usage |
|----------|--------|
| `NEXT_PUBLIC_API_URL` | Origine de l’API, ex. `https://api.hdcorporate.com`. En local avec API séparée : `http://localhost:3002`. |
| `DATABASE_URL` | Même base Supabase que l’API (SSR). |

### `apps/backoffice` (Auth0)

| Variable | Description |
|----------|-------------|
| `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`, `AUTH0_SECRET` | Application Auth0 **Regular Web**. |
| `APP_BASE_URL` | URL canonique du backoffice, ex. **`https://insite.hdcorporate.com`**. |
| `BACKOFFICE_ALLOWED_EMAILS` | Emails autorisés (séparés par des virgules). Vide = tout utilisateur Auth0 (déconseillé en prod). |

**Auth0 — URLs à déclarer** (adapter aux domaines réels) :

- Callback : `https://insite.hdcorporate.com/auth/callback` (+ `http://localhost:3001/auth/callback` en local).
- Logout : `https://insite.hdcorporate.com` (+ `http://localhost:3001`).

## Base de données

1. Supabase : URL pooler → `DATABASE_URL`.
2. `pnpm db:migrate` (avec accès DB).
3. Seed offres : [packages/db/seed/services.sql](../packages/db/seed/services.sql).

## Développement local

```bash
pnpm install
pnpm dev
```

Ports par défaut : marketing **3000**, backoffice **3001**, API **3002**.

Pour le marketing avec API locale :

```env
# apps/marketing/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3002
```

Fichiers d’exemple : [apps/marketing/.env.example](../apps/marketing/.env.example), [apps/api/.env.example](../apps/api/.env.example), [apps/backoffice/.env.example](../apps/backoffice/.env.example).

## Fondatis (design system)

Package **`@fondatis/design-system`** : Tailwind 4, primitives type shadcn, icônes **Tabler**, CSS exporté via `@import '@fondatis/design-system/styles'`. Voir [packages/fondatis/README.md](../packages/fondatis/README.md).

## Performances serverless

- **`apps/api`** : runtime Node.js, Postgres + Redis, en-têtes CORS sur les réponses JSON.
- Singleton `postgres` dans `@hd-corporate/db`.

## Stratégie (bootstrap clients, budget limité)

Voir [docs/strategy/bootstrap-customers.md](strategy/bootstrap-customers.md).
