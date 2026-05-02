/**
 * Run `next dev` for marketing/backoffice, or **Hono** dev for `api` (forwards to run-api-dev.mjs).
 * Defaults: marketing 3000, backoffice 3001, api 3002.
 *
 * Override via env or apps/<app>/.env.local:
 *   MARKETING_DEV_PORT, BACKOFFICE_DEV_PORT, API_DEV_PORT
 *
 * Marketing dev uses **Webpack** by default (Turbopack + PostCSS/Tailwind v4 peut
 * planter sur Windows avec `globals.css`). Forcer Turbopack : MARKETING_TURBOPACK=1
 *
 * If the default port is busy and you did not set *_DEV_PORT, the first free port
 * in a small range is used and a warning is printed (update Auth0 / APP_BASE_URL / NEXT_PUBLIC_API_URL as needed).
 */
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { NEXT_DEV_APP_CONFIG } from './dev/next-dev-app-config.mjs'
import { loadDevPortsFromEnvLocal } from './dev/load-dev-ports-from-env-local.mjs'
import { resolveNextDevPort } from './dev/resolve-next-dev-port.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')

const app = process.argv[2]
if (app === 'api') {
  const apiChild = spawn('node', [path.join(__dirname, 'run-api-dev.mjs')], {
    stdio: 'inherit',
    env: process.env,
  })
  apiChild.on('exit', (code, signal) => {
    if (signal) process.kill(process.pid, signal)
    process.exit(code ?? 0)
  })
} else {
  const cfg = NEXT_DEV_APP_CONFIG[app]
  if (!cfg) {
    console.error('Usage: node scripts/run-next-dev.mjs <marketing|backoffice|api>')
    process.exit(1)
  }

  const cwd = path.join(repoRoot, 'apps', cfg.dir)

  loadDevPortsFromEnvLocal(cwd)

  const port = await resolveNextDevPort(cfg, app)

  const nextArgs = ['dev', '--port', port]
  if (app === 'marketing' && process.env.MARKETING_TURBOPACK !== '1') {
    nextArgs.push('--webpack')
  }

  const child = spawn('pnpm', ['exec', 'next', ...nextArgs], {
    cwd,
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, [cfg.envKey]: port },
  })

  child.on('exit', (code, signal) => {
    if (signal) process.kill(process.pid, signal)
    process.exit(code ?? 0)
  })
}
