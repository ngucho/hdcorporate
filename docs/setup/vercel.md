# Vercel (déploiement)

Le monorepo est conçu pour **trois projets Vercel** distincts pointant vers le **même dépôt Git**, avec des **Root Directory** différentes.

## Référence principale

La liste des domaines, commandes de build et récapitulatif des variables se trouve dans **[../VERCEL.md](../VERCEL.md)** — gardez ce fichier comme référence unique pour les URLs (`www`, `api`, `insite`) et le tableau des variables.

Ce document résume la procédure **dans l’UI Vercel** et renvoie aux guides fournisseurs pour remplir les valeurs.

## Créer les trois projets

Pour chaque application :

1. Vercel Dashboard → **Add New** → **Project** → importer le repo GitHub/GitLab.
2. **Root Directory** : **Edit** → choisir :
   - `apps/marketing` — site public.
   - `apps/api` — API HTTP.
   - `apps/backoffice` — backoffice Auth0.
3. **Framework Preset** : Next.js (détecté automatiquement en général).
4. **Build Command** : laisser par défaut ou `cd ../.. && pnpm exec turbo build --filter=@hd-corporate/...` si la racine monorepo n’est pas détectée — en pratique Vercel exécute depuis la sous-dossier ; vérifiez que `pnpm install` à la racine est bien invoqué (voir doc Vercel monorepo : **Install Command** `pnpm install` à la racine du repo avec **Root Directory** sur le sous-package).

   Si besoin, à la racine du repo, un `vercel.json` ou les paramètres projet peuvent fixer :

   - **Install Command** : `pnpm install` (depuis la racine du monorepo).
   - **Build Command** : depuis la sous-app, `pnpm run build` ou équivalent turbo.

5. **Output** : Next.js par défaut.

## Variables d’environnement par projet

Copiez les valeurs depuis Supabase / Upstash / Auth0 selon [env-matrix.md](env-matrix.md).

| Projet Vercel (Root) | Variables typiques |
|----------------------|----------------------|
| `apps/marketing` | `NEXT_PUBLIC_API_URL`, `DATABASE_URL` |
| `apps/api` | `DATABASE_URL`, `UPSTASH_*`, `API_ALLOWED_ORIGINS` |
| `apps/backoffice` | `DATABASE_URL`, `AUTH0_*`, `APP_BASE_URL`, `BACKOFFICE_ALLOWED_EMAILS` |

Utilisez **Environment** : Production / Preview / Development et des secrets distincts si nécessaire.

## Domaines personnalisés

Pour chaque projet : **Settings** → **Domains** :

- Marketing : `www.hdcorporate.com` (et redirection apex si souhaité).
- API : `api.hdcorporate.com`.
- Backoffice : `insite.hdcorporate.com`.

Puis mettez à jour **Auth0** (callbacks) et **`API_ALLOWED_ORIGINS`** pour inclure l’URL `https://www...` exacte.

## Après déploiement

- Tester le marketing, puis une route API (`/api/services`) depuis le navigateur (CORS).
- Se connecter au backoffice avec un utilisateur Auth0 dont l’email est dans `BACKOFFICE_ALLOWED_EMAILS`.

Guides détaillés : [supabase.md](supabase.md), [upstash.md](upstash.md), [auth0.md](auth0.md).
