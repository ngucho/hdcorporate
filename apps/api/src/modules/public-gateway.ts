import { Hono } from 'hono'
import type { AppEnv } from '../core/hono-env.js'
import { publicCors } from '../core/middleware/public-cors.js'
import { createCatalogRouter } from './catalog/routes.js'
import { createContactRouter } from './contact/routes.js'
import { createLeadsRouter } from './leads/routes.js'

/**
 * Gateway HTTP public sous `/api` composition horizontale des modules métier.
 *
 * **Ajouter un nouveau service** : créer `src/modules/<domaine>/routes.ts` qui exporte
 * `createXxxRouter(): Hono`, puis l’enregistrer ici avec `api.route('/<prefix>', createXxxRouter())`.
 * La réservation publique passe par **Cal.com** (marketing + webhooks), pas de route `/booking` ici.
 * Les handlers lourds restent dans `lib/` ou dans le module selon la taille du domaine.
 */
export function createPublicApiGateway(): Hono<AppEnv> {
  const api = new Hono<AppEnv>()
  api.use('*', publicCors())
  api.route('/services', createCatalogRouter())
  api.route('/contact', createContactRouter())
  api.route('/leads', createLeadsRouter())
  return api
}
