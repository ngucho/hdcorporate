import type { Logger } from 'pino'
import type { AuthContext } from './auth/types.js'

export type AppEnv = {
  Variables: {
    requestId: string
    log: Logger
    auth?: AuthContext
  }
}
