import pino from 'pino'
import type { Logger } from 'pino'

let rootLogger: Logger | undefined

/**
 * Logger racine JSON (prod) ; `pino-pretty` si `LOG_PRETTY=1` ou dev sans `LOG_PRETTY=0`.
 * Ne jamais y loguer de corps de requête brut (PII) ni de secrets.
 */
export function getRootLogger(): Logger {
  if (rootLogger) return rootLogger

  const level =
    process.env.LOG_LEVEL ??
    (process.env.NODE_ENV === 'production' ? 'info' : 'debug')

  const devPretty =
    process.env.NODE_ENV !== 'production' && process.env.LOG_PRETTY !== '0'
  const forcePretty = process.env.LOG_PRETTY === '1'
  const usePretty = forcePretty || devPretty

  const opts = {
    level,
    base: { service: 'hd-corporate-api' },
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level(label: string) {
        return { level: label }
      },
    },
    redact: {
      paths: [
        'req.headers.authorization',
        'req.headers.cookie',
        '*.authorization',
        '*.password',
        '*.secret',
        '*.access_token',
        'calcom.signature',
      ],
      remove: true,
    },
  }

  rootLogger = usePretty
    ? pino(
        opts,
        pino.transport({
          target: 'pino-pretty',
          options: { colorize: true, translateTime: 'SYS:standard' },
        })
      )
    : pino(opts)

  return rootLogger
}
