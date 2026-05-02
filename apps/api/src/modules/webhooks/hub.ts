import { Hono } from 'hono'
import type { AppEnv } from '../../core/hono-env.js'
import { createCalcomWebhookRouter } from './calcom/routes.js'

/**
 * Point d’entrée des webhooks (`/api/webhooks/*`).
 * Ajouter un fournisseur = nouvelle `route('/stripe', …)` sans toucher au gateway public.
 */
export function createWebhooksHub(): Hono<AppEnv> {
  const r = new Hono<AppEnv>()
  r.route('/calcom', createCalcomWebhookRouter())
  return r
}
