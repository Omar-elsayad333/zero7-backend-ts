import { Request } from 'express'

declare module 'express-serve-static-core' {
  interface Request {
    token: string | undefined
    userId?: string | undefined
    user: Record<string, any>
  }
}
