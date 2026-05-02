import fs from 'node:fs'
import path from 'node:path'

const PORT_LINE_RE =
  /^(MARKETING_DEV_PORT|BACKOFFICE_DEV_PORT|API_DEV_PORT)\s*=\s*(.*)$/

/**
 * Pick *_DEV_PORT from `apps/<app>/.env.local` if not already set in `process.env`.
 * @param {string} appCwd Absolute path to `apps/<app>`
 */
export function loadDevPortsFromEnvLocal(appCwd) {
  const envPath = path.join(appCwd, '.env.local')
  if (!fs.existsSync(envPath)) return
  const text = fs.readFileSync(envPath, 'utf8')
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const m = trimmed.match(PORT_LINE_RE)
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
