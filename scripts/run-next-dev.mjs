/**
 * Run `next dev` from an app directory with a configurable port (Windows/macOS/Linux).
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
import fs from 'node:fs'
import net from 'node:net'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')

const CONFIG = {
  marketing: { dir: 'marketing', envKey: 'MARKETING_DEV_PORT', defaultPort: '3000' },
  backoffice: { dir: 'backoffice', envKey: 'BACKOFFICE_DEV_PORT', defaultPort: '3001' },
  api: { dir: 'api', envKey: 'API_DEV_PORT', defaultPort: '3002' },
}

const app = process.argv[2]
const cfg = CONFIG[app]
if (!cfg) {
  console.error('Usage: node scripts/run-next-dev.mjs <marketing|backoffice|api>')
  process.exit(1)
}

const cwd = path.join(repoRoot, 'apps', cfg.dir)

/** Pick *_DEV_PORT from .env.local if not already set in the environment. */
function loadDevPortsFromEnvLocal() {
  const envPath = path.join(cwd, '.env.local')
  if (!fs.existsSync(envPath)) return
  const re =
    /^(MARKETING_DEV_PORT|BACKOFFICE_DEV_PORT|API_DEV_PORT)\s*=\s*(.*)$/
  const text = fs.readFileSync(envPath, 'utf8')
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const m = trimmed.match(re)
    if (!m) continue
    const key = m[1]
    let val = m[2].trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (process.env[key] === undefined) process.env[key] = val
  }
}

function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer()
    server.once('error', () => resolve(false))
    server.listen(port, () => {
      server.close(() => resolve(true))
    })
  })
}

/** Alternate ports step by 10 so parallel `turbo dev` (3000/3001/3002) rarely steals a sibling’s fallback. */
function* portCandidates(start) {
  yield start
  for (let k = 1; k < 20; k++) {
    yield start + k * 10
  }
}

async function resolvePort() {
  const explicit = process.env[cfg.envKey]
  if (explicit) return String(explicit)

  const start = Number.parseInt(cfg.defaultPort, 10)
  if (!Number.isFinite(start)) return cfg.defaultPort

  for (const p of portCandidates(start)) {
    if (await isPortFree(p)) {
      if (p !== start) {
        const url = `http://localhost:${p}`
        let extra = ''
        if (app === 'backoffice') {
          extra = `Set APP_BASE_URL=${url} and Auth0 callback/logout/web origins to ${url}/auth/callback etc., or set BACKOFFICE_DEV_PORT=${p} in apps/backoffice/.env.local.`
        } else if (app === 'api') {
          extra = `Set apps/marketing/.env.local NEXT_PUBLIC_API_URL=${url} (and API_ALLOWED_ORIGINS if needed), or set API_DEV_PORT=${p} in apps/api/.env.local.`
        } else {
          extra = `Open ${url} in the browser, or set MARKETING_DEV_PORT=${p} in apps/marketing/.env.local.`
        }
        console.warn(
          `\n[hd-corporate] Port ${start} in use → dev server for "${app}" using **${p}**.\n${extra}\n`,
        )
      }
      return String(p)
    }
  }

  throw new Error(
    `[hd-corporate] No free port in fallback sequence for "${app}" (from ${start}). Set ${cfg.envKey} in apps/${cfg.dir}/.env.local or free a port.`,
  )
}

loadDevPortsFromEnvLocal()

const port = await resolvePort()

const nextArgs = ['dev', '--port', port]
// Next 16 Turbopack + PostCSS/Tailwind v4 peut planter sur marketing globals.css (Windows).
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
