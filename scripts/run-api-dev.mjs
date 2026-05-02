/**
 * Run the standalone Hono API with the same port resolution as former Next dev
 * (API_DEV_PORT / apps/api/.env.local, fallback range from 3002).
 */
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { NEXT_DEV_APP_CONFIG } from './dev/next-dev-app-config.mjs'
import { loadDevPortsFromEnvLocal } from './dev/load-dev-ports-from-env-local.mjs'
import { resolveNextDevPort } from './dev/resolve-next-dev-port.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const cfg = NEXT_DEV_APP_CONFIG.api
const cwd = path.join(repoRoot, 'apps', cfg.dir)

loadDevPortsFromEnvLocal(cwd)
const port = await resolveNextDevPort(cfg, 'api')

const child = spawn('pnpm', ['exec', 'tsx', 'watch', 'src/run-local.ts'], {
  cwd,
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, PORT: port, API_DEV_PORT: port },
})

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal)
  process.exit(code ?? 0)
})
