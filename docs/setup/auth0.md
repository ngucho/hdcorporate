# Auth0 (backoffice `insite`)

Le backoffice [`apps/backoffice`](../../apps/backoffice) utilise **`@auth0/nextjs-auth0`** avec une application Auth0 de type **Regular Web Application** (flux navigateur + cookies de session).

Les routes **`/signin`** et **`/signup`** affichent un écran interne (logo, rappel juridique) **avant** la redirection vers Auth0 (`/auth/login` et `/auth/login?screen_hint=signup`). Aucun rôle backoffice n’est accordé automatiquement : après Auth0, l’accès reste conditionné par `BACKOFFICE_ALLOWED_EMAILS` (sinon redirection vers `/forbidden`).

## 1. Créer une application Auth0

1. Dashboard [https://manage.auth0.com](https://manage.auth0.com) → **Applications** → **Create Application**.
2. Nom : ex. `HD Corporate Backoffice`.
3. Type : **Regular Web Applications** → Create.

## 2. URLs à configurer dans Auth0

Remplacez par vos domaines réels (`insite.hdcorporate.com`, etc.).

| Paramètre Auth0 | Valeur production | Valeur locale (dev) |
|-----------------|-------------------|---------------------|
| **Allowed Callback URLs** | `https://insite.hdcorporate.com/auth/callback` | `http://localhost:3001/auth/callback` |
| **Allowed Logout URLs** | `https://insite.hdcorporate.com` | `http://localhost:3001` |
| **Allowed Web Origins** | `https://insite.hdcorporate.com` | `http://localhost:3001` |

Pour les **previews Vercel** (`*.vercel.app`), ajoutez une entrée par preview ou un pattern si votre plan Auth0 le permet, sinon testez le backoffice en local ou sur un domaine fixe de staging.

Si vous utilisez **`BACKOFFICE_DEV_PORT`** (port autre que 3001, voir [README.md](README.md)), les URLs locales Auth0 et **`APP_BASE_URL`** doivent utiliser **le même port** (ex. `http://localhost:3011`).

**Application Login URI** (optionnel) : `https://insite.hdcorporate.com` ou la route de login exposée par le SDK.

Sauvegardez les changements dans Auth0.

## 3. Variables d’environnement (`apps/backoffice`)

| Variable | Où la trouver |
|----------|----------------|
| `AUTH0_DOMAIN` | **Settings** de l’application → **Domain** (ex. `dev-xxx.eu.auth0.com`) |
| `AUTH0_CLIENT_ID` | **Settings** → **Client ID** |
| `AUTH0_CLIENT_SECRET` | **Settings** → **Client Secret** (Révéler / copier) |
| `AUTH0_SECRET` | **Secret de session** : chaîne longue aléatoire (32+ caractères). Générez avec `openssl rand -hex 32` ou un gestionnaire de mots de passe. **Ne pas** réutiliser le Client Secret. |
| `APP_BASE_URL` | URL canonique du backoffice sans slash final : prod `https://insite.hdcorporate.com`, local `http://localhost:3001`. |
| `BACKOFFICE_ALLOWED_EMAILS` | Liste d’emails autorisés, **séparés par des virgules**. Si **vide**, tout utilisateur Auth0 authentifié peut accéder (acceptable en dev seulement). En production, renseignez au minimum votre email. |

Exemple `.env.local` :

```env
AUTH0_DOMAIN=dev-xxxx.eu.auth0.com
AUTH0_CLIENT_ID=xxxxxxxx
AUTH0_CLIENT_SECRET=xxxxxxxx
AUTH0_SECRET=xxxxxxxxlongrandomhexxxxxxxxx
APP_BASE_URL=http://localhost:3001
BACKOFFICE_ALLOWED_EMAILS=you@company.com
```

## 4. Vercel

Sur le projet Vercel dont la racine est `apps/backoffice`, ajoutez les mêmes clés pour **Production** (et Preview si vous testez avec Auth0).

`APP_BASE_URL` en preview peut être l’URL `https://xxx.vercel.app` **si** vous avez ajouté cette URL dans les champs Auth0 ci-dessus.

## 5. Base de données

Le backoffice lit aussi **`DATABASE_URL`** (Supabase) pour les pages et actions serveur voir [supabase.md](supabase.md).

## Dépannage

- **Callback URL mismatch** : aligner exactement l’URL dans Auth0 (schéma `https`, pas de slash en trop, bon port en local **3001**).
- **AUTH0_SECRET** manquant : erreurs au runtime / build ; générez une valeur dédiée.
- Avertissements **Missing: domain / clientId** pendant `next build` sans `.env` : normal en CI sans secrets ; le build peut quand même réussir selon la version du SDK fournissez les variables sur Vercel pour la prod.
