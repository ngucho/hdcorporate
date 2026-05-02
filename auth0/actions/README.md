# Auth0 Actions — IAM HD Corporate

Scripts à coller dans **Auth0 Dashboard → Actions → Library → Build Custom** puis à attacher au flux **Login / Post Login**.

## Action unique recommandée : `post-login-hd-corporate-iam.js`

1. Créer une action **Post-login** (runtime **Node 22** si proposé, sinon **Node 18**).
2. Copier le contenu de `post-login-hd-corporate-iam.js`.
3. **Secrets** (Settings de l’action, onglet *Secrets*) :
   - `CLAIM_NAMESPACE` (optionnel) — ex. `https://hd-corporate.com` (**sans** slash final), aligné sur `AUTH0_CLAIM_NAMESPACE` côté API.
   - `AUTH0_DOMAIN` — ex. `dev-xxx.eu.auth0.com` (sans `https://`), requis pour la synchro Management.
   - `M2M_CLIENT_ID` / `M2M_CLIENT_SECRET` — application **Machine to Machine** avec l’API **Auth0 Management** autorisée et scopes **`read:users`**, **`update:users`** (minimal).
4. **Flow** : *Authentication → Actions → Login* → glisser l’action **après** l’étape d’identification (souvent après *Complete* ou selon votre flux).

Sans secrets M2M, l’action enrichit quand même les **tokens** à partir du profil courant (`event.user`) ; la mise à jour persistante d’`app_metadata` est ignorée.

## Namespace des claims

Aligné sur `AUTH0_CLAIM_NAMESPACE` côté API (ex. `https://hd-corporate.com`, **sans** slash final).

Les claims ajoutés sur **access token** et **ID token** sont listés dans `packages/contracts/src/auth0-claims.ts`.

## Sécurité

- Ne jamais mettre de secrets en dur dans le script : utiliser les **Secrets** Auth0 Actions uniquement.
- L’M2M utilisé ici doit être **dédié** (scopes minimaux `update:users` + `read:users` sur la tenant).
- Les valeurs copiées dans les tokens restent des **données non sensibles** côté métier ; secrets métier hors JWT.
