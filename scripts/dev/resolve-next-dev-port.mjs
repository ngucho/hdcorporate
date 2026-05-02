import net from 'node:net'

export function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer()
    server.once('error', () => resolve(false))
    server.listen(port, () => {
      server.close(() => resolve(true))
    })
  })
}

/** Alternate ports step by 10 so parallel `turbo dev` rarely steals a sibling’s fallback. */
function* portCandidates(start) {
  yield start
  for (let k = 1; k < 20; k++) {
    yield start + k * 10
  }
}

/**
 * @param {import('./next-dev-app-config.mjs').NextDevAppConfig} cfg
 * @param {string} app
 */
export async function resolveNextDevPort(cfg, app) {
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
