# Matrice des variables d’environnement

Légende : **O** = obligatoire en prod pour le comportement attendu, **R** = recommandé, **Opt** = optionnel.

| Variable | Marketing | API | Backoffice | Doc |
|----------|-----------|-----|------------|-----|
| `NEXT_PUBLIC_API_URL` | **O** (URL publique de l’API, sans `/` final) | — | — | [vercel.md](vercel.md) |
| `DATABASE_URL` | **O** (SSR, ex. services) | **O** | **O** | [supabase.md](supabase.md) |
| `DIRECT_URL` | Opt (migrations depuis cette app ; rare) | Opt | Opt | [supabase.md](supabase.md) |
| `UPSTASH_REDIS_REST_URL` | — | **R** | — | [upstash.md](upstash.md) |
| `UPSTASH_REDIS_REST_TOKEN` | — | **R** | — | [upstash.md](upstash.md) |
| `API_ALLOWED_ORIGINS` | — | **R** (CORS navigateur) | — | [vercel.md](vercel.md) |
| `AUTH0_DOMAIN` | — | — | **O** | [auth0.md](auth0.md) |
| `AUTH0_CLIENT_ID` | — | — | **O** | [auth0.md](auth0.md) |
| `AUTH0_CLIENT_SECRET` | — | — | **O** | [auth0.md](auth0.md) |
| `AUTH0_SECRET` | — | — | **O** | [auth0.md](auth0.md) |
| `APP_BASE_URL` | — | — | **O** (URL canonique insite) | [auth0.md](auth0.md) |
| `BACKOFFICE_ALLOWED_EMAILS` | — | — | **R** en prod (liste emails) | [auth0.md](auth0.md) |

En développement local, sans Upstash, l’API fonctionne mais sans rate limit / cache Redis documentés dans le code.
