/** @typedef {{ dir: string; envKey: string; defaultPort: string }} NextDevAppConfig */

/** @type {Record<'marketing' | 'backoffice' | 'api', NextDevAppConfig>} */
export const NEXT_DEV_APP_CONFIG = {
  marketing: { dir: 'marketing', envKey: 'MARKETING_DEV_PORT', defaultPort: '3000' },
  backoffice: { dir: 'backoffice', envKey: 'BACKOFFICE_DEV_PORT', defaultPort: '3001' },
  api: { dir: 'api', envKey: 'API_DEV_PORT', defaultPort: '3002' },
}
