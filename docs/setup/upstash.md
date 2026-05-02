# Upstash (Redis)

Le cache et le rate limiting côté **API HTTP publique** utilisent **Upstash Redis** via l’API REST (adapté au serverless, pas de connexion TCP persistante obligatoire dans le worker).

## Portée dans le code

- **Consommé par** : [`apps/api`](../../apps/api) uniquement (via le package [`@hd-corporate/cache`](../../packages/cache) ou équivalent importé par les routes).
- **Non utilisé par** : `apps/marketing` (pas de variables `UPSTASH_*` sur le site marketing).

Si les variables sont absentes, les fonctionnalités qui en dépendent (limitation de débit, cache) sont en général **désactivées** sans faire échouer le build.

## 1. Créer une base Redis

1. Compte sur [https://upstash.com](https://upstash.com).
2. **Create database** : région proche de vos utilisateurs ou de Vercel (ex. `eu-west-1`).
3. Type **Regional** suffit pour commencer.

## 2. Récupérer les credentials REST

1. Ouvrir la base créée → onglet **REST API** (ou **Details**).
2. Copier :
   - **UPSTASH_REDIS_REST_URL** — URL `https://...upstash.io`
   - **UPSTASH_REDIS_REST_TOKEN** — token Bearer

## 3. Renseigner l’environnement

Fichier local : `apps/api/.env.local`

```env
UPSTASH_REDIS_REST_URL=https://xxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxxxxx
```

Sur **Vercel** (projet dont la racine est `apps/api`) : **Settings** → **Environment Variables** → ajouter les deux clés pour Production / Preview selon votre politique.

## 4. Vérification

- Redémarrer `pnpm dev` pour l’API (port **3002**).
- Tester une route qui applique le rate limit (ex. soumissions contact / booking) : après plusieurs requêtes rapides, vous devriez voir un comportement de limitation si le code l’active.

## Bonnes pratiques

- Ne pas réutiliser la même base Redis pour la prod et les previews si vous voulez isoler les quotas ; ou utilisez des bases distinctes par environnement.
- Les tokens ont accès complet à la base : traitez-les comme des secrets (Vercel **Encrypted**, jamais dans Git).
