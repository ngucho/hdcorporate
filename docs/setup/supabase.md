# Supabase (PostgreSQL)

HD Corporate utilise **Postgres hébergé sur Supabase** avec **Drizzle ORM** dans le package [`@hd-corporate/db`](../../packages/db). Les applications Next.js se connectent en **serverless** : privilégiez le **pooler** en mode transaction.

## 1. Créer un projet

1. Aller sur [https://supabase.com](https://supabase.com) et créer un compte / une organisation.
2. **New project** : choisir la région (ex. `eu-central-1` pour l’Europe), mot de passe base de données fort, nom du projet.
3. Attendre la fin du provisioning.

## 2. Récupérer `DATABASE_URL` (pooler, recommandé pour Vercel / Next)

1. Dashboard Supabase → **Project Settings** (icône engrenage) → **Database**.
2. Section **Connection string** : choisir **URI** et l’onglet **Transaction pooler** (souvent port **6543**, hôte `*.pooler.supabase.com`).
3. Remplacer `[YOUR-PASSWORD]` par le mot de passe défini à la création du projet.
4. Pour Drizzle / `postgres.js` en serverless, une chaîne typique ressemble à :

   `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true`

   Les libellés exacts (hôte, utilisateur `postgres.xxx`) sont affichés dans l’UI Supabase : copiez-les tels quels.

5. Collez cette valeur dans :

   - `apps/marketing/.env.local` → `DATABASE_URL`
   - `apps/api/.env.local` → `DATABASE_URL`
   - `apps/backoffice/.env.local` → `DATABASE_URL`
   - Et dans Vercel pour chaque projet concerné (même valeur si une seule base).

## 3. `DIRECT_URL` et `pnpm db:migrate`

`drizzle-kit` s’exécute **hors** de Next.js : il ne charge **pas** automatiquement un seul fichier magique. Le projet charge explicitement les fichiers suivants s’ils existent (le dernier trouvé gagne pour une même clé) :

1. `.env` à la racine du monorepo  
2. `.env.local` à la racine  
3. `packages/db/.env` voir [`packages/db/.env.example`](../../packages/db/.env.example)  
4. `apps/marketing/.env.local`  
5. `apps/api/.env.local`  
6. `apps/backoffice/.env.local`  

Les fichiers **existants** sont chargés dans cet ordre ; pour une même variable, **chaque étape remplace la précédente** (comme pour un `.env` puis `.env.local` classique). Donc si `DATABASE_URL` est seulement dans `apps/marketing/.env.local`, **`pnpm db:migrate` fonctionne** sans dupliquer la chaîne ailleurs.

`drizzle-kit` peut préférer une connexion **directe** (port **5432**, hôte `db.[PROJECT-REF].supabase.co`) pour les migrations :

1. **Project Settings** → **Database** → chaîne **Session mode** ou **Direct connection**.
2. Définissez `DIRECT_URL` dans l’un des fichiers ci-dessus (recommandé pour Supabase + PgBouncer). Sinon le pooler `DATABASE_URL` est utilisé.

Alternative sans fichier : exporter dans le shell puis lancer la commande :

```powershell
$env:DATABASE_URL="postgresql://..."
$env:DIRECT_URL="postgresql://..."
pnpm db:migrate
```

La config Drizzle est dans [`packages/db/drizzle.config.ts`](../../packages/db/drizzle.config.ts) : elle utilise `DIRECT_URL` si défini, sinon `DATABASE_URL`. Si aucune URL n’est trouvée, un message d’erreur indique où définir les variables.

## 4. Schéma et migrations

- Schéma : [`packages/db/src/schema.ts`](../../packages/db/src/schema.ts).
- Migrations générées : dossier [`packages/db/drizzle/`](../../packages/db/drizzle/).
- Commandes racine : `pnpm db:generate`, `pnpm db:migrate`, `pnpm db:studio`.

## 5. Données initiales (offres / services)

Après migration, vous pouvez charger les services publiés via le seed SQL :

- Fichier : [`packages/db/seed/services.sql`](../../packages/db/seed/services.sql)  
- Exécution : **SQL Editor** dans le dashboard Supabase, ou `psql` avec la `DIRECT_URL`.

## Dépannage

- **Too many connections** : vérifiez d’utiliser le **pooler** (`6543`) sur Vercel, pas la connexion directe seule.
- **SSL** : les chaînes Supabase incluent en général ce qu’il faut ; en local, gardez la chaîne copiée depuis le dashboard sans la modifier.
