import type { IronSessionOptions } from 'iron-session'
import { IUser } from 'services/types'

export const sessionOptions: IronSessionOptions = {
  password: process.env.NEXT_COOKIE_PASSWORD,
  cookieName: 'move-cookie',
  ttl: 24 * 3600,
  cookieOptions: {
    secure: false,
    maxAge: 24 * 3600,
  },
}

declare module 'iron-session' {
  interface IronSessionData {
    token: string
    user: IUser
  }
}
