# Configuration des services (HD Corporate)

Ce dossier décrit **où** obtenir chaque secret ou URL dans les dashboards fournisseurs, **comment** les brancher au monorepo, et **comment** remplir les fichiers `.env`.

## Ordre d’onboarding recommandé

1. **[Supabase](supabase.md)** créer le projet Postgres, récupérer `DATABASE_URL` (pooler) et éventuellement `DIRECT_URL`.
2. **Migrations** depuis la racine : `pnpm db:migrate`. Les URLs peuvent être dans `apps/*/env.local` ou à la racine voir [supabase.md](supabase.md) (chargement explicite par `packages/db/drizzle.config.ts`).
3. **Seed** exécuter le SQL des offres si besoin : [../../packages/db/seed/services.sql](../../packages/db/seed/services.sql).
4. **[Upstash](upstash.md)** créer la base Redis REST pour **`apps/api`** uniquement (optionnel mais recommandé en prod).
5. **CORS** définir `API_ALLOWED_ORIGINS` sur le projet API pour autoriser `www` + apex + previews si besoin.
6. **[Vercel](vercel.md)** trois projets (marketing, api, backoffice), variables par environnement.
7. **[Auth0](auth0.md)** application Regular Web pour le backoffice `insite`.
8. **Local** copier les `.env.example` vers `.env.local` dans chaque app ; lancer `pnpm dev` (ports par défaut **3000** marketing, **3001** backoffice, **3002** API).

## Index des guides

| Document | Sujet |
|----------|--------|
| [env-matrix.md](env-matrix.md) | Tableau variable × application |
| [supabase.md](supabase.md) | Projet, pooler, migrations Drizzle |
| [upstash.md](upstash.md) | Redis REST pour l’API |
| [auth0.md](auth0.md) | Connexion backoffice |
| [vercel.md](vercel.md) | Déploiement et variables Vercel |

## Fichiers `.env` d’exemple dans le repo

- [../../apps/marketing/.env.example](../../apps/marketing/.env.example)
- [../../apps/api/.env.example](../../apps/api/.env.example)
- [../../apps/backoffice/.env.example](../../apps/backoffice/.env.example)

Les valeurs sensibles ne doivent **jamais** être commitées : utilisez `.env.local` (gitignoré) ou les secrets Vercel.

## Vérification locale rapide (`pnpm dev`)

À la racine : `pnpm dev` démarre en parallèle les trois apps. Pour que le site appelle l’API locale, dans `apps/marketing/.env.local` :

`NEXT_PUBLIC_API_URL=http://localhost:3002`

Puis ouvrir `http://localhost:3000` et tester contact / réservation / chargement des services.

### Port déjà utilisé (`EADDRINUSE`)

Si **3001**, **3002** ou **3000** est pris (autre app, ancien `next dev`, etc.), dans le `.env.local` concerné :

| Variable | App | Effet |
|----------|-----|--------|
| `BACKOFFICE_DEV_PORT` | backoffice | Port d’écoute du `next dev` (ex. `3011`). Ajustez aussi **`APP_BASE_URL`** (ex. `http://localhost:3011`) et les URLs **Auth0** callback / logout pour ce port en local. |
| `API_DEV_PORT` | api | Port de l’API. Ajustez **`NEXT_PUBLIC_API_URL`** côté marketing et, si besoin, **`API_ALLOWED_ORIGINS`**. |
| `MARKETING_DEV_PORT` | marketing | Port du site marketing. |

Le script [`scripts/run-next-dev.mjs`](../../scripts/run-next-dev.mjs) lit ces clés dans chaque `apps/<app>/.env.local` avant de lancer Next.

Réservation **Cal.com** (embed + webhooks + variables) : voir [calcom.md](./calcom.md).

Sur Windows, vous pouvez aussi libérer le port : `Get-NetTCPConnection -LocalPort 3001` puis arrêter le processus concerné.

### Marketing : Turbopack / Webpack

Sous **Windows**, `next dev` avec **Turbopack** peut planter sur `app/globals.css` (erreur PostCSS / flux interrompu). Le script [`scripts/run-next-dev.mjs`](../../scripts/run-next-dev.mjs) lance le marketing avec **`--webpack`** par défaut.

Pour réessayer **Turbopack** : définir `MARKETING_TURBOPACK=1` dans l’environnement ou dans `apps/marketing/.env.local`, puis `pnpm dev`.

### Backoffice : `proxy.ts` (Next 16)

L’auth Auth0 passe par [`apps/backoffice/proxy.ts`](../../apps/backoffice/proxy.ts) (convention **proxy** à la place de l’ancien `middleware.ts`). Voir [documentation Next.js middleware to proxy](https://nextjs.org/docs/messages/middleware-to-proxy).

## Stratégie commerciale (bootstrap)

Cadre positionnement / budget / IA : [../strategy/bootstrap-customers.md](../strategy/bootstrap-customers.md).
